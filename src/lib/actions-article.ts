"use server";

import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import type { ArticleRow, ArticleImageRow, ArticleContributorRow, ArticleSEOData, ExtraArticleData } from "@/types/database";
import { getBengaliCategory } from "@/utils/category";

const ArticleSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  content: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]),
  category: z.string().optional(),
  image: z.string().optional(),
  author_id: z.string().optional(),
  views: z.number().optional(),
  date: z.string().optional(), // For UI display purposes
  // Phase 1: Core Metadata
  sub_headline: z.string().optional(),
  news_type: z.enum(["breaking", "regular", "feature", "opinion", "photo_story"]).optional(),
  location: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  // Phase 2: Media Enhancement
  video_url: z.string().optional(),
  video_thumbnail: z.string().optional(),
  // Phase 3: Attribution & SEO
  source: z.string().optional(),
  source_url: z.string().optional(),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  canonical_url: z.string().optional(),
});

const CreateArticle = ArticleSchema.omit({ id: true, date: true, views: true, author_id: true });

export async function fetchArticles(query?: string) {
  try {
    const data = await sql`
      SELECT 
        articles.id,
        articles.title,
        articles.slug,
        articles.status,
        articles.category,
        articles.views,
        articles.image,
        articles.created_at,
        users.name as author
      FROM articles
      LEFT JOIN users ON articles.author_id = users.id
      WHERE 
        articles.title ILIKE ${`%${query || ''}%`} OR
        articles.category ILIKE ${`%${query || ''}%`}
      ORDER BY articles.created_at DESC
      LIMIT 10
    `;

    return data.rows.map(article => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      status: article.status,
      category: article.category,
      image: article.image,
      created_at: article.created_at,
      author: article.author,
      views: article.views || 0,
       // Format date for UI
      date: new Date(article.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch articles.');
  }
}

export async function fetchArticleById(id: string) {
    try {
        // Check if the input is a valid UUID
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

        let dataWithAuthor;

        if (isUUID) {
             dataWithAuthor = await sql`
              SELECT 
                articles.id,
                articles.title,
                articles.slug,
                articles.status,
                articles.category,
                articles.views,
                articles.image,
                articles.created_at,
                articles.content,
                articles.sub_headline,
                articles.news_type,
                articles.location,
                articles.video_url,
                articles.video_thumbnail,
                articles.source,
                articles.source_url,
                users.name as author
              FROM articles
              LEFT JOIN users ON articles.author_id = users.id
              WHERE articles.id = ${id}
            `;
        } else {
             dataWithAuthor = await sql`
              SELECT 
                articles.id,
                articles.title,
                articles.slug,
                articles.status,
                articles.category,
                articles.views,
                articles.image,
                articles.created_at,
                articles.content,
                articles.sub_headline,
                articles.news_type,
                articles.location,
                articles.video_url,
                articles.video_thumbnail,
                articles.source,
                articles.source_url,
                users.name as author
              FROM articles
              LEFT JOIN users ON articles.author_id = users.id
              WHERE articles.slug = ${id}
            `;
        }
        
        if (dataWithAuthor.rows.length === 0) return null;

        const articleData = dataWithAuthor.rows[0];
        const articleId = articleData.id;

        // Paralell Fetch for Related Data
        const [images, contributors, tags] = await Promise.all([
            fetchArticleImages(articleId),
            fetchArticleContributors(articleId),
            fetchArticleTags(articleId)
        ]);

        return mapArticleToNewsItem(articleData as ArticleRow, { 
            images: images as ArticleImageRow[], 
            contributors: contributors as ArticleContributorRow[], 
            tags 
        });
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch article.');
    }
}


// PUBLIC FETCH FUNCTIONS

export async function fetchLatestArticles(limit: number = 10) {
  try {
    const data = await sql`
      SELECT 
        articles.id,
        articles.title,
        articles.slug,
        articles.status,
        articles.category,
        articles.views,
        articles.image,
        articles.created_at,
        articles.content,
        articles.sub_headline,
        articles.news_type,
        articles.location,
        articles.video_url,
        users.name as author
      FROM articles
      LEFT JOIN users ON articles.author_id = users.id
      WHERE articles.status = 'published'
      ORDER BY articles.created_at DESC
      LIMIT ${limit}
    `;

    return data.rows.map(row => mapArticleToNewsItem(row as ArticleRow));
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}

export async function fetchArticlesByCategory(category: string, limit: number = 6) {
    try {
      const data = await sql`
        SELECT 
          articles.id,
          articles.title,
          articles.slug,
          articles.status,
          articles.category,
          articles.views,
          articles.image,
          articles.created_at,
          articles.content,
          articles.sub_headline,
          articles.news_type,
          articles.location,
          articles.video_url,
          users.name as author
        FROM articles
        LEFT JOIN users ON articles.author_id = users.id
        WHERE 
            articles.status = 'published' AND
            articles.category ILIKE ${category}
        ORDER BY articles.created_at DESC
        LIMIT ${limit}
      `;
  
      return data.rows.map(row => mapArticleToNewsItem(row as ArticleRow));
    } catch (error) {
      console.error('Database Error:', error);
      return [];
    }
  }

export async function searchArticles(query: string) {
    try {
      const data = await sql`
        SELECT 
          articles.id,
          articles.title,
          articles.slug,
          articles.status,
          articles.category,
          articles.views,
          articles.image,
          articles.created_at,
          articles.content,
          articles.sub_headline,
          articles.news_type,
          articles.location,
          articles.video_url,
          users.name as author
        FROM articles
        LEFT JOIN users ON articles.author_id = users.id
        WHERE 
            articles.status = 'published' AND
            (articles.title ILIKE ${`%${query}%`} OR articles.content ILIKE ${`%${query}%`})
        ORDER BY articles.created_at DESC
        LIMIT 20
      `;
  
      return data.rows.map(row => mapArticleToNewsItem(row as ArticleRow));
    } catch (error) {
      console.error('Database Error:', error);
      return [];
    }
}

// Helper to map DB result to UI NewsItem shape
function mapArticleToNewsItem(
    article: ArticleRow, 
    extraData: ExtraArticleData = {}
) {
    const dateObj = new Date(article.created_at);
    
    // Video Mapping
    let relatedVideo = undefined;
    if (article.video_url) {
        const isYoutube = article.video_url.includes('youtube') || article.video_url.includes('youtu.be');
        const isFacebook = article.video_url.includes('facebook');
        
        // Simple ID extraction (robust regex could be better)
        let videoId = article.video_url; 
        if (isYoutube) {
             const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
             const match = article.video_url.match(regExp);
             videoId = (match && match[2].length === 11) ? match[2] : videoId;
        } else if (isFacebook) {
             // Basic fallback for FB, usually full URL or ID extraction needed
             // For now, passing ID/URL as is, assuming player handles it or needs update
        }

        relatedVideo = {
            id: videoId,
            source: (isYoutube ? 'youtube' : 'facebook') as 'youtube' | 'facebook',
            title: 'Related Video'
        };
    }

    return {
        id: article.id, // Using UUID as ID for routing
        title: article.title,
        sub_headline: article.sub_headline,
        slug: article.slug,
        image: article.image || '/placeholder.svg',
        category: getBengaliCategory(article.category),
        catSlug: (article.category || 'uncategorized').toLowerCase(),
        author: article.author || 'Desk Report',
        date: dateObj.toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }), // Bengali Date
        time: getTimeAgo(dateObj),
        summary: stripHtml(article.content || '').substring(0, 150) + '...', // Simple extract
        content: article.content || '',
        // New Fields
        news_type: article.news_type,
        location: article.location,
        source: article.source,
        sourceUrl: article.source_url,
        tags: extraData.tags || [],
        images: extraData.images?.map((img) => ({
            id: img.id,
            url: img.image_url,
            caption: img.caption,
            type: img.image_type
        })),
        contributors: extraData.contributors?.map((con) => ({
             id: con.id,
             name: con.display_name || 'Contributor', 
             role: con.role
        })),
        relatedVideo: relatedVideo
    };
}

function getTimeAgo(date: Date) {
    const diff = Math.floor((new Date().getTime() - date.getTime()) / 1000 / 60 / 60);
    return diff < 1 ? 'এইমাত্র' : `${diff} ঘণ্টা আগে`;
}

function stripHtml(html: string) {
   if (!html) return '';
   return html.replace(/<[^>]*>?/gm, '');
}


// Added Missing Helper 
export async function fetchArticleTags(articleId: string): Promise<string[]> {
    try {
      const data = await sql`
        SELECT tag 
        FROM article_tags 
        WHERE article_id = ${articleId}
      `;
      return data.rows.map(row => row.tag);
    } catch (error) {
      console.error('Database Error:', error);
      return [];
    }
}

import { auth } from "@/auth";

export async function createArticle(formData: FormData) {
    // Check Authentication
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        return { message: 'Unauthorized: You must be logged in to create articles.' };
    }
    const authorId = session.user.id; // Real User ID

    // Parse tags and keywords from JSON strings
    const tagsRaw = formData.get('tags');
    const keywordsRaw = formData.get('keywords');
    
    const tags = tagsRaw ? JSON.parse(tagsRaw as string) : [];
    const keywords = keywordsRaw ? JSON.parse(keywordsRaw as string) : [];

    // Validate form fields using Zod
    const validatedFields = CreateArticle.safeParse({
        title: formData.get('title'),
        slug: formData.get('slug'),
        content: formData.get('content'),
        status: formData.get('status'),
        category: formData.get('category'),
        image: formData.get('image'), // Base64 or URL
        // Phase 1 metadata
        sub_headline: formData.get('sub_headline'),
        news_type: formData.get('news_type') || 'regular',
        location: formData.get('location'),
        keywords: keywords,
        tags: tags,
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Article.',
        };
    }

    const { 
        title, slug, content, status, category, image, 
        sub_headline, news_type, location, keywords: validatedKeywords, tags: validatedTags 
    } = validatedFields.data;

    try {
        // Insert article with Phase 1 metadata
        // Convert keywords array to PostgreSQL array format
        const keywordsArray = validatedKeywords && validatedKeywords.length > 0 
            ? `{${validatedKeywords.map(k => `"${k}"`).join(',')}}` 
            : null;

        const result = await sql`
        INSERT INTO articles (
            title, slug, content, status, category, image, author_id,
            sub_headline, news_type, location, keywords
        )
        VALUES (
            ${title}, 
            ${slug}, 
            ${content || ''}, 
            ${status}, 
            ${category || 'Uncategorized'}, 
            ${image || ''}, 
            ${authorId},
            ${sub_headline || null},
            ${news_type || 'regular'},
            ${location || null},
            ${keywordsArray}
        )
        RETURNING id
        `;

        const articleId = result.rows[0].id;

        // Insert tags if provided
        if (validatedTags && validatedTags.length > 0) {
            for (const tag of validatedTags) {
                await sql`
                    INSERT INTO article_tags (article_id, tag)
                    VALUES (${articleId}, ${tag})
                `;
            }
        }

    } catch (error) {
        console.error('Database Error:', error);
        return {
            message: 'Database Error: Failed to Create Article.',
        };
    }

    revalidatePath('/admin/dashboard/articles');
    redirect('/admin/dashboard/articles');
}

export async function deleteArticle(id: string) {
    try {
        await sql`DELETE FROM articles WHERE id = ${id}`;
        revalidatePath('/admin/dashboard/articles');
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Article.' };
    }
}

// Phase 1: Helper functions for autocomplete

export async function fetchAllTags(): Promise<string[]> {
  try {
    const data = await sql`
      SELECT DISTINCT tag 
      FROM article_tags 
      ORDER BY tag ASC
      LIMIT 100
    `;
    return data.rows.map(row => row.tag);
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}

export async function fetchAllLocations(): Promise<string[]> {
  try {
    const data = await sql`
      SELECT DISTINCT location 
      FROM articles 
      WHERE location IS NOT NULL
      ORDER BY location ASC
      LIMIT 50
    `;
    return data.rows.map(row => row.location);
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}

export async function updateArticleTags(articleId: string, tags: string[]) {
  try {
    // Delete existing tags
    await sql`DELETE FROM article_tags WHERE article_id = ${articleId}`;
    
    // Insert new tags
    if (tags && tags.length > 0) {
      for (const tag of tags) {
        await sql`
          INSERT INTO article_tags (article_id, tag)
          VALUES (${articleId}, ${tag})
        `;
      }
    }
    
    revalidatePath('/admin/dashboard/articles');
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update article tags.');
  }
}

// Phase 2: Media Management Functions

export async function addArticleImage(
  articleId: string,
  imageUrl: string,
  imageType: 'featured' | 'thumbnail' | 'gallery',
  caption?: string,
  photographer?: string,
  displayOrder: number = 0
) {
  try {
    await sql`
      INSERT INTO article_images (article_id, image_url, image_type, caption, photographer, display_order)
      VALUES (${articleId}, ${imageUrl}, ${imageType}, ${caption || null}, ${photographer || null}, ${displayOrder})
    `;
    
    revalidatePath('/admin/dashboard/articles');
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to add article image.');
  }
}

export async function fetchArticleImages(articleId: string) {
  try {
    const data = await sql`
      SELECT * FROM article_images
      WHERE article_id = ${articleId}
      ORDER BY display_order ASC, created_at ASC
    `;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}

export async function deleteArticleImage(imageId: string) {
  try {
    await sql`DELETE FROM article_images WHERE id = ${imageId}`;
    revalidatePath('/admin/dashboard/articles');
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete article image.');
  }
}

export async function reorderGalleryImages(articleId: string, imageIds: string[]) {
  try {
    for (let i = 0; i < imageIds.length; i++) {
      await sql`
        UPDATE article_images
        SET display_order = ${i}
        WHERE id = ${imageIds[i]} AND article_id = ${articleId}
      `;
    }
    
    revalidatePath('/admin/dashboard/articles');
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to reorder gallery images.');
  }
}

export async function updateArticleVideo(articleId: string, videoUrl: string, videoThumbnail?: string) {
  try {
    await sql`
      UPDATE articles
      SET video_url = ${videoUrl}, video_thumbnail = ${videoThumbnail || null}
      WHERE id = ${articleId}
    `;
    
    revalidatePath('/admin/dashboard/articles');
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update article video.');
  }
}

// Phase 3: Attribution & SEO Functions

export async function addArticleContributor(
  articleId: string,
  contributorId?: string,
  customName?: string,
  role: string = 'reporter',
  displayOrder: number = 0
) {
  try {
    await sql`
      INSERT INTO article_contributors (article_id, contributor_id, custom_name, role, display_order)
      VALUES (${articleId}, ${contributorId || null}, ${customName || null}, ${role}, ${displayOrder})
    `;
    
    revalidatePath('/admin/dashboard/articles');
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to add article contributor.');
  }
}

export async function fetchArticleContributors(articleId: string) {
  try {
    const data = await sql`
      SELECT 
        ac.id,
        ac.article_id,
        ac.contributor_id,
        ac.role,
        ac.custom_name,
        COALESCE(ac.custom_name, u.name) as display_name,
        ac.display_order
      FROM article_contributors ac
      LEFT JOIN users u ON ac.contributor_id = u.id
      WHERE ac.article_id = ${articleId}
      ORDER BY ac.display_order ASC, ac.created_at ASC
    `;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}

export async function deleteArticleContributor(id: string) {
  try {
    await sql`DELETE FROM article_contributors WHERE id = ${id}`;
    revalidatePath('/admin/dashboard/articles');
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete contributor.');
  }
}

export async function updateArticleSEO(articleId: string, seoData: ArticleSEOData) {
  try {
    await sql`
      UPDATE articles
      SET 
        source = ${seoData.source || null},
        source_url = ${seoData.source_url || null},
        seo_title = ${seoData.seo_title || null},
        seo_description = ${seoData.seo_description || null},
        canonical_url = ${seoData.canonical_url || null}
      WHERE id = ${articleId}
    `;
    
    revalidatePath('/admin/dashboard/articles');
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update article SEO.');
  }
}


export async function incrementArticleView(articleId: string) {
  try {
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(articleId);

    if (isUUID) {
       await sql`
        UPDATE articles
        SET views = COALESCE(views, 0) + 1
        WHERE id = ${articleId}
       `;
    } else {
        // Handle slug if necessary, but ID is safer
        await sql`
        UPDATE articles
        SET views = COALESCE(views, 0) + 1
        WHERE slug = ${articleId}
       `;
    }
  } catch (error) {
    console.error('Database Error:', error);
    // Silent fail for view increments to not block UI
  }
}
