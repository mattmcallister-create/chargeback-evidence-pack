import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chargebackkit.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/app/',
          '/api/',
          '/auth/',
          '/checkout/',
          '/admin/',
          '/dashboard/',
          '/packs/',
          '/settings/',
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
