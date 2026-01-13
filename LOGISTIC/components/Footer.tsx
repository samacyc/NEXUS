import React from 'react';
import { PhoneIcon, MailIcon, MapPinIcon, PackageIcon } from './Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative bg-[#0F172A] pt-40 pb-10 mt-32 border-t-0 font-sans text-slate-300">
       {/* Decorative Background Pattern */}
       <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
             <defs>
                <pattern id="diagonal-stripes" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                   <path d="M0 20L20 0H10L0 10M10 20L20 10V20" stroke="currentColor" strokeWidth="1" fill="none"/>
                </pattern>
             </defs>
             <rect width="100%" height="100%" fill="url(#diagonal-stripes)" />
          </svg>
       </div>

       {/* Floating Red Info Bar */}
       <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl px-4 sm:px-6 lg:px-8 z-20">
         <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg shadow-2xl p-8 lg:p-10 grid md:grid-cols-3 gap-8 items-center relative overflow-hidden">
             {/* Subtle Texture Overlay on Red Bar */}
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
             
             {/* Contact Item 1 */}
             <div className="flex items-center gap-5 relative z-10 group">
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                   <PhoneIcon className="w-7 h-7 text-red-600" />
                </div>
                <div>
                   <h4 className="font-bold text-white text-lg tracking-tight">Call Us Anytime :</h4>
                   <p className="text-red-100 font-medium mt-1">+1 (888) 441-9473</p>
                </div>
             </div>
             
             {/* Contact Item 2 */}
             <div className="flex items-center gap-5 relative z-10 group">
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                   <MailIcon className="w-7 h-7 text-red-600" />
                </div>
                <div>
                   <h4 className="font-bold text-white text-lg tracking-tight">Send Mail :</h4>
                   <p className="text-red-100 font-medium mt-1">support@nexus.com</p>
                </div>
             </div>

             {/* Contact Item 3 */}
             <div className="flex items-center gap-5 relative z-10 group">
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                   <MapPinIcon className="w-7 h-7 text-red-600" />
                </div>
                <div>
                   <h4 className="font-bold text-white text-lg tracking-tight">Our Address :</h4>
                   <p className="text-red-100 font-medium mt-1">12550 Biscayne Blvd, Miami</p>
                </div>
             </div>
         </div>
       </div>

       {/* Main Footer Content */}
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
             
             {/* Column 1: Brand */}
             <div className="space-y-6">
                <div className="flex items-center space-x-2">
                    {/* Stylized Logo to match style */}
                    <div className="bg-white/5 p-2 rounded border border-white/10">
                       <PackageIcon className="text-red-500 w-8 h-8" />
                    </div>
                    <div>
                       <span className="block text-2xl font-black text-white italic tracking-tighter leading-none">NEXUS</span>
                       <span className="block text-xs font-bold text-red-500 tracking-widest uppercase">LOGISTICS</span>
                    </div>
                </div>
                <p className="text-slate-400 leading-relaxed text-sm pr-4">
                   Nexus Logistics LLC, a global logistics leader, providing 100+ options for stable, cost-effective e-commerce services.
                </p>
                {/* Decorative Plane Illustration (CSS/SVG only) */}
                <div className="pt-4 opacity-20">
                   <svg width="100" height="40" viewBox="0 0 100 40" fill="none" stroke="currentColor">
                      <path d="M0 20h80l-10-10m10 10l-10 10" strokeWidth="2" />
                      <path d="M20 20a10 10 0 0 1 10-10h40" strokeWidth="1" strokeDasharray="4 4" />
                   </svg>
                </div>
             </div>

             {/* Column 2: Quick Links */}
             <div>
                <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Quick Links</h3>
                <ul className="space-y-3">
                   {['Home', 'About Us', 'Partners', 'Contact Us', 'Cookies', 'Privacy policy'].map((item) => (
                      <li key={item}>
                         <a href="#" className="flex items-center gap-2 group text-slate-400 hover:text-red-500 transition-colors text-sm font-medium">
                            <span className="text-[10px] text-slate-600 group-hover:text-red-500 transition-colors">❯</span> 
                            {item}
                         </a>
                      </li>
                   ))}
                </ul>
             </div>

             {/* Column 3: Products */}
             <div>
                <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Products</h3>
                <ul className="space-y-3">
                   {['Cross-border B2C Lines', 'FBA', 'Postal parcel', 'International Express', 'Warehousing'].map((item) => (
                      <li key={item}>
                         <a href="#" className="flex items-center gap-2 group text-slate-400 hover:text-red-500 transition-colors text-sm font-medium">
                            <span className="text-[10px] text-slate-600 group-hover:text-red-500 transition-colors">❯</span> 
                            {item}
                         </a>
                      </li>
                   ))}
                </ul>
             </div>

             {/* Column 4: Tracking */}
             <div className="lg:pl-8">
                <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Track your shipment</h3>
                <p className="text-slate-400 text-sm mb-4">Please enter your tracking number.</p>
                <div className="space-y-3">
                   <div className="relative group">
                      <input 
                         type="text" 
                         placeholder="Your tracking number" 
                         className="w-full bg-white text-slate-900 px-4 py-3 pl-10 rounded font-medium focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                      />
                      <PackageIcon className="absolute left-3 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-red-600 transition-colors" />
                   </div>
                   <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded uppercase tracking-wider text-sm transition-all shadow-lg shadow-red-900/50 hover:translate-y-[-2px]">
                      Track Now
                   </button>
                </div>
             </div>
          </div>

          {/* Copyright Bar */}
          <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
             <p className="text-slate-500 text-sm font-medium">© Copyrights 2025 Nexus Logistics All rights reserved.</p>
             <button 
                onClick={scrollToTop}
                className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-all shadow-lg shadow-red-900/40 hover:-translate-y-1 group"
                aria-label="Scroll to top"
             >
                <svg className="w-6 h-6 text-white transform group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
             </button>
          </div>
       </div>
       
       {/* Decorative Side Image (Truck/Plane suggestion) */}
       <div className="absolute right-0 bottom-32 opacity-10 pointer-events-none hidden xl:block">
           {/* Simple abstract shape or SVG to imply vehicle */}
           <svg width="300" height="200" viewBox="0 0 300 200" fill="none" className="text-slate-700">
              <path d="M50 150h200l20-40h-40l-20-40H50v80z" stroke="currentColor" strokeWidth="2" />
              <circle cx="80" cy="150" r="20" stroke="currentColor" strokeWidth="2" />
              <circle cx="220" cy="150" r="20" stroke="currentColor" strokeWidth="2" />
           </svg>
       </div>
    </footer>
  );
};