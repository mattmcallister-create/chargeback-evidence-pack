import Link from 'next/link'

const productLinks = [
  { label: 'How It Works', href: '/how-it-works/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'Cost Calculator', href: '/tools/chargeback-calculator/' },
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
  { label: 'Chargeback Prevention', href: '/guides/chargeback-prevention' },
  { label: 'How to Win a Chargeback', href: '/guides/how-to-win-a-chargeback' },
  { label: 'Chargeback Rebuttal Letter', href: '/guides/chargeback-rebuttal-letter' },
  { label: 'Friendly Fraud Prevention', href: '/guides/friendly-fraud-prevention' },
  { label: 'Response Deadlines', href: '/guides/chargeback-response-deadlines' },
  { label: 'Evidence Checklist', href: '/chargeback-evidence-checklist' },
  { label: 'Stripe Evidence Guide', href: '/stripe-chargeback-evidence' },
]

const legalLinks = [
  { label: 'Terms of Service', href: '/terms/' },
  { label: 'Privacy Policy', href: '/privacy/' },
  { label: 'Refund Policy', href: '/refund/' },
]

function FooterShield() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-emerald-400"
      aria-hidden="true"
    >
      <path
        d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function MarketingFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Top: Brand + nav columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-3">
              <FooterShield />
              <span className="text-white font-semibold text-base leading-tight">
                ChargebackKit
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Submission-ready evidence packs for Stripe merchants.
              Starting at $19 per pack. No subscription.
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
            &copy; {year} ChargebackKit. All rights reserved.
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
          This product is not legal advice. We cannot guarantee chargeback outcomes &mdash; card networks
          make the final determination. Evidence packs are structured to meet submission format
          requirements. This is not a law firm and does not provide legal representation.
        </p>
      </div>
    </footer>
  )
}
