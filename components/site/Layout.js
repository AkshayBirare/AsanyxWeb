'use client'
import Header from './Header'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'
import CookieBanner from './CookieBanner'

export default function SiteLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </div>
  )
}
