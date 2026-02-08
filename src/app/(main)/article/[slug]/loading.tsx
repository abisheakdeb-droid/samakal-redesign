import { Skeleton } from "@/components/ui/skeleton";

export default function ArticleLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-9 space-y-8">
                 {/* Headline */}
                 <div className="space-y-4">
                     <Skeleton className="h-8 w-1/4" />
                     <Skeleton className="h-12 w-full" />
                     <Skeleton className="h-12 w-3/4" />
                 </div>
                 {/* Image */}
                 <Skeleton className="aspect-video w-full rounded-xl" />
                 {/* Content */}
                 <div className="space-y-4">
                     <Skeleton className="h-4 w-full" />
                     <Skeleton className="h-4 w-full" />
                     <Skeleton className="h-4 w-full" />
                     <Skeleton className="h-4 w-3/4" />
                     <Skeleton className="h-4 w-full" />
                 </div>
            </div>
            <div className="lg:col-span-3">
                 <Skeleton className="h-64 w-full rounded-xl" />
            </div>
        </div>
      </div>
    </div>
  );
}
