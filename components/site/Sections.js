'use client'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { SectionHeader } from './Section'
import { services, whyChoose, technologies, industries, caseStudies, faqs, site } from '@/lib/site'

function Icon({ name, className }) {
  const C = Icons[name] || Icons.Circle
  return <C className={className} />
}

export function TrustBar() {
  return (
    <section className="relative py-10 border-y border-slate-200/60 dark:border-white/10 bg-white/50 dark:bg-white/[0.02]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center gap-4">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground shrink-0 hidden md:block">Trusted stack</div>
          <div className="flex-1 overflow-hidden no-scrollbar">
            <div className="marquee flex gap-10 whitespace-nowrap">
              {[...technologies, ...technologies].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <span className={`inline-block w-2 h-2 rounded-full ${t.color.replace('text-','bg-')}`} />
                  {t.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ServicesGrid({ limit }) {
  const list = limit ? services.slice(0, limit) : services
  return (
    <section id="services" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Services" title="End-to-end data & AI capabilities" subtitle="From strategy to production. Explore the disciplines we combine to modernize your data estate and deliver measurable business outcomes." />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {list.map((s, idx) => (
            <motion.div key={s.slug} initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.04 }} className="group relative rounded-2xl p-6 glass card-hover overflow-hidden">
              <div className={`absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br ${s.tint} blur-2xl opacity-70 group-hover:opacity-100 transition`} />
              <div className="relative">
                <div className="w-11 h-11 rounded-xl grid place-items-center bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg">
                  <Icon name={s.icon} className="w-5 h-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                <ul className="mt-4 space-y-1.5">
                  {s.items.slice(0, 5).map(i => (
                    <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                      <Icons.CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> {i}
                    </li>
                  ))}
                  {s.items.length > 5 && <li className="text-[11px] text-muted-foreground/70">+ {s.items.length - 5} more</li>}
                </ul>
                <Link href="/services" className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-cyan-400 group-hover:gap-2 transition-all">
                  Learn more <Icons.ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function WhyChooseUs() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-transparent via-slate-50/60 to-transparent dark:via-slate-950/40">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Why ASANYX" title="Built for enterprise-scale outcomes" subtitle="A single partner for strategy, engineering, analytics and adoption - with the rigor and craft of an internal team." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {whyChoose.map((w, i) => (
            <motion.div key={w.title} initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="rounded-2xl p-5 glass card-hover">
              <div className="w-10 h-10 rounded-xl grid place-items-center bg-gradient-to-br from-emerald-500 to-teal-400 text-white"><Icon name={w.icon} className="w-5 h-5" /></div>
              <div className="mt-4 font-semibold">{w.title}</div>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function IndustriesSection() {
  const featured = industries.filter(i => i.featured)
  const rest = industries.filter(i => !i.featured)
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Industries" title="Deep domain expertise across priority sectors" subtitle="We combine data platform craft with domain understanding across Finance, Technology, Logistics, Supply Chain, Manufacturing and Healthcare." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((ind, i) => (
            <motion.div key={ind.name} initial={{ opacity: 1, scale: 1 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="group relative rounded-2xl p-6 glass card-hover overflow-hidden">
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br from-blue-500/15 to-emerald-500/15 blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl grid place-items-center bg-gradient-to-br from-blue-600 to-emerald-500 text-white shadow-lg"><Icon name={ind.icon} className="w-5 h-5" /></div>
                  <div>
                    <div className="text-base font-bold">{ind.name}</div>
                    <div className="text-[10px] px-1.5 py-0.5 mt-0.5 inline-block rounded-full bg-emerald-500/15 text-emerald-600 font-semibold">Priority Sector</div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{ind.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {rest.map((ind) => (
            <div key={ind.name} className="rounded-2xl p-4 glass card-hover flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg grid place-items-center bg-gradient-to-br from-slate-500 to-slate-600 text-white shrink-0"><Icon name={ind.icon} className="w-5 h-5" /></div>
              <div className="text-sm font-semibold">{ind.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function AboutFounder() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-transparent via-slate-50/60 to-transparent dark:via-slate-950/40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Leadership</div>
        <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">Meet the <span className="gradient-text">Founders</span></h2>
        <p className="mt-3 text-muted-foreground max-w-2xl">The team behind ASANYX Analytics - combining deep data platform craft with disciplined delivery and long-term partnership.</p>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {/* Founder - Akshay */}
          <div className="rounded-3xl glass-strong p-6 md:p-8 relative overflow-hidden card-hover">
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-2xl" />
            <div className="relative flex flex-col sm:flex-row items-start gap-6">
              <div className="relative w-32 h-32 shrink-0 rounded-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 bg-gradient-to-br from-blue-100 to-cyan-50 dark:from-slate-800 dark:to-slate-900">
                <Image src={site.founderPhoto} alt={site.founder.name} fill className="object-cover object-center" />
              </div>
              <div className="flex-1">
                <div className="text-lg font-bold">{site.founder.name}</div>
                <div className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold">{site.founder.designation}</div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {['Power BI','Microsoft Fabric','Azure','SQL','Semantic Models'].map(t => <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-300 font-semibold">{t}</span>)}
                </div>
              </div>
            </div>
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed">{site.founder.bio}</p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{site.founder.bio2}</p>
            <div className="mt-5 flex gap-3">
              <a href={site.founder.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost-brand !py-2 !px-4 !text-[13px]"><Icons.Linkedin className="w-4 h-4" /> LinkedIn</a>
            </div>
          </div>

          {/* Co-Founder - Sanyogita */}
          <div className="rounded-3xl glass-strong p-6 md:p-8 relative overflow-hidden card-hover">
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 blur-2xl" />
            <div className="relative flex flex-col sm:flex-row items-start gap-6">
              <div className="relative w-32 h-32 shrink-0 rounded-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 bg-gradient-to-br from-emerald-100 to-teal-50 dark:from-slate-800 dark:to-slate-900">
                <Image src={site.coFounderPhoto} alt={site.coFounder.name} fill className="object-cover object-center" />
              </div>
              <div className="flex-1">
                <div className="text-lg font-bold">{site.coFounder.name}</div>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{site.coFounder.designation}</div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {['Delivery','Client Success','Data Analytics','Governance'].map(t => <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 font-semibold">{t}</span>)}
                </div>
              </div>
            </div>
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed">{site.coFounder.bio}</p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{site.coFounder.bio2}</p>
            <div className="mt-5 flex gap-3">
              <a href={site.coFounder.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost-brand !py-2 !px-4 !text-[13px]"><Icons.Linkedin className="w-4 h-4" /> LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl">
          {[{k:'7+',v:'Years Experience'},{k:'50+',v:'Dashboards Delivered'},{k:'10+',v:'Industries Served'},{k:'100%',v:'Founder-led Ownership'}].map(s => (
            <div key={s.v} className="rounded-xl glass p-3 text-center">
              <div className="text-xl font-bold gradient-text">{s.k}</div>
              <div className="text-[11px] text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function TechCarousel() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Technologies" title="A modern, best-of-breed stack" subtitle="We design solutions on the technologies that will still be relevant five years from now." />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {technologies.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.02 }} className="group rounded-2xl p-4 text-center glass card-hover">
              <div className={`w-10 h-10 mx-auto rounded-xl grid place-items-center bg-white dark:bg-white/5 ring-1 ring-slate-200 dark:ring-white/10 ${t.color}`}>
                <Icons.Cpu className="w-5 h-5" />
              </div>
              <div className="mt-2 text-xs font-semibold">{t.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CaseStudiesSection({ limit }) {
  const list = limit ? caseStudies.slice(0, limit) : caseStudies
  return (
    <section className="relative py-24 bg-gradient-to-b from-transparent via-slate-50/60 to-transparent dark:via-slate-950/40">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Case Studies" title="Sample outcomes we build" subtitle="Representative examples of the kinds of solutions ASANYX designs and delivers. Not case studies of specific clients." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((c, i) => (
            <motion.div key={c.title} initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="group rounded-2xl overflow-hidden glass card-hover">
              <div className="h-32 relative bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-emerald-500/20">
                <svg viewBox="0 0 300 100" className="absolute inset-0 w-full h-full">
                  <defs>
                    <linearGradient id={`gc${i}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#1E6BFF" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0.5" />
                    </linearGradient>
                  </defs>
                  {[...Array(9)].map((_, j) => (
                    <rect key={j} x={20 + j * 30} y={80 - (Math.abs(Math.sin(i + j)) * 60)} width="16" height={Math.abs(Math.sin(i + j)) * 60 + 8} rx="3" fill={`url(#gc${i})`} />
                  ))}
                </svg>
                <div className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider text-white/90 bg-black/30 backdrop-blur px-2 py-0.5 rounded-full">{c.category}</div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-bold gradient-text">{c.metric}</div>
                    <div className="text-[11px] text-muted-foreground uppercase tracking-wider">{c.metricLabel}</div>
                  </div>
                  <div className={`text-[10px] italic ${c.tag === 'Real Portfolio Project' ? 'text-emerald-600 dark:text-emerald-400 not-italic font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10' : 'text-muted-foreground'}`}>{c.tag || 'Representative example'}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CounterStats() {
  const stats = [{ k: 7, s: '+', l: 'Years of experience' }, { k: 50, s: '+', l: 'Dashboards delivered' }, { k: 10, s: '+', l: 'Industries served' }, { k: 99, s: '%', l: 'Delivery satisfaction' }]
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative rounded-3xl glass-strong p-8 md:p-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-emerald-500/10" />
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(s => <Counter key={s.l} target={s.k} suffix={s.s} label={s.l} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

function Counter({ target, suffix, label }) {
  const [v, setV] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0
        const step = Math.max(1, Math.floor(target / 40))
        const t = setInterval(() => {
          start += step
          if (start >= target) { setV(target); clearInterval(t) } else setV(start)
        }, 24)
        io.disconnect()
      }
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [target])
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold gradient-text">{v}{suffix}</div>
      <div className="mt-1 text-xs md:text-sm text-muted-foreground">{label}</div>
    </div>
  )
}

export function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeader eyebrow="FAQ" title="Frequently asked questions" center />
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="rounded-2xl glass overflow-hidden">
              <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full text-left px-5 py-4 flex items-center justify-between gap-4">
                <span className="font-semibold">{f.q}</span>
                <Icons.Plus className={`w-4 h-4 transition-transform ${open === i ? 'rotate-45' : ''}`} />
              </button>
              {open === i && <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CTABanner() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative rounded-3xl overflow-hidden p-10 md:p-14 text-center shadow-brand">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A2540] via-[#1E6BFF] to-[#06D6E0] animate-gradient" />
          <div className="absolute inset-0 opacity-30" style={{backgroundImage:'radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px)', backgroundSize:'50px 50px'}} />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-3 py-1 text-xs font-medium text-white"><Icons.Sparkles className="w-3.5 h-3.5" /> Free 30-minute consultation</div>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold text-white tracking-tight">Ready to modernize your data platform?</h2>
            <p className="mt-3 text-white/80 max-w-2xl mx-auto">Talk to our founder about your KPIs, current stack and roadmap. Walk away with a concrete point of view - no obligation.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold bg-white text-slate-900 hover:shadow-glow transition">Book Free Consultation <Icons.ArrowRight className="w-4 h-4" /></Link>
              <Link href="/services" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold bg-white/10 text-white border border-white/30 backdrop-blur hover:bg-white/20">Explore Services</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
