import { fetchAnalyticsOverview, fetchTopArticles, fetchCategoryStats } from "@/lib/actions-analytics";
import { MoveUp, MoveDown, Minus } from "lucide-react";

// Helper to convert English numbers to Bengali
const toBengaliNumber = (num: number) => {
    return new Intl.NumberFormat('bn-BD').format(num);
};

export const dynamic = 'force-dynamic';

export default async function AnalyticsPage() {
  const overview = await fetchAnalyticsOverview();
  const topArticles = await fetchTopArticles();
  const categoryStats = await fetchCategoryStats();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">বিশ্লেষণ (Analytics)</h1>
        <p className="text-gray-500">আপনার সাইটের রিয়েল-টাইম পারফরম্যান্স এবং ট্র্যাফিক ডেটা</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">মোট আর্টিকেল</h3>
            <span className="text-green-500 text-xs font-bold flex items-center gap-1">
                <MoveUp size={12} /> লাইভ
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{toBengaliNumber(overview.totalArticles)}</p>
          <p className="text-xs text-gray-400 mt-2">সর্বমোট প্রকাশিত</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">মোট পেজ ভিউ</h3>
            <span className="text-green-500 text-xs font-bold flex items-center gap-1">
               <MoveUp size={12} /> ক্রমবর্ধমান
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{toBengaliNumber(overview.totalViews)}</p>
          <p className="text-xs text-gray-400 mt-2">আর্টিকেল রিড কাউন্ট</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">ড্রাফট স্ট্যাটাস</h3>
            <span className="text-gray-500 text-xs font-bold flex items-center gap-1">
                <Minus size={12} />
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{toBengaliNumber(overview.totalDrafts)}</p>
          <p className="text-xs text-gray-400 mt-2">অপ্রকাশিত সংবাদ</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">গড় ভিউ</h3>
             <span className="text-blue-500 text-xs font-bold flex items-center gap-1">
                <MoveUp size={12} /> এভারেজ
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{toBengaliNumber(overview.avgViews)}</p>
          <p className="text-xs text-gray-400 mt-2">প্রতি আর্টিকেলে</p>
        </div>
      </div>

      {/* Top Articles */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-6">শীর্ষ পঠিত নিবন্ধ (Top Read Articles)</h2>
        <div className="space-y-4">
          {topArticles.length > 0 ? topArticles.map((article, idx) => (
            <div key={idx} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 hover:bg-gray-50 transition p-2 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-gray-900 line-clamp-1">{article.title}</p>
                <p className="text-xs text-gray-500 mt-1">{article.category || 'Uncategorized'}</p>
              </div>
              <div className="text-right pl-4">
                <span className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold whitespace-nowrap">
                  {toBengaliNumber(article.views || 0)} ভিউ
                </span>
              </div>
            </div>
          )) : (
            <p className="text-gray-500 text-center py-4">এখনও কোনো ডেটা নেই</p>
          )}
        </div>
      </div>

      {/* Traffic Sources & Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Placeholder for Traffic Sources (Need GA/Tracking for real data) */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 relative overflow-hidden group">
             
          <div className="absolute inset-0 bg-white/80 z-10 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm opacity-100 transition-opacity">
                <p className="text-gray-900 font-bold mb-2">বিস্তারিত ট্র্যাফিক রিপোর্ট</p>
                <p className="text-sm text-gray-500 mb-4">ট্র্যাফিক সোর্স, বাউন্স রেট এবং বিস্তারিত তথ্যের জন্য Google Analytics ড্যাশবোর্ড দেখুন।</p>
                <a 
                    href="https://analytics.google.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                    Google Analytics খুলুন
                </a>
          </div>

          <h2 className="text-lg font-bold text-gray-900 mb-6">ট্র্যাফিক উৎস</h2>
          <div className="space-y-4 filter blur-sm">
            {[
              { source: "সরাসরি", percentage: "45%", color: "bg-blue-500" },
              { source: "সোশ্যাল মিডিয়া", percentage: "30%", color: "bg-purple-500" },
              { source: "সার্চ ইঞ্জিন", percentage: "18%", color: "bg-green-500" },
              { source: "রেফারেল", percentage: "7%", color: "bg-orange-500" },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{item.source}</span>
                  <span className="text-sm font-bold text-gray-900">{item.percentage}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className={`${item.color} h-2 rounded-full`} style={{ width: item.percentage }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real Category Stats */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">জনপ্রিয় বিভাগ (Popular Categories)</h2>
          <div className="space-y-4">
            {categoryStats.length > 0 ? categoryStats.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 hover:bg-gray-50 transition p-2 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.category}</p>
                  <p className="text-xs text-gray-500 mt-1">{toBengaliNumber(item.articles)} টি নিবন্ধ</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{toBengaliNumber(item.avgViews)}</p>
                  <p className="text-xs text-gray-500">গড় ভিউ</p>
                </div>
              </div>
            )) : (
                 <p className="text-gray-500 text-center py-4">এখনও কোনো ডেটা নেই</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
