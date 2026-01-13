import React, { useState } from 'react';
import { PackageIcon } from './Icons';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="bg-red-600 p-2 rounded-lg">
              <PackageIcon className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">NEXUS<span className="text-red-600">LOGISTICS</span></span>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#services" className="text-slate-600 hover:text-red-600 font-medium transition-colors">Solutions</a>
            <a href="#tracking" className="text-slate-600 hover:text-red-600 font-medium transition-colors">Tracking</a>
            <a href="#ai-quote" className="text-slate-600 hover:text-red-600 font-medium transition-colors">Freight Quote</a>
            <a href="#about" className="text-slate-600 hover:text-red-600 font-medium transition-colors">Company</a>
            <a href="#contact" className="text-slate-600 hover:text-red-600 font-medium transition-colors">Contact</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button className="text-slate-900 font-medium hover:text-red-600 transition-colors">Client Login</button>
            <a href="#tracking" className="bg-slate-900 text-white px-6 py-2.5 rounded-sm font-medium hover:bg-red-700 transition-colors shadow-lg shadow-slate-900/10 uppercase tracking-wide text-sm">
              Track Order
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <a href="#services" className="block px-3 py-2 text-slate-600 hover:text-red-600 font-medium">Solutions</a>
            <a href="#tracking" className="block px-3 py-2 text-slate-600 hover:text-red-600 font-medium">Tracking</a>
            <a href="#ai-quote" className="block px-3 py-2 text-slate-600 hover:text-red-600 font-medium">Freight Quote</a>
            <a href="#about" className="block px-3 py-2 text-slate-600 hover:text-red-600 font-medium">Company</a>
            <a href="#contact" className="block px-3 py-2 text-slate-600 hover:text-red-600 font-medium">Contact</a>
            <div className="pt-4 flex flex-col space-y-3">
               <button className="w-full text-center text-slate-900 font-medium py-2 border border-slate-200 rounded-sm">Client Login</button>
               <a href="#tracking" className="w-full text-center bg-red-600 hover:bg-red-700 text-white py-2 rounded-sm font-medium uppercase text-sm">Track Order</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};