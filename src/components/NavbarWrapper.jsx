"use client";

import { motion } from "motion/react";
import Navbar from "./ui/navbar";
import { usePathname } from "next/navigation";

export default function NavbarWrapper() {
  const pathname = usePathname();



  return (
    <motion.div
      className="fixed top-4 left-0 right-0 z-[1000] flex justify-center items-center gap-3 pointer-events-none"
      initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="pointer-events-auto">
        <Navbar
          items={[
            { label: "Home", href: "/" },
            // { label: "About", href: "/about" },
            { label: "Resume", href: "/resume" },
          ]}
          activeHref={pathname}
          className="cursor-none shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] rounded-full"
        />
      </div>

      {/* Separate Terminal Button */}
      <motion.a
        href="https://yashsrivasta7a-v2.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto hidden md:flex items-center gap-2 px-5 py-4 bg-gray-800 hover:bg-gray-900 text-white rounded-full font-semibold text-[17px] shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] transition-colors duration-200 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Terminal
      </motion.a>
    </motion.div>
  );
}
