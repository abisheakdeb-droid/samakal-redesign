"use client";

import { useState } from 'react';
import Image from 'next/image';
import { authenticate } from '@/lib/actions';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    try {
        const result = await authenticate(undefined, formData);
        if (result) {
             setError(result);
        } else {
             // Successful login automatically redirects, 
             // but we can force client nav if needed
             router.push('/admin/dashboard');
        }
    } catch (err) {
        setError('Something went wrong. Please try again.');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      
      {/* Left: Branding & Visuals */}
      <div className="hidden lg:relative lg:flex flex-col justify-between p-12 bg-black text-white overflow-hidden relative">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 opacity-40">
           <Image
             src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop"
             alt="Newsroom Background"
             fill
             className="object-cover"
             priority
           />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-0" />

        <div className="relative z-10">
          <h1 className="text-4xl font-serif font-bold mb-2">সমকাল</h1>
          <p className="text-gray-300 text-sm tracking-wider uppercase">Samakal Studio AI</p>
        </div>

        <div className="relative z-10 space-y-6 max-w-lg">
          <blockquote className="text-2xl font-serif leading-relaxed text-gray-100">
            "Journalism can never be silent: that is its greatest virtue and its greatest fault."
          </blockquote>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center font-bold">AI</div>
             <div>
                <p className="font-bold text-sm">Powered by Cortex 2.0</p>
                <p className="text-xs text-gray-400">Next-Gen Editorial Intelligence</p>
             </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-gray-500">
          &copy; 2026 Samakal. Internal System.
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-8">
           <div className="text-center lg:text-left">
              <div className="inline-block p-3 rounded-2xl bg-amber-100/50 text-amber-600 mb-6 lg:hidden">
                 <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                 </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome Back</h2>
              <p className="mt-2 text-gray-500">Enter your credentials to access the newsroom.</p>
           </div>

           <form onSubmit={handleLogin} className="space-y-6 mt-8">
              <div className="space-y-4">
                 <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      id="email" 
                      name="email" 
                      type="email" 
                      autoComplete="email" 
                      required 
                      defaultValue="admin@samakal.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition bg-white text-gray-900 placeholder-gray-400 outline-none"
                      placeholder="name@samakal.com"
                    />
                 </div>
                 <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input 
                      id="password" 
                      name="password" 
                      type="password" 
                      autoComplete="current-password" 
                      required 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition bg-white text-gray-900 placeholder-gray-400 outline-none"
                      placeholder="••••••••"
                    />
                 </div>
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium flex items-center gap-2">
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                   {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-brand-golden hover:bg-yellow-600 text-white font-bold rounded-xl shadow-lg shadow-amber-200/50 transition transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Authenticating...
                  </>
                ) : (
                  'Sign In →'
                )}
              </button>

              <div className="text-center">
                 <a href="#" className="text-sm font-medium text-gray-500 hover:text-amber-600 transition">Forgot password?</a>
              </div>
           </form>

           <div className="mt-8 pt-6 border-t border-gray-100">
               <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <p className="text-xs text-blue-800 font-medium text-center">
                     <strong>Demo Access:</strong> admin@samakal.com / user@samakal.com
                  </p>
               </div>
           </div>
        </div>
      </div>
    </div>
  );
}
