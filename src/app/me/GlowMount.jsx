"use client";

import { useEffect, useState } from "react";
import GlowBackground from "./GlowBackground";

/**
 * Mounts the WebGL background only while the Glow switch is on.
 *
 * The switch writes `data-glow` on the page root, so this watches that
 * attribute rather than sharing state with it — the two components stay
 * independent, and the CSS keys off the same attribute for everything else.
 *
 * Mounting rather than hiding matters: a hidden canvas still holds a GPU
 * context and still runs its animation frame every 16ms. Off should mean off.
 */
export default function GlowMount() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const root = document.querySelector(".me");
    if (!root) return;

    const read = () => setOn(root.dataset.glow === "on");
    read();

    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["data-glow"] });
    return () => observer.disconnect();
  }, []);

  return on ? <GlowBackground /> : null;
}
