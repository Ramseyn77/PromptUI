/**
 * @registry
 * name: Kaleidoscope Canvas
 * category: Shaders
 * style: Gradient
 * tags: featured, recent
 * description: Kaléidoscope génératif sur canvas : formes colorées reflétées en 6, 8 ou 12 segments qui tournent lentement, suivent le pointeur et changent de palette.
 * prompt: Create a kaleidoscope canvas: a set of drifting colored shapes (circles and triangles) drawn into one wedge and mirrored/rotated into N symmetric segments around the center with globalCompositeOperation 'lighter'; segment count selectable (6, 8, 12) via a radiogroup; the whole pattern rotates slowly and the shapes drift toward the pointer position; DPR-aware, paused off screen, single static frame with reduced motion. Looks the same in light and dark (dark backdrop).
 */
'use client';
import { useEffect, useRef, useState } from 'react';

const shapes = Array.from({ length: 14 }, (_, index) => ({ r: 20 + ((index * 37) % 120), a: (index * 0.7) % 1, size: 6 + ((index * 13) % 22), hue: (index * 47) % 360, tri: index % 3 === 0, speed: 0.2 + (index % 5) * 0.08 }));

export function KaleidoscopeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [segments, setSegments] = useState(8);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: 0, y: 0 };
    let raf = 0;
    let visible = true;
    let time = 0;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * ratio;
      canvas.height = canvas.clientHeight * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      context.globalCompositeOperation = 'source-over';
      context.fillStyle = 'rgba(9, 9, 11, 0.22)';
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = 'lighter';
      const wedge = (Math.PI * 2) / segments;
      for (let s = 0; s < segments; s += 1) {
        context.save();
        context.translate(width / 2, height / 2);
        context.rotate(s * wedge + time * 0.05);
        if (s % 2) context.scale(1, -1);
        for (const shape of shapes) {
          const angle = (shape.a + time * shape.speed * 0.02) % 1 * wedge;
          const radius = shape.r + Math.sin(time * shape.speed) * 12 + pointer.x * 0.05;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius + pointer.y * 0.03;
          context.fillStyle = `hsla(${(shape.hue + time * 8) % 360}, 90%, 60%, 0.55)`;
          context.beginPath();
          if (shape.tri) { context.moveTo(x, y - shape.size); context.lineTo(x + shape.size, y + shape.size); context.lineTo(x - shape.size, y + shape.size); context.closePath(); }
          else context.arc(x, y, shape.size * 0.6, 0, Math.PI * 2);
          context.fill();
        }
        context.restore();
      }
      time += 0.03;
      if (!still && visible) raf = requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(() => { resize(); if (still || !visible) draw(); });
    observer.observe(canvas);
    resize();
    context.fillStyle = '#09090b';
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    draw();
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; cancelAnimationFrame(raf); if (visible && !still) raf = requestAnimationFrame(draw); });
    io.observe(canvas);
    const move = (event: PointerEvent) => { const rect = canvas.getBoundingClientRect(); pointer.x = event.clientX - rect.left - rect.width / 2; pointer.y = event.clientY - rect.top - rect.height / 2; };
    canvas.addEventListener('pointermove', move);
    return () => { cancelAnimationFrame(raf); observer.disconnect(); io.disconnect(); canvas.removeEventListener('pointermove', move); };
  }, [segments]);

  return (
    <div className="relative h-80 w-full max-w-xl overflow-hidden rounded-3xl bg-zinc-950">
      <canvas ref={canvasRef} role="img" aria-label={`Kaleidoscope with ${segments} mirrored segments`} className="size-full" />
      <div role="radiogroup" aria-label="Segments" className="absolute bottom-4 left-1/2 flex -translate-x-1/2 rounded-full bg-white/10 p-1 text-xs backdrop-blur">{[6, 8, 12].map((value) => <button key={value} type="button" role="radio" aria-checked={segments === value} onClick={() => setSegments(value)} className={`rounded-full px-3 py-1 font-semibold ${segments === value ? 'bg-white text-zinc-950' : 'text-white/80'}`}>{value}</button>)}</div>
    </div>
  );
}
