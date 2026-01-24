

import { clsx } from "clsx";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import BreakingTicker from "@/components/BreakingTicker";
import NumberedList from "@/components/NumberedList";
import HeroCard from "@/components/HeroCard";
import Sidebar from "@/components/Sidebar"; 
import ScrollReveal from "@/components/ScrollReveal"; 
import { StaggerWrapper, StaggerItem } from "@/components/StaggerWrapper"; 
import { CATEGORY_MAP } from "@/data/mockNews"; // Keep CATEGORY_MAP for labels
import AdSlot from "@/components/AdSlot";
import NativeAd from "@/components/NativeAd";
import { fetchLatestArticles, fetchArticlesByCategory } from "@/lib/actions-article";

import { fetchSettings } from "@/lib/actions-settings";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const settings = await fetchSettings();
  
  // 1. LEAD NEWS (Latest 20 items - 12 for grid, 8 for sidebar list)
  const leadNewsFull = await fetchLatestArticles(20);
  
  // Fallback to empty if DB is empty
  if (!leadNewsFull || leadNewsFull.length === 0) {
      return (
          <main className="min-h-screen bg-background text-foreground font-serif">
              <Header />
              <div className="container mx-auto px-4 py-20 text-center">
                  <h1 className="text-2xl font-bold">No News Found</h1>
                  <p>Please publish some articles from the admin dashboard.</p>
                  <Link href="/admin/login" className="text-blue-600 underline mt-4 block">Go to Admin</Link>
              </div>
          </main>
      );
  }

  const heroNews = leadNewsFull[0];      // Big Item
  const subHeroNews = leadNewsFull.slice(1, 3); // 2 Medium Items
  const gridNews = leadNewsFull.slice(3, 12);   // 9 Small Items (3x3)
  
  // Sidebar List - Try to get unique items (12+), but fallback to latest if not enough data
  // This ensures the "Latest" sidebar is never empty
  let listNews = leadNewsFull.slice(12, 20);
  if (listNews.length < 5) {
      listNews = leadNewsFull.slice(0, 10);
  }

  // 2. SELECTED NEWS (Bangladesh Category)
  const selectedNewsFull = await fetchArticlesByCategory("Bangladesh", 5);
  const selectedMain = selectedNewsFull[0];
  const selectedSide = selectedNewsFull.slice(1, 5);

  // 3. SIDEBAR DATA
  const opinionNews = await fetchArticlesByCategory("Opinion", 5);
  const mostReadNews = await fetchArticlesByCategory("World", 5); // Using World as proxy

  // 3. CATEGORY SECTIONS
  // Fetch for all categories in parallel
  const categoriesToFetch = Object.keys(CATEGORY_MAP).filter(k => 
      k !== "latest" && k !== "politics" && k !== "bangladesh" && k !== "opinion"
  ).slice(0, 5); // Limit to first 5 for performance

  const categorySections = await Promise.all(categoriesToFetch.map(async (k) => {
      const news = await fetchArticlesByCategory(CATEGORY_MAP[k], 6); // Fetch using Bengali label if that's what's in DB?? Wait, seed used English keys.
      // Re-read seed: category: 'Politics', 'Lifestyle'.
      // English keys are safer if DB matches.
      // Let's assume DB has English categories like "Politics", "Sports".
      // CATEGORY_MAP keys are english: politics, sports. Values are Bengali: রাজনীতি, খেলা.
      // We should probably invoke with English keys capitalized?
      // fetchArticlesByCategory uses ILIKE, so "politics" works if DB has "Politics".
      const englishCategory = k.charAt(0).toUpperCase() + k.slice(1); 
      const catNews = await fetchArticlesByCategory(englishCategory, 6);
      
      return {
        slug: k,
        label: CATEGORY_MAP[k],
        news: catNews
      };
  }));

  // Filter out sections with no news
  const validCategorySections = categorySections.filter(s => s.news.length > 0);


  return (
    <main className="min-h-screen pb-20 bg-background text-foreground font-serif">
      <Header />
      <BreakingTicker customTicker={settings.breaking_news_ticker} />
      
      {/* Leaderboard Ad - High visibility below header */}
      <div className="container mx-auto px-4 py-4">
        <AdSlot slotId="homepage-leaderboard-top" format="leaderboard" />
      </div>

      {/* --- TOP SECTION (Lead News & Sidebar) --- */}
      <div className="container mx-auto px-4 py-8 mb-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 divide-x-0 lg:divide-x divide-gray-100 mb-8">
          
          {/* Column 1: Latest News List (Width 3) */}
          <div className="lg:col-span-3 lg:pr-6 order-2 lg:order-1">
            <ScrollReveal direction="right" delay={2}>
               <NumberedList news={listNews} />
            </ScrollReveal>
          </div>

          {/* Column 2: MAIN LEAD NEWS (Width 6) - 12 Items Total */}
          <div className="lg:col-span-6 lg:px-6 order-1 lg:order-2">
            
            {/* A. Hero */}
            {/* A. Hero */}
            <ScrollReveal direction="up" delay={1}>
                {heroNews ? (
                     <HeroCard news={heroNews} /> 
                ) : null}
            </ScrollReveal>
            
            {/* B. Sub-Hero (Staggered Grid) */}
            <StaggerWrapper className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pb-8 border-b border-gray-100">
               {subHeroNews.map((news) => (
                 <StaggerItem key={news.id}>
                    <Link href={`/article/${news.id}`} className="group block">
                        <div className="aspect-video relative bg-gray-100 rounded-lg mb-3 overflow-hidden">
                        <Image 
                            src={news.image} 
                            alt={news.title} 
                            fill 
                            className="object-cover group-hover:scale-105 transition-transform" 
                            />
                        </div>
                        <h3 className="text-xl font-bold leading-snug group-hover:text-brand-red transition-colors">
                        {news.title}
                        </h3>
                    </Link>
                 </StaggerItem>
               ))}
            </StaggerWrapper>

            {/* C. 3x3 Grid (Staggered) */}
            <StaggerWrapper className="grid grid-cols-3 gap-x-4 gap-y-6 mt-8">
                {/* Native Ad after 4th article */}
                <StaggerItem className="col-span-3">
                   <NativeAd 
                     title="প্রিমিয়াম স্মার্টফোন অফার - এখনই কিনুন"
                     description="সর্বশেষ টেকনোলজি সহ স্মার্টফোন এখন আপনার হাতের মুঠোয়। বিশেষ ছাড় পান।"
                     image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400"
                     url="#"
                     sponsor="TechMart BD"
                   />
                </StaggerItem>
                {gridNews.map((news) => (
                    <StaggerItem key={news.id}>
                        <Link href={`/article/${news.id}`} className="group block">
                            <div className="aspect-video relative bg-gray-100 rounded mb-2 overflow-hidden">
                                <Image 
                                    src={news.image} 
                                    alt={news.title} 
                                    fill 
                                    className="object-cover group-hover:scale-105 transition-transform" 
                                />
                            </div>
                            <h4 className="text-sm font-bold leading-tight group-hover:text-brand-red line-clamp-3">
                                {news.title}
                            </h4>
                        </Link>
                    </StaggerItem>
                ))}
            </StaggerWrapper>

          </div>

          {/* Column 3: Sidebar / Opinion (Width 3) */}
          <div className="lg:col-span-3 lg:pl-6 order-3">
             <ScrollReveal direction="left" delay={2}>
                <Sidebar opinionNews={opinionNews} mostReadNews={mostReadNews} />
             </ScrollReveal>
          </div>

        </div>
      </div>

      {/* --- SELECTED NEWS SECTION (Nirbachito) --- */}
      <section className="bg-gray-50 py-12 border-y border-gray-200 mb-12">
         <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-8">
                <span className="w-1.5 h-8 bg-brand-red rounded-full"></span>
                <h2 className="text-3xl font-bold text-gray-900">নির্বাচিত খবর</h2>
            </div>
            <div className="flex justify-end -mt-10 mb-8">
               <Link href="/category/bangladesh" className="text-brand-red font-bold text-sm hover:underline">
                    সব দেখুন &rarr;
               </Link>
            </div>


            
            {selectedMain && (
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* 1 Big Item (Left) */}
                <div className="lg:col-span-5 relative group">
                    <Link href={`/article/${selectedMain.id}`}>
                        <div className="aspect-video relative overflow-hidden rounded-xl mb-4">
                            <Image src={selectedMain.image} alt={selectedMain.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700"/>
                             <div className="absolute top-4 left-4 bg-brand-red text-white text-xs px-2 py-1 rounded">কিউরেটেড</div>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-3 group-hover:text-brand-red transition-colors">
                            {selectedMain.title}
                        </h1>
                        <p className="text-gray-600 text-lg line-clamp-3">{selectedMain.summary}</p>
                    </Link>
                </div>

                {/* Vertical Divider (Hidden on mobile) */}
                <div className="hidden lg:block w-px bg-gray-300 mx-auto"></div>

                {/* 4 Items Grid (Right) */}
                <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-gray-200 md:border-none">
                     {selectedSide.map((news, idx) => (
                         <Link href={`/article/${news.id}`} key={news.id} className={clsx(
                             "group block p-4 border-b border-gray-200",
                             // Add right border to odd items (0, 2) on Desktop
                             idx % 2 === 0 ? "md:border-r" : ""
                         )}>
                             <div className="aspect-video relative overflow-hidden rounded mb-3">
                                 <Image src={news.image} alt={news.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500"/>
                             </div>
                             <h3 className="text-lg font-bold text-gray-800 leading-snug group-hover:text-brand-red line-clamp-2">
                                 {news.title}
                             </h3>
                         </Link>
                     ))}
                </div>
            </div>
            )}

            {!selectedMain && <div className="text-center text-gray-500 py-12">No selected news available.</div>} 
         </div>
      </section>

       {/* --- CATEGORY ROUNDUP (Existing) --- */}
       <div className="container mx-auto px-4 space-y-16">
             {validCategorySections.map((section) => (
               <section key={section.slug}>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <span className="w-1 h-6 bg-brand-red rounded-full"></span>
                        <h2 className="text-2xl font-bold text-gray-900">{section.label}</h2>
                    </div>
                    <Link href={`/category/${section.slug}`} className="text-brand-red font-bold text-sm hover:underline">
                        সব দেখুন
                    </Link>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {section.news.map(news => (
                        <Link key={news.id} href={`/article/${news.id}`} className="group block">
                            <div className="aspect-video relative overflow-hidden rounded-lg mb-2">
                                <Image src={news.image} alt={news.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500"/>
                            </div>
                            <h3 className="text-sm font-bold text-gray-800 leading-snug group-hover:text-brand-red line-clamp-3">
                                {news.title}
                            </h3>
                        </Link>
                    ))}
                </div>
              </section>
            ))}
      </div>
    </main>
  );
}
