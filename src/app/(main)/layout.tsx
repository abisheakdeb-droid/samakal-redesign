import Footer from "@/components/Footer";
import FloatingVideoPlayer from "@/components/FloatingVideoPlayer";
import SkipToContent from "@/components/SkipToContent";
import { VideoPlayerProvider } from "@/contexts/VideoPlayerContext";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <VideoPlayerProvider>
        <SkipToContent />
        {children}
        <FloatingVideoPlayer />
        <Footer />
    </VideoPlayerProvider>
  );
}
