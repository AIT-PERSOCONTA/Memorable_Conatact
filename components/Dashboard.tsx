
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Users,
  CreditCard,
  Settings,
  Bell,
  ChevronRight,
  MoreHorizontal,
  Plus,
  Filter,
  Download,
  Menu,
  X
} from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import ContactForm from './ContactForm';
import AIChat from './AIChat';
import { MessageSquare, Clock, User, Bot, Save, MapPin } from 'lucide-react';

interface DashboardProps {
  theme: 'light' | 'dark';
}

const Dashboard: React.FC<DashboardProps> = ({ theme }) => {
  const [activeTab, setActiveTab] = useState('My Contacts');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const logoUrl = "https://res.cloudinary.com/dkpwmrjkq/image/upload/v1771251254/cd0f3692-7e39-46e1-8c0f-60b0eee21b3f_b6krz5.jpg";

  const sidebarLinks = [
    { name: 'AI Chat', icon: <MessageSquare className="w-5 h-5" /> },
    { name: 'My Contacts', icon: <Users className="w-5 h-5" /> },
    { name: 'Chat History', icon: <CreditCard className="w-5 h-5" /> },
  ];

  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem('memorable_contacts');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: "Pradeep Sharma", title: "Senior Editor", company: "Maven Media", event: "Global Freelancer Festival", venue: "Grand Ballroom", city: "Chennai", phone: "+91 98765 43210", image: "https://i.pravatar.cc/150?u=ps", initials: "PS", color: "bg-indigo-500", email: "pradeep@maven.com" },
      { id: 2, name: "Sarah Jenkins", title: "AI Research Lead", company: "Google DeepMind", event: "TechCrunch Disrupt", venue: "Stage A", city: "San Francisco", phone: "+1 (555) 012-3456", image: "https://i.pravatar.cc/150?u=sj", initials: "SJ", color: "bg-purple-500", email: "sarah@deepmind.com" },
      { id: 3, name: "Marcus Thorne", title: "VC Partner", company: "A16Z", event: "Private Mixer", venue: "Penthouse Suite", city: "Austin", phone: "+1 (555) 987-6543", image: "https://i.pravatar.cc/150?u=mt", initials: "MT", color: "bg-blue-500", email: "marcus@a16z.com" },
    ];
  });

  const [chatHistory, setChatHistory] = useState<any[]>([]);

  React.useEffect(() => {
    const history = JSON.parse(localStorage.getItem('memorable_chat_history') || '[]');
    setChatHistory(history);
  }, [activeTab]);

  const refreshContacts = () => {
    const saved = localStorage.getItem('memorable_contacts');
    if (saved) setContacts(JSON.parse(saved));
  };

  const handleAddContact = (newContact: any) => {
    setContacts((prev: any[]) => [newContact, ...prev]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className={`flex flex-col lg:flex-row h-screen lg:h-[850px] w-full max-w-7xl mx-auto overflow-hidden lg:rounded-[40px] border transition-all duration-500 ${theme === 'dark' ? 'bg-slate-950 border-slate-800 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)]' : 'bg-white border-slate-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)]'}`}>

      {/* Sidebar - Desktop */}
      <aside className={`hidden lg:flex w-80 flex-col border-r transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
        <div className="p-8 xl:p-10">
          <div className="flex flex-col items-center gap-6 mb-12">
            <div className="relative group">
              <img
                src={logoUrl}
                alt="MemorableContact Logo"
                className="w-20 h-20 xl:w-24 xl:h-24 rounded-[24px] xl:rounded-[32px] object-cover shadow-2xl ring-4 ring-indigo-500/10 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -inset-4 bg-indigo-500/10 blur-2xl rounded-full opacity-50 -z-10" />
            </div>
            <div className="text-center">
              <span className={`text-xl xl:text-2xl font-black tracking-tighter block ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>MemorableContact</span>
              <span className="text-[9px] xl:text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500">Workspace</span>
            </div>
          </div>

          <nav className="space-y-3">
            {sidebarLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => setActiveTab(link.name)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-black transition-all ${activeTab === link.name
                  ? (theme === 'dark' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30' : 'bg-indigo-600 text-white shadow-xl')
                  : (theme === 'dark' ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900')
                  }`}
              >
                {link.icon}
                {link.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-10 space-y-4">
          <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-black ${theme === 'dark' ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'}`}>
            <Settings className="w-5 h-5" />
            System Settings
          </button>
          <div className={`flex items-center gap-4 p-5 rounded-3xl border ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs xl:text-sm font-black text-white shadow-lg">
              JD
            </div>
            <div className="flex-1 overflow-hidden text-left">
              <div className={`text-xs xl:text-sm font-black truncate ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Jane Doe</div>
              <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest truncate">Enterprise Node</div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          >
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className={`w-72 h-full flex flex-col transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900 border-r border-slate-800' : 'bg-white border-r border-slate-200'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-3">
                    <img src={logoUrl} className="w-10 h-10 rounded-xl" alt="Logo" />
                    <span className={`text-lg font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>MemorableContact</span>
                  </div>
                  <button onClick={() => setIsSidebarOpen(false)} className="p-2 rounded-xl bg-slate-800/20 text-slate-500">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-2">
                  {sidebarLinks.map((link) => (
                    <button
                      key={link.name}
                      onClick={() => { setActiveTab(link.name); setIsSidebarOpen(false); }}
                      className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl text-sm font-black transition-all ${activeTab === link.name
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                        : (theme === 'dark' ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100')
                        }`}
                    >
                      {link.icon}
                      {link.name}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="mt-auto p-8 border-t border-slate-800/50">
                <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-black mb-4 ${theme === 'dark' ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'}`}>
                  <Settings className="w-5 h-5" />
                  Settings
                </button>
                <div className={`flex items-center gap-3 p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-black text-white">
                    JD
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className={`text-xs font-black truncate ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Jane Doe</div>
                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Enterprise</div>
                  </div>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Header / Search */}
        <header className={`px-4 lg:px-12 py-4 lg:py-7 border-b flex items-center justify-between gap-3 md:gap-12 transition-colors duration-300 z-30 sticky top-0 ${theme === 'dark' ? 'border-slate-800 bg-slate-950/80 backdrop-blur-xl' : 'border-slate-200 bg-white/80 backdrop-blur-xl'}`}>
          <div className="flex lg:hidden items-center">
            <button onClick={() => setIsSidebarOpen(true)} className={`p-2 rounded-xl border ${theme === 'dark' ? 'border-slate-800 bg-slate-900 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-500'}`}>
              <Menu className="w-5 h-5" />
            </button>
          </div>

          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-3 lg:left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Query..."
              className={`w-full py-2.5 lg:py-4 pl-10 lg:pl-14 pr-4 rounded-xl text-[10px] lg:text-sm border font-black focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all ${theme === 'dark' ? 'bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600' : 'bg-white border-slate-200 text-slate-900 shadow-sm placeholder:text-slate-400'
                }`}
            />
          </div>
          <div className="flex items-center gap-2 lg:gap-6">
            <button className={`p-2.5 lg:p-4 rounded-xl border relative ${theme === 'dark' ? 'bg-slate-900 border-slate-700 text-slate-400' : 'bg-white border-slate-200 text-slate-500'}`}>
              <Bell className="w-4 h-4" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white dark:border-slate-950" />
            </button>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="px-4 lg:px-8 py-2.5 lg:py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] lg:text-sm font-black shadow-lg transition-all uppercase tracking-widest whitespace-nowrap"
            >
              <Plus className="w-4 h-4 sm:hidden" />
              <span className="hidden sm:inline">New Entry</span>
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-12 scrollbar-hide">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 lg:mb-12 gap-6">
            <div className="text-left">
              <h1 className={`text-2xl lg:text-4xl font-black mb-1 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{activeTab}</h1>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 opacity-60">
                {activeTab === 'My Contacts' ? `Relationship Fragments (${contacts.length})` : 'Neural Interface Active'}
              </p>
            </div>
            {activeTab === 'My Contacts' && (
              <div className="flex items-center gap-3">
                <button className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] ${theme === 'dark' ? 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white' : 'bg-white border-slate-200 text-slate-600 shadow-sm hover:bg-slate-50'}`}>
                  <Filter className="w-3.5 h-3.5" />
                  Filter
                </button>
                <button className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] ${theme === 'dark' ? 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white' : 'bg-white border-slate-200 text-slate-600 shadow-sm hover:bg-slate-50'}`}>
                  <Download className="w-3.5 h-3.5" />
                  Export
                </button>
              </div>
            )}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'My Contacts' && (
              <motion.div
                key="contacts"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {/* Table Container with scroll */}
                <div className={`overflow-x-auto rounded-[24px] lg:rounded-[32px] border transition-colors duration-300 ${theme === 'dark' ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white shadow-sm'}`}>
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className={`border-b text-[8px] lg:text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 transition-colors duration-300 ${theme === 'dark' ? 'border-slate-800' : 'border-slate-100 bg-slate-50/80'}`}>
                        <th className="px-4 lg:px-10 py-4 lg:py-6 text-left">Connection</th>
                        <th className="px-4 lg:px-10 py-4 lg:py-6 text-left hidden sm:table-cell">Role</th>
                        <th className="px-4 lg:px-10 py-4 lg:py-6 text-left hidden md:table-cell">Origin</th>
                        <th className="px-4 lg:px-10 py-4 lg:py-6 text-left hidden lg:table-cell">Coordinates</th>
                        <th className="px-4 lg:px-10 py-4 lg:py-6"></th>
                      </tr>
                    </thead>
                    <motion.tbody
                      variants={containerVariants}
                      initial="hidden"
                      animate="show"
                    >
                      {contacts.map((contact: any) => (
                        <motion.tr
                          key={contact.id}
                          variants={itemVariants}
                          className={`border-b last:border-0 transition-colors group cursor-pointer ${theme === 'dark' ? 'border-slate-800 hover:bg-white/5' : 'border-slate-50 hover:bg-slate-50/80'}`}
                        >
                          <td className="px-4 lg:px-10 py-4 lg:py-6">
                            <div className="flex items-center gap-3 lg:gap-5">
                              <div className={`w-8 h-8 lg:w-12 lg:h-12 rounded-lg lg:rounded-2xl overflow-hidden shadow-xl`}>
                                {contact.image ? (
                                  <img src={contact.image} alt={contact.name} className="w-full h-full object-cover" />
                                ) : (
                                  <div className={`w-full h-full ${contact.color} flex items-center justify-center text-[10px] lg:text-sm font-black text-white`}>
                                    {contact.initials}
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col text-left">
                                <span className={`text-[11px] lg:text-sm font-black ${theme === 'dark' ? 'text-slate-200' : 'text-slate-900'}`}>{contact.name}</span>
                                <span className="text-[8px] font-bold text-slate-500">{contact.phone}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 lg:px-10 py-4 lg:py-6 hidden sm:table-cell">
                            <div className="flex flex-col text-left">
                              <span className={`text-[10px] lg:text-sm font-black ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{contact.title}</span>
                              <span className="text-[8px] lg:text-[10px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">at {contact.company}</span>
                            </div>
                          </td>
                          <td className="px-4 lg:px-10 py-4 lg:py-6 hidden md:table-cell">
                            <span className={`px-2 lg:px-4 py-1 rounded-lg lg:rounded-xl text-[8px] lg:text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${theme === 'dark' ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                              {contact.event}
                            </span>
                          </td>
                          <td className="px-4 lg:px-10 py-4 lg:py-6 hidden lg:table-cell">
                            <div className="flex flex-col text-left">
                              <div className="flex items-center gap-2 text-[10px] lg:text-xs font-black text-slate-500">
                                <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-indigo-500" />
                                {contact.venue}
                              </div>
                              <span className="text-[9px] font-bold text-slate-400 pl-6 uppercase tracking-widest">{contact.city}</span>
                            </div>
                          </td>
                          <td className="px-4 lg:px-10 py-4 lg:py-6 text-right">
                            <button className="p-2 lg:opacity-0 group-hover:opacity-100 transition-opacity rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500">
                              <MoreHorizontal className="w-5 h-5" />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </motion.tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'AI Chat' && (
              <motion.div
                key="aichat"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full"
              >
                <AIChat theme={theme} onContactSaved={refreshContacts} />
              </motion.div>
            )}

            {activeTab === 'Chat History' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {chatHistory.length === 0 ? (
                    <div className="col-span-2 py-20 text-center">
                      <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No Recent Neural Activity Recorded</p>
                    </div>
                  ) : (
                    chatHistory.slice().reverse().map((msg: any) => (
                      <div
                        key={msg.id}
                        className={`p-5 rounded-3xl border transition-all ${theme === 'dark' ? 'bg-slate-900 border-slate-800 hover:border-orange-500/30' : 'bg-white border-slate-100 shadow-sm hover:shadow-md'}`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${msg.role === 'user' ? 'bg-orange-500' : 'bg-indigo-500'}`}>
                            {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                          </div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                        <p className={`text-xs font-bold leading-relaxed mb-4 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                          {msg.content}
                        </p>
                        {msg.type === 'contact' && (
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 rounded-full w-fit">
                            <Save className="w-3 h-3 text-orange-500" />
                            <span className="text-[8px] font-black text-orange-500 uppercase tracking-widest">Saved Connection: {msg.data.name}</span>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <ContactForm
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        onSubmit={handleAddContact}
        theme={theme}
      />
    </div>
  );
};

export default Dashboard;
