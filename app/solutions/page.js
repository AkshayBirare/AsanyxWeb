'use client'
import SiteLayout from '@/components/site/Layout'
import { SectionHeader } from '@/components/site/Section'
import { ServicesGrid, CTABanner } from '@/components/site/Sections'

export default function SolutionsPage() {
  const solutions = [
    { name: 'Executive Dashboard Suite', desc: 'A pre-built executive KPI layer covering revenue, cost, cash and customer.' },
    { name: 'Modern BI Platform on Fabric', desc: 'End-to-end Microsoft Fabric platform with medallion architecture and governed workspaces.' },
    { name: 'Sales & Revenue Analytics', desc: 'Pipeline, forecasting and territory analytics for sales leadership.' },
    { name: 'Financial Reporting Suite', desc: 'P&L, cash flow and variance reporting on a certified semantic model.' },
    { name: 'Manufacturing Intelligence', desc: 'OEE, quality and shift analytics for plant-level intelligence.' },
    { name: 'Enterprise AI Copilot', desc: 'Governed generative AI experiences grounded on your enterprise data.' },
  ]
  return (
    <SiteLayout>
      <div className="pt-32 pb-8 bg-hero-mesh">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader eyebrow="Solutions" title="Accelerators for common enterprise needs" subtitle="Solution accelerators combine our engineering, models and dashboards to deliver value faster." />
        </div>
      </div>
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {solutions.map(s => (
            <div key={s.name} className="rounded-2xl glass p-6 card-hover">
              <div className="h-2 w-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
              <h3 className="mt-4 font-bold text-lg">{s.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <ServicesGrid />
      <CTABanner />
    </SiteLayout>
  )
}
