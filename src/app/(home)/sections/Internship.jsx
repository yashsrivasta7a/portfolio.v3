"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1];

const experiences = [
  {
    company: "OneCX",
    role: "Software Development Engineer I",
    duration: "Jul 2026 — Now",
    summary:
      "Client web apps in Next.js and TypeScript, with a reusable component layer in Tailwind and Framer Motion.",
    link: "https://one-cx.com/",
  },
  {
    company: "SciTech Industries",
    role: "Software Development Engineer Intern",
    duration: "Mar 2026 — Jun 2026",
    summary:
      "An AWS edge-to-cloud telemetry platform watching 50+ factory machines: offline-resilient MQTT with a 5,000-message local buffer, and over-the-air provisioning for Raspberry Pi fleets.",
    link: "https://scitechindustries.com/",
  },
  {
    company: "Galaxy.ai",
    role: "Software Development Engineer Intern",
    duration: "Jan 2026 — Feb 2026",
    summary:
      "A visual flow builder for wiring AI models, tools and APIs together. Built the node primitives (triggers, inputs, actions) and the run inspector.",
    link: "https://galaxy.ai",
  },
  {
    company: "Adquora",
    role: "Frontend Engineer",
    duration: "Sep 2025 — Dec 2025",
    summary: "Designed and built the company's website end to end, as part of the core tech team.",
    link: "https://adquora.com/",
  },
  {
    company: "KPMG India",
    role: "Academic Trainee (Software Development Engineer Trainee)",
    duration: "Jun 2025 — Aug 2025",
    summary:
      "An agent on LangChain and LangGraph that turns plain-English questions into structured queries over enterprise data.",
    link: "https://kpmg.com/in",
  },
  {
    company: "FISU, MRIIRS",
    role: "React Developer",
    duration: "Jun 2024 — Sep 2024",
    summary: "A React app for a university sports event: live schedules and venue navigation.",
  },
];

const LINKEDIN = "https://www.linkedin.com/in/yashsrivasta7a/details/experience/";

export default function Internship() {
  return (
    <section
      aria-labelledby="experience-heading"
      className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24 mb-40 text-[#1a1a1a]"
    >
      {/* Two tracks, not 12 columns: eleven lg gaps outgrew the 1024px viewport */}
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-x-12 lg:gap-x-24">
        {/* Left: label + intro, same voice as About's "The Philosophy".
            Sticky at every size: a frosted bar on phones, a side column from md up. */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="sticky top-0 z-10 -mx-6 px-6 py-4 bg-[#fafaf9] border-b border-gray-200 grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 md:top-32 md:self-start md:block md:mx-0 md:px-0 md:py-0 md:bg-transparent md:border-0 md:space-y-8"
        >
          <h2 id="experience-heading" className="row-start-1 text-xs font-bold tracking-[0.2em] uppercase text-gray-700">
            Experience
          </h2>
          <p className="col-span-2 row-start-2 text-sm md:text-lg text-gray-600 leading-relaxed">
            Where I learned the craft, one team at a time.
          </p>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="row-start-1 col-start-2 inline-block text-xs md:text-sm text-gray-600 underline-offset-4 decoration-gray-300 hover:underline hover:text-[#1a1a1a] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-900 rounded-sm"
          >
            Full history on LinkedIn ↗
          </a>
        </motion.div>

        {/* Right: one line per role */}
        <ol className="md:border-t md:border-gray-200">
          {experiences.map((exp, i) => (
            <motion.li
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: EASE }}
              className="border-b border-gray-200 py-7 md:py-8 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-x-8"
            >
              <div>
                <h3 className="satoshi1 text-xl md:text-2xl tracking-tight">{exp.company}</h3>
                <p className="mt-1 font-serif italic text-gray-600">{exp.role}</p>
                <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-gray-700 text-pretty">
                  {exp.summary}
                </p>
              </div>
              {/* Right rail: dates pinned top, site pinned bottom */}
              <div className="mt-4 lg:mt-0 flex justify-between gap-4 lg:flex-col lg:items-end font-mono text-xs text-gray-500 tabular-nums">
                <span>{exp.duration}</span>
                {exp.link && (
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-4 decoration-gray-300 hover:underline hover:text-[#1a1a1a] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-900 rounded-sm"
                  >
                    {new URL(exp.link).hostname.replace(/^www\./, "")} ↗
                  </a>
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
