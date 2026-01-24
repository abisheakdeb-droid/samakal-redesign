"use client";

import { useEffect, useState } from "react";
import { fetchSettings, updateSettings, SiteSettings } from "@/lib/actions-settings";
import { Save, Facebook, Youtube, Rss, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'social'>('social');

  // Load settings on mount
  useEffect(() => {
    async function load() {
      const data = await fetchSettings();
      setSettings(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    const res = await updateSettings(settings);
    if (res.success) {
      toast.success("Settings updated successfully!");
    } else {
      toast.error("Failed to update settings.");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-gray-400" size={24} />
      </div>
    );
  }

  if (!settings) return <div>Error loading settings</div>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings & Control Room</h1>
          <p className="text-gray-500">Manage site-wide configurations and widgets</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-brand-red text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-brand-red/90 transition disabled:opacity-50"
        >
          {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          Save Changes
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('social')}
            className={`flex-1 py-4 font-bold text-sm flex items-center justify-center gap-2 transition ${
              activeTab === 'social' ? 'bg-gray-50 text-brand-red border-b-2 border-brand-red' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Facebook size={18} />
            Social Media Widgets
          </button>
          <button
            onClick={() => setActiveTab('general')}
            className={`flex-1 py-4 font-bold text-sm flex items-center justify-center gap-2 transition ${
              activeTab === 'general' ? 'bg-gray-50 text-brand-red border-b-2 border-brand-red' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Rss size={18} />
            General & Ticker
          </button>
        </div>

        <div className="p-8">
          
          {/* SOCIAL MEDIA TAB */}
          {activeTab === 'social' && (
            <div className="space-y-8">
              
              {/* Facebook Live Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2 text-blue-600 font-bold text-lg">
                      <Facebook />
                      <h3>Facebook Live Integration</h3>
                   </div>
                   {/* Toggle Switch */}
                   <label className="flex items-center cursor-pointer gap-3">
                      <span className="text-sm font-medium text-gray-700">
                        {settings.facebook_is_live ? 'Widget Updated (LIVE)' : 'Widget Hidden'}
                      </span>
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          className="sr-only" 
                          checked={settings.facebook_is_live} 
                          onChange={(e) => setSettings({...settings, facebook_is_live: e.target.checked})}
                        />
                        <div className={`w-14 h-7 rounded-full transition-colors ${settings.facebook_is_live ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${settings.facebook_is_live ? 'translate-x-7' : 'translate-x-0'}`}></div>
                      </div>
                   </label>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Facebook Video ID or URL</label>
                  <input
                    type="text"
                    value={settings.facebook_live_url || ''}
                    onChange={(e) => setSettings({...settings, facebook_live_url: e.target.value})}
                    placeholder="e.g., 10153231379946729"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Enter the numeric Video ID from the Facebook URL. 
                    Example: for `facebook.com/watch/?v=123456`, enter `123456`.
                  </p>
                </div>
              </div>

              <hr />

              {/* YouTube Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-red-600 font-bold text-lg">
                   <Youtube />
                   <h3>YouTube Channel & Playlist</h3>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Featured Video / Playlist ID</label>
                  <input
                    type="text"
                    value={settings.youtube_playlist_id || ''}
                    onChange={(e) => setSettings({...settings, youtube_playlist_id: e.target.value})}
                    placeholder="e.g., PL12345678 or Video ID"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    This ID will be used to fetch the YouTube video list or play a specific video.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* GENERAL TAB */}
          {activeTab === 'general' && (
            <div className="space-y-6">
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-gray-800">Breaking News Ticker</h3>
                    
                    {/* Ticker Toggle */}
                    <label className="flex items-center cursor-pointer gap-3">
                      <span className="text-sm font-medium text-gray-700">
                        {settings.breaking_news_is_active ? 'Ticker Active' : 'Ticker Hidden'}
                      </span>
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          className="sr-only" 
                          checked={settings.breaking_news_is_active} 
                          onChange={(e) => setSettings({...settings, breaking_news_is_active: e.target.checked})}
                        />
                        <div className={`w-14 h-7 rounded-full transition-colors ${settings.breaking_news_is_active ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${settings.breaking_news_is_active ? 'translate-x-7' : 'translate-x-0'}`}></div>
                      </div>
                   </label>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Ticker Text</label>
                    <textarea
                      value={settings.breaking_news_ticker || ''}
                      onChange={(e) => setSettings({...settings, breaking_news_ticker: e.target.value})}
                      placeholder="Enter breaking news text..."
                      rows={3}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-brand-red outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Text to scroll at the top of the homepage.
                    </p>
                  </div>
               </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
