
import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import FunnelFlow from './components/FunnelFlow';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import ChatWidget from './components/ChatWidget';
import { getRiskInsights } from './services/geminiService';
import { FunnelState } from './types';

const App: React.FC = () => {
  const [funnelData, setFunnelData] = useState<FunnelState | null>(null);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [abVariant, setAbVariant] = useState<'A' | 'B'>('A');

  useEffect(() => {
    setAbVariant(Math.random() > 0.5 ? 'A' : 'B');
  }, []);

  const handleFunnelComplete = async (data: FunnelState) => {
    setFunnelData(data);
    const insight = await getRiskInsights(data);
    setAiInsight(insight);
  };

  return (
    <div className="min-h-screen selection:bg-amber-400 selection:text-zinc-950">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-asphalt-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-asphalt-950/90 z-10"></div>
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500 glow-blob rounded-full"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-zinc-700 glow-blob rounded-full"></div>
          <img 
            src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=2000" 
            alt="Premium Logistics" 
            className="w-full h-full object-cover opacity-20 contrast-125 grayscale"
          />
        </div>

        <div className="container mx-auto px-6 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded text-amber-500 font-bold tracking-widest text-[10px] uppercase">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                  <span>Free 15-Minute Risk Snapshot</span>
                </div>
                
                <h1 className="text-6xl md:text-8xl font-display font-black text-white leading-[1.05] tracking-tight">
                  {abVariant === 'A' ? (
                    <>Better Insurance for <span className="text-amber-400">Logistics.</span></>
                  ) : (
                    <>Secure Your Fleet with <span className="text-amber-400">Expert Cover.</span></>
                  )}
                </h1>

                <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl leading-relaxed font-light">
                  We help South African transport businesses lower their risks. Get a free assessment today and let us connect you with a specialist broker who understands your fleet.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <a 
                  href="#assessment" 
                  className="group relative inline-flex items-center justify-center px-10 py-5 bg-gradient-to-br from-amber-400 to-amber-600 text-black font-black text-xl rounded transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(251,191,36,0.25)] active:scale-95 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center uppercase tracking-tighter">
                    Book My Free Risk Review
                    <svg className="ml-3 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 w-1/2 h-full bg-white/30 skew-x-[-25deg] -translate-x-[150%] group-hover:animate-shimmer-sweep transition-none"></div>
                </a>
              </div>
              
              {aiInsight && (
                <div className="p-6 bg-zinc-900/60 backdrop-blur-xl border-l-4 border-amber-500 rounded-r animate-fade-in shadow-2xl max-w-2xl">
                  <div className="flex items-start space-x-4">
                    <div className="bg-amber-500/20 p-2 rounded text-amber-500">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-amber-500 font-bold text-sm uppercase tracking-tighter mb-1">Your Risk Insights</h4>
                      <p className="text-white text-lg leading-relaxed italic">{aiInsight}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-5 relative">
              <div className="float relative z-10">
                <div className="absolute -inset-0.5 bg-gradient-to-tr from-amber-500 to-zinc-800 rounded blur opacity-20"></div>
                <FunnelFlow onComplete={handleFunnelComplete} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-asphalt-950 py-12 border-b border-zinc-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-[10px] text-zinc-500 uppercase font-black tracking-[0.2em] gap-8">
            <div className="flex items-center space-x-4">
              <span className="w-8 h-[1px] bg-zinc-800"></span>
              <span>We Connect You With Top Experts From</span>
            </div>
            <div className="flex gap-12 grayscale opacity-50">
              <span className="hover:opacity-100 transition cursor-default">Sanlam Network</span>
              <span className="hover:opacity-100 transition cursor-default">Old Mutual</span>
              <span className="hover:opacity-100 transition cursor-default">Santam</span>
              <span className="hover:opacity-100 transition cursor-default">Discovery Business</span>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <FAQ />

      {/* Footer & Disclaimer */}
      <footer className="bg-asphalt-950 py-24 border-t border-zinc-900 relative">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-20">
            <h2 className="text-5xl font-display font-bold text-white mb-6 uppercase tracking-tighter">Let's Protect Your Fleet</h2>
            <p className="text-xl text-zinc-500 max-w-2xl mx-auto mb-10">
              We look at your data and match you with the right insurance professional. Simple, fast, and secure.
            </p>
            <button className="group relative px-16 py-8 bg-zinc-100 text-asphalt-950 font-black text-2xl rounded transition-all duration-500 hover:scale-105 hover:bg-amber-400 hover:shadow-[0_0_60px_rgba(251,191,36,0.3)] shadow-2xl flex items-center mx-auto overflow-hidden uppercase tracking-tighter">
              <span className="relative z-10">
                Talk to a Specialist
              </span>
            </button>
          </div>

          {/* Legal Disclaimer Box */}
          <div className="max-w-4xl mx-auto p-8 border border-zinc-800 bg-zinc-900/30 rounded text-left mb-20">
            <h4 className="text-amber-500 font-black text-xs uppercase tracking-widest mb-4 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Important Notice
            </h4>
            <p className="text-zinc-600 text-xs leading-relaxed font-medium">
              LogiGuard Premium helps you find the right insurance. We are not an insurance company and we do not provide financial advice ourselves.
              <br/><br/>
              Our job is to analyze your risk and introduce you to licensed South African brokers or financial advisors. They will be the ones to give you advice and help you with your insurance policy.
            </p>
          </div>

          <div className="pt-12 border-t border-zinc-900/50 flex flex-col md:flex-row justify-between items-center text-zinc-600 text-[10px] gap-6 tracking-widest uppercase font-bold">
            <div>&copy; 2024 LogiGuard Premium SA. Helping You Secure Your Future.</div>
            <div className="flex space-x-12">
              <a href="#" className="hover:text-amber-500 transition">Broker Area</a>
              <a href="#" className="hover:text-amber-500 transition">Legal</a>
              <a href="#" className="hover:text-amber-500 transition">Privacy</a>
            </div>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
};

export default App;
