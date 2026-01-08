import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    FaJava, FaJs, FaHtml5, FaCss3Alt, FaPython,
    FaReact, FaNodeJs, FaGitAlt, FaAws,
} from 'react-icons/fa';
import { SiSpringboot, SiPostgresql, SiExpress, SiSpringsecurity, SiMongodb, SiDocker } from 'react-icons/si';

const skills = [
    { name: "Java", icon: FaJava, category: "Languages" },
    { name: "JavaScript", icon: FaJs, category: "Languages" },
    { name: "Python", icon: FaPython, category: "Languages" },
    { name: "HTML5", icon: FaHtml5, category: "Frontend" },
    { name: "CSS3", icon: FaCss3Alt, category: "Frontend" },
    { name: "React", icon: FaReact, category: "Frontend" },
    { name: "Node.js", icon: FaNodeJs, category: "Backend" },
    { name: "Express", icon: SiExpress, category: "Backend" },
    { name: "Spring Boot", icon: SiSpringboot, category: "Backend" },
    { name: "MongoDB", icon: SiMongodb, category: "Backend" },
    { name: "Spring Security", icon: SiSpringsecurity, category: "Backend" },
    { name: "PostgreSQL", icon: SiPostgresql, category: "Database" },
    { name: "AWS", icon: FaAws, category: "Cloud" },
    { name: "Git", icon: FaGitAlt, category: "Tools" },
    { name: "Docker", icon: SiDocker, category: "Languages" },
];

export const Skills = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="skills" className="min-h-screen bg-background py-20 px-4 md:px-20 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -z-10" />

            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-7xl font-bold font-display mb-20 text-center"
                >
                    TECHNICAL <span className="text-secondary stroke-text">ARSENAL</span>
                </motion.h2>

                <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.05, type: "spring" }}
                            whileHover={{ scale: 1.05, borderColor: "rgba(255, 255, 255, 0.5)", backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 backdrop-blur-sm cursor-none group transition-colors"
                        >
                            <div className="text-4xl md:text-5xl text-secondary group-hover:text-accent transition-colors duration-300">
                                {skill.icon ? <skill.icon /> : <span className="text-sm font-bold">ICON</span>}
                            </div>
                            <span className="text-sm md:text-base font-medium text-center">{skill.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
