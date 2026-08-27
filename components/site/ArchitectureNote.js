'use client'
import { Fragment } from 'react'
import Reveal from './Reveal'
import { ArrowRight, ArrowDown } from 'lucide-react'

const layers = [
  { name: 'Bronze', dot: '#B87333', desc: 'Raw data lands as-is from source systems.' },
  { name: 'Silver', dot: '#9CA3AF', desc: 'Cleaned, conformed and quality-checked.' },
  { name: 'Gold', dot: '#D4A017', desc: 'Business-ready tables that power reporting.' },
]

export default function ArchitectureNote() {
  return (
    <section className="section-y-sm bg-cream dark:bg-transparent border-y border-hairline" id="data-architecture">
      <div className="container-x">
        <Reveal>
          <div className="eyebrow">Our Data Architecture Approach</div>
          <p className="mt-4 text-[15px] md:text-base text-muted-brand leading-relaxed max-w-3xl">
            For client engagements involving data platform builds, we follow a medallion architecture &mdash; raw data lands in a Bronze layer, gets cleaned and conformed in Silver, and is modeled into business-ready Gold tables that power reporting like the dashboards shown here. The sample dashboards above demonstrate our dashboard design approach; production engagements are built on this underlying data architecture.
          </p>
        </Reveal>
        <div className="mt-8 grid md:grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-3 max-w-3xl">
          {layers.map((l, i) => (
            <Fragment key={l.name}>
              {i > 0 && (
                <div className="flex items-center justify-center text-muted-brand py-1">
                  <ArrowRight className="hidden md:block w-4 h-4" />
                  <ArrowDown className="md:hidden w-4 h-4" />
                </div>
              )}
              <Reveal delay={i * 100}>
                <div className="h-full rounded-xl border border-hairline bg-white dark:bg-slate-900 p-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: l.dot }} />
                    <span className="text-sm font-semibold text-ink dark:text-white">{l.name}</span>
                  </div>
                  <p className="mt-2 text-[13px] text-muted-brand leading-relaxed">{l.desc}</p>
                </div>
              </Reveal>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
