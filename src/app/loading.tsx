import Header from "@/components/Header";
import BreakingTicker from "@/components/BreakingTicker";
import Footer from "@/components/Footer";
import { SkeletonHero, SkeletonGrid } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-foreground font-serif">
      <Header />
      <BreakingTicker />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-9">
            <SkeletonHero />
            <div className="mt-12">
              <SkeletonGrid count={9} />
            </div>
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
