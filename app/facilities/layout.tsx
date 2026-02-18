import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hire ABA Talent | Request BCBAs & RBTs',
  description: 'Build a stable ABA team with clinically vetted, culture-fit BCBAs and RBTs. Submit a staffing request and get matched with qualified behavioral health professionals.',
  keywords: 'hire BCBA, hire RBT, ABA staffing, behavioral health staffing, ABA clinic staffing, recruit behavior analysts',
  openGraph: {
    title: 'Hire ABA Talent | Request BCBAs & RBTs',
    description: 'Build a stable ABA team with clinically vetted, culture-fit professionals. Submit a staffing request today.',
  },
}

export default function FacilitiesLayout({ children }: { children: React.ReactNode }) {
  return children
}
