import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { PostHogProvider } from '@/lib/analytics/posthog';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chargebackkit.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ChargebackKit',
    template: '%s | ChargebackKit',
  },
  description:
    'ChargebackKit helps merchants win chargebacks faster. Compile evidence, respond to disputes, and protect your revenue in minutes.',
  keywords: [
    'chargeback',
    'chargeback response',
    'chargeback evidence',
    'dispute resolution',
    'merchant protection',
    'chargeback rebuttal letter',
    'chargeback evidence template',
    'how to win a chargeback',
    'chargeback response deadline',
    'chargeback prevention',
    'dispute evidence compilation',
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'ChargebackKit',
    title: 'ChargebackKit',
    description:
      'ChargebackKit helps merchants win chargebacks faster. Compile evidence, respond to disputes, and protect your revenue in minutes.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChargebackKit',
    description:
      'ChargebackKit helps merchants win chargebacks faster. Compile evidence, respond to disputes, and protect your revenue in minutes.',
  },
  verification: {
        google: '1vKCDAzJ928Zqdb-lBV2A8Ypookr_d9T02zlNTN0SU0',
  },
  applicationName: 'ChargebackKit',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ChargebackKit',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description:
      'Chargeback response platform for merchants. Win disputes faster with automated evidence compilation.',

    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@chargebackkit.app',
    },
  };

  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ChargebackKit',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: siteUrl,
    description:
      'Chargeback response platform for merchants. Win disputes faster with automated evidence compilation.',
    offers: {
      '@type': 'Offer',
      price: '19',
      priceCurrency: 'USD',
      url: `${siteUrl}/pricing`,
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareApplicationSchema),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
