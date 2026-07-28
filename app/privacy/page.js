'use client'
import SiteLayout from '@/components/site/Layout'
import { SectionHeader } from '@/components/site/Section'

export default function PrivacyPage() {
  return (
    <SiteLayout>
      <div className="pt-32 pb-8 bg-hero-mesh">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeader eyebrow="Legal" title="Privacy Policy" subtitle="How ASANYX collects, uses and protects your information." />
        </div>
      </div>
      <section className="py-10">
        <article className="mx-auto max-w-3xl px-6 prose prose-slate dark:prose-invert">
          <p>ASANYX Analytics (OPC) Private Limited ("ASANYX", "we", "us") respects your privacy. This Privacy Policy explains how we collect, use and safeguard information when you interact with our website and services.</p>
          <h3>Information we collect</h3>
          <p>We collect information you provide via forms (name, email, phone, company, message) and standard technical information (IP address, browser, pages visited) via cookies and analytics.</p>
          <h3>How we use information</h3>
          <p>To respond to enquiries, deliver services, improve the website, send newsletters if subscribed, and meet legal obligations.</p>
          <h3>Sharing</h3>
          <p>We do not sell personal information. We may share limited data with trusted processors (analytics, email delivery) under contractual safeguards.</p>
          <h3>Security</h3>
          <p>We use industry-standard controls to protect data at rest and in transit.</p>
          <h3>Your rights</h3>
          <p>You may request access, correction or deletion of your personal data by writing to contact@asanyxanalytics.com.</p>
          <h3>Contact</h3>
          <p>Email: contact@asanyxanalytics.com · Phone: +91 8468982682</p>
        </article>
      </section>
    </SiteLayout>
  )
}
