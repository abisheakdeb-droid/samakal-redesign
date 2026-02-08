"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CATEGORY_MAP } from "@/config/categories";

interface SubCategoryNavProps {
  subCategories: string[];
}

export default function SubCategoryNav({ subCategories }: SubCategoryNavProps) {
  const pathname = usePathname();

  if (!subCategories || subCategories.length === 0) return null;

  return (
    <div className="w-full border-b border-gray-100 mb-8 bg-white/80 backdrop-blur-sm sticky top-28 md:top-30 z-40 transition-all">
      <div className="container mx-auto px-4 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-3 py-4 min-w-max">
          {subCategories.map((slug) => {
            const isActive = pathname === `/category/${slug}`;
            const label = CATEGORY_MAP[slug] || slug;
            
            return (
              <Link
                key={slug}
                href={`/category/${slug}`}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap",
                  isActive
                    ? "bg-brand-red text-white shadow-sm"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-100"
                )}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
