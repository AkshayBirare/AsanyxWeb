'use client'
import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { site } from '@/lib/site'
import { LogOut, Users, Briefcase, Mail, Download, RefreshCw, Loader2, Search, Copy, Check, ExternalLink } from 'lucide-react'

const TABS = [
  { key: 'contacts',     label: 'Contacts / Leads', icon: Users,     color: 'text-blue-500' },
  { key: 'applications', label: 'Applications',     icon: Briefcase, color: 'text-emerald-500' },
  { key: 'newsletter',   label: 'Newsletter',       icon: Mail,      color: 'text-cyan-500' },
  { key: 'downloads',    label: 'Downloads',        icon: Download,  color: 'text-violet-500' },
]

function fmtDate(iso) {
  if (!iso) return ''
  try { return new Date(iso).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) } catch { return iso }
}

function Copyable({ text }) {
  const [c, setC] = useState(false)
  if (!text) return <span className="text-slate-500">—</span>
  const copy = async () => { try { await navigator.clipboard.writeText(text); setC(true); setTimeout(() => setC(false), 1200) } catch {} }
  return (
    <button onClick={copy} className="inline-flex items-center gap-1 group">
      <span className="truncate max-w-[220px]">{text}</span>
      {c ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 opacity-30 group-hover:opacity-100" />}
    </button>
  )
}

function Table({ tab, rows, query }) {
  const filtered = useMemo(() => {
    if (!query) return rows
    const q = query.toLowerCase()
    return rows.filter(r => JSON.stringify(r).toLowerCase().includes(q))
  }, [rows, query])

  if (!filtered.length) return <div className="p-10 text-center text-sm text-slate-500">No records yet.</div>

  const headers = {
    contacts:     ['Date', 'Name', 'Email', 'Company', 'Phone', 'Source', 'Message'],
    applications: ['Date', 'Name', 'Email', 'Phone', 'Role', 'Resume', 'Message'],
    newsletter:   ['Date', 'Email'],
    downloads:    ['Date', 'Title', 'Email'],
  }[tab]

  const renderRow = (r) => {
    switch (tab) {
      case 'contacts':
        return [fmtDate(r.createdAt), r.name, <Copyable text={r.email} />, r.company, <Copyable text={r.phone} />, r.source || r.service, <span className="line-clamp-2 text-xs text-slate-500">{r.message}</span>]
      case 'applications':
        return [fmtDate(r.createdAt), r.name, <Copyable text={r.email} />, <Copyable text={r.phone} />, r.role, r.resumeUrl ? <a href={r.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-500 hover:underline">Open <ExternalLink className="w-3 h-3" /></a> : '—', <span className="line-clamp-2 text-xs text-slate-500">{r.message}</span>]
      case 'newsletter':
        return [fmtDate(r.createdAt), <Copyable text={r.email} />]
      case 'downloads':
        return [fmtDate(r.createdAt), r.title, <Copyable text={r.email} />]
      default: return []
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-border/60 text-left text-[11px] uppercase tracking-widest text-slate-500">
            {headers.map(h => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {filtered.map((r, i) => (
            <tr key={r.id || i} className="border-b border-border/40 hover:bg-white/5 transition">
              {renderRow(r).map((cell, ci) => (
                <td key={ci} className="px-4 py-3 align-top">{cell || <span className="text-slate-500">—</span>}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-4 py-3 text-[11px] text-slate-500 border-t border-border/40">Showing {filtered.length} of {rows.length}</div>
    </div>
  )
}

export default function AdminPage() {
  const router = useRouter()
  const [checking, setChecking] = useState(true)
  const [me, setMe] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState('contacts')
  const [query, setQuery] = useState('')

  const loadMe = async () => {
    const r = await fetch('/api/admin/me', { cache: 'no-store' })
    if (!r.ok) { router.replace('/admin/login'); return }
    const j = await r.json()
    setMe(j)
  }

  const loadData = async () => {
    setLoading(true)
    try {
      const r = await fetch('/api/admin/data', { cache: 'no-store' })
      if (r.status === 401) { router.replace('/admin/login'); return }
      const j = await r.json()
      if (j.ok) setData(j)
    } finally { setLoading(false) }
  }

  useEffect(() => {
    (async () => {
      await loadMe()
      await loadData()
      setChecking(false)
    })()
  }, [])

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.replace('/admin/login')
  }

  const exportCSV = () => {
    if (!data) return
    const rows = data[tab] || []
    if (!rows.length) return
    const keys = Object.keys(rows[0])
    const escape = (v) => `"${String(v == null ? '' : v).replace(/"/g, '""')}"`
    const csv = [keys.join(','), ...rows.map(r => keys.map(k => escape(r[k])).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `asanyx-${tab}-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (checking) {
    return (
      <div className="min-h-screen grid place-items-center bg-[#050915]">
        <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
      </div>
    )
  }

  const rows = data?.[tab] || []
  const stats = data?.stats || {}

  return (
    <div className="min-h-screen bg-[#050915] text-white">
      {/* Top bar */}
      <header className="border-b border-white/10 bg-black/30 backdrop-blur sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-24 h-8">
              <Image src={site.logo} alt="ASANYX" fill className="object-contain object-left brightness-[1.6]" sizes="96px" />
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold">Admin</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 hidden sm:inline">{me?.email}</span>
            <button onClick={logout} className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition">
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {TABS.map(t => {
            const Icon = t.icon
            return (
              <button key={t.key} onClick={() => setTab(t.key)} className={`text-left rounded-2xl border p-4 transition ${tab === t.key ? 'border-cyan-400/60 bg-white/[0.06]' : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04]'}`}>
                <div className="flex items-center justify-between">
                  <Icon className={`w-4 h-4 ${t.color}`} />
                  <span className="text-[10px] uppercase tracking-widest text-slate-500">Total</span>
                </div>
                <div className="mt-3 text-3xl font-bold">{stats[t.key] ?? 0}</div>
                <div className="mt-1 text-xs text-slate-400">{t.label}</div>
              </button>
            )
          })}
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            {TABS.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)} className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${tab === t.key ? 'bg-white text-black' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}>{t.label}</button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search…" className="pl-9 pr-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs outline-none focus:border-cyan-400/60 w-56" />
            </div>
            <button onClick={loadData} disabled={loading} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-50">
              {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
              Refresh
            </button>
            <button onClick={exportCSV} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20">
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
          {loading && !data ? (
            <div className="p-10 text-center"><Loader2 className="w-5 h-5 animate-spin inline text-cyan-400" /></div>
          ) : (
            <Table tab={tab} rows={rows} query={query} />
          )}
        </div>

        <p className="mt-6 text-[11px] text-slate-600">Data refreshes on demand. Records are limited to the most recent 500 per collection.</p>
      </div>
    </div>
  )
}
