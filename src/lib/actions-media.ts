"use server";

import { list } from '@vercel/blob';

export async function getMediaLibrary() {
  try {
    const { blobs } = await list({ limit: 50 });
    return blobs.map(blob => ({
      id: blob.url, // Using URL as ID since Vercel Blob doesn't give UUIDs
      url: blob.url,
      name: blob.pathname,
      type: "IMAGE", 
      size: (blob.size / 1024 / 1024).toFixed(2) + " MB"
    }));
  } catch (error) {
    console.error("Failed to fetch media library:", error);
    return [];
  }
}
