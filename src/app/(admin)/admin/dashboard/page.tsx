import { Users, TrendingUp, FileText, Clock } from 'lucide-react';
import MetricsCard from '@/components/dashboard/MetricsCard';
import LivePulseGraph from '@/components/dashboard/LivePulseGraph';
import AIInsights from '@/components/dashboard/AIInsights';
import RecentActivity from '@/components/dashboard/RecentActivity';
import QuickNote from '@/components/dashboard/QuickNote';
import AnalyticsChart from '@/components/dashboard/AnalyticsChart';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import QuickActions from '@/components/dashboard/QuickActions';
import { fetchAnalyticsOverview, fetchTopArticles, fetchCategoryStats } from "@/lib/actions-analytics";
import { fetchArticles } from "@/lib/actions-article";
import { fetchSettings } from "@/lib/actions-settings";

// Helper for relative time
function timeAgo(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return Math.floor(seconds) + "s ago";
}

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  // Fetch real data in parallel
  const [overview, recentArticles, topArticles, categoryStats, settings] = await Promise.all([
    fetchAnalyticsOverview(),
    fetchArticles(), 
    fetchTopArticles(5),
    fetchCategoryStats(),
    fetchSettings()
  ]);

  const recentActivities = recentArticles.slice(0, 5).map(article => ({
      id: article.id,
      user: article.author || 'System',
      action: 'published', 
      target: `"${article.title}"`,
      time: timeAgo(article.created_at)
  }));

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <DashboardHeader />

      {/* Real-time Quick Actions */}
      <QuickActions settings={settings} />

      {/* 1. Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {/* Real-time Visitors (GA Link) */}
         <a 
            href="https://analytics.google.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block transition-transform hover:scale-[1.02]"
         >
             <MetricsCard 
               label="Real-time Visitors" 
               value="View Live" 
               trend="up" 
               trendValue="GA" 
               icon={Users}
               colorClass="bg-blue-50 text-blue-600"
             />
         </a>

         {/* Viral Likelihood (Based on Top Article) */}
         <MetricsCard 
           label="Top Article Views" 
           value={topArticles[0]?.views?.toLocaleString() || "0"} 
           trend="up" 
           trendValue="Top" 
           icon={TrendingUp}
           colorClass="bg-green-50 text-green-600"
         />

         {/* Total Articles (Real) */}
         <MetricsCard 
           label="Total Articles" 
           value={overview.totalArticles.toLocaleString()} 
           trend="up" 
           trendValue="Live" 
           icon={FileText}
           colorClass="bg-purple-50 text-purple-600"
         />

         {/* Avg Read Time or Views (Real) */}
         <MetricsCard 
           label="Avg. Views" 
           value={overview.avgViews.toLocaleString()} 
           trend="up" 
           trendValue="Avg" 
           icon={Clock}
           colorClass="bg-orange-50 text-orange-600"
         />
      </div>

      {/* 2. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
         {/* Live Pulse (8 cols) */}
         <div className="lg:col-span-8 h-[400px]">
             <LivePulseGraph />
         </div>

         {/* AI Insights (4 cols) */}
         <div className="lg:col-span-4 h-[400px]">
             <AIInsights topArticles={topArticles} />
         </div>
      </div>

      {/* 3. Category Performance (Full Width) */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
          <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900">Category Performance</h3>
              <p className="text-sm text-gray-500">Articles and views by category</p>
          </div>
          <AnalyticsChart data={categoryStats} />
      </div>

      {/* 4. Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Recent Activity (8 cols) */}
          <div className="lg:col-span-8 h-[350px]">
              <RecentActivity activities={recentActivities} />
          </div>

          {/* Quick Note (4 cols) */}
          <div className="lg:col-span-4 h-[350px]">
              <QuickNote />
          </div>
      </div>
    </div>
  );
}
