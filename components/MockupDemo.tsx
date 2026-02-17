
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, MapPin, User, Briefcase, Navigation, Clock } from 'lucide-react';

interface MockupDemoProps {
  theme: 'light' | 'dark';
}

const MockupDemo: React.FC<MockupDemoProps> = ({ theme }) => {
  const fullText = "I met Pradeep, an editor, at the Global Freelancer Festival at Leela Palace, Chennai.";
  const [displayText, setDisplayText] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timeout: any;
    if (displayText.length < fullText.length) {
      timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length + 1));
      }, 50);
    } else if (!isFinished) {
      setIsFinished(true);
      timeout = setTimeout(() => setStep(1), 800);
    }
    return () => clearTimeout(timeout);
  }, [displayText, fullText, isFinished]);

  const isWordVisible = (start: number) => displayText.length >= start;

  return (
    <section className={`relative py-20 px-0 overflow-hidden transition-colors duration-300 md:py-32 md:px-6 ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'}`}>
      {/* Subtle Grid Background */}
      <div className={`absolute inset-0 opacity-[0.03] pointer-events-none ${theme === 'dark' ? 'invert' : ''}`}
        style={{ backgroundImage: `radial-gradient(#4f46e5 0.5px, transparent 0.5px)`, backgroundSize: '1.5rem 1.5rem' }} />

      <div className="responsive-container flex flex-col items-center gap-12 lg:flex-row lg:gap-24 relative z-10">
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-fluid-h2 font-black mb-8 tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Intelligence in <span className="gradient-text">Real-Time</span>
            </h2>
            <p className={`text-xl mb-12 max-w-lg font-medium transition-colors duration-300 leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              MemorableContact doesn't just store text. It understands the architecture of your connections, extracting vital entities as you speak or type.
            </p>

            <div className="flex flex-col gap-5 max-w-md mx-auto lg:mx-0">
              {[
                { icon: <User className="w-5 h-5" />, label: "Entity Extraction", text: "Names and roles identified instantly via NLP." },
                { icon: <Navigation className="w-5 h-5" />, label: "Geo-Context", text: "Venue and city metadata attached automatically." },
                { icon: <Clock className="w-5 h-5" />, label: "Smart Timeline", text: "Every interaction anchored in a searchable graph." }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-start gap-4 p-5 rounded-3xl border transition-all ${theme === 'dark'
                    ? 'border-slate-800/50 bg-slate-900/40 hover:border-indigo-500/30'
                    : 'border-slate-200/50 bg-white shadow-sm hover:border-indigo-400'
                    }`}
                >
                  <div className="p-3 rounded-2xl bg-indigo-600/10 text-indigo-500">{item.icon}</div>
                  <div>
                    <div className={`font-black text-sm uppercase tracking-wider mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{item.label}</div>
                    <div className="text-sm font-medium text-slate-500 leading-snug">{item.text}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 3D iPhone Mockup */}
        <div className="relative w-full max-w-full md:max-w-[25rem] perspective-2000 py-6 md:py-12">
          <motion.div
            initial={{ rotateY: 20, rotateX: 5, scale: 0.9, opacity: 0 }}
            whileInView={{ rotateY: -15, rotateX: 5, scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative mx-auto group"
          >
            {/* Phone Frame - 3D Realistic Style */}
            <div className={`relative w-full max-w-[18.75rem] h-[38.125rem] mx-auto rounded-[3.5rem] border-[12px] shadow-[30px_50px_100px_-20px_rgba(0,0,0,0.6)] transition-colors duration-300 flex flex-col overflow-hidden ${theme === 'dark' ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-white'
              }`}>

              {/* iPhone Hardware Details */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-[1.2rem] z-50 flex items-center justify-center gap-1.5">
                <div className="w-8 h-1 bg-white/10 rounded-full" /> {/* Speaker */}
                <div className="w-1.5 h-1.5 bg-indigo-500/40 rounded-full" /> {/* Camera */}
              </div>

              {/* Side Buttons (Simulated 3D) */}
              <div className="absolute top-24 -left-[14px] w-1 h-12 bg-slate-700 rounded-r-md" /> {/* Volume Up */}
              <div className="absolute top-40 -left-[14px] w-1 h-12 bg-slate-700 rounded-r-md" /> {/* Volume Down */}
              <div className="absolute top-32 -right-[14px] w-1 h-20 bg-slate-700 rounded-l-md" /> {/* Power */}

              {/* Screen Content */}
              <div className="flex-1 flex flex-col p-6 pt-16 overflow-hidden relative">

                {/* Chat Header Mock */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-xs">M</div>
                  <div>
                    <div className="text-[11px] font-black text-indigo-500 uppercase tracking-widest">Memory Engine</div>
                    <div className="text-[9px] text-slate-500 font-bold flex items-center gap-1">
                      <div className="w-1 h-1 bg-green-500 rounded-full" /> Active Process
                    </div>
                  </div>
                </div>

                {/* Message History Mock */}
                <div className="flex-1 space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 rounded-3xl rounded-tl-none text-xs w-[85%] font-medium leading-relaxed ${theme === 'dark' ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-100 text-slate-600'}`}
                  >
                    Tell me about your latest meeting!
                  </motion.div>

                  {/* The Typing Message */}
                  <div className="flex justify-end">
                    <div className="relative p-4 rounded-3xl rounded-tr-none bg-indigo-600 text-white text-[11px] font-medium w-[92%] shadow-2xl leading-relaxed">
                      {displayText}
                      <span className="inline-block w-1 h-3 bg-white ml-0.5 animate-pulse" />

                      {/* Pop-out Dynamic Labels */}
                      <AnimatePresence>
                        {isWordVisible(13) && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: -26, scale: 1 }}
                            className="absolute top-2 left-6 px-2 py-0.5 bg-yellow-400 text-slate-900 font-black text-[9px] rounded-lg uppercase shadow-[0_5px_15px_rgba(250,204,21,0.4)] flex items-center gap-1"
                          >
                            <User className="w-2.5 h-2.5" /> Name
                          </motion.div>
                        )}
                        {isWordVisible(24) && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: -26, scale: 1 }}
                            className="absolute top-6 left-28 px-2 py-0.5 bg-blue-400 text-white font-black text-[9px] rounded-lg uppercase shadow-[0_5px_15px_rgba(96,165,250,0.4)] flex items-center gap-1"
                          >
                            <Briefcase className="w-2.5 h-2.5" /> Role
                          </motion.div>
                        )}
                        {isWordVisible(69) && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: -26, scale: 1 }}
                            className="absolute top-14 right-4 px-2 py-0.5 bg-green-500 text-white font-black text-[9px] rounded-lg uppercase shadow-[0_5px_15px_rgba(34,197,94,0.4)] flex items-center gap-1"
                          >
                            <MapPin className="w-2.5 h-2.5" /> Venue
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Success Feedback Card */}
                  <AnimatePresence>
                    {step >= 1 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className={`p-5 rounded-[2.5rem] border text-center transition-all duration-300 shadow-2xl ${theme === 'dark' ? 'bg-slate-900/90 border-indigo-500/40' : 'bg-white border-indigo-100'}`}
                      >
                        <motion.div
                          initial={{ scale: 0, rotate: -45 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 200, damping: 12 }}
                          className="mx-auto w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center mb-4 border border-green-500/20"
                        >
                          <CheckCircle2 className="w-7 h-7 text-green-500" />
                        </motion.div>
                        <div className={`text-sm font-black mb-1 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Memory Indexed</div>
                        <div className="text-[10px] text-slate-500 font-bold flex flex-col items-center gap-1.5 mt-2">
                          <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-800/50"><MapPin className="w-3 h-3 text-indigo-500" /> Chennai, India</span>
                          <span className="flex items-center gap-1.5 opacity-60"><Clock className="w-3 h-3" /> Encrypted Store</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom Interaction Bar */}
                <div className={`mt-auto -mx-6 -mb-6 p-6 border-t ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                  <div className="h-10 w-full rounded-2xl bg-indigo-500/5 border border-indigo-500/20 flex items-center px-4">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse mr-2" />
                    <div className="h-2 w-24 bg-slate-700/30 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Internal Screen Reflections */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
            </div>

            {/* Realistic 3D Shadow Overlay */}
            <div className="absolute -inset-4 bg-indigo-600/5 blur-[120px] -z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          </motion.div>

          {/* Floating Accents */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 w-24 h-24 bg-purple-500/10 blur-3xl rounded-full"
          />
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full"
          />
        </div>
      </div>

      <style>{`
        .perspective-2000 {
          perspective: 2000px;
        }
      `}</style>
    </section>
  );
};

export default MockupDemo;
