'use client'

import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import { MotionConfig } from 'framer-motion'

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
      <MotionConfig reducedMotion="never">
        {children}
        <Toaster position="top-right" richColors closeButton theme="dark" />
      </MotionConfig>
    </ThemeProvider>
  )
}
