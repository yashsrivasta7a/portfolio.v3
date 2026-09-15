"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The /me preloader.
 *
 * A caret blinks, types one word, and leaves. That is the whole thing.
 *
 * The obvious "coder" preloader is a fake terminal — a prompt, some green
 * text, a progress bar spelling out `npm install`. It is the first idea
 * everyone has, which is exactly why it is the wrong one; it performs the job
 * rather than being it. What actually reads as code is the caret: the thing
 * that sits blinking in every editor, waiting. So the page opens on one, it
 * writes a single word, and the word turns out to be the page itself.
 *
 * Runs once per session, not per navigation. A preloader that replays every
 * time you come back stops being an entrance and becomes a toll booth.
 */

const WORD = "yash";
const SESSION_KEY = "me_intro_played";

/** Typing cadence. Uneven on purpose — a fixed interval reads as a machine. */
const KEYSTROKES = [90, 140, 75, 120];

export default function Preloader() {
  const [typed, setTyped] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const timers = useRef([]);

  /*
   * Decided once, during the initialiser, rather than flipped from an effect.
   *
   * Setting state inside an effect body costs a second render pass and trips
   * `react-hooks/set-state-in-effect`. The `typeof window` guard means the
   * server always renders `done: true` — no overlay in the HTML — and the
   * client decides for real on its first pass. Nothing to reconcile, because
   * the markup only ever appears after hydration.
   */
  const [done, setDone] = useState(() => {
    if (typeof window === "undefined") return true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;

    try {
      if (sessionStorage.getItem(SESSION_KEY)) return true;
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Private mode: play it. A preloader is not worth a crash.
    }
    return false;
  });

  useEffect(() => {
    if (done) return;

    document.documentElement.style.overflow = "hidden";

    // A beat of just the caret before anything is typed. The pause is what
    // makes the first keystroke feel like a decision rather than a loop.
    let at = 420;

    KEYSTROKES.forEach((gap, i) => {
      at += gap;
      timers.current.push(setTimeout(() => setTyped(i + 1), at));
    });

    // Read the finished word, then go.
    at += 520;
    timers.current.push(setTimeout(() => setLeaving(true), at));

    at += 620;
    timers.current.push(
      setTimeout(() => {
        document.documentElement.style.overflow = "";
        setDone(true);
      }, at),
    );

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      document.documentElement.style.overflow = "";
    };
  }, [done]);

  if (done) return null;

  return (
    <div className="me-pre" data-leaving={leaving || undefined} aria-hidden>
      <p className="me-pre-word">
        {WORD.slice(0, typed)}
        <span className="me-pre-caret" />
      </p>
    </div>
  );
}
