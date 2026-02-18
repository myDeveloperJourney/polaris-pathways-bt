import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Submission Received',
  description: 'Your form has been submitted successfully. Our team will review your information and follow up shortly.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  return children
}
