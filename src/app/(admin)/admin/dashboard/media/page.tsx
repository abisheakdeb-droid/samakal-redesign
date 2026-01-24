"use client";

import { useState } from "react";
import UploadZone from "@/components/dashboard/media/UploadZone";
import MediaGallery from "@/components/dashboard/media/MediaGallery";
import MediaSidebar from "@/components/dashboard/media/MediaSidebar";

export default function MediaLabPage() {
  const [selectedAsset, setSelectedAsset] = useState<any>(null);

  return (
    <div className="flex h-full min-h-[calc(100vh-100px)] gap-6">
      {/* Main Content */}
      <div className="flex-1 space-y-8 pb-8">
         <div className="flex justify-between items-center">
             <div>
                <h1 className="text-2xl font-bold text-gray-900 font-serif">Media Lab</h1>
                <p className="text-gray-500 text-sm">Manage, upload, and organize your assets.</p>
             </div>
         </div>

         <UploadZone />
         
         <MediaGallery 
            onSelect={setSelectedAsset} 
            selectedId={selectedAsset?.id} 
         />
      </div>

      {/* Sidebar - Conditionally Rendered */}
      {selectedAsset && (
        <div className="w-80 flex-shrink-0">
             {/* Spacing for layout, the sidebar itself is fixed/sticky in its own component but we reserve space */}
             <div className="w-80" /> 
             <MediaSidebar asset={selectedAsset} onClose={() => setSelectedAsset(null)} />
        </div>
      )}
    </div>
  );
}
