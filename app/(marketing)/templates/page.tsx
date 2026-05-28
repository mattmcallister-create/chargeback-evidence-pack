import { Metadata } from 'next'
import Link from 'next/link'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Chargeback Response Templates &amp; Evidence Checklists',
  description:
    'Free chargeback response letter templates, evidence checklists, and dispute playbooks for Stripe, PayPal, Shopify, and Square. Win more disputes with structured evidence.',
  alternates: { canonical: 'https://chargebackkit.app/templates' },
  openGraph: {
    title: 'Chargeback Response Templates &amp; Evidence Checklists',
    description:
      'Free chargeback response letter templates, evidence checklists, and dispute playbooks. Covers Stripe, PayPal, Shopify, Square, Visa, Mastercard, and Amex.',
    url: 'https://chargebackkit.app/templates',
    type: 'website',
  },
}

const categoryMeta: Record<string, { label: string; icon: string; description: string }> = {
  'gateway-response': {
    label: 'Gateway Response Letters',
    icon: '\u{1F4C4}',
    description: 'Structured response letters formatted for each payment processor.',
  },
  'platform-checklist': {
    label: 'Platform Evidence Checklists',
    icon: '✅',
    description: 'Evidence gathering checklists tailored to each gateway.',
  },
  'reason-checklist': {
    label: 'Reason Code Checklists',
    icon: '\u{1F50D}',
    description: 'Evidence checklists organized by chargeback reason code.',
  },
  'reason-response': {
    label: 'Reason Code Response Letters',
    icon: '✍️',
    description: 'Response letter templates for each dispute reason type.',
  },
  industry: {
    label: 'Industry Playbooks',
    icon: '\u{1F3E2}',
    description: 'Comprehensive chargeback playbooks for specific industries.',
  },
  network: {
    label: 'Card Network Playbooks',
    icon: '\u{1F4B3}',
    description: 'Dispute response guides for Visa, Mastercard, and Amex.',
  },
}

const typeLabels: Record<string, string> = {
  'response-letter': 'Response Letter',
  'evidence-checklist': 'Evidence Checklist',
  playbook: 'Playbook',
}

const categoryOrder = [
  'gateway-response',
  'platform-checklist',
  'reason-checklist',
  'reason-response',
  'industry',
  'network',
]

async function getTemplates() {
  const { data, error } = await supabaseAdmin
    .from('templates')
    .select('slug, short_title, description, category, type, gateway, dispute_reason')
    .order('title')
  if (error) throw error
  return data
}

export default async function TemplatesHubPage() {
  const templates = await getTemplates()

  const grouped: Record<string, typeof templates> = {}
  for (const t of templates) {
    if (!grouped[t.category]) grouped[t.category] = []
    grouped[t.category].push(t)
  }

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Chargeback Response Templates',
    description: 'Free chargeback response templates, evidence checklists, and dispute playbooks.',
    url: 'https://chargebackkit.app/templates',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: templates.length,
      itemListElement: templates.map((t, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://chargebackkit.app/templates/${t.slug}`,
        name: t.short_title,
      })),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-950 to-brand-900 py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-6">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-400">
            {templates.length} Free Templates
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Chargeback Response Templates &amp; Evidence Checklists
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-brand-200">
            Professional response letters, evidence checklists, and dispute playbooks for every
            gateway, reason code, and industry. Structured to maximize your win rate.
          </p>
        </div>
      </section>

      {/* Value props */}
      <section className="border-b border-slate-200 bg-white py-12">
        <div className="mx-auto grid max-w-5xl gap-8 px-6 sm:grid-cols-3">
          {[
            { n: 'Gateway-Specific', d: 'Templates formatted for Stripe, PayPal, Shopify, and Square dispute interfaces.' },
            { n: 'Reason Code Coverage', d: 'Every major chargeback reason code with tailored evidence strategies.' },
            { n: 'Industry Playbooks', d: 'Specialized guides for e-commerce, SaaS, digital goods, and services.' },
          ].map((v) => (
            <div key={v.n} className="text-center">
              <h3 className="font-semibold text-brand-900">{v.n}</h3>
              <p className="mt-1 text-sm text-slate-600">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Template Listing by Category */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          {categoryOrder.map((cat) => {
            const meta = categoryMeta[cat]
            const items = grouped[cat]
            if (!items || items.length === 0) return null
            return (
              <div key={cat} className="mb-14">
                <h2 className="mb-1 text-2xl font-bold text-brand-900">
                  {meta.icon} {meta.label}
                </h2>
                <p className="mb-6 text-slate-600">{meta.description}</p>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {items.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/templates/${t.slug}`}
                      className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
                    >
                      <span className="mb-2 inline-block rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                        {typeLabels[t.type] || t.type}
                      </span>
                      <h3 className="font-semibold text-brand-900 group-hover:text-emerald-600">
                        {t.short_title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-slate-500">{t.description}</p>
                      <p className="mt-3 text-xs font-medium text-emerald-600">
                        View template &rarr;
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-brand-950 py-16 text-center text-white">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-3xl font-bold">Ready to Win Your Next Dispute?</h2>
          <p className="mx-auto mt-3 max-w-lg text-brand-200">
            ChargebackKit generates complete evidence packs with AI-powered response letters,
            organized exhibits, and structured evidence&mdash;starting at $19.
          </p>
          <a
            href="https://buy.stripe.com/5kQaEY83P3f02Hdf0l3Nm02"
            className="mt-6 inline-block rounded-lg bg-emerald-500 px-8 py-3 font-semibold text-white shadow-lg transition hover:bg-emerald-400"
          >
            Get Your Evidence Pack &mdash; $19
          </a>
        </div>
      </section>
    </>
  )
}
