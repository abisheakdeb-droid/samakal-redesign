import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search, Home, FileQuestion } from 'lucide-react';

export default function NotFound() {
  const popularCategories = [
    { label: 'সর্বশেষ', href: '/category/latest' },
    { label: 'রাজনীতি', href: '/category/politics' },
    { label: 'বিশ্ব', href: '/category/world' },
    { label: 'খেলা', href: '/category/sports' },
    { label: 'বিনোদন', href: '/category/entertainment' },
    { label: 'ভিডিও', href: '/video' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-serif flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full text-center">
          {/* 404 Illustration */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="text-[150px] font-bold text-gray-200 leading-none">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FileQuestion className="w-20 h-20 text-brand-red" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            পৃষ্ঠা পাওয়া যায়নি
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা আমরা খুঁজে পাইনি। 
            লিঙ্কটি ভুল হতে পারে বা পৃষ্ঠাটি সরানো হয়েছে।
          </p>

          {/* Search Box */}
          <div className="mb-12 max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="সংবাদ খুঁজুন..."
                className="w-full px-6 py-4 pr-12 rounded-full border-2 border-gray-200 focus:border-brand-red focus:outline-none transition-colors text-base"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-brand-red text-white rounded-full hover:bg-red-700 transition">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Popular Categories */}
          <div className="mb-8">
            <p className="text-sm text-gray-500 mb-4 font-medium">জনপ্রিয় বিভাগ:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {popularCategories.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-brand-red hover:text-white transition-all font-medium"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Home Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-red text-white font-bold rounded-full hover:bg-red-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <Home size={20} />
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
