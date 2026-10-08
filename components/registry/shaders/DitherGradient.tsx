/**
 * @registry
 * name: Dither Gradient
 * category: Shaders
 * style: Dark
 * tags: featured, recent
 * description: Dégradé animé rendu en tramage ordonné (Bayer 4x4) sur canvas, look pixel rétro.
 * prompt: Create a canvas ordered-dither shader: compute a moving radial + wave gradient value per low-res cell, threshold it against a 4x4 Bayer matrix, and draw lit cells as pixels in currentColor on a transparent background (so it adapts to light/dark). ~6px cells, DPR-aware, paused off screen, static with reduced motion.
 */
'use client';
import { useEffect, useRef } from 'react';

const bayer = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((value) => (value + 0.5) / 16);
const cell = 6;

export function DitherGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let time = 0;
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
      const cols = Math.ceil(width / cell);
      const rows = Math.ceil(height / cell);
      context.clearRect(0, 0, width, height);
      context.fillStyle = getComputedStyle(canvas).color;
      const cx = 0.5 + Math.cos(time * 0.6) * 0.25;
      const cy = 0.5 + Math.sin(time * 0.8) * 0.2;
      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
          const u = x / cols;
          const v = y / rows;
          const glow = 1 - Math.hypot(u - cx, (v - cy) * 0.7) * 1.8;
          const wave = Math.sin(u * 9 + time * 1.5) * 0.12;
          const value = glow + wave;
          if (value > bayer[(y % 4) * 4 + (x % 4)]) context.fillRect(x * cell, y * cell, cell - 1, cell - 1);
        }
      }
      time += 0.016;
      if (!still && visible) raf = requestAnimationFrame(draw);
    };
    draw();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !still) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);

    return () => { cancelAnimationFrame(raf); observer.disconnect(); io.disconnect(); };
  }, []);

  return (
    <div className="h-64 w-full max-w-xl overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-950">
      <canvas ref={canvasRef} role="img" aria-label="Dithered animated gradient" className="h-full w-full text-violet-600 dark:text-lime-300" />
    </div>
  );
}
