"use server";

import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface SiteSettings {
  id: number;
  facebook_live_url?: string;
  facebook_is_live: boolean;
  youtube_playlist_id?: string;
  youtube_api_key?: string;
  breaking_news_ticker?: string;
  breaking_news_is_active: boolean; // New field
  updated_at: Date;
}

export async function fetchSettings(): Promise<SiteSettings> {
  try {
    const data = await sql`
      SELECT * FROM site_settings WHERE id = 1
    `;
    
    if (data.rows.length === 0) {
      // Should have been seeded, but just in case
      return {
        id: 1,
        facebook_is_live: false,
        breaking_news_ticker: 'সমকাল - অসংকোচ প্রকাশের দুরন্ত সাহস',
        breaking_news_is_active: true,
        updated_at: new Date()
      };
    }

    return data.rows[0] as SiteSettings;
  } catch (error) {
    console.error('Failed to fetch settings:', error);
    return {
        id: 1,
        facebook_is_live: false,
        breaking_news_ticker: 'Default Ticker',
        breaking_news_is_active: true,
        updated_at: new Date()
    };
  }
}

export async function updateSettings(settings: Partial<SiteSettings>) {
  try {
    await sql`
      UPDATE site_settings
      SET 
        facebook_live_url = ${settings.facebook_live_url || null},
        facebook_is_live = ${settings.facebook_is_live},
        youtube_playlist_id = ${settings.youtube_playlist_id || null},
        youtube_api_key = ${settings.youtube_api_key || null},
        breaking_news_ticker = ${settings.breaking_news_ticker || null},
        breaking_news_is_active = ${settings.breaking_news_is_active},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
    `;

    revalidatePath('/'); // Revalidate homepage so widgets update
    revalidatePath('/admin/dashboard/settings');
    
    return { success: true };
  } catch (error) {
    console.error('Failed to update settings:', error);
    return { success: false, error: 'Failed to update settings' };
  }
}
