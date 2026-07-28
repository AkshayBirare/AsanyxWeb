'use client'
import SiteLayout from '@/components/site/Layout'
import { SectionHeader } from '@/components/site/Section'

export default function TermsPage() {
  return (
    <SiteLayout>
      <div className="pt-32 pb-8 bg-hero-mesh">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeader eyebrow="Legal" title="Terms & Conditions" subtitle="The terms that govern the use of our website and services." />
        </div>
      </div>
      <section className="py-10">
        <article className="mx-auto max-w-3xl px-6 prose prose-slate dark:prose-invert">
          <p>By accessing this website you agree to these terms. Content is provided for general information and does not constitute professional advice.</p>
          <h3>Intellectual Property</h3>
          <p>All content, marks and materials are the property of ASANYX Analytics (OPC) Private Limited unless otherwise noted.</p>
          <h3>Acceptable use</h3>
          <p>You may not misuse the site, attempt to disrupt services, or use automated tools to scrape content at scale without permission.</p>
          <h3>Limitation of liability</h3>
          <p>ASANYX is not liable for indirect or consequential damages arising from use of this website or its content.</p>
          <h3>Governing law</h3>
          <p>These terms are governed by the laws of India.</p>
        </article>
      </section>
    </SiteLayout>
  )
}
