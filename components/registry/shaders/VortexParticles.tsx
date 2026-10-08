/**
 * @registry
 * name: Vortex Particles
 * category: Shaders
 * style: Dark
 * tags: featured, recent
 * description: Tourbillon de particules colorées spiralant vers le centre avec traînées, accéléré au survol.
 * prompt: Create a canvas vortex background: ~400 particles orbit a center point on slowly decaying spiral paths with hue shifting by radius, drawn with motion trails (translucent clear each frame); they respawn at the edge when they reach the center; hovering speeds up the rotation; DPR-aware, paused off screen, single static frame with reduced motion; a centered title overlay. Dark in both themes.
 */
'use client';
import { useEffect, useRef } from 'react';

export function VortexParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let visible = true;
    let speed = 1;
    let target = 1;
    const spawn = (max: number) => ({ angle: Math.random() * Math.PI * 2, radius: max * (0.3 + Math.random() * 0.7), drift: 0.002 + Math.random() * 0.004, size: 0.6 + Math.random() * 1.6 });
    let particles: ReturnType<typeof spawn>[] = [];

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * ratio;
      canvas.height = canvas.clientHeight * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const max = Math.hypot(canvas.clientWidth, canvas.clientHeight) / 2;
      particles = Array.from({ length: 400 }, () => spawn(max));
      context.fillStyle = '#09090b';
      context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const max = Math.hypot(width, height) / 2;
      speed += (target - speed) * 0.05;
      context.fillStyle = still ? '#09090b' : 'rgba(9,9,11,0.18)';
      context.fillRect(0, 0, width, height);
      for (const p of particles) {
        p.angle += (0.004 + 1.2 / (p.radius + 40)) * speed;
        p.radius -= p.radius * p.drift * speed;
        if (p.radius < 6) Object.assign(p, spawn(max), { radius: max });
        const hue = 260 - (p.radius / max) * 120;
        context.fillStyle = `hsl(${hue} 90% 65%)`;
        context.beginPath();
        context.arc(width / 2 + Math.cos(p.angle) * p.radius, height / 2 + Math.sin(p.angle) * p.radius * 0.7, p.size, 0, Math.PI * 2);
        context.fill();
      }
      if (!still && visible) raf = requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(() => { resize(); if (still || !visible) draw(); });
    observer.observe(canvas);
    resize();
    draw();
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; cancelAnimationFrame(raf); if (visible && !still) raf = requestAnimationFrame(draw); });
    io.observe(canvas);
    const enter = () => { target = 3; };
    const leave = () => { target = 1; };
    canvas.addEventListener('pointerenter', enter);
    canvas.addEventListener('pointerleave', leave);
    return () => { cancelAnimationFrame(raf); observer.disconnect(); io.disconnect(); canvas.removeEventListener('pointerenter', enter); canvas.removeEventListener('pointerleave', leave); };
  }, []);

  return (
    <div className="relative h-72 w-full max-w-xl overflow-hidden rounded-3xl bg-zinc-950">
      <canvas ref={canvasRef} role="img" aria-label="Swirling vortex of colored particles" className="h-full w-full" />
      <div className="pointer-events-none absolute inset-0 grid place-items-center text-center"><p className="text-3xl font-bold tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">Into the vortex</p></div>
    </div>
  );
}
