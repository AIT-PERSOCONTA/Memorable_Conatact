
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, Calendar, Sparkles, Brain, ArrowRight } from 'lucide-react';

interface FuzzyRecallProps {
  theme: 'light' | 'dark';
}

const FuzzyRecall: React.FC<FuzzyRecallProps> = ({ theme }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Animation values mapped to scroll progress
  const leftOpacity = useTransform(scrollYProgress, [0.1, 0.4], [1, 0]);
  const leftBlur = useTransform(scrollYProgress, [0.1, 0.4], ["blur(0px)", "blur(20px)"]);
  const leftScale = useTransform(scrollYProgress, [0.1, 0.4], [1, 0.9]);

  const rightOpacity = useTransform(scrollYProgress, [0.45, 0.75], [0, 1]);
  const rightX = useTransform(scrollYProgress, [0.45, 0.75], [100, 0]);
  const rightScale = useTransform(scrollYProgress, [0.45, 0.75], [0.8, 1]);
  const rightRotate = useTransform(scrollYProgress, [0.45, 0.75], [5, 0]);

  const centerIconOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const centerIconScale = useTransform(scrollYProgress, [0.35, 0.55], [0.5, 1]);

  const fragments = [
    { text: "Met at cafe?", top: "15%", left: "10%", delay: 0 },
    { text: "What was his name?", top: "40%", left: "25%", delay: 0.2 },
    { text: "Blue shirt?", top: "10%", left: "55%", delay: 0.4 },
    { text: "Product manager at...?", top: "65%", left: "12%", delay: 0.1 },
    { text: "Project X insight", top: "70%", left: "40%", delay: 0.3 },
    { text: "Wanted to collab", top: "30%", left: "65%", delay: 0.5 },
    { text: "LinkedIn later?", top: "85%", left: "60%", delay: 0.2 },
    { text: "Editor? Writer?", top: "50%", left: "5%", delay: 0.4 },
  ];

  return (
    <section ref={sectionRef} className="relative min-h-[300vh] z-20">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* Transformation Indicator */}
        <motion.div
          style={{ opacity: centerIconOpacity, scale: centerIconScale }}
          className="absolute z-30 pointer-events-none"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center shadow-[0_0_50px_rgba(79,70,229,0.5)]">
              <Brain className="w-10 h-10 text-white animate-pulse" />
            </div>
            <div className={`px-4 py-1.5 rounded-full border text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900/80 border-indigo-500/30 text-indigo-400' : 'bg-white border-indigo-200 text-indigo-600'}`}>
              Structuring Memory...
            </div>
          </div>
        </motion.div>

        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 px-6">

          {/* Left Side: Chaos */}
          <motion.div
            style={{ opacity: leftOpacity, scale: leftScale, filter: leftBlur }}
            className="relative w-full lg:w-[45%] h-[500px]"
          >
            <div className="text-center lg:text-left mb-12 relative z-10">
              <h2 className={`text-4xl md:text-5xl font-black mb-4 tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Fading <span className="text-slate-500">Recollection</span>
              </h2>
              <p className={`text-lg font-medium transition-colors duration-300 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
                The mental fog where 70% of professional context is lost within 48 hours.
              </p>
            </div>

            <div className="relative h-full w-full">
              {fragments.map((f, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -15, 0],
                    x: [0, 10, 0],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    delay: f.delay
                  }}
                  className={`absolute font-bold select-none whitespace-normal break-words max-w-[150px] blur-[1px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}
                  style={{ top: f.top, left: f.left, fontSize: `clamp(0.8rem, 2vw, 1.5rem)` }}
                >
                  {f.text}
                </motion.div>
              ))}

              {/* Chaotic Background Swirls */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-slate-500/5 to-transparent blur-3xl rounded-full" />
            </div>
          </motion.div>

          <div className="hidden lg:flex flex-col items-center gap-4">
            <motion.div style={{ opacity: leftOpacity }}>
              <ArrowRight className="w-8 h-8 text-slate-700" />
            </motion.div>
          </div>

          {/* Right Side: Clarity */}
          <motion.div
            style={{
              opacity: rightOpacity,
              x: rightX,
              scale: rightScale,
              rotate: rightRotate
            }}
            className={`relative w-full lg:w-[45%] glass p-1 rounded-[48px] overflow-hidden group transition-all duration-500 ${theme === 'dark' ? 'bg-slate-900/40 border-indigo-500/20 shadow-[0_0_80px_-20px_rgba(79,70,229,0.3)]' : 'bg-white border-indigo-100 shadow-2xl shadow-indigo-200/50'}`}
          >
            <div className={`m-1 p-8 rounded-[40px] transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900/90' : 'bg-white'}`}>
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-[28px] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-black shadow-lg">
                      P
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-4 border-slate-900 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                    </div>
                  </div>
                  <div>
                    <h3 className={`text-3xl font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Pradeep Sharma</h3>
                    <div className="flex items-center gap-1.5 text-indigo-500 font-bold text-sm">
                      <Briefcase className="w-4 h-4" />
                      Senior Editor @ Maven Media
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] uppercase font-black tracking-widest ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>Recall Quality</span>
                  <div className="text-2xl font-black text-indigo-500">Perfect</div>
                </div>
              </div>

              <div className="space-y-6">
                <div className={`p-5 rounded-3xl border transition-all duration-300 ${theme === 'dark' ? 'bg-slate-800/40 border-slate-700/50 hover:border-indigo-500/30' : 'bg-slate-50 border-slate-100'}`}>
                  <div className="flex items-center gap-2 text-indigo-500 text-xs font-black uppercase mb-3 tracking-widest">
                    <Calendar className="w-4 h-4" /> Context & Timeline
                  </div>
                  <div className={`text-base font-bold mb-1 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                    Global Freelancer Festival
                  </div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    Met at Leela Palace, Chennai • May 14, 2:30 PM
                  </p>
                </div>

                <div className={`p-5 rounded-3xl border transition-all duration-300 ${theme === 'dark' ? 'bg-slate-800/40 border-slate-700/50 hover:border-indigo-500/30' : 'bg-slate-50 border-slate-100'}`}>
                  <div className="flex items-center gap-2 text-indigo-500 text-xs font-black uppercase mb-3 tracking-widest">
                    <Sparkles className="w-4 h-4" /> Professional Insight
                  </div>
                  <p className={`text-sm leading-relaxed font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    "Discussed potential content collaboration for Q3. He is looking for thought-leaders in AI Infrastructure. Mentioned he loves the 'Digital Brain' concept we are building."
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {['#Publishing', '#Chennai', '#Lead-Gen', '#Strategic'].map(tag => (
                    <span key={tag} className="px-4 py-1.5 bg-indigo-500/10 text-indigo-500 rounded-2xl text-xs font-black border border-indigo-500/20 hover:bg-indigo-500 hover:text-white transition-all cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Animated Glow Border */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </motion.div>
        </div>
      </div>

      {/* Narrative Overlay */}
      <div className="h-screen w-full flex items-center justify-center">
        <div className="text-center max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-xs font-black rounded-full mb-8 tracking-widest uppercase"
          >
            The MemorableContact Transformation
          </motion.div>
          <h2 className={`text-5xl md:text-7xl font-black mb-8 tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Fragments into <span className="gradient-text">Facts.</span>
          </h2>
          <p className={`text-xl md:text-2xl font-medium leading-relaxed transition-colors duration-300 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Stop letting your network evaporate. MemorableContact's AI listens to the way you naturally describe your world,
            anchoring every person, place, and idea into your persistent digital core.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FuzzyRecall;
