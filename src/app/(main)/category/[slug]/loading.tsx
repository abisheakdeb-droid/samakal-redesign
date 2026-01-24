import Header from "@/components/Header";
import BreakingTicker from "@/components/BreakingTicker";
import Footer from "@/components/Footer";
import { SkeletonHero, SkeletonGrid } from "@/components/Skeletons";

export default function CategoryLoading() {
  return (
    <div className="min-h-screen bg-background text-foreground font-serif">
      <Header />
      <BreakingTicker />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Category Header Skeleton */}
        <div className="animate-pulse flex items-center gap-3 mb-8 border-b border-gray-200 pb-4">
          <div className="w-1.5 h-8 bg-gray-300 rounded-full"></div>
          <div className="h-8 bg-gray-200 rounded w-48"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-9">
            <div className="mb-12">
              <SkeletonHero />
            </div>
            <SkeletonGrid count={12} />
          </div>
          
          <div className="lg:col-span-3">
            <div className="animate-pulse space-y-6">
              <div className="h-96 bg-gray-200 rounded-xl"></div>
              <div className="h-64 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
