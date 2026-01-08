import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

type MenuItem = {
    id: string; // Changed to string for Navigation ID
    label: string;
    icon: LucideIcon;
};

type Point = { x: number; y: number };

const menuTransition: any = {
    type: 'spring',
    stiffness: 420,
    damping: 32,
    mass: 1,
};

const wedgeTransition: any = {
    duration: 0.05,
    ease: 'easeOut',
};

const FULL_CIRCLE = 360;
const START_ANGLE = -90;

function degToRad(deg: number) {
    return (deg * Math.PI) / 180;
}

function polarToCartesian(radius: number, angleDeg: number): Point {
    const rad = degToRad(angleDeg);
    return {
        x: Math.cos(rad) * radius,
        y: Math.sin(rad) * radius,
    };
}

function slicePath(
    index: number,
    total: number,
    wedgeRadius: number,
    innerRadius: number,
) {
    if (total <= 0) return '';

    if (total === 1) {
        return `
      M ${wedgeRadius} 0
      A ${wedgeRadius} ${wedgeRadius} 0 1 1 ${-wedgeRadius} 0
      A ${wedgeRadius} ${wedgeRadius} 0 1 1 ${wedgeRadius} 0
      M ${innerRadius} 0
      A ${innerRadius} ${innerRadius} 0 1 0 ${-innerRadius} 0
      A ${innerRadius} ${innerRadius} 0 1 0 ${innerRadius} 0
    `;
    }

    const anglePerSlice = FULL_CIRCLE / total;
    const midDeg = START_ANGLE + anglePerSlice * index;
    const halfSlice = anglePerSlice / 2;

    const startDeg = midDeg - halfSlice;
    const endDeg = midDeg + halfSlice;

    const outerStart = polarToCartesian(wedgeRadius, startDeg);
    const outerEnd = polarToCartesian(wedgeRadius, endDeg);
    const innerStart = polarToCartesian(innerRadius, startDeg);
    const innerEnd = polarToCartesian(innerRadius, endDeg);

    const largeArcFlag = anglePerSlice > 180 ? 1 : 0;

    return `
    M ${outerStart.x} ${outerStart.y}
    A ${wedgeRadius} ${wedgeRadius} 0 ${largeArcFlag} 1 ${outerEnd.x} ${outerEnd.y}
    L ${innerEnd.x} ${innerEnd.y}
    A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStart.x} ${innerStart.y}
    Z
  `;
}

interface RadialMenuProps {
    menuItems: MenuItem[];
    onSelect: (item: MenuItem) => void;
    size?: number;
    iconSize?: number;
    bandWidth?: number;
    innerGap?: number;
    outerGap?: number;
    outerRingWidth?: number;
}

export const RadialMenu = ({
    menuItems,
    onSelect,
    size = 240,
    iconSize = 20,
    bandWidth = 50,
    innerGap = 8,
    outerGap = 8,
    outerRingWidth = 2, // Thinner ring for elegance
}: RadialMenuProps) => {
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const radius = size / 2;
    const outerRingOuterRadius = radius;
    const outerRingInnerRadius = outerRingOuterRadius - outerRingWidth;
    const wedgeOuterRadius = outerRingInnerRadius - outerGap;
    const wedgeInnerRadius = wedgeOuterRadius - bandWidth;
    const iconRingRadius = (wedgeOuterRadius + wedgeInnerRadius) / 2;
    const centerRadius = Math.max(wedgeInnerRadius - innerGap, 0);
    const slice = 360 / menuItems.length;

    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            setOpen(true);

            // Boundary check to keep menu in viewport
            let x = e.clientX;
            let y = e.clientY;

            if (x + radius > window.innerWidth) x = window.innerWidth - radius;
            if (x - radius < 0) x = radius;
            if (y + radius > window.innerHeight) y = window.innerHeight - radius;
            if (y - radius < 0) y = radius;

            setPosition({ x, y });
        };

        const handleClick = () => {
            if (open) setOpen(false);
        };

        const handleScroll = () => {
            if (open) setOpen(false);
        }

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('click', handleClick);
        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('click', handleClick);
            document.removeEventListener('scroll', handleScroll);
        };
    }, [open, radius]);

    // Handle keyboard interaction (Esacape)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[100] pointer-events-none">
                    {/* Backdrop (optional, invisible for now to allow clicking outside to close) */}

                    <motion.div
                        className="absolute"
                        style={{
                            left: position.x,
                            top: position.y,
                            width: size,
                            height: size,
                            marginLeft: -radius,
                            marginTop: -radius
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={menuTransition}
                    >
                        <div className="relative w-full h-full pointer-events-auto filter drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                            <svg
                                className="w-full h-full text-white"
                                viewBox={`${-radius} ${-radius} ${radius * 2} ${radius * 2}`}
                            >
                                {menuItems.map((item, index) => {
                                    const Icon = item.icon;
                                    const midDeg = START_ANGLE + slice * index;
                                    const { x: iconX, y: iconY } = polarToCartesian(iconRingRadius, midDeg);
                                    const isActive = activeIndex === index;

                                    return (
                                        <g
                                            key={item.id}
                                            className="cursor-pointer transition-transform"
                                            onMouseEnter={() => setActiveIndex(index)}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onSelect(item);
                                                setOpen(false);
                                            }}
                                        >
                                            {/* Wedge Background */}
                                            {/* Outer decorative piece */}
                                            <motion.path
                                                d={slicePath(index, menuItems.length, outerRingOuterRadius, outerRingInnerRadius)}
                                                className={cn(
                                                    "transition-colors duration-200",
                                                    isActive ? "fill-accent" : "fill-white/10"
                                                )}
                                                initial={false}
                                                transition={wedgeTransition}
                                            />

                                            {/* Main Wedge */}
                                            <motion.path
                                                d={slicePath(index, menuItems.length, wedgeOuterRadius, wedgeInnerRadius)}
                                                className={cn(
                                                    "stroke-black/50 stroke-1 transition-colors duration-200",
                                                    isActive ? "fill-white" : "fill-zinc-900/90"
                                                )}
                                                initial={false}
                                                transition={wedgeTransition}
                                            />

                                            {/* Icon */}
                                            <g transform={`translate(${iconX - iconSize / 2}, ${iconY - iconSize / 2})`}>
                                                <foreignObject width={iconSize} height={iconSize}>
                                                    <div className={cn(
                                                        "w-full h-full flex items-center justify-center transition-colors",
                                                        isActive ? "text-accent-foreground" : "text-white"
                                                    )}>
                                                        <Icon size={iconSize} strokeWidth={2} />
                                                    </div>
                                                </foreignObject>
                                            </g>

                                        </g>
                                    );
                                })}

                                {/* Center Circle */}
                                <circle
                                    cx={0}
                                    cy={0}
                                    r={centerRadius}
                                    className="fill-black/80 stroke-white/10 stroke-1 backdrop-blur-md"
                                />
                                <circle
                                    cx={0}
                                    cy={0}
                                    r={4}
                                    className="fill-accent"
                                />
                            </svg>

                            {/* Label Tooltip in Center */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                                <AnimatePresence mode="wait">
                                    {activeIndex !== null && (
                                        <motion.div
                                            key={activeIndex}
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            className="text-xs font-bold uppercase tracking-wider text-accent"
                                        >
                                            {menuItems[activeIndex].label}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
