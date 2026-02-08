import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "lucide-react";

export default function ArchiveLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
        {/* Control Bar Skeleton */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
             <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                 <div className="flex items-center gap-3">
                     <div className="p-3 bg-gray-100 rounded-lg">
                         <Calendar size={24} className="text-gray-300" />
                     </div>
                     <div>
                         <Skeleton className="h-8 w-32 mb-2" />
                         <Skeleton className="h-4 w-24" />
                     </div>
                 </div>

                 <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-lg border border-gray-200">
                     <Skeleton className="w-8 h-8 rounded" />
                     <Skeleton className="w-40 h-8" />
                     <Skeleton className="w-8 h-8 rounded" />
                 </div>
             </div>
        </div>

        {/* Date Display Skeleton */}
        <div className="mb-8 text-center">
             <Skeleton className="h-6 w-64 mx-auto" />
        </div>
        
        {/* Articles Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                    <Skeleton className="aspect-video w-full" />
                    <div className="p-4">
                        <Skeleton className="h-6 w-full mb-2" />
                        <Skeleton className="h-6 w-4/5 mb-4" />
                        <div className="flex gap-2">
                            <Skeleton className="h-3 w-16" />
                            <Skeleton className="h-3 w-16" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}
