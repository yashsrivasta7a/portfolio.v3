"use client";

import { useEffect, useRef } from "react";
import { ASPECT, POINTS, SIZE } from "./preloader-points";

/**
 * The YS7 mark as it looks when the preloader settles: the same sampled cloud
 * points, drawn once. Used as a faint watermark; set the opacity on the parent.
 */
export default function YS7Mark({ className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const raw = atob(POINTS);

    const draw = () => {
      const W = canvas.clientWidth, H = W / ASPECT;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#1a1a1a";
      const r = Math.max(0.8, W / 420);
      for (let i = 0; i < raw.length / 2; i++) {
        ctx.beginPath();
        ctx.arc((raw.charCodeAt(i * 2) / SIZE[0]) * W, (raw.charCodeAt(i * 2 + 1) / SIZE[1]) * H, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  return <canvas ref={ref} aria-hidden className={`block w-full ${className}`} />;
}
