"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1];
const EMAIL = "yashsrivasta7a@gmail.com";

const ROWS = [
  { label: "LinkedIn", value: "in/yashsrivasta7a", href: "https://www.linkedin.com/in/yashsrivasta7a/", external: true },
  { label: "Resume", value: "View", href: "/resume", extra: { value: "Download PDF", href: "/2026_Resume.pdf", download: "Yash_Srivastava_Resume.pdf" } },
];

const LINK =
  "underline-offset-4 decoration-gray-300 hover:underline hover:text-[#1a1a1a] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-900 rounded-sm";

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24 mb-32 text-[#1a1a1a]"
    >
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-y-10 md:gap-x-12 lg:gap-x-24">
        {/* Left: same aside as Experience */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-4 md:space-y-8"
        >
          <h2 id="contact-heading" className="text-xs font-bold tracking-[0.2em] uppercase text-gray-700">
            Contact
          </h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            I take on a few freelance projects alongside my full-time role. Websites, product UI, or the whole build.
          </p>
        </motion.div>

        <div>
          {/* Availability + headline: the hero's sans × serif-italic pairing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <p className="flex items-center gap-2 font-mono text-xs text-gray-600">
              <span className="relative flex size-2">
                <span className="absolute inset-0 rounded-full bg-emerald-500/60 motion-safe:animate-ping" />
                <span className="relative size-2 rounded-full bg-emerald-500" />
              </span>
              Available for freelance work
            </p>
            <h3 className="mt-6 text-5xl md:text-7xl leading-[0.9] tracking-tighter">
              <span className="satoshi1 block">Have an idea?</span>
              <span className="block font-serif italic font-light text-gray-700">Let&apos;s build it.</span>
            </h3>
            <a
              href={`mailto:${EMAIL}`}
              className={`mt-8 inline-block text-lg md:text-2xl text-gray-700 decoration-1 underline ${LINK}`}
            >
              {EMAIL} ↗
            </a>
          </motion.div>

          {/* Ways to reach me: same rows as Experience */}
          <ul className="mt-14 border-t border-gray-200">
            {ROWS.map((row, i) => (
              <motion.li
                key={row.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: EASE }}
                className="flex items-baseline justify-between gap-6 border-b border-gray-200 py-5"
              >
                <span className="satoshi1 text-lg md:text-xl tracking-tight">{row.label}</span>
                <span className="flex flex-wrap justify-end gap-x-4 font-mono text-xs text-gray-500">
                  <a
                    href={row.href}
                    target={row.external ? "_blank" : undefined}
                    rel={row.external ? "noopener noreferrer" : undefined}
                    className={LINK}
                  >
                    {row.value} ↗
                  </a>
                  {row.extra && (
                    <a href={row.extra.href} download={row.extra.download} className={LINK}>
                      {row.extra.value} ↓
                    </a>
                  )}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
