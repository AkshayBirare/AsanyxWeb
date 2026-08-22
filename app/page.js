'use client'
import SiteLayout from '@/components/site/Layout'
import Hero from '@/components/site/Hero'
import TrustedBy from '@/components/site/TrustedBy'
import { CoreCapabilities, MigrationSection, TechnologiesQuiet, ValuesSection, EngagementQuiet, CTABand } from '@/components/site/Sections'

function Home() {
  return (
    <SiteLayout>
      <Hero />
      <TrustedBy />
      <CoreCapabilities />
      <MigrationSection />
      <ValuesSection />
      <EngagementQuiet />
      <TechnologiesQuiet />
      <CTABand />
    </SiteLayout>
  )
}
export default function App() { return <Home /> }
