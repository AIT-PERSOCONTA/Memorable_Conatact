import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    BookOpen,
    Layout,
    ChevronRight,
    Mail,
    Linkedin,
    ExternalLink,
    ArrowLeft,
    Sparkles,
    Zap,
    MapPin,
    RefreshCw,
    Cpu,
    ShieldCheck
} from 'lucide-react';

interface ResourcesProps {
    theme: 'light' | 'dark';
    onBack: () => void;
}

const BLOG_POSTS = [
    {
        category: "Networking Science",
        title: "The Cost of Forgotten Names",
        description: "How much business opportunity is lost when we forget a key contact? Discover the cognitive science behind professional memory.",
        icon: <Cpu className="w-5 h-5 text-indigo-500" />,
        readTime: "6 min read"
    },
    {
        category: "Networking Science",
        title: "Active Listening vs. Passive Hearing",
        description: "Using Memorable Contact to turn fleeting conversations into permanent, searchable records for your digital brain.",
        icon: <Sparkles className="w-5 h-5 text-purple-500" />,
        readTime: "8 min read"
    },
    {
        category: "Networking Science",
        title: "The Power of Context",
        description: "Why knowing where you met someone (GPS-stamped context) doubles your chance of a successful follow-up.",
        icon: <MapPin className="w-5 h-5 text-red-500" />,
        readTime: "5 min read"
    },
    {
        category: "Event Mastery",
        title: "The 'VivaTech' Survival Guide",
        description: "How to use Offline-Mode to capture 50+ contacts without cellular data or reliable WiFi.",
        icon: <Zap className="w-5 h-5 text-yellow-500" />,
        readTime: "10 min read"
    },
    {
        category: "Event Mastery",
        title: "Beyond the Business Card",
        description: "Why your digital card is your most powerful closer after a 2-minute pitch at a crowded mixer.",
        icon: <ExternalLink className="w-5 h-5 text-blue-500" />,
        readTime: "4 min read"
    },
    {
        category: "Event Mastery",
        title: "Post-Event Workflow",
        description: "A 10-minute routine to organize your new connections in the Memorable Contact Table View.",
        icon: <Layout className="w-5 h-5 text-emerald-500" />,
        readTime: "7 min read"
    },
    {
        category: "AI & Productivity",
        title: "Natural Language Queries",
        description: "5 questions you didn't know you could ask your memory assistant to filter your network instantly.",
        icon: <Search className="w-5 h-5 text-indigo-400" />,
        readTime: "6 min read"
    },
    {
        category: "AI & Productivity",
        title: "OCR Hacks",
        description: "How to turn a stack of physical cards into a searchable database in minutes with neural scanning.",
        icon: <RefreshCw className="w-5 h-5 text-blue-400" />,
        readTime: "5 min read"
    },
    {
        category: "AI & Productivity",
        title: "The End of Manual Entry",
        description: "How AI parsing is making traditional data entry obsolete for performance-driven leaders.",
        icon: <ShieldCheck className="w-5 h-5 text-green-500" />,
        readTime: "9 min read"
    }
];

const LEAD_MAGNETS = [
    {
        title: "Professional Networking Kit",
        type: "PDF Checklist",
        description: "What to bring and how to follow up like a pro.",
        color: "from-indigo-600 to-blue-600"
    },
    {
        title: "Building a Million-Dollar Network",
        type: "E-Book",
        description: "Strategies to cultivate your network from your pocket.",
        color: "from-purple-600 to-pink-600"
    },
    {
        title: "High-Conversion Follow-Up Templates",
        type: "Template Pack",
        description: "3 templates for new connections that actually get replies.",
        color: "from-emerald-600 to-teal-600"
    }
];

const Resources: React.FC<ResourcesProps> = ({ theme, onBack }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = BLOG_POSTS.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                    <span className="text-xs font-black uppercase tracking-widest">Return to Surface</span>
                </motion.button>

                {/* Hero Section */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-6"
                    >
                        The Memory Lab
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-tight">
                        Knowledge for the <span className="gradient-text">Connected.</span>
                    </h1>
                    <p className={`max-w-2xl mx-auto font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                        Explore our laboratory of networking science, event mastery guides, and productivity hacks.
                    </p>

                    {/* Smart Search */}
                    <div className="mt-12 max-w-2xl mx-auto relative cursor-text group" onClick={() => document.getElementById('blog-search')?.focus()}>
                        <div className={`absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[20px] md:rounded-[24px] blur opacity-20 group-hover:opacity-40 transition-opacity`} />
                        <div className={`relative glass rounded-[20px] md:rounded-[24px] border ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'} flex items-center px-6 py-4 md:py-5`}>
                            <Search className="w-5 h-5 text-indigo-500 mr-4" />
                            <input
                                id="blog-search"
                                type="text"
                                placeholder="Query the lab (e.g., 'event survival', 'memory')..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent border-none focus:outline-none text-sm md:text-base font-bold placeholder:text-slate-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Blog Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post, i) => (
                            <motion.div
                                key={post.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className={`flex flex-col glass rounded-[32px] border overflow-hidden p-8 transition-all duration-300 group ${theme === 'dark'
                                    ? 'border-slate-800 hover:border-indigo-500/50 hover:bg-white/5'
                                    : 'border-slate-200 bg-white shadow-sm hover:shadow-xl hover:border-indigo-400'
                                    }`}
                            >
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${theme === 'dark' ? 'bg-slate-800' : 'bg-indigo-50'}`}>
                                    {post.icon}
                                </div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-indigo-500 text-[10px] font-black uppercase tracking-widest">{post.category}</span>
                                    <span className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">{post.readTime}</span>
                                </div>
                                <h3 className={`text-xl font-black mb-3 leading-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{post.title}</h3>
                                <p className={`text-sm leading-relaxed mb-6 font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                                    {post.description}
                                </p>
                                <button className="mt-auto flex items-center gap-2 text-indigo-500 font-bold text-xs uppercase tracking-widest hover:gap-3 transition-all">
                                    Read Article <ChevronRight className="w-4 h-4" />
                                </button>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center opacity-50">
                            <Search className="w-12 h-12 mx-auto mb-4 text-slate-500" />
                            <p className="font-bold uppercase tracking-widest">No lab fragments found for "{searchQuery}"</p>
                        </div>
                    )}
                </div>

                {/* Lead Magnets Section */}
                <div className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">Lead Magnets & Kits</h2>
                        <p className={`max-w-xl mx-auto font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Premium tools to accelerate your networking ROI.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {LEAD_MAGNETS.map((kit) => (
                            <motion.div
                                key={kit.title}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className={`relative p-8 rounded-[40px] overflow-hidden group cursor-pointer border ${theme === 'dark' ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white shadow-lg'}`}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${kit.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${kit.color} flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-600/20`}>
                                    <BookOpen className="w-6 h-6" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-2 block">{kit.type}</span>
                                <h3 className={`text-xl font-black mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{kit.title}</h3>
                                <p className={`text-sm mb-6 font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{kit.description}</p>
                                <button className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] border transition-all ${theme === 'dark'
                                    ? 'border-slate-700 hover:bg-white hover:text-slate-950'
                                    : 'border-slate-200 hover:bg-indigo-600 hover:text-white hover:border-indigo-600'
                                    }`}>
                                    Download Resource
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Contact & Support Section */}
                <div className={`rounded-[40px] p-8 md:p-16 border relative overflow-hidden transition-all duration-500 ${theme === 'dark'
                    ? 'bg-slate-900/50 border-slate-800'
                    : 'bg-white border-slate-200 shadow-2xl'
                    }`}>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full -z-10" />
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="flex-1 text-center lg:text-left">
                            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6 leading-tight">
                                Have a specific memory need? <br />
                                <span className="text-indigo-600">Let's chat.</span>
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                                <div className="p-6 rounded-3xl bg-slate-50/50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                                    <Mail className="w-6 h-6 text-indigo-500 mb-4" />
                                    <h4 className="font-black text-sm uppercase tracking-widest mb-2">Technical Support</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        Stuck in a conference basement with no signal? Our offline sync has your back. <br />
                                        <span className="text-indigo-500 font-bold">support@memorablecontact.com</span>
                                    </p>
                                </div>
                                <div className="p-6 rounded-3xl bg-slate-50/50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                                    <Linkedin className="w-6 h-6 text-indigo-500 mb-4" />
                                    <h4 className="font-black text-sm uppercase tracking-widest mb-2">Partnerships & Events</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        Planning a major event? Contact our CEO, Amurtha, for enterprise-level digital visiting card solutions.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/3 flex flex-col gap-4">
                            <button className="w-full py-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-3xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-indigo-600/30 active:scale-95 transition-all">
                                Join Community Node
                            </button>
                            <button className={`w-full py-6 rounded-3xl font-black uppercase tracking-[0.2em] text-xs border transition-all ${theme === 'dark' ? 'border-slate-800 hover:bg-slate-800' : 'border-slate-200 hover:bg-slate-50'
                                }`}>
                                View Documentation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resources;
