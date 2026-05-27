import MarketingNav from '@/components/marketing/nav'
import MarketingFooter from '@/components/marketing/footer'
import { StickyCTA } from '@/components/marketing/sticky-cta'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <MarketingNav />
      <main className="flex-1">{children}</main>
      <MarketingFooter />
      <StickyCTA />
    </div>
  )
}
