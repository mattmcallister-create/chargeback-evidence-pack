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

    // Template slugs for all 35 template pages
    const templateSlugs = [
        // Gateway-specific response letters
        'paypal-dispute-response-letter',
        'shopify-payments-dispute-response',
        'square-dispute-response-letter',
        'stripe-chargeback-response-letter',
        // Gateway-specific evidence checklists
        'paypal-evidence-checklist',
        'shopify-evidence-checklist',
        'square-evidence-checklist',
        'stripe-evidence-checklist',
        // Reason-code evidence checklists
        'credit-not-processed-evidence-checklist',
        'duplicate-charge-evidence-checklist',
        'fraud-evidence-checklist',
        'item-not-received-evidence-checklist',
        'not-as-described-evidence-checklist',
        'services-not-rendered-evidence-checklist',
        'subscription-cancellation-evidence-checklist',
        'unauthorized-transaction-evidence-checklist',
        // Reason-code response letters
        'credit-not-processed-response-letter',
        'duplicate-charge-response-letter',
        'fraud-chargeback-response-letter',
        'item-not-received-response-letter',
        'not-as-described-response-letter',
        'services-not-rendered-response-letter',
        'subscription-cancellation-response-letter',
        'unauthorized-transaction-response-letter',
        // Industry playbooks
        'digital-goods-chargeback-playbook',
        'ecommerce-chargeback-playbook',
        'high-risk-merchant-chargeback-playbook',
        'marketplace-chargeback-playbook',
        'retail-pos-chargeback-playbook',
        'saas-chargeback-playbook',
        'services-business-chargeback-playbook',
        'travel-hospitality-chargeback-playbook',
        // Card network playbooks
        'amex-chargeback-playbook',
        'mastercard-chargeback-playbook',
        'visa-chargeback-playbook',
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
      url: `${baseUrl}/paypal-chargeback-evidence`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/shopify-chargeback-evidence`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/square-chargeback-evidence`,
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
        // Guide pages
        {
            url: `${baseUrl}/guides/chargeback-prevention-strategies`,
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
        {
            url: `${baseUrl}/guides/compelling-evidence-3`,
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/guides/visa-chargeback-reason-codes`,
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        // Reason code pages
        {
            url: `${baseUrl}/reason-codes/visa-10-4`,
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/reason-codes/mastercard-4837`,
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        // Processor-specific pages
        {
            url: `${baseUrl}/processors/stripe-chargebacks`,
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/processors/paypal-disputes`,
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/processors/square-chargebacks`,
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        // Industry pages
        {
            url: `${baseUrl}/industries/ecommerce-chargebacks`,
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/industries/saas-chargebacks`,
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        // Templates hub
        {
            url: `${baseUrl}/templates`,
            lastModified: today,
            changeFrequency: 'weekly',
            priority: 0.9,
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
            url: `${baseUrl}/refund-policy`,
            lastModified: today,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];

    const categoryRoutes: MetadataRoute.Sitemap = chargebackCategories.map((slug) => ({
        url: `${baseUrl}/chargeback/${slug}`,
        lastModified: today,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    const templateRoutes: MetadataRoute.Sitemap = templateSlugs.map((slug) => ({
        url: `${baseUrl}/templates/${slug}`,
        lastModified: today,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [...routes, ...categoryRoutes, ...templateRoutes];
}
