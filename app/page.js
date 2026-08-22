'use client'
import SiteLayout from '@/components/site/Layout'
import Hero from '@/components/site/Hero'
import { CoreCapabilities, MigrationSection, TechnologiesQuiet, ValuesSection, EngagementQuiet, CTABand } from '@/components/site/Sections'

function Home() {
  return (
    <SiteLayout>
      <Hero />
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
