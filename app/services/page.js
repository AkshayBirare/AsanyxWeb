'use client'
import SiteLayout from '@/components/site/Layout'
import { CTABand, MigrationServicesSection } from '@/components/site/Sections'
import { services } from '@/lib/site'
import * as Icons from 'lucide-react'
import Link from 'next/link'

export default function ServicesPage() {
  return (
    <SiteLayout>
      <section className="bg-[#F5F7FF] dark:bg-slate-900/30 py-16 lg:py-24 border-b border-slate-200 dark:border-white/10">
        <div className="container-x">
          <div className="eyebrow">Our Services</div>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white max-w-3xl">End-to-end BI, data engineering and analytics services</h1>
          <p className="mt-5 text-lg text-slate-600 dark:text-slate-300 max-w-2xl">Consulting, delivery, staff augmentation and managed services across the modern data stack.</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {services.map(s => <a key={s.slug} href={`#${s.slug}`} className="btn-outline !py-2 !px-4 !text-[13px]">{s.title}</a>)}
          </div>
        </div>
      </section>

      <MigrationServicesSection />

      {services.filter(s => s.slug !== 'migration-services').map((s, i) => {
        const Icon = Icons[s.icon] || Icons.Circle
        return (
          <section key={s.slug} id={s.slug} className={`py-16 lg:py-24 ${i % 2 === 0 ? 'bg-[#F5F7FF] dark:bg-slate-900/30' : 'bg-white dark:bg-slate-950'}`}>
            <div className="container-x grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4">
                <div className="w-12 h-12 rounded-lg bg-brand-tint text-brand-violet grid place-items-center"><Icon className="w-6 h-6" /></div>
                <h2 className="mt-5 text-3xl font-bold text-slate-900 dark:text-white">{s.title}</h2>
                <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed">{s.tagline}</p>
                <Link href="/contact" className="mt-6 btn-primary">Discuss engagement <Icons.ArrowRight className="w-4 h-4" /></Link>
              </div>
              <div className="lg:col-span-8">
                <div className="grid sm:grid-cols-2 gap-2">
                  {s.items.map(item => (
                    <div key={item} className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 px-3.5 py-2.5">
                      <Icons.Check className="w-4 h-4 text-brand-blue shrink-0" />
                      <span className="text-sm text-slate-700 dark:text-slate-200">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )
      })}
      <CTABand />
    </SiteLayout>
  )
}
