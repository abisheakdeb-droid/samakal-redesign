"use client";

import Image from "next/image";
import Link from "next/link";
import { Share2, Check } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import { generateBlurPlaceholder, unsplashLoader } from "@/utils/image";

export default function HeroCard() {
  const [copied, setCopied] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation(); // Stop event bubbling
    
    // Simulate copy
    navigator.clipboard.writeText(window.location.origin + "/article/1");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Link href="/article/1" className="group cursor-pointer block">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl mb-4">
        <Image 
          src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=2532&auto=format&fit=crop" 
          alt="Hero Image"
          fill
          priority
          placeholder="blur"
          blurDataURL={generateBlurPlaceholder(16, 9)}
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-brand-red text-white px-3 py-1 rounded text-sm font-bold shadow-sm">
            জাতীয়
          </span>
        </div>
      </div>
      
      <div className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight group-hover:text-brand-red transition-colors">
          রাষ্ট্র সংস্কারে অন্তর্বর্তী সরকারের রোডম্যাপ ঘোষণা: ৬ কমিশনের রূপরেখা চূড়ান্ত
        </h1>
        <p className="text-gray-600 leading-relaxed line-clamp-3 md:line-clamp-none">
          দীর্ঘ প্রতীক্ষার পর অবশেষে রাষ্ট্র সংস্কারের পূর্ণাঙ্গ রূপরেখা ঘোষণা করেছে অন্তর্বর্তী সরকার। আজ বিকেলে এক সংবাদ সম্মেলনে প্রধান উপদেষ্টা এ ঘোষণা দেন। তিনি জানান, আগামী তিন মাসের মধ্যে সংবিধান, বিচার বিভাগ ও পুলিশ প্রশাসনে আমূল পরিবর্তন আনা হবে।
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="font-semibold text-gray-900">নিজস্ব প্রতিবেদক</span>
            <span>•</span>
            <span>২ ঘণ্টা আগে</span>
          </div>
          
          <div className="relative">
             <button 
                onClick={handleShare}
                className={clsx(
                    "p-2 rounded-full transition relative z-20",
                    copied ? "bg-green-100 text-green-600" : "text-gray-400 hover:text-gray-800 hover:bg-gray-100"
                )}
             >
                {copied ? <Check size={18} /> : <Share2 size={18} />}
             </button>
             
             {/* Tooltip */}
             <div className={clsx(
                 "absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow transition-opacity duration-300 pointer-events-none whitespace-nowrap",
                 copied ? "opacity-100" : "opacity-0"
             )}>
                 কপি হয়েছে!
             </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

