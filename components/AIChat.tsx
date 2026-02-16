import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Loader2, Save, RefreshCw, Image as ImageIcon } from 'lucide-react';

interface Contact {
    id: number;
    name: string;
    location: string;
    phone: string;
    email: string;
    context: string;
    tags: string[];
    image?: string;
    color?: string;
    initials?: string;
}

interface ChatMessage {
    id: string;
    role: 'user' | 'bot';
    content: string;
    type?: 'contact' | 'text';
    data?: any;
    timestamp: string;
}

interface AIChatProps {
    theme: 'light' | 'dark';
    onContactSaved?: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ theme, onContactSaved }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Load chat session (not history tab, just current session) or history if requested
    useEffect(() => {
        const savedMsg = localStorage.getItem('memorable_current_session');
        if (savedMsg) {
            setMessages(JSON.parse(savedMsg));
        } else {
            setMessages([{
                id: '1',
                role: 'bot',
                content: "Hello! I'm your MemorableContact AI. I can help you capture new professional connections or retrieve anyone from your memory graph. Try saying: 'I met Sarah at the Tech Summit, her number is 555-0192' or 'Who did I meet at the Summit?'",
                timestamp: new Date().toISOString()
            }] as ChatMessage[]);
        }
    }, []);

    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem('memorable_current_session', JSON.stringify(messages));

            // Also update the persistent Chat History tab
            const fullHistory = JSON.parse(localStorage.getItem('memorable_chat_history') || '[]');
            // For simplicity, we just keep the latest session in history or append
            // Let's append unique messages to history
            const newHistory = [...fullHistory];
            messages.forEach((msg: ChatMessage) => {
                if (!newHistory.find((h: ChatMessage) => h.id === msg.id)) {
                    newHistory.push(msg);
                }
            });
            localStorage.setItem('memorable_chat_history', JSON.stringify(newHistory.slice(-100))); // Keep last 100
        }
    }, [messages]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const localProcessChat = (input: string) => {
        const isRetrieval = /who|find|search|retrieve|get|recall/i.test(input);
        const contacts: Contact[] = JSON.parse(localStorage.getItem('memorable_contacts') || '[]');

        if (isRetrieval) {
            // Retrieval Logic: Search by name or keyword
            const searchTerm = input.replace(/who|find|search|retrieve|get|recall|is|the/gi, '').trim().toLowerCase();
            const found = contacts.find((c: Contact) =>
                c.name.toLowerCase().includes(searchTerm) ||
                c.context?.toLowerCase().includes(searchTerm) ||
                c.location?.toLowerCase().includes(searchTerm)
            );

            if (found) {
                return {
                    reply: `I've retrieved the neural fragment for ${found.name}. Here are the details from your digital brain.`,
                    entry: found
                };
            }
            return { reply: `I couldn't find any neural fragments matching "${searchTerm}". Try another keyword?` };
        } else {
            // Storage Logic: Extract Name, Phone, Email
            const nameMatch = input.match(/(?:name is|meet|met|this is|call me)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i);
            const phoneMatch = input.match(/(\d{5,12})/);
            const emailMatch = input.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
            const locationMatch = input.match(/(?:at|in|near)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i);

            if (nameMatch || phoneMatch || emailMatch) {
                const entry = {
                    name: nameMatch ? nameMatch[1] : "Unknown Contact",
                    location: locationMatch ? locationMatch[1] : "Captured via Chat",
                    phone: phoneMatch ? phoneMatch[0] : "",
                    email: emailMatch ? emailMatch[0] : "",
                    context: input,
                    tags: ["AI Captured", "Neural Fragment"]
                };
                return {
                    reply: `Fragment captured! I've securely stored ${entry.name} in your digital brain.`,
                    entry: entry
                };
            }
            return { reply: "I'm listening! Tell me about someone you met (e.g., 'Met Sarah at the Tech Summit, 555-0122') or ask to find someone." };
        }
    };

    const handleSend = async () => {
        if (!input.trim() || isTyping) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate local processing delay for premium feel
        setTimeout(() => {
            const result = localProcessChat(input);
            const isRetrieval = /who|find|search|retrieve|get|recall/i.test(input);

            const botMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'bot',
                content: result.reply,
                timestamp: new Date().toISOString(),
                type: result.entry ? 'contact' : 'text',
                data: result.entry
            };

            if (result.entry && !isRetrieval) {
                const savedContacts = JSON.parse(localStorage.getItem('memorable_contacts') || '[]');
                const newContact = {
                    id: Date.now(),
                    ...result.entry,
                    image: `https://i.pravatar.cc/150?u=${result.entry.name}`,
                    color: "bg-orange-500",
                    initials: result.entry.name.split(' ').map((n: string) => n[0]).join('')
                };
                localStorage.setItem('memorable_contacts', JSON.stringify([newContact, ...savedContacts]));
                if (onContactSaved) onContactSaved();
            }

            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 800);
    };

    const refreshChat = () => {
        const initialMsg: ChatMessage = {
            id: Date.now().toString(),
            role: 'bot',
            content: "Chat refreshed. New session started. How can I help you today?",
            timestamp: new Date().toISOString()
        };
        setMessages([initialMsg]);
        localStorage.removeItem('memorable_current_session');
    };

    return (
        <div className={`flex flex-col h-[70dvh] md:h-[600px] lg:h-[700px] rounded-[24px] md:rounded-[32px] overflow-hidden border ${theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            {/* Chat Header */}
            <div className={`p-6 border-b flex items-center justify-between ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-orange-50/50 border-orange-100'}`}>
                <div className="flex items-center gap-2 md:gap-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-lg">
                        <Bot className="w-4 h-4 md:w-6 md:h-6" />
                    </div>
                    <div>
                        <h3 className={`text-sm font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>AI Memory Assistant</h3>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Neural Link Active</span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={refreshChat}
                    className={`p-2 rounded-xl transition-all ${theme === 'dark' ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-orange-100 text-orange-600 hover:bg-orange-200'}`}
                    title="Refresh Chat"
                >
                    <RefreshCw className="w-5 h-5" />
                </button>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 scrollbar-hide bg-gradient-to-b from-transparent to-orange-500/5">
                <AnimatePresence>
                    {messages.map((msg: ChatMessage) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex gap-2 md:gap-3 max-w-[90%] md:max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`w-7 h-7 md:w-8 md:h-8 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 shadow-lg ${msg.role === 'user' ? 'bg-orange-600' : 'bg-white border border-orange-100'}`}>
                                    {msg.role === 'user' ? <User className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" /> : <Bot className="w-3.5 h-3.5 md:w-4 md:h-4 text-orange-500" />}
                                </div>
                                <div className="space-y-3">
                                    <div className={`px-3 md:px-4 py-2.5 md:py-3 rounded-[16px] md:rounded-[18px] text-[11px] md:text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                                        ? 'bg-orange-600 text-white rounded-tr-none'
                                        : (theme === 'dark' ? 'bg-slate-800 text-slate-200 rounded-tl-none' : 'bg-white text-slate-700 rounded-tl-none border border-orange-50')
                                        }`}>
                                        {msg.content}
                                    </div>

                                    {msg.type === 'contact' && msg.data && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className={`p-5 rounded-[24px] border border-orange-200 shadow-xl ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}
                                        >
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center text-xl font-black text-white">
                                                    {msg.data.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className={`font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{msg.data.name}</div>
                                                    <div className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                                                        <Save className="w-3 h-3 text-orange-500" /> Fragment Captured
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="text-[11px] font-bold text-slate-500 bg-orange-500/5 p-2 rounded-lg flex items-center gap-2">
                                                    <span className="text-orange-500 text-sm">📍</span> {msg.data.location}
                                                </div>
                                                {msg.data.phone && (
                                                    <div className="text-[11px] font-bold text-slate-500 bg-orange-500/5 p-2 rounded-lg flex items-center gap-2">
                                                        <span className="text-orange-500 text-sm">📞</span> {msg.data.phone}
                                                    </div>
                                                )}
                                                {msg.data.email && (
                                                    <div className="text-[11px] font-bold text-slate-500 bg-orange-500/5 p-2 rounded-lg flex items-center gap-2">
                                                        <span className="text-orange-500 text-sm">📧</span> {msg.data.email}
                                                    </div>
                                                )}
                                                <div className="text-[11px] italic text-slate-600 bg-slate-50 p-2 rounded-lg">
                                                    "{msg.data.context}"
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isTyping && (
                    <div className="flex justify-start">
                        <div className="flex gap-3 items-center">
                            <div className="w-8 h-8 rounded-xl bg-white border border-orange-50 flex items-center justify-center shadow-sm">
                                <Loader2 className="w-4 h-4 text-orange-400 animate-spin" />
                            </div>
                            <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest animate-pulse">Syncing...</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className={`p-4 md:p-6 border-t ${theme === 'dark' ? 'border-slate-800 bg-slate-900/50' : 'bg-white border-orange-50'}`}>
                <div className="relative flex items-center gap-2 md:gap-3">
                    <button className={`p-2 md:p-2.5 rounded-xl border transition-all ${theme === 'dark' ? 'border-slate-800 text-slate-500 hover:text-white' : 'border-orange-100 text-orange-400 hover:bg-orange-50'}`}>
                        <ImageIcon className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Neural Query..."
                        className={`flex-1 py-2.5 md:py-3 px-4 md:px-5 rounded-xl md:rounded-2xl text-[12px] md:text-sm border font-bold focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all ${theme === 'dark'
                            ? 'bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-600'
                            : 'bg-white border-orange-100 text-slate-900 placeholder:text-slate-400'
                            }`}
                    />
                    <button
                        onClick={handleSend}
                        disabled={isTyping || !input.trim()}
                        className={`p-2.5 md:p-3 rounded-xl md:rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/20 active:scale-95 transition-all ${(!input.trim() || isTyping) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'}`}
                    >
                        <Send className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIChat;
