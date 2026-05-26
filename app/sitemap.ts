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
            priority: 0.7,
        },
        {
            url: `${baseUrl}/stripe-chargeback-evidence`,
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/chargeback-evidence-checklist`,
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        // Guides hub
        {
            url: `${baseUrl}/guides`,
            lastModified: today,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        // Original guide pages
        {
            url: `${baseUrl}/guides/how-to-win-a-chargeback`,
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/guides/chargeback-prevention`,
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/guides/chargeback-rebuttal-letter`,
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/guides/chargeback-response-deadlines`,
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        // Reason code pages
        {
            url: `${baseUrl}/guides/visa-reason-code-13-1`,
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/guides/mastercard-reason-code-4853`,
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        // Processor-specific pages
        {
            url: `${baseUrl}/guides/shopify-chargeback-response`,
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/guides/paypal-dispute-response`,
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/guides/square-chargeback-response`,
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        // Industry-specific pages
        {
            url: `${baseUrl}/guides/saas-chargeback-prevention`,
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/guides/friendly-fraud-prevention`,
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        // Legal pages
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

    // Dynamic chargeback category pages
    const categoryRoutes: MetadataRoute.Sitemap = chargebackCategories.map((slug) => ({
        url: `${baseUrl}/chargeback/${slug}`,
        lastModified: today,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [...routes, ...categoryRoutes];
}
