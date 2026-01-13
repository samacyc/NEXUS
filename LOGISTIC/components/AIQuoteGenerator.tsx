import React, { useState } from 'react';
import { generateShippingQuote } from '../services/geminiService';
import { QuoteResponse } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';

export const AIQuoteGenerator: React.FC = () => {
  const [form, setForm] = useState({
    originZip: '',
    destZip: '',
    weight: 100,
    dimensions: '48x40x40',
    packageType: 'Pallet'
  });
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState<QuoteResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data = await generateShippingQuote(form);
    setQuote(data);
    setLoading(false);
  };

  const chartData = quote?.options.map(opt => ({
    name: opt.serviceLevel.replace("Nexus ", ""),
    cost: opt.price,
    days: opt.estimatedDays,
    desc: opt.aiAnalysis
  }));

  return (
    <section id="ai-quote" className="py-24 bg-slate-950 text-white overflow-hidden relative">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-red-900/10 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12">
          <span className="text-red-500 font-bold tracking-widest text-xs uppercase mb-2 block">AI-Driven Logistics</span>
          <h2 className="text-4xl font-bold">Enterprise Freight Estimator</h2>
          <p className="text-slate-400 mt-4 max-w-2xl">
            Our proprietary algorithm analyzes lane density, carrier capacity, and weather impact to provide precise B2B freight estimates.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Input Form */}
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">Origin Zip</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-slate-950 border border-slate-700 rounded-md px-4 py-3 focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none text-white placeholder-slate-600 transition-all font-mono"
                    placeholder="90210"
                    value={form.originZip}
                    onChange={(e) => setForm({...form, originZip: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">Dest Zip</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-slate-950 border border-slate-700 rounded-md px-4 py-3 focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none text-white placeholder-slate-600 transition-all font-mono"
                    placeholder="10001"
                    value={form.destZip}
                    onChange={(e) => setForm({...form, destZip: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">Weight (lbs)</label>
                <input 
                  type="number" 
                  min="0.1"
                  step="0.1"
                  className="w-full bg-slate-950 border border-slate-700 rounded-md px-4 py-3 focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none text-white placeholder-slate-600 transition-all font-mono"
                  value={form.weight}
                  onChange={(e) => setForm({...form, weight: Number(e.target.value)})}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">Dimensions (LxWxH)</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-950 border border-slate-700 rounded-md px-4 py-3 focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none text-white placeholder-slate-600 transition-all font-mono"
                  placeholder="48x40x40"
                  value={form.dimensions}
                  onChange={(e) => setForm({...form, dimensions: e.target.value})}
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-4 rounded-md transition-all shadow-lg shadow-red-900/30 disabled:opacity-50 flex justify-center items-center gap-2 uppercase tracking-wide text-sm"
              >
                {loading ? (
                   <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Calculating Route...</span>
                   </>
                ) : "Calculate Freight Quote"}
              </button>
            </form>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-8 min-h-[500px]">
            {!quote && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 border-2 border-dashed border-slate-800 rounded-xl p-8">
                 <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                 </div>
                 <p className="text-lg font-medium">Configure shipment parameters to initialize AI routing.</p>
              </div>
            )}

            {quote && (
              <div className="space-y-8 animate-fade-in-up">
                
                {/* AI Summary Card */}
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-red-500 opacity-5 blur-3xl rounded-full"></div>
                   <div className="flex items-start gap-4 relative z-10">
                      <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Route Analysis</h3>
                        <p className="text-slate-300 leading-relaxed text-sm">
                           "{quote.routeOptimizationNotes}"
                        </p>
                        <div className="mt-4 flex gap-4 text-xs font-mono text-red-400">
                           <span>DIST: {quote.distanceMiles.toFixed(0)} MI</span>
                           <span>ORG: {quote.origin}</span>
                           <span>DST: {quote.destination}</span>
                        </div>
                      </div>
                   </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-4">
                  {quote.options.map((opt, idx) => (
                    <div key={idx} className={`relative p-6 rounded-lg border transition-all hover:translate-y-[-4px] duration-300 ${opt.serviceLevel.includes('Express') ? 'bg-white text-slate-900 border-white shadow-xl' : 'bg-slate-900 border-slate-800 hover:border-slate-700'}`}>
                       {opt.serviceLevel.includes('Express') && <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-600 text-xs font-bold px-3 py-1 rounded-sm text-white uppercase tracking-wider">Recommended</div>}
                       <h4 className="font-bold text-lg mb-1">{opt.serviceLevel}</h4>
                       <div className="text-xs uppercase tracking-wide opacity-75 mb-4 font-bold">{opt.aiAnalysis}</div>
                       <div className="text-3xl font-extrabold mb-2">${opt.price.toFixed(2)}</div>
                       <ul className="text-sm space-y-2 opacity-80 font-medium">
                         <li className="flex items-center gap-2">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                           {opt.estimatedDays} Day Transit
                         </li>
                         <li className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg>
                            {opt.carbonFootprint} CO2e
                         </li>
                       </ul>
                    </div>
                  ))}
                </div>

                {/* Comparison Chart */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-64">
                   <h4 className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-widest">Efficiency Metrics</h4>
                   <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={100} tick={{fill: '#64748b', fontSize: 11, fontWeight: 600}} />
                        <Tooltip 
                          contentStyle={{backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff'}}
                          cursor={{fill: '#1e293b', opacity: 0.5}}
                        />
                        <Bar dataKey="cost" name="Cost ($)" fill="#dc2626" radius={[0, 2, 2, 0]}>
                          {chartData?.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={index === 1 ? '#ef4444' : '#b91c1c'} />
                          ))}
                        </Bar>
                      </BarChart>
                   </ResponsiveContainer>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};