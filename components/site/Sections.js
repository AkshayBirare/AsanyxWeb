'use client'
import * as Icons from 'lucide-react'
import Link from 'next/link'
import { services, whyAsanyx, deliveryProcess, industries, technologies, engagementModels, caseStudies, credibility, primaryOfferings } from '@/lib/site'

function Icon({ name, className }) {
  const C = Icons[name] || Icons.Circle
  return <C className={className} />
}

export function SectionHead({ eyebrow, title, subtitle, center }) {
  return (
    <div className={`max-w-3xl mb-12 md:mb-14 ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h2>
      {subtitle && <p className="mt-4 text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">{subtitle}</p>}
    </div>
  )
}

export function CredibilityStrip() {
  return (
    <section className="border-y border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950/50">
      <div className="container-x py-6">
        <div className="flex items-center gap-8">
          <div className="hidden md:block text-[10px] uppercase tracking-[0.22em] text-slate-500 shrink-0 font-semibold">Why ASANYX</div>
          <div className="flex-1 overflow-hidden">
            <div className="marquee flex gap-10 whitespace-nowrap">
              {[...credibility, ...credibility].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full brand-gradient" /> {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function PrimaryOfferingsSection() {
  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-slate-950">
      <div className="container-x">
        <SectionHead eyebrow="Our Offerings" title="End-to-end BI, data and analytics services" subtitle="A boutique consulting company delivering enterprise-scale BI, data engineering, cloud analytics and managed services." />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {primaryOfferings.map(o => (
            <div key={o.title} className="card-corp p-5">
              <div className="w-10 h-10 rounded-lg bg-brand-tint text-brand-violet grid place-items-center"><Icon name={o.icon} className="w-5 h-5" /></div>
              <div className="mt-4 text-sm font-semibold text-slate-900 dark:text-white leading-tight">{o.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function WhyAsanyx() {
  return (
    <section className="py-20 lg:py-28 bg-section-alt">
      <div className="container-x">
        <SectionHead eyebrow="Why ASANYX" title="Enterprise-grade delivery, without enterprise-grade overhead" subtitle="The disciplines and standards of a top-tier consulting practice - in a focused boutique team." />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {whyAsanyx.map(w => (
            <div key={w.title} className="card-corp p-6">
              <div className="w-10 h-10 rounded-lg bg-brand-tint text-brand-violet grid place-items-center"><Icon name={w.icon} className="w-5 h-5" /></div>
              <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">{w.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function MigrationServicesSection() {
  const mig = services.find(s => s.slug === 'migration-services')
  if (!mig) return null
  return (
    <section id="migration-services" className="py-20 lg:py-28 bg-white dark:bg-slate-950">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <div className="eyebrow">Migration Services</div>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Modernize your analytics platform - without losing business logic</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">We help organizations move from legacy BI tools to Microsoft Power BI and Microsoft Fabric with a structured, low-risk methodology that preserves business logic, reconciles figures and drives user adoption.</p>
            <div className="mt-6 grid grid-cols-2 gap-2">
              {mig.items.map(i => (
                <div key={i} className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 px-3 py-2">
                  <Icons.ArrowRight className="w-4 h-4 text-brand-blue shrink-0" />
                  <span className="text-sm text-slate-700 dark:text-slate-200">{i}</span>
                </div>
              ))}
            </div>
            <Link href="/contact" className="mt-8 btn-primary">Plan Your Migration <Icons.ArrowRight className="w-4 h-4" /></Link>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl brand-gradient-soft border border-brand-blue/20 p-6">
              <div className="text-[10px] uppercase tracking-widest text-brand-violet font-semibold">Our Migration Methodology</div>
              <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">A structured, low-risk approach</h3>
              <div className="mt-6 space-y-3">
                {mig.approach.map((a, i) => (
                  <div key={a.step} className="card-corp p-5 flex items-start gap-4 bg-white">
                    <div className="w-10 h-10 rounded-full brand-gradient text-white grid place-items-center font-bold text-sm shrink-0">{i+1}</div>
                    <div>
                      <div className="font-semibold text-slate-900">{a.step}</div>
                      <div className="text-sm text-slate-600 mt-0.5 leading-relaxed">{a.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ServicesOverview() {
  return (
    <section className="py-20 lg:py-28 bg-section-alt">
      <div className="container-x">
        <SectionHead eyebrow="Services" title="Consulting, delivery, resources and managed services" subtitle="Explore how ASANYX Analytics helps organizations design, build and operate modern data platforms." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(s => (
            <Link key={s.slug} href={`/services#${s.slug}`} className={`card-corp p-7 block ${s.highlight ? 'border-brand-blue/30 ring-1 ring-brand-blue/10' : ''}`}>
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-lg bg-brand-tint text-brand-violet grid place-items-center"><Icon name={s.icon} className="w-5 h-5" /></div>
                {s.highlight && <span className="text-[10px] font-bold uppercase tracking-widest text-brand-violet">Featured</span>}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{s.tagline}</p>
              <div className="mt-5 flex items-center gap-1 text-[13px] text-brand-blue font-semibold">Learn more <Icons.ArrowUpRight className="w-3.5 h-3.5" /></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function IndustriesGrid() {
  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-slate-950">
      <div className="container-x">
        <SectionHead eyebrow="Industries" title="Where our consultants have delivered" subtitle="Delivery experience across sectors ranging from regulated financial services to modern digital businesses." />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {industries.map(ind => (
            <div key={ind.name} className="card-corp p-6">
              <div className="w-11 h-11 rounded-lg bg-brand-tint text-brand-violet grid place-items-center"><Icon name={ind.icon} className="w-5 h-5" /></div>
              <div className="mt-4 text-base font-semibold text-slate-900 dark:text-white">{ind.name}</div>
              <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{ind.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function TechnologiesSection() {
  return (
    <section className="py-20 lg:py-28 bg-section-alt">
      <div className="container-x">
        <SectionHead eyebrow="Technologies" title="Built on the leading enterprise data platforms" subtitle="We deliver on the industry-standard technologies powering modern BI and cloud analytics." />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {technologies.map(t => (
            <div key={t.name} className="card-corp p-6 flex items-center gap-4">
              <TechLogo tech={t} />
              <div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Platform</div>
                <div className="text-base font-semibold text-slate-900 dark:text-white mt-0.5 leading-tight">{t.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TechLogo({ tech }) {
  if (tech.logo) {
    return (
      <div className="w-14 h-14 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 grid place-items-center p-2 shrink-0">
        <img src={tech.logo} alt={tech.name} className="w-full h-full object-contain" loading="lazy" />
      </div>
    )
  }
  return (
    <div className="w-14 h-14 rounded-xl grid place-items-center shrink-0 text-white font-bold" style={{ background: `linear-gradient(135deg, ${tech.tint}, ${tech.tint}CC)` }}>
      <span className="text-lg">{tech.initial}</span>
    </div>
  )
}

export function EngagementModels() {
  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-slate-950">
      <div className="container-x">
        <SectionHead eyebrow="Engagement Models" title="Flexible ways to work with ASANYX" subtitle="Pick the model that matches your objectives, timeline and level of ownership." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {engagementModels.map(m => (
            <div key={m.name} className="card-corp p-7">
              <div className="w-11 h-11 rounded-lg bg-brand-tint text-brand-violet grid place-items-center"><Icon name={m.icon} className="w-5 h-5" /></div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">{m.name}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function DeliveryProcess() {
  return (
    <section className="py-20 lg:py-28 bg-section-alt">
      <div className="container-x">
        <SectionHead eyebrow="Our Delivery Process" title="A repeatable, disciplined approach" subtitle="Seven stages keeping every engagement on track from first conversation to ongoing support." />
        <div className="grid gap-3">
          {deliveryProcess.map(p => (
            <div key={p.step} className="grid grid-cols-[56px_1fr] gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 border-2 border-brand-blue text-brand-violet grid place-items-center font-bold text-sm">{p.step}</div>
              <div className="card-corp p-5 flex flex-col md:flex-row md:items-center md:gap-8">
                <div className="font-semibold text-slate-900 dark:text-white md:w-52">{p.title}</div>
                <div className="text-sm text-slate-600 dark:text-slate-300 flex-1 mt-1 md:mt-0">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CaseStudiesGrid({ limit }) {
  const list = limit ? caseStudies.slice(0, limit) : caseStudies
  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-slate-950">
      <div className="container-x">
        <SectionHead eyebrow="Case Studies" title="Representative engagements ASANYX designs and delivers" subtitle="Sample engagements illustrating the kinds of outcomes we deliver. Clearly labelled as representative examples." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map(c => (
            <div key={c.title} className="card-corp p-7 flex flex-col">
              <div className="text-[10px] uppercase tracking-widest text-brand-violet font-semibold">{c.industry}</div>
              <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{c.title}</h3>
              <div className="mt-5 space-y-4 flex-1">
                <Item label="Challenge" text={c.challenge} />
                <Item label="Solution" text={c.solution} />
                <Item label="Business Impact" text={c.impact} highlight />
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10 text-[10px] uppercase tracking-widest text-slate-400">Representative Engagement</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Item({ label, text, highlight }) {
  return (
    <div>
      <div className={`text-[10px] font-semibold uppercase tracking-widest ${highlight ? 'text-brand-violet' : 'text-slate-500'}`}>{label}</div>
      <div className="mt-1 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{text}</div>
    </div>
  )
}

export function LeadershipTeaser() {
  return (
    <section className="py-20 bg-section-alt">
      <div className="container-x">
        <div className="card-corp p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-8 justify-between">
          <div>
            <div className="eyebrow">Leadership</div>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Led by hands-on BI and data practitioners</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-2xl">ASANYX Analytics is a boutique consulting company. Our leadership is here to guarantee delivery quality - the company always remains the primary focus.</p>
          </div>
          <Link href="/leadership" className="btn-outline shrink-0">Meet the Leadership <Icons.ArrowRight className="w-4 h-4" /></Link>
        </div>
      </div>
    </section>
  )
}

export function CTABand() {
  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="container-x">
        <div className="rounded-3xl brand-gradient text-white p-10 md:p-14 relative overflow-hidden">
          <div className="absolute inset-0 opacity-25" style={{background: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4), transparent 45%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.2), transparent 40%)'}} />
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8 justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-widest text-white/80">Ready to modernise</div>
              <h2 className="mt-3 text-2xl md:text-4xl font-bold tracking-tight max-w-2xl">Talk to a BI &amp; data expert about your next initiative.</h2>
              <p className="mt-3 text-white/85 max-w-xl">A free consultation to understand your KPIs, current stack and fastest path to measurable value.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold bg-white text-brand-navy hover:shadow-lg">Talk to an Expert <Icons.ArrowRight className="w-4 h-4" /></Link>
              <Link href="/services" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white border border-white/30 hover:bg-white/10">Our Services</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
