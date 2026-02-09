
export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  quote: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FunnelState {
  hasInsurance: string | null;
  premiumRange: string | null;
  reason: string | null;
  timeline: string | null;
  completed: boolean;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    fleetSize: string;
  };
}

export enum FunnelStep {
  INITIAL = 'INITIAL',
  PREMIUM = 'PREMIUM',
  REASON = 'REASON',
  TIMELINE = 'TIMELINE',
  CONTACT = 'CONTACT',
  SUCCESS = 'SUCCESS'
}
