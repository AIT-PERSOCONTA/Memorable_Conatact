
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ChevronRight, HelpCircle } from 'lucide-react';

interface SupportChatProps {
  theme: 'light' | 'dark';
}

const FAQ_DATA = [
  {
    question: "What is MemorableContact?",
    answer: "MemorableContact is your digital brain for professional networking. It uses AI to capture names, locations, and context from your casual descriptions of meetings so you never forget a connection again."
  },
  {
    question: "How much does it cost?",
    answer: "We have three tiers: Free (up to 30 contacts), Pro ($19/mo, 300 contacts), and Premium ($49/mo, 1000 contacts). Yearly billing saves you 20%!"
  },
  {
    question: "Who are the founders?",
    answer: "MemorableContact was founded by Amurtha (CEO), with Subashini as Product Manager and Dev as our Lead Developer. We are based in Chennai."
  },
  {
    question: "Is my data private?",
    answer: "Absolutely. All memory entries are encrypted and we follow enterprise-grade security standards. Your data is yours alone."
  }
];

const SupportChat: React.FC<SupportChatProps> = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hello! I'm the MemorableContact Support Assistant. How can I help you today?" }
  ]);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleQuickAction = (faq: typeof FAQ_DATA[0]) => {
    setMessages(prev => [
      ...prev,
      { role: 'user', content: faq.question },
      { role: 'bot', content: faq.answer }
    ]);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`absolute bottom-20 right-0 w-[calc(100vw-2rem)] sm:w-[350px] max-h-[500px] flex flex-col glass rounded-[24px] border shadow-2xl overflow-hidden transition-all duration-300 ${theme === 'dark' ? 'bg-slate-900 border-slate-800 shadow-indigo-500/10' : 'bg-white border-slate-200 shadow-slate-900/5'
              }`}
          >
            {/* Header */}
            <div className="p-4 bg-indigo-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                <span className="font-bold text-sm">Support Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide min-h-[300px]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-xs font-medium leading-relaxed ${msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : (theme === 'dark' ? 'bg-slate-800 text-slate-200 rounded-tl-none' : 'bg-slate-50 text-slate-900 border border-slate-100 rounded-tl-none')
                    }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className={`p-4 border-t space-y-2 ${theme === 'dark' ? 'border-slate-800' : 'border-slate-100'}`}>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Quick Actions</div>
              {FAQ_DATA.map((faq) => (
                <button
                  key={faq.question}
                  onClick={() => handleQuickAction(faq)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-[10px] font-bold border flex items-center justify-between group transition-all ${theme === 'dark' ? 'border-slate-800 hover:bg-slate-800 text-slate-400' : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                >
                  {faq.question}
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.4)] active:scale-95 transition-all"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default SupportChat;
