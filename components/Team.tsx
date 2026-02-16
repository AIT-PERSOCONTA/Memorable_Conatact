
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin } from 'lucide-react';

interface TeamProps {
  theme: 'light' | 'dark';
}

const teamMembers = [
  {
    name: "Amurtha",
    role: "Chief Executive Officer",
    bio: "Visionary leader focused on revolutionizing how professionals maintain and leverage their personal networks.",
    color: "bg-indigo-500"
  },
  {
    name: "Dev",
    role: "Lead Developer",
    bio: "Architecture specialist dedicated to building the robust, AI-driven core that powers the MemorableContact experience.",
    color: "bg-purple-500"
  },
  {
    name: "Subashini",
    role: "Product Manager",
    bio: "Strategic product leader obsessed with creating intuitive user experiences that bridge the gap between AI and human memory.",
    color: "bg-blue-500"
  },
  {
    name: "Arun Chintesh",
    role: "Product Management",
    bio: "Visual storyteller reimagining digital interactions through the lens of cognitive ergonomics and aesthetic precision.",
    color: "bg-orange-500"
  },
  {
    name: "Aswathy",
    role: "Director Product Development",
    bio: "Systems architect focused on scaling the retrieval engine to handle trillions of relationship fragments with millisecond latency.",
    color: "bg-green-500"
  },
  {
    name: "Hemanth M",
    role: "Web Developer",
    bio: "Growth strategist dedicated to spreading the vision of permanent human connections across the global professional landscape.",
    color: "bg-pink-500"
  }
];

const Team: React.FC<TeamProps> = ({ theme }) => {
  return (
    <section id="team" className="py-16 md:py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4"
          >
            The Collective
          </motion.div>
          <h2 className={`text-3xl md:text-5xl font-black mb-6 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            The Minds Behind <span className="gradient-text">MemorableContact</span>
          </h2>
          <p className={`max-w-2xl mx-auto font-medium text-sm md:text-base ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            We're a team of researchers, engineers, and designers dedicated to making human connections permanent and searchable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group glass rounded-[24px] md:rounded-[32px] overflow-hidden border transition-all duration-500 ${theme === 'dark' ? 'border-slate-800 hover:border-indigo-500/30' : 'border-slate-200 hover:border-indigo-400 bg-white/50'
                }`}
            >
              {/* Image Placeholder - Large White Container */}
              <div className="relative aspect-[4/5] bg-white m-3 rounded-[20px] md:rounded-[24px] overflow-hidden shadow-inner flex items-center justify-center border border-slate-100 group-hover:scale-[1.02] transition-transform duration-500">
                <div className="text-slate-200 flex flex-col items-center">
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full ${member.color} opacity-10 mb-4 animate-pulse`} />
                  <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Member Image Placeholder</span>
                </div>

                {/* Social Overlay */}
                <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-500">
                  <div className="flex gap-4">
                    <button className="p-3 bg-white rounded-full shadow-lg text-slate-900 hover:scale-110 transition-transform">
                      <Linkedin className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-white rounded-full shadow-lg text-slate-900 hover:scale-110 transition-transform">
                      <Twitter className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 pt-2 md:pt-4">
                <h3 className={`text-xl md:text-2xl font-black mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{member.name}</h3>
                <div className="text-indigo-500 text-[10px] md:text-xs font-black uppercase tracking-widest mb-4">{member.role}</div>
                <p className={`text-xs md:text-sm leading-relaxed mb-6 font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  {member.bio}
                </p>
                <div className="flex items-center gap-2 text-slate-500 hover:text-indigo-400 cursor-pointer transition-colors">
                  <Github className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">View Contributions</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
    </section>
  );
};

export default Team;
