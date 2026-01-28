"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import GitHubActivity from "@/components/GitHubActivity";

export default function AboutPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

    return (
        <div ref={containerRef} className="min-h-screen text-[#1a1a1a]">

            <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24 pt-16 md:pt-32 pb-20 relative z-10">

                <div className="flex flex-col items-start justify-center min-h-auto mb-10 md:mb-0 md:min-h-[40vh]">
                    <motion.h1
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-[15vw] md:text-[12vw] satoshi1 leading-[0.85] font-bold tracking-tighter text-[#1a1a1a]"
                    >
                        Yash
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-center gap-4 md:gap-8 ml-2 md:ml-4"
                    >
                        <span className="text-[15vw] md:text-[12vw] leading-[0.85] font-serif italic font-light text-gray-700">Srivastava.</span>
                    </motion.div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mt-4 md:mt-24">

                    {/* Text Content - Order 2 on mobile */}
                    <div className="lg:col-span-5 space-y-12 lg:space-y-24 order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            className="text-lg md:text-2xl font-light leading-relaxed"
                        >
                            <p>
                                I craft digital experiences that live at the intersection of <span className="font-serif italic">art</span> and <span className="font-serif italic">code</span>.
                                For me, the web is a canvas where functionality meets emotion.
                            </p>
                        </motion.div>

                        <div className="space-y-6 md:space-y-8">
                            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-700">The Philosophy</h3>
                            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                                I believe in software that feels human. It's not just about the pixels or the performance metrics, it's about the feeling a user gets when they interact with a product. Smooth transitions, thoughtful micro-interactions, and a cohesive visual language are my tools of choice.
                            </p>
                        </div>

                        <div className="space-y-6 md:space-y-8">
                            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-700">The Stack</h3>
                            <div className="flex flex-wrap gap-2 md:gap-3">
                                {["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Node.js", "PostgreSQL", "MongoDB", "Docker", "Figma", "Adobe XD", "Firebase", "C++"].map((tech, i) => (
                                    <motion.span
                                        key={tech}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05, duration: 0.5 }}
                                        viewport={{ once: true }}
                                        className="px-3 py-1 md:px-4 md:py-2 rounded-full border border-gray-200 text-xs md:text-sm hover:bg-gray-900 hover:text-white transition-colors cursor-default bg-white/50 backdrop-blur-sm"
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </div>
                        </div>

                        {/* GitHub Activity - Mobile: Full width, Desktop: Half cut */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true }}
                            className="mt-8 md:mt-16 relative w-full lg:w-[110%] lg:ml-[1%]"
                        >
                            <GitHubActivity username="yashsrivasta7a" />
                            <p className="mt-4 text-xs font-mono text-gray-700 text-center md:text-left md:ml-[2%]">FIG 02. — THE CODE</p>
                        </motion.div>
                    </div>

                    {/* Images - Order 1 on mobile */}
                    <div className="lg:col-span-7 relative order-1 lg:order-2 space-y-12 md:space-y-0">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            style={{ y: y1 }}
                            className="relative z-20"
                        >
                            {/* Admin Photo: Centered and framed on mobile */}
                            <div className="relative aspect-[4/5] w-[90%] mx-auto md:w-[80%] md:ml-auto md:mx-0 rounded-2xl md:rounded-none overflow-hidden shadow-2xl md:shadow-none">
                                <Image src="/images/admin.jpg" alt="Portrait" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out" />
                            </div>
                            <p className="text-center md:text-right mt-4 text-xs font-mono text-gray-700">FIG 01. — THE ARCHITECT</p>
                        </motion.div>

                        <motion.div style={{ y: y2 }} className="absolute top-[40%] left-[-10%] z-30 w-[50%] hidden md:block">
                            <div className="relative aspect-square rounded-full overflow-hidden border-[10px] border-[#f8f7f4]">
                                <Image src="/images/aadmin_win.png" alt="Detail" fill className="object-cover" />
                            </div>
                        </motion.div>

                        {/* Workshop Image: Hidden on Mobile */}
                        <motion.div className="mt-8 md:mt-32 w-full md:w-[70%] relative z-10 hidden md:block">
                            <div className="relative rounded-xl aspect-video md:rounded-none overflow-hidden shadow-lg md:shadow-none">
                                <Image src="/images/workspace.jpeg" alt="Code" fill className="object-cover opacity-80" />
                            </div>
                            <p className="mt-4 text-xs font-mono text-gray-700">FIG 03. — THE WORKSHOP</p>
                        </motion.div>
                    </div>

                </div>

            </div>
        </div>
    );
}

