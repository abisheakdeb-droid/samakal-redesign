"use client";

import Link from 'next/link';
import { NewsItem } from '@/data/mockNews';
import { Clock } from 'lucide-react';
import { clsx } from 'clsx';

interface LatestSidebarWidgetProps {
  news: NewsItem[];
}

// Bangla digit converter
const toBn = (num: number): string => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().split('').map(d => bnDigits[parseInt(d)]).join('');
};

// Mock relative time generator (since mock data doesn't have real timestamps)
// In a real app, this would use date-fns/moment to diff current time vs published time
const getRelativeTime = (index: number): string => {
  if (index === 0) return '১০ মিনিট আগে';
  if (index === 1) return '৩২ মিনিট আগে';
  if (index === 2) return '১ ঘণ্টা আগে';
  if (index === 3) return '২ ঘণ্টা আগে';
  if (index === 4) return '৩ ঘণ্টা আগে';
  return `${toBn(index + 1)} ঘণ্টা আগে`;
};

export default function LatestSidebarWidget({ news }: LatestSidebarWidgetProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-8">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 relative z-10 shadow-[0_2px_10px_-5px_rgba(0,0,0,0.1)]">
        <h3 className="text-center py-3 text-brand-red font-bold text-lg border-b-2 border-brand-red inline-block w-full">
            সর্বশেষ
        </h3>
      </div>

      {/* News List - Scrollable Container (Visible 5 Items approx) */}
      <div className="divide-y divide-gray-100 h-[480px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        {news.map((item, index) => (
          <Link 
            key={item.id} 
            href={`/article/${item.id}`}
            className="flex items-start gap-4 p-4 hover:bg-gray-50 transition group"
          >
            {/* Number */}
            <span className="text-3xl font-bold text-gray-200 group-hover:text-brand-red/20 transition font-english -mt-1 min-w-[30px] text-center">
              {toBn(index + 1)}
            </span>
            
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 leading-snug group-hover:text-brand-red transition mb-2">
                {item.title}
              </h4>
              <div className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                  <Clock size={12} />
                  <span>{getRelativeTime(index)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Read More Footer */}
      <div className="bg-gray-50 p-3 text-center border-t border-gray-100 relative z-10">
        <Link 
            href="/category/latest" 
            className="text-sm font-bold text-gray-600 hover:text-brand-red transition inline-flex items-center gap-1"
        >
            আরও পড়ুন →
        </Link>
      </div>
    </div>
  );
}
