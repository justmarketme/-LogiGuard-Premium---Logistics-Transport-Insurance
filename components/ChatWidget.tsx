
import React, { useState, useRef, useEffect } from 'react';
import { chatWithAssistant } from '../services/geminiService';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Hi! I am LogiBot. How can I help you with your insurance questions today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    const response = await chatWithAssistant(userMsg, "Logistics Insurance Help");
    setMessages(prev => [...prev, { role: 'bot', text: response }]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 md:w-96 h-[500px] bg-asphalt-900 border border-zinc-800 rounded shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="p-4 bg-asphalt-950 border-b border-zinc-800 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              <span className="font-black text-xs text-white uppercase tracking-widest">Help Chat</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-zinc-600 hover:text-white transition-colors">✕</button>
          </div>

          {/* Simplified Disclaimer */}
          <div className="bg-amber-500/10 border-b border-amber-500/20 p-3">
            <div className="flex items-start space-x-2">
              <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-[10px] text-zinc-400 leading-tight uppercase font-bold tracking-tight">
                <span className="text-amber-500 block mb-0.5">Note: No Advice Given</span>
                LogiBot gives info only. I will connect you with a real person for insurance advice.
              </p>
            </div>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-asphalt-900/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded text-sm tracking-tight leading-relaxed shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-amber-500 text-black font-bold rounded-tr-none' 
                    : 'bg-asphalt-800 text-zinc-300 border border-zinc-800 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-asphalt-800 border border-zinc-800 p-3 rounded rounded-tl-none animate-pulse flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-zinc-800 bg-asphalt-950">
            <div className="flex space-x-2">
              <input
                type="text"
                className="flex-1 bg-asphalt-900 border border-zinc-800 rounded p-2.5 text-white outline-none focus:ring-1 focus:ring-amber-500 text-sm placeholder-zinc-600"
                placeholder="Ask me a question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend} 
                className="bg-amber-500 hover:bg-amber-400 text-black px-4 rounded font-black text-xs uppercase tracking-tighter transition-colors active:scale-95"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-amber-500 rounded flex items-center justify-center shadow-2xl hover:scale-105 transition active:scale-95 animate-subtle-bounce group"
          aria-label="Chat with us"
        >
          <svg className="w-6 h-6 text-black group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
