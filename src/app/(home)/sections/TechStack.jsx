"use client";
import { motion } from "framer-motion";

export default function TechStack() {
  const skills = [
    "Next.js",
    "React.js",
    "TypeScript",
    "Node.js",
    "Adobe XD",
    "C++",
    "Firebase",
    "Figma",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    ""
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: (custom) => ({
      opacity: 1,
      y: [0, -10, 0],
      scale: 1,
      transition: {
        y: {
          duration: 3 + custom * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 }
      },
    }),
  };

  return (
    <section className="px-6 py-16 md:p-24 flex flex-col justify-center items-center text-center bg-transparent">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl tracking-[0.2em] mb-10 md:mb-16 text-gray-800 satoshi5 font-bold"
      >
        SKILLS
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="flex flex-wrap justify-center gap-3 md:gap-5 max-w-5xl mx-auto"
      >
        {skills.map((skill, idx) => (
          <motion.span
            key={idx}
            custom={idx % 4}
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#1f2937", // gray-800
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2.5 md:px-8 md:py-4 rounded-full bg-gray-700 text-white text-sm md:text-lg font-medium 
            shadow-md hover:shadow-xl cursor-default border border-transparent hover:border-gray-700 transition-colors"
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
