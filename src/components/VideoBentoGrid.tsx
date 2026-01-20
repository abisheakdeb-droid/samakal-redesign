"use client";

import Link from 'next/link';
import Image from 'next/image';
import { PlayCircle, Clock } from 'lucide-react';
import { clsx } from 'clsx';

// Mock Data for Bento Grid
const FEATURED_VIDEOS = [
  {
    id: 1,
    title: "টেকশহর: স্মার্ট বাংলাদেশের পথে অগ্রযাত্রা",
    thumb: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop",
    category: "প্রযুক্তি",
    duration: "১২:৪৫",
    size: "large" // col-span-2 row-span-2
  },
  {
    id: 2,
    title: "রাজনীতির মাঠ গরম: নির্বাচনের প্রস্তুতি",
    thumb: "https://images.unsplash.com/photo-1529101091760-61df528caa19?q=80&w=1000&auto=format&fit=crop",
    category: "রাজনীতি",
    duration: "০৮:৩০",
    size: "medium" // col-span-1 row-span-1
  },
  {
    id: 3,
    title: "বিশ্বকাপ ক্রিকেট: বাংলাদেশের নাটকীয় জয়",
    thumb: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1000&auto=format&fit=crop",
    category: "খেলা",
    duration: "০৪:১৫",
    size: "medium"
  },
  {
    id: 4,
    title: "বিনোদন জগৎ: নতুন ছবির মুক্তি",
    thumb: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop",
    category: "বিনোদন",
    duration: "০৬:৫০",
    size: "wide" // col-span-2 row-span-1
  }
];

export default function VideoBentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
      {FEATURED_VIDEOS.map((video) => (
        <Link 
          key={video.id} 
          href={`/video/${video.id}`}
          className={clsx(
            "relative group rounded-2xl overflow-hidden border border-white/5",
            video.size === 'large' && "md:col-span-2 md:row-span-2",
            video.size === 'medium' && "md:col-span-1 md:row-span-1",
            video.size === 'wide' && "md:col-span-2 md:row-span-1"
          )}
        >
          {/* Background Image */}
          <Image 
            src={video.thumb} 
            alt={video.title} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

          {/* Play Icon (Center) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100">
             <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-600/40">
                <PlayCircle size={32} className="text-white fill-white ml-1" />
             </div>
          </div>

          {/* Content (Bottom) */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
             <div className="flex items-center gap-2 mb-2">
                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    {video.category}
                </span>
                <span className="flex items-center gap-1 text-gray-300 text-xs font-medium">
                    <Clock size={12} /> {video.duration}
                </span>
             </div>
             <h3 className={clsx(
               "font-bold text-white leading-tight group-hover:text-red-400 transition-colors",
               video.size === 'large' ? "text-2xl md:text-3xl" : "text-lg"
             )}>
                {video.title}
             </h3>
          </div>

        </Link>
      ))}
    </div>
  );
}
