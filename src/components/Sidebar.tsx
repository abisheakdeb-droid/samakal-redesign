"use client";

import { NewsItem } from "@/data/mockNews";
import MostReadWidget from '@/components/MostReadWidget';
import SocialVideoWidget from '@/components/SocialVideoWidget';
import AdSlot from '@/components/AdSlot';
import { NativeAdCompact } from '@/components/NativeAd';

interface SidebarProps {
  opinionNews: NewsItem[];
  mostReadNews: NewsItem[];
  hideLatestTab?: boolean;
  hideOpinion?: boolean;
}

export default function Sidebar({ opinionNews, mostReadNews, hideLatestTab = false, hideOpinion = false }: SidebarProps) {
  return (
    <aside className="sticky bottom-4 space-y-8">
      
      {/* 1. Sticky Rectangle Ad - High value position */}
      <div className="sticky top-20">
        <AdSlot slotId="sidebar-rectangle-sticky" format="rectangle" />
      </div>

      {/* 2. MOST READ WIDGET */}
      <MostReadWidget 
        opinionNews={opinionNews} 
        mostReadNews={mostReadNews}
        hideOpinion={hideOpinion}
      />

      {/* 3. Native Ad Compact - Blends with content */}
      <NativeAdCompact 
        title="সেরা ডিল এখন চলছে - দ্রুত কিনুন"
        image="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200"
        url="#"
        sponsor="ShopBD"
      />

      {/* 4. FACEBOOK LIVE & YOUTUBE */}
      <SocialVideoWidget />

    </aside>
  );
}
