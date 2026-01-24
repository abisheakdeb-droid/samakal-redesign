import { Plus } from "lucide-react";
import ArticleTable from "@/components/dashboard/newsroom/ArticleTable";
import Link from "next/link";

import { fetchArticles } from "@/lib/actions-article";

export default async function ArticlesPage() {
  const articles = await fetchArticles();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
         <div>
            <h1 className="text-2xl font-bold text-gray-900 font-serif">Newsroom</h1>
            <p className="text-gray-500 text-sm">Manage, edit, and publish stories.</p>
         </div>
         <Link href="/admin/dashboard/articles/new" className="bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-lg transition-transform active:scale-95 text-sm">
            <Plus size={18} /> Create New
         </Link>
      </div>

      <ArticleTable articles={articles} />
    </div>
  );
}
