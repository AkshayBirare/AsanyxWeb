'use client'
import SiteLayout from '@/components/site/Layout'
import { SectionHeader } from '@/components/site/Section'
import { AboutFounder, WhyChooseUs, CTABanner, CounterStats } from '@/components/site/Sections'

export default function AboutPage() {
  return (
    <SiteLayout>
      <div className="pt-32 pb-8 bg-hero-mesh">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader eyebrow="About ASANYX" title="A modern consulting company for data & AI" subtitle="ASANYX Analytics (OPC) Private Limited is an India based technology consulting company helping organizations transform data into intelligent business decisions. We combine deep Microsoft data platform expertise with a disciplined, business-driven approach." />
        </div>
      </div>
      <AboutFounder />
      <CounterStats />
      <WhyChooseUs />
      <CTABanner />
    </SiteLayout>
  )
}
