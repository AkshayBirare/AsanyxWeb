'use client'
import SiteLayout from '@/components/site/Layout'
import { SectionHeader } from '@/components/site/Section'
import { industries } from '@/lib/site'
import * as Icons from 'lucide-react'

export default function IndustriesPage() {
  return (
    <SiteLayout>
      <div className="pt-32 pb-8 bg-hero-mesh">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader eyebrow="Industries" title="Domain-aware solutions for every sector" subtitle="Our engagements are anchored in domain understanding, not just technology." />
        </div>
      </div>
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {industries.map(ind => {
            const I = Icons[ind.icon] || Icons.Circle
            return (
              <div key={ind.name} className="rounded-2xl glass p-6 card-hover">
                <div className="w-11 h-11 rounded-xl grid place-items-center bg-gradient-to-br from-blue-600 to-cyan-500 text-white"><I className="w-5 h-5" /></div>
                <div className="mt-4 text-lg font-semibold">{ind.name}</div>
                <p className="mt-1 text-sm text-muted-foreground">Custom BI, analytics and AI accelerators for the {ind.name.toLowerCase()} sector.</p>
              </div>
            )
          })}
        </div>
      </section>
    </SiteLayout>
  )
}
