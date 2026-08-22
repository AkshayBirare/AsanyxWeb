'use client'
import SiteLayout from '@/components/site/Layout'
import { SectionHeader } from '@/components/site/Section'
import Image from 'next/image'
import { site } from '@/lib/site'
import { Download, Copy, Check, FileText, Presentation as PresentationIcon, Image as ImageIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

const PALETTE = {
  primary: [
    { name: 'Deep Blue', hex: '#0A2540', rgb: '10, 37, 64', use: 'Headings, primary brand' },
    { name: 'Brand Blue', hex: '#1E6BFF', rgb: '30, 107, 255', use: 'Primary CTA, links' },
    { name: 'Cyan Accent', hex: '#06D6E0', rgb: '6, 214, 224', use: 'Gradients, highlights' },
    { name: 'Emerald', hex: '#10B981', rgb: '16, 185, 129', use: 'Success, positive metrics' },
  ],
  neutral: [
    { name: 'Pure White', hex: '#FFFFFF', rgb: '255, 255, 255', use: 'Backgrounds' },
    { name: 'Soft Grey', hex: '#F6F9FC', rgb: '246, 249, 252', use: 'Section backgrounds' },
    { name: 'Border Grey', hex: '#E2E8F0', rgb: '226, 232, 240', use: 'Dividers, borders' },
    { name: 'Muted', hex: '#64748B', rgb: '100, 116, 139', use: 'Secondary text' },
    { name: 'Text Dark', hex: '#0F172A', rgb: '15, 23, 42', use: 'Body text' },
  ],
}

const LOGO_PACK = [
  { file: 'asanyx-logo-horizontal-color.png',       label: 'Horizontal · Color',       usage: 'Website, decks, marketing', bg: 'bg-white' },
  { file: 'asanyx-logo-horizontal-on-white.png',    label: 'Horizontal · On White',    usage: 'Documents, letters, invoices', bg: 'bg-white' },
  { file: 'asanyx-logo-horizontal-on-dark.png',     label: 'Horizontal · On Dark',     usage: 'Dark UI, video, banners', bg: 'bg-[#0A2540]' },
  { file: 'asanyx-logo-horizontal-mono-black.png',  label: 'Horizontal · Mono Black',  usage: 'Print, black & white docs', bg: 'bg-white' },
  { file: 'asanyx-mark-color.png',                  label: 'Mark · Color (Transparent)', usage: 'App icon, avatar overlay', bg: 'bg-white' },
  { file: 'asanyx-mark-on-white.png',               label: 'Mark · On White',          usage: 'LinkedIn profile picture',   bg: 'bg-white' },
  { file: 'asanyx-mark-on-dark.png',                label: 'Mark · On Dark',           usage: 'Dark theme avatar, video',   bg: 'bg-[#0A2540]' },
  { file: 'asanyx-favicon-256.png',                 label: 'Favicon · 256×256',        usage: 'Browser tab, PWA icon',      bg: 'bg-white' },
]

const DOC_PACK = [
  { file: 'ASANYX_Letterhead.docx',   label: 'Corporate Letterhead',  format: 'Microsoft Word (.docx)',    icon: FileText,         desc: 'Branded letterhead with header logo, footer contact block and a ready-to-edit letter body.' },
  { file: 'ASANYX_Presentation.pptx', label: 'Presentation Template', format: 'PowerPoint (.pptx) · 16:9', icon: PresentationIcon, desc: 'Five master slides — title, section header, 3-column content, two-column narrative and closing CTA.' },
]

const IMAGES = [
  { url: 'https://images.unsplash.com/photo-1698306642516-9841228dcff3?w=1200&q=85', cat: 'Dashboard', use: 'Hero, pitch deck cover' },
  { url: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=1200&q=85', cat: 'Dashboard', use: 'BI service pages' },
  { url: 'https://images.pexels.com/photos/6930431/pexels-photo-6930431.jpeg?auto=compress&cs=tinysrgb&w=1200', cat: 'Analytics', use: 'Analytics section, blog' },
  { url: 'https://images.pexels.com/photos/7693729/pexels-photo-7693729.jpeg?auto=compress&cs=tinysrgb&w=1200', cat: 'Team', use: 'About Us, careers' },
  { url: 'https://images.pexels.com/photos/12955643/pexels-photo-12955643.jpeg?auto=compress&cs=tinysrgb&w=1200', cat: 'Team', use: 'Consulting pages' },
  { url: 'https://images.pexels.com/photos/37730211/pexels-photo-37730211.jpeg?auto=compress&cs=tinysrgb&w=1200', cat: 'Cloud', use: 'Data engineering, cloud' },
  { url: 'https://images.pexels.com/photos/17489157/pexels-photo-17489157.jpeg?auto=compress&cs=tinysrgb&w=1200', cat: 'Cloud', use: 'Server / infrastructure' },
  { url: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1200', cat: 'Cloud', use: 'Tech infrastructure' },
  { url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&q=85', cat: 'Skyline', use: 'Enterprise trust imagery' },
  { url: 'https://images.unsplash.com/photo-1506606401543-2e73709cebb4?w=1200&q=85', cat: 'Skyline', use: 'Corporate proposals' },
  { url: 'https://images.pexels.com/photos/28494632/pexels-photo-28494632.jpeg?auto=compress&cs=tinysrgb&w=1200', cat: 'AI / Tech', use: 'AI, machine learning' },
  { url: 'https://images.pexels.com/photos/7693201/pexels-photo-7693201.jpeg?auto=compress&cs=tinysrgb&w=1200', cat: 'AI / Tech', use: 'Data science, ML content' },
]

function Copyable({ text, children }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); setCopied(true); toast.success(`Copied ${text}`); setTimeout(() => setCopied(false), 1200) } catch {}
  }
  return (
    <button onClick={copy} className="inline-flex items-center gap-1.5 text-xs font-mono px-2 py-0.5 rounded-md hover:bg-white/60 dark:hover:bg-white/10 transition">
      {children}
      {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 opacity-50" />}
    </button>
  )
}

function LinkedInBanner() {
  return (
    <div className="relative w-full" style={{ aspectRatio: '1584 / 396' }}>
      <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-brand" style={{ background: 'linear-gradient(120deg, #0A2540 0%, #123A6E 40%, #1E6BFF 75%, #06D6E0 100%)' }}>
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        {/* Glow orbs */}
        <div className="absolute -top-32 -left-20 w-[500px] h-[500px] rounded-full blur-3xl opacity-40" style={{ background: 'radial-gradient(circle, #06D6E0 0%, transparent 60%)' }} />
        <div className="absolute -bottom-24 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl opacity-40" style={{ background: 'radial-gradient(circle, #10B981 0%, transparent 60%)' }} />
        <div className="absolute top-1/4 right-10 w-[350px] h-[350px] rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(circle, #1E6BFF 0%, transparent 60%)' }} />

        {/* Circuit lines SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1584 396" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="line1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#06D6E0" stopOpacity="0" />
              <stop offset="50%" stopColor="#06D6E0" stopOpacity="1" />
              <stop offset="100%" stopColor="#06D6E0" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,120 Q400,60 800,180 T1584,140" fill="none" stroke="url(#line1)" strokeWidth="1.5" />
          <path d="M0,260 Q500,320 900,220 T1584,280" fill="none" stroke="url(#line1)" strokeWidth="1.5" />
          {[...Array(20)].map((_, i) => (
            <circle key={i} cx={i * 90 + 50} cy={i % 2 ? 120 : 260} r="2.5" fill="#06D6E0" opacity="0.6" />
          ))}
        </svg>

        {/* Content */}
        <div className="relative h-full flex items-center px-[6%]">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-sm bg-white/10 border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90">Data · Insights · AI · Intelligence</span>
            </div>
            <h2 className="mt-4 text-white font-bold tracking-tight leading-[1.05]" style={{ fontFamily: 'Space Grotesk, Inter, sans-serif', fontSize: 'clamp(28px, 4.5vw, 64px)' }}>
              Transforming Data into<br/>
              <span style={{ background: 'linear-gradient(120deg, #06D6E0 0%, #10B981 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Intelligent Business Decisions</span>
            </h2>
            <div className="mt-4 flex items-center gap-5 text-white/70 text-[13px] font-medium">
              <span>Power BI</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>Microsoft Fabric</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>Azure</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>Databricks</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>Snowflake</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>GCP</span>
            </div>
          </div>

          {/* Right decorative dashboard mockup */}
          <div className="hidden md:block relative" style={{ width: '32%' }}>
            <div className="absolute inset-0 flex flex-col gap-3 items-end">
              <div className="w-56 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 p-3 -rotate-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan-400 to-emerald-400" />
                  <div className="flex-1">
                    <div className="h-1.5 rounded-full bg-white/30 w-16" />
                    <div className="h-1 mt-1 rounded-full bg-white/15 w-10" />
                  </div>
                  <div className="text-emerald-300 text-xs font-bold">+24%</div>
                </div>
                <div className="mt-2 h-8 relative">
                  <svg viewBox="0 0 100 30" className="absolute inset-0 w-full h-full">
                    <path d="M0,25 C20,15 40,20 60,10 S90,5 100,8" fill="none" stroke="#06D6E0" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
              <div className="w-48 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 p-3 rotate-2 ml-auto">
                <div className="text-[9px] text-white/60 uppercase tracking-wider">Revenue</div>
                <div className="text-white font-bold">₹8.42Cr</div>
                <div className="mt-1 h-1 rounded-full bg-white/15 overflow-hidden">
                  <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom brand strip */}
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #06D6E0, #1E6BFF, #10B981)' }} />
      </div>
    </div>
  )
}

function LinkedInLogoTile() {
  return (
    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-brand" style={{ background: 'linear-gradient(135deg, #0A2540 0%, #1E6BFF 100%)' }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4/5 aspect-square rounded-2xl bg-white grid place-items-center p-6">
          <Image src={site.logo} alt="ASANYX" width={280} height={280} className="object-contain w-full h-full" />
        </div>
      </div>
    </div>
  )
}

export default function BrandPage() {
  return (
    <SiteLayout>
      <div className="pt-32 pb-8 bg-hero-mesh">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader eyebrow="Brand Kit" title="ASANYX Brand & Marketing Assets" subtitle="Colors, LinkedIn banner, logo tiles and a curated image library for presentations, decks and social media." />
        </div>
      </div>

      {/* LinkedIn Banner */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between mb-4 gap-3">
            <div>
              <h3 className="text-xl font-bold">LinkedIn Company Cover Banner</h3>
              <p className="text-sm text-muted-foreground">1584 × 396 px · Right-click the banner below → Save image, OR take a full-width screenshot.</p>
            </div>
            <div className="text-[11px] px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-600 font-semibold">Ready to use</div>
          </div>
          <LinkedInBanner />
          <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="rounded-xl glass p-4">
              <div className="font-semibold text-foreground mb-1">How to upload to LinkedIn</div>
              1. Go to your LinkedIn Company Page → Edit Page → About<br/>
              2. Click the camera icon on your cover photo<br/>
              3. Upload the saved image (1584×396) → Save
            </div>
            <div className="rounded-xl glass p-4">
              <div className="font-semibold text-foreground mb-1">Logo tile for profile picture</div>
              Ideal size 400×400 px. Use the logo tile below or your standalone logo on white background. LinkedIn will crop to a circle.
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-muted-foreground mb-1.5">Logo tile — Gradient</div>
              <LinkedInLogoTile />
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1.5">Logo tile — White</div>
              <div className="aspect-square rounded-2xl overflow-hidden shadow-brand bg-white grid place-items-center p-8">
                <Image src={site.logo} alt="ASANYX" width={400} height={400} className="object-contain w-full h-full" />
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1.5">Logo tile — Dark</div>
              <div className="aspect-square rounded-2xl overflow-hidden shadow-brand grid place-items-center p-8" style={{ background: '#0A2540' }}>
                <Image src={site.logo} alt="ASANYX" width={400} height={400} className="object-contain w-full h-full brightness-[1.6]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Downloadable Assets — Logos + Documents */}
      <section className="py-14 border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
            <div>
              <h3 className="text-2xl font-bold">Downloadable Assets</h3>
              <p className="text-sm text-muted-foreground mt-1">Logo pack (8 variations) plus a branded Word letterhead and PowerPoint template — ready to drop into your deliverables.</p>
            </div>
            <div className="text-[11px] px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-600 font-semibold">All PNG / DOCX / PPTX</div>
          </div>

          {/* Corporate documents */}
          <div className="grid md:grid-cols-2 gap-4">
            {DOC_PACK.map(d => {
              const Icon = d.icon
              return (
                <div key={d.file} className="rounded-2xl border border-border/60 bg-card/60 p-6 flex flex-col sm:flex-row gap-5 items-start">
                  <div className="w-14 h-14 rounded-xl grid place-items-center shrink-0" style={{ background: 'linear-gradient(135deg, #0A2540 0%, #1E6BFF 100%)' }}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{d.format}</div>
                    <div className="mt-0.5 font-semibold text-lg">{d.label}</div>
                    <p className="mt-1.5 text-sm text-muted-foreground">{d.desc}</p>
                    <a href={`/brand/documents/${d.file}`} download className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-white" style={{ background: '#0A2540' }}>
                      <Download className="w-4 h-4" /> Download {d.file.split('.').pop().toUpperCase()}
                    </a>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Logo pack */}
          <div className="mt-10">
            <div className="flex items-center gap-2 mb-4">
              <ImageIcon className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
              <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Logo Pack · 8 variations</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {LOGO_PACK.map(l => (
                <div key={l.file} className="group rounded-2xl overflow-hidden border border-border/60 bg-card/60">
                  <div className={`relative aspect-[4/3] ${l.bg} grid place-items-center p-4`}>
                    <img src={`/brand/logos/${l.file}`} alt={l.label} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="p-3.5 border-t border-border/50">
                    <div className="text-[13px] font-semibold leading-tight">{l.label}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{l.usage}</div>
                    <a href={`/brand/logos/${l.file}`} download className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 dark:text-cyan-400 hover:gap-2 transition-all">
                      Download PNG <Download className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-6">
          <h3 className="text-2xl font-bold">Color Palette</h3>
          <p className="text-sm text-muted-foreground mt-1">Click any hex code to copy. Use these across PowerPoint, Canva, Figma and any marketing material.</p>

          <div className="mt-6">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Primary</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {PALETTE.primary.map(c => (
                <div key={c.hex} className="rounded-2xl overflow-hidden glass card-hover">
                  <div className="h-28" style={{ background: c.hex }} />
                  <div className="p-4">
                    <div className="font-semibold">{c.name}</div>
                    <div className="mt-1 flex items-center gap-1">
                      <Copyable text={c.hex}><span>{c.hex}</span></Copyable>
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-1">RGB {c.rgb}</div>
                    <div className="text-[11px] text-muted-foreground mt-2">{c.use}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Neutral</div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {PALETTE.neutral.map(c => (
                <div key={c.hex} className="rounded-2xl overflow-hidden glass card-hover">
                  <div className="h-24 border border-slate-200/40" style={{ background: c.hex }} />
                  <div className="p-4">
                    <div className="font-semibold text-sm">{c.name}</div>
                    <div className="mt-1"><Copyable text={c.hex}><span>{c.hex}</span></Copyable></div>
                    <div className="text-[11px] text-muted-foreground mt-2">{c.use}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Signature Gradients</div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-2xl overflow-hidden glass">
                <div className="h-32" style={{ background: 'linear-gradient(120deg, #0A2540 0%, #1E6BFF 55%, #06D6E0 100%)' }} />
                <div className="p-4">
                  <div className="font-semibold text-sm">Brand Gradient</div>
                  <Copyable text="linear-gradient(120deg, #0A2540 0%, #1E6BFF 55%, #06D6E0 100%)"><span className="text-[11px]">Copy CSS</span></Copyable>
                  <div className="text-[11px] text-muted-foreground mt-1">Buttons, hero, banners</div>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden glass">
                <div className="h-32" style={{ background: 'linear-gradient(120deg, #10B981 0%, #06D6E0 100%)' }} />
                <div className="p-4">
                  <div className="font-semibold text-sm">Emerald Highlight</div>
                  <Copyable text="linear-gradient(120deg, #10B981 0%, #06D6E0 100%)"><span className="text-[11px]">Copy CSS</span></Copyable>
                  <div className="text-[11px] text-muted-foreground mt-1">Metrics, success states</div>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden glass">
                <div className="h-32" style={{ background: 'linear-gradient(120deg, #0A2540 0%, #123A6E 40%, #1E6BFF 75%, #06D6E0 100%)' }} />
                <div className="p-4">
                  <div className="font-semibold text-sm">LinkedIn Banner Gradient</div>
                  <Copyable text="linear-gradient(120deg, #0A2540 0%, #123A6E 40%, #1E6BFF 75%, #06D6E0 100%)"><span className="text-[11px]">Copy CSS</span></Copyable>
                  <div className="text-[11px] text-muted-foreground mt-1">Cover images, headers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="py-14 bg-gradient-to-b from-transparent via-slate-50/60 to-transparent dark:via-slate-950/40">
        <div className="mx-auto max-w-7xl px-6">
          <h3 className="text-2xl font-bold">Typography</h3>
          <p className="text-sm text-muted-foreground mt-1">Free Google Fonts — safe for all marketing collateral.</p>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl glass p-6">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Headings</div>
              <div className="mt-2 font-bold text-4xl tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Space Grotesk</div>
              <div className="text-sm text-muted-foreground mt-1">Weights 500, 600, 700</div>
              <a href="https://fonts.google.com/specimen/Space+Grotesk" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-ghost-brand !py-2 !px-4 !text-[13px]"><Download className="w-4 h-4" /> Download from Google Fonts</a>
            </div>
            <div className="rounded-2xl glass p-6">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Body</div>
              <div className="mt-2 font-medium text-4xl tracking-tight">Inter</div>
              <div className="text-sm text-muted-foreground mt-1">Weights 400, 500, 600, 700</div>
              <a href="https://fonts.google.com/specimen/Inter" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block btn-ghost-brand !py-2 !px-4 !text-[13px]"><Download className="w-4 h-4" /> Download from Google Fonts</a>
            </div>
          </div>
        </div>
      </section>

      {/* Images Library */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-6">
          <h3 className="text-2xl font-bold">Marketing Image Library</h3>
          <p className="text-sm text-muted-foreground mt-1">Curated stock images for LinkedIn posts, pitch decks, proposals and blog headers. Right-click → Save. Free to use (Unsplash / Pexels licenses).</p>
          <div className="mt-6 grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {IMAGES.map((img, i) => (
              <div key={i} className="group rounded-2xl overflow-hidden glass card-hover">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img src={img.url} alt={img.cat} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded-full bg-black/40 backdrop-blur text-white font-semibold">{img.cat}</div>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div className="text-[11px] text-muted-foreground">{img.use}</div>
                  <a href={img.url} download target="_blank" rel="noopener noreferrer" className="text-[11px] font-semibold text-blue-600 dark:text-cyan-400 flex items-center gap-1 hover:gap-2 transition-all">Open <Download className="w-3 h-3" /></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Usage guidelines */}
      <section className="py-14 bg-gradient-to-b from-transparent via-slate-50/60 to-transparent dark:via-slate-950/40">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl glass p-6">
            <div className="text-xs uppercase tracking-widest text-cyan-600 font-semibold">Guideline 01</div>
            <div className="mt-2 font-bold">Always keep breathing room</div>
            <p className="mt-2 text-sm text-muted-foreground">Give the logo generous whitespace on every side (min. equal to the height of the AS letters).</p>
          </div>
          <div className="rounded-2xl glass p-6">
            <div className="text-xs uppercase tracking-widest text-cyan-600 font-semibold">Guideline 02</div>
            <div className="mt-2 font-bold">Use Deep Blue for depth</div>
            <p className="mt-2 text-sm text-muted-foreground">Deep Blue #0A2540 is the anchor — pair with Cyan or Emerald for accents. Never all-emerald or all-cyan surfaces.</p>
          </div>
          <div className="rounded-2xl glass p-6">
            <div className="text-xs uppercase tracking-widest text-cyan-600 font-semibold">Guideline 03</div>
            <div className="mt-2 font-bold">One statement per visual</div>
            <p className="mt-2 text-sm text-muted-foreground">Presentations & posts should have one clear message. Rely on our gradient headline styling for emphasis.</p>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
