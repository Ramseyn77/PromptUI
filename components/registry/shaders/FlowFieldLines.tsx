/**
 * @registry
 * name: Flow Field Lines
 * category: Shaders
 * style: Minimal
 * tags: recent
 * description: Champ de flux génératif : des centaines de particules tracent des lignes fines en suivant un champ d'angles ondulant, effet encre.
 * prompt: Create a generative flow field canvas: 600 particles move along a vector field whose angle is a smooth function of position and slowly changing time (layered sin/cos, no noise library), drawing thin translucent strokes that accumulate like ink; the canvas fades slightly each frame; the ink color reads the element's currentColor for light/dark; a Reset button clears and reseeds; DPR-aware, paused off screen, one static frame of 200 steps with reduced motion.
 */
'use client';
import { RotateCcw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function FlowFieldLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let visible = true;
    let time = 0;
    let particles: { x: number; y: number; px: number; py: number }[] = [];

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * ratio;
      canvas.height = canvas.clientHeight * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = Array.from({ length: 600 }, () => { const x = Math.random() * canvas.clientWidth; const y = Math.random() * canvas.clientHeight; return { x, y, px: x, py: y }; });
    };

    const step = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const style = getComputedStyle(canvas);
      context.fillStyle = style.backgroundColor;
      context.globalAlpha = 0.04;
      context.fillRect(0, 0, width, height);
      context.globalAlpha = 0.35;
      context.strokeStyle = style.color;
      context.lineWidth = 0.7;
      context.beginPath();
      for (const p of particles) {
        const angle = Math.sin(p.x * 0.008 + time) * 1.6 + Math.cos(p.y * 0.011 - time * 0.7) * 1.4 + Math.sin((p.x + p.y) * 0.004) * 2;
        p.px = p.x; p.py = p.y;
        p.x += Math.cos(angle) * 1.2;
        p.y += Math.sin(angle) * 1.2;
        if (p.x < 0 || p.x > width || p.y < 0 || p.y > height) { p.x = Math.random() * width; p.y = Math.random() * height; p.px = p.x; p.py = p.y; continue; }
        context.moveTo(p.px, p.py);
        context.lineTo(p.x, p.y);
      }
      context.stroke();
      context.globalAlpha = 1;
      time += 0.003;
    };

    const loop = () => { step(); if (!still && visible) raf = requestAnimationFrame(loop); };
    resize();
    if (still) { for (let index = 0; index < 200; index += 1) step(); } else loop();
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; cancelAnimationFrame(raf); if (visible && !still) raf = requestAnimationFrame(loop); });
    io.observe(canvas);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [seed]);

  return (
    <div className="relative h-72 w-full max-w-xl overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800">
      <canvas ref={canvasRef} role="img" aria-label="Ink-like flow field lines" className="size-full bg-[#f8f6f1] text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100" />
      <button type="button" onClick={() => setSeed(seed + 1)} className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-zinc-800 shadow backdrop-blur dark:bg-zinc-900/80 dark:text-zinc-200"><RotateCcw aria-hidden className="size-3.5" />Reset</button>
    </div>
  );
}
