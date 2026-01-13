import React from 'react';
import { PlaneIcon, GlobeIcon, ShieldCheckIcon } from './Icons';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const Features: React.FC = () => {
  const { elementRef, isVisible } = useScrollAnimation(0.2);

  const features = [
    {
      icon: <GlobeIcon className="w-8 h-8 text-red-600" />,
      title: "Omnichannel Fulfillment",
      description: "Unified inventory management for B2B wholesale and B2C direct-to-consumer. Pick, pack, and ship from a single dashboard."
    },
    {
      icon: <PlaneIcon className="w-8 h-8 text-red-600" />, 
      title: "Electric Last Mile",
      description: "Delight your eco-conscious customers. Our proprietary EV fleet in major metro areas reduces carbon emissions by up to 100%."
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8 text-red-600" />,
      title: "Smart Warehousing",
      description: "Our robotics-enabled micro-fulfillment centers position your products closer to customers for faster, cheaper 2-day delivery."
    }
  ];

  return (
    <section id="services" className="py-24 bg-white" ref={elementRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
           <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Logistics That Builds Brands</h2>
           <p className="mt-4 text-xl text-slate-600">End-to-end supply chain solutions designed for the modern merchant.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className={`bg-slate-50 rounded-xl p-8 hover:shadow-xl transition-all duration-700 border border-slate-200 group transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="bg-white w-16 h-16 rounded-lg flex items-center justify-center shadow-sm mb-6 border border-slate-100 group-hover:border-red-100 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className={`mt-20 bg-slate-900 rounded-xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
           <div className="relative z-10 max-w-xl">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to go carbon neutral?</h3>
              <p className="text-slate-400">Join forward-thinking brands like Allbirds and Glossier who trust Nexus for sustainable fulfillment.</p>
           </div>
           <div className="relative z-10">
              <button className="bg-red-700 hover:bg-red-600 text-white px-8 py-3 rounded-sm font-bold transition-all shadow-lg shadow-red-900/50 uppercase tracking-wide text-sm transform hover:scale-105">
                Get a Quote
              </button>
           </div>
           
           {/* Decorative circles */}
           <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-slate-800 rounded-full opacity-50 animate-pulse"></div>
           <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-red-900 rounded-full opacity-20"></div>
        </div>
      </div>
    </section>
  );
};