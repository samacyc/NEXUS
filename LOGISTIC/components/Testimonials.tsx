import React, { useState, useEffect } from 'react';
import { QuoteIcon } from './Icons';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const testimonials = [
  {
    quote: "Nexus Logistics transformed our supply chain. The EV fleet integration was seamless and our customers love the carbon-neutral delivery option.",
    author: "Sarah Jenkins",
    role: "Director of Operations",
    company: "EcoWear Inc."
  },
  {
    quote: "We reduced our shipping costs by 18% while simultaneously lowering our carbon footprint. The AI routing is genuinely game-changing.",
    author: "Marcus Chen",
    role: "Supply Chain Lead",
    company: "TechFlow Solutions"
  },
  {
    quote: "The reliability has been unmatched. During peak season, Nexus scaled with us effortlessly. Finally, a carrier that feels like a partner.",
    author: "Elena Rodriguez",
    role: "CEO",
    company: "Bloom & Wild"
  }
];

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { elementRef, isVisible } = useScrollAnimation(0.3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden relative" ref={elementRef}>
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-1/2 -left-1/4 w-full h-full bg-red-600 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-red-500 font-bold tracking-widest text-xs uppercase mb-2 block">Our Partners</span>
          <h2 className="text-3xl font-bold sm:text-4xl">Trusted by Industry Leaders</h2>
        </div>

        <div className={`max-w-4xl mx-auto transition-all duration-700 delay-200 transform ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="relative min-h-[300px] flex items-center justify-center">
            {testimonials.map((item, index) => (
              <div 
                key={index}
                className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-700 ease-in-out transform ${
                  index === currentIndex 
                    ? "opacity-100 translate-x-0 scale-100" 
                    : "opacity-0 translate-x-8 scale-95 pointer-events-none"
                }`}
              >
                <div className="mb-8 text-red-500 opacity-50">
                  <QuoteIcon className="w-12 h-12" />
                </div>
                
                <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-8 text-slate-100">
                  "{item.quote}"
                </blockquote>
                
                <div className="space-y-1">
                  <div className="font-bold text-lg text-white">{item.author}</div>
                  <div className="text-sm text-slate-400 font-medium tracking-wide">
                    {item.role}, <span className="text-red-400">{item.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12 gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-red-500 w-8" : "bg-slate-700 hover:bg-slate-600"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};