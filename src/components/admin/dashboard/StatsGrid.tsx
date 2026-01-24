import { ArrowUpRight, Users, TrendingUp, FileText, Clock } from 'lucide-react';
import { DashboardStat } from './types';

export default function StatsGrid() {
  const stats: DashboardStat[] = [
    { label: 'Real-time Visitors', value: '1,245', change: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Viral Probability', value: 'High', change: '85%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Total Articles', value: '128', change: '+5', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Avg. Read Time', value: '4m 12s', change: '+30s', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer group">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
              <stat.icon size={24} />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
              {stat.change} <ArrowUpRight size={12} />
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
          <p className="text-sm font-medium text-gray-500">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
