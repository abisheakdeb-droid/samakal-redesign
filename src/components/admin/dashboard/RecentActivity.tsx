import { ActivityItem } from './types';

export default function RecentActivity() {
  const activities: ActivityItem[] = [
    { id: 1, user: 'Simanta Khokon', action: 'published', target: 'Election 2026: Live Updates', time: '2 hours ago' },
    { id: 2, user: 'Rafiqul Islam', action: 'edited', target: 'Cricket World Cup Squad', time: '3 hours ago' },
    { id: 3, user: 'System Admin', action: 'updated', target: 'SEO Settings', time: '5 hours ago' },
    { id: 4, user: 'Simanta Khokon', action: 'drafted', target: 'Dhaka Metro New Schedule', time: '6 hours ago' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-full">
      <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center justify-between">
        Recent Activity
        <button className="text-xs text-brand-red font-bold hover:underline">View All</button>
      </h3>
      <div className="space-y-6">
        {activities.map((item) => (
          <div key={item.id} className="flex items-start gap-4">
            <div className="w-2 h-2 mt-2 rounded-full bg-brand-red flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-800 font-medium leading-snug">
                <span className="font-bold">{item.user}</span> {item.action} "{item.target}"
              </p>
              <p className="text-xs text-gray-500 mt-1">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
