'use client'
import SiteLayout from '@/components/site/Layout'
import { EngagementModels, CTABand } from '@/components/site/Sections'

export default function EngagementModelsPage() {
  return (
    <SiteLayout>
      <section className="bg-navy-50 dark:bg-slate-900/30 py-16 lg:py-24 border-b border-slate-200 dark:border-white/10">
        <div className="container-x">
          <div className="eyebrow">Engagement Models</div>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white max-w-3xl">Flexible ways to engage ASANYX Analytics</h1>
          <p className="mt-5 text-lg text-slate-600 dark:text-slate-300 max-w-2xl">Whether you need one dedicated consultant, a project team or a fully managed analytics service - we structure the engagement to match your objectives.</p>
        </div>
      </section>
      <EngagementModels />
      <CTABand />
    </SiteLayout>
  )
}
