'use client'
import SiteLayout from '@/components/site/Layout'
import { SectionHeader } from '@/components/site/Section'
import { services } from '@/lib/site'
import { ServicesGrid, CTABanner } from '@/components/site/Sections'
import { CheckCircle2 } from 'lucide-react'

export default function ServicesPage() {
  return (
    <SiteLayout>
      <div className="pt-32 pb-8 bg-hero-mesh">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader eyebrow="Our Services" title="Data & AI capabilities, engineered for scale" subtitle="A single partner for BI, engineering, analytics, AI and governance." />
        </div>
      </div>
      <ServicesGrid />
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 space-y-14">
          {services.map(s => (
            <div key={s.slug} id={s.slug} className="grid md:grid-cols-3 gap-8 items-start">
              <div>
                <h3 className="text-2xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
              </div>
              <div className="md:col-span-2 grid sm:grid-cols-2 gap-2">
                {s.items.map(i => (
                  <div key={i} className="flex items-center gap-2 rounded-xl px-3 py-2 glass">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm">{i}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <CTABanner />
    </SiteLayout>
  )
}
