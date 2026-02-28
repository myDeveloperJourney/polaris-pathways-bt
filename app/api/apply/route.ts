import { NextRequest, NextResponse } from 'next/server'
import { clinicianApplicationSchema } from '@/lib/validations/forms'
import { appendClinicianApplication } from '@/lib/google-sheets'
import { uploadResume } from '@/lib/blob-storage'
import { sendClinicianApplicationNotification } from '@/lib/email'
import { checkRateLimit } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    const rateLimit = checkRateLimit(ip)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': process.env.RATE_LIMIT_MAX_REQUESTS || '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
          },
        }
      )
    }

    const formData = await request.formData()

    // Extract fields from FormData
    const body = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      specialty: formData.get('specialty') as string,
      yearsExperience: formData.get('yearsExperience') as string,
      shiftPreferences: JSON.parse(formData.get('shiftPreferences') as string),
      consent: formData.get('consent') === 'true',
      resume: formData.get('resume') || undefined,
    }

    // Validate the request body
    const validatedData = clinicianApplicationSchema.parse(body)

    console.log('New clinician application received:', {
      timestamp: new Date().toISOString(),
      applicant: `${validatedData.firstName} ${validatedData.lastName}`,
      email: validatedData.email,
      specialty: validatedData.specialty,
      location: `${validatedData.city}, ${validatedData.state}`
    })

    // Upload resume to Vercel Blob if provided
    let resumeLink: string | undefined
    const resumeFile = formData.get('resume') as File | null
    if (resumeFile && resumeFile.size > 0) {
      const buffer = Buffer.from(await resumeFile.arrayBuffer())
      const candidateName = `${validatedData.firstName} ${validatedData.lastName}`
      resumeLink = await uploadResume(
        buffer,
        resumeFile.name,
        resumeFile.type,
        candidateName
      )
      console.log('Resume uploaded:', resumeLink)
    }

    // Save to Google Sheets
    await appendClinicianApplication(validatedData, resumeLink)

    // Send email notification (don't fail the request if email fails)
    try {
      await sendClinicianApplicationNotification(validatedData, resumeLink)
    } catch (emailError) {
      console.warn('Email notification failed, but application was saved:', emailError)
    }

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: `APP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    })

  } catch (error) {
    console.error('Error processing clinician application:', error)

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({
        error: 'Invalid form data',
        details: error.message
      }, { status: 400 })
    }

    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 })
  }
}
