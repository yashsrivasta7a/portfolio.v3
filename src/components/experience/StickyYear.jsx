"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import RisingLine, { EASE } from "@/components/ui/RisingLine";
import { ACCENTS, EXPERIENCES } from "./experiences";

/**
 * Unused. Kept as an alternative treatment for the experience section —
 * swap it into sections/Internship.jsx in place of YearRail to try it.
 *
 * One role in the scrolling column. It reports itself to the parent when it
 * reaches the middle band of the viewport, which is what drives the pinned
 * year on the left — the year follows reading position rather than raw scroll
 * offset, so it never disagrees with what is actually on screen.
 */
function Role({ exp, index, accent, onActive }) {
  const ref = useRef(null);
  const show = useInView(ref, { once: true, margin: "-80px" });
  const centred = useInView(ref, { margin: "-45% 0px -45% 0px" });

  // Reporting upward has to happen in an effect: setting parent state during
  // render warns and can loop.
  useEffect(() => {
    if (centred) onActive(index);
  }, [centred, index, onActive]);

  return (
    <div ref={ref} className="border-t border-[#1a1a1a]/15 py-14 md:py-20">
      <div className="flex items-center gap-4 font-mono text-xs tracking-[0.2em] text-gray-500">
        <span className="font-semibold" style={{ color: accent }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <motion.span
          initial={{ scaleX: 0 }}
          animate={show ? { scaleX: 1 } : undefined}
          transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
          className="h-px flex-1 origin-left bg-[#1a1a1a]/15"
        />
        <span>{exp.duration}</span>
      </div>

      <h3 className="satoshi1 mt-7 text-[8vw] font-bold leading-[1] tracking-tighter text-[#1a1a1a] md:text-[2.8vw]">
        <RisingLine text={exp.company} show={show} />
      </h3>
      <p className="mt-2 font-serif text-lg font-light italic text-gray-700 md:text-2xl">
        {exp.role}
      </p>
      <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-gray-500">
        {exp.location}
      </p>

      <ul className="mt-8 space-y-5">
        {exp.bullets.map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, y: 14 }}
            animate={show ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, delay: 0.2 + i * 0.08, ease: EASE }}
            className="flex gap-4 text-base font-light leading-relaxed text-gray-600 md:text-lg"
          >
            <span
              aria-hidden
              className="mt-[0.7em] h-px w-5 shrink-0"
              style={{ background: accent, opacity: 0.5 }}
            />
            <span>{item}</span>
          </motion.li>
        ))}
      </ul>

      <div className="mt-9 flex flex-wrap gap-2 md:gap-3">
        {exp.tech.map((t, i) => (
          <motion.span
            key={t}
            initial={{ opacity: 0, y: 12 }}
            animate={show ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.35 + i * 0.05, duration: 0.5, ease: EASE }}
            style={{ "--accent": accent }}
            className="cursor-default rounded-full border border-gray-200 bg-white/50 px-3 py-1 text-xs backdrop-blur-sm transition-[color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)] md:px-4 md:py-1.5 md:text-sm"
          >
            {t}
          </motion.span>
        ))}
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
  );
}

export default function StickyYear() {
  const headRef = useRef(null);
  const show = useInView(headRef, { once: true, margin: "-120px" });
  const [active, setActive] = useState(0);

  const exp = EXPERIENCES[active];
  const accent = ACCENTS[active % ACCENTS.length];

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

        <div className="mt-16 grid grid-cols-1 md:mt-24 md:grid-cols-12 md:gap-16 lg:gap-24">
          {/* The pinned year. Hidden on phones, where there is no room beside
              the text and a sticky block just eats the viewport. */}
          <div className="hidden md:col-span-4 md:block">
            <div className="sticky top-[30vh]">
              <div className="overflow-hidden">
                <motion.p
                  key={exp.title}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="satoshi1 text-[5.5vw] font-bold leading-[1] tracking-tighter"
                  style={{ color: accent }}
                >
                  {exp.title}
                </motion.p>
              </div>

              <div className="mt-6 h-px w-full bg-[#1a1a1a]/15">
                <motion.div
                  animate={{
                    width: `${((active + 1) / EXPERIENCES.length) * 100}%`,
                  }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="h-px"
                  style={{ background: accent }}
                />
              </div>

              <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-gray-500">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(EXPERIENCES.length).padStart(2, "0")}
              </p>
            </div>
          </div>

          <div className="border-b border-[#1a1a1a]/15 md:col-span-8">
            {EXPERIENCES.map((e, i) => (
              <Role
                key={e.company}
                exp={e}
                index={i}
                accent={ACCENTS[i % ACCENTS.length]}
                onActive={setActive}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
