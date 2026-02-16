
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Team from '../components/Team';

interface AboutProps {
    theme: 'light' | 'dark';
    onBack: () => void;
}

const About: React.FC<AboutProps> = ({ theme, onBack }) => {
    return (
        <div className={`min-h-screen pt-20 pb-16 px-0 transition-colors duration-300 md:pt-32 md:pb-20 md:px-6 ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
            <div className="responsive-container lg:max-w-7xl">
                {/* Navigation Back */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={onBack}
                    className={`flex items-center gap-2 mb-12 px-4 py-2 rounded-xl transition-all ${theme === 'dark' ? 'hover:bg-slate-900 text-slate-400 hover:text-white' : 'hover:bg-white text-slate-500 hover:text-slate-900 shadow-sm'}`}
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-xs font-black uppercase tracking-widest">Return to Surface</span>
                </motion.button>

                {/* About Us Card Layout */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className={`mb-20 md:mb-32 rounded-[24px] overflow-hidden flex flex-col lg:flex-row transition-all duration-300 ${theme === 'dark'
                        ? 'bg-slate-900 border-slate-800 shadow-2xl'
                        : 'bg-white border-slate-200 shadow-[0px_10px_30px_rgba(0,0,0,0.08)]'
                        } border mx-auto w-full`}
                >
                    {/* Left Side: Content */}
                    <div className="flex-1 p-6 md:p-12 lg:p-16">
                        <h2 className={`text-2xl md:text-3xl lg:text-5xl font-black tracking-tighter leading-tight mb-6 md:mb-8 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            Rescuing Relationships from the <br />
                            <span className="text-indigo-600">Limits of Human Memory.</span>
                        </h2>

                        <div className={`space-y-4 md:space-y-6 font-medium leading-relaxed text-xs md:text-base ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                            <p>
                                Welcome to Memorable Contact. We believe that every handshake holds a world of potential, but we also know that human memory is imperfect. In the rush of a high-energy conference or the bustle of a milestone meeting, the most important details—the "where," the "why," and the "how"—often slip away.
                            </p>
                            <p>
                                Memorable Contact was born from a simple, universal frustration: the struggle to remember the brilliant people we meet. We aren't building a database; we are building your Personal Memory System.
                            </p>
                            <p>
                                By combining AI-driven natural language with location-aware context, we ensure that you never lose a professional opportunity to a forgotten name or a lost detail again. We help you turn a brief encounter into a lasting connection.
                            </p>
                        </div>

                        <div className={`mt-12 pt-8 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-100'}`}>
                            <h4 className="text-indigo-600 text-xs font-black uppercase tracking-widest mb-2">Our Promise</h4>
                            <p className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                To bridge the gap between meeting someone and actually remembering them—one intelligent conversation at a time.
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Visual */}
                    <div className={`w-full lg:w-[45%] relative overflow-hidden flex flex-col ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'}`}>
                        <div className={`absolute inset-0 pointer-events-none ${theme === 'dark' ? 'bg-gradient-to-br from-indigo-950/50 to-slate-950' : 'bg-gradient-to-br from-indigo-100/50 to-white'}`} />

                        <div className="relative flex-1 flex items-end justify-center pt-12 md:pt-20">
                            <img
                                src="https://res.cloudinary.com/dkpwmrjkq/image/upload/v1771256050/1675376788735-removebg-preview_alugko.png"
                                alt="Amurtha - Founder & CEO"
                                className="relative z-10 w-full max-w-[280px] md:max-w-[400px] object-contain drop-shadow-2xl translate-y-4"
                            />
                        </div>

                        <div className={`p-6 md:p-12 backdrop-blur-md relative z-20 border-t ${theme === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white/90 border-slate-100'}`}>
                            <div className={`text-xl md:text-2xl font-black mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Amurtha</div>
                            <div className="text-indigo-600 text-[10px] md:text-xs font-black uppercase tracking-widest mb-2 md:mb-4">Founder & CEO</div>
                            <div className={`text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>Asokumar Group of Companies</div>
                        </div>
                    </div>
                </motion.div>

                {/* Team Section Migration */}
                <div className={`rounded-[40px] border overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-2xl'}`}>
                    <Team theme={theme} />
                </div>

                {/* CTA Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter">Ready to join the network?</h2>
                    <button
                        onClick={onBack}
                        className="px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-indigo-600/40 active:scale-95 transition-all"
                    >
                        Back to Home
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
