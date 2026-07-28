'use client'
import SiteLayout from '@/components/site/Layout'
import { SectionHeader } from '@/components/site/Section'
import { blogPosts } from '@/lib/site'
import { Clock, Tag, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const categories = ['All','Power BI','Microsoft Fabric','SQL','Azure','Data Engineering','Analytics','Artificial Intelligence','Data Science','Best Practices','Performance Optimization']

export default function BlogPage() {
  const [cat, setCat] = useState('All')
  const posts = cat === 'All' ? blogPosts : blogPosts.filter(p => p.category === cat)
  return (
    <SiteLayout>
      <div className="pt-32 pb-8 bg-hero-mesh">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader eyebrow="Blog" title="Technical insights from the field" subtitle="Practical writing on Power BI, Microsoft Fabric, Azure, data engineering and enterprise AI." />
        </div>
      </div>
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(c => (
              <button key={c} onClick={() => setCat(c)} className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${cat===c ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/5'}`}>{c}</button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((p, i) => (
              <motion.a key={p.title} href="#" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="group rounded-2xl overflow-hidden glass card-hover">
                <div className="h-36 relative bg-gradient-to-br from-blue-500/25 via-cyan-400/20 to-emerald-500/20">
                  <div className="absolute top-3 left-3 text-[10px] px-2 py-0.5 rounded-full bg-black/40 backdrop-blur text-white font-semibold"><Tag className="w-3 h-3 inline mr-1" />{p.category}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold group-hover:text-blue-600">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.excerpt}</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {p.time}</span>
                    <span className="flex items-center gap-1 text-blue-600 font-semibold group-hover:gap-2 transition-all">Read <ArrowRight className="w-3.5 h-3.5" /></span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
