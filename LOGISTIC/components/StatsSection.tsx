import React, { useState, useEffect } from 'react';
import { RunningBoxIcon, WorldBoxIcon, ParcelCheckIcon, PartnersIcon } from './Icons';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const AnimatedCounter = ({ value, isVisible }: { value: string; isVisible: boolean }) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  // Extract numeric part and non-numeric part (suffix)
  // Example: "30k+" -> target: 30, suffix: "k+"
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : '';

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp: number | null = null;
    const duration = 2000; // 2 seconds animation

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Ease out quart function for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setDisplayValue(Math.floor(easeOutQuart * target));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [isVisible, target]);

  return (
    <span>
      {displayValue}{suffix}
    </span>
  );
};

export const StatsSection: React.FC = () => {
  const { elementRef, isVisible } = useScrollAnimation(0.2);

  const stats = [
    {
      value: "100+",
      label: "People working",
      icon: <RunningBoxIcon className="w-8 h-8 text-red-600" />,
      delay: 0
    },
    {
      value: "180+",
      label: "Countries & territories",
      icon: <WorldBoxIcon className="w-8 h-8 text-red-600" />,
      delay: 150
    },
    {
      value: "30k+",
      label: "Parcels delivered",
      icon: <ParcelCheckIcon className="w-8 h-8 text-red-600" />,
      delay: 300
    },
    {
      value: "40+",
      label: "Partners",
      icon: <PartnersIcon className="w-8 h-8 text-red-600" />,
      delay: 450
    }
  ];

  return (
    <section ref={elementRef} className="py-24 bg-white relative overflow-hidden">
      {/* Background Map Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/2/2f/World_map_dots_grey.svg')] bg-center bg-no-repeat bg-contain"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Content */}
        <div className={`text-center mb-20 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
           <div className="flex flex-col items-center justify-center mb-6">
              <div className="flex space-x-1 mb-2">
                 <span className="w-2 h-2 bg-red-600 transform rotate-45"></span>
                 <span className="w-2 h-2 bg-red-600 transform rotate-45"></span>
              </div>
              <div className="border border-slate-300 px-6 py-2 bg-white/50 backdrop-blur-sm">
                 <span className="text-sm font-bold tracking-[0.2em] text-slate-800 uppercase">We Deliver On Time</span>
              </div>
           </div>
           
           <h2 className="text-3xl md:text-5xl font-bold text-slate-900 max-w-2xl mx-auto leading-tight">
             Total coverage & flexibility in exports & imports
           </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, index) => (
             <div 
               key={index}
               className={`flex flex-col items-center justify-center p-8 bg-white border border-slate-100 rounded-lg shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:border-red-100 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
               style={{ transitionDelay: `${item.delay}ms` }}
             >
                <div className="w-20 h-20 bg-slate-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-50 transition-colors">
                   {item.icon}
                </div>
                <div className="text-4xl font-extrabold text-slate-900 mb-2">
                   <AnimatedCounter value={item.value} isVisible={isVisible} />
                </div>
                <div className="text-slate-500 font-medium text-center">{item.label}</div>
             </div>
          ))}
        </div>

      </div>
    </section>
  );
};