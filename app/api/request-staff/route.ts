import { NextRequest, NextResponse } from 'next/server'
import { facilityRequestSchema } from '@/lib/validations/forms'
import { appendFacilityRequest } from '@/lib/google-sheets'
import { sendFacilityRequestNotification } from '@/lib/email'
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

    const body = await request.json()

    // Validate the request body
    const validatedData = facilityRequestSchema.parse(body)

    console.log('New facility staffing request received:', {
      timestamp: new Date().toISOString(),
      contact: validatedData.contactName,
      organization: validatedData.organizationName,
      email: validatedData.workEmail,
      role: validatedData.roleNeeded,
      openings: validatedData.numberOfOpenings,
      location: `${validatedData.city}, ${validatedData.state}`
    })

    // Save to Google Sheets
    await appendFacilityRequest(validatedData)

    // Send email notification (don't fail the request if email fails)
    try {
      await sendFacilityRequestNotification(validatedData)
    } catch (emailError) {
      console.warn('Email notification failed, but request was saved:', emailError)
    }

    return NextResponse.json({
      success: true,
      message: 'Staffing request submitted successfully',
      requestId: `REQ-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    })

  } catch (error) {
    console.error('Error processing facility request:', error)

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
