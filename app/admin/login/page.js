'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { site } from '@/lib/site'
import { Loader2, LogIn, ShieldCheck } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const j = await res.json()
      if (!res.ok || !j.ok) throw new Error(j.error || 'Login failed')
      router.replace('/admin')
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full grid place-items-center px-4" style={{ background: 'linear-gradient(180deg, #050915 0%, #0A2540 100%)' }}>
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-32 h-10">
              <Image src={site.logo} alt="ASANYX" fill className="object-contain object-center brightness-[1.6]" priority sizes="128px" />
            </div>
          </Link>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl p-8">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span className="text-[11px] uppercase tracking-widest text-cyan-400 font-semibold">Admin Access</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Sign in to dashboard</h1>
          <p className="mt-1 text-sm text-slate-400">Manage leads, applications and newsletter subscribers.</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-white placeholder-slate-500 outline-none focus:border-cyan-400/60 focus:bg-white/10 transition" placeholder="admin@asanyxanalytics.com" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-white placeholder-slate-500 outline-none focus:border-cyan-400/60 focus:bg-white/10 transition" placeholder="Enter password" />
            </div>
            {error && (
              <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</div>
            )}
            <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60" style={{ background: 'linear-gradient(135deg, #1E6BFF 0%, #06D6E0 100%)' }}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-[11px] text-slate-500 text-center">Authorized personnel only. All activity is logged.</p>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-xs text-slate-400 hover:text-white transition">← Back to website</Link>
        </div>
      </div>
    </div>
  )
}
