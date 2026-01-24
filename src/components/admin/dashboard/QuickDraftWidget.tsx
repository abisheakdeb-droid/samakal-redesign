"use client";

import { useState } from 'react';
import { Save, Eraser } from 'lucide-react';
import { toast } from 'sonner';

export default function QuickDraftWidget() {
  const [draft, setDraft] = useState('');

  const handleSave = () => {
    if (!draft.trim()) return;
    toast.success('Draft saved to local storage!');
    // Ideally this would save to a real backend or context
    localStorage.setItem('quick-draft', draft);
    setDraft('');
  };

  return (
    <div className="bg-amber-50 rounded-2xl border border-amber-100 shadow-sm p-6 relative flex flex-col h-full">
      <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
        <span className="text-xl">✍️</span> Quick Note
      </h3>
      <textarea
        className="flex-1 w-full bg-white/50 border-0 rounded-xl p-3 text-sm text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-amber-200 resize-none transition mb-4"
        placeholder="Got a lead? Scribble it down..."
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        rows={4}
      />
      <div className="flex items-center gap-2">
        <button 
            onClick={handleSave}
            disabled={!draft.trim()}
            className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <Save size={14} /> Save Idea
        </button>
        <button 
            onClick={() => setDraft('')}
            disabled={!draft.trim()}
            className="p-2 bg-amber-200 hover:bg-amber-300 text-amber-800 rounded-lg transition disabled:opacity-50"
            title="Clear"
        >
            <Eraser size={14} />
        </button>
      </div>
    </div>
  );
}
