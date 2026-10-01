"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { finishIntro } from "@/lib/intro";
import { ASPECT, POINTS, SIZE } from "./preloader-points";

/**
 * Home preloader: the YS7 mark, condensed out of a few thousand drifting
 * particles.
 *
 * Dust scattered across the screen flies in and settles into the logo's cloud
 * shapes, breathes there for a moment (and parts around the cursor like real
 * cloud), then a wind takes it away as the ink fades and the hero rises
 * underneath (About.jsx waits on `finishIntro`).
 *
 * Every particle's path is a pure function of time, so the whole thing runs in
 * a vertex shader: one draw call per frame, nothing per-particle on the CPU.
 * Raw WebGL, no library. Browsers without it get the quick fade.
 *
 * Plays once per session; repeat visits and reduced motion get a quick fade.
 * Lives in the root layout, outside template.jsx: that wrapper animates
 * `filter`, which would trap `position: fixed` inside it.
 */

const SESSION_KEY = "home_intro_played";

// Seconds. Particles start flying at GATHER, each with its own delay up to
// STAGGER, and take FLIGHT to land; the last lands as the counter hits 100.
// At RELEASE the wind takes them; the ink starts fading FADE_LAG later.
const GATHER = 0.25;
const STAGGER = 0.55;
const FLIGHT = 1.45;
const RELEASE = 2.55;
const FADE_LAG = 0.2;
const END = 3.7;

const VERT = /* glsl */ `
attribute vec2 aTarget;  // where it lands, as a fraction of the logo box
attribute vec2 aStart;   // where it starts, as a fraction of the screen (may be off-screen)
attribute vec4 aSeed;    // delay, size, phase, swirl
attribute vec2 aWind;    // gust, lift
uniform vec2 uRes;
uniform vec4 uLogo;      // x, y, w, h in px
uniform vec2 uMouse;
uniform float uTime, uDpr, uSizeScale;
varying float vAlpha;

const float GATHER = ${GATHER}, FLIGHT = ${FLIGHT}, RELEASE = ${RELEASE}, RADIUS = 110.0;

// Flight along a curve, then a slow breathing once landed. Progress is written to e.
vec2 assembled(float t, out float e, out float settle) {
  vec2 s = aStart * uRes;
  vec2 tg = uLogo.xy + aTarget * uLogo.zw;
  float a = clamp((t - GATHER - aSeed.x) / FLIGHT, 0.0, 1.0);
  e = 1.0 - pow(1.0 - a, 5.0);
  vec2 d = tg - s;
  float bend = sin(3.14159 * a) * aSeed.w;
  vec2 p = s + d * e + vec2(-d.y, d.x) * bend;
  settle = clamp((a - 0.85) / 0.15, 0.0, 1.0);
  p += vec2(sin(t * 1.4 + aSeed.z), cos(t * 1.1 + aSeed.z)) * 0.8 * settle;
  return p;
}

// The cursor pushes the cloud aside.
vec2 pushed(vec2 p, float strength) {
  vec2 m = p - uMouse;
  float dm = length(m);
  if (dm < RADIUS && dm > 0.01) p += m / dm * (1.0 - dm / RADIUS) * 26.0 * strength;
  return p;
}

void main() {
  float e, settle, alpha;
  vec2 p;
  if (uTime < RELEASE) {
    p = pushed(assembled(uTime, e, settle), settle);
    alpha = 0.25 + 0.75 * e;
  } else {
    // Wind from the left: a sweep by column, then each mote lifts and fades on its own.
    p = pushed(assembled(RELEASE, e, settle), 1.0);
    float td = max(0.0, uTime - RELEASE - aTarget.x * 0.22);
    p.x += td * 160.0 * aWind.x + td * td * 1400.0;
    p.y -= td * 90.0 * aWind.y + td * td * 300.0 - sin(td * 7.0 + aSeed.z) * 5.0;
    alpha = max(0.0, 1.0 - td / 0.55);
  }
  vAlpha = alpha;
  vec2 clip = p / uRes * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  gl_PointSize = aSeed.y * 2.0 * uSizeScale * uDpr;
}`;

const FRAG = /* glsl */ `
precision mediump float;
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float a = smoothstep(1.0, 0.25, d) * vAlpha;
  gl_FragColor = vec4(vec3(a), a); // premultiplied
}`;

function compile(gl, type, src) {
  const sh = gl.createShader(type);
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh));
  return sh;
}

function attrib(gl, program, name, data, size) {
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(program, name);
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
}

/** Runs the whole show on one canvas. Returns a stop function, or null if WebGL is unavailable. */
function play(canvas, counterEl, onRelease, onEnd) {
  const gl = canvas.getContext("webgl", { alpha: true, antialias: false, premultipliedAlpha: true });
  if (!gl) return null;

  const program = gl.createProgram();
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);

  const raw = atob(POINTS);
  const n = Math.min(raw.length / 2, window.innerWidth < 768 ? 2600 : 4000);
  const target = new Float32Array(n * 2), start = new Float32Array(n * 2);
  const seed = new Float32Array(n * 4), wind = new Float32Array(n * 2);
  for (let i = 0; i < n; i++) {
    target[i * 2] = raw.charCodeAt(i * 2) / SIZE[0];
    target[i * 2 + 1] = raw.charCodeAt(i * 2 + 1) / SIZE[1];
    // Scatter: most from anywhere on screen, some from well beyond the edges.
    const far = Math.random() < 0.3 ? 1.6 : 1;
    start[i * 2] = 0.5 + (Math.random() - 0.5) * far;
    start[i * 2 + 1] = 0.5 + (Math.random() - 0.5) * far;
    seed[i * 4] = Math.random() * STAGGER;
    seed[i * 4 + 1] = 2.2 + Math.random() * 3.4;
    seed[i * 4 + 2] = Math.random() * Math.PI * 2;
    seed[i * 4 + 3] = (Math.random() - 0.5) * 0.6;
    wind[i * 2] = 0.6 + Math.random();
    wind[i * 2 + 1] = 0.4 + Math.random() * 1.2;
  }
  attrib(gl, program, "aTarget", target, 2);
  attrib(gl, program, "aStart", start, 2);
  attrib(gl, program, "aSeed", seed, 4);
  attrib(gl, program, "aWind", wind, 2);

  const u = (name) => gl.getUniformLocation(program, name);
  const uRes = u("uRes"), uLogo = u("uLogo"), uMouse = u("uMouse");
  const uTime = u("uTime"), uDpr = u("uDpr"), uSizeScale = u("uSizeScale");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  gl.uniform1f(uDpr, dpr);

  const layout = () => {
    const W = window.innerWidth, H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    gl.viewport(0, 0, canvas.width, canvas.height);
    const logoW = Math.min(W * (W < 768 ? 0.94 : 0.84), H * 0.62 * ASPECT);
    const logoH = logoW / ASPECT;
    gl.uniform2f(uRes, W, H);
    gl.uniform4f(uLogo, (W - logoW) / 2, (H - logoH) / 2, logoW, logoH);
    // Dots tuned for a ~1200px mark; a phone-sized mark needs finer grain or it blobs.
    gl.uniform1f(uSizeScale, Math.min(1, Math.max(0.42, logoW / 1200)));
  };
  layout();
  window.addEventListener("resize", layout);

  gl.uniform2f(uMouse, -1e4, -1e4);
  const onMove = (e) => gl.uniform2f(uMouse, e.clientX, e.clientY);
  window.addEventListener("pointermove", onMove);

  let raf = 0, released = false, shown = -1;
  const t0 = performance.now();
  const frame = (now) => {
    const t = (now - t0) / 1000;

    // Counter: 0 → 100 across the time it takes every particle to land.
    const pct = Math.round(100 * Math.min(1, Math.max(0, (t - GATHER) / (FLIGHT + STAGGER))));
    if (pct !== shown) {
      shown = pct;
      counterEl.textContent = String(pct).padStart(3, "0");
    }
    if (t >= RELEASE && !released) {
      released = true;
      onRelease();
    }

    gl.uniform1f(uTime, t);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, n);

    if (t < END) raf = requestAnimationFrame(frame);
    else onEnd();
  };
  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", layout);
    window.removeEventListener("pointermove", onMove);
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  };
}

export default function Preloader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(pathname === "/");
  const [leaving, setLeaving] = useState(false);
  const canvasRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    if (!visible) {
      finishIntro();
      return;
    }

    let quick = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    try {
      if (sessionStorage.getItem(SESSION_KEY)) quick = true;
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Private mode: play it. Not worth a crash.
    }

    document.documentElement.style.overflow = "hidden";
    const timers = [];
    const leave = () => {
      setLeaving(true);
      finishIntro();
    };
    const gone = () => setVisible(false);

    let stop = null;
    if (!quick) {
      stop = play(canvasRef.current, counterRef.current, () => timers.push(setTimeout(leave, FADE_LAG * 1000)), gone);
    }
    if (!stop) timers.push(setTimeout(leave, 0), setTimeout(gone, 350));

    return () => {
      timers.forEach(clearTimeout);
      stop?.();
      document.documentElement.style.overflow = "";
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[2000] bg-[#0e0e0e] text-[#f8f7f4] transition-opacity duration-[900ms] ease-out"
      style={{ opacity: leaving ? 0 : 1 }}
    >
      {/* A faint pool of light where the mark will form */}
      <div className="absolute left-1/2 top-1/2 size-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.07),transparent_65%)]" />
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Corners, in the site's mono caption voice */}
      <p className="absolute bottom-6 left-6 md:bottom-10 md:left-12 font-mono text-xs text-[#f8f7f4]/55">
        FIG 00. — LOADING
      </p>
      <p
        ref={counterRef}
        className="absolute bottom-6 right-6 md:bottom-10 md:right-12 font-mono text-xs tabular-nums text-[#f8f7f4]/55"
      >
        000
      </p>
    </div>
  );
}
