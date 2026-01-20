import type { Metadata } from "next";
import { Tiro_Bangla } from "next/font/google";
import "./globals.css";

import Footer from "@/components/Footer";
import { VideoPlayerProvider } from "@/contexts/VideoPlayerContext";
import FloatingVideoPlayer from "@/components/FloatingVideoPlayer";
import SkipToContent from "@/components/SkipToContent";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";

const tiroBangla = Tiro_Bangla({
  weight: ["400"],
  subsets: ["bengali"],
  variable: "--font-tiro-bangla",
});

export const metadata: Metadata = {
  title: "সমকাল | অসংকোচ প্রকাশের দুরন্ত সাহস",
  description: "অসংকোচ প্রকাশের দুরন্ত সাহস - বাংলাদেশের অন্যতম সেরা নিউজ পোর্টাল",
  manifest: "/manifest.json",
  themeColor: "#f59e0b",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "সমকাল",
  },
};

import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning className="lenis">
      <body
        suppressHydrationWarning
        className={`${tiroBangla.variable} font-serif antialiased bg-background text-foreground`}
      >
        <SmoothScroll />
        <SkipToContent />
        <ServiceWorkerRegistration />
        <VideoPlayerProvider>
          {children}
          <FloatingVideoPlayer />
          <Footer />
        </VideoPlayerProvider>
      </body>
    </html>
  );
}
