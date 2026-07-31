'use client'
import SiteLayout from '@/components/site/Layout'
import { CTABand } from '@/components/site/Sections'
import { site } from '@/lib/site'
import { Linkedin, CheckCircle2 } from 'lucide-react'

function ProfileCard({ person, photo, tint = 'violet' }) {
  const ringColor = tint === 'violet' ? 'ring-brand-violet/20' : 'ring-brand-blue/20'
  return (
    <div className="card-corp p-8">
      <div className="flex items-start gap-6">
        <div className={`relative w-24 h-24 rounded-full overflow-hidden shrink-0 bg-slate-100 ring-4 ${ringColor}`}>
          {photo ? (
            <img src={photo} alt={person.name} className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 grid place-items-center brand-gradient text-white font-bold text-2xl">{person.name.split(' ').map(n => n[0]).join('')}</div>
          )}
        </div>
        <div className="flex-1">
          <div className="text-xl font-semibold text-slate-900 dark:text-white">{person.name}</div>
          <div className="text-sm text-brand-violet font-semibold">{person.designation}</div>
          <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300 hover:text-brand-blue"><Linkedin className="w-4 h-4" /> LinkedIn Profile</a>
        </div>
      </div>
      <p className="mt-6 text-slate-600 dark:text-slate-300 leading-relaxed">{person.bio}</p>
      {person.bio2 && <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed">{person.bio2}</p>}
      {person.focus && (
        <div className="mt-6">
          <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Focus Areas</div>
          <div className="mt-3 grid sm:grid-cols-2 gap-2">
            {person.focus.map(f => (
              <div key={f} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200"><CheckCircle2 className="w-4 h-4 text-brand-blue" /> {f}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function LeadershipPage() {
  return (
    <SiteLayout>
      <section className="bg-[#F5F7FF] dark:bg-slate-900/30 py-16 lg:py-24 border-b border-slate-200 dark:border-white/10">
        <div className="container-x">
          <div className="eyebrow">Leadership</div>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white max-w-3xl">Led by hands-on practitioners</h1>
          <p className="mt-5 text-lg text-slate-600 dark:text-slate-300 max-w-2xl">ASANYX Analytics is founded and led by BI and data professionals with deep enterprise delivery experience. The company remains the primary focus of every engagement - leadership is here to guarantee delivery quality.</p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white dark:bg-slate-950">
        <div className="container-x grid lg:grid-cols-2 gap-8">
          <ProfileCard person={site.founder} photo={site.founderPhoto} tint="violet" />
          <ProfileCard person={site.coFounder} photo={site.coFounderPhoto} tint="blue" />
        </div>
      </section>
      <CTABand />
    </SiteLayout>
  )
}
