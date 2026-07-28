'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { site, nav } from '@/lib/site'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? 'py-2' : 'py-3'}`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className={`flex items-center justify-between rounded-full px-3 md:px-4 py-2 transition-all ${scrolled ? 'glass-strong shadow-brand' : 'glass'}`}>
          <Link href="/" className="flex items-center gap-2.5 pl-1">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-white ring-1 ring-black/5 dark:ring-white/10">
              <Image src={site.logo} alt="ASANYX" fill className="object-contain p-1" sizes="36px" />
            </div>
            <div className="leading-tight">
              <div className="text-[15px] font-bold tracking-tight">ASANYX</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground -mt-0.5">Analytics</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {nav.slice(0, 8).map(item => (
              <Link key={item.href} href={item.href} className="px-3 py-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground rounded-full hover:bg-white/50 dark:hover:bg-white/5 transition">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button aria-label="Toggle theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="h-9 w-9 grid place-items-center rounded-full border border-slate-200 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/5 transition">
              {mounted && (theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}
            </button>
            <Link href="/contact" className="hidden sm:inline-flex btn-primary-brand !py-2 !px-4 !text-[13px]">Book Consultation</Link>
            <button aria-label="Menu" onClick={() => setOpen(v => !v)} className="lg:hidden h-9 w-9 grid place-items-center rounded-full border border-slate-200 dark:border-white/10">
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="lg:hidden mt-2 glass-strong rounded-2xl p-3">
              <div className="grid grid-cols-2 gap-1">
                {nav.map(item => (
                  <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/60 dark:hover:bg-white/5">
                    {item.label}
                  </Link>
                ))}
              </div>
              <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary-brand w-full mt-2">Book Consultation</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
