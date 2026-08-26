'use client'
import SiteLayout from '@/components/site/Layout'
import { CaseStudiesGrid, CTABand } from '@/components/site/Sections'
import SampleWork from '@/components/site/SampleWork'

export default function CaseStudiesPage() {
  return (
    <SiteLayout>
      <section className="bg-navy-50 dark:bg-slate-900/30 py-16 lg:py-24 border-b border-slate-200 dark:border-white/10">
        <div className="container-x">
          <div className="eyebrow">Case Studies</div>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white max-w-3xl">Representative engagements ASANYX designs and delivers</h1>
          <p className="mt-5 text-lg text-slate-600 dark:text-slate-300 max-w-2xl">Sample engagements illustrating the kinds of outcomes ASANYX delivers. Clearly labelled as representative examples until client approvals are available.</p>
        </div>
      </section>
      <CaseStudiesGrid />
      <SampleWork />
      <CTABand />
    </SiteLayout>
  )
}
