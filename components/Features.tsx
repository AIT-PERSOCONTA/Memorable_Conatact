import { motion } from 'framer-motion';
import { MessageSquare, MapPin, Users, Zap, ShieldCheck, Sparkles } from 'lucide-react';

interface FeaturesProps {
  theme: 'light' | 'dark';
}

const featureData = [
  {
    icon: <MessageSquare className="w-6 h-6 text-indigo-400" />,
    title: "AI Conversations",
    description: "Simply tell MemorableContact about your meeting. It understands context, tone, and specific details automatically."
  },
  {
    icon: <MapPin className="w-6 h-6 text-purple-400" />,
    title: "Location Aware",
    description: "Geo-tagging ensures you remember exactly where you were when you met that key stakeholder."
  },
  {
    icon: <Users className="w-6 h-6 text-blue-400" />,
    title: "Entity Extraction",
    description: "Instantly extracts names, company roles, and social handles from your casual voice or text logs."
  },
  {
    icon: <Zap className="w-6 h-6 text-yellow-400" />,
    title: "Instant Recall",
    description: "Search for 'that guy from the coffee shop in Austin' and get his bio and last conversation topic in 1 second."
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-green-400" />,
    title: "Privacy First",
    description: "Your memory is your own. All data is encrypted and processed with the highest security standards."
  }
];

const Features: React.FC<FeaturesProps> = ({ theme }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="responsive-container relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 blur-[100px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 blur-[100px] rounded-full -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 md:mb-24"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-6"
        >
          <Sparkles className="w-3 h-3" /> Core Engine
        </motion.div>
        <h2 className={`text-3xl md:text-6xl font-black mb-6 tracking-tight leading-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          Powerful Core <span className="gradient-text">Capabilities.</span>
        </h2>
        <p className={`max-w-2xl mx-auto font-medium text-base md:text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
          Designed for networkers, sales pros, and leaders who value every connection.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10"
      >
        {featureData.map((f, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            whileHover={{
              y: -12,
              rotateX: 2,
              rotateY: 2,
              transition: { duration: 0.3 }
            }}
            className={`relative glass p-8 md:p-10 rounded-[32px] md:rounded-[40px] transition-all group border flex flex-col items-start text-left ${theme === 'dark'
              ? 'border-slate-800 hover:bg-white/5 hover:border-indigo-500/50 shadow-2xl shadow-indigo-500/5'
              : 'border-slate-200 bg-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-10px_rgba(79,70,229,0.15)] hover:border-indigo-400'
              }`}
          >
            {/* Inner Glow Effect */}
            <div className={`absolute inset-0 rounded-[32px] md:rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-indigo-500/5 to-transparent`} />

            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${theme === 'dark'
              ? 'bg-slate-800 text-white'
              : 'bg-indigo-50 border border-indigo-100 text-indigo-600'
              }`}>
              {f.icon}
            </div>

            <h3 className={`text-2xl font-black mb-4 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {f.title}
            </h3>

            <p className={`leading-relaxed text-sm md:text-base font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}>
              {f.description}
            </p>

            <div className="mt-8 pt-6 border-t border-slate-800/10 dark:border-white/5 w-full flex items-center justify-between group/link cursor-pointer min-h-[48px]">
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">Read Protocol</span>
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover/link:bg-indigo-600 group-hover/link:text-white transition-all">
                <Zap className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Features;
