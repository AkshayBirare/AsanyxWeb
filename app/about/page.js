'use client'
import SiteLayout from '@/components/site/Layout'
import { WhyAsanyx, DeliveryProcess, LeadershipTeaser, CTABand } from '@/components/site/Sections'

export default function AboutPage() {
  return (
    <SiteLayout>
      <section className="bg-navy-50 dark:bg-slate-900/30 py-16 lg:py-24 border-b border-slate-200 dark:border-white/10">
        <div className="container-x">
          <div className="eyebrow">About ASANYX</div>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white max-w-3xl">An IT consulting and analytics company built for enterprise delivery</h1>
          <p className="mt-5 text-lg text-slate-600 dark:text-slate-300 max-w-3xl">ASANYX Analytics Private Limited is a boutique IT consulting company specialising in Business Intelligence, Data Engineering, Analytics and AI. We help organisations design, build and operate modern data platforms that turn data into confident business decisions.</p>
          <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-3xl">Our engagement models cover consulting, project delivery, dedicated resources, managed services and support - so clients can pick the model that matches their goals, timelines and internal capabilities.</p>
        </div>
      </section>
      <WhyAsanyx />
      <DeliveryProcess />
      <LeadershipTeaser />
      <CTABand />
    </SiteLayout>
  )
}
