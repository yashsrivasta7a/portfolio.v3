"use client";

import { useEffect, useState } from "react";

/**
 * A remembered on/off switch that drives a data attribute on the page root.
 *
 * One component rather than one per feature: the switches differ only in their
 * label, their storage key and the attribute they write, so those are props.
 * Copy-pasting it per feature is how the second one quietly drifts from the
 * first.
 *
 * The CSS keys off the attribute, so each feature collapses to a single
 * selector that either matches or does not — no inline styles, no class
 * juggling. The choice persists, because a preference you reset on every visit
 * is not a preference.
 */
export default function Switch({ label, attr, storageKey, defaultOn = true }) {
  /*
   * Decided in the initialiser rather than flipped from an effect, which would
   * cost a second render pass. The server always gets the default; the client
   * reads the stored preference on its first pass. Nothing to reconcile,
   * because the attribute this drives is written from an effect either way.
   */
  const [on, setOn] = useState(() => {
    if (typeof window === "undefined") return defaultOn;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored === null) return defaultOn;
      return stored !== "off";
    } catch {
      return defaultOn; // Private mode. Leave it at the default.
    }
  });

  useEffect(() => {
    const root = document.querySelector(".me");
    if (root) root.dataset[attr] = on ? "on" : "off";

    try {
      localStorage.setItem(storageKey, on ? "on" : "off");
    } catch {
      // Nothing to do — the attribute above still works for this session.
    }
  }, [on, attr, storageKey]);

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
      <span>{label}</span>
    </button>
  );
}
