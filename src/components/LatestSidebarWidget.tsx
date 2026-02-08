"use client";

import Link from 'next/link';
import { NewsItem } from "@/types/news";
import { clsx } from 'clsx';

interface LatestSidebarWidgetProps {
  news: NewsItem[];
}

// Bangla digit converter
import { toBanglaDigits } from "@/utils/bn";

// Mock relative time generator (since mock data doesn't have real timestamps)
// In a real app, this would use date-fns/moment to diff current time vs published time
const getRelativeTime = (index: number): string => {
  if (index === 0) return '১০ মিনিট আগে';
  if (index === 1) return '৩২ মিনিট আগে';
  if (index === 2) return '১ ঘণ্টা আগে';
  if (index === 3) return '২ ঘণ্টা আগে';
  if (index === 4) return '৩ ঘণ্টা আগে';
  return `${toBanglaDigits(index + 1)} ঘণ্টা আগে`;
};

export default function LatestSidebarWidget({ news }: LatestSidebarWidgetProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 border-b-2 border-brand-gold pb-2">
        <span className="w-2 h-2 rounded-full bg-brand-red"></span>
        <h2 className="text-xl font-bold text-gray-800">সর্বশেষ</h2>
      </div>

      {/* News List Container with Scroll */}
      <div className="h-[480px] overflow-y-auto pr-2 custom-scrollbar">
        <div className="flex flex-col gap-0 divide-y divide-gray-100">
        {news.map((item, index) => (
          <Link 
            key={item.id} 
            href={`/article/${item.id}`}
            className="group flex gap-3 py-4 items-start hover:bg-gray-50 transition-colors rounded-lg px-2 -mx-2"
          >
            {/* Number */}
            <span className="text-3xl font-bold text-gray-300 group-hover:text-brand-red transition-colors font-serif leading-none mt-1">
              {toBanglaDigits(index + 1)}
            </span>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800 group-hover:text-brand-red leading-snug">
                {item.title}
              </h3>
              <span className="text-xs text-gray-400 mt-1 block">
                  {getRelativeTime(index)}
              </span>
            </div>
          </Link>
        ))}
        </div>
      </div>

      {/* Footer Button */}
      <Link 
        href="/category/latest" 
        className="w-full py-2 bg-gray-100 text-gray-600 font-bold rounded hover:bg-gray-200 transition text-sm block text-center"
      >
        সব খবর পড়ুন
      </Link>
    </div>
  );
}
