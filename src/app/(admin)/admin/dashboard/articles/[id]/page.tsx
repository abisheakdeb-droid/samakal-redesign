import { fetchArticleById } from "@/lib/actions-article";
import EditorWrapper from "@/components/dashboard/editor/EditorWrapper";
import { notFound } from "next/navigation";

export default async function EditArticlePage({ params }: { params: { id: string } }) {
    // Await params to avoid warning in future Next.js versions if needed, 
    // but in current stable version params is not a promise. 
    // However, fetchArticleById is async.
  const article = await fetchArticleById(params.id);

  if (!article) {
    notFound();
  }

  return (
    <div className="h-[calc(100vh-112px)]">
      <EditorWrapper initialData={article} />
    </div>
  );
}
