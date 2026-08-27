'use client'
import * as Icons from 'lucide-react'
import Link from 'next/link'
import Reveal from './Reveal'

function Icon({ name, className }) {
  const C = Icons[name] || Icons.Circle
  return <C className={className} />
}

export function SectionHead({ eyebrow, title, subtitle, action }) {
  return (
    <div className="grid md:grid-cols-12 gap-8 items-end mb-14">
      <div className="md:col-span-8">
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2 className="mt-4 text-3xl md:text-[44px] font-medium tracking-tight leading-[1.1] text-ink dark:text-white">{title}</h2>
        {subtitle && <p className="mt-4 text-lg text-muted-brand max-w-2xl leading-relaxed">{subtitle}</p>}
      </div>
      {action && <div className="md:col-span-4 md:text-right">{action}</div>}
    </div>
  )
}

export function CoreCapabilities() {
  const capabilities = [
    { title: 'Business Intelligence & Reporting', desc: 'Executive dashboards, semantic models and KPI reporting on Power BI and Microsoft Fabric.', icon: 'BarChart3', href: '/services#business-intelligence-reporting' },
    { title: 'BI Migration', desc: 'Hands-on migrations from Tableau, Qlik Sense and Looker to Power BI - business logic, calculations and figures preserved exactly.', icon: 'Repeat', href: '/migration-services' },
    { title: 'Staff Augmentation', desc: 'Power BI, Fabric and data engineering consultants embedded in your team - short or long-term, offshore or remote.', icon: 'Users', href: '/services#staff-augmentation' },
    { title: 'White-Label Delivery Partnership', desc: 'Behind-the-scenes BI and data delivery for agencies and consultancies - client-branded, confidentiality-first.', icon: 'Handshake', href: '/services#white-label-delivery' },
  ]
  return (
    <section className="section-y">
      <div className="container-x">
        <Reveal>
          <SectionHead
            eyebrow="What we do"
            title={<>Focused practices. <span className="serif text-asanyx-blue">One partner</span> for your data platform.</>}
            subtitle="A focused set of services from a senior team. Four core practices below - see all seven on our services page."
            action={<Link href="/services" className="btn-outline">All services <Icons.ArrowRight className="w-4 h-4" /></Link>}
          />
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delay={i * 90} className="h-full">
            <Link href={c.href} className="card-min p-8 group block h-full">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="w-10 h-10 rounded-lg text-asanyx-blue grid place-items-center" style={{background:'rgba(18,87,199,0.08)'}}>
                    <Icon name={c.icon} className="w-5 h-5" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-ink dark:text-white">{c.title}</h3>
                  <p className="mt-2 text-[15px] text-muted-brand leading-relaxed max-w-md">{c.desc}</p>
                </div>
                <Icons.ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-asanyx-blue transition" />
              </div>
            </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function MigrationSection() {
  return (
    <section id="migration-services" className="section-y bg-cream dark:bg-transparent border-y border-hairline">
      <div className="container-x">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Reveal>
            <div className="eyebrow">Featured practice</div>
            <h2 className="mt-4 text-3xl md:text-[44px] font-medium tracking-tight leading-[1.1] text-ink dark:text-white">
              Modernize your analytics platform - <span className="serif text-asanyx-blue">without losing business logic.</span>
            </h2>
            <p className="mt-6 text-lg text-muted-brand leading-relaxed">Structured, low-risk migrations from Tableau, Qlik Sense and Looker to Power BI and Microsoft Fabric - preserving figures, semantics and user trust.</p>
            <div className="mt-8 flex gap-3">
              <Link href="/contact" className="btn-primary">Plan your migration <Icons.ArrowRight className="w-4 h-4" /></Link>
            </div>
            </Reveal>
          </div>
          <div className="md:col-span-7">
            <Reveal delay={120}>
            <div className="grid grid-cols-3 gap-3">
              {['Tableau','Qlik Sense','Looker'].map(t => (
                <div key={t} className="card-min bg-white dark:bg-slate-900 py-6 text-center text-sm font-medium text-ink dark:text-slate-200">{t}</div>
              ))}
              <div className="col-span-3 flex items-center justify-center py-3 text-muted-brand"><Icons.ArrowDown className="w-5 h-5" /></div>
              <div className="col-span-3 rounded-xl brand-gradient text-white p-6 text-center" style={{background:'#0B1B3A'}}>
                <div className="text-xs uppercase tracking-widest opacity-70">Modern platform</div>
                <div className="text-2xl font-medium mt-1">Power BI  &middot;  Microsoft Fabric</div>
              </div>
              <div className="col-span-3 grid grid-cols-5 gap-2 pt-2">
                {['Discovery','Design','Migrate','Validate','Adopt'].map((s,i) => (
                  <div key={s} className="text-center">
                    <div className="w-8 h-8 mx-auto rounded-full border border-hairline text-asanyx-blue grid place-items-center text-[11px] font-semibold">{i+1}</div>
                    <div className="mt-2 text-[11px] font-medium text-ink dark:text-slate-200">{s}</div>
                  </div>
                ))}
              </div>
            </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export function TechnologiesQuiet() {
  const techs = [
    { name: 'Power BI', url: 'https://api.iconify.design/logos:microsoft-power-bi.svg' },
    { name: 'Microsoft Fabric', url: null, initial: 'F' },
    { name: 'Azure', url: 'https://api.iconify.design/logos:microsoft-azure.svg' },
    { name: 'GCP', url: 'https://api.iconify.design/logos:google-cloud.svg' },
    { name: 'Snowflake', url: 'https://api.iconify.design/logos:snowflake-icon.svg' },
    { name: 'Azure Databricks', url: 'https://api.iconify.design/logos:databricks-icon.svg' },
  ]
  return (
    <section className="section-y-sm">
      <div className="container-x">
        <Reveal>
        <div className="eyebrow text-center block">Delivering on</div>
        <div className="mt-8 grid grid-cols-3 md:grid-cols-6 gap-6 items-start">
          {techs.map(t => (
            <div key={t.name} className="flex flex-col items-center gap-3 group">
              <div className="w-12 h-12 grid place-items-center opacity-70 group-hover:opacity-100 transition">
                {t.url ? (
                  <img src={t.url} alt={t.name} className="max-w-full max-h-full object-contain" loading="lazy" />
                ) : (
                  <div className="w-full h-full rounded-lg bg-ink text-white grid place-items-center text-lg font-semibold">{t.initial}</div>
                )}
              </div>
              <div className="text-[12px] font-medium text-muted-brand group-hover:text-ink dark:group-hover:text-white transition text-center leading-tight">{t.name}</div>
            </div>
          ))}
        </div>
        </Reveal>
      </div>
    </section>
  )
}

export function ValuesSection() {
  const values = [
    { n: '01', title: 'Business outcomes over dashboards', desc: 'Every solution is anchored to a KPI, a decision, an outcome. Not a report count.' },
    { n: '02', title: 'Governed by design, not by exception', desc: 'Security, quality and lineage are built in from day one - so trust scales with the platform.' },
    { n: '03', title: 'Long-term partnership over short-term delivery', desc: 'We stay engaged beyond go-live to keep your data platform valuable as the business evolves.' },
  ]
  return (
    <section className="section-y">
      <div className="container-x">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Reveal>
            <div className="eyebrow">How we work</div>
            <h2 className="mt-4 text-3xl md:text-[44px] font-medium tracking-tight leading-[1.1] text-ink dark:text-white">Three <span className="serif text-asanyx-blue">principles</span> behind every engagement.</h2>
            </Reveal>
          </div>
          <div className="md:col-span-8 space-y-10">
            {values.map((v, i) => (
              <Reveal key={v.n} delay={i * 90} className="pb-10 border-b border-hairline last:border-0 last:pb-0">
              <div className="grid grid-cols-[64px_1fr] gap-6">
                <div className="text-2xl font-medium text-asanyx-blue">{v.n}</div>
                <div>
                  <div className="text-xl font-semibold text-ink dark:text-white">{v.title}</div>
                  <p className="mt-2 text-[15px] text-muted-brand leading-relaxed max-w-2xl">{v.desc}</p>
                </div>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EngagementQuiet() {
  const models = [
    { name: 'Project-based delivery', desc: 'Fixed scope, defined outcomes.' },
    { name: 'Dedicated remote resources', desc: 'Full-time BI or data professionals.' },
    { name: 'Managed analytics services', desc: 'Run and evolve, with SLAs.' },
    { name: 'Consulting & advisory', desc: 'Strategy, architecture, roadmap.' },
  ]
  return (
    <section className="section-y bg-cream dark:bg-transparent border-y border-hairline">
      <div className="container-x">
        <Reveal>
          <SectionHead
            eyebrow="Engagement models"
            title={<>Engage us in the <span className="serif text-asanyx-blue">way that fits</span> your program.</>}
            action={<Link href="/engagement-models" className="btn-outline">All engagement models <Icons.ArrowRight className="w-4 h-4" /></Link>}
          />
        </Reveal>
        <div className="grid md:grid-cols-4 gap-6">
          {models.map((m, i) => (
            <Reveal key={m.name} delay={i * 80}>
            <div className="pb-6 border-b border-hairline">
              <div className="text-lg font-semibold text-ink dark:text-white">{m.name}</div>
              <p className="mt-1 text-[14px] text-muted-brand">{m.desc}</p>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CTABand() {
  return (
    <section className="section-y">
      <div className="container-x">
        <Reveal>
        <div className="rounded-2xl bg-ink text-white p-12 md:p-16">
          <div className="max-w-2xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-signal-cyan">Let&apos;s talk</div>
            <h2 className="mt-4 text-3xl md:text-[44px] font-medium tracking-tight leading-[1.1]">
              A short conversation is often the fastest path to <span className="serif text-signal-cyan">clarity.</span>
            </h2>
            <p className="mt-4 text-white/70 text-lg">Tell us about your KPIs, your current stack, or the initiative you&apos;re planning. We&apos;ll respond within one business day.</p>
            <div className="mt-8 flex gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium bg-white text-ink hover:bg-slate-100">Talk to an expert <Icons.ArrowRight className="w-4 h-4" /></Link>
              <Link href="/services" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white border border-white/25 hover:bg-white/5">Our services</Link>
            </div>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  )
}

/* Kept for other pages that import them - streamlined versions */
export function IndustriesGrid() {
  const list = [
    { name: 'Finance' }, { name: 'Banking' }, { name: 'Logistics' }, { name: 'Shipping' },
    { name: 'Supply Chain' }, { name: 'Retail' }, { name: 'Healthcare' }, { name: 'Manufacturing' }, { name: 'EdTech' },
  ]
  return (
    <section className="section-y">
      <div className="container-x">
        <SectionHead eyebrow="Industries" title="Where our consultants have delivered" subtitle="Delivery experience across sectors ranging from regulated financial services to modern digital businesses." />
        <div className="grid grid-cols-3 md:grid-cols-3 gap-y-6 gap-x-10">
          {list.map(ind => (
            <div key={ind.name} className="pb-4 border-b border-hairline text-lg font-medium text-ink dark:text-white">{ind.name}</div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function TechnologiesSection() { return <TechnologiesQuiet /> }
export function EngagementModels() { return <EngagementQuiet /> }
export function WhyAsanyx() { return <ValuesSection /> }
export function PrimaryOfferingsSection() { return <CoreCapabilities /> }
export function MigrationServicesSection() { return <MigrationSection /> }
export function ServicesOverview() { return null }
export function DeliveryProcess() { return null }
export function LeadershipTeaser() { return null }
export function CredibilityStrip() { return null }
export function CaseStudiesGrid() { return null }
