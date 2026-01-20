"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NewsItem } from '@/data/mockNews';

interface MostReadWidgetProps {
  opinionNews: NewsItem[];
  mostReadNews: NewsItem[];
  hideOpinion?: boolean; // New prop
}

// Bangla number converter
const toBn = (num: number): string => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().split('').map(d => bnDigits[parseInt(d)]).join('');
};

export default function MostReadWidget({ opinionNews, mostReadNews, hideOpinion = false }: MostReadWidgetProps) {
  // If hideOpinion is true, default to mostRead tab
  const [activeTab, setActiveTab] = useState<'opinion' | 'mostRead'>(hideOpinion ? 'mostRead' : 'opinion');

  const newsToShow = activeTab === 'opinion' ? opinionNews : mostReadNews;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-8">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {!hideOpinion && (
          <button
            onClick={() => setActiveTab('opinion')}
            className={`flex-1 px-4 py-3 font-bold text-sm transition ${
              activeTab === 'opinion'
                ? 'bg-brand-red text-white'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            মতামত
          </button>
        )}
        <button
          onClick={() => setActiveTab('mostRead')}
          className={`flex-1 px-4 py-3 font-bold text-sm transition ${
            activeTab === 'mostRead'
              ? 'bg-brand-red text-white'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          সর্বাধিক পঠিত
        </button>
      </div>

      {/* List */}
      <div className="flex flex-col">
        {newsToShow.slice(0, 5).map((news, index) => (
          <Link 
            key={news.id} 
            href={`/article/${news.id}`} 
            className="group flex gap-4 p-4 border-b border-gray-50 last:border-none hover:bg-gray-50 transition"
          >
            {/* Number Counter or Author Image */}
            {activeTab === 'opinion' ? (
               <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative flex-shrink-0 border border-gray-100 mt-1">
                   {/* Mock Author Image based on index */}
                   <Image 
                      src={`https://randomuser.me/api/portraits/men/${index + 40}.jpg`} 
                      alt="Author" 
                      fill 
                      className="object-cover" 
                   />
               </div>
            ) : (
                <span className="text-3xl font-bold text-gray-200 group-hover:text-brand-red/20 transition-colors -mt-1 w-8 flex-shrink-0 text-center">
                  {toBn(index + 1)}
                </span>
            )}
            
            <div className="flex-1">
               <h4 className="text-sm font-bold text-gray-800 leading-snug group-hover:text-brand-red line-clamp-2">
                 {news.title}
               </h4>
               {activeTab === 'opinion' && (
                   <p className="text-xs text-gray-500 mt-1">{news.author}</p>
               )}
            </div>
          </Link>
        ))}

      </div>
      
      {/* Footer Link */}
      <Link 
        href={activeTab === 'opinion' ? '/category/opinion' : '/category/latest'} 
        className="block bg-gray-50 p-3 text-center text-xs font-bold text-brand-red hover:bg-gray-100 transition border-t border-gray-100"
      >
        {activeTab === 'opinion' ? 'সব মতামত পড়ুন' : 'সব খবর পড়ুন'}
      </Link>
    </div>
  );
}
