import { put } from '@vercel/blob'

/**
 * Upload a resume to Vercel Blob storage.
 * Files are stored under candidates/{candidateName}/{fileName}.
 * Returns the public URL of the uploaded file.
 */
export async function uploadResume(
  file: Buffer,
  fileName: string,
  contentType: string,
  candidateName: string
): Promise<string> {
  const path = `candidates/${candidateName}/${fileName}`

  const blob = await put(path, file, {
    access: 'public',
    contentType,
  })

  return blob.url
}
