
import React from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "We recorded both voice and chat flows in one platform. That alone saved us weeks. We caught things we didn't even think to recall.",
    name: "Subashini",
    role: "",
    company: ""
  },
  {
    quote: "Reliable, fast, and surprisingly easy to use. MemorableContact is now a critical part of our professional networking pipeline.",
    name: "Arun",
    role: "",
    company: ""
  },
  {
    quote: "Our productivity improved overnight. The platform understands how people really connect — not just perfect scripts.",
    name: "Aswathy",
    role: "",
    company: ""
  },
  {
    quote: "MemorableContact helped us scale real-world relationships. Our team is smarter and more robust because of it.",
    name: "Hemanth",
    role: "",
    company: ""
  }
];

const Testimonials: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  return (
    <section id="testimonials" className="py-32 px-0 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div className="responsive-container flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

        {/* Left Side: Content & Graphic */}
        <div className="lg:w-[40%] flex flex-col items-start pt-8">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`text-6xl lg:text-7xl font-black mb-8 tracking-tighter leading-[1.1] ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}
          >
            What Our <br />
            <span className="text-slate-500">Customers Say</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-lg md:text-xl font-medium max-w-sm mb-12 leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}
          >
            With a 4.8-out-of-5-star rating and a bunch of distinctions, MemorableContact users have declared it an industry standard in AI productivity.
          </motion.p>

          {/* Hand-drawn Arrow Graphic */}
          <motion.div
            initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
            whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring" }}
            className="hidden lg:block relative ml-8"
          >
            <svg width="220" height="140" viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 130C30 130 50 115 80 100C110 85 140 60 160 40C170 30 180 15 175 5" stroke={theme === 'dark' ? 'white' : '#020617'} strokeWidth="4" strokeLinecap="round" strokeDasharray="1 8" />
              <path d="M165 35L195 20L180 50" stroke={theme === 'dark' ? 'white' : '#020617'} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="10" cy="130" r="6" fill={theme === 'dark' ? 'white' : '#020617'} />
              <path d="M10 130Q30 130 40 120T60 110Q80 100 100 90T140 70Q160 60 180 40T200 20" stroke={theme === 'dark' ? 'white' : '#020617'} strokeWidth="3" fill="none" strokeLinecap="round" className="opacity-80" />
            </svg>
          </motion.div>
        </div>

        {/* Right Side: Grid of Cards */}
        <div className="lg:w-[60%] grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-[24px] border flex flex-col transition-all duration-300 ${theme === 'dark'
                ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
                }`}
            >
              <p className={`text-base font-medium leading-relaxed mb-8 flex-1 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                “{t.quote}”
              </p>

              <div>
                <div className={`font-black text-sm mb-0.5 ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
                  {t.name}
                </div>
                <div className="text-[11px] font-bold">
                  <span className="text-slate-500">{t.role} </span>
                  <span className="text-indigo-500">{t.company}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
