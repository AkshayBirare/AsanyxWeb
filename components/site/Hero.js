'use client'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[70%] dot-grid opacity-60" />
      <div className="container-x relative pt-24 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-4xl">
          <div className="eyebrow animate-fade-up">A boutique data & BI consulting practice</div>
          <h1 className="mt-6 text-[44px] sm:text-6xl md:text-[80px] font-medium leading-[1.02] tracking-tight text-ink dark:text-white animate-fade-up-delay-1">
            We help enterprises turn <span className="serif text-asanyx-blue">data</span><br className="hidden md:block"/>
            into <span className="serif text-asanyx-blue">decisions</span> that drive growth.
          </h1>
          <p className="mt-8 text-lg md:text-xl text-muted-brand max-w-2xl leading-relaxed animate-fade-up-delay-2">
            ASANYX Analytics designs, builds and operates modern Business Intelligence and data platforms - with the craft of a top-tier practice and the focus of a boutique team.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4 animate-fade-up-delay-2">
            <Link href="/contact" className="btn-primary">Talk to an expert <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/services" className="btn-link">Explore our services <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </div>

      {/* Understated capability strip */}
      <div className="container-x pb-16 md:pb-24 animate-fade-up-delay-2">
        <div className="grid md:grid-cols-4 gap-x-10 gap-y-6 pt-10 border-t border-hairline">
          {[
            { k: 'BI', v: 'Business Intelligence & Reporting' },
            { k: 'MG', v: 'Tableau, Qlik Sense & Looker → Power BI migrations' },
            { k: 'SA', v: 'Staff Augmentation & Dedicated Delivery' },
            { k: 'WL', v: 'White-Label Delivery for Agencies & Consultancies' },
          ].map(o => (
            <div key={o.k} className="flex items-start gap-3">
              <div className="text-xs font-semibold tracking-[0.15em] text-asanyx-blue mt-1">{o.k}</div>
              <div className="text-[15px] text-ink dark:text-slate-200 leading-snug">{o.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
