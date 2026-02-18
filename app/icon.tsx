import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default async function Icon() {
  const imageData = await readFile(join(process.cwd(), 'public/images/hero-woman-with-child.jpg'))
  const base64 = imageData.toString('base64')

  return new ImageResponse(
    (
      <img
        src={`data:image/jpeg;base64,${base64}`}
        width={32}
        height={32}
        style={{ objectFit: 'cover', borderRadius: '20%' }}
      />
    ),
    { ...size }
  )
}
