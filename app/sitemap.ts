import { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chargebackevidencepack.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // P1 launch pages
  const corePages = [
    { url: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: '/how-it-works/', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/pricing/', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/faq/', priority: 0.8, changeFrequency: 'monthly' as const },
  ]

  // Category landing pages (P1)
  const categoryPages = [
    '/chargeback/fraudulent/',
    '/chargeback/subscription-cancelled/',
    '/chargeback/product-not-received/',
    '/chargeback/product-not-as-described/',
    '/chargeback/duplicate-charge/',
    '/chargeback/credit-not-processed/',
  ].map((url) => ({
    url,
    priority: 0.85,
    changeFrequency: 'monthly' as const,
  }))

  // Guide pages (P1 launch)
  const guidePages = [
    '/guide/chargeback-rebuttal-letter/',
    '/guide/stripe-chargeback-response/',
    '/guide/chargeback-evidence-requirements/',
    '/guide/chargeback-reason-codes/',
    '/guide/chargeback-deadlines/',
  ].map((url) => ({
    url,
    priority: 0.75,
    changeFrequency: 'monthly' as const,
  }))

  // Policy pages
  const policyPages = [
    { url: '/terms/', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/privacy/', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/refund/', priority: 0.4, changeFrequency: 'yearly' as const },
  ]

  const allPages = [...corePages, ...categoryPages, ...guidePages, ...policyPages]

  return allPages.map(({ url, priority, changeFrequency }) => ({
    url: `${siteUrl}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))
}
