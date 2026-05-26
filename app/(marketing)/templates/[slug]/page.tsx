import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const revalidate = 3600

interface Template {
  slug: string
  title: string
  short_title: string
  description: string
  category: string
  type: string
  gateway: string
  dispute_reason: string
  evidence_items: string[]
  sections: { heading: string; body: string }[]
  faqs: { q: string; a: string }[]
  related_slugs: string[]
}

async function getTemplate(slug: string): Promise<Template | null> {
  const { data, error } = await supabaseAdmin
    .from('templates')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error || !data) return null
  return data as Template
}

async function getRelated(slugs: string[]): Promise<{ slug: string; short_title: string; type: string }[]> {
  if (!slugs.length) return []
  const { data } = await supabaseAdmin
    .from('templates')
    .select('slug, short_title, type')
    .in('slug', slugs)
  return data || []
}

export async function generateStaticParams() {
  const { data } = await supabaseAdmin.from('templates').select('slug')
  return (data || []).map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const t = await getTemplate(params.slug)
  if (!t) return { title: 'Template Not Found' }
  return {
    title: `${t.title} | ChargebackKit`,
    description: t.description,
    alternates: { canonical: `https://chargebackkit.app/templates/${t.slug}` },
    openGraph: {
      title: t.title,
      description: t.description,
      url: `https://chargebackkit.app/templates/${t.slug}`,
      type: 'article',
    },
  }
}

const typeLabels: Record<string, string> = {
  'response-letter': 'Response Letter',
  'evidence-checklist': 'Evidence Checklist',
  playbook: 'Playbook',
}

function buildSchemas(t: Template) {
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t.title,
    description: t.description,
    url: `https://chargebackkit.app/templates/${t.slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'ChargebackKit',
      url: 'https://chargebackkit.app',
    },
  }

  const faqSchema =
    t.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: t.faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }
      : null

  const howTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to use the ${t.short_title}`,
    step: t.evidence_items.slice(0, 6).map((item, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      text: `Gather: ${item}`,
    })),
  }

  return [article, faqSchema, howTo].filter(Boolean)
}

export default async function TemplatePage({
  params,
}: {
  params: { slug: string }
}) {
  const t = await getTemplate(params.slug)
  if (!t) notFound()

  const related = await getRelated(t.related_slugs)
  const schemas = buildSchemas(t)

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      {/* Breadcrumb */}
      <nav className="border-b border-slate-200 bg-white px-6 py-3">
        <ol className="mx-auto flex max-w-5xl items-center gap-2 text-sm text-slate-500">
          <li>
            <Link href="/" className="hover:text-brand-900">Home</Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/templates" className="hover:text-brand-900">Templates</Link>
          </li>
          <li>/</li>
          <li className="truncate text-brand-900">{t.short_title}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-950 to-brand-900 py-16 text-white">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-300">
              {typeLabels[t.type] || t.type}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-brand-200">
              {t.gateway}
            </span>
            {t.dispute_reason !== 'General' && (
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-brand-200">
                {t.dispute_reason}
              </span>
            )}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{t.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-brand-200">{t.description}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Evidence Checklist */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-brand-900">
            Evidence Checklist ({t.evidence_items.length} items)
          </h2>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <ul className="grid gap-3 sm:grid-cols-2">
              {t.evidence_items.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-slate-300 text-xs text-slate-400">
                    {i + 1}
                  </span>
                  <span className="text-sm text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Content Sections */}
        {t.sections.map((s, i) => (
          <section key={i} className="mb-10">
            <h2 className="mb-3 text-xl font-bold text-brand-900">{s.heading}</h2>
            <p className="leading-relaxed text-slate-700">{s.body}</p>
          </section>
        ))}

        {/* CTA mid-page */}
        <section className="my-12 rounded-xl bg-gradient-to-r from-brand-900 to-brand-800 p-8 text-center text-white shadow-lg">
          <h3 className="text-xl font-bold">Skip the Template &mdash; Get a Complete Evidence Pack</h3>
          <p className="mx-auto mt-2 max-w-lg text-brand-200">
            ChargebackKit generates a full evidence pack with an AI-powered response letter,
            organized exhibits, and structured evidence tailored to your specific dispute.
          </p>
          <a
            href="https://buy.stripe.com/5kQaEY83P3f02Hdf0l3Nm02"
            className="mt-5 inline-block rounded-lg bg-emerald-500 px-8 py-3 font-semibold text-white shadow transition hover:bg-emerald-400"
          >
            Get Your Evidence Pack &mdash; $19
          </a>
        </section>

        {/* FAQs */}
        {t.faqs.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-brand-900">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {t.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-lg border border-slate-200 bg-slate-50"
                >
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-medium text-brand-900">
                    {faq.q}
                    <span className="ml-2 transition group-open:rotate-180">&darr;</span>
                  </summary>
                  <div className="px-5 pb-4 text-sm leading-relaxed text-slate-600">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Related Templates */}
        {related.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-bold text-brand-900">Related Templates</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/templates/${r.slug}`}
                  className="group rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
                >
                  <span className="text-xs font-medium text-emerald-600">
                    {typeLabels[r.type] || r.type}
                  </span>
                  <p className="mt-1 font-semibold text-brand-900 group-hover:text-emerald-600">
                    {r.short_title}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Bottom CTA */}
      <section className="bg-brand-950 py-16 text-center text-white">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-3xl font-bold">Win Your Chargeback Dispute</h2>
          <p className="mx-auto mt-3 max-w-lg text-brand-200">
            Stop losing revenue to chargebacks. ChargebackKit builds complete evidence packs
            with professional response letters and organized exhibits&mdash;starting at $19.
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
