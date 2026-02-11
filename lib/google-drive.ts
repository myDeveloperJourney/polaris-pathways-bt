import { google } from 'googleapis'
import { JWT } from 'google-auth-library'
import { Readable } from 'stream'

function getAuth() {
  return new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/drive'],
  })
}

/**
 * Find or create a subfolder inside the parent candidates folder.
 */
async function findOrCreateFolder(
  drive: ReturnType<typeof google.drive>,
  parentFolderId: string,
  folderName: string
): Promise<string> {
  // Check if folder already exists
  const existing = await drive.files.list({
    q: `'${parentFolderId}' in parents and name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
    fields: 'files(id)',
  })

  if (existing.data.files && existing.data.files.length > 0) {
    return existing.data.files[0].id!
  }

  // Create the folder
  const folder = await drive.files.create({
    requestBody: {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentFolderId],
    },
    fields: 'id',
  })

  return folder.data.id!
}

/**
 * Upload a resume file to Google Drive under candidates/{candidateName}/
 */
export async function uploadResumeToDrive(
  file: Buffer,
  fileName: string,
  mimeType: string,
  candidateName: string
): Promise<string> {
  const parentFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID

  if (!parentFolderId) {
    throw new Error('GOOGLE_DRIVE_FOLDER_ID environment variable is not set')
  }

  const auth = getAuth()
  const drive = google.drive({ version: 'v3', auth })

  // Create or find the candidate's folder
  const candidateFolderId = await findOrCreateFolder(
    drive,
    parentFolderId,
    candidateName
  )

  // Upload the file
  const stream = Readable.from(file)

  const uploaded = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [candidateFolderId],
    },
    media: {
      mimeType,
      body: stream,
    },
    fields: 'id, webViewLink',
  })

  return uploaded.data.webViewLink || uploaded.data.id!
}
