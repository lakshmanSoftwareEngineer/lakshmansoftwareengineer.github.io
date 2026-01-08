import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaTrophy, FaMedal } from 'react-icons/fa';

const achievements = [
    {
        title: "Hack with Nellore",
        award: "2nd Place",
        desc: "Proposed Green Credit Management solution.",
        icon: FaTrophy,
        color: "text-yellow-400"
    },
    {
        title: "SkillBridge Coding Hackathon",
        award: "1st Place",
        desc: "Outperformed 50+ participants in algorithmic challenges.",
        icon: FaMedal,
        color: "text-blue-400"
    },
    {
        title: "Masscoders",
        award: "1st Place",
        desc: "Designed a winning website prototype within 24 hours.",
        icon: FaTrophy,
        color: "text-purple-400"
    },
    {
        title: "College Hackathon",
        award: "2nd Place",
        desc: "Developed a dedicated college website used by 100+ students.",
        icon: FaMedal,
        color: "text-emerald-400"
    }
];

export const Achievements = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="achievements" className="py-20 px-4 md:px-20 bg-zinc-900/50 relative overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-900/50 to-black z-0" />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold font-display mb-4">HALL OF <span className="text-accent">FAME</span></h2>
                    <p className="text-secondary max-w-2xl mx-auto">Recognition for code, creativity, and problem solving.</p>
                </motion.div>

                <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {achievements.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm group hover:bg-white/10 transition-colors"
                        >
                            <div className={`text-4xl mb-4 ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                                <item.icon />
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{item.title}</h3>
                            <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-mono mb-4 text-white/80">{item.award}</div>
                            <p className="text-sm text-secondary leading-relaxed">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
