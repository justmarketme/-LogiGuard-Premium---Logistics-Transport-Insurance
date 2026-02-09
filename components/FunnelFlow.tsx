
import React, { useState } from 'react';
import { FunnelStep, FunnelState } from '../types';

interface FunnelFlowProps {
  onComplete: (data: FunnelState) => void;
}

const FunnelFlow: React.FC<FunnelFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState<FunnelStep>(FunnelStep.INITIAL);
  const [formData, setFormData] = useState<FunnelState>({
    hasInsurance: null,
    premiumRange: null,
    reason: null,
    timeline: null,
    completed: false,
    contactInfo: { name: '', email: '', phone: '', fleetSize: '' }
  });

  const updateField = (field: keyof FunnelState | keyof FunnelState['contactInfo'], value: string) => {
    if (field in formData.contactInfo) {
      setFormData(prev => ({
        ...prev,
        contactInfo: { ...prev.contactInfo, [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const nextStep = (currentStep: FunnelStep) => {
    switch (currentStep) {
      case FunnelStep.INITIAL: setStep(FunnelStep.PREMIUM); break;
      case FunnelStep.PREMIUM: setStep(FunnelStep.REASON); break;
      case FunnelStep.REASON: setStep(FunnelStep.TIMELINE); break;
      case FunnelStep.TIMELINE: setStep(FunnelStep.CONTACT); break;
      case FunnelStep.CONTACT: 
        setFormData(prev => ({ ...prev, completed: true }));
        onComplete({ ...formData, completed: true });
        setStep(FunnelStep.SUCCESS);
        break;
    }
  };

  const renderStep = () => {
    switch (step) {
      case FunnelStep.INITIAL:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">Do you have business insurance now?</h3>
            <div className="grid grid-cols-1 gap-3">
              {['Yes, I am fully covered', 'No, I am looking for cover', 'I only have some cover'].map(opt => (
                <button
                  key={opt}
                  onClick={() => { updateField('hasInsurance', opt); nextStep(FunnelStep.INITIAL); }}
                  className="p-5 bg-asphalt-900 border border-zinc-800 hover:border-amber-500 hover:bg-asphalt-800 transition rounded text-left group flex justify-between items-center"
                >
                  <span className="font-medium text-zinc-300 group-hover:text-white">{opt}</span>
                  <div className="w-4 h-4 rounded-full border border-zinc-700 group-hover:border-amber-500"></div>
                </button>
              ))}
            </div>
          </div>
        );
      case FunnelStep.PREMIUM:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">What do you pay monthly for insurance?</h3>
            <div className="grid grid-cols-1 gap-3">
              {['R0 - R10,000', 'R10,000 - R50,000', 'R50,000 - R150,000', 'Over R150,000'].map(opt => (
                <button
                  key={opt}
                  onClick={() => { updateField('premiumRange', opt); nextStep(FunnelStep.PREMIUM); }}
                  className="p-5 bg-asphalt-900 border border-zinc-800 hover:border-amber-500 hover:bg-asphalt-800 transition rounded text-left"
                >
                  <span className="font-medium text-zinc-300">{opt}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case FunnelStep.REASON:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">Why are you looking for a new provider?</h3>
            <div className="grid grid-cols-1 gap-3">
              {['Save money on premiums', 'Better claims service', 'Better benefits', 'I need specialized transport cover'].map(opt => (
                <button
                  key={opt}
                  onClick={() => { updateField('reason', opt); nextStep(FunnelStep.REASON); }}
                  className="p-5 bg-asphalt-900 border border-zinc-800 hover:border-amber-500 hover:bg-asphalt-800 transition rounded text-left"
                >
                  <span className="font-medium text-zinc-300">{opt}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case FunnelStep.TIMELINE:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">When would you like to switch?</h3>
            <div className="grid grid-cols-1 gap-3">
              {['Right away', 'Within a month', 'In a few months', 'Just browsing for now'].map(opt => (
                <button
                  key={opt}
                  onClick={() => { updateField('timeline', opt); nextStep(FunnelStep.TIMELINE); }}
                  className="p-5 bg-asphalt-900 border border-zinc-800 hover:border-amber-500 hover:bg-asphalt-800 transition rounded text-left"
                >
                  <span className="font-medium text-zinc-300">{opt}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case FunnelStep.CONTACT:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">Where should we send your results?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Your Name"
                className="p-4 bg-asphalt-900 border border-zinc-800 rounded focus:ring-2 focus:ring-amber-500 outline-none text-white placeholder-zinc-600"
                value={formData.contactInfo.name}
                onChange={(e) => updateField('name', e.target.value)}
              />
              <input
                type="email"
                placeholder="Email Address"
                className="p-4 bg-asphalt-900 border border-zinc-800 rounded focus:ring-2 focus:ring-amber-500 outline-none text-white placeholder-zinc-600"
                value={formData.contactInfo.email}
                onChange={(e) => updateField('email', e.target.value)}
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="p-4 bg-asphalt-900 border border-zinc-800 rounded focus:ring-2 focus:ring-amber-500 outline-none text-white placeholder-zinc-600"
                value={formData.contactInfo.phone}
                onChange={(e) => updateField('phone', e.target.value)}
              />
              <select
                className="p-4 bg-asphalt-900 border border-zinc-800 rounded focus:ring-2 focus:ring-amber-500 outline-none text-white appearance-none"
                value={formData.contactInfo.fleetSize}
                onChange={(e) => updateField('fleetSize', e.target.value)}
              >
                <option value="">Number of Vehicles</option>
                <option value="1-5">1-5 Vehicles</option>
                <option value="6-20">6-20 Vehicles</option>
                <option value="21-50">21-50 Vehicles</option>
                <option value="50+">More than 50</option>
              </select>
            </div>
            <button
              onClick={() => nextStep(FunnelStep.CONTACT)}
              className="group relative w-full py-5 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-black text-lg rounded transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(251,191,36,0.3)] active:scale-95 overflow-hidden uppercase tracking-tighter"
            >
              <span className="relative z-10 flex items-center justify-center">
                Get My Free Results
                <svg className="ml-3 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer-sweep transition-none"></div>
            </button>
            <p className="text-[10px] text-zinc-600 text-center uppercase font-black leading-tight">
              By clicking, you ask us to find you a qualified insurance broker who can help.
            </p>
          </div>
        );
      case FunnelStep.SUCCESS:
        return (
          <div className="text-center py-12 space-y-6">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto text-black text-4xl shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              ✓
            </div>
            <h3 className="text-3xl font-bold text-white uppercase tracking-tighter">Done! We've Got It</h3>
            <p className="text-zinc-500 max-w-md mx-auto">
              We are looking at your info now. A professional broker from our network will call you soon to help you find the best cover.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-asphalt-900/80 backdrop-blur-md p-8 rounded border border-zinc-800/50 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 h-1 bg-amber-500 transition-all duration-500" style={{ width: `${(Object.values(FunnelStep).indexOf(step) + 1) * 20}%` }}></div>
      {renderStep()}
    </div>
  );
};

export default FunnelFlow;
