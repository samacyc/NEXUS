import React from 'react';
import { ArrowRightIcon } from './Icons';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-900">
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
         <img 
            src="./BG1.jpg" 
            alt="Logistics Network Background" 
            className="w-full h-full object-cover opacity-10"
         />
      </div>

      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-red-600 rounded-full blur-[100px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-600 rounded-full blur-[100px] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 shadow-sm opacity-0 animate-fade-in-up">
              <span className="bg-green-500 w-2 h-2 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-slate-100 uppercase tracking-wide">Carbon Neutral Fulfillment</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] opacity-0 animate-fade-in-up animation-delay-100">
              The OS for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">Sustainable Commerce</span>
            </h1>
            
            <p className="text-lg text-slate-300 max-w-xl leading-relaxed opacity-0 animate-fade-in-up animation-delay-200">
              Nexus Logistics powers high-growth brands with an all-electric last mile fleet, smart distributed warehousing, and an obsession with customer experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up animation-delay-300">
              <a href="#ai-quote" className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-sm font-bold transition-all shadow-xl shadow-red-900/20 uppercase tracking-wide text-sm transform hover:translate-y-[-2px]">
                <span>Start Fulfillment</span>
                <ArrowRightIcon className="w-5 h-5" />
              </a>
              <a href="#about" className="flex items-center justify-center space-x-2 bg-transparent hover:bg-white/10 text-white border border-white/20 px-8 py-4 rounded-sm font-bold transition-all uppercase tracking-wide text-sm">
                <span>Our Network</span>
              </a>
            </div>

            <div className="pt-8 flex items-center gap-6 text-sm text-slate-400 font-medium opacity-0 animate-fade-in-up animation-delay-500">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                <span>Electric Fleet</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                <span>Plastic-Free Options</span>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block opacity-0 animate-fade-in-up animation-delay-300">
             <div className="bg-white rounded-xl shadow-2xl p-6 relative z-10 border-t-4 border-red-600 transform rotate-2 hover:rotate-0 transition-transform duration-500 hover:shadow-red-900/10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-slate-900 text-white rounded-md flex items-center justify-center">
                       <span className="font-bold">NX</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 uppercase">Order #9921-EV</p>
                      <p className="text-xs text-slate-500">Out for Delivery • Electric Van</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider">Zero Emissions</span>
                </div>
                
                {/* Simulated Map Graphic */}
                <div className="bg-slate-100 h-48 rounded-lg w-full mb-6 relative overflow-hidden border border-slate-200 group cursor-crosshair">
                    <div className="absolute top-10 left-10 w-3 h-3 bg-red-600 rounded-full z-10 ring-4 ring-red-100"></div>
                    <div className="absolute bottom-10 right-20 w-3 h-3 bg-slate-400 rounded-full z-10"></div>
                    
                    <svg className="absolute inset-0 w-full h-full text-slate-300" strokeDasharray="4 4">
                       <path d="M52 52 Q 150 150 280 150" stroke="currentColor" strokeWidth="2" fill="none" className="group-hover:stroke-slate-400 transition-colors duration-500" />
                    </svg>
                    
                    {/* Animated Truck/Dot */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-900 p-2 rounded-sm shadow-lg border border-slate-800 animate-bounce">
                       <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.185a2.984 2.984 0 005.63 0h2.37a2.984 2.984 0 005.63 0H19a1 1 0 001-1v-5l-4.202-5.96A1 1 0 0015 8H8V4H3z"/></svg>
                    </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">Status</span>
                    <span className="font-bold text-slate-900">Arriving by 2:00 PM</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-red-600 w-3/4 rounded-full"></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 font-bold uppercase">
                    <span>Micro-Hub NY</span>
                    <span>Brooklyn, NY</span>
                  </div>
                </div>
             </div>
             
             {/* Decorative Elements behind card */}
             <div className="absolute top-10 -right-10 w-20 h-20 bg-slate-800 rounded-lg -z-10 rotate-12 opacity-50 animate-pulse"></div>
             <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-red-600 rounded-full -z-10 blur-xl opacity-30"></div>
          </div>

        </div>
      </div>
    </section>
  );
};