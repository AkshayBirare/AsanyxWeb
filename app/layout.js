import './globals.css'
import { Providers } from './providers'

export const metadata = {
  metadataBase: new URL('https://asanyxanalytics.com'),
  title: {
    default: 'ASANYX Analytics | Business Intelligence, Data & AI Consulting',
    template: '%s | ASANYX Analytics'
  },
  description:
    'ASANYX Analytics helps enterprises transform data into intelligent business decisions through Business Intelligence, Data Analytics, Data Engineering, AI, and Modern Cloud technologies including Power BI, Microsoft Fabric, Azure, Snowflake, and Databricks.',
  keywords: [
    'Business Intelligence', 'Power BI Consulting', 'Microsoft Fabric', 'Data Analytics',
    'Data Engineering', 'Azure Data Factory', 'Snowflake', 'Databricks', 'AI Consulting',
    'Digital Transformation', 'Data Warehouse', 'Enterprise Reporting', 'ASANYX'
  ],
  authors: [{ name: 'ASANYX Analytics (OPC) Private Limited' }],
  creator: 'ASANYX Analytics',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://asanyxanalytics.com',
    siteName: 'ASANYX Analytics',
    title: 'ASANYX Analytics | Data, Insights, AI, Intelligence',
    description: 'Transforming data into intelligent business decisions.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ASANYX Analytics',
    description: 'Transforming data into intelligent business decisions.'
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://asanyxanalytics.com' },
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0A1428' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ASANYX Analytics (OPC) Private Limited',
    url: 'https://asanyxanalytics.com',
    logo: 'https://customer-assets-jai6qajn.emergentagent.net/job_80e05dd0-4f9f-485e-b1aa-5d8939ea0cd2/artifacts/bi2y6etn_Screenshot%202026-07-28%20071001.png',
    email: 'contact@asanyxanalytics.com',
    telephone: '+91 8468982682',
    founder: { '@type': 'Person', name: 'Akshay Birare', jobTitle: 'Founder, Director & CEO' },
    sameAs: []
  }
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="https://customer-assets-jai6qajn.emergentagent.net/job_80e05dd0-4f9f-485e-b1aa-5d8939ea0cd2/artifacts/bi2y6etn_Screenshot%202026-07-28%20071001.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
