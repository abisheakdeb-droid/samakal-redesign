
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import BreakingTicker from "@/components/BreakingTicker";
import LatestSidebarWidget from "@/components/LatestSidebarWidget";
import { localizeTime } from "@/utils/bn";
import { searchArticles, fetchLatestArticles } from "@/lib/actions-article";

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const query = (resolvedSearchParams.q as string) || "";
  
  // Fetch Results
  const searchResults = query ? await searchArticles(query) : [];
  const sidebarLatest = await fetchLatestArticles(10);

  return (
    <div className="min-h-screen bg-background text-foreground font-serif">
      <Header />
      <BreakingTicker />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-4">
           {/* Search Icon or Header */}
           <h1 className="text-3xl font-bold text-gray-900">
             অনুসন্ধান ফলাফল: <span className="text-brand-red">"{query}"</span>
           </h1>
           <span className="text-gray-400 text-sm mt-2 ml-auto">মোট {searchResults.length}টি ফলাফল</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-9">
                
                {searchResults.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-xl">
                        <h2 className="text-xl font-bold text-gray-600 mb-2">দুঃখিত, কোনো ফলাফল পাওয়া যায়নি</h2>
                        <p className="text-gray-500">অন্য কোনো কিওয়ার্ড দিয়ে চেষ্টা করুন</p>
                    </div>
                ) : (
                    <section className="flex flex-col gap-6">
                        {searchResults.map(news => (
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
                )}

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-3">
                 <aside className="sticky bottom-4">
                        <LatestSidebarWidget 
                            news={sidebarLatest} 
                        />
                </aside>
            </div>
        </div>
      </main>
    </div>
  );
}
