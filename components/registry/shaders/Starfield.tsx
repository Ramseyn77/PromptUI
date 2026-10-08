/**
 * @registry
 * name: Starfield
 * category: Shaders
 * style: Dark
 * tags: recent
 * description: Champ d'étoiles en vitesse lumière qui accélère au survol, sur canvas.
 * prompt: Create a canvas warp-speed starfield: 300 stars with 3D coordinates projected from the center, drawn as streaks whose length grows with speed; hovering the canvas speeds up warp with easing. Deep-space background in both themes; DPR-aware, paused off screen, static with reduced motion.
 */
'use client';
import { useEffect, useRef } from 'react';

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const stars = Array.from({ length: 300 }, () => ({ x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() }));
    let speed = 0.004;
    let target = 0.004;
    let raf = 0;
    let visible = true;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * ratio;
      canvas.height = canvas.clientHeight * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    // Resizing clears the canvas: redraw one frame if the loop is paused (off screen or reduced motion).
    const observer = new ResizeObserver(() => { resize(); if (still || !visible) draw(); });
    observer.observe(canvas);
    resize();

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      speed += (target - speed) * 0.05;
      context.fillStyle = 'rgba(3, 7, 18, .35)';
      context.fillRect(0, 0, width, height);
      for (const star of stars) {
        const previous = star.z;
        star.z -= speed;
        if (star.z <= 0.01) { star.x = Math.random() * 2 - 1; star.y = Math.random() * 2 - 1; star.z = 1; continue; }
        const scale = Math.min(width, height) * 0.5;
        const x = width / 2 + (star.x / star.z) * scale;
        const y = height / 2 + (star.y / star.z) * scale;
        const px = width / 2 + (star.x / previous) * scale;
        const py = height / 2 + (star.y / previous) * scale;
        context.strokeStyle = `rgba(203, 213, 255, ${1 - star.z})`;
        context.lineWidth = (1 - star.z) * 2;
        context.beginPath(); context.moveTo(px, py); context.lineTo(x, y); context.stroke();
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

    const fast = () => { target = 0.03; };
    const slow = () => { target = 0.004; };
    canvas.addEventListener('pointerenter', fast);
    canvas.addEventListener('pointerleave', slow);

    return () => { cancelAnimationFrame(raf); observer.disconnect(); io.disconnect(); canvas.removeEventListener('pointerenter', fast); canvas.removeEventListener('pointerleave', slow); };
  }, []);

  return (
    <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-3xl bg-[#030712]">
      <canvas ref={canvasRef} role="img" aria-label="Starfield, hover to warp" className="h-full w-full" />
      <p className="pointer-events-none absolute bottom-4 left-5 text-xs font-medium text-indigo-200/80">Hover to engage warp</p>
    </div>
  );
}
