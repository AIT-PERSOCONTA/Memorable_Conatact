import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    MapPin,
    User,
    Briefcase,
    Phone,
    Camera,
    Loader2,
    CheckCircle2,
    Plus,
    Settings,
    RefreshCw
} from 'lucide-react';

interface ContactFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (contact: any) => void;
    theme: 'light' | 'dark';
}

const ContactForm: React.FC<ContactFormProps> = ({ isOpen, onClose, onSubmit, theme }) => {
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        company: '',
        phone: '',
        event: 'Global Tech Summit 2026',
        venue: '',
        city: '',
        image: ''
    });

    const [isDetecting, setIsDetecting] = useState(false);
    const [detectionComplete, setDetectionComplete] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setDetectionComplete(false);
            setIsDetecting(false);
        }
    }, [isOpen]);

    const handleAutoDetect = () => {
        setIsDetecting(true);
        // Simulate geo-detection
        setTimeout(() => {
            setFormData(prev => ({
                ...prev,
                venue: 'Grand Innovation Hall',
                city: 'Chennai, TN'
            }));
            setIsDetecting(false);
            setDetectionComplete(true);
        }, 2000);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            id: Date.now(),
            initials: formData.name.split(' ').map(n => n[0]).join('').toUpperCase(),
            color: 'bg-indigo-600'
        });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className={`relative w-full max-w-xl overflow-hidden rounded-[32px] border shadow-2xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                            }`}
                    >
                        {/* Header */}
                        <div className={`px-8 py-6 border-b flex items-center justify-between ${theme === 'dark' ? 'border-slate-800' : 'border-slate-100'}`}>
                            <div>
                                <h3 className="text-xl font-black tracking-tight">New Connection</h3>
                                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500">Node Synchronization</p>
                            </div>
                            <button
                                onClick={onClose}
                                className={`p-2 rounded-xl transition-colors ${theme === 'dark' ? 'hover:bg-slate-800 text-slate-500' : 'hover:bg-slate-100 text-slate-400'}`}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            {/* Profile Image Simulation */}
                            <div className="flex justify-center mb-8">
                                <div className={`relative w-24 h-24 rounded-[32px] border-2 border-dashed flex items-center justify-center group cursor-pointer transition-all ${theme === 'dark' ? 'border-slate-700 hover:border-indigo-500 bg-slate-800/50' : 'border-slate-300 hover:border-indigo-500 bg-slate-50'
                                    }`}>
                                    <Camera className="w-8 h-8 text-slate-500 group-hover:text-indigo-500 transition-colors" />
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-lg">
                                        <Plus className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>

                            {/* Grid Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-500" />
                                        <input
                                            required
                                            type="text"
                                            placeholder="e.g. John Doe"
                                            className={`w-full py-3 pl-11 pr-4 rounded-xl border text-sm font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all ${theme === 'dark' ? 'bg-slate-800 border-slate-700 placeholder:text-slate-600' : 'bg-slate-50 border-slate-200 placeholder:text-slate-400'
                                                }`}
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-500" />
                                        <input
                                            type="tel"
                                            placeholder="+1 (555) 000-0000"
                                            className={`w-full py-3 pl-11 pr-4 rounded-xl border text-sm font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all ${theme === 'dark' ? 'bg-slate-800 border-slate-700 placeholder:text-slate-600' : 'bg-slate-50 border-slate-200 placeholder:text-slate-400'
                                                }`}
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Company</label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-500" />
                                        <input
                                            type="text"
                                            placeholder="e.g. Acme Corp"
                                            className={`w-full py-3 pl-11 pr-4 rounded-xl border text-sm font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all ${theme === 'dark' ? 'bg-slate-800 border-slate-700 placeholder:text-slate-600' : 'bg-slate-50 border-slate-200 placeholder:text-slate-400'
                                                }`}
                                            value={formData.company}
                                            onChange={e => setFormData({ ...formData, company: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Job Title</label>
                                    <div className="relative">
                                        <Settings className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-500" />
                                        <input
                                            type="text"
                                            placeholder="e.g. Director"
                                            className={`w-full py-3 pl-11 pr-4 rounded-xl border text-sm font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all ${theme === 'dark' ? 'bg-slate-800 border-slate-700 placeholder:text-slate-600' : 'bg-slate-50 border-slate-200 placeholder:text-slate-400'
                                                }`}
                                            value={formData.title}
                                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Geo-Context Section */}
                            <div className={`p-6 rounded-[24px] border border-dashed transition-all ${detectionComplete ? 'bg-indigo-500/5 border-indigo-500/30' : theme === 'dark' ? 'bg-slate-800/30 border-slate-700' : 'bg-slate-50 border-slate-200'
                                }`}>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-indigo-500" />
                                        <span className="text-xs font-black uppercase tracking-widest">Geo-Context Discovery</span>
                                    </div>
                                    {!detectionComplete && !isDetecting && (
                                        <button
                                            type="button"
                                            onClick={handleAutoDetect}
                                            className="text-[10px] font-black text-indigo-600 hover:text-indigo-500 uppercase tracking-widest flex items-center gap-1"
                                        >
                                            <RefreshCw className="w-3 h-3" /> Auto-Detect
                                        </button>
                                    )}
                                </div>

                                {isDetecting ? (
                                    <div className="flex flex-col items-center py-4">
                                        <Loader2 className="w-6 h-6 text-indigo-500 animate-spin mb-2" />
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 animate-pulse">Syncing with Local Nodes...</p>
                                    </div>
                                ) : detectionComplete ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-3"
                                    >
                                        <div className="flex items-center gap-3">
                                            <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                                            <div className="flex-1">
                                                <div className="text-sm font-black">{formData.venue}</div>
                                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{formData.city}</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <p className="text-[10px] font-medium text-slate-500 text-center py-2 italic">
                                        Coordinates will be attached automatically upon manual trigger or proximity detection.
                                    </p>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className={`flex-1 py-4 rounded-xl font-black uppercase tracking-widest text-xs border transition-all ${theme === 'dark' ? 'border-slate-700 hover:bg-slate-800' : 'border-slate-200 hover:bg-slate-50'
                                        }`}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-[2] py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black uppercase tracking-widest text-xs shadow-xl shadow-indigo-600/30 active:scale-95 transition-all"
                                >
                                    Sync to Memory Core
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ContactForm;
