
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Sparkles, Zap, Shield, Crown } from 'lucide-react';

interface PricingPageProps {
    theme: 'light' | 'dark';
    onBack: () => void;
}

const plans = [
    {
        name: "Standard",
        price: "$0",
        period: "per user/month",
        description: "Perfect for individuals looking to organize their primary connections.",
        features: ["500 Neural Fragments", "Basic Search", "Location Capture", "Standard Security"],
        icon: <Zap className="w-6 h-6 text-blue-500" />,
        color: "blue",
        popular: false
    },
    {
        name: "Professional",
        price: "$29",
        period: "per user/month",
        description: "The sweet spot for active networkers and busy executives.",
        features: ["Unlimited Fragments", "Advanced Neural Search", "Multi-Device Sync", "Priority Retrieval", "AI Relationship Summaries"],
        icon: <Sparkles className="w-6 h-6 text-indigo-500" />,
        color: "indigo",
        popular: true
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "for teams",
        description: "Bespoke memory solutions for organizations that value collective knowledge.",
        features: ["Team Memory Graph", "Audit Protocol", "Advanced Encryption", "Dedicated Curator", "API Access"],
        icon: <Crown className="w-6 h-6 text-purple-500" />,
        color: "purple",
        popular: false
    }
];

const PricingPage: React.FC<PricingPageProps> = ({ theme, onBack }) => {
    return (
        <div className={`min-h-screen pt-32 pb-20 px-6 transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
            <div className="max-w-7xl mx-auto">
                {/* Navigation Back */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={onBack}
                    className={`flex items-center gap-2 mb-12 px-4 py-2 rounded-xl transition-all ${theme === 'dark' ? 'hover:bg-slate-900 text-slate-400 hover:text-white' : 'hover:bg-white text-slate-500 hover:text-slate-900 shadow-sm'}`}
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-xs font-black uppercase tracking-widest">Return Home</span>
                </motion.button>

                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black uppercase tracking-widest mb-6"
                    >
                        Transparent Investment
                    </motion.div>
                    <h1 className="text-3xl md:text-5xl lg:text-7xl font-black mb-6 md:mb-8 tracking-tighter leading-tight">
                        Choose Your <span className="text-indigo-600">Cognitive</span> Tier
                    </h1>
                    <p className={`max-w-2xl mx-auto font-bold text-sm md:text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                        Scale your networking potential with plans designed for every level of professional impact.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                            className={`relative group h-full rounded-[40px] p-1 pt-1 ${plan.popular ? 'bg-gradient-to-b from-indigo-500 to-purple-600 shadow-2xl md:scale-105 z-10' : ''}`}
                        >
                            <div className={`h-full rounded-[39px] p-8 md:p-10 flex flex-col transition-all duration-500 ${theme === 'dark'
                                ? 'bg-slate-900 border border-slate-800 group-hover:bg-slate-800/80'
                                : 'bg-white border border-slate-200 group-hover:border-indigo-200 shadow-sm group-hover:shadow-xl'
                                }`}>
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                                        Most Popular
                                    </div>
                                )}

                                <div className="flex justify-between items-start mb-8">
                                    <div className={`p-4 rounded-3xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'}`}>
                                        {plan.icon}
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-4xl font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{plan.price}</div>
                                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{plan.period}</div>
                                    </div>
                                </div>

                                <h3 className={`text-2xl font-black mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                                <p className={`text-sm font-medium mb-10 leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                    {plan.description}
                                </p>

                                <div className="space-y-4 mb-12 flex-1">
                                    {plan.features.map(feature => (
                                        <div key={feature} className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center">
                                                <Check className="w-3 h-3 text-indigo-500" />
                                            </div>
                                            <span className={`text-sm font-bold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    className={`w-full py-5 rounded-[24px] font-black uppercase tracking-[0.2em] text-sm transition-all active:scale-95 ${plan.popular
                                        ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 hover:bg-indigo-500'
                                        : (theme === 'dark' ? 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700' : 'bg-slate-900 text-white hover:bg-slate-800')
                                        }`}
                                >
                                    Select Protocol
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* FAQ or Security Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-32 p-12 lg:p-16 rounded-[40px] border relative overflow-hidden flex flex-col items-center text-center transition-colors duration-300 bg-indigo-600/5 border-indigo-500/20"
                >
                    <div className="max-w-3xl">
                        <Shield className="w-10 h-10 md:w-12 md:h-12 text-indigo-500 mx-auto mb-6 md:mb-8" />
                        <h2 className="text-2xl md:text-5xl font-black mb-6 md:mb-8 tracking-tighter">Enterprise-Grade Neural Privacy</h2>
                        <p className={`text-sm md:text-lg font-medium leading-relaxed mb-10 md:mb-12 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                            Your memory is sacred. We use end-to-end cognitive encryption and localized neural nodes to ensure your connections stay yours. No data is ever sold or shared.
                        </p>
                        <div className="flex flex-wrap justify-center gap-8">
                            <div className="flex items-center gap-2">
                                <Check className="text-indigo-500 w-5 h-5" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">SOC2 Type II</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="text-indigo-500 w-5 h-5" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">GDPR Compliant</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="text-indigo-500 w-5 h-5" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">E2E Cognitive Encryption</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PricingPage;
