
import { MetadataRoute } from 'next';
import { sql } from '@/lib/db';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.samakal.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await sql`
        SELECT slug, updated_at, created_at 
        FROM articles 
        WHERE status = 'published' 
        ORDER BY created_at DESC 
        LIMIT 5000
    `;

  const articleEntries: MetadataRoute.Sitemap = articles.rows.map((article) => ({
    url: `${BASE_URL}/article/${article.slug}`,
    lastModified: new Date(article.updated_at || article.created_at),
    changeFrequency: 'daily',
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/category/latest`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    // Add static category pages
    ...['politics', 'bangladesh', 'sports', 'entertainment', 'business'].map((cat) => ({
        url: `${BASE_URL}/category/${cat}`,
        lastModified: new Date(),
        changeFrequency: 'hourly' as const,
        priority: 0.8,
    })),
    ...articleEntries,
  ];
}
