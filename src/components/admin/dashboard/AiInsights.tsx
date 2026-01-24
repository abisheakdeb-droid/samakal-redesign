import { Zap } from 'lucide-react';

export default function AiInsights() {
  return (
    <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="flex items-center gap-2 mb-6">
        <div className="p-1.5 bg-white/20 rounded-lg">
          <Zap size={16} className="text-yellow-300" />
        </div>
        <h3 className="font-bold">AI Insights</h3>
      </div>

      <div className="space-y-4">
        <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 transition hover:bg-white/15 cursor-pointer group">
          <div className="flex justify-between items-start mb-1">
             <h4 className="text-sm font-bold text-yellow-300">Trending Topic Alert</h4>
             <span className="bg-yellow-500/20 text-yellow-200 text-[10px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">High</span>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed group-hover:text-white transition-colors">
            "Dhaka Metro Rail" search volume increased by 400% in last hour. Consider writing an update.
          </p>
          <button className="mt-3 w-full py-2 bg-white/20 hover:bg-white/30 rounded text-xs font-bold transition flex items-center justify-center gap-2">
             <Zap size={12} fill="currentColor" /> Draft Story
          </button>
        </div>

         <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 transition hover:bg-white/15 cursor-pointer">
          <h4 className="text-sm font-bold text-green-300 mb-1">SEO Opportunity</h4>
          <p className="text-xs text-gray-300 leading-relaxed">
            Your article "Budget 2026" is ranking #4. Add keyword "Tax Rebate" to hit #1.
          </p>
        </div>
      </div>
    </div>
  );
}
