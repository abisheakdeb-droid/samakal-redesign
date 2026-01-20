"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import BreakingTicker from "@/components/BreakingTicker";
import Sidebar from "@/components/Sidebar";
import LatestSidebarWidget from "@/components/LatestSidebarWidget";
import { useParams } from "next/navigation";
import { CATEGORY_MAP, getArticleBySlug, generateNewsList, NewsItem } from "@/data/mockNews";
import { localizeTime } from "@/utils/bn";
import { clsx } from "clsx";

export default function CategoryPage() {
  const params = useParams();
  const slug = (params.slug as string) || "latest";
  const categoryLabel = CATEGORY_MAP[slug] || "সংবাদ";

  // --- LATEST LAYOUT LOGIC ---
  if (slug === "latest") {
    // 1. Top 6 Mixed Prime News (Hero Section)
    const sources = ["politics", "bangladesh", "world", "sports", "entertainment", "business"];
    // Getting ID index 0 from each category
    const topMixed = sources.map((cat) => getArticleBySlug(`${cat}-0`));

    const primeBig = topMixed[0];          // Politics
    const primeMedium = topMixed.slice(1, 3); // BD, World
    const primeSmall = topMixed.slice(3, 6);  // Sports, Ent, Biz

    // 2. Continuous List of Mixed Latest News (Replacing Category Sections)
    const latestList = Array.from({ length: 20 }).map((_, i) => {
        const cats = ["politics", "sports", "business", "entertainment", "bangladesh", "world", "opinion"];
        const cat = cats[i % cats.length];
        // Mixing indices to avoid duplication with top 0
        return getArticleBySlug(`${cat}-${i + 5}`);
    });

    return (
      <div className="min-h-screen bg-background text-foreground font-serif">
        <Header />
        <BreakingTicker />
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          
          {/* Latest Header */}
          <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-4">
             <span className="w-1.5 h-8 bg-brand-red rounded-full"></span>
             <h1 className="text-3xl font-bold text-gray-900 capitalize">সর্বশেষ সংবাদ</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content Area (9 Columns) */}
            <div className="lg:col-span-9">

                {/* --- HERO SECTION (Mixed 6) --- */}
                <section className="mb-12">
                   {/* Level 1 & 2 */}
             <div className="grid grid-cols-1 lg:grid-cols-12 mb-8 border-b border-gray-100 pb-8">
                <Link href={`/article/${primeBig.id}`} className="lg:col-span-8 group block lg:border-r lg:border-gray-200 lg:pr-8">
                    <div className="aspect-video relative overflow-hidden rounded-xl mb-4">
                        <Image src={primeBig.image} alt={primeBig.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700"/>
                        <div className="absolute top-4 left-4 bg-brand-red text-white text-xs px-2 py-1 rounded">{primeBig.category}</div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-3 group-hover:text-brand-red transition-colors">{primeBig.title}</h1>
                    <p className="text-gray-600 text-lg line-clamp-2">{primeBig.summary}</p>
                </Link>
                <div className="lg:col-span-4 flex flex-col pl-0 lg:pl-8 mt-6 lg:mt-0">
                    {primeMedium.map((news, idx) => (
                        <Link key={news.id} href={`/article/${news.id}`} className={clsx(
                            "group block flex flex-row lg:flex-col gap-4",
                            idx === 0 && "border-b border-gray-200 pb-6 mb-6"
                        )}>
                            <div className="w-1/3 lg:w-full aspect-video relative overflow-hidden rounded-lg shrink-0">
                                <Image src={news.image} alt={news.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500"/>
                             </div>
                            <div className="w-2/3 lg:w-full">
                                <span className="text-brand-red text-xs font-bold mb-1 block">{news.category}</span>
                                <h2 className="text-xl font-bold text-gray-800 leading-snug group-hover:text-brand-red mb-1">{news.title}</h2>
                            </div>
                        </Link>
                    ))}
                </div>
             </div>
             {/* Level 3 */}
             <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-200 pb-12 gap-6 md:gap-0">
                {primeSmall.map((news, idx) => (
                    <Link key={news.id} href={`/article/${news.id}`} className={clsx(
                        "group block",
                        idx === 0 && "md:pr-8",
                        idx === 1 && "md:border-l md:border-gray-200 md:px-8",
                        idx === 2 && "md:border-l md:border-gray-200 md:pl-8"
                    )}>
                        <div className="aspect-video relative overflow-hidden rounded-lg mb-3">
                            <Image src={news.image} alt={news.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500"/>
                        </div>
                        <span className="text-brand-red text-xs font-bold mb-1 block">{news.category}</span>
                        <h3 className="text-lg font-bold text-gray-800 leading-snug group-hover:text-brand-red">{news.title}</h3>
                    </Link>
                ))}
             </div>
          </section>

                {/* --- LATEST LIST (Mixed) --- */}
                <section className="flex flex-col gap-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-brand-red pl-3">সকল সর্বশেষ সংবাদ</h2>
                    {latestList.map(news => (
                        <Link key={news.id} href={`/article/${news.id}`} className="group flex flex-col md:flex-row gap-6 border-b border-gray-100 pb-6 last:border-0 items-start">
                             <div className="w-full md:w-64 aspect-video md:aspect-[4/3] relative overflow-hidden rounded-lg shrink-0">
                                <Image src={news.image} alt={news.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500"/>
                            </div>
                            <div>
                                <span className="text-brand-red text-xs font-bold mb-1 block">{news.category}</span>
                                <h3 className="text-xl font-bold text-gray-800 group-hover:text-brand-red mb-2">{news.title}</h3>
                                <p className="text-gray-600 line-clamp-2 md:line-clamp-3 mb-3 text-sm md:text-base">{news.summary}</p>
                                <span className="text-xs text-gray-400">{localizeTime(news.time)}</span>
                            </div>
                        </Link>
                    ))}
                </section>

                {/* Pagination */}
                <div className="mt-12 text-center">
                   <button className="px-8 py-3 bg-gray-100 text-gray-800 font-bold rounded-full hover:bg-brand-red hover:text-white transition">
                     আরও সংবাদ দেখুন
                   </button>
                </div>
            </div>

            {/* Sidebar (3 Columns) */}
            <div className="lg:col-span-3">
                <Sidebar 
                    opinionNews={generateNewsList("opinion", 10)} 
                    mostReadNews={generateNewsList("politics", 10)} 
                    hideLatestTab={true}
                />
            </div>

          </div>

        </main>
      </div>
    );
  }

  // --- STANDARD CATEGORY LAYOUT (For Politics, Sports, etc.) ---
  
  const allNews = generateNewsList(slug, 20);

  const primeBig = allNews[0];
  const primeMedium = allNews.slice(1, 3);
  const primeSmall = allNews.slice(3, 6);
  const listNews = allNews.slice(6);

  return (
    <div className="min-h-screen bg-background text-foreground font-serif">
      <Header />
      <BreakingTicker />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-4">
           <span className="w-1.5 h-8 bg-brand-red rounded-full"></span>
           <h1 className="text-3xl font-bold text-gray-900 capitalize">{categoryLabel}</h1>
           <span className="text-gray-400 text-sm mt-2 ml-auto">মোট ২০টি সংবাদ</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-9">
                {/* Level 1 & 2 */}
                <section className="grid grid-cols-1 lg:grid-cols-12 mb-12 border-b border-gray-100 pb-12">
                    <Link href={`/article/${primeBig.id}`} className="lg:col-span-8 group block lg:border-r lg:border-gray-200 lg:pr-8">
                        <div className="aspect-video relative overflow-hidden rounded-xl mb-4">
                            <Image src={primeBig.image} alt={primeBig.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700"/>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-3 group-hover:text-brand-red transition-colors">{primeBig.title}</h1>
                        <p className="text-gray-600 text-lg line-clamp-2 mb-3">{primeBig.summary}</p>
                        <div className="text-sm text-gray-500">{primeBig.author} • {localizeTime(primeBig.time)}</div>
                    </Link>
                    <div className="lg:col-span-4 flex flex-col pl-0 lg:pl-8 mt-6 lg:mt-0">
                        {primeMedium.map((news, idx) => (
                            <Link key={news.id} href={`/article/${news.id}`} className={clsx(
                                "group block flex flex-row lg:flex-col gap-4",
                                idx === 0 && "border-b border-gray-200 pb-6 mb-6"
                            )}>
                                <div className="w-1/3 lg:w-full aspect-video relative overflow-hidden rounded-lg shrink-0">
                                    <Image src={news.image} alt={news.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500"/>
                                </div>
                                <div className="w-2/3 lg:w-full">
                                    <h2 className="text-xl font-bold text-gray-800 leading-snug group-hover:text-brand-red mb-2">{news.title}</h2>
                                    <div className="text-xs text-gray-400">{localizeTime(news.time)}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Level 3 */}
                <section className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-100 pb-12 mb-12 gap-6 md:gap-0">
                    {primeSmall.map((news, idx) => (
                        <Link key={news.id} href={`/article/${news.id}`} className={clsx(
                            "group block",
                            idx === 0 && "md:pr-8",
                            idx === 1 && "md:border-l md:border-gray-200 md:px-8",
                            idx === 2 && "md:border-l md:border-gray-200 md:pl-8"
                        )}>
                            <div className="aspect-video relative overflow-hidden rounded-lg mb-3">
                                <Image src={news.image} alt={news.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500"/>
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 leading-snug group-hover:text-brand-red">{news.title}</h3>
                            <div className="mt-2 text-xs text-gray-400">{localizeTime(news.time)}</div>
                        </Link>
                    ))}
                </section>

                {/* Level 4: List */}
                <section className="flex flex-col gap-6">
                    {listNews.map(news => (
                        <Link key={news.id} href={`/article/${news.id}`} className="group flex flex-col md:flex-row gap-6 border-b border-gray-100 pb-6 last:border-0 items-start">
                             <div className="w-full md:w-64 aspect-video md:aspect-[4/3] relative overflow-hidden rounded-lg shrink-0">
                                <Image src={news.image} alt={news.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500"/>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 group-hover:text-brand-red mb-2">{news.title}</h3>
                                <p className="text-gray-600 line-clamp-2 md:line-clamp-3 mb-3 text-sm md:text-base">{news.summary}</p>
                                <span className="text-xs text-gray-400">{localizeTime(news.time)}</span>
                            </div>
                        </Link>
                    ))}
                </section>
                
                <div className="mt-12 text-center">
                   <button className="px-8 py-3 bg-gray-100 text-gray-800 font-bold rounded-full hover:bg-brand-red hover:text-white transition">
                     আরও সংবাদ দেখুন
                   </button>
                </div>
            </div>

            {/* Sidebar */}
            {/* Sidebar - Latest News Widget + Ads */}
            <div className="lg:col-span-3">
                 <aside className="sticky bottom-4">
                        <LatestSidebarWidget 
                            news={generateNewsList("latest", 10)} 
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
