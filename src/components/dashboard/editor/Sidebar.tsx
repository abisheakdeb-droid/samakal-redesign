"use client";

import { useState, Dispatch, SetStateAction } from 'react';
import {
  Settings, Image as ImageIcon, MapPin, Tag,
  Users, Link as LinkIcon, Search, Globe, ChevronRight,
  Clock, Calendar, Save, Upload, FileText
} from 'lucide-react';
import NewsTypeSelector from './NewsTypeSelector';
import LocationSelector from './LocationSelector';
import TagInput from './TagInput';
import ImageUploader from './ImageUploader';
import VideoEmbedder from './VideoEmbedder';
import ContributorSelector from './ContributorSelector';
import SourceInput from './SourceInput';
import SEOPanel from './SEOPanel';
import { NewsType } from './types';
import AdSlot from '@/components/AdSlot';

interface SidebarProps {
  onPublish: (metadata: any) => void;
  isPublishing: boolean;

  // State Props
  category: string;
  setCategory: (val: string) => void;
  newsType: NewsType;
  setNewsType: (val: NewsType) => void;
  location: string;
  setLocation: (val: string) => void;
  tags: string[];
  setTags: (val: string[]) => void;
  keywords: string[];
  setKeywords: (val: string[]) => void;

  // Media
  images: any[];
  setImages: Dispatch<SetStateAction<any[]>>;
  videoUrl: string;
  setVideoUrl: (val: string) => void;

  // Attribution
  contributors: any[];
  setContributors: (val: any[]) => void;
  source: string;
  setSource: (val: string) => void;
  sourceUrl: string;
  setSourceUrl: (val: string) => void;

  // SEO
  seoTitle: string;
  setSeoTitle: (val: string) => void;
  seoDescription: string;
  setSeoDescription: (val: string) => void;
  canonicalUrl: string;
  canonicalUrl: string;
  setCanonicalUrl: (val: string) => void;
  onGenerateSEO?: () => void;
}

type Tab = 'publishing' | 'media' | 'details' | 'seo';

export default function Sidebar({ 
    onPublish, 
    isPublishing, 
    category, 
    setCategory,
    newsType,
    setNewsType,
    location,
    setLocation,
    tags,
    setTags,
    keywords,
    setKeywords,
    images,
    setImages,
    videoUrl,
    setVideoUrl,
    contributors,
    setContributors,
    source,
    setSource,
    sourceUrl,
    setSourceUrl,
    seoTitle,
    setSeoTitle,
    seoDescription,
    setSeoDescription,
    canonicalUrl,
    canonicalUrl,
    setCanonicalUrl,
    onGenerateSEO
}: SidebarProps) {
  const [activeTab, setActiveTab] = useState<Tab>('publishing');
  
  const tabs: { id: Tab; label: string; icon: any }[] = [
      { id: 'publishing', label: 'Publication', icon: Calendar },
      { id: 'media', label: 'Media Assets', icon: Upload },
      { id: 'details', label: 'Details & Tags', icon: FileText },
      { id: 'seo', label: 'SEO Config', icon: Search }
  ];

  return (
    <div className="w-full bg-slate-50 border-b border-gray-200 shadow-sm relative z-10 hidden md:block">
      <div className="max-w-screen-2xl mx-auto">
          {/* Header & Tabs */}
          <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 bg-white/50 backdrop-blur-xl sticky top-0">
              <div className="inline-flex p-1 bg-gray-100/80 rounded-xl gap-1 border border-gray-200/50">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                      activeTab === tab.id 
                        ? 'bg-white text-black shadow-sm ring-1 ring-black/5 scale-[1.02]' 
                        : 'text-gray-500 hover:text-gray-900 hover:bg-black/5'
                    }`}
                  >
                    <tab.icon size={14} className={activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'} />
                    {tab.label}
                  </button>
                ))}
              </div>
              
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wider hidden sm:block">
                  Control Center
              </div>
          </div>

          {/* Content Area */}
          <div className="p-6 md:p-8 min-h-[300px] bg-white">
            <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-top-1 duration-300">
                
                {/* TAB 1: PUBLISHING */}
                {activeTab === 'publishing' && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        <div className="md:col-span-4 space-y-6">
                             <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <FileText size={14} /> News Type
                                </h3>
                                <NewsTypeSelector value={newsType} onChange={setNewsType} />
                             </div>
                        </div>

                        <div className="md:col-span-4 space-y-6">
                            <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Category</h3>
                                <select 
                                    value={category} 
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                                >
                                    <option value="">Select Category...</option>
                                    <option value="Politics">Politics / রাজনীতি</option>
                                    <option value="Bangladesh">Bangladesh / সারাদেশ</option>
                                    <option value="Capital">Capital / রাজধানী</option>
                                    <option value="Crime">Crime / অপরাধ</option>
                                    <option value="World">World / বিশ্ব</option>
                                    <option value="Business">Business / বাণিজ্য</option>
                                    <option value="Opinion">Opinion / মতামত</option>
                                    <option value="Sports">Sports / খেলা</option>
                                    <option value="Entertainment">Entertainment / বিনোদন</option>
                                    <option value="Technology">Technology / প্রযুক্তি</option>
                                    <option value="Education">Education / শিক্ষা</option>
                                    <option value="Lifestyle">Lifestyle / জীবনযাপন</option>
                                    <option value="Jobs">Jobs / চাকরি</option>
                                    <option value="Dhaka">Dhaka / ঢাকা</option>
                                    <option value="Chattogram">Chattogram / চট্টগ্রাম</option>
                                    <option value="Rajshahi">Rajshahi / রাজশাহী</option>
                                    <option value="Khulna">Khulna / খুলনা</option>
                                    <option value="Barishal">Barishal / বরিশাল</option>
                                    <option value="Sylhet">Sylhet / সিলেট</option>
                                    <option value="Rangpur">Rangpur / রংপুর</option>
                                    <option value="Mymensingh">Mymensingh / ময়মনসিংহ</option>
                                </select>
                            </div>
                        </div>

                        <div className="md:col-span-4 space-y-6">
                            <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Location</h3>
                                <LocationSelector value={location} onChange={setLocation} />
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 2: MEDIA */}
                {activeTab === 'media' && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        <div className="md:col-span-8">
                            <div className="bg-white rounded-xl border-dashed border-2 border-gray-200 p-6 h-full">
                                <h3 className="text-sm font-bold text-gray-900 mb-4">Featured Images & Gallery</h3>
                                <ImageUploader 
                                  images={images} 
                                  onImagesChange={setImages}
                                  maxImages={10}
                                />
                            </div>
                        </div>
                        <div className="md:col-span-4">
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 h-full">
                                <h3 className="text-sm font-bold text-gray-900 mb-4">Video Embed</h3>
                                <VideoEmbedder 
                                  value={videoUrl}
                                  onChange={setVideoUrl}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 3: DETAILS */}
                {activeTab === 'details' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                         <div className="space-y-8">
                             <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Attribution</h3>
                                <ContributorSelector 
                                    contributors={contributors} 
                                    onChange={setContributors} 
                                />
                             </div>
                             
                             <div className="pt-8 border-t border-gray-100">
                                <SourceInput 
                                    source={source} 
                                    sourceUrl={sourceUrl}
                                    onSourceChange={setSource}
                                    onUrlChange={setSourceUrl}
                                />
                             </div>
                         </div>

                         <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                             <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Tags & Topics</h3>
                             <TagInput 
                                value={tags} 
                                onChange={setTags} 
                                label="Article Tags"
                                placeholder="Add tags..."
                             />
                             <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                                Add relevant tags to improve content discovery. Press Enter to add.
                             </p>
                         </div>
                    </div>
                )}

                {/* TAB 4: SEO */}
                {activeTab === 'seo' && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        <div className="md:col-span-7">
                            <SEOPanel 
                                title={seoTitle}
                                onTitleChange={setSeoTitle}
                                description={seoDescription}
                                onDescriptionChange={setSeoDescription}
                                slug={''} 
                                canonicalUrl={canonicalUrl}
                                onCanonicalUrlChange={setCanonicalUrl}
                                onGenerateSEO={onGenerateSEO}
                            />
                        </div>
                        
                        <div className="md:col-span-5">
                            <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
                                <h3 className="text-sm font-bold text-blue-900 mb-4 flex items-center gap-2">
                                    <Search size={16} /> Meta Keywords
                                </h3>
                                <TagInput 
                                  value={keywords} 
                                  onChange={setKeywords}
                                  label=""
                                  placeholder="Add keywords..."
                                />
                                <div className="mt-4 p-4 bg-white/60 rounded-lg text-xs text-blue-800 leading-relaxed">
                                    <strong>Why Keywords?</strong> Although Google doesn't strictly use meta keywords for ranking, they can be helpful for other search engines and internal tagging systems.
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
          </div>
      </div>
    </div>
  );
}
