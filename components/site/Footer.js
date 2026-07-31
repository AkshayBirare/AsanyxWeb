'use client'

import Link from 'next/link'
import Image from 'next/image'
import { site } from '@/lib/site'
import { Mail, Phone, Linkedin, MapPin, Clock, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState(false)
  const subscribe = async (e) => {
    e.preventDefault()
    if (!email) return
    setBusy(true)
    try {
      const res = await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) })
      const data = await res.json()
      if (data.ok) { toast.success('Subscribed to the ASANYX brief.'); setEmail('') } else toast.error(data.error || 'Something went wrong')
    } catch { toast.error('Network error') }
    setBusy(false)
  }
  return (
    <footer className="mt-24 bg-[#0B1F3A] text-slate-200">
      <div className="container-x py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-white p-1">
                <Image src={site.logo} alt="ASANYX" fill className="object-contain p-1" />
              </div>
              <div>
                <div className="font-bold text-white">ASANYX Analytics</div>
                <div className="text-[11px] text-slate-400 tracking-wider uppercase">Private Limited</div>
              </div>
            </Link>
            <p className="mt-5 text-sm text-slate-400 leading-relaxed max-w-md">Enterprise Business Intelligence, Data Engineering, Analytics and AI consulting. Helping organizations turn data into confident business decisions.</p>
            <form onSubmit={subscribe} className="mt-6 flex items-center gap-2 max-w-md">
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" required placeholder="Your work email" className="flex-1 h-11 rounded-full px-4 text-sm bg-white/5 text-white placeholder:text-slate-500 border border-white/10 outline-none focus:ring-2 focus:ring-white/20" />
              <button disabled={busy} className="btn-primary !py-2 !px-4 !text-[13px]">{busy ? '...' : <>Subscribe <ArrowRight className="w-4 h-4" /></>}</button>
            </form>
          </div>
          <div className="md:col-span-2">
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Company</div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/leadership" className="hover:text-white">Leadership</Link></li>
              <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
              <li><Link href="/case-studies" className="hover:text-white">Case Studies</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Services</div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link href="/services" className="hover:text-white">Business Intelligence</Link></li>
              <li><Link href="/services" className="hover:text-white">Data Engineering</Link></li>
              <li><Link href="/services" className="hover:text-white">Data Analytics</Link></li>
              <li><Link href="/services" className="hover:text-white">ML Engineering</Link></li>
              <li><Link href="/services" className="hover:text-white">Staff Augmentation</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Explore</div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link href="/industries" className="hover:text-white">Industries</Link></li>
              <li><Link href="/technologies" className="hover:text-white">Technologies</Link></li>
              <li><Link href="/engagement-models" className="hover:text-white">Engagement Models</Link></li>
              <li><Link href="/brand" className="hover:text-white">Brand Kit</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Contact</div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-slate-500" /> {site.email}</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-slate-500" /> {site.phone}</li>
              <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-500" /> {site.hours}</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-500" /> India</li>
              <li className="flex items-center gap-2"><Linkedin className="w-4 h-4 text-slate-500" /> <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>{`\u00a9 ${new Date().getFullYear()} ${site.legalName}. All rights reserved.`}</div>
          <div className="flex items-center gap-4">
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white"><Linkedin className="w-4 h-4" /></a>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
