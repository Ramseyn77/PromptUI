/**
 * @registry
 * name: Fireflies
 * category: Shaders
 * style: Dark
 * tags: featured, recent
 * description: Lucioles sur canvas qui dérivent, clignotent doucement et s'éloignent du curseur dans une forêt nocturne.
 * prompt: Create a canvas fireflies background: 60 glowing particles with soft radial glow drifting along smooth noise-like paths (sin/cos of time + seed), each pulsing brightness at its own rate, gently repelled by the pointer; silhouetted tree line at the bottom in CSS; DPR-aware, paused off screen, single static frame with reduced motion. Night palette in both themes.
 */
'use client';
import { useEffect, useRef } from 'react';

export function Fireflies() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const flies = Array.from({ length: 60 }, () => ({ x: Math.random(), y: Math.random() * 0.85, seed: Math.random() * 100, speed: 0.2 + Math.random() * 0.5, size: 1 + Math.random() * 1.8 }));
    const pointer = { x: -1, y: -1 };
    let raf = 0;
    let visible = true;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * ratio;
      canvas.height = canvas.clientHeight * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = (time = 0) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const t = time / 1000;
      context.clearRect(0, 0, width, height);
      for (const fly of flies) {
        let x = (fly.x + Math.sin(t * 0.3 * fly.speed + fly.seed) * 0.06) * width;
        let y = (fly.y + Math.cos(t * 0.4 * fly.speed + fly.seed * 1.3) * 0.05) * height;
        const dx = x - pointer.x;
        const dy = y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (pointer.x >= 0 && distance < 90) { x += (dx / distance) * (90 - distance) * 0.6; y += (dy / distance) * (90 - distance) * 0.6; }
        const glow = 0.35 + 0.65 * Math.max(0, Math.sin(t * 2 * fly.speed + fly.seed));
        const gradient = context.createRadialGradient(x, y, 0, x, y, fly.size * 8);
        gradient.addColorStop(0, `rgba(253, 230, 138, ${glow})`);
        gradient.addColorStop(1, 'rgba(253, 230, 138, 0)');
        context.fillStyle = gradient;
        context.beginPath(); context.arc(x, y, fly.size * 8, 0, Math.PI * 2); context.fill();
      }
      if (!still && visible) raf = requestAnimationFrame(draw);
    };

    // Resizing clears the canvas: redraw one frame if the loop is paused (off screen or reduced motion).
    const observer = new ResizeObserver(() => { resize(); if (still || !visible) draw(); });
    observer.observe(canvas);
    resize();
    draw();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !still) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);

    const move = (event: PointerEvent) => { const box = canvas.getBoundingClientRect(); pointer.x = ((event.clientX - box.left) / box.width) * canvas.clientWidth; pointer.y = ((event.clientY - box.top) / box.height) * canvas.clientHeight; };
    const leave = () => { pointer.x = -1; pointer.y = -1; };
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerleave', leave);

    return () => { cancelAnimationFrame(raf); observer.disconnect(); io.disconnect(); canvas.removeEventListener('pointermove', move); canvas.removeEventListener('pointerleave', leave); };
  }, []);

  return (
    <div className="relative h-72 w-full max-w-xl overflow-hidden rounded-3xl bg-gradient-to-b from-[#0b1026] via-[#111a33] to-[#0d2018]">
      <canvas ref={canvasRef} role="img" aria-label="Fireflies drifting over a night forest" className="absolute inset-0 h-full w-full" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-20 bg-[#050a07] [clip-path:polygon(0_60%,5%_30%,9%_55%,14%_15%,19%_50%,24%_25%,30%_55%,36%_10%,41%_50%,47%_30%,53%_60%,58%_20%,64%_50%,70%_15%,76%_45%,82%_25%,88%_55%,94%_20%,100%_45%,100%_100%,0_100%)]" />
      <p className="pointer-events-none absolute left-6 top-6 text-sm font-medium text-amber-100/80">Move your cursor through the swarm</p>
    </div>
  );
}
