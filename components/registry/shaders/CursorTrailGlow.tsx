/**
 * @registry
 * name: Cursor Trail Glow
 * category: Shaders
 * style: Dark
 * tags: recent
 * description: Traînée lumineuse qui suit le pointeur sur canvas : ruban de points qui s'estompe, couleur arc-en-ciel dans le temps et étincelles au clic.
 * prompt: Create a glowing cursor trail on a dark canvas: the last 40 pointer positions are kept and drawn as a tapering ribbon of circles with additive blending, hue cycling over time; when idle the trail eases out; clicking bursts 16 sparks that fly outward and fade; on touch devices dragging works the same; an idle demo path (lissajous) runs when the pointer is outside; DPR-aware, paused off screen, disabled with reduced motion (static hint text instead). Dark in both themes.
 */
'use client';
import { useEffect, useRef } from 'react';

export function CursorTrailGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const trail: { x: number; y: number }[] = [];
    let sparks: { x: number; y: number; vx: number; vy: number; life: number; hue: number }[] = [];
    let inside = false;
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
      if (!inside) trail.push({ x: width / 2 + Math.sin(time * 1.3) * width * 0.32, y: height / 2 + Math.sin(time * 2.1) * height * 0.28 });
      while (trail.length > 40) trail.shift();
      context.globalCompositeOperation = 'source-over';
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = 'lighter';
      trail.forEach((point, index) => {
        const t = index / trail.length;
        context.fillStyle = `hsla(${(time * 60 + index * 6) % 360}, 95%, 60%, ${(t * 0.5).toFixed(3)})`;
        context.beginPath(); context.arc(point.x, point.y, 2 + t * 14, 0, Math.PI * 2); context.fill();
      });
      sparks = sparks.filter((spark) => spark.life > 0);
      for (const spark of sparks) {
        spark.x += spark.vx; spark.y += spark.vy; spark.vy += 0.05; spark.life -= 0.02;
        context.fillStyle = `hsla(${spark.hue}, 100%, 65%, ${spark.life.toFixed(3)})`;
        context.beginPath(); context.arc(spark.x, spark.y, 2.5, 0, Math.PI * 2); context.fill();
      }
      time += 0.016;
      if (visible) raf = requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    raf = requestAnimationFrame(draw);
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; cancelAnimationFrame(raf); if (visible) raf = requestAnimationFrame(draw); });
    io.observe(canvas);
    const position = (event: PointerEvent) => { const rect = canvas.getBoundingClientRect(); return { x: event.clientX - rect.left, y: event.clientY - rect.top }; };
    const move = (event: PointerEvent) => { inside = true; trail.push(position(event)); };
    const leave = () => { inside = false; };
    const burst = (event: PointerEvent) => { const { x, y } = position(event); for (let index = 0; index < 16; index += 1) { const angle = (index / 16) * Math.PI * 2; sparks.push({ x, y, vx: Math.cos(angle) * 3, vy: Math.sin(angle) * 3 - 1, life: 1, hue: (time * 60 + index * 20) % 360 }); } };
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerleave', leave);
    canvas.addEventListener('pointerdown', burst);
    return () => { cancelAnimationFrame(raf); observer.disconnect(); io.disconnect(); canvas.removeEventListener('pointermove', move); canvas.removeEventListener('pointerleave', leave); canvas.removeEventListener('pointerdown', burst); };
  }, []);

  return (
    <div className="relative h-72 w-full max-w-xl overflow-hidden rounded-3xl bg-zinc-950">
      <canvas ref={canvasRef} role="img" aria-label="Glowing trail following the pointer" className="size-full touch-none" />
      <p className="pointer-events-none absolute left-5 top-4 text-sm font-medium text-white/70">Move and click <span className="hidden motion-reduce:inline">(animation off: reduced motion)</span></p>
    </div>
  );
}
