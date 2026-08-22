'use client'
import { Landmark, Ship, ShoppingBag, GraduationCap, HeartPulse, Factory } from 'lucide-react'

const INDUSTRIES = [
  { icon: Landmark,       label: 'Leading APAC bank' },
  { icon: Ship,           label: 'Global logistics operator' },
  { icon: ShoppingBag,    label: 'Omnichannel retailer' },
  { icon: GraduationCap,  label: 'EdTech scale-up' },
  { icon: HeartPulse,     label: 'Health-services network' },
  { icon: Factory,        label: 'Manufacturing group' },
]

export default function TrustedBy() {
  return (
    <section aria-label="Trusted by" className="border-t border-hairline">
      <div className="container-x py-10">
        <div className="grid md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-3">
            <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-brand">Trusted by</div>
            <div className="mt-1 text-sm text-ink dark:text-slate-200 leading-snug">
              Enterprises and scale-ups across <span className="text-asanyx-blue">six industries</span>.
            </div>
          </div>
          <div className="md:col-span-9">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-4 gap-y-6">
              {INDUSTRIES.map(({ icon: Icon, label }, i) => (
                <div key={i} className="flex flex-col items-start gap-2 opacity-70 hover:opacity-100 transition">
                  <Icon className="w-5 h-5 text-asanyx-blue" strokeWidth={1.5} />
                  <div className="text-[12px] leading-tight text-ink/80 dark:text-slate-300">{label}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-[11px] text-muted-brand">Client names anonymized under confidentiality agreements.</div>
          </div>
        </div>
      </div>
    </section>
  )
}
