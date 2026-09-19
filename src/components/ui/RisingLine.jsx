"use client";

import { motion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

/**
 * Splits a line into words that rise from behind a clipped row. Words rather
 * than letters: per-letter staggering on a line this long reads as a slot
 * machine, and the eye loses the word shape while it animates.
 *
 * `show` is passed in rather than read from a viewport trigger here, because
 * Lenis drives scroll off the main thread and Framer's whileInView can miss
 * against it — leaving the words parked at 110% and the line invisible. The
 * caller owns an IntersectionObserver and hands the result down.
 */
export default function RisingLine({ text, className, delay = 0, show }) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <span
          key={`${word}-${i}`}
          /**
           * The clip row is sized to the line box, and these headings run
           * tighter than 1.0 leading, so descenders fall outside it and get
           * cut. Pad below and pull the extra height back with a negative
           * margin: the mask still hides the word on its way up.
           */
          className="inline-block overflow-hidden pb-[0.18em] align-bottom -mb-[0.18em]"
        >
          <motion.span
            initial={{ y: "110%" }}
            animate={show ? { y: 0 } : { y: "110%" }}
            transition={{ duration: 0.9, delay: delay + i * 0.06, ease: EASE }}
            className="inline-block pr-[0.25em]"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
