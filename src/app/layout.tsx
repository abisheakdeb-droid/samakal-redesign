import type { Metadata, Viewport } from "next";
import { Tiro_Bangla } from "next/font/google";
import "./globals.css";

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
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "সমকাল",
  },
};

export const viewport: Viewport = {
  themeColor: "#f59e0b",
};


import { GoogleAnalytics } from "@next/third-parties/google";
import TrafficTracker from "@/components/TrafficTracker";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${tiroBangla.variable} font-serif antialiased bg-background text-foreground`}
      >

        <ServiceWorkerRegistration />
        <TrafficTracker />
        {children}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ""} />
      </body>
    </html>
  );
}
