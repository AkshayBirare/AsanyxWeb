'use client'
import Link from 'next/link'
import { ArrowRight, PlayCircle, Sparkles, TrendingUp, BarChart3, PieChart, Activity, Database, Layers } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-hero-mesh" />
      <div className="absolute inset-0 grid-pattern opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            <span>Microsoft Fabric · Power BI · Azure · Databricks · Snowflake</span>
          </div>
          <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight">
            Transforming <span className="gradient-text animate-gradient">Data</span> into<br/>
            Intelligent <span className="gradient-emerald">Business</span> Decisions
          </h1>
          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
            Helping organizations unlock the full potential of their data through Business Intelligence, Analytics, Data Engineering, AI and Modern Cloud technologies.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/contact" className="btn-primary-brand">Book Free Consultation <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/services" className="btn-ghost-brand"><PlayCircle className="w-4 h-4" /> Explore Services</Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
            {[{k:'7+',v:'Years Experience'},{k:'50+',v:'Dashboards Built'},{k:'10+',v:'Industries Served'}].map((s) => (
              <div key={s.v} className="glass rounded-2xl px-4 py-3">
                <div className="text-2xl font-bold gradient-text">{s.k}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <HeroVisual />
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 flex flex-col items-center text-muted-foreground text-xs">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-current" />
        <span className="mt-1 tracking-widest uppercase">Scroll</span>
      </div>
    </section>
  )
}

function HeroVisual() {
  return (
    <div className="relative h-[520px] animate-fade-up-slow">
      {/* Central dashboard card */}
      <div className="absolute inset-x-6 top-10 md:inset-x-10 md:top-6 glass-strong rounded-3xl p-5 shadow-brand -rotate-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg grid place-items-center bg-gradient-to-br from-blue-500 to-cyan-400 text-white"><BarChart3 className="w-4 h-4" /></div>
            <div>
              <div className="text-sm font-semibold">Executive Overview</div>
              <div className="text-[10px] text-muted-foreground">Real-time · Power BI</div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-emerald-500 text-xs font-semibold"><TrendingUp className="w-3.5 h-3.5" /> +24.6%</div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[{l:'Revenue',v:'₹8.42Cr',t:'+12%'},{l:'Orders',v:'12,480',t:'+18%'},{l:'NPS',v:'62',t:'+4pt'}].map(k => (
            <div key={k.l} className="rounded-xl border border-slate-200/60 dark:border-white/10 p-3 bg-white/60 dark:bg-white/5">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{k.l}</div>
              <div className="text-base font-bold">{k.v}</div>
              <div className="text-[10px] text-emerald-500 font-medium">{k.t}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 h-28 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-800/50 dark:to-slate-800/30 p-3 relative overflow-hidden">
          <svg viewBox="0 0 300 100" className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06D6E0" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#06D6E0" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,80 C40,60 60,20 100,30 C140,40 160,80 200,60 C240,45 260,10 300,20 L300,100 L0,100 Z" fill="url(#g1)" />
            <path d="M0,80 C40,60 60,20 100,30 C140,40 160,80 200,60 C240,45 260,10 300,20" fill="none" stroke="#1E6BFF" strokeWidth="2" />
          </svg>
          <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] font-medium text-muted-foreground"><Activity className="w-3 h-3" /> Live</div>
        </div>
      </div>

      {/* Floating KPI card top right */}
      <div className="absolute -top-2 right-0 md:right-4 glass rounded-2xl p-4 shadow-brand w-56 float-slow">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg grid place-items-center bg-gradient-to-br from-emerald-500 to-teal-400 text-white"><PieChart className="w-4 h-4" /></div>
          <div>
            <div className="text-xs text-muted-foreground">Customer Retention</div>
            <div className="text-lg font-bold">92.4%</div>
          </div>
        </div>
        <div className="mt-3 h-1.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
          <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400" />
        </div>
      </div>

      {/* Data pipeline card bottom left */}
      <div className="absolute bottom-0 left-0 md:left-2 glass rounded-2xl p-4 shadow-brand w-64 float-medium">
        <div className="flex items-center gap-2 mb-3">
          <Layers className="w-4 h-4 text-cyan-500" />
          <div className="text-xs font-semibold">Fabric Lakehouse</div>
          <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 font-semibold">Healthy</span>
        </div>
        <div className="space-y-1.5">
          {['Bronze → Silver','Silver → Gold','Semantic Model','Power BI'].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
              <div className="text-[11px] flex-1 truncate text-muted-foreground">{s}</div>
              <div className="text-[10px] font-mono text-emerald-500">OK</div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Copilot card right bottom */}
      <div className="absolute bottom-4 right-2 md:right-10 glass rounded-2xl p-4 shadow-brand w-56 float-fast">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg grid place-items-center bg-gradient-to-br from-fuchsia-500 to-purple-500 text-white"><Sparkles className="w-4 h-4" /></div>
          <div>
            <div className="text-xs text-muted-foreground">Copilot Insight</div>
            <div className="text-[11px] font-semibold leading-tight">Q3 revenue outperformed forecast by 18%.</div>
          </div>
        </div>
      </div>

      {/* Decorative rings */}
      <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-cyan-400/20" />
      <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-blue-500/10" />
    </div>
  )
}
