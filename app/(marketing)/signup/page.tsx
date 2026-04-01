import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, UserPlus } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Create a Chargeback Evidence Pack Builder account to start building your evidence pack.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function SignupPage() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50 px-4 py-16">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <UserPlus size={20} className="text-brand-800" strokeWidth={1.5} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
            <p className="text-slate-500 text-sm mt-1">
              Start building your first evidence pack.
            </p>
          </div>

          {/* Trust nudge */}
          <div className="bg-brand-50 rounded-lg px-4 py-3 mb-6 text-center">
            <p className="text-sm text-brand-900 font-medium">$39 per pack · No subscription · Files deleted after 72 hours</p>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-700 focus:border-brand-700 transition"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-700 focus:border-brand-700 transition"
                placeholder="At least 8 characters"
              />
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-700 mb-1.5">
                Confirm password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-700 focus:border-brand-700 transition"
                placeholder="Re-enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-brand-800 text-white font-bold text-sm py-3 rounded-lg hover:bg-brand-700 transition-colors mt-2"
            >
              Create Account
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{' '}
            <Link href="/login/" className="text-brand-700 font-medium hover:text-brand-800 underline underline-offset-2">
              Log in →
            </Link>
          </p>
        </div>

        {/* Legal note */}
        <p className="text-center text-xs text-slate-400 mt-6 leading-relaxed px-4">
          By creating an account, you agree to our{' '}
          <Link href="/terms/" className="underline hover:text-slate-600">Terms of Service</Link>{' '}
          and{' '}
          <Link href="/privacy/" className="underline hover:text-slate-600">Privacy Policy</Link>.
          One payment of $39 per pack. No subscription or recurring charges.
        </p>
      </div>
    </section>
  )
}
