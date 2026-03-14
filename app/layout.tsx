import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { Analytics } from "@vercel/analytics/next"
import { Layout } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://polarispathways.com'),
  title: {
    default: 'Polaris Pathways Behavioral Talent - Your North Star for ABA Staffing',
    template: '%s | Polaris Pathways',
  },
  description: 'Guiding ABA clinics toward stable teams and BCBAs/RBTs toward careers where they can grow, stay, and thrive.',
  keywords: 'ABA staffing, BCBA jobs, RBT jobs, behavioral health recruiting, ABA therapy staffing, behavior analyst careers, applied behavior analysis',
  authors: [{ name: 'Polaris Pathways Behavioral Talent' }],
  openGraph: {
    title: 'Polaris Pathways Behavioral Talent - Your North Star for ABA Staffing',
    description: 'Guiding ABA clinics toward stable teams and BCBAs/RBTs toward careers where they can grow, stay, and thrive.',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'Polaris Pathways Behavioral Talent',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/hero-woman-with-child.jpg',
        alt: 'Polaris Pathways Behavioral Talent - ABA Staffing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Polaris Pathways Behavioral Talent - Your North Star for ABA Staffing',
    description: 'Guiding ABA clinics toward stable teams and BCBAs/RBTs toward careers where they can grow, stay, and thrive.',
    images: ['/images/hero-woman-with-child.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': ['Organization', 'EmploymentAgency'],
              name: 'Polaris Pathways Behavioral Talent',
              description: 'Guiding ABA clinics toward stable teams and BCBAs/RBTs toward careers where they can grow, stay, and thrive.',
              url: process.env.NEXT_PUBLIC_APP_URL || 'https://polarispathways.com',
              areaServed: {
                '@type': 'Country',
                name: 'United States',
              },
              serviceType: [
                'ABA Staffing',
                'BCBA Recruitment',
                'RBT Placement',
                'Behavioral Health Staffing',
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Polaris Pathways Behavioral Talent',
              url: process.env.NEXT_PUBLIC_APP_URL || 'https://polarispathways.com',
            }),
          }}
        />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
        <Layout />
      </body>
    </html>
  )
}