'use client'
import SiteLayout from '@/components/site/Layout'
import { useState } from 'react'
import { toast } from 'sonner'
import { Mail, Phone, MapPin, Clock, Linkedin, Send } from 'lucide-react'
import { site, inquiryCategories } from '@/lib/site'

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', company:'', phone:'', service:'consultation', message:'' })
  const [busy, setBusy] = useState(false)
  const submit = async (e) => {
    e.preventDefault(); setBusy(true)
    try {
      const res = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
      const data = await res.json()
      if (data.ok) { toast.success('Thank you. We will respond within one business day.'); setForm({ name:'', email:'', company:'', phone:'', service:'consultation', message:'' }) }
      else toast.error(data.error || 'Something went wrong')
    } catch { toast.error('Network error') }
    setBusy(false)
  }
  return (
    <SiteLayout>
      <section className="bg-navy-50 dark:bg-slate-900/30 py-16 lg:py-24 border-b border-slate-200 dark:border-white/10">
        <div className="container-x">
          <div className="eyebrow">Contact</div>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white max-w-3xl">Talk to a BI &amp; data expert</h1>
          <p className="mt-5 text-lg text-slate-600 dark:text-slate-300 max-w-2xl">Tell us about your goals, current stack or hiring need. We will respond within one business day.</p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white dark:bg-slate-950">
        <div className="container-x grid md:grid-cols-5 gap-10">
          <div className="md:col-span-2 space-y-4">
            <div className="card-corp p-6">
              <div className="font-semibold text-slate-900 dark:text-white">Reach us</div>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-brand" /> <a href={`mailto:${site.email}`}>{site.email}</a></li>
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-brand" /> <a href={`tel:${site.phone}`}>{site.phone}</a></li>
                <li className="flex items-center gap-3"><Clock className="w-4 h-4 text-brand" /> {site.hours}</li>
                <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-brand" /> India</li>
                <li className="flex items-center gap-3"><Linkedin className="w-4 h-4 text-brand" /> <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              </ul>
            </div>
            <div className="card-corp p-6">
              <div className="font-semibold text-slate-900 dark:text-white">Inquiry Categories</div>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
                {inquiryCategories.map(c => <li key={c.value}>- {c.label}</li>)}
              </ul>
            </div>
          </div>

          <form onSubmit={submit} className="md:col-span-3 card-corp p-6 md:p-8 space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Full name" value={form.name} onChange={v => setForm({...form, name:v})} required />
              <Field label="Work email" type="email" value={form.email} onChange={v => setForm({...form, email:v})} required />
              <Field label="Company" value={form.company} onChange={v => setForm({...form, company:v})} />
              <Field label="Phone" value={form.phone} onChange={v => setForm({...form, phone:v})} />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">Inquiry type</label>
              <select value={form.service} onChange={e => setForm({...form, service:e.target.value})} className="mt-1 w-full h-11 rounded-lg px-3.5 text-sm bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
                {inquiryCategories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">Message</label>
              <textarea value={form.message} onChange={e => setForm({...form, message:e.target.value})} required rows={5} className="mt-1 w-full rounded-lg px-3.5 py-2.5 text-sm bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10" placeholder="Tell us about your goals, timelines and current stack." />
            </div>
            <button disabled={busy} className="btn-primary w-full">{busy ? 'Sending...' : <>Send Message <Send className="w-4 h-4" /></>}</button>
            <p className="text-[11px] text-slate-500 text-center">By submitting, you agree to our privacy policy.</p>
          </form>
        </div>
      </section>
    </SiteLayout>
  )
}
function Field({ label, value, onChange, type='text', required }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</label>
      <input required={required} type={type} value={value} onChange={e => onChange(e.target.value)} className="mt-1 w-full h-11 rounded-lg px-3.5 text-sm bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10" />
    </div>
  )
}
