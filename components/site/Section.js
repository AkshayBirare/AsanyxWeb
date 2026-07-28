'use client'
import { motion } from 'framer-motion'

export function SectionHeader({ eyebrow, title, subtitle, center = false }) {
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''} mb-12`}>
      {eyebrow && (
        <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 px-3 py-1 text-xs font-medium text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {eyebrow}
        </motion.div>
      )}
      <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
