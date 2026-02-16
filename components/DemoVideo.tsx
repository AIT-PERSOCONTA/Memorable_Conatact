
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Maximize2, Volume2, Settings } from 'lucide-react';

interface DemoVideoProps {
  theme: 'light' | 'dark';
}

const DemoVideo: React.FC<DemoVideoProps> = ({ theme }) => {
  return (
    <section id="video-demo" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4"
          >
            Cinematic Overview
          </motion.div>
          <h2 className={`text-4xl md:text-6xl font-black mb-6 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            See <span className="gradient-text">MemorableContact</span> in Action
          </h2>
          <p className={`max-w-2xl mx-auto font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Join us for a 2-minute walkthrough of how the digital brain changes the way you network forever.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`relative aspect-video rounded-[48px] overflow-hidden border shadow-2xl transition-all duration-500 ${
            theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}
        >
          {/* Main Video Background (Cinematic Overlay) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 z-10" />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-24 h-24 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-[0_0_50px_rgba(79,70,229,0.5)] border-4 border-white/20 hover:bg-indigo-500 transition-colors"
            >
              <Play className="w-10 h-10 fill-current ml-2" />
            </motion.button>
          </div>

          {/* Video UI Layer */}
          <div className="absolute bottom-0 inset-x-0 p-8 z-30 flex items-end justify-between">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-4 text-white/80 text-xs font-bold tracking-widest uppercase">
                <span>0:42 / 2:15</span>
                <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-[30%] h-full bg-indigo-500" />
                </div>
              </div>
              <div className="flex items-center gap-6">
                <button className="text-white/60 hover:text-white transition-colors"><Volume2 className="w-5 h-5" /></button>
                <button className="text-white/60 hover:text-white transition-colors"><Settings className="w-5 h-5" /></button>
                <div className="text-white font-black text-sm tracking-tight">EP 01: The Future of Professional Memory</div>
              </div>
            </div>
            <button className="text-white/60 hover:text-white transition-colors"><Maximize2 className="w-6 h-6" /></button>
          </div>

          {/* Background visuals (Abstract) */}
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-[80%] h-[80%] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" />
          </div>
        </motion.div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full bg-indigo-500/5 blur-[150px] -z-10 pointer-events-none" />
    </section>
  );
};

export default DemoVideo;
