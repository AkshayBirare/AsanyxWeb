'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Menu, Moon, Sun, X, ChevronDown } from 'lucide-react'
import { site, nav } from '@/lib/site'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 bg-white/85 dark:bg-slate-950/85 backdrop-blur-md transition-shadow ${scrolled ? 'shadow-[0_1px_0_rgba(11,31,58,0.08)]' : ''}`}>
      <div className="container-x">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-white ring-1 ring-slate-200 dark:ring-white/10">
              <Image src={site.logo} alt="ASANYX" fill className="object-contain p-1" sizes="36px" />
            </div>
            <div className="leading-tight">
              <div className="text-[15px] font-bold tracking-tight text-slate-900 dark:text-white">ASANYX</div>
              <div className="text-[9px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400 -mt-0.5">Analytics</div>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center">
            {nav.slice(0, 9).map(item => (
              <Link key={item.href} href={item.href} className="px-3 py-2 text-[13px] font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button aria-label="Toggle theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="h-9 w-9 grid place-items-center rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition">
              {mounted && (theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}
            </button>
            <Link href="/contact" className="hidden sm:inline-flex btn-primary !py-2 !px-4 !text-[13px]">Talk to an Expert</Link>
            <button aria-label="Menu" onClick={() => setOpen(v => !v)} className="xl:hidden h-9 w-9 grid place-items-center rounded-full border border-slate-200 dark:border-white/10">
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="xl:hidden border-t border-slate-100 dark:border-white/5 bg-white dark:bg-slate-950">
          <div className="container-x py-3 grid grid-cols-2 gap-1">
            {nav.map(item => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5">
                {item.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary col-span-2 mt-2">Talk to an Expert</Link>
          </div>
        </div>
      )}
    </header>
  )
}
