import React, { useState } from 'react';
import { PhoneIcon, MailIcon, MapPinIcon } from './Icons';

export const ContactForm: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    inquiryType: 'Sales Inquiry',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', company: '', inquiryType: 'Sales Inquiry', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-red-900/5 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <span className="text-red-500 font-bold tracking-widest text-xs uppercase mb-2 block">Contact Us</span>
              <h2 className="text-4xl font-bold mb-6">Partner with Nexus</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Ready to modernize your supply chain? Our team of logistics experts is here to build a custom solution for your brand.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-slate-800 p-3 rounded-lg">
                  <MapPinIcon className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Headquarters</h4>
                  <p className="text-slate-400">1200 Logistics Way, Suite 400<br/>San Francisco, CA 94107</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-slate-800 p-3 rounded-lg">
                  <PhoneIcon className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Phone</h4>
                  <p className="text-slate-400">+1 (888) 555-0123</p>
                  <p className="text-xs text-slate-500 mt-1">Mon-Fri, 9am - 6pm PST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-slate-800 p-3 rounded-lg">
                  <MailIcon className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Email</h4>
                  <p className="text-slate-400">sales@nexuslogistics.com</p>
                  <p className="text-slate-400">support@nexuslogistics.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-2xl text-slate-900">
             {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                   <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                   </div>
                   <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                   <p className="text-slate-600">Thank you for contacting Nexus Logistics. A representative will reach out to you within 24 hours.</p>
                   <button onClick={() => setStatus('idle')} className="mt-8 text-red-600 font-bold hover:text-red-700">Send another message</button>
                </div>
             ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a message</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-slate-700">Full Name</label>
                      <input 
                        required
                        type="text" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                        placeholder="Jane Doe"
                        value={form.name}
                        onChange={(e) => setForm({...form, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-slate-700">Work Email</label>
                      <input 
                        required
                        type="email" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                        placeholder="jane@company.com"
                        value={form.email}
                        onChange={(e) => setForm({...form, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-slate-700">Company Name</label>
                      <input 
                        required
                        type="text" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                        placeholder="Acme Inc."
                        value={form.company}
                        onChange={(e) => setForm({...form, company: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-slate-700">Inquiry Type</label>
                      <div className="relative">
                        <select 
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                          value={form.inquiryType}
                          onChange={(e) => setForm({...form, inquiryType: e.target.value})}
                        >
                          <option>Sales Inquiry</option>
                          <option>Customer Support</option>
                          <option>Partnership</option>
                          <option>Careers</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-700">Message</label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Tell us about your shipping needs..."
                      value={form.message}
                      onChange={(e) => setForm({...form, message: e.target.value})}
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg transition-all shadow-lg shadow-red-900/20 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center uppercase tracking-wide text-sm"
                  >
                    {status === 'submitting' ? (
                       <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          Sending...
                       </span>
                    ) : "Send Message"}
                  </button>
                </form>
             )}
          </div>

        </div>
      </div>
    </section>
  );
};