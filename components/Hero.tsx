
import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Play, Sparkles } from 'lucide-react';

interface HeroProps {
  theme: 'light' | 'dark';
  onGetStarted?: () => void;
}

const Counter = ({ value, label, theme, suffix = "", decimals = 0 }: { value: number, label: string, theme: 'light' | 'dark', suffix?: string, decimals?: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    return decimals === 0 ? Math.round(latest).toString() : latest.toFixed(decimals);
  });

  useEffect(() => {
    const animation = animate(count, value, { duration: 2, ease: "easeOut" });
    return animation.stop;
  }, [value, count]);

  return (
    <div>
      <div className="flex justify-center items-baseline text-2xl md:text-4xl font-black">
        <motion.span>{rounded}</motion.span>
        <span>{suffix}</span>
      </div>
      <div className={`text-slate-500 font-bold uppercase text-[8px] md:text-[10px] tracking-widest mt-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>{label}</div>
    </div>
  );
};

const Hero: React.FC<HeroProps> = ({ theme, onGetStarted }) => {
  return (
    <section className="relative pt-20 pb-16 px-0 flex flex-col items-center justify-center text-center overflow-hidden min-h-[90vh] md:pt-48 md:pb-32 md:px-6">
      <div className="responsive-container z-20 flex flex-col items-center">
        <div className="relative group p-[1px] rounded-full overflow-hidden mb-8 md:mb-10 shadow-lg active:scale-95 transition-transform">
          <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#4285F4_0%,#EA4335_25%,#FBBC05_50%,#34A853_75%,#4285F4_100%)]" />
          <div className={`relative px-4 py-1.5 rounded-full flex items-center gap-2 ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-white text-slate-900 border border-slate-100'}`}>
            <Sparkles className="w-3 h-3 text-indigo-500" />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
              No. 1 AI Contact Manager
            </span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1] md:leading-[0.9] mb-8 md:mb-10">
          <span className="gradient-text">Never Forget A Professional</span>
          <br />
          <span className="gradient-text">Connection Again.</span>
        </h1>

        <p className={`text-sm md:text-lg max-w-3xl mx-auto mb-10 md:mb-14 leading-relaxed font-medium transition-colors duration-300 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
          MemorableContact is the Gen AI Powered Application for your professional network. <br className="hidden md:block" />
          Capture context via Chatbot, search via semantic intent, and recall every detail instantly.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 w-full md:flex-row md:gap-8">
          <button
            onClick={onGetStarted}
            className="w-full md:w-auto relative group p-[2px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden transition-all active:scale-95 shadow-[0_20px_50px_rgba(79,70,229,0.3)] min-h-[48px]"
          >
            <div className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#4285F4_0%,#EA4335_25%,#FBBC05_50%,#34A853_75%,#4285F4_100%)]" />
            <div className={`relative flex items-center justify-center gap-3 px-6 md:px-10 py-3.5 md:py-5 rounded-[calc(1.5rem-2px)] md:rounded-[calc(2rem-2px)] font-black text-sm md:text-xl transition-all min-h-[48px] ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-white text-slate-900 border border-slate-100'}`}>
              Book a Call
              <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-indigo-500 group-hover:rotate-12 transition-transform" />
            </div>
          </button>

          <button className="w-full md:w-auto relative group p-[2px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden transition-all active:scale-95 min-h-[48px]">
            <div className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#4285F4_0%,#FBBC05_33%,#34A853_66%,#4285F4_100%)] opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className={`relative flex items-center justify-center gap-3 px-6 md:px-10 py-3.5 md:py-5 rounded-[calc(1.5rem-2px)] md:rounded-[calc(2rem-2px)] font-black text-sm md:text-xl transition-all backdrop-blur-xl min-h-[48px] ${theme === 'dark' ? 'bg-slate-900/90 text-slate-200' : 'bg-white/90 text-slate-700'}`}>
              Watch Demo
              <Play className="w-4 h-4 md:w-6 md:h-6 fill-current" />
            </div>
          </button>
        </div>

        <div className={`mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 border-t pt-12 md:pt-16 transition-colors duration-300 ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
          <Counter value={100} label="Context Retention" theme={theme} suffix="%" />
          <Counter value={2.5} label="Recall Speed" theme={theme} suffix="s" decimals={1} />
          <div className="col-span-2 md:col-span-1 border-t md:border-t-0 pt-8 md:pt-0">
            <Counter value={99.9} label="Name Accuracy" theme={theme} suffix="%" decimals={1} />
          </div>
        </div>
      </div>

      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] blur-[160px] rounded-full -z-10 transition-colors duration-300 ${theme === 'dark' ? 'bg-indigo-600/10' : 'bg-indigo-500/5'}`} />
      <div className={`absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-[140px] rounded-full -z-10 transition-colors duration-300 ${theme === 'dark' ? 'bg-purple-600/10' : 'bg-purple-500/5'}`} />
    </section>
  );
};

export default Hero;
