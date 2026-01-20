'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    console.error('Error boundary caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 font-serif">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-brand-red" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          কিছু ভুল হয়েছে
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          দুঃখিত, পৃষ্ঠাটি লোড করতে একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।
        </p>

        {/* Error Details (Dev Only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 bg-gray-100 rounded-lg text-left">
            <p className="text-xs text-gray-500 font-mono break-all">
              {error.message}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={reset}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-brand-red text-white font-bold rounded-full hover:bg-red-700 transition-all hover:shadow-lg"
          >
            <RefreshCw size={18} />
            পুনরায় চেষ্টা করুন
          </button>
          
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-800 font-bold rounded-full hover:bg-gray-200 transition-all"
          >
            <Home size={18} />
            হোম পেজে যান
          </Link>
        </div>

        {/* Footer Note */}
        <p className="mt-6 text-xs text-gray-400">
          সমস্যাটি অব্যাহত থাকলে, অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন।
        </p>
      </div>
    </div>
  );
}
