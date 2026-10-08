/**
 * @registry
 * name: Globe Hero
 * category: Hero
 * style: Dark
 * tags: featured, recent
 * description: Hero avec globe en points qui tourne, villes lumineuses reliées par des arcs, et rotation au glisser.
 * prompt: Create a hero with a rotating dotted globe on canvas: ~1400 points on a Fibonacci sphere projected orthographically (back-facing dots dimmer), 6 glowing city markers connected by animated great-circle arcs; drag with pointer to spin (inertia), auto-rotates otherwise. Left column: badge, headline, text, two buttons; stacked on mobile, side by side from lg. DPR-aware, paused off screen, static frame with reduced motion. Night look in both themes.
 */
'use client';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

const cities: [number, number][] = [[48.8, 2.3], [40.7, -74], [6.5, 3.4], [35.7, 139.7], [-23.5, -46.6], [1.35, 103.8]];
const routes: [number, number][] = [[0, 1], [0, 2], [0, 3], [1, 4], [3, 5], [2, 5]];

export function GlobeHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const count = 1400;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const points = Array.from({ length: count }, (_, index) => {
      const y = 1 - (index / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = golden * index;
      return [Math.cos(theta) * radius, y, Math.sin(theta) * radius] as const;
    });
    const toVector = ([lat, lon]: [number, number]) => {
      const phi = (lat * Math.PI) / 180;
      const lambda = (lon * Math.PI) / 180;
      return [Math.cos(phi) * Math.sin(lambda), Math.sin(phi), Math.cos(phi) * Math.cos(lambda)] as const;
    };
    const markers = cities.map(toVector);
    let rotation = 0.6;
    let velocity = 0.003;
    let dragging = false;
    let lastX = 0;
    let raf = 0;
    let visible = true;
    let tick = 0;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * ratio;
      canvas.height = canvas.clientHeight * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const project = (vector: readonly [number, number, number], size: number) => {
      const cos = Math.cos(rotation);
      const sin = Math.sin(rotation);
      const x = vector[0] * cos + vector[2] * sin;
      const z = -vector[0] * sin + vector[2] * cos;
      const tilt = 0.35;
      const y = vector[1] * Math.cos(tilt) - z * Math.sin(tilt);
      const depth = vector[1] * Math.sin(tilt) + z * Math.cos(tilt);
      return { x: size / 2 + x * size * 0.46, y: size / 2 - y * size * 0.46, depth };
    };

    const draw = () => {
      const size = Math.min(canvas.clientWidth, canvas.clientHeight);
      context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      context.save();
      context.translate((canvas.clientWidth - size) / 2, (canvas.clientHeight - size) / 2);
      const glow = context.createRadialGradient(size / 2, size / 2, size * 0.3, size / 2, size / 2, size * 0.55);
      glow.addColorStop(0, 'rgba(45,212,191,.12)');
      glow.addColorStop(1, 'rgba(45,212,191,0)');
      context.fillStyle = glow;
      context.fillRect(0, 0, size, size);
      for (const point of points) {
        const p = project(point, size);
        context.fillStyle = p.depth > 0 ? `rgba(148,163,184,${0.35 + p.depth * 0.5})` : 'rgba(148,163,184,.08)';
        context.fillRect(p.x, p.y, 1.4, 1.4);
      }
      routes.forEach(([from, to], index) => {
        const a = markers[from];
        const b = markers[to];
        const steps = 40;
        const progress = still ? 1 : ((tick / 120 + index * 0.17) % 1.4);
        context.beginPath();
        let started = false;
        for (let step = 0; step <= steps * Math.min(progress, 1); step++) {
          const t = step / steps;
          const lift = 1 + Math.sin(Math.PI * t) * 0.18;
          const mix = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
          const length = Math.hypot(mix[0], mix[1], mix[2]);
          const p = project([(mix[0] / length) * lift, (mix[1] / length) * lift, (mix[2] / length) * lift], size);
          if (p.depth < -0.05) { started = false; continue; }
          if (started) context.lineTo(p.x, p.y); else { context.moveTo(p.x, p.y); started = true; }
        }
        context.strokeStyle = 'rgba(45,212,191,.75)';
        context.lineWidth = 1.5;
        context.stroke();
      });
      for (const marker of markers) {
        const p = project(marker, size);
        if (p.depth < 0) continue;
        context.fillStyle = 'rgba(45,212,191,.25)';
        context.beginPath(); context.arc(p.x, p.y, 7, 0, Math.PI * 2); context.fill();
        context.fillStyle = '#5eead4';
        context.beginPath(); context.arc(p.x, p.y, 3, 0, Math.PI * 2); context.fill();
      }
      context.restore();
    };

    const loop = () => {
      if (!dragging) { rotation += velocity; velocity += (0.003 - velocity) * 0.02; }
      tick += 1;
      draw();
      if (visible) raf = requestAnimationFrame(loop);
    };

    const observer = new ResizeObserver(() => { resize(); draw(); });
    observer.observe(canvas);
    resize();
    if (still) draw(); else raf = requestAnimationFrame(loop);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !still) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);

    const down = (event: PointerEvent) => { dragging = true; lastX = event.clientX; canvas.setPointerCapture(event.pointerId); };
    const move = (event: PointerEvent) => {
      if (!dragging) return;
      velocity = (event.clientX - lastX) * 0.006;
      rotation += velocity;
      lastX = event.clientX;
      if (still) draw();
    };
    const up = () => { dragging = false; };
    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', up);

    return () => {
      cancelAnimationFrame(raf); observer.disconnect(); io.disconnect();
      canvas.removeEventListener('pointerdown', down); canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerup', up); canvas.removeEventListener('pointercancel', up);
    };
  }, []);

  return (
    <section className="grid w-full max-w-5xl items-center gap-8 overflow-hidden rounded-3xl bg-[#05080f] px-6 py-12 text-white lg:grid-cols-2 lg:px-12">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-3 py-1 text-xs font-medium text-teal-200"><span className="size-1.5 rounded-full bg-teal-400" />Live in 38 regions</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Your API, a few milliseconds from everyone.</h1>
        <p className="mt-4 max-w-md text-slate-400">Deploy once. We replicate to the edge and route each request to the closest healthy region.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#deploy" className="inline-flex items-center gap-2 rounded-xl bg-teal-400 px-5 py-3 text-sm font-semibold text-teal-950 transition hover:bg-teal-300">Deploy now <ArrowRight aria-hidden className="size-4" /></a>
          <a href="#map" className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5">View network map</a>
        </div>
      </div>
      <canvas ref={canvasRef} role="img" aria-label="Rotating globe showing connections between Paris, New York, Lagos, Tokyo, São Paulo and Singapore. Drag to spin." className="aspect-square w-full max-w-md cursor-grab touch-pan-y justify-self-center active:cursor-grabbing" />
    </section>
  );
}
