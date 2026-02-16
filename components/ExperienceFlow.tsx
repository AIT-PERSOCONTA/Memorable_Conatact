import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShieldCheck,
    MessageSquare,
    MapPin,
    Search,
    ArrowRight,
    Sparkles,
    Lock
} from 'lucide-react';

interface ExperienceFlowProps {
    theme: 'light' | 'dark';
}

const steps = [
    {
        id: 1,
        title: "Seamless Entry",
        subtitle: "Step 1: Secure Login",
        icon: <ShieldCheck className="w-6 h-6" />,
        description: "Start in seconds. Access your personal memory vault using a secure OTP via Phone or Email. No data shared with third parties. Just you and your network.",
        badge: "Trust & Safety",
        highlight: ["secure", "OTP", "Phone", "Email"],
        mockup: "login"
    },
    {
        id: 2,
        title: "Capture the Moment",
        subtitle: "Step 2: Chat-Based Saving",
        icon: <MessageSquare className="w-6 h-6" />,
        description: "Forget tedious forms. Simply tell the Memorable Contact Chatbot who you met: 'I just met Sarah, a Lead Designer at Google, during the Paris Tech Summit. She’s interested in our Q3 roadmap.'",
        badge: "AI Extraction",
        highlight: ["Designer", "Paris", "Tech Summit"],
        mockup: "chat"
    },
    {
        id: 3,
        title: "Contextual Intelligence",
        subtitle: "Step 3: Auto Geo-Tagging",
        icon: <MapPin className="w-6 h-6" />,
        description: "While you chat, the app intelligently captures the GPS location and timestamp. Whether you’re at a bustling café in Chennai or a skyscraper in NYC, the system remembers the 'Where' and 'When'.",
        badge: "Geo-Context",
        highlight: ["Chennai", "NYC", "GPS"],
        mockup: "location"
    },
    {
        id: 4,
        title: "The Power of Recall",
        subtitle: "Step 4: Keyword Retrieval",
        icon: <Search className="w-6 h-6" />,
        description: "When you need to find her six months later, don’t stress. Just ask the chatbot: 'Who was the designer I met in Paris?' The AI instantly retrieves Sarah’s full profile and your personal notes.",
        badge: "Neural Search",
        highlight: ["designer", "Paris", "Keyword"],
        mockup: "recall"
    }
];

const ExperienceFlow: React.FC<ExperienceFlowProps> = ({ theme }) => {
    const [activeStep, setActiveStep] = useState<number | null>(null);

    const formatDescription = (text: string, highlights: string[]) => {
        let parts = [text];
        highlights.forEach(h => {
            const newParts: string[] = [];
            parts.forEach(p => {
                const regex = new RegExp(`(${h})`, 'gi');
                const split = p.split(regex);
                newParts.push(...split);
            });
            parts = newParts;
        });

        return parts.map((part, i) => {
            const isHighlight = highlights.some(h => h.toLowerCase() === part.toLowerCase());
            return isHighlight ? (
                <span key={i} className="text-indigo-500 font-black italic underline decoration-indigo-500/30 underline-offset-4">
                    {part}
                </span>
            ) : part;
        });
    };

    return (
        <section className={`py-32 px-0 relative overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-950' : 'bg-white'}`}>
            <div className="responsive-container relative z-10">
                <div className="text-center mb-20 lg:mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-6"
                    >
                        <Sparkles className="w-3 h-3" /> User Journey
                    </motion.div>
                    <h2 className={`text-4xl md:text-7xl font-black mb-6 tracking-tighter transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        Experience <span className="gradient-text">the Flow.</span>
                    </h2>
                    <p className={`max-w-2xl mx-auto font-medium text-lg leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                        Your journey from a handshake to a permanent professional memory.
                    </p>
                </div>

                {/* Stepper Header (Icons) */}
                <div className="hidden lg:flex items-center justify-between max-w-5xl mx-auto mb-16 px-10 relative">
                    <div className="absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-slate-100 dark:bg-slate-800 -translate-y-1/2 -z-10" />
                    {steps.map((s, i) => (
                        <motion.div
                            key={s.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex flex-col items-center gap-4 group"
                        >
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${activeStep === s.id
                                ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-600/40 scale-110'
                                : theme === 'dark' ? 'bg-slate-900 text-slate-500 border border-slate-800' : 'bg-slate-50 text-slate-400 border border-slate-200'
                                }`}>
                                {s.icon}
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${activeStep === s.id ? 'text-indigo-500' : 'text-slate-500'
                                }`}>{s.title}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {steps.map((s, i) => (
                        <motion.div
                            key={s.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onHoverStart={() => setActiveStep(s.id)}
                            onHoverEnd={() => setActiveStep(null)}
                            className={`group relative p-8 rounded-[40px] border transition-all duration-500 overflow-hidden flex flex-col h-full ${theme === 'dark'
                                ? 'bg-slate-900/40 border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900'
                                : 'bg-slate-50 border-slate-200 hover:border-indigo-400 hover:bg-white shadow-sm hover:shadow-2xl'
                                }`}
                        >
                            {/* Background Accents */}
                            <div className={`absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity`} />

                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-8">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${theme === 'dark' ? 'bg-slate-800 text-indigo-400' : 'bg-white shadow-sm text-indigo-600'
                                        }`}>
                                        {s.icon}
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 opacity-60">0{s.id}</span>
                                </div>

                                <div className="mb-4">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">{s.badge}</span>
                                    <h3 className={`text-xl font-black mt-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{s.title}</h3>
                                </div>

                                <p className={`text-sm leading-relaxed font-medium mb-6 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                    {formatDescription(s.description, s.highlight)}
                                </p>
                            </div>

                            {/* Interaction Hint */}
                            <div className="pt-6 border-t border-slate-800/10 dark:border-white/5 flex items-center justify-between group/link">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">View Interface</span>
                                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>

                            {/* Mockup Preview (Overlay on Hover) */}
                            <AnimatePresence>
                                {activeStep === s.id && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="absolute inset-x-4 top-4 bottom-24 rounded-[32px] overflow-hidden z-20 shadow-2xl pointer-events-none border border-white/20"
                                    >
                                        <div className="absolute inset-0 bg-indigo-600 flex flex-col items-center justify-center p-6 text-center">
                                            {s.mockup === 'login' && (
                                                <div className="space-y-4">
                                                    <Lock className="w-12 h-12 text-white mb-2 mx-auto" />
                                                    <div className="w-24 h-8 bg-white/20 rounded-xl" />
                                                    <div className="w-40 h-2 bg-white/30 rounded-full mx-auto" />
                                                    <div className="text-[10px] font-black uppercase tracking-widest text-white/60 mt-4">Security Protocol Active</div>
                                                </div>
                                            )}
                                            {s.mockup === 'chat' && (
                                                <div className="space-y-3 w-full">
                                                    <div className="flex justify-start"><div className="w-3/4 h-8 bg-white/20 rounded-2xl rounded-tl-none" /></div>
                                                    <div className="flex justify-end"><div className="w-4/5 h-12 bg-white/10 rounded-2xl rounded-tr-none flex items-center justify-center p-2"><div className="w-full h-2 bg-white/40 rounded-full" /></div></div>
                                                    <div className="text-[10px] font-black uppercase tracking-widest text-white/60 mt-4">AI extraction engine</div>
                                                </div>
                                            )}
                                            {s.mockup === 'location' && (
                                                <div className="space-y-4">
                                                    <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/40 flex items-center justify-center animate-spin-slow">
                                                        <MapPin className="w-6 h-6 text-white" />
                                                    </div>
                                                    <div className="text-[10px] font-black uppercase tracking-widest text-white mt-2">Paris Tech Summit</div>
                                                    <div className="text-[9px] font-bold text-white/60">Geo-Tagged node synced</div>
                                                </div>
                                            )}
                                            {s.mockup === 'recall' && (
                                                <div className="space-y-4 w-full px-4">
                                                    <div className="w-full h-10 bg-white/10 rounded-xl flex items-center px-3 gap-2">
                                                        <Search className="w-4 h-4 text-white/60" />
                                                        <div className="text-[10px] text-white/40 uppercase font-black">Find designer...</div>
                                                    </div>
                                                    <div className="bg-white/20 p-3 rounded-2xl flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-white/30" />
                                                        <div className="text-left">
                                                            <div className="text-[10px] font-black text-white">Sarah Jenkins</div>
                                                            <div className="text-[8px] font-bold text-white/50 underline decoration-indigo-400/50">Lead Designer</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExperienceFlow;
