/**
 * Category mapping: English (DB) → Bengali (Display)
 * Used across the site for consistent Bengali display
 */
export const CATEGORY_BENGALI_MAP: Record<string, string> = {
  // Core categories
  'Politics': 'রাজনীতি',
  'Bangladesh': 'সারাদেশ',
  'Dhaka': 'ঢাকা',
  'World': 'বিশ্ব',
  'Economy': 'অর্থনীতি',
  'Business': 'বাণিজ্য',
  'Sports': 'খেলা',
  'Technology': 'প্রযুক্তি',
  'Education': 'শিক্ষা',
  'Health': 'স্বাস্থ্য',
  'Environment': 'পরিবেশ',
  'Society': 'সমাজ',
  'Entertainment': 'বিনোদন',
  'Opinion': 'মতামত',
  'Lifestyle': 'জীবনযাপন',
  'Jobs': 'চাকরি',
  
  // Divisions
  'Chattogram': 'চট্টগ্রাম',
  'Rajshahi': 'রাজশাহী',
  'Khulna': 'খুলনা',
  'Barishal': 'বরিশাল',
  'Sylhet': 'সিলেট',
  'Rangpur': 'রংপুর',
  'Mymensingh': 'ময়মনসিংহ',
  
  // Default
  'Uncategorized': 'অন্যান্য',
};

/**
 * Get Bengali category name
 * @param englishCategory - Category from database (English)
 * @returns Bengali category name
 */
export function getBengaliCategory(englishCategory: string | undefined | null): string {
  if (!englishCategory) return 'অন্যান্য';
  
  // Try exact match first
  if (CATEGORY_BENGALI_MAP[englishCategory]) {
    return CATEGORY_BENGALI_MAP[englishCategory];
  }
  
  // Try case-insensitive match
  const lowerCategory = englishCategory.toLowerCase();
  const found = Object.keys(CATEGORY_BENGALI_MAP).find(
    key => key.toLowerCase() === lowerCategory
  );
  
  return found ? CATEGORY_BENGALI_MAP[found] : englishCategory;
}
