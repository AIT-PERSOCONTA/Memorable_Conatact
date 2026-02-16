
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate, useMotionValue, useTransform } from 'framer-motion';
import { Check, Shield, CreditCard } from 'lucide-react';

interface PricingProps {
  theme: 'light' | 'dark';
}

const AnimatedNumber = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(count, value, { duration: duration, ease: "easeOut" });
    }
  }, [isInView, value, count, duration]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const Pricing: React.FC<PricingProps> = ({ theme }) => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Free",
      price: 0,
      contacts: 30,
      features: ["Standard AI Extraction", "Basic Search", "Mobile App Access", "Single Device Sync"],
      cta: "Request for DEMO",
      popular: false,
    },
    {
      name: "Pro",
      price: isYearly ? 15 : 19,
      contacts: 300,
      features: ["Advanced Entity Recognition", "GPS History & Maps", "Custom Tags", "Priority Support", "Multi-device Sync"],
      cta: "Request for DEMO",
      popular: true,
    },
    {
      name: "Premium",
      price: isYearly ? 39 : 49,
      contacts: 1000,
      features: ["Full Contextual Recall", "CRM Integration (Notion/SF)", "Voice Memo Transcription", "Private AI Model", "Dedicated Success Manager"],
      cta: "Request for DEMO",
      popular: false,
    }
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-3xl md:text-5xl font-black mb-6 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
          >
            Invest in Your <span className="gradient-text">Network</span>
          </motion.h2>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm font-bold ${!isYearly ? 'text-indigo-500' : 'text-slate-500'}`}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'}`}
            >
              <motion.div
                animate={{ x: isYearly ? 28 : 4 }}
                className="absolute top-1 left-0 w-5 h-5 bg-indigo-500 rounded-full shadow-lg"
              />
            </button>
            <span className={`text-sm font-bold ${isYearly ? 'text-indigo-500' : 'text-slate-500'}`}>
              Yearly <span className="ml-1 text-[10px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full border border-green-500/20">SAVE 20%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative group ${plan.popular ? 'z-10' : 'z-0'}`}
            >
              {plan.popular && (
                <>
                  <div className="absolute -inset-[2px] rounded-[34px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-spin-slow blur-[2px]" style={{ animationDuration: '6s' }} />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-xl">
                    Most Popular
                  </div>
                </>
              )}

              <div className={`relative h-full glass p-6 md:p-8 rounded-[24px] md:rounded-[32px] border transition-all duration-300 flex flex-col ${plan.popular
                ? (theme === 'dark' ? 'bg-slate-900 border-indigo-500/50 scale-100 md:scale-105' : 'bg-white border-indigo-400 scale-100 md:scale-105 shadow-2xl')
                : (theme === 'dark' ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:bg-white hover:border-indigo-400 shadow-sm hover:shadow-xl')
                }`}>
                <div className="mb-8 text-left">
                  <h3 className={`text-lg font-black mb-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>${plan.price}</span>
                    <span className="text-slate-500 text-sm">/mo</span>
                  </div>
                </div>

                <div className={`p-4 rounded-2xl mb-8 text-left ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white border border-slate-100 shadow-inner'}`}>
                  <div className="text-indigo-600 text-2xl font-black mb-1">
                    <AnimatedNumber value={plan.contacts} />
                  </div>
                  <div className={`text-xs font-black uppercase tracking-widest ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Indexed Connections</div>
                </div>

                <ul className="space-y-4 mb-10 flex-1 text-left">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <div className="mt-1 bg-indigo-500/10 rounded-full p-0.5">
                        <Check className="w-3 h-3 text-indigo-500" />
                      </div>
                      <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-600 font-medium'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 shadow-md ${plan.popular
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                  : (theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 hover:border-indigo-400')
                  }`}>
                  {plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-8 pt-10 border-t border-slate-800/20">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-indigo-500" />
            <div className="text-left">
              <div className={`text-sm font-black ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>Encrypted via SSL/TLS</div>
              <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Cognitive Sovereignty Protocol</div>
            </div>
          </div>

          <div className="flex items-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <CreditCard className="w-6 h-6" />
            <div className="flex gap-2">
              <div className="w-10 h-6 bg-slate-700/20 rounded-md border border-slate-700/30" />
              <div className="w-10 h-6 bg-slate-700/20 rounded-md border border-slate-700/30" />
              <div className="w-10 h-6 bg-slate-700/20 rounded-md border border-slate-700/30" />
            </div>
          </div>

          <div className={`text-[10px] font-bold uppercase tracking-widest text-center md:text-right ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
            *Yearly billing applied. <br />
            MemorableContact Cloud Indexing v4.1
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
