'use client'
import { MessageCircle } from 'lucide-react'
import { site } from '@/lib/site'

export default function WhatsAppButton() {
  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent('Hi ASANYX, I would like to schedule a consultation.')}`
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full grid place-items-center text-white shadow-brand pulse-ring" style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)' }}>
      <MessageCircle className="w-6 h-6" />
    </a>
  )
}
