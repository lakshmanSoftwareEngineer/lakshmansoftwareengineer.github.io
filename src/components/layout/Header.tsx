import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Magnetic } from '../../components/ui/Magnetic';
import { cn } from '../../utils/cn';

export const Header = () => {
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }

        if (latest > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    });

    const navItems = [
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Work", href: "#work" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between transition-colors duration-300",
                scrolled ? "bg-background/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
            )}
        >
            <div className="flex items-center gap-2">
                <Magnetic>
                    <div className="text-xl font-bold font-display tracking-tighter cursor-pointer group">
                        <img draggable={false} style={{width:"30px",height:"30px",borderRadius:"50%"}} src="https://lh3.googleusercontent.com/a/ACg8ocLjDxyz04BSKAKI94waqj9xN67N1u_T2I14YtB-uhE4gV6IODo=s360-c-no" alt="" />
                        {/* <span className="group-hover:text-accent transition-colors">KL</span>
                        <span className="text-accent">.</span> */}
                    </div>
                </Magnetic>
            </div>

            <nav className="hidden md:flex items-center gap-8">
                {navItems.map((item) => (
                    <Magnetic key={item.name}>
                        <a
                            href={item.href}
                            className="text-sm font-medium text-secondary hover:text-white transition-colors relative group"
                        >
                            {item.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all group-hover:w-full" />
                        </a>
                    </Magnetic>
                ))}
            </nav>

            <div className="md:hidden">
                {/* Mobile Menu Trigger (Simplified) */}
                <button className="text-white">Menu</button>
            </div>
        </motion.header>
    );
};
