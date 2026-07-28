'use client'

import SiteLayout from '@/components/site/Layout'
import Hero from '@/components/site/Hero'
import { TrustBar, ServicesGrid, WhyChooseUs, IndustriesSection, AboutFounder, TechCarousel, CaseStudiesSection, CounterStats, FAQ, CTABanner } from '@/components/site/Sections'

function Home() {
  return (
    <SiteLayout>
      <Hero />
      <TrustBar />
      <ServicesGrid limit={8} />
      <WhyChooseUs />
      <CounterStats />
      <IndustriesSection />
      <AboutFounder />
      <TechCarousel />
      <CaseStudiesSection limit={6} />
      <FAQ />
      <CTABanner />
    </SiteLayout>
  )
}

export default function App() {
  return <Home />
}
