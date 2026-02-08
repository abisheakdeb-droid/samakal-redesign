"use client";

import { useState, useEffect } from "react";
import { Type } from "lucide-react";

type FontSize = "small" | "medium" | "large";

const FONT_SIZE_KEY = "samakal-font-size";

export default function FontSizeToggle() {
  const [fontSize, setFontSize] = useState<FontSize>("medium");
  const [mounted, setMounted] = useState(false);

  const applyFontSize = (size: FontSize) => {
    document.documentElement.classList.remove("font-size-small", "font-size-medium", "font-size-large");
    document.documentElement.classList.add(`font-size-${size}`);
  };

  useEffect(() => {
    setMounted(true);
    const saved = (localStorage.getItem(FONT_SIZE_KEY) as FontSize) || "medium";
    if (["small", "medium", "large"].includes(saved)) {
      setFontSize(saved);
      applyFontSize(saved);
    }
  }, []);

  const handleChange = (size: FontSize) => {
    setFontSize(size);
    applyFontSize(size);
    localStorage.setItem(FONT_SIZE_KEY, size);
  };

  if (!mounted) return <div className="w-[140px] h-10"></div>;

  return (
    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full p-1 shadow-sm">
      <span className="text-xs text-gray-600 pl-2 hidden sm:inline">অক্ষর:</span>
      <button
        onClick={() => handleChange("small")}
        className={`p-2 rounded-full transition ${fontSize === "small" ? "bg-brand-red text-white" : "hover:bg-gray-100 text-gray-600"}`}
        title="ছোট"
      >
        <Type size={14} />
      </button>
      <button
        onClick={() => handleChange("medium")}
        className={`p-2 rounded-full transition ${fontSize === "medium" ? "bg-brand-red text-white" : "hover:bg-gray-100 text-gray-600"}`}
        title="মাঝারি"
      >
        <Type size={16} />
      </button>
      <button
        onClick={() => handleChange("large")}
        className={`p-2 rounded-full transition ${fontSize === "large" ? "bg-brand-red text-white" : "hover:bg-gray-100 text-gray-600"}`}
        title="বড়"
      >
        <Type size={18} />
      </button>
    </div>
  );
}
