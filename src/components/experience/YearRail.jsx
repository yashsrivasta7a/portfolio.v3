"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import RisingLine, { EASE } from "@/components/ui/RisingLine";
import { ACCENTS, EXPERIENCES } from "./experiences";

/**
 * A single horizontal rail with a marker per role. Picking a marker expands
 * its detail below.
 *
 * The rail is laid out by index rather than by real date: the roles are only
 * months apart in places, and spacing them truly would bunch four markers into
 * a few pixels and leave the rest of the line empty. Even spacing is a
 * deliberate lie that keeps every marker reachable.
 */
export default function YearRail() {
  const headRef = useRef(null);
  const show = useInView(headRef, { once: true, margin: "-120px" });
  const [active, setActive] = useState(0);

  const exp = EXPERIENCES[active];
  const accent = ACCENTS[active % ACCENTS.length];
  const last = EXPERIENCES.length - 1;

  // Oldest on the left reads as a timeline; the data is newest-first.
  const ordered = [...EXPERIENCES].reverse();
  const posOf = (i) => (last === 0 ? 0 : (i / last) * 100);
  // Where the active role sits once the list is reversed.
  const activePos = posOf(last - active);

  return (
    <section className="relative text-[#1a1a1a]">
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

        {/* The rail. Desktop only — six markers on a phone width are smaller
            than a fingertip, so below md the roles become a plain list. */}
        <div className="mt-20 hidden md:block">
          <div className="relative h-24">
            <div className="absolute inset-x-0 top-6 h-px bg-[#1a1a1a]/15" />
            {/* Filled portion, up to the active marker. */}
            <motion.div
              animate={{ width: `${activePos}%` }}
              transition={{ duration: 0.6, ease: EASE }}
              className="absolute left-0 top-6 h-px"
              style={{ background: accent }}
            />

            {ordered.map((e, i) => {
              // Index back in the original, newest-first array.
              const realIndex = last - i;
              const on = active === realIndex;
              const a = ACCENTS[realIndex % ACCENTS.length];
              return (
                <button
                  key={e.company}
                  type="button"
                  onClick={() => setActive(realIndex)}
                  onMouseEnter={() => setActive(realIndex)}
                  onFocus={() => setActive(realIndex)}
                  aria-pressed={on}
                  className="group absolute top-0 -translate-x-1/2"
                  style={{ left: `${posOf(i)}%` }}
                >
                  {/* Marker. Grows and takes the accent when active. */}
                  <span className="flex h-12 w-12 items-center justify-center">
                    <motion.span
                      animate={{
                        scale: on ? 1 : 0.45,
                        backgroundColor: on ? a : "#1a1a1a",
                      }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="block h-3 w-3 rounded-full"
                    />
                  </span>

                  <motion.span
                    animate={{ opacity: on ? 1 : 0.4, y: on ? 0 : 2 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="block whitespace-nowrap font-mono text-[0.65rem] uppercase tracking-[0.2em] text-gray-600"
                  >
                    {e.title}
                  </motion.span>
                </button>
              );
            })}
          </div>

          {/* Detail for the active marker. */}
          <div className="mt-10 pb-40">
            <AnimatePresence mode="wait">
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="grid grid-cols-12 gap-16 lg:gap-24"
              >
                <div className="col-span-5">
                  <p
                    className="font-mono text-xs tracking-[0.2em]"
                    style={{ color: accent }}
                  >
                    {String(active + 1).padStart(2, "0")}
                  </p>
                  <h3 className="satoshi1 mt-5 text-[3.2vw] font-bold leading-[1] tracking-tighter">
                    {exp.company}
                  </h3>
                  <p className="mt-3 font-serif text-2xl font-light italic text-gray-700">
                    {exp.role}
                  </p>
                  <div className="mt-6 flex flex-col gap-1 font-mono text-xs uppercase tracking-[0.2em] text-gray-500">
                    <span>{exp.location}</span>
                    <span>{exp.duration}</span>
                  </div>

                  {exp.link ? (
                    <Link
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link relative mt-9 inline-flex items-baseline gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]"
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
                </div>

                <div className="col-span-7">
                  <ul className="space-y-5">
                    {exp.bullets.map((b, i) => (
                      <motion.li
                        key={b}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.1 + i * 0.06,
                          ease: EASE,
                        }}
                        className="flex gap-4 text-lg font-light leading-relaxed text-gray-600"
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

                  <div className="mt-9 flex flex-wrap gap-3">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        style={{ "--accent": accent }}
                        className="cursor-default rounded-full border border-gray-200 bg-white/50 px-4 py-1.5 text-sm backdrop-blur-sm transition-[color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Phones get a plain stack — no rail, no markers to miss. */}
        <div className="mt-14 border-b border-[#1a1a1a]/15 md:hidden">
          {EXPERIENCES.map((e, i) => {
            const a = ACCENTS[i % ACCENTS.length];
            return (
              <div
                key={e.company}
                className="border-t border-[#1a1a1a]/15 py-10"
              >
                <div className="flex items-center gap-4 font-mono text-xs tracking-[0.2em] text-gray-500">
                  <span className="font-semibold" style={{ color: a }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-[#1a1a1a]/15" />
                  <span>{e.title}</span>
                </div>
                <h3 className="satoshi1 mt-6 text-[8vw] font-bold leading-[1] tracking-tighter">
                  {e.company}
                </h3>
                <p className="mt-2 font-serif text-lg font-light italic text-gray-700">
                  {e.role}
                </p>
                <ul className="mt-6 space-y-4">
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
