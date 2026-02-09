
import React, { useState, useEffect } from 'react';

const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-asphalt-950/90 backdrop-blur-md py-4 border-b border-zinc-900' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-amber-500 rounded flex items-center justify-center font-black text-black">LG</div>
          <span className="text-2xl font-black tracking-tighter text-white">LOGI<span className="text-amber-500">GUARD</span> <span className="text-[10px] font-bold text-zinc-600 tracking-[0.3em] hidden lg:inline ml-2">PREMIUM</span></span>
        </div>
        
        <div className="hidden md:flex items-center space-x-10 text-[11px] font-bold uppercase tracking-[0.2em]">
          <a href="#" className="text-zinc-400 hover:text-amber-500 transition">Solutions</a>
          <a href="#faq" className="text-zinc-400 hover:text-amber-500 transition">Questions</a>
          <a href="#" className="text-zinc-400 hover:text-amber-500 transition">About Us</a>
          <a href="#assessment" className="px-6 py-2 border border-amber-500/50 text-amber-500 hover:bg-amber-500 hover:text-black transition rounded font-black tracking-widest">
            Free Quote
          </a>
        </div>

        <button className="md:hidden text-zinc-300">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
