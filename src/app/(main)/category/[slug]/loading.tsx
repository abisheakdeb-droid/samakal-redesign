import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryLoading() {
  return (
    <div className="min-h-screen bg-slate-50">
       <div className="container mx-auto px-4 py-8">
           <Skeleton className="h-8 w-48 mb-8" />
           
           <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
               <div className="md:col-span-8 space-y-6">
                   {[1,2,3,4,5].map(i => (
                       <div key={i} className="flex gap-4">
                           <Skeleton className="w-1/3 aspect-video rounded-lg" />
                           <div className="w-2/3 space-y-3">
                               <Skeleton className="h-6 w-full" />
                               <Skeleton className="h-4 w-full" />
                               <Skeleton className="h-3 w-32" />
                           </div>
                       </div>
                   ))}
               </div>
               <div className="md:col-span-4">
                   <Skeleton className="h-96 w-full rounded-xl" />
               </div>
           </div>
       </div>
    </div>
  );
}
