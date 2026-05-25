import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chargebackkit.app';
    const today = new Date().toISOString().split('T')[0];

  // Chargeback category slugs for dynamic pages
  const chargebackCategories = [
        'fraudulent',
        'subscription-cancelled',
        'product-not-received',
        'product-not-as-described',
        'duplicate-charge',
        'credit-not-processed',
      ];

  const routes: MetadataRoute.Sitemap = [
    {
            url: `${baseUrl}/`,
            lastModified: today,
            changeFrequency: 'weekly',
            priority: 1.0,
    },
    {
            url: `${baseUrl}/how-it-works`,
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.9,
    },
    {
            url: `${baseUrl}/pricing`,
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.9,
    },
    {
            url: `${baseUrl}/faq`,
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.8,
    },
    {
            url: `${baseUrl}/stripe-chargeback-evidence`,
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.9,
    },
    {
            url: `${baseUrl}/chargeback-evidence-checklist`,
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.9,
    },
    {
            url: `${baseUrl}/guides/chargeback-response-deadlines`,
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.9,
    },
        // Chargeback category pages — high-intent, per-dispute-type landing pages
        ...chargebackCategories.map((slug) => ({
                url: `${baseUrl}/chargeback/${slug}`,
                lastModified: today,
                changeFrequency: 'monthly' as const,
                priority: 0.8,
        })),
    {
            url: `${baseUrl}/terms`,
            lastModified: today,
          changeFrequency: 'yearly',
            priority: 0.3,
    },
    {
            url: `${baseUrl}/privacy`,
            lastModified: today,
            changeFrequency: 'yearly',
            priority: 0.3,
    },
    {
            url: `${baseUrl}/refund`,
            lastModified: today,
            changeFrequency: 'yearly',
            priority: 0.3,
    },
      ];

  return routes;
}
