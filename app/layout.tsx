import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chargebackevidencepack.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Submit Chargeback Evidence That Card Networks Accept | Chargeback Evidence Pack Builder',
    template: '%s | Chargeback Evidence Pack Builder',
  },
  description:
    'Stop submitting weak chargeback evidence. Build a submission-ready, category-specific evidence pack in 30 minutes — $39, no subscription.',
  keywords: ['chargeback evidence', 'chargeback response', 'stripe chargeback', 'dispute evidence pack'],
  authors: [{ name: 'Chargeback Evidence Pack Builder' }],
  creator: 'Chargeback Evidence Pack Builder',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Chargeback Evidence Pack Builder',
    title: 'Submit Chargeback Evidence That Card Networks Accept',
    description:
      'Stop submitting weak chargeback evidence. Build a submission-ready, category-specific evidence pack in 30 minutes — $39, no subscription.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Chargeback Evidence Pack Builder — Submission-ready PDFs in 30 minutes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Submit Chargeback Evidence That Card Networks Accept',
    description:
      'Stop submitting weak chargeback evidence. Build a submission-ready, category-specific evidence pack in 30 minutes — $39, no subscription.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
