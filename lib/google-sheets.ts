import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'
import { ClinicianApplication, FacilityRequest } from './validations/forms'

/**
 * Initialize Google Sheets document with service account authentication
 */
async function initializeDoc(sheetId: string) {
  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth)
  await doc.loadInfo()

  return doc
}

/**
 * Append a clinician application to the Google Sheet
 */
export async function appendClinicianApplication(data: ClinicianApplication, resumeUrl?: string) {
  try {
    const sheetId = process.env.GOOGLE_SHEET_ID_CLINICIANS

    if (!sheetId) {
      throw new Error('GOOGLE_SHEET_ID_CLINICIANS environment variable is not set')
    }

    const doc = await initializeDoc(sheetId)
    const sheet = doc.sheetsByIndex[0]

    // Add row with timestamp and all form fields
    await sheet.addRow({
      Timestamp: new Date().toISOString(),
      'First Name': data.firstName,
      'Last Name': data.lastName,
      Email: data.email,
      Phone: data.phone,
      City: data.city,
      State: data.state,
      Specialty: data.specialty,
      'Years Experience': data.yearsExperience,
      'Shift Preferences': Array.isArray(data.shiftPreferences)
        ? data.shiftPreferences.join(', ')
        : data.shiftPreferences,
      'Resume Link': resumeUrl || 'Not provided',
      Consent: data.consent ? 'Yes' : 'No',
    })

    return { success: true }
  } catch (error) {
    console.error('Error appending to Google Sheets:', error)
    throw error
  }
}

/**
 * Append a facility request to the Google Sheet
 */
export async function appendFacilityRequest(data: FacilityRequest) {
  try {
    const sheetId = process.env.GOOGLE_SHEET_ID_FACILITIES

    if (!sheetId) {
      throw new Error('GOOGLE_SHEET_ID_FACILITIES environment variable is not set')
    }

    const doc = await initializeDoc(sheetId)
    const sheet = doc.sheetsByIndex[0]

    // Add row with timestamp and all form fields
    await sheet.addRow({
      Timestamp: new Date().toISOString(),
      'Contact Name': data.contactName,
      'Work Email': data.workEmail,
      Phone: data.phone,
      'Organization Name': data.organizationName,
      City: data.city,
      State: data.state,
      'Role Needed': data.roleNeeded,
      'Number of Openings': data.numberOfOpenings,
      'Shift Type': data.shiftType,
      'Start Date': data.startDate,
      'Direct Hire or Contract': data.contractLength,
      Notes: data.notes || 'None',
      Consent: data.consent ? 'Yes' : 'No',
    })

    return { success: true }
  } catch (error) {
    console.error('Error appending to Google Sheets:', error)
    throw error
  }
}
