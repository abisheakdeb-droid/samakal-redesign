import { fetchArticlesByDate } from "@/lib/actions-article";
import ArchiveClient from "@/components/ArchiveClient";
import { Suspense } from "react";

export const metadata = {
  title: 'Archive | Samakal',
  description: 'Browse past news articles by date.',
};

export default async function ArchivePage({ searchParams }: { searchParams: Promise<{ date?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const date = resolvedSearchParams.date || new Date().toISOString().split('T')[0];
  
  const articles = await fetchArticlesByDate(date);

  return (
    <main className="min-h-screen bg-background text-foreground font-serif">
      <div className="pt-8">
          <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
             <ArchiveClient initialDate={date} articles={articles} />
          </Suspense>
      </div>
    </main>
  );
}
