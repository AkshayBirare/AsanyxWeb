'use client'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative bg-white dark:bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-70" />
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#F5F8FC] via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950" />

      <div className="relative container-x pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-7 animate-fade-up">
            <div className="eyebrow">IT Consulting &middot; Business Intelligence</div>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-tight text-slate-900 dark:text-white">
              Enterprise Business Intelligence &amp;<br className="hidden md:block"/>
              <span className="text-brand">Data Analytics Consulting</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Helping organizations build scalable Business Intelligence, Data Engineering, Analytics and AI-driven solutions that accelerate decision making.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/contact" className="btn-primary">Talk to an Expert <ArrowRight className="w-4 h-4" /></Link>
              <Link href="/services" className="btn-outline">Our Services</Link>
            </div>
            <div className="mt-10 flex items-center gap-8 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Certified Consultants</div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Enterprise Delivery</div>
              <div className="hidden md:flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Global Remote Teams</div>
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
      <div className="card-corp p-5 shadow-[0_30px_80px_-20px_rgba(11,31,58,0.20)]">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-500">Executive Overview</div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">FY25 Performance</div>
          </div>
          <div className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-semibold">Live</div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {[{l:'Revenue',v:'₹8.42Cr',t:'+12.4%'},{l:'Orders',v:'12,480',t:'+18.2%'},{l:'NPS',v:'62',t:'+4pt'}].map(k => (
            <div key={k.l} className="rounded-lg border border-slate-200 dark:border-white/10 p-3 bg-slate-50/60 dark:bg-white/5">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider">{k.l}</div>
              <div className="text-base font-bold text-slate-900 dark:text-white">{k.v}</div>
              <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">{k.t}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 h-32 relative rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 overflow-hidden">
          <svg viewBox="0 0 400 130" className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="heroChart" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0057B7" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#0057B7" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,100 C50,80 100,40 160,50 C220,60 260,90 320,70 C360,55 380,30 400,35 L400,130 L0,130 Z" fill="url(#heroChart)" />
            <path d="M0,100 C50,80 100,40 160,50 C220,60 260,90 320,70 C360,55 380,30 400,35" fill="none" stroke="#0057B7" strokeWidth="2" />
            {[40,90,140,190,240,290,340].map((x,i)=>(
              <circle key={i} cx={x} cy={100-Math.sin(i*0.8)*30-i*2} r="2.5" fill="#0057B7" />
            ))}
          </svg>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-slate-200 dark:border-white/10 p-3">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Top Region</div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white">West · 42%</div>
            <div className="mt-2 h-1.5 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
              <div className="h-full w-[42%] rounded-full" style={{background:'#0057B7'}} />
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 dark:border-white/10 p-3">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Forecast</div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white">₹9.6Cr Q4</div>
            <div className="mt-2 h-1.5 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
              <div className="h-full w-[68%] rounded-full bg-emerald-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating side card */}
      <div className="hidden md:block absolute -bottom-8 -left-8 card-corp p-4 w-56 shadow-[0_20px_50px_-20px_rgba(11,31,58,0.20)]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-[#0B1F3A] text-white grid place-items-center text-[10px] font-bold">FBR</div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Data Platform</div>
            <div className="text-xs font-semibold text-slate-900 dark:text-white">Microsoft Fabric</div>
          </div>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {['Lakehouse','Warehouse','Semantic'].map(t => <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 font-semibold">{t}</span>)}
        </div>
      </div>

      <div className="hidden md:block absolute -top-6 -right-6 card-corp p-3 shadow-[0_20px_50px_-20px_rgba(11,31,58,0.20)]">
        <div className="text-[10px] text-slate-500 uppercase tracking-wider">On-time Delivery</div>
        <div className="flex items-end gap-2">
          <div className="text-2xl font-bold text-slate-900 dark:text-white">98.4%</div>
          <div className="text-[10px] text-emerald-600 font-semibold pb-1">+2.1%</div>
        </div>
      </div>
    </div>
  )
}
