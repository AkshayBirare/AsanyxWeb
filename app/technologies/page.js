'use client'
import SiteLayout from '@/components/site/Layout'
import { TechCarousel } from '@/components/site/Sections'
import { SectionHeader } from '@/components/site/Section'

export default function TechnologiesPage() {
  return (
    <SiteLayout>
      <div className="pt-32 pb-8 bg-hero-mesh">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader eyebrow="Technologies" title="Modern, best-of-breed data & AI stack" subtitle="We select technologies on merit, and design solutions that last." />
        </div>
      </div>
      <TechCarousel />
    </SiteLayout>
  )
}
