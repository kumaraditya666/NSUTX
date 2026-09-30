"use client";

import * as React from "react";

const NODES = ["SOCIETIES", "EVENTS", "OPPORTUNITIES", "STUDENTS", "MEMORIES"] as const;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

// NSUTX Core — lightweight 2D canvas (no Three.js in this project).
// Central core node orbited by five system nodes, drifting particles,
// cursor parallax. Static single frame when reduced-motion is preferred.
export function HeroVisual(): React.JSX.Element {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const mouse = React.useRef({ x: 0.5, y: 0.5 });

  React.useEffect(() => {
    const canvasEl = canvasRef.current;
    const wrapEl = wrapRef.current;
    if (canvasEl === null || wrapEl === null) return;
    const canvas: HTMLCanvasElement = canvasEl;
    const wrap: HTMLDivElement = wrapEl;
    const rawCtx = canvas.getContext("2d");
    if (rawCtx === null) return;
    const ctx: CanvasRenderingContext2D = rawCtx;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 640px)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let w = 0;
    let h = 0;

    const particles: Particle[] = [];
    const count = mobile ? 18 : 42;
    for (let i = 0; i < count; i += 1) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0006,
        vy: (Math.random() - 0.5) * 0.0006,
        r: 0.8 + Math.random() * 1.6,
      });
    }

    function resize(): void {
      const rect = wrap.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    function onMove(e: PointerEvent): void {
      const rect = wrap.getBoundingClientRect();
      mouse.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    }
    wrap.addEventListener("pointermove", onMove);

    const accent = getComputedStyle(document.documentElement).getPropertyValue("--nsut-accent").trim() || "#7aa2ff";
    const fg = getComputedStyle(document.documentElement).getPropertyValue("--foreground").trim() || "#fff";

    function draw(t: number): void {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2 + (mouse.current.x - 0.5) * 14;
      const cy = h / 2 + (mouse.current.y - 0.5) * 10;
      const R = Math.min(w, h) * 0.33;

      // orbit rings
      ctx.strokeStyle = "rgba(140,150,180,0.16)";
      ctx.lineWidth = 1;
      for (const rr of [R * 0.55, R, R * 1.35]) {
        ctx.beginPath();
        ctx.arc(cx, cy, rr, 0, Math.PI * 2);
        ctx.stroke();
      }

      // satellite nodes
      ctx.font = "600 9px ui-sans-serif, system-ui";
      ctx.textAlign = "center";
      NODES.forEach((label, i) => {
        const a = (t / 24000) * Math.PI * 2 + (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(a) * R;
        const y = cy + Math.sin(a) * R * 0.72;
        ctx.strokeStyle = "rgba(140,150,180,0.35)";
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(150,160,190,0.85)";
        ctx.fillText(label, x, y + 14);
      });

      // particles
      ctx.fillStyle = "rgba(140,160,220,0.5)";
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // core
      const pulse = 1 + Math.sin(t / 900) * 0.06;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 26 * pulse);
      grad.addColorStop(0, accent);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 26 * pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = fg;
      ctx.font = "700 11px ui-sans-serif, system-ui";
      ctx.fillText("NSUTX", cx, cy + 4);
    }

    function frame(t: number): void {
      for (const p of particles) {
        p.x = (p.x + p.vx + 1) % 1;
        p.y = (p.y + p.vy + 1) % 1;
      }
      draw(t);
      raf = requestAnimationFrame(frame);
    }

    if (reduced) {
      draw(0);
    } else {
      raf = requestAnimationFrame(frame);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      wrap.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={wrapRef} className="nsut-grid relative mx-auto h-64 max-w-3xl overflow-hidden rounded-2xl border sm:h-80" style={{ borderColor: "var(--hairline)" }}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <p className="sr-only">NSUTX Core connected to societies, events, opportunities, students and memories.</p>
    </div>
  );
}
