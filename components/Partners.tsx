
import React from 'react';
import { motion } from 'framer-motion';

interface PartnersProps {
  theme: 'light' | 'dark';
}

const partners = [
  "Asokumar IT", "Asokumer ES", "AGC"
];

const Partners: React.FC<PartnersProps> = ({ theme }) => {
  return (
    <section className={`py-12 md:py-16 border-y ${theme === 'dark' ? 'border-slate-800 bg-slate-900/20' : 'border-slate-100 bg-slate-50/30'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <p className={`text-center text-[9px] md:text-[10px] uppercase font-black tracking-[0.3em] mb-8 md:mb-12 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
          Trusted and Featured By
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
          {partners.map((partner) => (
            <motion.div
              key={partner}
              whileHover={{ scale: 1.05 }}
              className={`text-lg md:text-2xl font-black tracking-tighter ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}
            >
              {partner}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
