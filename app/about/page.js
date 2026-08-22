'use client'
import SiteLayout from '@/components/site/Layout'
import { WhyAsanyx, DeliveryProcess, CTABand } from '@/components/site/Sections'
import { site } from '@/lib/site'
import { Linkedin, CheckCircle2, Award, Compass, ShieldCheck, Zap, Handshake, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const PHILOSOPHY_ICONS = { 'Business First': Compass, 'Governed by Design': ShieldCheck, 'Performance is a Feature': Zap, 'Long-Term Partnership': Handshake }

export default function AboutPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative bg-section-alt py-16 lg:py-24 border-b border-slate-200/60 dark:border-white/10 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full blur-3xl opacity-30" style={{background:'radial-gradient(circle,#12B6E8,transparent 60%)'}} />
        <div className="container-x relative">
          <div className="eyebrow">About ASANYX</div>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white max-w-3xl">
            An IT consulting company built for <span className="gradient-text-brand">enterprise data delivery</span>
          </h1>
          <p className="mt-5 text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">ASANYX Analytics Private Limited is a boutique IT consulting company specialising in Business Intelligence, Data Engineering and Cloud Analytics. We help organisations design, build and operate modern data platforms that turn data into confident business decisions.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">Talk to an Expert <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/services" className="btn-outline">Our Services</Link>
          </div>
        </div>
      </section>

      {/* Founder + Story */}
      <section className="py-16 lg:py-24 bg-white dark:bg-transparent">
        <div className="container-x">
          <div className="grid lg:grid-cols-12 gap-10">
            {/* Founder card */}
            <div className="lg:col-span-4">
              <div className="card-corp p-6 sticky top-24">
                <div className="relative aspect-square rounded-2xl overflow-hidden ring-1 ring-slate-200 dark:ring-white/10 bg-slate-100">
                  <img src={site.founderPhoto} alt={site.founder.name} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="mt-5">
                  <div className="text-lg font-semibold text-slate-900 dark:text-white">{site.founder.name}</div>
                  <div className="text-sm text-signal-cyan font-semibold">{site.founder.designation}</div>
                  <a href={site.founder.linkedin} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300 hover:text-signal-cyan"><Linkedin className="w-4 h-4" /> View on LinkedIn</a>
                </div>
                <div className="mt-5 pt-5 border-t border-slate-100 dark:border-white/10">
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-3">Focus Areas</div>
                  <div className="space-y-2">
                    {site.founder.focus.map(f => (
                      <div key={f} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200"><CheckCircle2 className="w-4 h-4 text-signal-cyan" /> {f}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Story + Philosophy */}
            <div className="lg:col-span-8">
              <div className="eyebrow">The Story</div>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Founded by a practitioner, not a marketer</h2>
              <div className="mt-6 space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                {site.founderExtended.story.map((p, i) => <p key={i}>{p}</p>)}
              </div>

              <div className="mt-12">
                <div className="eyebrow">Delivery Philosophy</div>
                <h3 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">Four principles behind every engagement</h3>
                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  {site.founderExtended.philosophy.map(p => {
                    const Icon = PHILOSOPHY_ICONS[p.title] || Sparkles
                    return (
                      <div key={p.title} className="card-corp p-5">
                        <div className="w-10 h-10 rounded-lg bg-brand-tint text-signal-cyan grid place-items-center"><Icon className="w-5 h-5" /></div>
                        <div className="mt-4 font-semibold text-slate-900 dark:text-white">{p.title}</div>
                        <div className="mt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{p.desc}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise deep-dive */}
      <section className="py-16 lg:py-24 bg-section-alt border-y border-slate-200/60 dark:border-white/10">
        <div className="container-x">
          <div className="max-w-3xl">
            <div className="eyebrow">Expertise</div>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Deep, hands-on capability across the modern data stack</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">Nearly seven years of enterprise BI and data engineering delivery - from executive semantic models on Power BI &amp; Microsoft Fabric, to migration programs from legacy analytics platforms, to modern cloud data platforms on Azure, Databricks, Snowflake and GCP.</p>
          </div>
          <div className="mt-10 grid md:grid-cols-2 gap-5">
            {site.expertise.map(e => (
              <div key={e.area} className="card-corp p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-signal-cyan font-semibold">Capability</div>
                    <div className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{e.area}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Experience</div>
                    <div className="text-2xl font-bold gradient-text-brand leading-none mt-1">{e.years}<span className="text-base text-slate-500 ml-0.5">yrs</span></div>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {e.items.map(i => <span key={i} className="brand-chip">{i}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries delivered */}
      <section className="py-16 lg:py-24 bg-white dark:bg-transparent">
        <div className="container-x">
          <div className="max-w-3xl">
            <div className="eyebrow">Industries Delivered</div>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Delivered solutions across sectors</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">Direct engagement experience across regulated and non-regulated industries - shaping the way ASANYX approaches every new engagement.</p>
          </div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
            {site.industriesDelivered.map(ind => (
              <div key={ind.name} className="card-corp p-5">
                <div className="flex items-center gap-2"><Award className="w-4 h-4 text-signal-cyan" /><div className="font-semibold text-slate-900 dark:text-white">{ind.name}</div></div>
                <div className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{ind.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyAsanyx />
      <DeliveryProcess />
      <CTABand />
    </SiteLayout>
  )
}
