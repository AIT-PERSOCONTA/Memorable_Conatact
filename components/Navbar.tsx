
import React from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  activeSection: string;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onDashboardToggle?: () => void;
  onNavigate: (view: 'home' | 'about' | 'resources' | 'pricing') => void;
  currentView: 'home' | 'about' | 'resources' | 'pricing';
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, theme, toggleTheme, onDashboardToggle, onNavigate, currentView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const logoUrl = "https://res.cloudinary.com/dkpwmrjkq/image/upload/v1771251254/cd0f3692-7e39-46e1-8c0f-60b0eee21b3f_b6krz5.jpg";

  const closeMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { href: '#', label: 'Home', section: 'hero', view: 'home' as const },
    { href: '#about', label: 'About', section: 'how-it-works', view: 'about' as const },
    { href: '#pricing', label: 'Pricing', section: 'pricing', view: 'pricing' as const },
    { href: '#resources', label: 'Resources', section: 'clips', view: 'resources' as const },
  ];

  return (
    <nav className="fixed top-2 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-7xl">
      <div className={`glass nav-glow px-4 md:px-10 py-3 md:py-6 rounded-[24px] md:rounded-[32px] flex items-center justify-between transition-all duration-500`}>
        <div className="flex items-center gap-3 md:gap-5 cursor-pointer group" onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); closeMenu(); }}>
          <div className="relative">
            <img
              src={logoUrl}
              alt="MemorableContact Logo"
              className="w-8 h-8 md:w-14 md:h-14 rounded-[8px] md:rounded-[14px] object-cover shadow-lg ring-2 ring-indigo-500/10 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute -inset-1.5 bg-indigo-500/10 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col">
            <span className={`text-xs md:text-xl font-black tracking-tighter leading-none bg-gradient-to-r ${theme === 'dark' ? 'from-white to-slate-400' : 'from-slate-900 to-slate-600'} bg-clip-text text-transparent`}>
              MemorableContact
            </span>
            <span className="text-[5px] md:text-[8px] font-bold uppercase tracking-[0.3em] text-indigo-500 mt-0.5">By Asokumar IT</span>
          </div>
        </div>

        <div className="hidden xl:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                onNavigate(link.view);
                if (link.view === 'home' && link.href !== '#') {
                  setTimeout(() => {
                    const el = document.querySelector(link.href);
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className={`text-[11px] font-black uppercase tracking-widest transition-all hover:translate-y-[-1px] ${(currentView === link.view && activeSection === link.section) ? 'text-indigo-600' : (theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')}`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={toggleTheme}
            className={`p-2 md:p-2.5 rounded-lg md:rounded-xl transition-all duration-300 ${theme === 'dark' ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-200 text-slate-600'}`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 md:w-5 md:h-5" /> : <Moon className="w-4 h-4 md:w-5 md:h-5" />}
          </button>

          <button onClick={onDashboardToggle} className="hidden md:block px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl md:rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/20 active:scale-95 border border-white/10">
            Book a Call
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`xl:hidden p-2 md:p-3 rounded-xl md:rounded-2xl transition-all duration-300 ${theme === 'dark' ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-200 text-slate-600'}`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`xl:hidden absolute top-full left-0 right-0 mt-4 glass nav-glow p-6 rounded-[24px] flex flex-col gap-4 border overflow-hidden ${theme === 'dark' ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200 bg-white/90'}`}
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  onNavigate(link.view);
                  closeMenu();
                  if (link.view === 'home' && link.href !== '#') {
                    setTimeout(() => {
                      const el = document.querySelector(link.href);
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }
                }}
                className={`text-lg font-black uppercase tracking-widest px-4 py-3 rounded-xl text-left transition-all ${(currentView === link.view && activeSection === link.section) ? 'bg-indigo-600 text-white' : (theme === 'dark' ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900')}`}
              >
                {link.label}
              </button>
            ))}
            <div className="h-px bg-slate-800/50 my-2" />
            <button
              onClick={() => { onDashboardToggle?.(); closeMenu(); }}
              className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl"
            >
              Book a Call
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
