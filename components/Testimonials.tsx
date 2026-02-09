
import React from 'react';
import { TESTIMONIALS, CLIENT_LOGOS } from '../constants';

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-asphalt-950 overflow-hidden border-b border-zinc-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 uppercase tracking-tighter">Industry Endorsements</h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">Logistics leaders across the SADC region trust us to protect their operations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-asphalt-900 p-8 rounded border border-zinc-800 relative group hover:border-amber-500/50 transition-colors">
              <div className="absolute -top-6 left-8 w-12 h-12 bg-amber-500 rounded flex items-center justify-center text-black text-2xl font-bold italic">"</div>
              <p className="text-lg text-zinc-400 mb-8 italic leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center space-x-4">
                <img src={t.image} alt={t.name} className="w-14 h-14 rounded grayscale group-hover:grayscale-0 transition-all duration-500 border-2 border-zinc-800" />
                <div>
                  <h4 className="font-bold text-white uppercase tracking-tight">{t.name}</h4>
                  <p className="text-xs text-zinc-600 uppercase font-black">{t.position}, {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center items-center gap-16 opacity-30 grayscale contrast-125">
          {CLIENT_LOGOS.map((logo, idx) => (
            <img key={idx} src={logo} alt="Client Logo" className="h-6 md:h-10 w-auto" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
