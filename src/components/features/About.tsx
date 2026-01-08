import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        id: 1,
        title: "The Beginning",
        desc: "Started with a curiosity for how things work on the web. From simple HTML/CSS to building complex layouts, the journey began with a passion for creation.",
        year: "2019"
    },
    {
        id: 2,
        title: "Engineering Fundamentals",
        desc: "Studying Computer Science at Narayana Engineering College provided the strong theoretical foundation. Algorithms, Data Structures, and System Design became the building blocks.",
        year: "2021"
    },
    {
        id: 3,
        title: "Full Stack Immersion",
        desc: "Interned at BrainOVision and CSEdge, diving deep into Full Stack Development. Built real-world applications with Spring Boot, React, and SQL, optimizing performance and user experience.",
        year: "2023-2024"
    },
    {
        id: 4,
        title: "Leadership & Hackathons",
        desc: "Led Hackademia 2K24, organizing a national-level event. Won multiple hackathons by proposing innovative solutions like Green Credit Management and AI-driven platforms.",
        year: "2024"
    },
    {
        id: 5,
        title: "The Vision",
        desc: "Now focused on crafting next-gen digital experiences. Blending technical expertise with creative motion design to build the future of the web.",
        year: "Present"
    }
];

export const About = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const slides = gsap.utils.toArray('.about-slide');
            const totalWidth = slides.length * 100;

            gsap.to(slides, {
                xPercent: -100 * (slides.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (slides.length - 1),
                    end: () => "+=" + triggerRef.current?.offsetWidth,
                    // markers: true // Debug markers
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" ref={sectionRef} className="overflow-hidden bg-black relative">
            <div ref={triggerRef} className="h-screen w-full flex items-center">

                {/* Intro Slide */}
                <div className="about-slide min-w-[100vw] h-full flex flex-col justify-center items-center px-4 md:px-20 border-r border-white/10 shrink-0">
                    <h2 className="text-6xl md:text-9xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-800">
                        MY JOURNEY
                    </h2>
                    <p className="mt-8 text-xl text-secondary max-w-xl text-center">
                        A timeline of growth, learning, and leadership. <br />
                        <span className="text-accent animate-pulse">Scroll to explore &rarr;</span>
                    </p>
                </div>

                {/* Timeline Slides */}
                {experiences.map((exp, index) => (
                    <div key={exp.id} className="about-slide min-w-[100vw] h-full flex flex-col justify-center px-8 md:px-32 border-r border-white/10 shrink-0 relative">
                        <span className="absolute top-20 left-10 text-9xl font-bold text-white/5 select-none">
                            0{index + 1}
                        </span>

                        <div className="relative z-10 max-w-4xl">
                            <div className="flex items-baseline gap-4 mb-6">
                                <span className="text-accent text-lg font-mono tracking-widest">{exp.year}</span>
                                <div className="h-[1px] w-20 bg-accent/50" />
                            </div>

                            <h3 className="text-4xl md:text-6xl font-bold mb-8 text-white">{exp.title}</h3>
                            <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed max-w-2xl">{exp.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
