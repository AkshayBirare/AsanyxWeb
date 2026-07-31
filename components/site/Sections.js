'use client'
import * as Icons from 'lucide-react'
import Link from 'next/link'
import { services, whyAsanyx, whyClientsChoose, deliveryProcess, industries, technologies, engagementModels, caseStudies, site } from '@/lib/site'

function Icon({ name, className }) {
  const C = Icons[name] || Icons.Circle
  return <C className={className} />
}

export function SectionHead({ eyebrow, title, subtitle, center, action }) {
  return (
    <div className={`max-w-3xl mb-12 ${center ? 'mx-auto text-center' : ''} flex ${center ? 'flex-col items-center' : 'flex-col'} justify-between gap-6 md:mb-14`}>
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h2>
        {subtitle && <p className="mt-4 text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export function TrustBar() {
  const stack = ['Power BI','Microsoft Fabric','Azure','Azure Synapse','Databricks','Snowflake','SQL Server','Python','Apache Spark','Azure DevOps','Tabular Editor','SharePoint']
  return (
    <section className="border-y border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950/50">
      <div className="container-x py-8">
        <div className="flex items-center gap-8">
          <div className="hidden md:block text-xs uppercase tracking-[0.2em] text-slate-500 shrink-0">Delivering on</div>
          <div className="flex-1 overflow-hidden">
            <div className="marquee flex gap-10 whitespace-nowrap">
              {[...stack, ...stack].map((t, i) => (
                <div key={i} className="text-sm font-semibold text-slate-500 dark:text-slate-400">{t}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function WhyAsanyx() {
  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-slate-950">
      <div className="container-x">
        <SectionHead eyebrow="Why ASANYX" title="Enterprise-grade delivery, without enterprise-grade overhead" subtitle="A boutique consulting firm with the disciplines, standards and craft of a top-tier practice." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyAsanyx.map(w => (
            <div key={w.title} className="card-corp p-7">
              <div className="w-11 h-11 rounded-lg bg-[#EAF0F8] dark:bg-white/5 text-brand grid place-items-center">
                <Icon name={w.icon} className="w-5 h-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">{w.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ServicesOverview() {
  return (
    <section className="py-20 lg:py-28 bg-navy-50 dark:bg-slate-900/30">
      <div className="container-x">
        <SectionHead eyebrow="Our Services" title="End-to-end BI, data and AI capabilities" subtitle="From strategy and architecture through delivery, adoption and support - across the modern data stack." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(s => (
            <Link key={s.slug} href={`/services#${s.slug}`} className="card-corp p-7 block">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-lg bg-[#EAF0F8] dark:bg-white/5 text-brand grid place-items-center">
                  <Icon name={s.icon} className="w-5 h-5" />
                </div>
                <Icons.ArrowUpRight className="w-4 h-4 text-slate-400" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{s.tagline}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {s.groups[0].items.slice(0,4).map(i => (
                  <span key={i} className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 font-medium">{i}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function IndustriesGrid({ compact }) {
  const list = compact ? industries.slice(0, 8) : industries
  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-slate-950">
      <div className="container-x">
        <SectionHead eyebrow="Industries" title="Deep domain expertise across sectors" subtitle="Solutions engineered with an understanding of the way each industry actually runs." />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {list.map(ind => (
            <div key={ind.name} className="card-corp p-5">
              <div className="w-10 h-10 rounded-lg bg-[#EAF0F8] dark:bg-white/5 text-brand grid place-items-center"><Icon name={ind.icon} className="w-5 h-5" /></div>
              <div className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">{ind.name}</div>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{ind.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function TechnologiesSection() {
  const groups = [...new Set(technologies.map(t => t.group))]
  return (
    <section className="py-20 lg:py-28 bg-navy-50 dark:bg-slate-900/30">
      <div className="container-x">
        <SectionHead eyebrow="Technologies" title="A modern, best-of-breed data stack" subtitle="We select technologies on merit and design solutions built to last." />
        <div className="space-y-8">
          {groups.map(g => (
            <div key={g}>
              <div className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">{g}</div>
              <div className="flex flex-wrap gap-2">
                {technologies.filter(t => t.group === g).map(t => (
                  <span key={t.name} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand" /> {t.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EngagementModels() {
  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-slate-950">
      <div className="container-x">
        <SectionHead eyebrow="Engagement Models" title="Flexible ways to work with us" subtitle="Pick the model that matches your objectives, timeline and level of ownership." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {engagementModels.map(m => (
            <div key={m.name} className="card-corp p-7">
              <div className="w-11 h-11 rounded-lg bg-[#EAF0F8] dark:bg-white/5 text-brand grid place-items-center"><Icon name={m.icon} className="w-5 h-5" /></div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">{m.name}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{m.desc}</p>
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/10">
                <div className="text-[10px] uppercase tracking-widest text-slate-500">Best for</div>
                <div className="text-xs text-slate-700 dark:text-slate-200 mt-1">{m.best}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function WhyClientsChoose() {
  return (
    <section className="py-20 lg:py-28 bg-navy-50 dark:bg-slate-900/30">
      <div className="container-x">
        <SectionHead eyebrow="Why Clients Choose Us" title="Consistent standards. Predictable delivery." />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {whyClientsChoose.map(w => (
            <div key={w.title} className="card-corp p-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#EAF0F8] dark:bg-white/5 text-brand grid place-items-center shrink-0"><Icon name={w.icon} className="w-5 h-5" /></div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">{w.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function DeliveryProcess() {
  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-slate-950">
      <div className="container-x">
        <SectionHead eyebrow="Our Delivery Process" title="A repeatable, disciplined approach" subtitle="Seven stages that keep every engagement on track from first conversation to ongoing support." />
        <div className="relative">
          <div className="hidden lg:block absolute left-6 top-8 bottom-8 w-px bg-slate-200 dark:bg-white/10" />
          <div className="grid gap-4">
            {deliveryProcess.map((p, i) => (
              <div key={p.step} className="grid grid-cols-[52px_1fr] gap-4 lg:gap-6 items-start">
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-white dark:bg-slate-900 border-2 border-brand text-brand grid place-items-center font-bold text-sm">{p.step}</div>
                </div>
                <div className="card-corp p-5 flex flex-col md:flex-row md:items-center md:gap-8">
                  <div className="font-semibold text-slate-900 dark:text-white text-base md:w-56">{p.title}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300 mt-1 md:mt-0 flex-1">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function LeadershipTeaser() {
  return (
    <section className="py-20 bg-navy-50 dark:bg-slate-900/30">
      <div className="container-x">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <div className="eyebrow">Leadership</div>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Led by practitioners, not just consultants</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-2xl">ASANYX is founded and led by hands-on Business Intelligence and Data Analytics practitioners with delivery experience across Finance, Banking, Logistics, Shipping, Retail and EdTech.</p>
            <div className="mt-5"><Link href="/leadership" className="btn-outline">Meet the Leadership</Link></div>
          </div>
          <div className="card-corp p-6 flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden ring-1 ring-slate-200 shrink-0 bg-slate-100">
              <img src={site.founderPhoto} alt="Akshay Birare" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">Akshay Birare</div>
              <div className="text-xs text-slate-500">CEO &amp; Founder</div>
              <a href={site.founder.linkedin} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-[11px] text-brand font-semibold"><Icons.Linkedin className="w-3 h-3" /> LinkedIn</a>
            </div>
          </div>
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
        <SectionHead
          eyebrow="Case Studies"
          title="Representative engagements we deliver"
          subtitle="Sample engagements illustrating the kinds of outcomes ASANYX designs and delivers. Clearly labelled as representative examples."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((c, i) => (
            <div key={c.title} className="card-corp p-7 flex flex-col">
              <div className="text-[10px] uppercase tracking-widest text-slate-500">{c.industry}</div>
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
      <div className={`text-[10px] font-semibold uppercase tracking-widest ${highlight ? 'text-brand' : 'text-slate-500'}`}>{label}</div>
      <div className="mt-1 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{text}</div>
    </div>
  )
}

export function CTABand() {
  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="container-x">
        <div className="rounded-3xl bg-[#0B1F3A] text-white p-10 md:p-14 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30" style={{background: 'radial-gradient(circle at 20% 20%, rgba(0,87,183,0.4), transparent 45%), radial-gradient(circle at 80% 80%, rgba(0,166,229,0.25), transparent 40%)'}} />
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8 justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-widest text-slate-300">Ready to modernise</div>
              <h2 className="mt-3 text-2xl md:text-4xl font-bold tracking-tight max-w-2xl">Talk to a BI &amp; data expert about your next initiative.</h2>
              <p className="mt-3 text-slate-300 max-w-xl">A free 30-minute conversation to understand your KPIs, current stack and the fastest path to measurable value.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/contact" className="btn-primary">Talk to an Expert <Icons.ArrowRight className="w-4 h-4" /></Link>
              <Link href="/services" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white border border-white/25 hover:bg-white/10">Our Services</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
