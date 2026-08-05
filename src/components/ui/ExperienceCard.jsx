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
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="
          relative w-full max-w-md p-6
          rounded-2xl border border-gray-200/80
          bg-white/80 backdrop-blur-md
          shadow-[0_2px_8px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.04)]
          hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]
          transition-all duration-300
        "
      >
        {/* Header */}
        <h2 className="text-xl font-bold tracking-tight text-[#1a1a1a] satoshi1 mb-1">
          {company}
        </h2>

        {/* Role */}
        <p className="text-sm font-medium text-gray-600 satoshi6 mb-2">
          {role}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-gray-500 font-mono mb-3">
          <span>{location}</span>
          <span>{duration}</span>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-200 mb-3" />

        {/* Bullets */}
        <ul className="list-disc ml-4 text-[13px] leading-relaxed text-gray-700 space-y-2 satoshi6">
          {bullets.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </motion.div>

      {/* RIGHT: TECH + CTA */}
      <div className="flex flex-col items-start gap-4 md:pt-2">

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 max-w-xs">
          {tech.map((t, i) => (
            <span
              key={i}
              className="
                px-3 py-1 text-xs font-medium rounded-full 
                border border-gray-200 text-gray-700 bg-white/60 backdrop-blur-sm shadow-sm
                hover:bg-gray-900 hover:text-white transition-colors cursor-default
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
              text-xs font-medium text-gray-700 
              hover:text-black
              transition-colors underline-offset-4 hover:underline flex items-center gap-1.5
            "
          >
            Visit Website <span>↗</span>
          </Link>
        )}
      </div>
    </div>
  );
}

