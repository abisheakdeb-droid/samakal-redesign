"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createEvent } from "@/lib/actions-event";
import { toast } from "sonner";
import { Save, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateEventPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      await createEvent(formData);
      toast.success("Event created successfully!");
    } catch (error) {
      toast.error("Failed to create event");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link 
            href="/admin/dashboard/events" 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
        >
            <ArrowLeft size={20} />
        </Link>
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create New Event</h1>
           <p className="text-gray-500 mt-1">Set up a special coverage or event</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
        <form action={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Event Title <span className="text-red-500">*</span>
                </label>
                <input 
                    name="title"
                    type="text" 
                    placeholder="e.g. Election 2026, World Cup"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    onChange={(e) => {
                        // Auto-generate slug
                        const slugInput = document.getElementById('slug-input') as HTMLInputElement;
                        if (slugInput && !slugInput.dataset.touched) {
                            slugInput.value = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                        }
                    }}
                />
            </div>

            {/* Slug */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Slug <span className="text-red-500">*</span>
                </label>
                <input 
                    id="slug-input"
                    name="slug"
                    type="text" 
                    placeholder="e.g. election-2026"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    onChange={(e) => {
                        e.target.dataset.touched = 'true';
                    }}
                />
            </div>
            
             {/* Banner Image URL (Simple for now, can be upgraded to uploader) */}
             <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Banner Image URL
                </label>
                <input 
                    name="banner_image"
                    type="text" 
                    placeholder="https://..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <p className="text-xs text-gray-500 mt-1">Provide a full URL for the event wide banner</p>
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                </label>
                <textarea 
                    name="description"
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                />
            </div>

            {/* Is Active Status */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <input 
                    type="checkbox" 
                    name="is_active"
                    id="is_active"
                    className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="is_active" className="text-sm font-medium text-gray-900 cursor-pointer select-none">
                    Set as Active Event (Will appear on Homepage)
                </label>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-gray-900 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-black transition-all flex items-center gap-2"
                >
                    {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    Create Event
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}
