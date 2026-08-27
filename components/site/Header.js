'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { site, nav } from '@/lib/site'
import LogoMark from './LogoMark'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-shadow ${scrolled ? 'shadow-[0_1px_0_rgba(20,34,106,0.10)]' : ''}`}>
      <div className="container-x">
        <div className="flex items-center justify-between h-18 py-3">
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="ASANYX Analytics">
            <LogoMark className="w-10 h-10 md:w-11 md:h-11" />
            <span className="font-brand flex items-baseline gap-1.5 whitespace-nowrap">
              <span className="text-[19px] md:text-[21px] font-extrabold tracking-tight text-[#1E3A8A] dark:text-white leading-none">ASANYX</span>
              <span className="hidden sm:inline text-[11px] md:text-[12px] font-bold tracking-[0.26em] text-[#1B9AF5] leading-none">ANALYTICS</span>
            </span>
          </Link>

          <nav className="hidden xl:flex items-center gap-0.5">
            {nav.slice(0, 9).map(item => (
              <Link key={item.href} href={item.href} className={`nav-link px-2.5 py-2 text-[12.5px] font-medium whitespace-nowrap transition-colors ${item.label === 'BI Migration' ? 'text-brand-violet' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button aria-label="Toggle theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="h-9 w-9 grid place-items-center rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition">
              {mounted && (theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}
            </button>
            <Link href="/contact" className="hidden sm:inline-flex btn-primary !py-2 !px-3.5 !text-[12.5px] whitespace-nowrap">Talk to an Expert</Link>
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
