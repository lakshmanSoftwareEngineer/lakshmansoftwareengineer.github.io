import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "Blu Match",
        category: "B2C Marketplace",
        desc: "A water marketplace platform connecting 50+ local vendors with customers. Implemented efficient search algorithms that improved vendor discovery speed by 35%.",
        tech: ["React.js", "Node.js", "PostgreSQL"],
        link: "#",
        github: "#",
        color: "from-blue-500/20 to-cyan-500/20"
    },
    {
        title: "Hire Hive",
        category: "Professional Services",
        desc: "Local professional hiring platform allowing users to browse 10+ service categories. Managed user profiles and service requests with 99.9% data integrity.",
        tech: ["Node.js", "Express.js", "PostgreSQL"],
        link: "#",
        github: "#",
        color: "from-yellow-500/20 to-orange-500/20"
    },
    {
        title: "A.P.P Management",
        category: "Education Tech",
        desc: "Student participation tracking system handling data for 500+ students. Automated point calculation and certificate generation, reducing workload by 40%.",
        tech: ["Node.js", "EJS", "PostgreSQL"],
        link: "#",
        github: "#",
        color: "from-green-500/20 to-emerald-500/20"
    }
];

export const Projects = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray('.project-card').forEach((card: any) => {
                gsap.fromTo(card,
                    { y: 100, opacity: 0, scale: 0.9 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top bottom-=100",
                            toggleActions: "play none none reverse"
                        }
                    }
                )
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="work" ref={containerRef} className="min-h-screen py-32 px-4 md:px-20 bg-background relative">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <h2 className="text-5xl md:text-8xl font-bold font-display mb-6">SELECTED <br /><span className="text-zinc-700">WORKS</span></h2>
                </div>

                <div className="flex flex-col gap-20">
                    {projects.map((project, index) => (
                        <div key={index} className={`project-card group relative p-8 md:p-12 rounded-3xl border border-white/10 bg-gradient-to-br ${project.color} backdrop-blur-sm overflow-hidden`}>
                            {/* Hover Reveal Effect */}
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 flex flex-col md:flex-row gap-10 justify-between items-start md:items-end">
                                <div className="max-w-2xl">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs uppercase tracking-wider">{project.category}</span>
                                    </div>
                                    <h3 className="text-4xl md:text-6xl font-bold mb-6 group-hover:text-white transition-colors">{project.title}</h3>
                                    <p className="text-lg text-secondary mb-8 leading-relaxed">
                                        {project.desc}
                                    </p>
                                    <div className="flex gap-4">
                                        {project.tech.map(t => (
                                            <span key={t} className="text-sm font-mono text-accent/80">#{t}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <a href={project.github} className="p-4 rounded-full bg-white/10 hover:bg-white hover:text-black transition-all duration-300">
                                        <FaGithub size={24} />
                                    </a>
                                    <a href={project.link} className="p-4 rounded-full bg-white/10 hover:bg-accent hover:text-black transition-all duration-300">
                                        <FaExternalLinkAlt size={24} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
