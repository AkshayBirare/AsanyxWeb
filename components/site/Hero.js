'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ShieldCheck, Repeat, CloudCog, Users, TrendingUp, BarChart3, Layers, Sparkles, Database } from 'lucide-react'
import { site } from '@/lib/site'

export default function Hero() {
  return (
    <section className="relative bg-white dark:bg-slate-950 overflow-hidden border-b border-slate-100 dark:border-white/5">
      <div className="absolute inset-0 hero-grid opacity-60" />
      <div className="absolute -top-40 -right-20 w-[600px] h-[600px] rounded-full blur-3xl opacity-20" style={{background:'radial-gradient(circle,#6929E0,transparent 60%)'}} />
      <div className="absolute -bottom-40 -left-20 w-[500px] h-[500px] rounded-full blur-3xl opacity-15" style={{background:'radial-gradient(circle,#0F6EFF,transparent 60%)'}} />

      <div className="relative container-x pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-7 animate-fade-up">
            <div className="eyebrow">Business Intelligence &middot; Data Analytics &middot; Data Engineering</div>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-tight text-slate-900 dark:text-white">
              Enterprise Business Intelligence &amp;<br className="hidden md:block"/>
              <span className="gradient-text-brand">Data Analytics Consulting</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Helping organizations build scalable Business Intelligence, Data Engineering and AI-driven analytics solutions - powered by Microsoft Power BI, Microsoft Fabric, Azure, Databricks, Snowflake and GCP.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/contact" className="btn-primary">Talk to an Expert <ArrowRight className="w-4 h-4" /></Link>
              <Link href="/services" className="btn-outline">Our Services</Link>
            </div>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
              {[
                { icon: ShieldCheck, label: 'Enterprise-Grade Delivery' },
                { icon: Repeat, label: 'Proven Migration Expertise' },
                { icon: CloudCog, label: 'Scalable Cloud Analytics' },
                { icon: Users, label: 'Experienced Consulting Team' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-brand-tint dark:bg-white/5 text-brand-violet grid place-items-center shrink-0"><Icon className="w-3.5 h-3.5" /></div>
                  <div className="text-[12px] font-medium text-slate-700 dark:text-slate-300 leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 animate-fade-up">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  )
}

function HeroVisual() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Main capability card - branded */}
      <div className="card-corp p-6 shadow-[0_30px_80px_-20px_rgba(20,34,106,0.25)] relative overflow-hidden">
        {/* Brand accent stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 brand-gradient" />

        {/* Logo mark + title row */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-white ring-1 ring-slate-200 dark:ring-white/10 p-1">
              <Image src={site.logoMark} alt="ASANYX" fill className="object-contain p-0.5" sizes="44px" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold">Modern Data Platform</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">ASANYX Analytics</div>
            </div>
          </div>
          <div className="text-[10px] px-2 py-1 rounded-full bg-brand-tint text-brand-violet font-semibold">Enterprise</div>
        </div>

        {/* Capability pills */}
        <div className="mt-6 grid grid-cols-2 gap-2.5">
          {[
            { icon: BarChart3, label: 'Business Intelligence' },
            { icon: Database, label: 'Data Engineering' },
            { icon: Layers, label: 'Microsoft Fabric' },
            { icon: Sparkles, label: 'Analytics & AI' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 p-3 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md brand-gradient text-white grid place-items-center shrink-0"><Icon className="w-4 h-4" /></div>
              <div className="text-[13px] font-semibold text-slate-800 dark:text-slate-200 leading-tight">{label}</div>
            </div>
          ))}
        </div>

        {/* Platform badges */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/10">
          <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold mb-3">Delivering On</div>
          <div className="grid grid-cols-6 gap-2">
            {[
              { name: 'Power BI', url: 'https://api.iconify.design/logos:microsoft-power-bi.svg' },
              { name: 'Azure', url: 'https://api.iconify.design/logos:microsoft-azure.svg' },
              { name: 'GCP', url: 'https://api.iconify.design/logos:google-cloud.svg' },
              { name: 'Snowflake', url: 'https://api.iconify.design/logos:snowflake-icon.svg' },
              { name: 'Databricks', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/databricks.svg' },
              { name: 'Fabric', url: null, initial: 'F' },
            ].map(p => (
              <div key={p.name} className="aspect-square rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 grid place-items-center p-1.5" title={p.name}>
                {p.url ? (
                  <img src={p.url} alt={p.name} className="w-full h-full object-contain" loading="lazy" />
                ) : (
                  <div className="w-full h-full rounded-md brand-gradient text-white grid place-items-center text-xs font-bold">{p.initial}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom outcome bar */}
        <div className="mt-5 rounded-lg brand-gradient text-white p-3 flex items-center justify-between">
          <div>
            <div className="text-[9px] uppercase tracking-widest text-white/70 font-semibold">Outcome</div>
            <div className="text-sm font-bold leading-tight">Turning Data into Decisions That Drive Growth</div>
          </div>
          <TrendingUp className="w-5 h-5 opacity-80" />
        </div>
      </div>

      {/* Floating card - Migration */}
      <div className="hidden md:block absolute -bottom-6 -left-6 card-corp p-3.5 w-56 shadow-[0_20px_50px_-20px_rgba(20,34,106,0.20)] float-y">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-md brand-gradient text-white grid place-items-center">
            <Repeat className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Featured Practice</div>
            <div className="text-[13px] font-bold text-slate-900 dark:text-white leading-tight">Migration Services</div>
          </div>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {['Tableau','Qlik','Looker'].map(t => <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-brand-tint text-brand-navy font-semibold">{t}</span>)}
          <span className="text-[9px] px-1.5 py-0.5 rounded brand-gradient text-white font-semibold">→ Power BI</span>
        </div>
      </div>

      {/* Floating card - Engagement */}
      <div className="hidden md:block absolute -top-4 -right-4 card-corp p-3.5 shadow-[0_20px_50px_-20px_rgba(20,34,106,0.20)] float-y" style={{animationDelay:'-3s'}}>
        <div className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Engagement</div>
        <div className="text-[13px] font-bold text-slate-900 dark:text-white mt-0.5">Dedicated Remote</div>
        <div className="mt-2 flex -space-x-1.5">
          {[0,1,2,3].map(i => <div key={i} className="w-5 h-5 rounded-full brand-gradient border-2 border-white dark:border-slate-900" />)}
          <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-white/10 border-2 border-white dark:border-slate-900 grid place-items-center text-[8px] font-bold text-slate-600">+</div>
        </div>
      </div>
    </div>
  )
}
