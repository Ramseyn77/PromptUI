/**
 * @registry
 * name: Snowfall Canvas
 * category: Shaders
 * style: Minimal
 * tags: recent
 * description: Chute de neige sur canvas à trois couches de profondeur (taille, vitesse, flou), vent réglable par le pointeur et intensité ajustable.
 * prompt: Create a snowfall canvas over a winter gradient: ~250 flakes in three depth layers (near flakes bigger, faster, slightly blurred via lower alpha), each swaying with a sine drift; horizontal pointer position sets the wind; an intensity slider (Light, Steady, Blizzard) changes the active flake count; flakes wrap around edges; DPR-aware, paused off screen, single static frame with reduced motion; a headline overlay. Light (dawn sky) and dark (night sky).
 */
'use client';
import { useEffect, useRef, useState } from 'react';

const levels = [['Light', 80], ['Steady', 160], ['Blizzard', 260]] as const;

export function SnowfallCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [level, setLevel] = useState(1);
  const countRef = useRef(160);

  useEffect(() => { countRef.current = levels[level][1]; }, [level]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let wind = 0;
    let targetWind = 0;
    let raf = 0;
    let visible = true;
    let time = 0;
    let flakes: { x: number; y: number; depth: number; phase: number }[] = [];

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * ratio;
      canvas.height = canvas.clientHeight * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      flakes = Array.from({ length: 260 }, (_, index) => ({ x: Math.random() * canvas.clientWidth, y: Math.random() * canvas.clientHeight, depth: (index % 3) + 1, phase: Math.random() * Math.PI * 2 }));
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      wind += (targetWind - wind) * 0.03;
      context.clearRect(0, 0, width, height);
      for (let index = 0; index < countRef.current; index += 1) {
        const flake = flakes[index];
        flake.y += 0.3 + flake.depth * 0.45;
        flake.x += Math.sin(time + flake.phase) * 0.3 + wind * flake.depth;
        if (flake.y > height + 5) { flake.y = -5; flake.x = Math.random() * width; }
        if (flake.x > width + 5) flake.x = -5;
        if (flake.x < -5) flake.x = width + 5;
        context.globalAlpha = 0.35 + flake.depth * 0.2;
        context.fillStyle = '#ffffff';
        context.beginPath(); context.arc(flake.x, flake.y, flake.depth * 1.1, 0, Math.PI * 2); context.fill();
      }
      context.globalAlpha = 1;
      time += 0.02;
      if (!still && visible) raf = requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(() => { resize(); if (still || !visible) draw(); });
    observer.observe(canvas);
    resize();
    draw();
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; cancelAnimationFrame(raf); if (visible && !still) raf = requestAnimationFrame(draw); });
    io.observe(canvas);
    const move = (event: PointerEvent) => { const rect = canvas.getBoundingClientRect(); targetWind = ((event.clientX - rect.left) / rect.width - 0.5) * 2; };
    const leave = () => { targetWind = 0; };
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerleave', leave);
    return () => { cancelAnimationFrame(raf); observer.disconnect(); io.disconnect(); canvas.removeEventListener('pointermove', move); canvas.removeEventListener('pointerleave', leave); };
  }, []);

  return (
    <div className="relative h-72 w-full max-w-xl overflow-hidden rounded-3xl bg-gradient-to-b from-sky-400 via-sky-300 to-rose-200 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-800">
      <canvas ref={canvasRef} role="img" aria-label="Falling snow" className="absolute inset-0 size-full" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-10 bg-white/90 [border-radius:50%_50%_0_0/100%_100%_0_0] dark:bg-slate-200/90" />
      <div className="relative flex h-full flex-col items-center justify-center gap-4 text-center">
        <p className="text-4xl font-semibold tracking-tight text-white drop-shadow">Winter sale</p>
        <div role="radiogroup" aria-label="Snow intensity" className="flex rounded-full bg-white/25 p-1 text-xs backdrop-blur">{levels.map(([label], index) => <button key={label} type="button" role="radio" aria-checked={level === index} onClick={() => setLevel(index)} className={`rounded-full px-3 py-1 font-medium ${level === index ? 'bg-white text-slate-900' : 'text-white'}`}>{label}</button>)}</div>
      </div>
    </div>
  );
}
