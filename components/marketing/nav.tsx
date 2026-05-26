'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'How It Works', href: '/how-it-works/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'Calculator', href: '/tools/chargeback-calculator/' },
  { label: 'Guides', href: '/guides' },
  { label: 'FAQ', href: '/faq/' },
]

function ShieldLogo() {
  return (
    <svg
      width="24"
      height="24"
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

export default function MarketingNav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-brand-900 border-b border-brand-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0"
            aria-label="ChargebackKit â Home"
          >
            <ShieldLogo />
            <span className="text-white font-bold text-lg tracking-tight">ChargebackKit</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-slate-300 hover:text-white transition-colors duration-150 font-medium"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login/"
              className="text-sm text-slate-300 hover:text-white font-medium transition-colors duration-150 px-3 py-1.5"
            >
              Log In
            </Link>
            <Link
              href="https://buy.stripe.com/5kQaEY83P3f02Hdf0l3Nm02"
              className="inline-flex items-center gap-1.5 bg-emerald-500 text-white font-semibold text-sm px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors duration-150 shadow-sm"
            >
              Create Pack
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-slate-300 hover:text-white rounded-md"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-brand-900 border-t border-brand-950/40 px-4 pb-4 pt-2 space-y-1">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="block py-2.5 text-sm text-slate-300 hover:text-white font-medium border-b border-brand-950/30"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <Link
              href="/login/"
              className="block text-center py-2.5 text-sm text-slate-300 hover:text-white font-medium border border-white/20 rounded-md"
              onClick={() => setMobileOpen(false)}
            >
              Log In
            </Link>
            <Link
              href="https://buy.stripe.com/5kQaEY83P3f02Hdf0l3Nm02"
              className="block text-center py-2.5 bg-emerald-500 text-white font-semibold text-sm rounded-md hover:bg-emerald-600 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Create Pack &rarr;
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
