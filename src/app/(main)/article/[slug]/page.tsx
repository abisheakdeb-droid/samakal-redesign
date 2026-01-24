

import Header from "@/components/Header";
import BreakingTicker from "@/components/BreakingTicker";
import LatestSidebarWidget from"@/components/LatestSidebarWidget";
import ArticleContent from "@/components/ArticleContent";
import ViewTracker from "@/components/ViewTracker";
import { fetchArticleById, fetchArticlesByCategory, fetchLatestArticles } from "@/lib/actions-article";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
    const resolvedParams = await params; // Next.js 15+ convention for async params
    const slug = resolvedParams.slug;
    
    // 1. Fetch Article
    const article = await fetchArticleById(slug);
    
    if (!article) {
        return (
            <div className="min-h-screen bg-background text-foreground font-serif">
                <Header />
                <div className="container mx-auto px-4 py-20 text-center">
                    <h1 className="text-2xl font-bold">Article Not Found</h1>
                    <p>The article you are looking for does not exist.</p>
                </div>
            </div>
        );
    }

    // 2. Fetch Related & Sidebar Data
    const relatedNews = await fetchArticlesByCategory(article.category, 4);
    const authorNews = await fetchArticlesByCategory(article.category, 4); // Proxy for author news for now
    const sidebarNews = await fetchLatestArticles(10);
    
    return (
        <div className="min-h-screen bg-background text-foreground font-serif">
          <ViewTracker articleId={article.id} />
          <Header />
          <BreakingTicker />
    
          <main className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content Column */}
                <div className="lg:col-span-9">
                     <ArticleContent 
                        article={article} 
                        relatedNews={relatedNews} 
                        authorNews={authorNews}
                     />
                </div>

                {/* Sidebar Column - Only Latest News + Ads */}
                <div className="lg:col-span-3">
                    <aside className="sticky bottom-4">
                        <LatestSidebarWidget 
                            news={sidebarNews} 
                        />
                        
                        {/* Advertisement 1 */}
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-center min-h-[250px] mb-6 mt-8">
                            <div className="text-center">
                                <p className="text-gray-400 text-sm font-bold tracking-wider mb-2">বিজ্ঞাপন</p>
                                <div className="w-64 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-400 text-xs">Ad Space 1</span>
                                </div>
                            </div>
                        </div>

                        {/* Advertisement 2 */}
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-center min-h-[250px]">
                            <div className="text-center">
                                <p className="text-gray-400 text-sm font-bold tracking-wider mb-2">বিজ্ঞাপন</p>
                                <div className="w-64 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-400 text-xs">Ad Space 2</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
          </main>
        </div>
      );
}
