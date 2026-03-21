"use client";

import { useEffect, useRef, useState } from "react";

/*
 * Premium animated star-field with:
 *  • Small elegant particles drifting slowly upward
 *  • Subtle mouse-based parallax for depth
 *  • Soft central glow (cyan / blue)
 *  • Optimized via requestAnimationFrame
 *  • Disabled on mobile (falls back to CSS background)
 */

interface Star {
  x: number;      // 0-1 (normalised)
  y: number;      // 0-1
  size: number;
  speed: number;  // upward drift per frame
  opacity: number;
  layer: number;  // 1 | 2 | 3  — for parallax depth
}

const STAR_COUNT = 110;

function createStar(canvasW: number, canvasH: number, randomY = true): Star {
  const layer = Math.random() < 0.5 ? 1 : Math.random() < 0.7 ? 2 : 3;
  return {
    x: Math.random(),
    y: randomY ? Math.random() : 1 + Math.random() * 0.1,
    size: layer === 1 ? 0.6 + Math.random() * 0.4
        : layer === 2 ? 0.8 + Math.random() * 0.6
        : 1.2 + Math.random() * 0.8,
    speed: (0.015 + Math.random() * 0.025) / layer, // closer layers move faster
    opacity: 0.25 + Math.random() * 0.55,
    layer,
  };
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const mouseOffset = useRef({ x: 0, y: 0 }); // -1 to 1

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = 0, h = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create stars
    const stars: Star[] = [];
    for (let i = 0; i < STAR_COUNT; i++) stars.push(createStar(w, h));

    // Mouse parallax (soft)
    const onMove = (e: MouseEvent) => {
      mouseOffset.current.x = (e.clientX / w - 0.5) * 2; // -1 → 1
      mouseOffset.current.y = (e.clientY / h - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);

    let raf: number;
    let twinklePhase = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      twinklePhase += 0.003; // very slow oscillation

      // ─── soft central glow ───
      const grd = ctx.createRadialGradient(w / 2, h * 0.45, 0, w / 2, h * 0.45, w * 0.55);
      grd.addColorStop(0, "rgba(0, 229, 255, 0.04)");
      grd.addColorStop(0.35, "rgba(0, 148, 255, 0.025)");
      grd.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      // ─── stars ───
      const mx = mouseOffset.current.x;
      const my = mouseOffset.current.y;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // drift upward
        s.y -= s.speed * 0.001;

        // recycle star when it leaves the top
        if (s.y < -0.02) {
          stars[i] = createStar(w, h, false); // respawn at bottom
          continue;
        }

        // parallax offset based on layer depth
        const parallaxScale = s.layer === 1 ? 12 : s.layer === 2 ? 6 : 3;
        const px = s.x * w + mx * parallaxScale;
        const py = s.y * h + my * parallaxScale;

        // subtle twinkle
        const twinkle = 0.7 + 0.3 * Math.sin(twinklePhase * (3 + i % 5) + i);
        const alpha = s.opacity * twinkle;

        // draw star dot
        ctx.beginPath();
        ctx.arc(px, py, s.size, 0, Math.PI * 2);

        // color varies by layer: front = brighter cyan, back = softer blue
        if (s.layer === 1) {
          ctx.fillStyle = `rgba(200, 220, 255, ${alpha})`;
        } else if (s.layer === 2) {
          ctx.fillStyle = `rgba(140, 200, 255, ${alpha * 0.85})`;
        } else {
          ctx.fillStyle = `rgba(0, 200, 255, ${alpha * 0.6})`;
        }
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  /* On mobile, render the static CSS fallback */
  if (isMobile) {
    return (
      <>
        <div className="star-field" aria-hidden="true" />
        <div className="cosmic-glow" aria-hidden="true" />
      </>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
