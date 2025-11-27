"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative w-full py-20 px-6 md:px-12 overflow-hidden bg-transparent">
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">

                {/* Fading Name Effect */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-[12vw] md:text-[8vw] font-bold tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-neutral-800 to-neutral-200/20 select-none"
                >
                    Yash Srivastava
                </motion.h1>

                <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-10 text-sm text-neutral-500 font-medium uppercase tracking-widest">
                    <Link href="https://github.com/yashsrivasta7a" target="_blank" className="hover:text-black transition-colors">
                        Github
                    </Link>
                    <Link href="https://linkedin.com/in/yashsrivasta7a" target="_blank" className="hover:text-black transition-colors">
                        LinkedIn
                    </Link>
                    <Link href="https://twitter.com/yashsrivasta7a" target="_blank" className="hover:text-black transition-colors">
                        Twitter
                    </Link>
                    <Link href="https://instagram.com/yashsrivasta7a" target="_blank" className="hover:text-black transition-colors">
                        Instagram
                    </Link>
                    <Link href="https://leetcode.com/yashsrivasta7a" target="_blank" className="hover:text-black transition-colors">
                        LeetCode
                    </Link>
                    <Link href="https://peerlist.io/yashsrivasta7a" target="_blank" className="hover:text-black transition-colors">
                        Peerlist
                    </Link>
                    <Link href="mailto:yashsrivasta7a@gmail.com" className="hover:text-black transition-colors">
                        Email
                    </Link>
                </div>

                <div className="mt-12 text-xs text-neutral-400">
                    © {new Date().getFullYear()} All Rights Reserved.
                </div>

            </div>
        </footer>
    );
}
