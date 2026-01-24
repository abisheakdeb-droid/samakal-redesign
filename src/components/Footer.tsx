"use client";

import Link from "next/link";
import { Facebook, Twitter, Youtube, Instagram, Linkedin, ArrowUp, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { clsx } from "clsx";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const footerLinks = [
    { title: "বিশেষ আয়োজন", url: "#" },
    { title: "ফিচার", url: "#" },
    { title: "কালের খেয়া", url: "#" },
    { title: "আর্কাইভ", url: "#" },
    { title: "ফেসবুক লাইভ", url: "#" },
    { title: "ছবি", url: "#" },
    { title: "ভিডিও", url: "#" },
    { title: "ই-পেপার", url: "#" },
  ];

  return (
    <footer className="font-serif bg-[#1a1a1a] text-white mt-auto">
      {/* Top Newsletter & Social Connect Bar */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 max-w-7xl py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <span className="w-1.5 h-12 bg-brand-red rounded-full"></span>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-1">যুক্ত থাকুন সমকালের সাথে</h3>
                        <p className="text-gray-400 text-sm">সব খবর, সবার আগে</p>
                    </div>
                </div>
                
                {/* Social Icons - Dynamic Hover */}
                <div className="flex gap-3">
                    {[
                      { Icon: Facebook, color: "hover:bg-[#3b5998]" },
                      { Icon: Twitter, color: "hover:bg-[#1da1f2]" },
                      { Icon: Linkedin, color: "hover:bg-[#0077b5]" },
                      { Icon: Youtube, color: "hover:bg-[#ff0000]" },
                      { Icon: Instagram, color: "hover:bg-[#e1306c]" },
                    ].map(({ Icon, color }, idx) => (
                      <Link key={idx} href="#" className={clsx(
                          "p-3 rounded-full bg-white/5 text-white transition-all duration-300 hover:-translate-y-1",
                          color
                      )}>
                        <Icon size={20} />
                      </Link>
                    ))}
                </div>
            </div>
        </div>
      </div>

      {/* Main Footer - Content Grid */}
      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            
            {/* Brand & Editor Info (Left - 5 Cols) */}
            <div className="md:col-span-5 space-y-8">
                <div>
                   <h2 className="text-5xl font-bold mb-6 text-white tracking-tight">সমকাল</h2>
                   <div className="space-y-3 text-gray-300 leading-relaxed md:pr-12 border-l-2 border-brand-red pl-6">
                      <p>সম্পাদক : <strong>শাহেদ মুহাম্মদ আলী</strong></p>
                      <p>প্রকাশক : <strong>আবুল কালাম আজাদ</strong></p>
                      <p>টাইমস মিডিয়া ভবন (৫ম তলা), ৩৮৭ তেজগাঁও শিল্প এলাকা, ঢাকা - ১২০৮</p>
                   </div>
                </div>
                
                <div className="flex flex-col gap-2 text-sm text-gray-400">
                   <p>ফোন : ৫৫০২৯৮৩২-৩৮</p>
                   <p>ই-মেইল: samakalad@gmail.com</p>
                </div>
            </div>

            {/* Quick Links (Middle - 4 Cols) */}
            <div className="md:col-span-4">
                <h4 className="text-lg font-bold text-brand-red mb-6 uppercase tracking-wider">গুরুত্বপূর্ণ লিংক</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                   {footerLinks.map((link, idx) => (
                      <Link key={idx} href={link.url} className="text-gray-300 hover:text-brand-red transition-all duration-300 hover:translate-x-2 flex items-center gap-2 group">
                         <span className="w-1 h-1 bg-gray-500 rounded-full group-hover:bg-brand-red transition-colors"></span>
                         {link.title}
                      </Link>
                   ))}
                </div>
            </div>

            {/* Legal & App (Right - 3 Cols) */}
            <div className="md:col-span-3">
                <h4 className="text-lg font-bold text-brand-red mb-6 uppercase tracking-wider">অন্যান্য</h4>
                <div className="flex flex-col gap-3">
                   <Link href="#" className="text-gray-300 hover:text-white transition">Privacy Policy</Link>
                   <Link href="#" className="text-gray-300 hover:text-white transition">Terms of Use</Link>
                   <Link href="#" className="text-gray-300 hover:text-white transition">Contact Us</Link>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10">
                    <p className="text-xs text-gray-500 text-center md:text-left">
                        © ২০০৫ - ২০২৬ সমকাল<br/>সর্বস্বত্ব ® সংরক্ষিত
                    </p>
                </div>
            </div>

        </div>
      </div>

      {/* Scroll to Top Button - Rounded Square (Squircle) */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-brand-red text-white backdrop-blur-md rounded-2xl shadow-2xl hover:bg-white hover:text-brand-red transition-all duration-500 transform hover:-translate-y-1 group"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} strokeWidth={3} className="group-hover:animate-bounce" />
        </button>
      )}
    </footer>
  );
}
