import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const VisualShowcase: React.FC = () => {
  const { elementRef, isVisible } = useScrollAnimation(0.2);

  return (
    <section ref={elementRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid md:grid-cols-2 gap-8 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          
          {/* Truck Image Card */}
          <div className="group relative h-[500px] rounded-2xl overflow-hidden shadow-2xl cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1600" 
              alt="Nexus Logistics Truck Fleet" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90"></div>
            
            <div className="absolute bottom-0 left-0 p-8 lg:p-10 w-full">
              <div className="flex items-center gap-2 mb-4">
                 <div className="p-2 bg-red-600 rounded-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                 </div>
                 <span className="text-red-400 font-bold uppercase tracking-wider text-xs">Ground Fleet</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">Nationwide Trucking</h3>
              <p className="text-slate-200 mb-8 max-w-md text-lg leading-relaxed">
                Our fleet of electric and hybrid semi-trucks connects major hubs across 48 states, ensuring 2-day delivery with 60% less emissions.
              </p>
              <button className="flex items-center gap-2 text-white font-bold group-hover:text-red-400 transition-colors uppercase tracking-wide text-sm">
                View Ground Solutions <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>

          {/* Airplane Image Card */}
          <div className="group relative h-[500px] rounded-2xl overflow-hidden shadow-2xl cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&q=80&w=1600" 
              alt="Nexus Air Cargo Plane" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90"></div>
            
            <div className="absolute bottom-0 left-0 p-8 lg:p-10 w-full">
              <div className="flex items-center gap-2 mb-4">
                 <div className="p-2 bg-blue-600 rounded-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                 </div>
                 <span className="text-blue-400 font-bold uppercase tracking-wider text-xs">Air Cargo</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">Global Air Freight</h3>
              <p className="text-slate-200 mb-8 max-w-md text-lg leading-relaxed">
                Rapid international shipping via our dedicated cargo planes. Connect your business to global markets with next-day air reliability.
              </p>
              <button className="flex items-center gap-2 text-white font-bold group-hover:text-blue-400 transition-colors uppercase tracking-wide text-sm">
                View Air Solutions <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};