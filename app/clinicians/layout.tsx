import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Apply for ABA Jobs | BCBA & RBT Opportunities',
  description: 'Find ABA careers that fit your life, not just your license. Apply for BCBA, RBT, and behavioral health positions with clinics that value culture fit and career growth.',
  keywords: 'BCBA jobs, RBT jobs, ABA careers, behavior analyst jobs, apply ABA, behavioral health jobs, RBT openings',
  openGraph: {
    title: 'Apply for ABA Jobs | BCBA & RBT Opportunities',
    description: 'Find ABA careers that fit your life, not just your license. Join our network of BCBAs, RBTs, and behavioral health professionals.',
  },
}

export default function CliniciansLayout({ children }: { children: React.ReactNode }) {
  return children
}
