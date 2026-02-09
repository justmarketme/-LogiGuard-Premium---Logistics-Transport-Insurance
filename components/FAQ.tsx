
import React, { useState } from 'react';
import { FAQS } from '../constants';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-asphalt-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-1/3">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 uppercase tracking-tighter">Operational <br/> Intelligence</h2>
            <p className="text-zinc-500 leading-relaxed">Clarifying the complexities of logistics risk and transit compliance.</p>
          </div>
          <div className="md:w-2/3 space-y-3">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="border border-zinc-800 rounded overflow-hidden transition-all duration-300">
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className={`w-full p-6 flex justify-between items-center text-left transition ${openIndex === idx ? 'bg-asphalt-800' : 'bg-asphalt-900 hover:bg-asphalt-800'}`}
                >
                  <span className={`font-bold text-lg uppercase tracking-tight ${openIndex === idx ? 'text-amber-500' : 'text-zinc-300'}`}>{faq.question}</span>
                  <span className={`text-2xl transition-transform duration-300 ${openIndex === idx ? 'rotate-45 text-amber-500' : 'text-zinc-700'}`}>+</span>
                </button>
                {openIndex === idx && (
                  <div className="p-6 bg-asphalt-800 border-t border-zinc-900 text-zinc-500 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
