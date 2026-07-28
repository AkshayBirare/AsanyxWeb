'use client'
import SiteLayout from '@/components/site/Layout'
import { SectionHeader } from '@/components/site/Section'
import { site } from '@/lib/site'
import { useState } from 'react'
import { toast } from 'sonner'
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, Linkedin } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', company:'', phone:'', service:'', message:'' })
  const [busy, setBusy] = useState(false)
  const change = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))
  const submit = async (e) => {
    e.preventDefault(); setBusy(true)
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (data.ok) { toast.success('Thank you. We will get back within one business day.'); setForm({ name:'', email:'', company:'', phone:'', service:'', message:'' }) }
      else toast.error(data.error || 'Something went wrong')
    } catch { toast.error('Network error') }
    setBusy(false)
  }
  return (
    <SiteLayout>
      <div className="pt-32 pb-8 bg-hero-mesh">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader eyebrow="Contact" title="Let us design your next data platform" subtitle="Tell us about your goals, current stack and timelines. We will get back within one business day." />
        </div>
      </div>
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="rounded-2xl glass p-6">
              <h3 className="font-semibold mb-4">Reach us directly</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-cyan-500" /> <a href={`mailto:${site.email}`}>{site.email}</a></li>
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-cyan-500" /> <a href={`tel:${site.phone}`}>{site.phone}</a></li>
                <li className="flex items-center gap-3"><Clock className="w-4 h-4 text-cyan-500" /> {site.hours}</li>
                <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-cyan-500" /> India</li>
                <li className="flex items-center gap-3"><Linkedin className="w-4 h-4 text-cyan-500" /> <a href={site.linkedin}>LinkedIn</a></li>
              </ul>
              <div className="mt-4 flex gap-2">
                <a target="_blank" rel="noopener noreferrer" href={`https://wa.me/${site.whatsapp}`} className="btn-primary-brand !py-2 !px-4 !text-[13px]"><MessageCircle className="w-4 h-4" /> WhatsApp</a>
                <a href={`mailto:${site.email}?subject=Consultation`} className="btn-ghost-brand !py-2 !px-4 !text-[13px]">Email Us</a>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden glass p-2">
              <iframe title="Map" src="https://www.google.com/maps?q=India&output=embed" className="w-full h-56 rounded-xl border-0" loading="lazy" />
            </div>
          </div>

          <form onSubmit={submit} className="md:col-span-3 rounded-2xl glass p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <Input label="Full name" value={form.name} onChange={change('name')} required />
              <Input label="Work email" type="email" value={form.email} onChange={change('email')} required />
              <Input label="Company" value={form.company} onChange={change('company')} />
              <Input label="Phone" value={form.phone} onChange={change('phone')} />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Service of interest</label>
              <select value={form.service} onChange={change('service')} className="mt-1 w-full h-11 rounded-xl px-3 text-sm bg-white/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-cyan-400/50">
                <option value="">Select a service</option>
                {['Business Intelligence','Data Analytics','Data Engineering','Data Science','AI Solutions','Cloud Services','Data Governance','Consulting'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Your message</label>
              <textarea value={form.message} onChange={change('message')} required rows={5} className="mt-1 w-full rounded-xl px-3 py-2 text-sm bg-white/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-cyan-400/50" placeholder="Tell us about your goals, timelines and current stack." />
            </div>
            <button disabled={busy} className="btn-primary-brand w-full">{busy ? 'Sending...' : <>Send Message <Send className="w-4 h-4" /></>}</button>
            <p className="text-[11px] text-muted-foreground text-center">By submitting, you agree to our privacy policy. We never share your details.</p>
          </form>
        </div>
      </section>
    </SiteLayout>
  )
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground">{label}</label>
      <input {...props} className="mt-1 w-full h-11 rounded-xl px-3 text-sm bg-white/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-cyan-400/50" />
    </div>
  )
}
