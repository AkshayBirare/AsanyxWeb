'use client'

import Link from 'next/link'
import Image from 'next/image'
import { site } from '@/lib/site'
import { Mail, Phone, Linkedin, ArrowRight, MapPin, Clock } from 'lucide-react'
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
      if (data.ok) { toast.success('Subscribed. Welcome to the ASANYX brief.'); setEmail('') }
      else toast.error(data.error || 'Something went wrong')
    } catch { toast.error('Network error') }
    setBusy(false)
  }
  return (
    <footer className="relative mt-24 border-t border-slate-200/70 dark:border-white/10 bg-gradient-to-b from-transparent to-slate-50 dark:to-slate-950">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-white ring-1 ring-black/5">
                <Image src={site.logo} alt="ASANYX" fill className="object-contain p-1" />
              </div>
              <div>
                <div className="font-bold">ASANYX Analytics</div>
                <div className="text-xs text-muted-foreground">{'Data · Insights · AI · Intelligence'}</div>
              </div>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">Enterprise Business Intelligence, Data Engineering and AI consulting. We help organizations turn data into intelligent business decisions.</p>
            <form onSubmit={subscribe} className="mt-6 flex items-center gap-2 max-w-sm">
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" required placeholder="Your work email" className="flex-1 h-11 rounded-full px-4 text-sm bg-white/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-cyan-400/50" />
              <button disabled={busy} className="btn-primary-brand !py-2 !px-4 !text-[13px]">{busy ? '...' : <>Subscribe <ArrowRight className="w-4 h-4" /></>}</button>
            </form>
          </div>
          <div className="md:col-span-2">
            <div className="text-sm font-semibold mb-3">Company</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/case-studies">Case Studies</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="text-sm font-semibold mb-3">Services</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/services">Business Intelligence</Link></li>
              <li><Link href="/services">Data Engineering</Link></li>
              <li><Link href="/services">AI Solutions</Link></li>
              <li><Link href="/services">Consulting</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="text-sm font-semibold mb-3">Resources</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/resources">Guides</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/brand">Brand Kit</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="text-sm font-semibold mb-3">Contact</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> {site.email}</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> {site.phone}</li>
              <li className="flex items-center gap-2"><Clock className="w-4 h-4" /> {site.hours}</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> India</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>{`© ${new Date().getFullYear()} ${site.legalName}. All rights reserved.`}</div>
          <div className="flex items-center gap-4">
            <a href={site.linkedin} className="hover:text-foreground"><Linkedin className="w-4 h-4" /></a>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
