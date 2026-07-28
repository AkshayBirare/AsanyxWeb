export default function sitemap() {
  const base = 'https://asanyxanalytics.com'
  const routes = ['','/about','/services','/solutions','/industries','/technologies','/case-studies','/resources','/blog','/careers','/contact','/privacy','/terms']
  return routes.map(p => ({ url: `${base}${p}`, lastModified: new Date(), changeFrequency: 'weekly', priority: p === '' ? 1 : 0.7 }))
}
