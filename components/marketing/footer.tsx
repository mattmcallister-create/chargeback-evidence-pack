import Link from 'next/link'

const productLinks = [
  { label: 'How It Works', href: '/how-it-works/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'FAQ', href: '/faq/' },
]

const categoryLinks = [
  { label: 'Fraudulent Chargeback', href: '/chargeback/fraudulent/' },
  { label: 'Subscription Cancelled', href: '/chargeback/subscription-cancelled/' },
  { label: 'Product Not Received', href: '/chargeback/product-not-received/' },
  { label: 'Product Not as Described', href: '/chargeback/product-not-as-described/' },
  { label: 'Duplicate Charge', href: '/chargeback/duplicate-charge/' },
  { label: 'Credit Not Processed', href: '/chargeback/credit-not-processed/' },
]

const guideLinks = [
  { label: 'Chargeback Rebuttal Letter', href: '/guide/chargeback-rebuttal-letter/' },
  { label: 'Stripe Chargeback Response', href: '/guide/stripe-chargeback-response/' },
  { label: 'Evidence Requirements', href: '/guide/chargeback-evidence-requirements/' },
  { label: 'Reason Codes Explained', href: '/guide/chargeback-reason-codes/' },
  { label: 'Response Deadlines', href: '/guide/chargeback-deadlines/' },
]

const legalLinks = [
  { label: 'Terms of Service', href: '/terms/' },
  { label: 'Privacy Policy', href: '/privacy/' },
  { label: 'Refund Policy', href: '/refund/' },
]

export default function MarketingFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Top: Brand + nav columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-3">
              <span className="text-white font-semibold text-base leading-tight">
                Chargeback<br />
                <span className="text-slate-400 font-normal text-sm">Evidence Pack</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Submission-ready, dispute-category-specific evidence packs for Stripe merchants.
              $39 per pack. No subscription.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wide">Product</h3>
            <ul className="space-y-2.5">
              {productLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wide">Dispute Types</h3>
            <ul className="space-y-2.5">
              {categoryLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wide">Guides</h3>
            <ul className="space-y-2.5">
              {guideLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs">
            © {year} Chargeback Evidence Pack Builder. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-4 text-xs">
            {legalLinks.map(({ label, href }) => (
              <Link key={href} href={href} className="hover:text-white transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-xs text-slate-600 max-w-2xl leading-relaxed">
          This product is not legal advice. We cannot guarantee chargeback outcomes — card networks
          make the final determination. Evidence packs are structured to meet submission format
          requirements. This is not a law firm and does not provide legal representation.
        </p>
      </div>
    </footer>
  )
}
