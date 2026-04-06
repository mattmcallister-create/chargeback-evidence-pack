import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

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
  applicationName: 'ChargebackKit',
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
    sameAs: [
      'https://twitter.com/chargebackkit',
      'https://linkedin.com/company/chargebackkit',
    ],
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
      price: '0',
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
        <Script
          id="posthog-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug getPageViewId captureTraceFeedback captureTraceMetric".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
              posthog.init('${process.env.NEXT_PUBLIC_POSTHOG_KEY}', {api_host:'${process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com"}', capture_pageview: true, capture_pageleave: true, persistence: 'localStorage+cookie'});
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
