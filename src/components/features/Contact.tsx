import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa';

export const Contact = () => {
    return (
        <footer id="contact" className="bg-black py-20 px-4 md:px-20 border-t border-white/10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">

                <div className="text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl font-bold font-display mb-2">Let's Build the <span className="text-accent">Future</span></h2>
                    <p className="text-secondary">Open for collaborations and new opportunities.</p>
                </div>

                <div className="flex gap-6">
                    {[
                        { icon: FaLinkedin, href: "https://linkedin.com/in/lakshman-kayala/" },
                        { icon: FaGithub, href: "https://github.com/Lakshman-03/" },
                        { icon: FaEnvelope, href: "mailto:kayalalakshman01@gmail.com" },
                        { icon: FaPhone, href: "tel:+919652376266" },
                    ].map((social, index) => (
                        <motion.a
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, rotate: 5, color: "#00F0FF" }}
                            whileTap={{ scale: 0.9 }}
                            className="text-2xl text-white bg-white/10 p-4 rounded-full hover:bg-white/20 transition-colors"
                        >
                            <social.icon />
                        </motion.a>
                    ))}
                </div>
            </div>

            <div className="mt-20 text-center text-sm text-zinc-600 font-mono">
                © {new Date().getFullYear()} KAYALA LAKSHMAN. All rights reserved. <br />
                Built with React, GSAP & Tailwind.
            </div>
        </footer>
    );
};
