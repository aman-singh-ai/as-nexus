"use client";

import { useEffect, useRef, useState } from "react";

/** A single exhaust particle. */
interface SmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number; // 1.0 → 0
  size: number;
  baseSize: number;
}

/** A burst particle for clicks. */
interface ClickBurst {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

export default function RocketCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const mouse = useRef({ x: -200, y: -200 });
  const pos = useRef({ x: -250, y: -250, angle: 0 });
  const smoke = useRef<SmokeParticle[]>([]);
  const bursts = useRef<ClickBurst[]>([]);
  const lastTime = useRef(0);
  const spawnTimer = useRef(0);

  /* ── Detect Touch ── */
  useEffect(() => {
    const check = () => setIsMobile(!window.matchMedia("(pointer: fine)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── Interaction Check ── */
  useEffect(() => {
    if (isMobile) return;
    const updateHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const clickable = target.closest('a, button, input, textarea, [role="button"], .clickable') || 
                        window.getComputedStyle(target).cursor === 'pointer';
      setIsHovering(!!clickable);
    };
    const onClick = (e: MouseEvent) => {
      const colors = ['#22D3EE', '#3B82F6', '#8B5CF6'];
      for (let i = 0; i < 12; i++) {
        const ang = Math.random() * Math.PI * 2;
        const spd = 2.5 + Math.random() * 4;
        bursts.current.push({
          x: e.clientX, y: e.clientY,
          vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd,
          life: 1.0, color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };
    window.addEventListener("mouseover", updateHover);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("mouseover", updateHover);
      window.removeEventListener("mousedown", onClick);
    };
  }, [isMobile]);

  /* ── Body Class (Custom Cursor) ── */
  useEffect(() => {
    if (isHovering) document.body.classList.remove('custom-cursor-active');
    else document.body.classList.add('custom-cursor-active');
  }, [isHovering]);

  /* ── Main Animation Loop ── */
  useEffect(() => {
    if (isMobile) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (pos.current.x === -250) pos.current = { x: e.clientX, y: e.clientY, angle: 0 };
    };
    window.addEventListener("mousemove", onMove);

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    let raf: number;
    const loop = (timestamp: number) => {
      if (!lastTime.current) lastTime.current = timestamp;
      const dt = Math.min((timestamp - lastTime.current) / 16.67, 2.0); // normalize to ~60fps
      lastTime.current = timestamp;

      const tx = mouse.current.x;
      const ty = mouse.current.y;

      // 1. Position Interpolation (Follow Cursor)
      const dx = tx - pos.current.x;
      const dy = ty - pos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const ease = 0.28;
      pos.current.x += dx * ease * dt;
      pos.current.y += dy * ease * dt;

      // 2. Rotation Matrix
      // 'angle' is relative to right (as used by cos/sin math below)
      let movementAngle = Math.atan2(dy, dx);
      if (dist > 1.2) {
        let delta = movementAngle - pos.current.angle;
        while (delta < -Math.PI) delta += Math.PI * 2;
        while (delta > Math.PI) delta -= Math.PI * 2;
        pos.current.angle += delta * 0.2 * dt;
      }

      // Update DOM (SVG nose points UP, so add PI/2)
      if (rocketRef.current) {
        rocketRef.current.style.transform = `translate3d(${pos.current.x}px,${pos.current.y}px,0) rotate(${pos.current.angle + Math.PI / 2}rad) scale(${isHovering ? 0 : 1.1})`;
        rocketRef.current.style.opacity = isHovering ? "0" : "1";
      }

      // 3. Smoke Emission (Anchor to Tail)
      spawnTimer.current += dt;
      if (!isHovering && dist > 1.5 && spawnTimer.current > 1.25) {
        spawnTimer.current = 0;
        
        // Equation Logic: Anchor to Tail
        const offset = 14; 
        const tailX = pos.current.x - Math.cos(pos.current.angle) * offset;
        const tailY = pos.current.y - Math.sin(pos.current.angle) * offset;

        // Velocity Logic: Move Opposite Rocket
        const speed = 1.0 + Math.random() * 2;
        const spread = (Math.random() - 0.5) * 0.35;
        const vx = -Math.cos(pos.current.angle + spread) * speed;
        const vy = -Math.sin(pos.current.angle + spread) * speed;

        smoke.current.push({
          x: tailX,
          y: tailY,
          vx,
          vy,
          life: 1.0,
          baseSize: 1.5 + Math.random() * 2.5,
          size: 0
        });
        if (smoke.current.length > 30) smoke.current.shift();
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 4. Render & Animate Smoke (Smooth Physics)
      for (let i = smoke.current.length - 1; i >= 0; i--) {
        const s = smoke.current[i];
        s.life -= 0.035 * dt;
        if (s.life <= 0) { smoke.current.splice(i, 1); continue; }

        // Position Updates
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.vx *= 0.96; // slight air resistance
        s.vy *= 0.96;

        // Visual Polish: Small -> Bigger -> Fade
        // peak size mid-life
        const scale = s.life > 0.8 ? (1 - s.life) * 5 : s.life * 1.25;
        s.size = s.baseSize * scale;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${Math.min(s.life * 0.7, 0.6)})`;
        ctx.shadowColor = "rgba(34, 211, 238, 0.45)";
        ctx.shadowBlur = 8 * s.life;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      // 5. Render Clicks
      for (let i = bursts.current.length - 1; i >= 0; i--) {
        const b = bursts.current[i];
        b.x += b.vx * dt; b.y += b.vy * dt;
        b.vx *= 0.94; b.vy *= 0.94; b.life -= 0.02 * dt;
        if (b.life <= 0) { bursts.current.splice(i, 1); continue; }
        ctx.beginPath(); ctx.arc(b.x, b.y, 2 * b.life, 0, Math.PI * 2);
        ctx.fillStyle = b.color; ctx.globalAlpha = b.life; ctx.fill(); ctx.globalAlpha = 1.0;
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [isMobile, isHovering]);

  if (isMobile) return null;

  return (
    <>
      <style>{`
        body.custom-cursor-active { cursor: none !important; }
        body.custom-cursor-active * { cursor: none !important; }
        a, button, input, select, textarea, [role="button"], .clickable { cursor: pointer !important; }
        .rocket-shadow { filter: drop-shadow(0 0 10px rgba(34,211,238,0.75)); transition: transform 0.2s ease-out; }
      `}</style>
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[10000]" />
      <div
        ref={rocketRef}
        className="pointer-events-none fixed left-0 top-0 z-[10001]
                   flex h-8 w-8 -translate-x-1/2 -translate-y-1/2
                   items-center justify-center will-change-transform
                   transition-all duration-300 ease-out"
        style={{ transform: "translate3d(-250px,-250px,0)", opacity: 0 }}
      >
        <svg className="h-full w-full rocket-shadow" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 4C16 4 11 10 11 19C11 23 12.5 25 12.5 25L16 22L19.5 25C19.5 25 21 23 21 19C21 10 16 4 16 4Z" fill="url(#rg)" stroke="#22D3EE" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M11 19L7 26H12.5" stroke="#22D3EE" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M21 19L25 26H19.5" stroke="#22D3EE" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="16" cy="13" r="1.5" fill="#22D3EE" />
          <defs>
            <linearGradient id="rg" x1="16" y1="4" x2="16" y2="25" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0F172A" />
              <stop offset="1" stopColor="#22D3EE" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
