import Link from "next/link";
import { NewsItem } from "@/data/mockNews"; // Import type

const bengaliNumerals = ["১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯", "১০"];

interface NumberedListProps {
  news?: NewsItem[];
}

export default function NumberedList({ news = [] }: NumberedListProps) {
  // Use passed news or empty array
  const displayNews = news.slice(0, 10); // Limit to 10

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-2 h-2 rounded-full bg-brand-red"></span>
        <h2 className="text-xl font-bold text-gray-800">সর্বশেষ</h2>
      </div>
      
      <div className="flex flex-col gap-0 divide-y divide-gray-100">
        {displayNews.length > 0 ? (
          displayNews.map((article, index) => (
            <Link key={article.id} href={`/article/${article.id}`} className="group flex gap-4 py-4 items-start hover:bg-gray-50 transition-colors rounded-lg px-2 -mx-2">
              <span className="text-3xl font-bold text-gray-300 group-hover:text-brand-red transition-colors font-serif leading-none mt-1">
                {bengaliNumerals[index] || index + 1}
              </span>
              <div>
                <h3 className="text-lg font-medium text-gray-800 group-hover:text-brand-red leading-snug line-clamp-2">
                  {article.title}
                </h3>
                <span className="text-xs text-gray-400 mt-1 block">{article.time}</span>
              </div>
            </Link>
          ))
        ) : (
           <div className="py-8 text-center text-gray-400 text-sm">
             কোনো খবর পাওয়া যায়নি
           </div>
        )}
      </div>
      
      <Link href="/category/latest" className="w-full py-2 bg-gray-100 text-gray-600 font-bold rounded hover:bg-gray-200 transition text-sm block text-center">
        সব খবর পড়ুন
      </Link>
    </div>
  );
}
