"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

export default function NavbarWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      label: "Resume",
      href: "/resume",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      label: "Terminal",
      href: "https://yashsrivasta7a-v2.vercel.app/",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      isExternal: true,
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end gap-4 pointer-events-none">
      {/* Menu Items */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{
              duration: 0.4,
              ease: [0.19, 1.0, 0.22, 1.0], // Energetic spring-ish easing
              staggerChildren: 0.05
            }}
            className="flex flex-col gap-2 pointer-events-auto"
          >
            {menuItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.isExternal ? "_blank" : undefined}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, x: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center justify-between gap-4 px-6 py-3.5 
                           bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl 
                           border border-black/5 dark:border-white/10 
                           text-zinc-800 dark:text-zinc-100 rounded-2xl shadow-lg 
                           hover:shadow-xl transition-all duration-300 min-w-[200px]"
              >
                <div className="flex items-center gap-3">
                  <span className="text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-300">
                    {item.icon}
                  </span>
                  <span className="font-medium tracking-wide font-['satoshi']">{item.label}</span>
                </div>
                <svg
                  className="w-4 h-4 text-zinc-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.90 }}
        className="pointer-events-auto relative flex items-center justify-center w-14 h-14 
                   bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 
                   rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 z-50 ring-1 ring-white/10"
        aria-label="Toggle menu"
      >
        <motion.div
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ duration: 0.4, ease: [0.19, 1.0, 0.22, 1.0] }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </motion.div>
      </motion.button>
    </div>
  );
}
