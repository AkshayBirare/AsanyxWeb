export default function sitemap() {
  const base = 'https://asanyxanalytics.com'
  const routes = ['','/about','/services','/industries','/technologies','/engagement-models','/leadership','/case-studies','/careers','/contact','/brand','/privacy','/terms']
  return routes.map(p => ({ url: `${base}${p}`, lastModified: new Date(), changeFrequency: 'weekly', priority: p === '' ? 1 : 0.7 }))
}
