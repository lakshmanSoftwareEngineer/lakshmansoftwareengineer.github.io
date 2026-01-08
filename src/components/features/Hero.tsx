import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Staggered text reveal
            if (titleRef.current) {
                tl.fromTo(titleRef.current.querySelectorAll(".char"),
                    { y: 100, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, stagger: 0.05, ease: "power4.out" }
                )
                    .fromTo(subtitleRef.current,
                        { y: 20, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                        "-=0.5"
                    )
                    .fromTo(ctaRef.current,
                        { y: 20, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                        "-=0.6"
                    );
            }

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Helper to split text into chars for animation
    const splitText = (text: string) => {
        return text.split("").map((char, index) => (
            <span key={index} className="char inline-block">{char === " " ? "\u00A0" : char}</span>
        ));
    };

    return (
        <section id="top" ref={containerRef} className="relative min-h-screen flex flex-col justify-center items-center px-4 overflow-hidden pt-20">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-background to-background -z-10" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" />

            <div className="z-10 text-center max-w-4xl mx-auto">
                <h1 ref={titleRef} className="text-5xl md:text-8xl lg:text-9xl font-bold font-display tracking-tight text-white mb-6 overflow-hidden">
                    {/* Hardcoded split for now, can be dynamic */}
                    <div className="overflow-hidden">
                        {splitText("KAYALA")}
                    </div>
                    <div className="overflow-hidden text-zinc-500">
                        {splitText("LAKSHMAN")}
                    </div>
                </h1>

                <p ref={subtitleRef} className="text-lg md:text-xl text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
                    Creative Technologist & Full Stack Engineer. <br className="hidden md:block" />
                    Crafting cinematic digital experiences with code and motion.
                </p>

                <div ref={ctaRef} className="flex flex-col md:flex-row gap-6 justify-center items-center">
                    <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-accent transition-colors duration-300">
                        View Projects
                    </button>
                    <button className="px-8 py-4 border border-white/20 text-white rounded-full hover:bg-white/5 transition-colors duration-300 backdrop-blur-sm">
                        Contact Me
                    </button>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
                <span className="text-sm">Scroll to explore</span>
            </div>
        </section>
    );
};
