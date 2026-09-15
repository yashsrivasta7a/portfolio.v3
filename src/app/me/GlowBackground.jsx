"use client";

import { useEffect, useRef } from "react";

/**
 * The animated background, drawn in WebGL.
 *
 * Adapted from the Originkit "Predictive Arc" component. Three changes were
 * needed to make it a page background rather than a block in a layout:
 *
 *  - Ported from TSX. This project has no TypeScript — no `tsconfig`, no
 *    `@types/react`, not one `.ts` file — so a single `.tsx` would have meant
 *    adding those dependencies and letting Next generate a config, changing
 *    the whole build for one background. The annotations are stripped; the
 *    logic is untouched.
 *  - The wrapper was `position: relative` with `minWidth: 1200` and
 *    `minHeight: 800`. As a full-bleed layer those minimums force horizontal
 *    overflow on anything narrower than 1200px, so it is fixed and inset now.
 *  - It only mounts when the Glow switch is on. A `requestAnimationFrame` loop
 *    and a live WebGL context are not things to leave running for a background
 *    nobody asked for.
 */

const MAX_DPR = 2;

const VERT_SRC = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG_SRC = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2  uRes;
uniform float uTime, uDpr, uCell, uDot;
uniform float uPeak, uHeight, uThick, uFall;
uniform vec3  uBg, uBase, uAccent, uHigh;
uniform vec2  uMouse;
uniform float uMouseRadius, uMouseStrength;

void main(){
  float cs = max(uCell, 2.0);
  vec2 ci = floor(gl_FragCoord.xy / cs);
  vec2 cc = (ci + 0.5) * cs;

  float x = cc.x / uDpr;
  float y = (uRes.y - cc.y) / uDpr;
  float w = uRes.x / uDpr;
  float h = uRes.y / uDpr;

  float normX = (x - w * 0.5) / (w * 0.75);
  float curveY = h * uPeak + normX * normX * (h * uHeight);

  float mdx = x - uMouse.x;
  float influence = uMouseStrength * exp(-(mdx * mdx) / (2.0 * uMouseRadius * uMouseRadius + 1.0));
  curveY = mix(curveY, uMouse.y, influence);

  float dist = abs(y - curveY);
  float th = (140.0 + (1.0 - abs(normX)) * 80.0) * uThick;

  vec3 col = uBg;
  if (dist < th) {
    float i = 1.0 - dist / th;
    float waveX = sin(x * 0.015 + uTime);
    float waveY = cos(y * 0.02 + uTime);
    i = i * 0.7 + waveX * waveY * 0.3 * i;
    i *= max(0.0, 1.0 - pow(abs(normX), uFall));

    if (i > 0.02) {
      float side = uDot * i * uDpr;
      vec2 d = abs(gl_FragCoord.xy - cc);
      float cov = 1.0 - smoothstep(side * 0.5 - 1.0, side * 0.5 + 1.0, max(d.x, d.y));

      vec3 ink = mix(uBase, uAccent, clamp(pow(i, 1.1), 0.0, 1.0));
      ink = mix(ink, uHigh, smoothstep(0.72, 1.0, i));
      col = mix(uBg, ink, cov * clamp(i * 1.6, 0.0, 1.0));
    }
  }
  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl, type, src) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error("GlowBackground shader:", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

function parseColor(input, fb) {
  if (!input) return fb;
  const str = String(input).trim();
  if (str.charAt(0) === "#") {
    let hex = str.slice(1);
    if (hex.length === 3 || hex.length === 4) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length >= 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      if (!isNaN(r) && !isNaN(g) && !isNaN(b)) return [r / 255, g / 255, b / 255];
    }
    return fb;
  }
  const m = str.match(/[\d.]+/g);
  if (m && m.length >= 3) {
    return [
      Math.min(255, parseFloat(m[0])) / 255,
      Math.min(255, parseFloat(m[1])) / 255,
      Math.min(255, parseFloat(m[2])) / 255,
    ];
  }
  return fb;
}

const num = (v, fb) => (typeof v === "number" && isFinite(v) ? v : fb);
const clampN = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);

/* Tuned to sit under the page rather than compete with it: greys, not colour,
   and a low dot size so it reads as texture instead of pattern. */
const PRESET = {
  background: "#000000",
  baseColor: "#444343",
  accentColor: "#2F2F2F",
  highlight: "#585858",
  density: 116,
  dotSize: 20,
  speed: 100,
  arch: { peak: 100, archHeight: 0, thickness: 206, falloff: 600 },
  pointer: { enabled: true, radius: 236, strength: 34 },
};

export default function GlowBackground() {
  const canvasRef = useRef(null);
  const pointerStateRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: 0, targetActive: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // A continuously animating canvas is exactly what this setting is for.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gl = canvas.getContext("webgl", { alpha: false, antialias: false, depth: false });
    if (!gl) {
      console.error("GlowBackground: WebGL unavailable");
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT_SRC);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("GlowBackground link:", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const locs = {};
    const u = (name) => {
      if (!(name in locs)) locs[name] = gl.getUniformLocation(prog, name);
      return locs[name];
    };

    const v = {
      density: Math.round(clampN(num(PRESET.density, 160), 40, 320)),
      dotSize: clampN(num(PRESET.dotSize, 100), 20, 400) / 100,
      speed: clampN(num(PRESET.speed, 50), 0, 100) / 50,
      peak: clampN(num(PRESET.arch.peak, 35), 0, 100) / 100,
      archHeight: clampN(num(PRESET.arch.archHeight, 70), 0, 300) / 100,
      thickness: clampN(num(PRESET.arch.thickness, 100), 20, 400) / 100,
      falloff: clampN(num(PRESET.arch.falloff, 250), 50, 600) / 100,
      pointerRadius: clampN(num(PRESET.pointer.radius, 220), 40, 600),
      pointerStrength: clampN(num(PRESET.pointer.strength, 60), 0, 100) / 100,
    };

    const cg = parseColor(PRESET.background, [0.012, 0.012, 0.012]);
    const cb = parseColor(PRESET.baseColor, [0.169, 0.055, 0.369]);
    const ca = parseColor(PRESET.accentColor, [0.627, 0.314, 1.0]);
    const chh = parseColor(PRESET.highlight, [1, 1, 1]);

    // The canvas is fixed and full-bleed, so the pointer is in viewport
    // coordinates — no `getBoundingClientRect` needed on every move.
    const onPointerMove = (e) => {
      const ps = pointerStateRef.current;
      ps.targetX = e.clientX;
      ps.targetY = window.innerHeight - e.clientY;
      ps.targetActive = 1;
    };
    const onPointerLeave = () => {
      pointerStateRef.current.targetActive = 0;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    let raf = 0;
    let last = performance.now();
    let clock = 0;

    const render = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      clock = (clock + dt * 0.9 * v.speed) % 6283;

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const cw = canvas.clientWidth || window.innerWidth;
      const ch = canvas.clientHeight || window.innerHeight;
      const bw = Math.max(1, Math.round(cw * dpr));
      const bh = Math.max(1, Math.round(ch * dpr));
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
      }
      gl.viewport(0, 0, bw, bh);

      const pitchCss = Math.min(bw, bh) / dpr / v.density;

      const ps = pointerStateRef.current;
      const posLerp = Math.min(1, dt * 12);
      const activeLerp = Math.min(1, dt * 6);
      ps.x += (ps.targetX - ps.x) * posLerp;
      ps.y += (ps.targetY - ps.y) * posLerp;
      ps.active += (ps.targetActive - ps.active) * activeLerp;

      gl.uniform2f(u("uRes"), bw, bh);
      gl.uniform1f(u("uTime"), clock);
      gl.uniform1f(u("uDpr"), dpr);
      gl.uniform1f(u("uCell"), Math.max(2, pitchCss * dpr));
      gl.uniform1f(u("uDot"), pitchCss * 1.2 * v.dotSize);
      gl.uniform1f(u("uPeak"), v.peak);
      gl.uniform1f(u("uHeight"), v.archHeight);
      gl.uniform1f(u("uThick"), v.thickness);
      gl.uniform1f(u("uFall"), v.falloff);
      gl.uniform2f(u("uMouse"), ps.x, ps.y);
      gl.uniform1f(u("uMouseRadius"), v.pointerRadius);
      gl.uniform1f(u("uMouseStrength"), v.pointerStrength * ps.active);
      gl.uniform3f(u("uBg"), cg[0], cg[1], cg[2]);
      gl.uniform3f(u("uBase"), cb[0], cb[1], cb[2]);
      gl.uniform3f(u("uAccent"), ca[0], ca[1], ca[2]);
      gl.uniform3f(u("uHigh"), chh[0], chh[1], chh[2]);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      // Drop the GPU context rather than waiting for it to be collected —
      // browsers allow only a handful of live WebGL contexts per page.
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <canvas ref={canvasRef} className="me-glow" aria-hidden />;
}
