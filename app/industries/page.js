'use client'
import SiteLayout from '@/components/site/Layout'
import { IndustriesGrid, CTABand } from '@/components/site/Sections'

export default function IndustriesPage() {
  return (
    <SiteLayout>
      <section className="bg-navy-50 dark:bg-slate-900/30 py-16 lg:py-24 border-b border-slate-200 dark:border-white/10">
        <div className="container-x">
          <div className="eyebrow">Industries</div>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white max-w-3xl">Domain expertise across regulated and non-regulated sectors</h1>
          <p className="mt-5 text-lg text-slate-600 dark:text-slate-300 max-w-2xl">Our engagements are anchored in a deep understanding of the way each industry actually operates - not just its data.</p>
        </div>
      </section>
      <IndustriesGrid />
      <CTABand />
    </SiteLayout>
  )
}
