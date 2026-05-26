import Link from 'next/link'
import { ArrowRight, Home, BookOpen, HelpCircle } from 'lucide-react'
import MarketingNav from '@/components/marketing/nav'
import MarketingFooter from '@/components/marketing/footer'

export default function NotFound() {
  return (
    <>
      <MarketingNav />

      <section className="bg-brand-900 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Shield icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-800 mb-8">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2L3 7v6c0 5.25 3.83 10.17 9 11.38C17.17 23.17 21 18.25 21 13V7l-9-5z"
                fill="none"
                stroke="#34d399"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 8v4M12 16h.01"
                stroke="#34d399"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <p className="text-sm text-emerald-400 uppercase tracking-widest font-medium mb-4">
            Page not found
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
            This page doesn&apos;t exist
          </h1>
          <p className="text-lg text-slate-300 max-w-xl mx-auto leading-relaxed mb-10">
            The page you&apos;re looking for may have moved or no longer exists.
            Here are some helpful links instead.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-emerald-500 text-white font-bold text-base px-8 py-4 rounded-lg hover:bg-emerald-600 transition-colors shadow-lg"
          >
            Go to homepage
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-slate-900 text-center mb-8">
            Or try one of these
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/guides"
              className="group block bg-white rounded-xl border border-slate-200 p-6 hover:border-brand-300 hover:shadow-md transition-all text-center"
            >
              <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center mx-auto mb-3 group-hover:bg-brand-100 transition-colors">
                <BookOpen size={20} className="text-brand-800" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">Free Guides</h3>
              <p className="text-sm text-slate-500">Chargeback prevention &amp; response</p>
            </Link>
            <Link
              href="/pricing"
              className="group block bg-white rounded-xl border border-slate-200 p-6 hover:border-brand-300 hover:shadow-md transition-all text-center"
            >
              <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center mx-auto mb-3 group-hover:bg-brand-100 transition-colors">
                <Home size={20} className="text-brand-800" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">Pricing</h3>
              <p className="text-sm text-slate-500">Build your evidence pack</p>
            </Link>
            <Link
              href="/faq"
              className="group block bg-white rounded-xl border border-slate-200 p-6 hover:border-brand-300 hover:shadow-md transition-all text-center"
            >
              <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center mx-auto mb-3 group-hover:bg-brand-100 transition-colors">
                <HelpCircle size={20} className="text-brand-800" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">FAQ</h3>
              <p className="text-sm text-slate-500">Common questions answered</p>
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </>
  )
}
