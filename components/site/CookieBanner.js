'use client'
import { useEffect, useState } from 'react'

export default function CookieBanner() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('asx-cookies')) setShow(true)
  }, [])
  if (!show) return null
  return (
    <div className="fixed bottom-4 left-4 right-24 md:right-auto md:max-w-md z-40 glass-strong rounded-2xl p-4 shadow-brand">
      <div className="text-sm text-foreground">We use cookies to improve your experience and analyze site usage. By using this site you agree to our cookie policy.</div>
      <div className="mt-3 flex gap-2">
        <button onClick={() => { localStorage.setItem('asx-cookies','1'); setShow(false) }} className="btn-primary-brand !py-2 !px-4 !text-[13px]">Accept</button>
        <button onClick={() => setShow(false)} className="btn-ghost-brand !py-2 !px-4 !text-[13px]">Dismiss</button>
      </div>
    </div>
  )
}
