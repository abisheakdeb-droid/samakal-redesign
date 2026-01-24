// Image upload utility using Vercel Blob
import { put } from '@vercel/blob';

export interface UploadResult {
  url: string;
  error?: string;
}

export async function uploadImage(file: File): Promise<UploadResult> {
  try {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      return {
        url: '',
        error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.'
      };
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return {
        url: '',
        error: 'File too large. Maximum size is 5MB.'
      };
    }

    // Upload to Vercel Blob
    const blob = await put(file.name, file, {
      access: 'public',
      addRandomSuffix: true,
    });

    return { url: blob.url };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      url: '',
      error: 'Upload failed. Please try again.'
    };
  }
}

export async function uploadMultipleImages(files: File[]): Promise<UploadResult[]> {
  return Promise.all(files.map(file => uploadImage(file)));
}

// Extract video thumbnail from YouTube or Facebook URL
export function getVideoThumbnail(url: string): string | null {
  try {
    // YouTube
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    if (youtubeMatch && youtubeMatch[1]) {
      return `https://img.youtube.com/vi/${youtubeMatch[1]}/maxresdefault.jpg`;
    }

    // Facebook - doesn't have direct thumbnail API, return null
    // Frontend will show placeholder or embed preview
    if (url.includes('facebook.com') || url.includes('fb.watch')) {
      return null;
    }

    return null;
  } catch (error) {
    console.error('Error extracting video thumbnail:', error);
    return null;
  }
}

// Validate video URL
export function isValidVideoUrl(url: string): boolean {
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)/;
  const facebookRegex = /(?:facebook\.com\/.*\/videos\/|fb\.watch\/)/;
  
  return youtubeRegex.test(url) || facebookRegex.test(url);
}
