'use client'
import SiteLayout from '@/components/site/Layout'
import { SectionHeader } from '@/components/site/Section'
import { resources } from '@/lib/site'
import { motion } from 'framer-motion'
import { Download, Clock, TrendingUp } from 'lucide-react'
import { toast } from 'sonner'

export default function ResourcesPage() {
  const dl = async (title) => {
    try {
      await fetch('/api/resources/download', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ title }) })
      toast.success(`Preparing download: ${title}`)
    } catch { toast.error('Could not start download') }
  }
  return (
    <SiteLayout>
      <div className="pt-32 pb-8 bg-hero-mesh">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader eyebrow="Free Resources" title="Guides, checklists & templates" subtitle="Curated by our team to help you build modern, governed and high performance data platforms." />
        </div>
      </div>
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {resources.map((r, i) => (
            <motion.div key={r.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="rounded-2xl glass p-5 card-hover flex flex-col">
              <div className="h-28 rounded-xl bg-gradient-to-br from-blue-500/20 via-cyan-400/20 to-emerald-500/20 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl gradient-text opacity-70">{r.category}</div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-300 font-semibold">{r.category}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 font-semibold">{r.difficulty}</span>
              </div>
              <h3 className="mt-2 font-semibold">{r.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 flex-1">{r.desc}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {r.time}</div>
                <button onClick={() => dl(r.title)} className="btn-primary-brand !py-2 !px-4 !text-[13px]"><Download className="w-4 h-4" /> Download</button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </SiteLayout>
  )
}
