"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import MouseIcon from "@/components/ui/mouse";
import { useRef } from "react";

export default function Dashboard() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const parentVariants = {
    hidden: { opacity: 0, scale: 0.85, filter: "blur(20px)" },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        staggerChildren: 0.07,
        delayChildren: 0.5,
      },
    },
  };
  const childVariants = {
    hidden: { opacity: 0, x: 150, y: 95, scale: 0.87 },
    visible: {
      opacity: 1,
      x: 137,
      y: 95,
      transition: { duration: 3.25, type: "spring" },
      scale: 1,
    },
  };
  const childVariants2 = {
    hidden: { opacity: 0, x: -150, y: 193, scale: 0.87 },
    visible: {
      opacity: 1,
      x: -142,
      y: 193,
      transition: { duration: 3.25, type: "spring" },
      scale: 1,
    },
  };

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.8 },
    },
  };
  
  const charVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  return (
    <div ref={containerRef} className="min-h-auto pb-10 pt-10 z-99 overflow-hidden">
      {/* <NavbarWrapper /> */}

      <motion.div style={{ opacity }} className="flex flex-col justify-center items-center px-4">
        <motion.div
          style={{ y: yImage }}
          variants={parentVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col justify-center items-center w-full max-w-[320px]"
        >
          <motion.div variants={childVariants} className="hidden md:block">
            <MouseIcon
              rotate="rotate(-40 20 20)"
              className="absolute z-100 right-[7%] top-[35%] w-10 h-10 text-blue-500"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 15, skewX: 10 }}
            animate={{ opacity: 1, x: 0, skewX: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 1.8 }}
            className="hidden md:block absolute left-[90%] top-[40%]
              bg-blue-500 py-2 px-4 rounded-full text-sm font-semibold text-white shadow-md whitespace-nowrap"
          >
            Yash Srivastava
          </motion.div>

          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div variants={childVariants2} className="hidden md:block">
              <MouseIcon
                rotate="rotate(90 20 20)"
                className="absolute z-100 left-[5%] top-[70%] w-10 h-10 text-gray-700"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -15, skewX: 10 }}
              animate={{ opacity: 1, x: 0, skewX: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 1.9 }}
              className="hidden satoshi2  md:flex items-center gap-1 absolute right-[8rem] top-[12.5rem]
  bg-gray-700 py-2 px-4 rounded-full text-md font-semibold text-white shadow-md whitespace-nowrap"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 2C8.686 2 6 4.686 6 8c0 4.418 6 12 6 12s6-7.582 6-12c0-3.314-2.686-6-6-6zm0 8.5A2.5 2.5 0 1 1 12 5a2.5 2.5 0 0 1 0 5.5z" />
              </svg>
              India
            </motion.div>
          </motion.div>
          <div className="relative -z-40 group">
            <Image src="/images/admin.jpg" alt="Profile" width={220} height={220} className="rounded-2xl shadow-xl" />

            <span
              className="absolute left-1/2 bottom-0 -translate-x-1/2 bg-gradient-to-r 
              from-transparent via-blue-500 to-transparent h-[2px] w-[100%]"
            />

            <span
              className="absolute left-1/2 bottom-0 -translate-x-1/2 opacity-0 
              group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r 
              from-transparent via-blue-500 to-transparent h-[6px] w-[100%] blur-sm"
            />
          </div>

          <div className="flex flex-col items-center gap-1 mt-4 md:hidden">
            <span className="bg-blue-500 text-white py-1.5 px-4 rounded-full text-sm font-semibold shadow-sm">
              Yash Srivastava
            </span>
          </div>
        </motion.div>

        <motion.div
          style={{ y: yText }}
          className="text-center mt-8 md:mt-6 text-gray-700"
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="satoshi2 tracking-[0.06em] text-2xl sm:text-3xl md:text-5xl font-bold flex justify-center gap-[2px]">
            {"SOFTWARE".split("").map((char, index) => (
              <motion.span key={index} variants={charVariants}>{char}</motion.span>
            ))}
          </h1>
          <h1 className="satoshi2 tracking-[0.01em] text-2xl sm:text-3xl md:text-5xl font-bold flex justify-center gap-[2px]">
             {"DEVELOPER".split("").map((char, index) => (
              <motion.span key={index} variants={charVariants}>{char}</motion.span>
            ))}
          </h1>
          <motion.h2 
            initial={{ opacity: 0, filter: "blur(5px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 1.5, duration: 1 }}
            className="satoshi3 mt-2"
          >
            Engineering efficiency, crafting experiences.
          </motion.h2>
        </motion.div>
      </motion.div>
    </div>
  );
}
