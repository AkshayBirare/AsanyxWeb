'use client'
import SiteLayout from '@/components/site/Layout'
import { CTABand } from '@/components/site/Sections'
import { site } from '@/lib/site'
import { Linkedin, CheckCircle2 } from 'lucide-react'

export default function LeadershipPage() {
  return (
    <SiteLayout>
      <section className="bg-section-alt py-16 lg:py-24 border-b border-slate-200 dark:border-white/10">
        <div className="container-x">
          <div className="eyebrow">Leadership</div>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white max-w-3xl">Led by hands-on practitioners</h1>
          <p className="mt-5 text-lg text-slate-600 dark:text-slate-300 max-w-2xl">ASANYX Analytics is founded and led by BI and data professionals with deep enterprise delivery experience. The company remains the primary focus of every engagement - leadership is here to guarantee delivery quality.</p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white dark:bg-slate-950">
        <div className="container-x grid lg:grid-cols-2 gap-8">
          {/* CEO & Founder */}
          <div className="card-corp p-8">
            <div className="flex items-start gap-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 bg-slate-100 ring-4 ring-brand-violet/20">
                <img src={site.founderPhoto} alt={site.founder.name} className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="text-xl font-semibold text-slate-900 dark:text-white">{site.founder.name}</div>
                <div className="text-sm text-brand-violet font-semibold">{site.founder.designation}</div>
                <a href={site.founder.linkedin} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300 hover:text-brand-blue"><Linkedin className="w-4 h-4" /> LinkedIn Profile</a>
              </div>
            </div>
            <p className="mt-6 text-slate-600 dark:text-slate-300 leading-relaxed">{site.founder.bio}</p>
            <div className="mt-6">
              <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Focus Areas</div>
              <div className="mt-3 grid sm:grid-cols-2 gap-2">
                {site.founder.focus.map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200"><CheckCircle2 className="w-4 h-4 text-brand-blue" /> {f}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Reserved for future co-founder */}
          <div className="card-corp p-8 border-dashed border-slate-300 dark:border-white/15 flex flex-col justify-center items-center text-center bg-[#F9FAFF] dark:bg-slate-900/40">
            <div className="w-20 h-20 rounded-full brand-gradient-soft border border-dashed border-brand-blue/30 grid place-items-center text-brand-violet font-bold text-sm">
              Reserved
            </div>
            <div className="mt-6 text-lg font-semibold text-slate-900 dark:text-white">Growing Our Leadership</div>
            <div className="text-sm text-slate-500 mt-1 max-w-sm">This space is reserved for future leadership profiles as ASANYX Analytics continues to grow its team.</div>
          </div>
        </div>
      </section>
      <CTABand />
    </SiteLayout>
  )
}
