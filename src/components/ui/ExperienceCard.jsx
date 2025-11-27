"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function ExperienceCard({
  company,
  role,
  location,
  duration,
  bullets = [],
  tech = [],
  link,
}) {
  return (
    <div className="w-full flex flex-col md:flex-row md:items-start gap-6 md:gap-10">

      {/* LEFT: CARD */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="
          relative w-full max-w-md p-5
          rounded-xl border 
          backdrop-blur-xl
        
          bg-[rgba(255,255,255,0.03)]
          dark:bg-[rgba(10,10,10,0.65)]
          shadow-[0_8px_30px_rgba(0,0,0,0.45)]
          hover:shadow-[0_12px_40px_rgba(0,0,0,0.55)]
        
          border-[rgba(0,0,0,0.08)]
          dark:border-[rgba(255,255,255,0.08)]
          transition-all duration-300
        "
      >
        {/* Glow */}
        <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-br from-[rgba(0,0,0,0.12)] to-transparent opacity-20" />

        {/* Header */}
        <h2 className="text-lg font-semibold tracking-tight text-gray-700 dark:text-gray-300 mb-1">
          {company}
        </h2>

        {/* Role */}
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
          {role}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-gray-700 dark:text-gray-400 mb-3">
          <span>{location}</span>
          <span>{duration}</span>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[rgba(0,0,0,0.1)] dark:bg-[rgba(255,255,255,0.08)] mb-3" />

        {/* Bullets */}
        <ul className="list-disc ml-5 text-[13px] leading-relaxed text-gray-700 dark:text-gray-300 space-y-2">
          {bullets.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </motion.div>

      {/* RIGHT: TECH + CTA */}
      <div className="flex flex-col items-start gap-4 md:pt-2">

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {tech.map((t, i) => (
            <span
              key={i}
              className="
                px-3 py-1 text-xs font-medium rounded-full 
                bg-blue-800/30 text-blue-600 dark:text-gray-300 
                dark:bg-gray-700/40 border border-gray-700/40
              "
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA */}
        {link && (
          <Link
            href={link}
            target="_blank"
            className="
              text-sm font-medium text-gray-700 dark:text-gray-300 
              hover:text-blue-500
              transition-colors underline-offset-4 hover:underline
            "
          >
            ➜ Visit Website
          </Link>
        )}
      </div>
    </div>
  );
}
