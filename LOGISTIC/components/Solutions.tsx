import React from 'react';
import { PlaneShapeIcon, TruckIcon, PackageIcon, GlobeIcon } from './Icons';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const Solutions: React.FC = () => {
  const { elementRef, isVisible } = useScrollAnimation(0.2);

  const solutions = [
    {
      title: "Cross-border B2C Lines",
      icon: <PlaneShapeIcon className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800",
      delay: 0
    },
    {
      title: "FBA Logistics",
      icon: <TruckIcon className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
      delay: 100
    },
    {
      title: "Postal Parcel",
      icon: <PackageIcon className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=800",
      delay: 200
    },
    {
      title: "International Express",
      icon: <GlobeIcon className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1494412574643-35d324698420?auto=format&fit=crop&q=80&w=800",
      delay: 300
    }
  ];

  return (
    <section ref={elementRef} className="relative py-24 overflow-hidden bg-gradient-to-br from-red-700 via-red-600 to-red-800">
      
      {/* Background Texture/Image Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
         <img 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000" 
            alt="Container Background" 
            className="w-full h-full object-cover grayscale mix-blend-multiply"
         />
      </div>

      {/* Moving Airplane Animation */}
      <div className="absolute top-0 left-0 w-full h-64 pointer-events-none overflow-hidden z-0">
         <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path 
              id="planePath" 
              d="M-100,200 C300,100 600,300 900,150 S1500,50 1600,100" 
              fill="none" 
              stroke="rgba(255,255,255,0.3)" 
              strokeWidth="2" 
              strokeDasharray="8 8"
            />
            <circle r="4" fill="white" opacity="0.5">
               <animateMotion dur="15s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#planePath"/>
               </animateMotion>
            </circle>
            <g>
               <foreignObject width="40" height="40" x="-20" y="-20">
                  <div className="transform rotate-45 text-white drop-shadow-lg">
                    <PlaneShapeIcon className="w-10 h-10" />
                  </div>
               </foreignObject>
               <animateMotion dur="15s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#planePath"/>
               </animateMotion>
            </g>
         </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 border border-red-400 bg-red-800/50 backdrop-blur-sm px-6 py-1 rounded-sm mb-6">
             <span className="text-red-300 text-xs font-bold tracking-widest">»</span>
             <span className="text-white text-xs font-bold tracking-[0.2em] uppercase">Products</span>
             <span className="text-red-300 text-xs font-bold tracking-widest">«</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-md">Top-notch transportation solutions.</h2>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((item, index) => (
            <div 
               key={index}
               className={`group bg-white rounded-sm overflow-hidden shadow-2xl transition-all duration-700 transform hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
               style={{ transitionDelay: `${item.delay}ms` }}
            >
              {/* Image Section */}
              <div className="h-48 overflow-hidden relative">
                 <img 
                   src={item.image} 
                   alt={item.title} 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                 />
                 <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
              </div>

              {/* Content Section */}
              <div className="relative p-6 pt-10 bg-white">
                 {/* Floating Red Icon Box */}
                 <div className="absolute -top-6 left-6 w-12 h-12 bg-red-600 text-white flex items-center justify-center shadow-lg rounded-sm group-hover:bg-red-700 transition-colors">
                    {item.icon}
                 </div>

                 <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors leading-tight mb-2">
                    {item.title}
                 </h3>

                 {/* Decorative Chevron Arrows on Right */}
                 <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-300">
                    <div className="flex flex-col items-center space-y-[-4px]">
                       <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                       <svg className="w-4 h-4 text-red-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                       <svg className="w-4 h-4 text-red-500/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                 </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};