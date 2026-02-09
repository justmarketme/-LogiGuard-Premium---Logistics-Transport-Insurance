
import React from 'react';
import { Testimonial, FAQItem } from './types';

export const COLORS = {
  ASPHALT_DEEP: '#09090b',
  ASPHALT_MEDIUM: '#18181b',
  AMBER_SAFETY: '#fbbf24',
  STEEL_SLATE: '#475569',
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Johan van der Merwe',
    position: 'Operations Director',
    company: 'Cape Town Haulage',
    quote: 'LogiGuard really helped us. They looked at our risks and introduced us to a broker who helped us save 15% on our monthly premiums. Very happy with the service.',
    image: 'https://picsum.photos/id/1012/200/200',
  },
  {
    id: '2',
    name: 'Thabo Mbeki Jr.',
    position: 'Owner',
    company: 'Gauteng Freight',
    quote: 'Quick and easy to use. They gave us clear info and connected us with an expert who actually knows about transport insurance.',
    image: 'https://picsum.photos/id/1025/200/200',
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "Are you an insurance company?",
    answer: "No. We help you find insurance. We look at your fleet's risks and then connect you with professional brokers who can help you get the actual cover."
  },
  {
    question: "Do you give financial advice?",
    answer: "No, we don't give advice ourselves. We show you data about your business risks, and then put you in touch with licensed experts who give the real advice."
  },
  {
    question: "Which insurers do you work with?",
    answer: "Our broker partners work with all the big names in South Africa, like Santam, Old Mutual, and Sanlam. This means you get the best options for your business."
  }
];

export const CLIENT_LOGOS = [
  'https://logo.clearbit.com/dhl.com',
  'https://logo.clearbit.com/fedex.com',
  'https://logo.clearbit.com/maersk.com',
  'https://logo.clearbit.com/dbschenker.com'
];
