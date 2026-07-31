'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ShieldCheck, Repeat, CloudCog, Users } from 'lucide-react'
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
            <HeroIllustration />
          </div>
        </div>
      </div>
    </section>
  )
}

function HeroIllustration() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Main dashboard card */}
      <div className="card-corp p-5 shadow-[0_30px_80px_-20px_rgba(20,34,106,0.25)]">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500">Executive Dashboard</div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">Revenue Performance</div>
          </div>
          <div className="text-[10px] px-2 py-0.5 rounded-full bg-brand-tint text-brand-violet font-semibold">Preview</div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {[{l:'Revenue',bar:82},{l:'Orders',bar:64},{l:'Margin',bar:71}].map(k => (
            <div key={k.l} className="rounded-lg border border-slate-200 dark:border-white/10 p-3 bg-slate-50/60 dark:bg-white/5">
              <div className="text-[9px] text-slate-500 uppercase tracking-wider">{k.l}</div>
              <div className="mt-2 h-6 flex items-end gap-0.5">
                {[...Array(8)].map((_,i)=>(<div key={i} className="w-1 rounded-sm brand-gradient" style={{height:`${20+Math.sin(i+k.bar)*40+20}%`}} />))}
              </div>
              <div className="mt-2 h-1 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden"><div className="h-full rounded-full brand-gradient" style={{width:`${k.bar}%`}} /></div>
            </div>
          ))}
        </div>

        <div className="mt-4 h-32 relative rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 overflow-hidden">
          <svg viewBox="0 0 400 130" className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="heroChart" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6929E0" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0F6EFF" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="heroLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#14226A" />
                <stop offset="50%" stopColor="#6929E0" />
                <stop offset="100%" stopColor="#0F6EFF" />
              </linearGradient>
            </defs>
            <path d="M0,100 C50,80 100,40 160,50 C220,60 260,90 320,70 C360,55 380,30 400,35 L400,130 L0,130 Z" fill="url(#heroChart)" />
            <path d="M0,100 C50,80 100,40 160,50 C220,60 260,90 320,70 C360,55 380,30 400,35" fill="none" stroke="url(#heroLine)" strokeWidth="2" />
          </svg>
          <div className="absolute top-2 left-3 text-[9px] uppercase tracking-widest text-slate-500">Trend</div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1 rounded-lg border border-slate-200 dark:border-white/10 p-3">
            <div className="text-[9px] text-slate-500 uppercase tracking-widest">Data Platform</div>
            <div className="text-xs font-semibold text-slate-900 dark:text-white mt-1">Microsoft Fabric</div>
            <div className="mt-2 flex flex-wrap gap-1">
              {['Lakehouse','Warehouse','Semantic'].map(t => <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-brand-tint text-brand-navy dark:bg-white/10 dark:text-slate-200 font-semibold">{t}</span>)}
            </div>
          </div>
        </div>
      </div>

      {/* Floating small card */}
      <div className="hidden md:block absolute -bottom-6 -left-6 card-corp p-3 w-52 shadow-[0_20px_50px_-20px_rgba(20,34,106,0.20)] float-y">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md brand-gradient text-white grid place-items-center text-[10px] font-bold">MS</div>
          <div>
            <div className="text-[9px] text-slate-500 uppercase tracking-widest">Migration</div>
            <div className="text-xs font-semibold text-slate-900 dark:text-white">Tableau → Power BI</div>
          </div>
        </div>
      </div>

      <div className="hidden md:block absolute -top-4 -right-4 card-corp p-3 shadow-[0_20px_50px_-20px_rgba(20,34,106,0.20)] float-y" style={{animationDelay:'-3s'}}>
        <div className="text-[9px] uppercase tracking-widest text-slate-500">Engagement</div>
        <div className="text-xs font-semibold text-slate-900 dark:text-white mt-0.5">Dedicated Remote</div>
        <div className="mt-2 flex -space-x-1.5">
          {[0,1,2,3].map(i => <div key={i} className="w-5 h-5 rounded-full brand-gradient border-2 border-white dark:border-slate-900" />)}
        </div>
      </div>
    </div>
  )
}
