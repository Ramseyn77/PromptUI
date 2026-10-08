/**
 * @registry
 * name: Siri Wave
 * category: Shaders
 * style: Gradient
 * tags: featured, recent
 * description: Ondes sinusoïdales superposées dessinées sur canvas, amplitude qui respire en continu.
 * prompt: Create a canvas "Siri"-style voice wave: three overlapping sine curves (teal, violet, pink) with additive blending, amplitude modulated by an envelope so the edges taper, animated with requestAnimationFrame; DPR-aware resize via ResizeObserver, paused off screen with IntersectionObserver, single static frame with prefers-reduced-motion, cleaned up on unmount.
 */
'use client';
import { useEffect, useRef } from 'react';

const waves = [
  { color: '45, 212, 191', speed: 1.4, frequency: 2.2, amplitude: 0.9 },
  { color: '139, 92, 246', speed: 1.1, frequency: 3.1, amplitude: 0.7 },
  { color: '236, 72, 153', speed: 1.8, frequency: 1.6, amplitude: 0.55 },
];

export function SiriWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
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
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = 'lighter';
      const breath = 0.6 + Math.sin(frame * 0.02) * 0.4;
      for (const wave of waves) {
        context.beginPath();
        for (let x = 0; x <= width; x += 2) {
          const t = x / width;
          const envelope = Math.sin(Math.PI * t) ** 2;
          const y = height / 2 + Math.sin(t * Math.PI * 2 * wave.frequency + frame * 0.04 * wave.speed) * envelope * wave.amplitude * breath * (height * 0.35);
          if (x === 0) context.moveTo(x, y); else context.lineTo(x, y);
        }
        context.lineTo(width, height / 2);
        context.lineTo(0, height / 2);
        context.fillStyle = `rgba(${wave.color}, .35)`;
        context.fill();
      }
      frame += 1;
      if (!still && visible) raf = requestAnimationFrame(draw);
    };
    draw();

    // Pause the loop while the canvas is off screen.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !still) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);

    return () => { cancelAnimationFrame(raf); observer.disconnect(); io.disconnect(); };
  }, []);

  return (
    <div className="h-48 w-full max-w-xl overflow-hidden rounded-3xl bg-zinc-950 dark:bg-black">
      <canvas ref={canvasRef} role="img" aria-label="Animated voice wave" className="h-full w-full" />
    </div>
  );
}
