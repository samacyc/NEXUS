import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrackingSection } from './components/TrackingSection';
import { VisualShowcase } from './components/VisualShowcase';
import { Solutions } from './components/Solutions';
import { StatsSection } from './components/StatsSection';
import { Features } from './components/Features';
import { Testimonials } from './components/Testimonials';
import { ShippingCalculator } from './components/ShippingCalculator';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-red-200 selection:text-red-900">
      <Header />
      
      <main className="flex flex-col">
        <Hero />
        <TrackingSection />
        
        {/* Visual Showcase with Trucks/Planes */}
        <VisualShowcase />

        {/* Top-Notch Solutions Section */}
        <Solutions />

        {/* Statistics & Coverage Section */}
        <StatsSection />

        <Features />
        
        {/* Testimonials Section */}
        <Testimonials />
        
        {/* Shipping Calculator Section */}
        <div id="ai-quote">
           <ShippingCalculator />
        </div>
        
        {/* About Section Teaser */}
        <section id="about" className="py-24 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
             <div>
                <img 
                   src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=1600" 
                   alt="Sustainable Warehouse" 
                   className="rounded-lg shadow-2xl transition-all duration-700 hover:scale-105"
                />
             </div>
             <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-900">Logistics for the Planet</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                   Founded in 2024, Nexus Logistics was born from a simple belief: fast shipping shouldn't cost the Earth. We are building the world's most sustainable supply chain network.
                </p>
                <p className="text-slate-600 text-lg leading-relaxed">
                   By vertically integrating technology with our physical electric infrastructure, we provide merchants with the speed they need and the sustainability their customers demand.
                </p>
                <div className="pt-4">
                   <a href="#" className="text-red-600 font-bold hover:text-red-700 flex items-center gap-2 group uppercase tracking-wide text-sm">
                      Our Sustainability Report 
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                   </a>
                </div>
             </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <ContactForm />
      </main>

      <Footer />
    </div>
  );
}

export default App;