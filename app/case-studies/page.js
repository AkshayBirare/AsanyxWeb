'use client'
import SiteLayout from '@/components/site/Layout'
import { SectionHeader } from '@/components/site/Section'
import { CaseStudiesSection, CTABanner } from '@/components/site/Sections'

export default function CaseStudiesPage() {
  return (
    <SiteLayout>
      <div className="pt-32 pb-8 bg-hero-mesh">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader eyebrow="Case Studies" title="Sample outcomes we design and deliver" subtitle="Representative examples of the kinds of solutions ASANYX builds. Clearly labelled as illustrative, not case studies of specific clients." />
        </div>
      </div>
      <CaseStudiesSection />
      <CTABanner />
    </SiteLayout>
  )
}
