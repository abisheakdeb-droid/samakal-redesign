import { MetadataRoute } from 'next'
import { CATEGORY_MAP } from '@/data/mockNews'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://samakal.com' // Replace with actual domain
  
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1,
    },
    {
      url: `${baseUrl}/video`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/photo`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ]

  // Category routes
  const categoryRoutes: MetadataRoute.Sitemap = Object.keys(CATEGORY_MAP).map((slug) => ({
    url: `${baseUrl}/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'hourly' as const,
    priority: 0.9,
  }))

  // Article routes (mock - generate sample articles)
  // In production, this should fetch from your CMS/database
  const articleRoutes: MetadataRoute.Sitemap = Object.keys(CATEGORY_MAP).flatMap((category) =>
    Array.from({ length: 20 }, (_, i) => ({
      url: `${baseUrl}/article/${category}-${i}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  )

  return [...staticRoutes, ...categoryRoutes, ...articleRoutes]
}
