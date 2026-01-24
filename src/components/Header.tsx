"use client";

import { Search, Menu, User, Bell, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { generateBlurPlaceholder } from "@/utils/image";

type NavItem = {
  label: string;
  href: string;
  subItems?: { label: string; href: string }[];
  megaMenu?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: "সর্বশেষ", href: "/category/latest" },
  { label: "রাজনীতি", href: "/category/politics" },
  { label: "রাজধানী", href: "/category/capital" },
  { 
    label: "সারাদেশ", 
    href: "/category/bangladesh",
    subItems: [
       { label: "ঢাকা", href: "/category/dhaka" },
       { label: "চট্টগ্রাম", href: "/category/chattogram" },
       { label: "রাজশাহী", href: "/category/rajshahi" },
       { label: "খুলনা", href: "/category/khulna" },
       { label: "বরিশাল", href: "/category/barishal" },
       { label: "সিলেট", href: "/category/sylhet" },
       { label: "রংপুর", href: "/category/rangpur" },
       { label: "ময়মনসিংহ", href: "/category/mymensingh" },
    ]
  },
  { label: "অপরাধ", href: "/category/crime" },
  { label: "বিশ্ব", href: "/category/world" },
  { label: "বাণিজ্য", href: "/category/business" },
  { label: "খেলা", href: "/category/sports" },
  { label: "বিনোদন", href: "/category/entertainment" },
  { label: "ভিডিও", href: "/video" },
  { label: "ছবি", href: "/photo" },
  {
    label: "অন্যান্য",
    href: "#",
    megaMenu: true,
    subItems: [
        "চতুরঙ্গ", "নারী দিবস", "সাহিত্য ও সংস্কৃতি", "ছবি", "প্রবাস",
        "জীবন সংগ্রাম", "ভ্রমণ", "ফিচার", "শিক্ষা", "বিশেষ সমকাল",
        "শিল্প-বাণিজ্য", "সাক্ষাৎকার", "প্রযুক্তি", "প্রিয় চট্টগ্রাম",
        "কালের খেয়া", "শেয়ারবাজার", "সমকাল অনুসন্ধান", "অফবিট",
        "আর্কাইভ", "মতামত", "চাকরি", "শিল্পমঞ্চ", "বিশেষ আয়োজন"
    ].map(l => ({ label: l, href: `/category/${l.replace(/\s+/g, '-').toLowerCase()}` }))
  }
];

// ... imports
import { useState } from 'react';
import SearchOverlay from '@/components/SearchOverlay';
import MobileMenu from '@/components/MobileMenu';

export default function Header() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const date = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
    <header className="flex flex-col border-b border-white/60 bg-white/85 backdrop-blur-md sticky top-0 z-50 transition-all duration-300 shadow-sm/5">
      {/* Top Bar: Logo & Date */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="relative h-12 w-48 md:h-10 md:w-40">
          <Image
            src="/samakal-logo.png"
            alt="Samakal Logo"
            fill
            className="object-contain object-left"
            priority
            placeholder="blur"
            blurDataURL={generateBlurPlaceholder(12, 3)}
          />
        </Link>
        <div className="hidden md:flex gap-4 items-center text-sm text-gray-500">
          <span className="flex items-center gap-2">
             ঢাকা <span className="text-gray-300">|</span> {date}
          </span>
           <button className="bg-brand-red text-white px-4 py-1 rounded text-sm hover:opacity-90 transition">
            ই-পেপার
          </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-bg-subtle border-t border-gray-100 relative">
        <div className="container mx-auto px-4 flex justify-between items-center h-12">
          {/* Main Nav Links */}
          <nav className="hidden md:flex gap-1 text-gray-800 font-medium">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const hasSub = !!item.subItems;

              return (
                <div key={item.label} className="group relative">
                    <Link
                      href={item.href}
                      className={clsx(
                        "whitespace-nowrap transition-colors px-3 py-3 flex items-center gap-1 hover:text-brand-red",
                        isActive && "text-brand-red font-bold",
                        // Add border bottom only for active main links, but handle Hover separately
                      )}
                    >
                      {item.label}
                      {hasSub && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />}
                    </Link>
                    
                    {/* Active Indicator Line (Bottom) */}
                    {isActive && <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-red"></div>}

                    {/* Dropdown Menu */}
                    {hasSub && (
                        <div className={clsx(
                            "absolute top-full left-0 bg-white shadow-xl border-t-2 border-brand-red hidden group-hover:block z-50 rounded-b-lg border-x border-b border-gray-100 p-4 animate-in fade-in slide-in-from-top-2 duration-200",
                            item.megaMenu ? "w-[600px] right-0 left-auto md:left-auto" : "min-w-[200px]"
                        )}>
                            {/* Adjustment for mega menu to align properly if it goes off screen is tricky with pure CSS locally, 
                                but explicit width helps. For 'Onnanno' being last, 'right-0' is safer. */}
                                
                            <div className={clsx(
                                "grid gap-x-6 gap-y-2",
                                item.megaMenu ? "grid-cols-3" : "grid-cols-1"
                            )}>
                                {item.subItems?.map((sub) => (
                                    <Link 
                                        key={sub.label} 
                                        href={sub.href}
                                        className="text-sm text-gray-600 hover:text-brand-red hover:bg-gray-50 px-2 py-1.5 rounded transition block"
                                    >
                                        {sub.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
              );
            })}
          </nav>

          {/* Mobile Menu Icon */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 hover:text-brand-red transition"
            aria-label="Open mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu size={24} />
          </button>

          {/* Utility Icons */}
          <div className="flex items-center gap-4 text-gray-600">
            <button 
                onClick={() => setIsSearchOpen(true)} 
                className="hover:text-brand-red transition-colors"
                aria-label="Search"
            >
                <Search size={20} />
            </button>
            <button className="hover:text-brand-red" aria-label="Notifications">
              <Bell size={20} />
            </button>
            <Link href="/admin/login" target="_blank" className="hover:text-brand-red" aria-label="User account">
              <User size={20} />
            </Link>
          </div>
        </div>
      </div>
    </header>
    
    {/* Full Screen Search Overlay */}
    <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    
    {/* Mobile Menu Drawer */}
    <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
