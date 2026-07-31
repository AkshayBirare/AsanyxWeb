'use client'
import SiteLayout from '@/components/site/Layout'
import Hero from '@/components/site/Hero'
import { CredibilityStrip, PrimaryOfferingsSection, MigrationServicesSection, WhyAsanyx, ServicesOverview, IndustriesGrid, TechnologiesSection, EngagementModels, DeliveryProcess, LeadershipTeaser, CTABand } from '@/components/site/Sections'

function Home() {
  return (
    <SiteLayout>
      <Hero />
      <CredibilityStrip />
      <PrimaryOfferingsSection />
      <MigrationServicesSection />
      <ServicesOverview />
      <TechnologiesSection />
      <EngagementModels />
      <IndustriesGrid />
      <WhyAsanyx />
      <DeliveryProcess />
      <LeadershipTeaser />
      <CTABand />
    </SiteLayout>
  )
}
export default function App() { return <Home /> }
