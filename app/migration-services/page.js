'use client'
import SiteLayout from '@/components/site/Layout'
import Link from 'next/link'
import { ArrowRight, Check, Compass, LayoutDashboard, RefreshCw, ShieldCheck, Sparkles, TrendingUp, Clock, GaugeCircle, Layers, Users, LineChart } from 'lucide-react'

const STEPS = [
  {
    n: '01', title: 'Discover',
    lead: 'Understand what you have, what matters and where the risk lives.',
    bullets: [
      'Inventory of every workbook, app and report on your source platform',
      'Rank by business criticality, usage and complexity',
      'Map data sources, gateways, refresh schedules and security',
      'Identify duplicate, unused and orphaned assets to retire before migration',
    ],
    icon: Compass,
  },
  {
    n: '02', title: 'Design',
    lead: 'A target architecture on Power BI and Microsoft Fabric that preserves business logic and improves governance.',
    bullets: [
      'Semantic model design in Power BI / Fabric (star schema, DAX patterns)',
      'Workspace, dataset and app strategy aligned to org structure',
      'RLS / OLS security model, sensitivity labels and lifecycle',
      'Reusable page templates, themes and calculation groups',
    ],
    icon: LayoutDashboard,
  },
  {
    n: '03', title: 'Migrate',
    lead: 'Rebuild the right way - not a like-for-like copy, but a like-for-outcome modernization.',
    bullets: [
      'Wave-based delivery: pilot, tier-1 executive reports, then long tail',
      'DAX translation of Tableau LOD / Qlik set analysis / Looker LookML',
      'Automated regression scripts to compare figures against source',
      'Parallel run - source and target stay live until sign-off',
    ],
    icon: RefreshCw,
  },
  {
    n: '04', title: 'Validate',
    lead: 'Numbers must reconcile. Trust must transfer with the reports.',
    bullets: [
      'Row-level and aggregate validation against source system',
      'Performance benchmark: cold, warm and concurrent user load',
      'UAT with business owners; sign-off tracked per report',
      'Documented mapping: source object → Power BI artifact',
    ],
    icon: ShieldCheck,
  },
  {
    n: '05', title: 'Adopt',
    lead: 'A migration is only successful if the business actually switches.',
    bullets: [
      'Role-based training - executives, analysts, report authors',
      'Cutover plan with source-of-truth date and freeze window',
      'Center of Excellence enablement and governance handover',
      '30-90 day hypercare with defined SLAs',
    ],
    icon: Sparkles,
  },
]

const FROM_TO = [
  { from: 'Tableau',    to: 'Power BI · Fabric', notes: 'LOD → DAX · Extracts → Semantic model · Sites → Workspaces' },
  { from: 'Qlik Sense', to: 'Power BI · Fabric', notes: 'Set analysis → DAX · QVDs → Fabric lakehouse · Sections → Datasets' },
  { from: 'Looker',     to: 'Power BI · Fabric', notes: 'LookML → Semantic model · Explores → Datasets · Boards → Apps' },
]

const OUTCOMES = [
  { icon: Clock,         k: '40-60%', v: 'faster report load times post-migration' },
  { icon: GaugeCircle,   k: '25-45%', v: 'reduction in annual BI licensing cost' },
  { icon: Layers,        k: '2-5x',   v: 'consolidation of legacy reports into modern models' },
  { icon: Users,         k: '90%+',   v: 'business user adoption within 90 days' },
]

const CASES = [
  {
    industry: 'Financial Services · APAC',
    from: 'Tableau', to: 'Power BI on Microsoft Fabric',
    challenge: '380+ Tableau workbooks across 6 departments, inconsistent metrics and rising licensing costs.',
    approach: 'Wave-based rebuild - executive suite first, then risk and finance. Semantic model consolidated 41 workbooks into 6 governed datasets.',
    outcome: ['Retired 42% of unused reports', 'Cut annual BI license spend by ~38%', 'Executive dashboards refreshed 4x faster'],
  },
  {
    industry: 'Global Logistics',
    from: 'Qlik Sense', to: 'Power BI on Azure',
    challenge: 'Fragmented Qlik apps with duplicated business logic across regions; slow YoY reporting on peak days.',
    approach: 'Set analysis rewritten as DAX calculation groups. Regional apps consolidated into one workspace with row-level security by region.',
    outcome: ['One version of the truth across 11 regions', 'Peak-day dashboards under 3s', 'Weekly board pack automated end-to-end'],
  },
  {
    industry: 'Retail · India',
    from: 'Legacy SSRS + Excel', to: 'Power BI · Fabric Lakehouse',
    challenge: 'Store-manager reports delivered via SSRS + Excel workarounds; poor mobile experience, no real-time SKU view.',
    approach: 'Fabric lakehouse for POS and inventory, star-schema semantic model, mobile-first Power BI apps with paginated report parity.',
    outcome: ['Real-time SKU visibility across 900+ stores', 'Store-manager adoption 92% in 60 days', 'Retired 6 legacy report platforms'],
  },
]

const FAQS = [
  {
    q: 'How long does a typical migration take?',
    a: 'For 100-300 reports we usually plan 12-20 weeks, delivered in 3 waves. Anything beyond that is scoped as a program with a dedicated pod - discovery is 2-3 weeks, then rolling waves of 4-6 weeks each.',
  },
  {
    q: 'Do you migrate everything as-is?',
    a: 'No - and that is on purpose. We use discovery to retire duplicate, unused and low-value reports before we touch them. On average, 30-40% of source reports never make it to Power BI.',
  },
  {
    q: 'What about the numbers - will they still match?',
    a: 'We run automated regression against the source system for every migrated report. Every KPI in a business-critical report is reconciled at row and aggregate level before sign-off.',
  },
  {
    q: 'Can our team keep using the source platform during the migration?',
    a: 'Yes. We run source and target in parallel until each business unit signs off on their new reports. Cutover is planned per unit, not big-bang.',
  },
  {
    q: 'Do you also handle the underlying data platform?',
    a: 'If you need it. We can lift the semantic layer alone, or modernize the data platform underneath onto Microsoft Fabric, Azure, Databricks or Snowflake as part of the same program.',
  },
]

function Section({ id, children, className = '' }) {
  return <section id={id} className={`section-y ${className}`}>{children}</section>
}

export default function MigrationServicesPage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[70%] dot-grid opacity-60" />
        <div className="container-x relative pt-24 pb-14 md:pt-36 md:pb-16">
          <div className="max-w-4xl">
            <div className="eyebrow">Migration Services</div>
            <h1 className="mt-6 text-[40px] sm:text-5xl md:text-[72px] font-medium leading-[1.05] tracking-tight text-ink dark:text-white">
              Modernize your analytics platform - <span className="serif text-asanyx-blue">without losing business logic.</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-muted-brand max-w-2xl leading-relaxed">
              A structured, low-risk migration from Tableau, Qlik Sense and Looker to Power BI on Microsoft Fabric - preserving figures, semantics and the trust your business already has in its reports.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/contact?type=migration" className="btn-primary">Plan your migration <ArrowRight className="w-4 h-4" /></Link>
              <a href="#methodology" className="btn-link">See the 5-step methodology <ArrowRight className="w-4 h-4" /></a>
            </div>
          </div>
        </div>

        {/* From → To band */}
        <div className="container-x pb-16 md:pb-20">
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 pt-8 border-t border-hairline">
            {FROM_TO.map((r, i) => (
              <div key={i} className="rounded-2xl border border-hairline bg-card/40 p-5">
                <div className="flex items-center gap-3 text-sm">
                  <span className="rounded-full px-3 py-1 bg-slate-900/5 dark:bg-white/5 border border-hairline">{r.from}</span>
                  <ArrowRight className="w-4 h-4 text-asanyx-blue" />
                  <span className="rounded-full px-3 py-1 text-asanyx-blue bg-asanyx-blue/5 border border-asanyx-blue/30">{r.to}</span>
                </div>
                <div className="mt-3 text-[13px] text-muted-brand leading-relaxed">{r.notes}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <Section className="border-t border-hairline">
        <div className="container-x">
          <div className="eyebrow">What clients see</div>
          <h2 className="mt-4 text-3xl md:text-[40px] font-medium tracking-tight leading-[1.1] text-ink dark:text-white max-w-3xl">
            The outcomes we anchor <span className="serif text-asanyx-blue">every program</span> to.
          </h2>
          <div className="mt-12 grid md:grid-cols-4 gap-6">
            {OUTCOMES.map((o, i) => {
              const Icon = o.icon
              return (
                <div key={i} className="border-l border-asanyx-blue/40 pl-5">
                  <Icon className="w-5 h-5 text-asanyx-blue" strokeWidth={1.5} />
                  <div className="mt-4 text-4xl md:text-5xl font-medium tracking-tight text-ink dark:text-white">{o.k}</div>
                  <div className="mt-2 text-sm text-muted-brand leading-snug">{o.v}</div>
                </div>
              )
            })}
          </div>
          <p className="mt-8 text-[12px] text-muted-brand max-w-2xl">Ranges reflect observed outcomes across recent ASANYX-led migrations. Actual results depend on source-platform complexity, data volumes and organizational readiness.</p>
        </div>
      </Section>

      {/* METHODOLOGY */}
      <Section id="methodology" className="border-t border-hairline">
        <div className="container-x">
          <div className="grid md:grid-cols-12 gap-8 items-end mb-14">
            <div className="md:col-span-8">
              <div className="eyebrow">The methodology</div>
              <h2 className="mt-4 text-3xl md:text-[44px] font-medium tracking-tight leading-[1.1] text-ink dark:text-white">
                Five steps. <span className="serif text-asanyx-blue">No surprises.</span>
              </h2>
              <p className="mt-4 text-lg text-muted-brand max-w-2xl leading-relaxed">
                Every ASANYX migration follows the same disciplined sequence - refined over multiple enterprise programs across BFSI, retail and logistics.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {STEPS.map((s, i) => {
              const Icon = s.icon
              return (
                <div key={s.n} className="grid md:grid-cols-12 gap-8 md:gap-10 border-t border-hairline pt-8">
                  <div className="md:col-span-3">
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-asanyx-blue" strokeWidth={1.5} />
                      <div className="text-xs font-semibold tracking-[0.15em] text-asanyx-blue">{s.n}</div>
                    </div>
                    <div className="mt-3 text-2xl md:text-3xl font-medium tracking-tight text-ink dark:text-white">{s.title}</div>
                  </div>
                  <div className="md:col-span-9">
                    <p className="text-lg text-ink/85 dark:text-slate-200 leading-relaxed">{s.lead}</p>
                    <ul className="mt-5 grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                      {s.bullets.map(b => (
                        <li key={b} className="flex items-start gap-2.5 text-[14.5px] text-muted-brand">
                          <Check className="w-4 h-4 text-asanyx-blue mt-0.5 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Section>

      {/* CASE SNIPPETS */}
      <Section className="border-t border-hairline">
        <div className="container-x">
          <div className="eyebrow">Selected engagements</div>
          <h2 className="mt-4 text-3xl md:text-[40px] font-medium tracking-tight leading-[1.1] text-ink dark:text-white max-w-3xl">
            A pattern of <span className="serif text-asanyx-blue">measurable outcomes</span>.
          </h2>
          <p className="mt-4 text-lg text-muted-brand max-w-2xl leading-relaxed">Client names are anonymized. Numbers reflect the delivered engagement.</p>

          <div className="mt-12 space-y-6">
            {CASES.map((c, i) => (
              <div key={i} className="grid md:grid-cols-12 gap-8 border-t border-hairline pt-8">
                <div className="md:col-span-4">
                  <div className="text-xs font-semibold tracking-[0.15em] uppercase text-asanyx-blue">{c.industry}</div>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                    <span className="rounded-full px-2.5 py-0.5 bg-slate-900/5 dark:bg-white/5 border border-hairline text-[12px]">{c.from}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-asanyx-blue" />
                    <span className="rounded-full px-2.5 py-0.5 text-asanyx-blue bg-asanyx-blue/5 border border-asanyx-blue/30 text-[12px]">{c.to}</span>
                  </div>
                </div>
                <div className="md:col-span-8">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <div className="text-[11px] font-semibold tracking-widest uppercase text-muted-brand">Challenge</div>
                      <p className="mt-2 text-[14.5px] leading-relaxed text-ink/85 dark:text-slate-200">{c.challenge}</p>
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold tracking-widest uppercase text-muted-brand">Approach</div>
                      <p className="mt-2 text-[14.5px] leading-relaxed text-ink/85 dark:text-slate-200">{c.approach}</p>
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold tracking-widest uppercase text-muted-brand">Outcome</div>
                      <ul className="mt-2 space-y-1.5">
                        {c.outcome.map(o => (
                          <li key={o} className="flex items-start gap-2 text-[13.5px] text-ink/85 dark:text-slate-200 leading-relaxed">
                            <TrendingUp className="w-3.5 h-3.5 text-emerald-500 mt-1 shrink-0" strokeWidth={2} />
                            <span>{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="border-t border-hairline">
        <div className="container-x">
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <div className="eyebrow">Frequently asked</div>
              <h2 className="mt-4 text-3xl md:text-[36px] font-medium tracking-tight leading-[1.1] text-ink dark:text-white">
                Practical answers, from real programs.
              </h2>
              <p className="mt-4 text-[15px] text-muted-brand leading-relaxed">Have a question that is not here? <Link href="/contact" className="text-asanyx-blue underline underline-offset-4">Ask an ASANYX practitioner</Link>.</p>
            </div>
            <div className="md:col-span-8">
              <div className="divide-y divide-hairline border-y border-hairline">
                {FAQS.map((f, i) => (
                  <details key={i} className="group py-5">
                    <summary className="flex items-start justify-between gap-6 cursor-pointer list-none">
                      <span className="text-[16px] md:text-[17px] font-medium text-ink dark:text-white">{f.q}</span>
                      <span className="mt-1 text-asanyx-blue text-lg transition group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-muted-brand max-w-3xl">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="border-t border-hairline">
        <div className="container-x">
          <div className="grid md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-8">
              <div className="eyebrow">Ready when you are</div>
              <h2 className="mt-4 text-3xl md:text-[44px] font-medium tracking-tight leading-[1.05] text-ink dark:text-white">
                Let's scope your migration - <span className="serif text-asanyx-blue">no obligation, no fluff.</span>
              </h2>
              <p className="mt-4 text-lg text-muted-brand max-w-2xl leading-relaxed">
                Share your source platform, rough report count and target date. We'll respond with an indicative approach, wave plan and effort estimate.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Link href="/contact?type=migration" className="btn-primary">Plan your migration <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </div>
      </Section>
    </SiteLayout>
  )
}
