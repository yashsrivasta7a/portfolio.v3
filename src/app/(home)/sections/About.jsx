"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

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
            {/* Background Gradients */}
            {/* <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-orange-200/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="fixed bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-blue-200/20 rounded-full blur-[120px] pointer-events-none" /> */}

            <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24 pt-32 pb-20 relative z-10">

                <div className="flex flex-col items-start justify-center min-h-[40vh]">
                    <motion.h1
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-[12vw] satoshi1 leading-[0.85] font-bold tracking-tighter text-[#1a1a1a]"
                    >
                        Yash
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-center gap-4 md:gap-8 ml-2 md:ml-4"
                    >
                        <span className="text-[12vw] leading-[0.85] font-serif italic font-light text-gray-700">Srivastava.</span>
                    </motion.div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mt-24">

                    <div className="lg:col-span-5 space-y-24">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            className="text-xl md:text-2xl font-light leading-relaxed"
                        >
                            <p>
                                I craft digital experiences that live at the intersection of <span className="font-serif italic">art</span> and <span className="font-serif italic">code</span>.
                                For me, the web is a canvas where functionality meets emotion.
                            </p>
                        </motion.div>

                        <div className="space-y-8">
                            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-700">The Philosophy</h3>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                I believe in software that feels human. It's not just about the pixels or the performance metrics,it's about the feeling a user gets when they interact with a product. Smooth transitions, thoughtful micro-interactions, and a cohesive visual language are my tools of choice.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-700">The Stack</h3>
                            <div className="flex flex-wrap gap-3">
                                {["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Node.js", "PostgreSQL", "MongoDB", "Docker", "Figma", "Adobe XD", "Firebase", "C++"].map((tech, i) => (
                                    <motion.span
                                        key={tech}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05, duration: 0.5 }}
                                        viewport={{ once: true }}
                                        className="px-4 py-2 rounded-full border border-gray-200 text-sm hover:bg-gray-900 hover:text-white transition-colors cursor-default bg-white/50 backdrop-blur-sm"
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 relative">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            style={{ y: y1 }}
                            className="relative z-20"
                        >
                            <div className="relative aspect-[4/5] w-full md:w-[80%] ml-auto rounded-none overflow-hidden">
                                <Image src="/images/admin.jpg" alt="Portrait" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out" />
                            </div>
                            <p className="text-right mt-4 text-xs font-mono text-gray-700">FIG 01. — THE ARCHITECT</p>
                        </motion.div>

                        <motion.div style={{ y: y2 }} className="absolute top-[40%] left-[-10%] z-30 w-[50%] hidden md:block">
                            <div className="relative aspect-square rounded-full overflow-hidden border-[10px] border-[#f8f7f4]">
                                <Image src="/images/aadmin_win.png" alt="Detail" fill className="object-cover" />
                            </div>
                        </motion.div>

                        <motion.div className="mt-32 w-[70%] relative z-10">
                            <div className="relative rounded-xl  aspect-video rounded-none overflow-hidden">
                                <Image src="/images/workspace.jpeg" alt="Code" fill className="object-cover opacity-80" />
                            </div>
                            <p className="mt-4 text-xs font-mono text-gray-700">FIG 02. — THE WORKSHOP</p>
                        </motion.div>
                    </div>

                </div>

            </div>
        </div>
    );
}

