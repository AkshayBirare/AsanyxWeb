'use client'
import { useLayoutEffect, useState } from 'react'

// Inline SVG brand mark: exact letterforms as image layer + vector bars/trend line
// that animate once per session on first load (pure CSS keyframes, no libraries).
export default function LogoMark({ className = '' }) {
  const [animate, setAnimate] = useState(false)

  useLayoutEffect(() => {
    try {
      if (!sessionStorage.getItem('asxLogoPlayed')) {
        setAnimate(true)
        sessionStorage.setItem('asxLogoPlayed', '1')
      }
    } catch {}
  }, [])

  return (
    <svg viewBox="0 0 1024 1024" className={`${className} ${animate ? 'logo-anim' : ''}`} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="asxBarGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#36B5F7" />
          <stop offset="1" stopColor="#2667EC" />
        </linearGradient>
      </defs>
      {/* Letterforms (original artwork, bars + trend line removed) */}
      <image href="/brand/logos/asanyx-anim-base.png" x="0" y="0" width="1024" height="1024" />
      {/* Bars */}
      <rect className="asx-bar asx-b1" x="212" y="660" width="57" height="107" rx="12" fill="url(#asxBarGrad)" />
      <rect className="asx-bar asx-b2" x="307" y="591" width="57" height="176" rx="12" fill="url(#asxBarGrad)" />
      <rect className="asx-bar asx-b3" x="402" y="512" width="57" height="255" rx="12" fill="url(#asxBarGrad)" />
      {/* Trend line + dots */}
      <polyline className="asx-line" points="240,652 335,584 430,506" />
      <circle className="asx-dot asx-d1" cx="240" cy="652" r="15" fill="#F59E0B" />
      <circle className="asx-dot asx-d2" cx="335" cy="584" r="15" fill="#F59E0B" />
      <circle className="asx-dot asx-d3" cx="430" cy="506" r="15" fill="#F59E0B" />
    </svg>
  )
}
