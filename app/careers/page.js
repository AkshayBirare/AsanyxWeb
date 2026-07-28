'use client'
import SiteLayout from '@/components/site/Layout'
import { SectionHeader } from '@/components/site/Section'
import { useState } from 'react'
import { toast } from 'sonner'
import { UploadCloud, Send, BellRing } from 'lucide-react'

export default function CareersPage() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', role:'', message:'', resumeUrl:'' })
  const [busy, setBusy] = useState(false)
  const [sub, setSub] = useState('')
  const submit = async (e) => {
    e.preventDefault(); setBusy(true)
    try {
      const res = await fetch('/api/careers/apply', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
      const data = await res.json()
      if (data.ok) { toast.success('Application submitted. We will reach out when a matching role opens.'); setForm({ name:'', email:'', phone:'', role:'', message:'', resumeUrl:'' }) }
      else toast.error(data.error || 'Something went wrong')
    } catch { toast.error('Network error') }
    setBusy(false)
  }
  const subscribe = async (e) => {
    e.preventDefault()
    if (!sub) return
    const res = await fetch('/api/newsletter', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email: sub }) })
    const data = await res.json()
    if (data.ok) { toast.success('You will hear from us when we open new roles.'); setSub('') } else toast.error('Could not subscribe')
  }
  const onFile = (e) => {
    const f = e.target.files?.[0]; if (!f) return
    setForm(fm => ({ ...fm, resumeUrl: `local://${f.name}` }))
    toast.success(`Attached: ${f.name}`)
  }
  return (
    <SiteLayout>
      <div className="pt-32 pb-8 bg-hero-mesh">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader eyebrow="Careers" title="Build the future of data with us" subtitle="We are always interested in talented BI, data engineering and AI professionals. No current openings, but we build a strong bench." />
        </div>
      </div>
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl glass p-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 px-3 py-1 text-xs font-semibold"><BellRing className="w-3.5 h-3.5" /> No current openings</div>
            <h3 className="mt-4 text-xl font-bold">Join our talent network</h3>
            <p className="mt-1 text-sm text-muted-foreground">Send us your resume and interests. When a role opens that matches your profile, we will reach out.</p>
            <form onSubmit={submit} className="mt-5 space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <input required value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="Full name" className="h-11 rounded-xl px-3 text-sm bg-white/70 dark:bg-white/5 border border-slate-200 dark:border-white/10" />
                <input required type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} placeholder="Email" className="h-11 rounded-xl px-3 text-sm bg-white/70 dark:bg-white/5 border border-slate-200 dark:border-white/10" />
                <input value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} placeholder="Phone" className="h-11 rounded-xl px-3 text-sm bg-white/70 dark:bg-white/5 border border-slate-200 dark:border-white/10" />
                <input value={form.role} onChange={e => setForm({...form, role:e.target.value})} placeholder="Role of interest" className="h-11 rounded-xl px-3 text-sm bg-white/70 dark:bg-white/5 border border-slate-200 dark:border-white/10" />
              </div>
              <textarea value={form.message} onChange={e => setForm({...form, message:e.target.value})} rows={4} placeholder="A few lines about you" className="w-full rounded-xl px-3 py-2 text-sm bg-white/70 dark:bg-white/5 border border-slate-200 dark:border-white/10" />
              <label className="flex items-center gap-3 rounded-xl border border-dashed border-slate-300 dark:border-white/15 p-4 cursor-pointer hover:bg-white/40 dark:hover:bg-white/5">
                <UploadCloud className="w-5 h-5 text-cyan-500" />
                <div className="text-sm">
                  <div className="font-semibold">Upload resume</div>
                  <div className="text-xs text-muted-foreground">{form.resumeUrl ? form.resumeUrl.replace('local://','') : 'PDF, DOC or DOCX'}</div>
                </div>
                <input onChange={onFile} type="file" accept=".pdf,.doc,.docx" className="hidden" />
              </label>
              <button disabled={busy} className="btn-primary-brand w-full">{busy ? 'Sending...' : <>Submit Application <Send className="w-4 h-4" /></>}</button>
            </form>
          </div>
          <div className="rounded-2xl glass p-6">
            <h3 className="text-xl font-bold">Subscribe for future openings</h3>
            <p className="mt-1 text-sm text-muted-foreground">Get notified when we open new positions.</p>
            <form onSubmit={subscribe} className="mt-4 flex gap-2">
              <input type="email" required value={sub} onChange={e => setSub(e.target.value)} placeholder="Your email" className="flex-1 h-11 rounded-xl px-3 text-sm bg-white/70 dark:bg-white/5 border border-slate-200 dark:border-white/10" />
              <button className="btn-primary-brand !py-2 !px-4">Subscribe</button>
            </form>
            <div className="mt-8">
              <h4 className="font-semibold">What we look for</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>- Deep craft in Power BI, DAX and semantic modelling</li>
                <li>- Strong SQL, Python and cloud engineering</li>
                <li>- Curiosity about business problems, not only technology</li>
                <li>- Care about performance, governance and long-term platform value</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
