"use client";

import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Zap } from 'lucide-react';

const data = [
  { time: '10:00', visitors: 400 },
  { time: '10:05', visitors: 600 },
  { time: '10:10', visitors: 550 },
  { time: '10:15', visitors: 900 },
  { time: '10:20', visitors: 800 },
  { time: '10:25', visitors: 1100 },
  { time: '10:30', visitors: 1245 },
];

export default function PulseWidget() {
  const currentVisitors = data[data.length - 1].visitors;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
             <span className="relative flex h-3 w-3">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
             </span>
             Live Pulse
          </h3>
          <p className="text-xs text-gray-500">Real-time readership</p>
        </div>
        <div className="text-right">
             <span className="text-2xl font-bold text-gray-900 block leading-none">{currentVisitors}</span>
             <span className="text-xs font-bold text-green-600">+12% vs last hr</span>
        </div>
      </div>

      <div className="h-48 w-full -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                itemStyle={{ color: '#ef4444', fontWeight: 'bold' }}
            />
            <Area type="monotone" dataKey="visitors" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorVisitors)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
