'use client'
import Link from 'next/link'
import SiteLayout from '@/components/site/Layout'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <SiteLayout>
      <section className="min-h-[80vh] pt-32 grid place-items-center relative bg-hero-mesh">
        <div className="text-center px-6">
          <div className="text-8xl md:text-9xl font-black gradient-text">404</div>
          <h1 className="mt-2 text-3xl font-bold">Page not found</h1>
          <p className="mt-2 text-muted-foreground max-w-md mx-auto">The page you are looking for does not exist or has been moved.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/" className="btn-primary-brand"><Home className="w-4 h-4" /> Back to Home</Link>
            <Link href="/contact" className="btn-ghost-brand">Contact us</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
