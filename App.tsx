
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import NeuralBackground from './components/NeuralBackground';
import FuzzyRecall from './components/FuzzyRecall';
import MockupDemo from './components/MockupDemo';
import Pricing from './components/Pricing';
import Dashboard from './components/Dashboard';
import DemoVideo from './components/DemoVideo';
import Testimonials from './components/Testimonials';
import Partners from './components/Partners';
import SupportChat from './components/SupportChat';
import About from './pages/About';
import Resources from './pages/Resources';
import PricingPage from './pages/PricingPage';
import ExperienceFlow from './components/ExperienceFlow';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [showDashboard, setShowDashboard] = useState(false);
  const [view, setView] = useState<'home' | 'about' | 'resources' | 'pricing'>('home');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('memorable-contact-theme') as 'light' | 'dark') || 'dark';
  });

  useEffect(() => {
    const body = document.body;
    if (theme === 'dark') {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
    } else {
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
    }
    localStorage.setItem('memorable-contact-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY < 600) setActiveSection('hero');
      else if (scrollY < 1200) setActiveSection('features');
      else if (scrollY < 1800) setActiveSection('how-it-works');
      else if (scrollY < 2400) setActiveSection('flow');
      else if (scrollY < 3400) setActiveSection('video-demo');
      else if (scrollY < 4400) setActiveSection('recall');
      else if (scrollY < 4900) setActiveSection('pricing');
      else if (scrollY < 5800) setActiveSection('playground');
      else setActiveSection('how-it-works');
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`relative min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-950 text-slate-50' : 'bg-slate-50 text-slate-900'}`}>
      <NeuralBackground theme={theme} />

      <div className="relative z-10 flex flex-col items-center">
        <Navbar
          activeSection={activeSection}
          theme={theme}
          toggleTheme={toggleTheme}
          onDashboardToggle={() => setShowDashboard(!showDashboard)}
          onNavigate={(newView) => {
            setView(newView);
            setShowDashboard(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          currentView={view}
        />

        {view === 'about' ? (
          <About theme={theme} onBack={() => setView('home')} />
        ) : view === 'resources' ? (
          <Resources theme={theme} onBack={() => setView('home')} />
        ) : view === 'pricing' ? (
          <PricingPage theme={theme} onBack={() => setView('home')} />
        ) : showDashboard ? (
          <div className="pt-48 pb-24 px-6 flex items-center justify-center min-h-screen">
            <div className="w-full">
              <div className="max-w-7xl mx-auto mb-10 flex justify-between items-center px-6">
                <h2 className="text-3xl font-black tracking-tighter">Command Center</h2>
                <button
                  onClick={() => setShowDashboard(false)}
                  className="px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest bg-slate-800 text-white hover:bg-slate-700 shadow-xl transition-all"
                >
                  Return to Surface
                </button>
              </div>
              <Dashboard theme={theme} />
            </div>
          </div>
        ) : (
          <main>
            <div id="hero">
              <Hero theme={theme} onGetStarted={() => setShowDashboard(true)} />
            </div>

            <Partners theme={theme} />

            <div id="features" className="py-24 px-6 lg:px-12">
              <Features theme={theme} />
            </div>

            <div id="how-it-works">
              <MockupDemo theme={theme} />
            </div>

            <div id="flow">
              <ExperienceFlow theme={theme} />
            </div>

            <div id="video-demo">
              <DemoVideo theme={theme} />
            </div>

            <Testimonials theme={theme} />

            <div id="recall">
              <FuzzyRecall theme={theme} />
            </div>

            <div id="pricing">
              <Pricing theme={theme} />
            </div>

            <div id="playground" className="py-32 px-6 lg:px-12 relative overflow-hidden">
              <div className="max-w-7xl mx-auto text-center mb-20">
                <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none">Live Demo <span className="text-indigo-500">Playground</span></h2>
                <p className="max-w-2xl mx-auto text-slate-500 font-bold text-lg leading-relaxed">Your connections deserve more than a contact card. They deserve a persistent cognitive node in MemorableContact.</p>
              </div>
              <div className="opacity-80 hover:opacity-100 transition-opacity duration-700 pointer-events-none lg:pointer-events-auto">
                <Dashboard theme={theme} />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-20 pointer-events-none" />
              <div className="flex justify-center mt-12 relative z-30">
                <button
                  onClick={() => setShowDashboard(true)}
                  className="px-12 py-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-indigo-600/40 active:scale-95 transition-all"
                >
                  Access Workspace Preview
                </button>
              </div>
            </div>
          </main>
        )}

        <footer className={`py-20 px-6 border-t transition-colors duration-300 ${theme === 'dark' ? 'border-slate-800 bg-slate-950' : 'border-slate-100 bg-slate-50'}`}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex flex-col items-center md:items-start">
              <div className="text-xl font-black tracking-tighter mb-2">MemorableContact</div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">© {new Date().getFullYear()} Cognitive Labs AI.</p>
            </div>
            <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.3em]">
              <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">Security</a>
              <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">Privacy</a>
              <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">Protocol</a>
              <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">Nodes</a>
            </div>
          </div>
        </footer>

        <SupportChat theme={theme} />
      </div>
    </div>
  );
};

export default App;
