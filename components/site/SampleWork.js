'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'

const samples = [
  {
    title: 'Retail Business Insights Dashboard',
    desc: 'Multi-page retail report demonstrating KPI cards, YTD trend analysis, category → sub-category → product drill-down, geographic breakdown and dynamic measure switching.',
    pages: [
      { label: 'Business Overview', img: '/samples/retail-business-overview' },
      { label: 'Sales Overview', img: '/samples/retail-sales-overview' },
      { label: 'Product Details', img: '/samples/retail-product-details' },
    ],
  },
  {
    title: 'Hospital Performance Dashboard',
    desc: 'Multi-page hospital report demonstrating patient and revenue KPIs, a decomposition tree, provider-level revenue breakdown, admission tracking and a dark/light theme toggle.',
    pages: [
      { label: 'Financial Overview', img: '/samples/hospital-financial-overview' },
      { label: 'Performance', img: '/samples/hospital-performance' },
      { label: 'Patient Details', img: '/samples/hospital-patient-details' },
    ],
  },
  {
    title: 'AdventureWorks Business Overview Dashboard',
    desc: 'Multi-page sales report demonstrating profit trend with MoM% variance, drill-through hierarchy, demographic and regional analysis and product-level margin breakdown.',
    pages: [
      { label: 'Landing Page', img: '/samples/aw-landing-page' },
      { label: 'Sales Summary', img: '/samples/aw-sales-summary' },
      { label: 'Product Details', img: '/samples/aw-product-details' },
    ],
  },
]

export default function SampleWork() {
  const gridRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [lightbox, setLightbox] = useState(null) // { sample: idx, page: idx }

  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const close = useCallback(() => setLightbox(null), [])
  const move = useCallback(dir => {
    setLightbox(lb => {
      if (!lb) return lb
      const n = samples[lb.sample].pages.length
      return { ...lb, page: (lb.page + dir + n) % n }
    })
  }, [])

  useEffect(() => {
    if (!lightbox) return
    const onKey = e => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') move(-1)
      if (e.key === 'ArrowRight') move(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, close, move])

  const active = lightbox ? samples[lightbox.sample] : null
  const activePage = active ? active.pages[lightbox.page] : null

  return (
    <section className="section-y" id="sample-dashboards">
      <div className="container-x">
        <div className="eyebrow">Sample Dashboard Designs</div>
        <h2 className="mt-4 text-3xl md:text-[44px] font-medium tracking-tight leading-[1.1] text-ink dark:text-white max-w-3xl">
          A look at our <span className="serif text-asanyx-blue">dashboard design</span> work.
        </h2>
        <p className="mt-4 text-lg text-muted-brand max-w-3xl leading-relaxed">
          A few sample dashboards built on publicly available datasets, showcasing our approach to executive reporting, drill-through analysis, and dashboard UX. These are design demonstrations, not client deliverables.
        </p>

        <div ref={gridRef} className="mt-12 grid md:grid-cols-3 gap-6">
          {samples.map((s, i) => (
            <div
              key={s.title}
              className="transition-all ease-out duration-[400ms]"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(12px)',
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <div className="h-full rounded-xl border border-hairline bg-white dark:bg-slate-900 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <button
                  type="button"
                  onClick={() => setLightbox({ sample: i, page: 0 })}
                  className="relative block w-full aspect-[16/10] bg-slate-100 dark:bg-slate-800 group cursor-zoom-in"
                  aria-label={`View ${s.title} screenshots`}
                >
                  <img
                    src={`${s.pages[0].img}-thumb.jpg`}
                    alt={`${s.title} - ${s.pages[0].label}`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                  <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </button>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-ink dark:text-white leading-snug">{s.title}</h3>
                  <p className="mt-2 text-[14px] text-muted-brand leading-relaxed">{s.desc}</p>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {s.pages.map((p, pi) => (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => setLightbox({ sample: i, page: pi })}
                        className="text-left group"
                        aria-label={`View ${s.title} - ${p.label}`}
                      >
                        <div className="relative aspect-[16/10] rounded-md overflow-hidden border border-hairline bg-slate-100 dark:bg-slate-800">
                          <img src={`${p.img}-thumb.jpg`} alt={`${s.title} - ${p.label}`} loading="lazy" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-200 group-hover:scale-[1.04]" />
                        </div>
                        <div className="mt-1.5 text-[11px] font-medium text-muted-brand group-hover:text-asanyx-blue transition-colors truncate">{p.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox && activePage && (
        <div className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4 md:p-10" onClick={close} role="dialog" aria-modal="true">
          <button type="button" onClick={close} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white grid place-items-center hover:bg-white/20 transition" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
          <button type="button" onClick={e => { e.stopPropagation(); move(-1) }} className="absolute left-2 md:left-6 w-10 h-10 rounded-full bg-white/10 text-white grid place-items-center hover:bg-white/20 transition" aria-label="Previous page">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button type="button" onClick={e => { e.stopPropagation(); move(1) }} className="absolute right-2 md:right-6 w-10 h-10 rounded-full bg-white/10 text-white grid place-items-center hover:bg-white/20 transition" aria-label="Next page">
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="max-w-6xl w-full" onClick={e => e.stopPropagation()}>
            <img src={`${activePage.img}.jpg`} alt={`${active.title} - ${activePage.label}`} className="w-full max-h-[80vh] object-contain rounded-lg" />
            <div className="mt-3 text-center text-sm text-white/80">
              {active.title} &mdash; {activePage.label} <span className="text-white/50">({lightbox.page + 1}/{active.pages.length})</span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
