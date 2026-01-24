"use client";

import { useState, useEffect, useMemo, useRef } from 'react';
import { X, Search, Calendar, User, FileText, ChevronRight } from 'lucide-react';
import { SearchResult, SEARCH_INDEX } from '@/data/searchIndex';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

import { useRouter } from 'next/navigation';

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'title' | 'author' | 'date'>('all');
  const [isAnimating, setIsAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Handle open/close animations
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setTimeout(() => inputRef.current?.focus(), 100); 
    } else {
      setTimeout(() => setIsAnimating(false), 300); 
    }
  }, [isOpen]);

  const handleSearch = () => {
      if (!query.trim()) return;
      onClose();
      router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
          handleSearch();
      }
  };


  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Reset query on close
  useEffect(() => {
    if (!isOpen) {
        // Optional: keep query or clear it. Clearing for fresh start.
        setTimeout(() => setQuery(''), 300);
    }
  }, [isOpen]);

  // --- SEARCH LOGIC ---
  const results = useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();

    return SEARCH_INDEX.filter(item => {
      // 1. General Search
      if (activeTab === 'all') {
        return (
             item.title.toLowerCase().includes(lowerQuery) ||
             item.author.toLowerCase().includes(lowerQuery) ||
             item.category.toLowerCase().includes(lowerQuery) ||
             item.date.includes(query) // Case sensitive usually fine for Bengali dates
        );
      }
      
      // 2. Specific Filters
      if (activeTab === 'title') return item.title.toLowerCase().includes(lowerQuery);
      if (activeTab === 'author') return item.author.toLowerCase().includes(lowerQuery);
      if (activeTab === 'date') return item.date.includes(query); // Simple string match for date

      return false;
    }).slice(0, 15); // Limit to 15 results for performance
  }, [query, activeTab]);


  // Determine Animation Classes
  // We use `isOpen` to trigger the class change, but coordinate it with render.
  // Actually, simpler to just use isOpen directly since Next.js/React handles it fast.
  if (!isOpen && !isAnimating) return null;

  return (
    <div 
        className={clsx(
            "fixed inset-0 z-[100] transition-all duration-300 ease-in-out",
            isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
    >
      {/* Backdrop (Glassmorphism) */}
      <div 
        className="absolute inset-0 bg-white/90 backdrop-blur-xl dark:bg-black/90"
        onClick={onClose}
      />

      <div className="relative z-10 w-full h-full flex flex-col max-w-5xl mx-auto px-4 md:px-8 pt-6 md:pt-12">
        
        {/* Header: Close Button */}
        <div className="flex justify-end mb-8">
            <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
            >
                <X size={32} className="text-gray-500 group-hover:text-red-500 transition-colors" />
            </button>
        </div>

        {/* Search Input Container */}
        <div 
            className={clsx(
                "transition-all duration-500 delay-100 ease-out transform",
                isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}
        >
            <div className="relative group">
                <Search 
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-red transition-colors" 
                    size={40} 
                    strokeWidth={1.5}
                />
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="কী খুঁজতে চান? (লিখে Enter চাপুন...)"
                    className="w-full bg-transparent border-b-2 border-gray-200 dark:border-gray-700 py-6 pl-14 text-3xl md:text-5xl font-light text-gray-900 dark:text-white placeholder:text-gray-300 focus:outline-none focus:border-brand-red transition-all"
                />
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-4 mt-6">
                 <FilterTab label="সব ফলাফল" icon={Search} active={activeTab === 'all'} onClick={() => setActiveTab('all')} />
                 <FilterTab label="শিরোনাম" icon={FileText} active={activeTab === 'title'} onClick={() => setActiveTab('title')} />
                 <FilterTab label="লেখক" icon={User} active={activeTab === 'author'} onClick={() => setActiveTab('author')} />
                 <FilterTab label="তারিখ" icon={Calendar} active={activeTab === 'date'} onClick={() => setActiveTab('date')} />
            </div>
        </div>

        {/* Results Grid */}
        <div className="flex-1 overflow-y-auto mt-12 pb-20 scrollbar-hide">
            {query && results.length === 0 ? (
                 <div className="text-center py-20 animate-fade-in-up">
                    <p className="text-2xl text-gray-400">কোনো ফলাফল পাওয়া যায়নি</p>
                    <p className="text-gray-500 mt-2">অন্য কোনো কীওয়ার্ড দিয়ে চেষ্টা করুন</p>
                 </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.map((item, idx) => (
                        <Link 
                            href={`/article/${item.id}`} 
                            key={item.id}
                            onClick={onClose}
                            className={clsx(
                                "group bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-brand-red/30 hover:shadow-lg transition-all duration-300 animate-fade-in-up",
                                // Progressive delay (staggered animation) via style is simpler than complex class logic
                            )}
                            style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'both' }}
                        >
                            <div className="flex gap-4 items-start">
                                <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                                    <Image 
                                        src={item.image} 
                                        alt={item.title} 
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="flex-1">
                                    <span className="text-xs font-bold text-brand-red mb-1 block">
                                        {item.category}
                                    </span>
                                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 leading-snug group-hover:text-brand-red transition-colors line-clamp-2">
                                        {item.title}
                                    </h3>
                                    <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <User size={10} /> {item.author}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar size={10} /> {item.date}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>

      </div>
    </div>
  );
}

// Sub-component for Filter Tabs
function FilterTab({ label, icon: Icon, active, onClick }: { label: string, icon: any, active: boolean, onClick: () => void }) {
    return (
        <button 
            onClick={onClick}
            className={clsx(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                active 
                    ? "bg-brand-red text-white border-brand-red shadow-lg shadow-brand-red/20" 
                    : "bg-transparent text-gray-500 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            )}
        >
            <Icon size={14} />
            {label}
        </button>
    )
}
