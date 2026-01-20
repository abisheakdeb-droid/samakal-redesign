import { HEADLINES_DB, CATEGORY_MAP, getStaticImage } from './mockNews';

export interface SearchResult {
  id: string;
  title: string;
  category: string;
  categorySlug: string;
  author: string;
  date: string; // Formatted Bengali Date
  rawDate: Date; // For sorting
  image: string;
}

const AUTHORS = [
    "নিজস্ব প্রতিবেদক", 
    "সিনিয়র করেসপন্ডেন্ট", 
    "ডেস্ক রিপোর্ট", 
    "বিশেষ প্রতিনিধি", 
    "আন্তর্জাতিক ডেস্ক", 
    "ক্রীড়া প্রতিবেদক",
    "চাকরি ডেস্ক",
    "ফিচার রাইটার",
    "প্রযুক্তি ডেস্ক"
];

// Helper to convert English numerals to Bengali
const toBengaliNumber = (num: number): string => {
    return num.toString().replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[parseInt(d)]);
};

const MONTHS = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
];

export const generateSearchIndex = (): SearchResult[] => {
    const index: SearchResult[] = [];
    
    // Iterate over all categories and their headlines
    Object.entries(HEADLINES_DB).forEach(([catSlug, headlines]) => {
        headlines.forEach((title, i) => {
            // Deterministic pseudo-random generation based on title + index
            const seed = (title.length + i) * 637; 
            
            // 1. Author
            const author = AUTHORS[seed % AUTHORS.length];
            
            // 2. Date (Within last 90 days)
            const daysAgo = seed % 90;
            const dateObj = new Date();
            dateObj.setDate(dateObj.getDate() - daysAgo);
            
            const day = toBengaliNumber(dateObj.getDate());
            const year = toBengaliNumber(dateObj.getFullYear());
            const month = MONTHS[dateObj.getMonth()];
            const dateStr = `${day} ${month} ${year}`;

            // 3. Image
            const image = getStaticImage(catSlug, seed);
            
            // 4. Category Label
            const catLabel = CATEGORY_MAP[catSlug] || "সংবাদ";

            index.push({
                id: `${catSlug}-${i}`,
                title: title,
                category: catLabel,
                categorySlug: catSlug,
                author: author,
                date: dateStr,
                rawDate: dateObj,
                image: image
            });
        });
    });

    // Shuffle results deterministically so they aren't grouped by category 
    // (Optional, but search sorting will handle relevance)
    return index;
};

// Pre-generated Index
export const SEARCH_INDEX = generateSearchIndex();
