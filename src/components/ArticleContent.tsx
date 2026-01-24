"use client";

import Image from "next/image";
import Link from "next/link";
import { Share2, Clock, Calendar, Facebook, Twitter, Linkedin, Copy, Printer, Bookmark, PlayCircle, MapPin, Image as ImageIcon } from "lucide-react";
import { localizeTime } from "@/utils/bn";
import { useState, useRef, useEffect } from "react";
import { clsx } from "clsx";
import AISummary from "@/components/AISummary";
import { useVideoPlayer } from "@/contexts/VideoPlayerContext";
import StructuredData from "@/components/StructuredData";
import { generateBlurPlaceholder } from "@/utils/image";

// Types
import { NewsItem } from "@/data/mockNews";

import { incrementArticleView } from "@/lib/actions-article";

interface ArticleContentProps {
    article: NewsItem;
    authorNews: NewsItem[];
    relatedNews: NewsItem[];
}

export default function ArticleContent({ article, authorNews, relatedNews }: ArticleContentProps) {
    const [shareOpen, setShareOpen] = useState(false);
    const { playVideo, closePlayer } = useVideoPlayer();
    
    // Increment View Count on Mount
    useEffect(() => {
        if (article?.id) {
            incrementArticleView(article.id);
        }
    }, [article.id]);
    
    // Inline Player State
    const [isInlinePlaying, setIsInlinePlaying] = useState(false);
    const inlinePlayerRef = useRef<any>(null); 
    const cleanUpRef = useRef<boolean>(false);

    // Handover Logic (Navigation / Unmount)
    useEffect(() => {
        return () => {
             // If inline was playing, open floating player
             if (isInlinePlaying && article?.relatedVideo) {
                 let startTime = 0;
                 if (article.relatedVideo.source === 'youtube' && inlinePlayerRef.current?.getCurrentTime) {
                     startTime = inlinePlayerRef.current.getCurrentTime();
                 } else if (article.relatedVideo.source === 'facebook' && inlinePlayerRef.current?.getCurrentPosition) {
                     startTime = inlinePlayerRef.current.getCurrentPosition();
                 }

                 playVideo({
                     id: article.relatedVideo.id,
                     title: article.relatedVideo.title || article.title,
                     source: (article.relatedVideo.source as any),
                     url: article.relatedVideo.id,
                     thumbnail: article.image,
                     startTime: startTime
                 });
             }
        };
    }, [isInlinePlaying, article, playVideo]);

    // Handle Inline Play
    const handleInlinePlay = () => {
        setIsInlinePlaying(true);
        closePlayer(); // Close floating player if it's open
        cleanUpRef.current = true;
    };

    // Helper to Initialize Inline Players
    const initYouTube = (iframe: HTMLIFrameElement) => {
        if (!(window as any).YT) return;
        new (window as any).YT.Player(iframe, {
            events: {
                'onReady': (e: any) => {
                    inlinePlayerRef.current = e.target;
                    e.target.playVideo();
                }
            }
        });
    };
    

    const initFacebook = () => {
         if (!(window as any).FB) return;
         (window as any).FB.XFBML.parse(document.getElementById('inline-fb-container'), () => {
             (window as any).FB.Event.subscribe('xfbml.ready', function(msg: any) {
                 if (msg.type === 'video' && msg.id === article.relatedVideo?.id) {
                     inlinePlayerRef.current = msg.instance;
                     msg.instance.play();
                 }
             });
         });
    };

    return (
        <div className="bg-background text-foreground font-serif">
          {/* JSON-LD Structured Data for SEO */}
          <StructuredData 
            type="NewsArticle"
            data={{
              headline: article.title,
              description: article.summary,
              image: article.image,
              datePublished: new Date().toISOString(), // Use real date if available
              author: {
                name: article.author,
              },
              publisher: {
                name: "সমকাল",
                logo: "https://samakal.com/samakal-logo.png",
              },
              url: `https://samakal.com/article/${article.id}`,
            }}
          />
    
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 mb-6 flex gap-2 items-center">
               <Link href="/">হোম</Link> 
               <span>/</span>
               <Link href={`/category/${article.catSlug || article.category.toLowerCase()}`} className="text-brand-red font-semibold hover:underline">
                  {article.category}
               </Link>
               {article.news_type && (
                 <>
                   <span>/</span>
                   <span className="text-gray-400 capitalize">{article.news_type}</span>
                 </>
               )}
            </div>
    
            {/* Headline */}
            <h1 className="text-2xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              {article.title}
            </h1>

            {/* Sub-headline */}
            {article.sub_headline && (
                <h2 className="text-xl md:text-2xl text-gray-600 leading-snug mb-6 font-medium">
                    {article.sub_headline}
                </h2>
            )}
    
            {/* Author & Meta */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-t border-b border-gray-100 py-4 mb-8 gap-6">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden relative border-2 border-brand-red/20 shadow-sm">
                     <Image src={`https://randomuser.me/api/portraits/men/${(article.title.length % 50) + 1}.jpg`} alt="Author" fill className="object-cover" />
                  </div>
                  <div className="flex flex-col">
                     <div className="font-bold text-gray-900 text-lg flex items-center gap-2">
                        {article.contributors && article.contributors.length > 0 ? (
                             <span>
                                {article.contributors.map((c, i) => (
                                    <span key={c.id}>
                                        {c.name}{i < article.contributors!.length - 1 ? ', ' : ''}
                                    </span>
                                ))}
                             </span>
                        ) : (
                            <span>{article.author}</span>
                        )}
                     </div>
                     <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs md:text-sm text-gray-500 mt-1">
                        {article.location && (
                             <span className="flex items-center gap-1.5 font-medium text-gray-700">
                                <MapPin size={14} className="text-brand-red" /> {article.location}
                             </span>
                        )}
                        <span className="flex items-center gap-1.5"><Calendar size={14} /> {article.date || "২০ জানুয়ারি ২০২৬"}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className="flex items-center gap-1.5"><Clock size={14} /> {article.time}</span>
                     </div>
                  </div>
               </div>
    
               {/* Share Button Group */}
               <div className="flex items-center gap-3">
                   <div 
                     className="relative flex items-center group"
                     onMouseEnter={() => setShareOpen(true)}
                     onMouseLeave={() => setShareOpen(false)}
                   >
                      <div 
                         className={clsx(
                            "flex items-center gap-2 overflow-hidden transition-all duration-500 ease-in-out bg-gray-100 rounded-full",
                            shareOpen ? "w-48 px-2 py-1 opacity-100 mr-2" : "w-0 p-0 opacity-0"
                         )}
                      >
                          <button className="p-2 hover:text-[#1877F2] transition"><Facebook size={18} /></button>
                          <button className="p-2 hover:text-[#1DA1F2] transition"><Twitter size={18} /></button>
                          <button className="p-2 hover:text-[#0A66C2] transition"><Linkedin size={18} /></button>
                          <button className="p-2 hover:text-green-600 transition"><Copy size={18} /></button>
                      </div>
                      
                      <button 
                        className={clsx(
                           "flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all duration-300",
                           shareOpen 
                             ? "bg-gray-200 text-gray-700"
                             : "bg-brand-red text-white hover:bg-red-700 shadow-md hover:shadow-lg"
                        )}
                      >
                         <Share2 size={18} />
                         <span>শেয়ার</span>
                      </button>
                   </div>
    
                   {/* Print & Save Icons */}
                   <div className="flex items-center gap-2">
                       <button className="p-2 text-gray-500 hover:text-brand-red hover:bg-red-50 rounded-full transition" title="Save / Bookmark">
                          <Bookmark size={20} />
                       </button>
                       <button className="p-2 text-gray-500 hover:text-brand-red hover:bg-red-50 rounded-full transition" title="Print">
                          <Printer size={20} />
                       </button>
                   </div>
               </div>
            </div>
    
            {/* Featured Image */}
            <div className="relative aspect-video w-full md:w-[85%] rounded-xl overflow-hidden mb-8 shadow-sm">
               <Image 
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
               />
               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12">
                  <p className="text-white text-sm font-medium opacity-90">
                    {/* Caption logic could go here if we had it for main image */}
                    ছবি: প্রতীকী চিত্র (আনস্প্ল্যাশ)
                  </p>
               </div>
            </div>
    
            {/* AI SUMMARIZER FEATURE */}
            <div className="w-full md:w-[85%]">
                <AISummary summary={article.summary} />
                
                {/* RELATED VIDEO WIDGET / INLINE PLAYER */}
                {article.relatedVideo && (
                    <div className="mt-8 mb-8">
                        {!isInlinePlaying ? (
                           // WIDGET CARD
                           <div 
                              onClick={handleInlinePlay}
                              className="group cursor-pointer bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-brand-red/30 transition-all duration-300 transform hover:-translate-y-1"
                           >
                               <div className="flex flex-col md:flex-row">
                                  {/* Thumbnail */}
                                  <div className="relative md:w-56 aspect-video bg-black flex-shrink-0">
                                      <Image 
                                        src={article.image} 
                                        alt="Thumbnail" 
                                        fill 
                                        className="object-cover opacity-80 group-hover:opacity-60 transition"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center">
                                          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                             <PlayCircle className="text-white ml-1" size={24} />
                                          </div>
                                      </div>
                                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">
                                         {article.relatedVideo.source} 
                                      </div>
                                  </div>
                                  
                                  {/* Info */}
                                  <div className="p-4 md:p-6 flex flex-col justify-center flex-1">
                                      <div className="flex items-center gap-2 mb-2">
                                         <span className="text-xs font-bold text-red-600 uppercase tracking-widest px-2 py-0.5 bg-red-50 rounded-sm">
                                            ভিডিও সংবাদ
                                         </span>
                                      </div>
                                      <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-snug group-hover:text-red-700 transition line-clamp-2">
                                          {article.relatedVideo.title || article.title}
                                      </h3>
                                      <p className="text-sm text-gray-500 mt-2 line-clamp-1">
                                          ভিডিওটি দেখতে ক্লিক করুন
                                      </p>
                                  </div>
                                  
                                  {/* Arrow Icon */}
                                  <div className="hidden md:flex items-center justify-center px-6 border-l border-gray-100 bg-gray-50 group-hover:bg-red-50 transition-colors">
                                      <PlayCircle className="text-gray-300 group-hover:text-red-500 transition" size={32} />
                                  </div>
                               </div>
                           </div>
                        ) : (
                           // INLINE PLAYER
                           <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg border border-gray-200 animate-in fade-in zoom-in-95 duration-300">
                               {article.relatedVideo.source === 'youtube' ? (
                                   <iframe
                                       width="100%"
                                       height="100%"
                                       src={`https://www.youtube.com/embed/${article.relatedVideo.id}?autoplay=1&enablejsapi=1`}
                                       title={article.relatedVideo.title}
                                       frameBorder="0"
                                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                       allowFullScreen
                                       ref={(el) => { if (el) initYouTube(el); }}
                                   />
                               ) : (
                                   <div id="inline-fb-container" className="w-full h-full flex items-center justify-center">
                                       {/* FB Player Container */}
                                       <div 
                                          className="fb-video" 
                                          data-href={`https://www.facebook.com/watch/?v=${article.relatedVideo.id}`}
                                          data-width="auto"
                                          data-show-text="false"
                                          data-autoplay="true"
                                       ></div>
                                   </div>
                               )}
                           </div>
                        )}
                    </div>
                )}
            </div>

            {/* Effect to Init Facebook when Inline Player Mounts */}
            <InlineFacebookInitializer 
               isInlinePlaying={isInlinePlaying} 
               source={article.relatedVideo?.source} 
               onInit={initFacebook}
            />
    
            {/* Article Content - Aligned with Image (85%) */}
            <article className="w-full md:w-[85%] text-gray-800 text-lg md:text-xl leading-relaxed md:leading-8">
               {(article.content || "").split('\n').filter(p => p.trim() !== "").map((paragraph, idx) => {
                 const cleanText = paragraph.trim();
                 
                 // 1. Blockquote Detection
                 if (cleanText.startsWith('"') || cleanText.startsWith('“')) {
                     return (
                        <blockquote key={idx} className="border-l-4 border-brand-red pl-6 my-10 italic text-2xl font-serif text-gray-900 bg-orange-50/50 py-8 pr-6 rounded-r-xl">
                           <span className="text-5xl text-brand-red opacity-30 block mb-[-20px]">“</span>
                           <p className="relative z-10">{cleanText.replace(/^["“]|["”]$/g, '')}</p>
                        </blockquote>
                     );
                 }

                 // 2. First Paragraph Drop Cap (Magazine Style)
                 if (idx === 0) {
                     return (
                         <p key={idx} className="mb-8 text-gray-900 font-medium">
                             <span className="float-left text-7xl font-bold text-brand-red mr-3 mt-[-10px] line-clamp-1 border border-red-100 px-4 rounded-lg bg-red-50/30">
                                 {cleanText.charAt(0)}
                             </span>
                             {cleanText.slice(1)}
                         </p>
                     )
                 }

                 // 3. Standard Paragraphs
                 return (
                    <p key={idx} className="mb-6 text-gray-800 text-justify">
                        {cleanText}
                    </p>
                 );
               })}
            </article>

            {/* --- GALLERY SECTION (NEW) --- */}
            {article.images && article.images.length > 0 && (
                <div className="w-full md:w-[85%] my-12">
                     <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <ImageIcon className="text-brand-red" size={24} />
                        ফটো গ্যালারি
                     </h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {article.images.map((img) => (
                            <div key={img.id} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                                <Image 
                                    src={img.url} 
                                    alt={img.caption || "Gallery Image"} 
                                    fill 
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {img.caption && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-white text-xs">
                                        {img.caption}
                                    </div>
                                )}
                            </div>
                        ))}
                     </div>
                </div>
            )}
        
        {/* --- AUTHOR'S POPULAR NEWS SUB-SECTION --- */}
        {authorNews.length > 0 && (
        <div className="mt-16 mb-12 w-full md:w-[85%]">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 relative">
                   <Image src={`https://randomuser.me/api/portraits/men/${(article.title.length % 50) + 1}.jpg`} alt="Author" fill className="object-cover" />
                </div>
                <div>
                   <h3 className="text-lg font-bold text-gray-900 leading-tight">এই প্রতিবেদকের আরও খবর</h3>
                   <div className="h-0.5 w-full bg-gray-200 mt-1 relative">
                       <div className="absolute left-0 top-0 h-full w-1/3 bg-brand-red"></div>
                   </div>
                </div>
             </div>
             
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                 {authorNews.map((news) => (
                    <Link key={news.id} href={`/article/${news.id}`} className="group block">
                        <div className="aspect-[4/3] relative overflow-hidden rounded-lg mb-2">
                             <Image 
                                src={news.image} 
                                alt={news.title} 
                                fill 
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                             />
                        </div>
                        <h4 className="text-sm font-bold text-gray-900 leading-tight group-hover:text-brand-red line-clamp-3">
                            {news.title}
                        </h4>
                    </Link>
                 ))}
             </div>
        </div>
        )}

        {/* Tags (Dynamic) */}
        {article.tags && article.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                    <span key={tag} className="bg-gray-100 px-4 py-1.5 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-200 hover:text-brand-red transition cursor-pointer">
                        #{tag}
                    </span>
                ))}
            </div>
            </div>
        )}

        {/* RELATED NEWS SECTION (8 Items) */}
        {relatedNews.length > 0 && (
        <div className="mt-16 pt-12 border-t-4 border-gray-900">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                <span className="w-2 h-8 bg-brand-red rounded"></span>
                আরও পড়ুন
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedNews.map((news) => (
                    <Link key={news.id} href={`/article/${news.id}`} className="group block bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
                        <div className="aspect-video relative overflow-hidden">
                            <Image 
                                src={news.image} 
                                alt={news.title} 
                                fill 
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-2 right-2 bg-brand-red text-white px-2 py-0.5 rounded text-[10px] font-bold">
                                {news.category}
                            </div>
                        </div>
                        <div className="p-4">
                            <h4 className="font-bold text-gray-800 text-lg leading-snug group-hover:text-brand-red line-clamp-2 mb-2">
                                {news.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                                <Clock size={12} />
                                <span>{news.time}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
        )}

    </div>
    );
}

// Helper Component to handle Effect logic cleanly
const InlineFacebookInitializer = ({ isInlinePlaying, source, onInit }: { isInlinePlaying: boolean, source?: string, onInit: () => void }) => {
    useEffect(() => {
        if (isInlinePlaying && source === 'facebook') {
            onInit();
        }
    }, [isInlinePlaying, source, onInit]);
    return null;
};
