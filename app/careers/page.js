'use client'
import SiteLayout from '@/components/site/Layout'
import { useState } from 'react'
import { toast } from 'sonner'
import { UploadCloud, Send, Briefcase } from 'lucide-react'

export default function CareersPage() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', role:'', message:'', resumeUrl:'' })
  const [busy, setBusy] = useState(false)
  const submit = async (e) => {
    e.preventDefault(); setBusy(true)
    try {
      const res = await fetch('/api/careers/apply', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
      const data = await res.json()
      if (data.ok) { toast.success('Application received. We will reach out when a matching role opens.'); setForm({ name:'', email:'', phone:'', role:'', message:'', resumeUrl:'' }) }
      else toast.error(data.error || 'Something went wrong')
    } catch { toast.error('Network error') }
    setBusy(false)
  }
  const onFile = (e) => {
    const f = e.target.files?.[0]; if (!f) return
    setForm(fm => ({ ...fm, resumeUrl: `local://${f.name}` }))
    toast.success(`Attached: ${f.name}`)
  }
  return (
    <SiteLayout>
      <section className="bg-navy-50 dark:bg-slate-900/30 py-16 lg:py-24 border-b border-slate-200 dark:border-white/10">
        <div className="container-x">
          <div className="eyebrow">Careers</div>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white max-w-3xl">Join our growing team</h1>
          <p className="mt-5 text-lg text-slate-600 dark:text-slate-300 max-w-2xl">We are always interested in strong Business Intelligence, Data Engineering, Analytics and AI professionals. There are no open positions right now - but we review every application and reach out when a matching role opens.</p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white dark:bg-slate-950">
        <div className="container-x max-w-3xl">
          <div className="card-corp p-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#EAF0F8] dark:bg-white/5 text-brand grid place-items-center"><Briefcase className="w-5 h-5" /></div>
              <div>
                <div className="font-semibold text-slate-900 dark:text-white">Talent Pool Application</div>
                <div className="text-sm text-slate-500">No current openings - future-ready</div>
              </div>
            </div>
            <form onSubmit={submit} className="mt-6 space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <input required value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="Full name" className="h-11 rounded-lg px-3.5 text-sm bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10" />
                <input required type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} placeholder="Email" className="h-11 rounded-lg px-3.5 text-sm bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10" />
                <input value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} placeholder="Phone" className="h-11 rounded-lg px-3.5 text-sm bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10" />
                <input value={form.role} onChange={e => setForm({...form, role:e.target.value})} placeholder="Role of interest" className="h-11 rounded-lg px-3.5 text-sm bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10" />
              </div>
              <textarea value={form.message} onChange={e => setForm({...form, message:e.target.value})} rows={4} placeholder="A short note about you" className="w-full rounded-lg px-3.5 py-2.5 text-sm bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10" />
              <label className="flex items-center gap-3 rounded-lg border border-dashed border-slate-300 dark:border-white/15 p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5">
                <UploadCloud className="w-5 h-5 text-brand" />
                <div className="text-sm">
                  <div className="font-semibold text-slate-900 dark:text-white">Upload resume</div>
                  <div className="text-xs text-slate-500">{form.resumeUrl ? form.resumeUrl.replace('local://','') : 'PDF, DOC or DOCX'}</div>
                </div>
                <input onChange={onFile} type="file" accept=".pdf,.doc,.docx" className="hidden" />
              </label>
              <button disabled={busy} className="btn-primary w-full">{busy ? 'Sending...' : <>Submit Application <Send className="w-4 h-4" /></>}</button>
            </form>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
