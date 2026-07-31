'use client'
import SiteLayout from '@/components/site/Layout'
import Hero from '@/components/site/Hero'
import { TrustBar, WhyAsanyx, ServicesOverview, IndustriesGrid, TechnologiesSection, EngagementModels, WhyClientsChoose, DeliveryProcess, LeadershipTeaser, CaseStudiesGrid, CTABand } from '@/components/site/Sections'

function Home() {
  return (
    <SiteLayout>
      <Hero />
      <TrustBar />
      <WhyAsanyx />
      <ServicesOverview />
      <IndustriesGrid compact />
      <TechnologiesSection />
      <EngagementModels />
      <WhyClientsChoose />
      <DeliveryProcess />
      <CaseStudiesGrid limit={3} />
      <LeadershipTeaser />
      <CTABand />
    </SiteLayout>
  )
}
export default function App() { return <Home /> }
