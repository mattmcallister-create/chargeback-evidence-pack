import type { Metadata } from 'next'
import Link from 'next/link'
import { Lock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Log In',
  description: 'Log in to your Chargeback Evidence Pack Builder account to access your packs.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function LoginPage() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50 px-4 py-16">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Lock size={20} className="text-brand-800" strokeWidth={1.5} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Log in to your account</h1>
            <p className="text-slate-500 text-sm mt-1">
              Access your evidence packs and purchase history.
            </p>
          </div>

          {/* Form (no action — wired in Phase 9) */}
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
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <Link
                  href="/forgot-password/"
                  className="text-xs text-brand-700 hover:text-brand-800 underline underline-offset-2"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-700 focus:border-brand-700 transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand-800 text-white font-bold text-sm py-3 rounded-lg hover:bg-brand-700 transition-colors mt-2"
            >
              Log In
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/signup/" className="text-brand-700 font-medium hover:text-brand-800 underline underline-offset-2">
              Create one →
            </Link>
          </p>
        </div>

        {/* Legal note */}
        <p className="text-center text-xs text-slate-400 mt-6 leading-relaxed">
          By logging in, you agree to our{' '}
          <Link href="/terms/" className="underline hover:text-slate-600">Terms of Service</Link>{' '}
          and{' '}
          <Link href="/privacy/" className="underline hover:text-slate-600">Privacy Policy</Link>.
        </p>
      </div>
    </section>
  )
}
