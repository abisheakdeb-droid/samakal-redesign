import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
         {/* Main 12-column grid layout matching page.tsx */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
             
             {/* 1. LEFT/CENTER: Hero (6 columns) */}
             <div className="lg:col-span-6 space-y-6">
                 <Skeleton className="aspect-video w-full rounded-xl" />
                 <div className="space-y-4">
                     <Skeleton className="h-10 w-3/4" />
                     <Skeleton className="h-4 w-full" />
                     <Skeleton className="h-4 w-full" />
                 </div>
                 
                 {/* Grid below Hero (3x3 grid matching page.tsx) */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                     {[1,2,3,4,5,6,7,8,9].map(i => (
                         <div key={i} className="space-y-3">
                             <Skeleton className="aspect-video w-full rounded-lg" />
                             <Skeleton className="h-4 w-full" />
                             <Skeleton className="h-3 w-1/2" />
                         </div>
                     ))}
                 </div>
             </div>

             {/* 2. RIGHT: Sidebar + SubHero (6 columns total) */}
             <div className="lg:col-span-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {/* SubHero column */}
                     <div className="space-y-8">
                         {[1,2].map(i => (
                             <div key={i} className="space-y-4">
                                 <Skeleton className="aspect-video w-full rounded-xl" />
                                 <Skeleton className="h-6 w-full" />
                                 <Skeleton className="h-3 w-1/3" />
                             </div>
                         ))}
                     </div>
                     
                     {/* Latest Sidebar column */}
                     <div className="space-y-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                         <Skeleton className="h-6 w-32 mb-4" />
                         {[1,2,3,4,5,6,7,8].map(i => (
                             <div key={i} className="flex gap-3 pb-4 border-b border-slate-100 last:border-0">
                                 <Skeleton className="h-4 w-6" />
                                 <div className="flex-1 space-y-2">
                                     <Skeleton className="h-4 w-full" />
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>
             </div>
         </div>
      </div>
    </div>
  );
}
