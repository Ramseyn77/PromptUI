/**
 * @registry
 * name: Network Particles
 * category: Shaders
 * style: Dark
 * tags: featured, recent
 * description: Constellation de particules reliées par des lignes, qui fuient doucement le curseur.
 * prompt: Create a canvas network animation: ~60 drifting particles bouncing off edges, lines drawn between particles closer than 100px with opacity by distance, and particles gently pushed away from the pointer. Colors read from the canvas CSS color (currentColor) so it adapts to light/dark; DPR-aware, paused off screen, static with reduced motion.
 */
'use client';
import { useEffect, useRef } from 'react';

export function NetworkParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: -999, y: -999 };
    let raf = 0;
    let visible = true;
    let particles: Array<{ x: number; y: number; vx: number; vy: number }> = [];

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * ratio;
      canvas.height = canvas.clientHeight * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = Array.from({ length: 60 }, () => ({ x: Math.random() * canvas.clientWidth, y: Math.random() * canvas.clientHeight, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5 }));
    };
    // Resizing clears the canvas: redraw one frame if the loop is paused (off screen or reduced motion).
    const observer = new ResizeObserver(() => { resize(); if (still || !visible) draw(); });
    observer.observe(canvas);
    resize();

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const color = getComputedStyle(canvas).color;
      context.clearRect(0, 0, width, height);
      for (const p of particles) {
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 80) { p.vx += (dx / distance) * 0.05; p.vy += (dy / distance) * 0.05; }
        p.vx *= 0.99; p.vy *= 0.99;
        p.x += p.vx + (Math.random() - 0.5) * 0.05;
        p.y += p.vy + (Math.random() - 0.5) * 0.05;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }
      context.fillStyle = color;
      context.strokeStyle = color;
      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < 100) {
            context.globalAlpha = 1 - distance / 100;
            context.lineWidth = 0.6;
            context.beginPath(); context.moveTo(a.x, a.y); context.lineTo(b.x, b.y); context.stroke();
          }
        }
        context.globalAlpha = 1;
        context.beginPath(); context.arc(a.x, a.y, 1.8, 0, Math.PI * 2); context.fill();
      }
      if (!still && visible) raf = requestAnimationFrame(draw);
    };
    draw();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !still) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);

    const move = (event: PointerEvent) => { const rect = canvas.getBoundingClientRect(); pointer.x = ((event.clientX - rect.left) / rect.width) * canvas.clientWidth; pointer.y = ((event.clientY - rect.top) / rect.height) * canvas.clientHeight; };
    const leave = () => { pointer.x = -999; pointer.y = -999; };
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerleave', leave);

    return () => { cancelAnimationFrame(raf); observer.disconnect(); io.disconnect(); canvas.removeEventListener('pointermove', move); canvas.removeEventListener('pointerleave', leave); };
  }, []);

  return (
    <div className="h-64 w-full max-w-xl overflow-hidden rounded-3xl bg-zinc-50 dark:bg-zinc-950">
      <canvas ref={canvasRef} role="img" aria-label="Network of connected particles" className="h-full w-full text-teal-700 dark:text-teal-300" />
    </div>
  );
}
