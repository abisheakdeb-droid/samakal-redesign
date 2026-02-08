import { Skeleton } from "@/components/ui/skeleton";

export default function SearchLoading() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-8">
            
            {/* Left Sidebar Skeleton */}
            <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
                <div>
                     <Skeleton className="h-6 w-24 mb-6" />
                     
                     <div className="mb-6 space-y-3">
                         <Skeleton className="h-4 w-16 mb-2" />
                         {[1,2,3,4].map(i => (
                             <Skeleton key={i} className="h-4 w-full" />
                         ))}
                     </div>

                     <div className="space-y-3">
                         <Skeleton className="h-4 w-16 mb-2" />
                         {[1,2,3,4,5,6].map(i => (
                             <Skeleton key={i} className="h-4 w-full" />
                         ))}
                     </div>
                </div>
            </aside>

            {/* Main Content Skeleton */}
            <main className="flex-1">
                <div className="mb-6 pb-4 border-b border-gray-100">
                    <Skeleton className="h-8 w-64 mb-2" />
                    <Skeleton className="h-4 w-32" />
                </div>

                <div className="space-y-8">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex flex-col md:flex-row gap-4 md:gap-6">
                            <Skeleton className="w-full md:w-56 aspect-[4/3] rounded-lg" />
                            <div className="flex-1 space-y-3 py-2">
                                <div className="flex gap-2">
                                    <Skeleton className="h-3 w-20" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    </div>
  );
}
