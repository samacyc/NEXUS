import React, { useState } from 'react';
import { generateShippingQuote } from '../services/geminiService';
import { QuoteResponse } from '../types';
import { MapVisualization } from './MapVisualization';

export const ShippingCalculator: React.FC = () => {
  const [form, setForm] = useState({
    originZip: '',
    destZip: '',
    weight: 15,
    dimensions: '12x12x12',
    packageType: 'Parcel'
  });
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await generateShippingQuote(form);
      setQuote(data);
    } catch (err) {
      setError("Unable to calculate shipping rates at this time. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="calculator" className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-red-600 font-bold tracking-widest text-xs uppercase mb-2 block">Rate Calculator</span>
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Estimate Your Shipping Costs</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Get instant, AI-optimized quotes for your domestic shipments. Compare ground, express, and sustainable options.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 lg:flex">
          
          {/* Input Section */}
          <div className="lg:w-1/3 bg-slate-900 p-8 lg:p-10 text-white">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              Shipment Details
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Origin Zip</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-3 focus:ring-1 focus:ring-red-500 focus:border-red-500 outline-none transition-colors placeholder-slate-600"
                    placeholder="10001"
                    value={form.originZip}
                    onChange={(e) => setForm({...form, originZip: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Dest Zip</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-3 focus:ring-1 focus:ring-red-500 focus:border-red-500 outline-none transition-colors placeholder-slate-600"
                    placeholder="90210"
                    value={form.destZip}
                    onChange={(e) => setForm({...form, destZip: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Package Weight (lbs)</label>
                <input 
                  type="number" 
                  min="0.1"
                  step="0.1"
                  className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-3 focus:ring-1 focus:ring-red-500 focus:border-red-500 outline-none transition-colors placeholder-slate-600"
                  value={form.weight}
                  onChange={(e) => setForm({...form, weight: Number(e.target.value)})}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Dimensions (LxWxH)</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-3 focus:ring-1 focus:ring-red-500 focus:border-red-500 outline-none transition-colors placeholder-slate-600"
                  placeholder="12x12x12"
                  value={form.dimensions}
                  onChange={(e) => setForm({...form, dimensions: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Package Type</label>
                <div className="relative">
                  <select
                    className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-3 focus:ring-1 focus:ring-red-500 focus:border-red-500 outline-none transition-colors text-white appearance-none cursor-pointer"
                    value={form.packageType}
                    onChange={(e) => setForm({...form, packageType: e.target.value})}
                  >
                    <option value="Parcel">Parcel</option>
                    <option value="Box">Box</option>
                    <option value="Pallet">Pallet</option>
                    <option value="Tube">Tube</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded transition-all shadow-lg shadow-red-900/20 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center uppercase tracking-wide text-sm"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                       <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                       Calculating...
                    </span>
                  ) : "Get Rates"}
                </button>
              </div>
            </form>
          </div>

          {/* Results Section */}
          <div className="lg:w-2/3 p-8 lg:p-10 bg-white min-h-[500px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-xl font-bold text-slate-900">Available Options</h3>
               {quote && <span className="text-sm font-normal text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{quote.distanceMiles.toFixed(0)} miles</span>}
            </div>

            {!quote && !loading && !error && (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl p-12">
                <svg className="w-16 h-16 mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                <p className="text-lg font-medium">Enter shipment details to view rates</p>
              </div>
            )}

            {loading && (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                 <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                 <p className="text-slate-500 font-medium animate-pulse">Analyzing optimal routes...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-100 flex items-center gap-3">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 {error}
              </div>
            )}

            {quote && (
              <div className="space-y-6 animate-fade-in-up">
                
                {/* Map Visualization */}
                <MapVisualization 
                   origin={quote.originCoordinates} 
                   destination={quote.destinationCoordinates} 
                />

                {/* AI Insight */}
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm text-slate-700 flex gap-3">
                   <div className="mt-0.5">
                     <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   </div>
                   <div>
                      <span className="font-bold text-slate-900 block mb-1">Route Optimization Note:</span>
                      {quote.routeOptimizationNotes}
                   </div>
                </div>

                <div className="grid gap-4">
                  {quote.options.map((option, idx) => (
                    <div key={idx} className="group relative border border-slate-200 rounded-xl p-5 hover:border-red-300 hover:shadow-md transition-all cursor-pointer bg-white">
                       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          
                          {/* Left: Service Info */}
                          <div className="flex items-center gap-4">
                             <div className={`w-12 h-12 rounded-full flex items-center justify-center ${option.serviceLevel.includes('EV') || option.carbonFootprint.includes('0kg') ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-600'}`}>
                                {option.serviceLevel.includes('Air') ? (
                                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                                ) : (
                                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                )}
                             </div>
                             <div>
                                <h4 className="font-bold text-lg text-slate-900">{option.serviceLevel}</h4>
                                <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                                   <span className="flex items-center gap-1">
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                      {option.estimatedDays} Days
                                   </span>
                                   <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                   <span className="flex items-center gap-1">
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg>
                                      {option.carbonFootprint}
                                   </span>
                                </div>
                             </div>
                          </div>

                          {/* Right: Price */}
                          <div className="text-right">
                             <div className="text-2xl font-bold text-slate-900">${option.price.toFixed(2)}</div>
                             <div className="text-xs font-semibold text-red-600 uppercase tracking-wide mt-1">{option.aiAnalysis}</div>
                          </div>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-auto pt-6 text-xs text-slate-400 text-center">
               Rates are estimates based on current fuel surcharges and available capacity.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};