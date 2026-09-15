"use client";

import { useEffect, useState } from "react";

const KEY = "me_highlight";

/**
 * Turns the section hover-highlight on and off.
 *
 * The switch writes a data attribute onto the page root and the CSS keys off
 * it — no inline styles, no class juggling, and the whole feature collapses to
 * a single selector that either matches or does not. The choice is remembered,
 * because a preference you have to set on every visit is not a preference.
 *
 * Default is on. Someone who has never touched it gets the behaviour; someone
 * who turned it off gets their page back.
 */
export default function HighlightToggle() {
  /*
   * Decided in the initialiser rather than flipped from an effect, which would
   * cost a second render pass. The server always gets `true`; the client reads
   * the stored preference on its first pass. Nothing to reconcile, because the
   * attribute this drives is written from an effect either way.
   */
  const [on, setOn] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      return localStorage.getItem(KEY) !== "off";
    } catch {
      return true; // Private mode. Leave it on.
    }
  });

  useEffect(() => {
    const root = document.querySelector(".me");
    if (root) root.dataset.highlight = on ? "on" : "off";

    try {
      localStorage.setItem(KEY, on ? "on" : "off");
    } catch {
      // Nothing to do — the attribute above still works for this session.
    }
  }, [on]);

  return (
    <button
      type="button"
      className="me-toggle"
      role="switch"
      aria-checked={on}
      onClick={() => setOn((v) => !v)}
    >
      <span className="me-toggle-track" aria-hidden>
        <span className="me-toggle-thumb" />
      </span>
      <span>Highlight</span>
    </button>
  );
}
