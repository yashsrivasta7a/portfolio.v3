"use client";

import Image from "next/image";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import RisingLine, { EASE } from "@/components/ui/RisingLine";
import { PROJECTS } from "./projects";

/**
 * The link at the foot of each block. The underline wipes in from the left and
 * the arrow leaves along the same diagonal while a second one arrives behind
 * it, so the two read as one gesture instead of two things moving at once.
 */
function VisitLink({ href, label, accent }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link relative inline-flex items-baseline gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]"
    >
      <span className="relative pb-1">
        {label}
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
    </a>
  );
}

function RevealProject({ project, index, flip }) {
  const ref = useRef(null);
  /**
   * IntersectionObserver rather than whileInView: Lenis drives scroll off the
   * main thread, and Framer's viewport trigger can miss entirely against it —
   * leaving words parked at 110% and the block invisible. One observer per row
   * drives every reveal inside it, so they stay in step.
   */
  const show = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // The image is oversized inside its frame and drifts, so the frame reads as
  // a window rather than a border around a static picture.
  const y = useTransform(scrollYProgress, [0, 1], ["-22%", "0%"]);

  // The text container gets a slight opposite parallax to the image, making the whole row feel dimensional.
  const textY = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 items-center gap-12 py-20 md:grid-cols-12 md:py-28 lg:gap-24"
    >
      <motion.div 
        style={{ y: textY }}
        className={`order-2 md:col-span-5 ${flip ? "md:order-2" : "md:order-1"}`}
      >
        {/* Index rule. The hairline grows out from the number as the block
            arrives, which gives the eye somewhere to start reading. */}
        <div className="flex items-center gap-4 font-mono text-xs tracking-[0.2em] text-gray-500">
          <motion.span
            initial={{ opacity: 0 }}
            animate={show ? { opacity: 1 } : undefined}
            transition={{ duration: 0.5 }}
            style={{ color: project.accent }}
            className="font-semibold"
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={show ? { scaleX: 1 } : undefined}
            transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
            className="h-px flex-1 origin-left bg-[#1a1a1a]/15"
          />
          <motion.span
            initial={{ opacity: 0 }}
            animate={show ? { opacity: 1 } : undefined}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {project.year}
          </motion.span>
        </div>

        <h3 className="satoshi1 mt-8 text-[9vw] font-bold leading-[0.95] tracking-tighter text-[#1a1a1a] md:text-[3.2vw]">
          <RisingLine text={project.title} show={show} />
          <RisingLine
            text={project.title2}
            delay={0.12}
            show={show}
            className="block font-serif font-light italic tracking-normal text-gray-700"
          />
        </h3>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={show ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          className="mt-6 max-w-md text-base font-light leading-relaxed text-gray-600 md:mt-8 md:text-lg"
        >
          {project.content}
        </motion.p>

        <div className="mt-8 flex flex-wrap gap-2 md:gap-3">
          {project.tech.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, y: 14 }}
              animate={show ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.35 + i * 0.05, duration: 0.5, ease: EASE }}
              /**
               * The accent goes through a custom property so the hover colour
               * and border can both read it without a second inline style.
               */
              style={{ "--accent": project.accent }}
              className="cursor-default rounded-full border border-gray-200 bg-white/50 px-3 py-1 text-xs backdrop-blur-sm transition-[color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)] md:px-4 md:py-1.5 md:text-sm"
            >
              {t}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : undefined}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-10"
        >
          <VisitLink
            href={project.link}
            label={`Visit ${project.name}`}
            accent={project.accent}
          />
        </motion.div>
      </motion.div>

      {/* The masked frame. clip-path on a wrapper rather than scaling the image
          itself, so the picture never appears to zoom while it uncovers. */}
      <motion.div
        initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
        animate={show ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
        transition={{ duration: 1.2, ease: EASE }}
        className={`order-1 md:col-span-7 ${flip ? "md:order-1" : "md:order-2"}`}
      >
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group/card relative block aspect-[4/3] w-full overflow-hidden rounded-2xl"
        >
          <motion.div style={{ y }} className="absolute inset-x-0 top-0 h-[128%]">
            <Image
              src={project.image}
              alt={project.name}
              fill
              sizes="(max-width: 768px) 90vw, 50vw"
              priority={index === 0}
              className="object-cover"
            />
          </motion.div>

          {/*
            The only hover state: a hairline frame drawn in from the corners.
            It sits over the picture rather than altering it, so the image is
            never filtered, tinted or moved.
          */}
          <span className="pointer-events-none absolute inset-3 md:inset-4">
            <span className="absolute left-0 top-0 h-px w-0 bg-white/80 transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:w-full" />
            <span className="absolute right-0 top-0 h-0 w-px bg-white/80 transition-[height] delay-100 duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:h-full" />
            <span className="absolute bottom-0 right-0 h-px w-0 bg-white/80 transition-[width] delay-200 duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:w-full" />
            <span className="absolute bottom-0 left-0 h-0 w-px bg-white/80 transition-[height] delay-300 duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:h-full" />
          </span>
        </a>

        <motion.p
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : undefined}
          transition={{ duration: 0.6, delay: 0.8 }}
          className={`mt-4 font-mono text-xs text-gray-700 ${
            flip ? "text-left" : "text-right"
          }`}
        >
          FIG {String(index + 4).padStart(2, "0")}. &mdash;{" "}
          {project.name.toUpperCase()}
        </motion.p>
      </motion.div>
    </div>
  );
}

export default function MaskReveal() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Reading rule down the gutter, scrubbed by progress through the list.
  const railHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative text-[#1a1a1a]">
      <div className="mx-auto max-w-[1800px] px-6 md:px-12 lg:px-24">
        <div className="flex items-baseline gap-4 font-mono text-xs tracking-[0.2em] text-gray-700">
          <span>FIG 04. &mdash; THE WORK</span>
          <span className="h-px flex-1 bg-[#1a1a1a]/15" />
          <span>{String(PROJECTS.length).padStart(2, "0")} PROJECTS</span>
        </div>

        <h2 className="satoshi1 mt-8 whitespace-nowrap text-[7.2vw] font-bold leading-[1.05] tracking-tighter text-[#1a1a1a] md:text-[5.4vw]">
          <RisingLine text="Things I" show />
          <RisingLine
            text="actually shipped."
            delay={0.1}
            show
            className="font-serif font-light italic tracking-normal text-gray-700"
          />
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: EASE }}
          className="mt-10 max-w-xl text-lg font-light leading-relaxed text-gray-600 md:mt-14 md:text-2xl"
        >
          Not concepts, not mockups. Seven products built end to end &mdash;
          some running for people who use them daily, some built to find out
          whether the idea held.
        </motion.p>
      </div>

      <div
        ref={ref}
        className="relative mx-auto w-full max-w-[1800px] px-6 pb-20 md:px-12 md:pb-32 lg:px-24"
      >
        {/* Progress rule in the left gutter, desktop only. */}
        <div className="absolute left-0 top-0 hidden h-full w-px bg-[#1a1a1a]/10 lg:block">
          <motion.div
            style={{ height: railHeight }}
            className="w-px bg-[#1a1a1a]/40"
          />
        </div>

        {PROJECTS.map((project, i) => (
          <RevealProject
            key={project.id}
            project={project}
            index={i}
            flip={i % 2 === 1}
          />
        ))}
      </div>
    </section>
  );
}
