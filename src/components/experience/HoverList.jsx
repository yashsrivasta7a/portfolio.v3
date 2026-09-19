"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import RisingLine, { EASE } from "@/components/ui/RisingLine";
import { ACCENTS, EXPERIENCES } from "./experiences";

/**
 * Unused. Kept as an alternative treatment for the experience section —
 * swap it into sections/Internship.jsx in place of YearRail to try it.
 *
 * A bare list of companies with a detail panel beside it. The panel does not
 * follow the cursor — it holds one position and swaps contents, because a
 * panel that chases the pointer down a vertical list reads as noise.
 *
 * Below md the panel has nowhere to live, so each row renders its own detail
 * inline and the list behaves like a plain stack.
 */
export default function HoverList() {
  const headRef = useRef(null);
  const show = useInView(headRef, { once: true, margin: "-120px" });
  const [active, setActive] = useState(0);

  const exp = EXPERIENCES[active];
  const accent = ACCENTS[active % ACCENTS.length];

  return (
    <section className="relative text-[#1a1a1a] mb-30">
      <div className="mx-auto max-w-[1800px] px-6 md:px-12 lg:px-24">
        <div
          ref={headRef}
          className="flex items-baseline gap-4 font-mono text-xs tracking-[0.2em] text-gray-700"
        >
          <span>FIG 11. &mdash; THE ROLES</span>
          <span className="h-px flex-1 bg-[#1a1a1a]/15" />
          <span>{String(EXPERIENCES.length).padStart(2, "0")} POSITIONS</span>
        </div>

        <h2 className="satoshi1 mt-8 whitespace-nowrap text-[7.2vw] font-bold leading-[1.05] tracking-tighter text-[#1a1a1a] md:text-[5.4vw]">
          <RisingLine text="Where I" show={show} />
          <RisingLine
            text="learned it."
            delay={0.1}
            show={show}
            className="font-serif font-light italic tracking-normal text-gray-700"
          />
        </h2>

        <div className="mt-16 grid grid-cols-1 md:mt-24 md:grid-cols-12 md:gap-16 lg:gap-24">
          {/* The list. */}
          <div className="md:col-span-6">
            <div className="border-b border-[#1a1a1a]/15">
              {EXPERIENCES.map((e, i) => {
                const a = ACCENTS[i % ACCENTS.length];
                const on = active === i;
                return (
                  <div key={e.company} className="border-t border-[#1a1a1a]/15">
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      className="group flex w-full items-center gap-5 py-6 text-left md:py-7"
                    >
                      <span
                        className="font-mono text-xs tracking-[0.2em] transition-colors duration-500"
                        style={{ color: on ? a : "#9ca3af" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      {/* Rule that grows toward the name as it becomes active,
                          so the eye is led rather than jolted. */}
                      <motion.span
                        animate={{ width: on ? 40 : 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="hidden h-px shrink-0 md:block"
                        style={{ background: a }}
                      />

                      <motion.span
                        animate={{ opacity: on ? 1 : 0.35 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="satoshi1 min-w-0 flex-1 text-[7vw] font-bold leading-[1.05] tracking-tighter md:text-[2.6vw]"
                      >
                        {e.company}
                      </motion.span>

                      <span className="shrink-0 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-gray-500">
                        {e.title}
                      </span>
                    </button>

                    {/* Inline detail, phones only. */}
                    <div className="pb-8 md:hidden">
                      <p className="font-serif text-lg font-light italic text-gray-700">
                        {e.role}
                      </p>
                      <ul className="mt-5 space-y-4">
                        {e.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex gap-3 text-base font-light leading-relaxed text-gray-600"
                          >
                            <span
                              aria-hidden
                              className="mt-[0.7em] h-px w-4 shrink-0"
                              style={{ background: a, opacity: 0.5 }}
                            />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* The panel. Sticky so it stays beside whichever row you reach. */}
          <div className="hidden md:col-span-6 md:block">
            <div className="sticky top-[22vh]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <div
                    className="h-px w-16"
                    style={{ background: accent }}
                  />

                  <p className="mt-7 font-serif text-2xl font-light italic text-gray-700">
                    {exp.role}
                  </p>

                  <div className="mt-4 flex flex-col gap-1 font-mono text-xs uppercase tracking-[0.2em] text-gray-500">
                    <span>{exp.location}</span>
                    <span>{exp.duration}</span>
                  </div>

                  <ul className="mt-9 space-y-5">
                    {exp.bullets.map((b, i) => (
                      <motion.li
                        key={b}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.08 + i * 0.06,
                          ease: EASE,
                        }}
                        className="flex gap-4 text-base font-light leading-relaxed text-gray-600 md:text-lg"
                      >
                        <span
                          aria-hidden
                          className="mt-[0.7em] h-px w-5 shrink-0"
                          style={{ background: accent, opacity: 0.5 }}
                        />
                        <span>{b}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-9 flex flex-wrap gap-2 md:gap-3">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        style={{ "--accent": accent }}
                        className="cursor-default rounded-full border border-gray-200 bg-white/50 px-3 py-1 text-xs backdrop-blur-sm transition-[color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)] md:px-4 md:py-1.5 md:text-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {exp.link ? (
                    <Link
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link relative mt-10 inline-flex items-baseline gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]"
                    >
                      <span className="relative pb-1">
                        Visit {exp.company}
                        <span className="absolute inset-x-0 bottom-0 h-px bg-[#1a1a1a]/20" />
                        <span
                          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:scale-x-100"
                          style={{ background: accent }}
                        />
                      </span>
                      <span className="relative block h-3 w-3 overflow-hidden">
                        <span className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:translate-x-3 group-hover/link:-translate-y-3">
                          &#8599;
                        </span>
                        <span className="absolute inset-0 -translate-x-3 translate-y-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:translate-x-0 group-hover/link:translate-y-0">
                          &#8599;
                        </span>
                      </span>
                    </Link>
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
