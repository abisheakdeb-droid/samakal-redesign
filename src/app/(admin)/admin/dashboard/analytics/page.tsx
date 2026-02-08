import { fetchAnalyticsOverview, fetchTopArticles, fetchCategoryStats } from "@/lib/actions-analytics";
import { MoveUp, MoveDown, Minus, Users, BookOpen } from "lucide-react";
import AnalyticsChart from "@/components/dashboard/AnalyticsChart";

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
            <h3 className="text-sm font-medium text-gray-500">সক্রিয় পাঠক (Active Users)</h3>
            <span className="text-blue-500 text-xs font-bold flex items-center gap-1">
                <Users size={12} /> 24h
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{toBengaliNumber(overview.activeUsers24h)}</p>
          <p className="text-xs text-gray-400 mt-2">গত ২৪ ঘন্টায় লগইনে পাঠক</p>
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
      {/* Traffic Sources & Categories */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Engagement (Real Data) */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 relative overflow-hidden group">
             
          <div className="flex items-center justify-between mb-6">
             <h2 className="text-lg font-bold text-gray-900">পাঠক এনগেজমেন্ট (Reader Engagement)</h2>
             <BookOpen size={20} className="text-gray-400" />
          </div>

          <div className="space-y-6">
              <div>
                  <div className="flex justify-between items-end mb-1">
                      <span className="text-gray-500 text-sm">মোট পঠিত ইতিহাস রেকর্ড</span>
                      <span className="text-2xl font-bold text-gray-900">{toBengaliNumber(overview.totalHistoryRecords)}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                       {/* Arbitrary progress bar for visual flair, assuming 10k goal */}
                      <div className="bg-brand-red h-2 rounded-full" style={{ width: `${(overview.totalHistoryRecords / 1000) * 100}%` }}></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">লগইন করা ব্যবহারকারীদের মোট পঠিত নিবন্ধ সংখ্যা</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <h4 className="font-bold text-gray-700 mb-2 text-sm">উপসংহার</h4>
                  <p className="text-xs text-gray-500">
                      আপনার নিবন্ধিত ব্যবহারকারীরা নিয়মিত ফিরে আসছেন। 
                      {overview.activeUsers24h > 5 
                        ? " গত ২৪ ঘন্টায় পাঠক সংখ্যা সন্তোষজনক।" 
                        : " পাঠক সংখ্যা বাড়াতে আরও নিয়মিত সংবাদ প্রকাশ করুন।"}
                  </p>
              </div>
          </div>
        </div>

        {/* Real Category Stats with Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">জনপ্রিয় বিভাগ (Popular Categories)</h2>
          
          <div className="mb-6">
             <AnalyticsChart data={categoryStats} />
          </div>

          <div className="space-y-4 max-h-[200px] overflow-y-auto custom-scrollbar">
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
