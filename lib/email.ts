import { Resend } from 'resend'
import { ClinicianApplication, FacilityRequest } from './validations/forms'

function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY environment variable is not set')
  }
  return new Resend(process.env.RESEND_API_KEY)
}

function validateEmailConfig() {
  const recipientEmail = process.env.NOTIFICATION_EMAIL

  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY environment variable is not set')
  }

  if (!recipientEmail) {
    throw new Error('NOTIFICATION_EMAIL environment variable is not set')
  }

  return recipientEmail
}

/**
 * Send email notification when a clinician submits an application
 */
export async function sendClinicianApplicationNotification(
  data: ClinicianApplication,
  resumeUrl?: string
) {
  const recipientEmail = validateEmailConfig()

  console.log(`Sending clinician application email to: ${recipientEmail}`)
  console.log(`Applicant: ${data.firstName} ${data.lastName}`)

  const specialtyLabels: Record<string, string> = {
    'bcba': 'BCBA (Board Certified Behavior Analyst)',
    'bcaba': 'BCaBA (Board Certified Assistant Behavior Analyst)',
    'rbt': 'RBT (Registered Behavior Technician)',
    'bt': 'BT (Behavior Technician)',
    'slp': 'SLP (Speech-Language Pathologist)',
    'ot': 'OT (Occupational Therapist)',
    'clinical-director': 'Clinical Director',
    'other': 'Other',
  }

  const experienceLabels: Record<string, string> = {
    '0-1': 'Less than 1 year',
    '1-3': '1-3 years',
    '3-5': '3-5 years',
    '5-10': '5-10 years',
    '10+': '10+ years',
  }

  const shiftLabels: Record<string, string> = {
    'clinic-based': 'Clinic-Based',
    'home-based': 'Home-Based',
    'school-based': 'School-Based',
    'telehealth': 'Telehealth',
    'flexible': 'Flexible / Multiple Settings',
  }

  const specialtyDisplay = specialtyLabels[data.specialty] || data.specialty
  const experienceDisplay = experienceLabels[data.yearsExperience] || data.yearsExperience
  const shiftDisplay = Array.isArray(data.shiftPreferences)
    ? data.shiftPreferences.map(s => shiftLabels[s] || s).join(', ')
    : data.shiftPreferences

  const resumeSection = resumeUrl
    ? `
      <div class="field">
        <div class="label">Resume</div>
        <div class="value">
          <a href="${resumeUrl}" style="color: #2563eb; text-decoration: none;">
            View Resume
          </a>
        </div>
      </div>`
    : `
      <div class="field">
        <div class="label">Resume</div>
        <div class="value" style="color: #9ca3af;">Not provided</div>
      </div>`

  try {
    const result = await getResendClient().emails.send({
      from: 'Polaris Pathways <onboarding@resend.dev>',
      to: recipientEmail,
      subject: 'New Clinician Application - Polaris Pathways',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%);
                color: white;
                padding: 30px;
                border-radius: 8px 8px 0 0;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
              }
              .badge {
                display: inline-block;
                background: #10b981;
                color: white;
                padding: 6px 12px;
                border-radius: 20px;
                font-weight: 600;
                font-size: 14px;
                margin-top: 10px;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border-radius: 0 0 8px 8px;
              }
              .field {
                background: white;
                padding: 15px;
                margin-bottom: 12px;
                border-radius: 6px;
                border-left: 4px solid #2563eb;
              }
              .label {
                font-weight: 600;
                color: #6b7280;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 4px;
              }
              .value {
                color: #1f2937;
                font-size: 16px;
              }
              .section-title {
                font-size: 18px;
                font-weight: 700;
                color: #1f2937;
                margin: 25px 0 15px 0;
                padding-bottom: 8px;
                border-bottom: 2px solid #e5e7eb;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                padding-top: 20px;
                border-top: 2px solid #e5e7eb;
                color: #6b7280;
                font-size: 14px;
              }
              .cta-button {
                display: inline-block;
                background: #2563eb;
                color: white !important;
                padding: 12px 24px;
                border-radius: 6px;
                text-decoration: none;
                font-weight: 600;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>New Clinician Application</h1>
              <span class="badge">New Candidate</span>
            </div>

            <div class="content">
              <p style="font-size: 16px; color: #1f2937; margin-bottom: 20px;">
                A new clinician has submitted an application through the Polaris Pathways website.
              </p>

              <div class="section-title">Contact Information</div>

              <div class="field">
                <div class="label">Applicant Name</div>
                <div class="value">${data.firstName} ${data.lastName}</div>
              </div>

              <div class="field">
                <div class="label">Email Address</div>
                <div class="value">
                  <a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">
                    ${data.email}
                  </a>
                </div>
              </div>

              <div class="field">
                <div class="label">Phone Number</div>
                <div class="value">
                  <a href="tel:${data.phone}" style="color: #2563eb; text-decoration: none;">
                    ${data.phone}
                  </a>
                </div>
              </div>

              <div class="field">
                <div class="label">Location</div>
                <div class="value">${data.city}, ${data.state}</div>
              </div>

              <div class="section-title">Professional Details</div>

              <div class="field">
                <div class="label">Specialty / Role</div>
                <div class="value">${specialtyDisplay}</div>
              </div>

              <div class="field">
                <div class="label">Years of Experience</div>
                <div class="value">${experienceDisplay}</div>
              </div>

              <div class="field">
                <div class="label">Work Setting Preferences</div>
                <div class="value">${shiftDisplay}</div>
              </div>

              ${resumeSection}

              <div class="field">
                <div class="label">Submission Time</div>
                <div class="value">${new Date().toLocaleString('en-US', {
                  timeZone: 'America/Chicago',
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}</div>
              </div>

              <div style="text-align: center; margin-top: 30px;">
                <a href="tel:${data.phone}" class="cta-button">
                  Call Applicant Now
                </a>
              </div>

              <div class="footer">
                <p>This application has been automatically saved to your Google Sheet.</p>
                <p style="margin-top: 10px;">
                  <strong>Polaris Pathways Behavioral Talent</strong><br>
                  Your North Star for ABA Staffing
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    console.log('Clinician application email sent:', result)
    return result
  } catch (error: unknown) {
    console.error('Error sending clinician application email:', error)
    const errorObj = error as { message?: string; statusCode?: number; name?: string }

    if (errorObj.statusCode === 403 || errorObj.statusCode === 401) {
      throw new Error('Invalid Resend API key. Check your RESEND_API_KEY in .env.local')
    } else if (errorObj.message?.includes('Invalid recipient')) {
      throw new Error(`Invalid recipient email: ${recipientEmail}`)
    }

    throw new Error(`Failed to send email notification: ${errorObj.message}`)
  }
}

/**
 * Send email notification when a facility submits a staffing request
 */
export async function sendFacilityRequestNotification(data: FacilityRequest) {
  const recipientEmail = validateEmailConfig()

  console.log(`Sending facility request email to: ${recipientEmail}`)
  console.log(`Organization: ${data.organizationName}`)

  const roleLabels: Record<string, string> = {
    'bcba': 'BCBA',
    'bcaba': 'BCaBA',
    'rbt': 'RBT',
    'bt': 'Behavior Technician',
    'slp': 'SLP',
    'ot': 'OT',
    'clinical-director': 'Clinical Director',
    'other': 'Other',
  }

  const shiftLabels: Record<string, string> = {
    'full-time': 'Full-Time',
    'part-time': 'Part-Time',
    'contract': 'Contract',
    'per-diem': 'Per Diem',
    'flexible': 'Flexible',
  }

  const contractLabels: Record<string, string> = {
    '3-months': '3 Months',
    '6-months': '6 Months',
    '12-months': '12 Months',
    'permanent': 'Permanent / Direct Hire',
    'temp-to-perm': 'Temp-to-Perm',
    'other': 'Other',
  }

  const roleDisplay = roleLabels[data.roleNeeded] || data.roleNeeded
  const shiftDisplay = shiftLabels[data.shiftType] || data.shiftType
  const contractDisplay = contractLabels[data.contractLength] || data.contractLength

  try {
    const result = await getResendClient().emails.send({
      from: 'Polaris Pathways <onboarding@resend.dev>',
      to: recipientEmail,
      subject: `New Staffing Request from ${data.organizationName} - Polaris Pathways`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%);
                color: white;
                padding: 30px;
                border-radius: 8px 8px 0 0;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
              }
              .badge {
                display: inline-block;
                background: #f59e0b;
                color: #1f2937;
                padding: 6px 12px;
                border-radius: 20px;
                font-weight: 600;
                font-size: 14px;
                margin-top: 10px;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border-radius: 0 0 8px 8px;
              }
              .field {
                background: white;
                padding: 15px;
                margin-bottom: 12px;
                border-radius: 6px;
                border-left: 4px solid #2563eb;
              }
              .label {
                font-weight: 600;
                color: #6b7280;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 4px;
              }
              .value {
                color: #1f2937;
                font-size: 16px;
              }
              .section-title {
                font-size: 18px;
                font-weight: 700;
                color: #1f2937;
                margin: 25px 0 15px 0;
                padding-bottom: 8px;
                border-bottom: 2px solid #e5e7eb;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                padding-top: 20px;
                border-top: 2px solid #e5e7eb;
                color: #6b7280;
                font-size: 14px;
              }
              .cta-button {
                display: inline-block;
                background: #2563eb;
                color: white !important;
                padding: 12px 24px;
                border-radius: 6px;
                text-decoration: none;
                font-weight: 600;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>New Staffing Request</h1>
              <span class="badge">${data.numberOfOpenings} Opening${parseInt(data.numberOfOpenings) !== 1 ? 's' : ''}</span>
            </div>

            <div class="content">
              <p style="font-size: 16px; color: #1f2937; margin-bottom: 20px;">
                A facility has submitted a staffing request through the Polaris Pathways website.
              </p>

              <div class="section-title">Contact Information</div>

              <div class="field">
                <div class="label">Contact Name</div>
                <div class="value">${data.contactName}</div>
              </div>

              <div class="field">
                <div class="label">Organization</div>
                <div class="value">${data.organizationName}</div>
              </div>

              <div class="field">
                <div class="label">Email Address</div>
                <div class="value">
                  <a href="mailto:${data.workEmail}" style="color: #2563eb; text-decoration: none;">
                    ${data.workEmail}
                  </a>
                </div>
              </div>

              <div class="field">
                <div class="label">Phone Number</div>
                <div class="value">
                  <a href="tel:${data.phone}" style="color: #2563eb; text-decoration: none;">
                    ${data.phone}
                  </a>
                </div>
              </div>

              <div class="field">
                <div class="label">Location</div>
                <div class="value">${data.city}, ${data.state}</div>
              </div>

              <div class="section-title">Staffing Requirements</div>

              <div class="field">
                <div class="label">Role Needed</div>
                <div class="value">${roleDisplay}</div>
              </div>

              <div class="field">
                <div class="label">Number of Openings</div>
                <div class="value">${data.numberOfOpenings}</div>
              </div>

              <div class="field">
                <div class="label">Work Setting / Shift Type</div>
                <div class="value">${shiftDisplay}</div>
              </div>

              <div class="field">
                <div class="label">Contract Length</div>
                <div class="value">${contractDisplay}</div>
              </div>

              <div class="field">
                <div class="label">Approximate Start Date</div>
                <div class="value">${data.startDate}</div>
              </div>

              ${data.budgetRange ? `
              <div class="field">
                <div class="label">Budget / Rate Range</div>
                <div class="value">${data.budgetRange}</div>
              </div>` : ''}

              ${data.notes ? `
              <div class="field">
                <div class="label">Special Requirements / Notes</div>
                <div class="value">${data.notes}</div>
              </div>` : ''}

              <div class="field">
                <div class="label">Submission Time</div>
                <div class="value">${new Date().toLocaleString('en-US', {
                  timeZone: 'America/Chicago',
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}</div>
              </div>

              <div style="text-align: center; margin-top: 30px;">
                <a href="tel:${data.phone}" class="cta-button">
                  Call Contact Now
                </a>
              </div>

              <div class="footer">
                <p>This request has been automatically saved to your Google Sheet.</p>
                <p style="margin-top: 10px;">
                  <strong>Polaris Pathways Behavioral Talent</strong><br>
                  Your North Star for ABA Staffing
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    console.log('Facility request email sent:', result)
    return result
  } catch (error: unknown) {
    console.error('Error sending facility request email:', error)
    const errorObj = error as { message?: string; statusCode?: number; name?: string }

    if (errorObj.statusCode === 403 || errorObj.statusCode === 401) {
      throw new Error('Invalid Resend API key. Check your RESEND_API_KEY in .env.local')
    } else if (errorObj.message?.includes('Invalid recipient')) {
      throw new Error(`Invalid recipient email: ${recipientEmail}`)
    }

    throw new Error(`Failed to send email notification: ${errorObj.message}`)
  }
}
