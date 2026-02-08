import Link from "next/link";
import { Plus, Check, X, Calendar } from "lucide-react";
import { fetchEvents } from "@/lib/actions-event";

export default async function EventsPage() {
  const events = await fetchEvents();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Events</h1>
          <p className="text-gray-500 mt-2">Manage special events and coverages</p>
        </div>
        <Link 
          href="/admin/dashboard/events/create" 
          className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition flex items-center gap-2"
        >
          <Plus size={18} />
          <span>New Event</span>
        </Link>
      </div>

      <div className="bg-white border boundary-gray-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-700">Event Title</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Slug</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Created At</th>
              <th className="px-6 py-4 font-semibold text-gray-700 text-right">Status</th>
              <th className="px-6 py-4 font-semibold text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {events.length === 0 ? (
               <tr>
                 <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    No events found. Create one to get started.
                 </td>
               </tr>
            ) : (
                events.map((event) => (
                    <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                             {event.banner_image && (
                                <div className="w-10 h-10 rounded bg-gray-100 overflow-hidden shrink-0">
                                    <img src={event.banner_image} alt="" className="w-full h-full object-cover"/>
                                </div>
                             )}
                             <span className="font-medium text-gray-900">{event.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500 font-mono text-sm">{event.slug}</td>
                      <td className="px-6 py-4 text-gray-500 text-sm">
                          <div className="flex items-center gap-2">
                             <Calendar size={14} />
                             {new Date(event.created_at).toLocaleDateString()}
                          </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {event.is_active ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                                <Check size={12} /> Active
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                <X size={12} /> Inactive
                            </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                         <button className="text-gray-400 hover:text-gray-900 transition text-sm font-medium">Edit</button>
                      </td>
                    </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
