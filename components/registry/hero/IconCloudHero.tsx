/**
 * @registry
 * name: Icon Cloud Hero
 * category: Hero
 * style: Minimal
 * tags: featured, recent
 * description: Hero avec une sphère 3D de technologies qui tourne et suit le curseur, les tags proches sont nets.
 * prompt: Create a hero with a 3D tag sphere: 24 technology tags distributed on a Fibonacci sphere, rotated every frame by a velocity that follows the pointer position over the sphere (idle slow spin otherwise); each tag is absolutely positioned via translate3d from its projected coordinates with scale and opacity based on depth, and blurred when far. Copy column with headline and buttons; stacked on mobile, two columns from lg. The tag list is also provided as an accessible list. Static with reduced motion. Light and dark mode.
 */
'use client';
import { useEffect, useRef } from 'react';

const tags = ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Node', 'Prisma', 'Postgres', 'Redis', 'Docker', 'Vercel', 'Figma', 'GraphQL', 'Vite', 'Bun', 'Deno', 'Rust', 'Go', 'Python', 'Svelte', 'Vue', 'Astro', 'Zod', 'tRPC', 'Supabase'];

export function IconCloudHero() {
  const sphereRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sphere = sphereRef.current!;
    const items = Array.from(sphere.querySelectorAll<HTMLElement>('[data-tag]'));
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const points = items.map((_, index) => {
      const y = 1 - (index / (items.length - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      return [Math.cos(golden * index) * radius, y, Math.sin(golden * index) * radius];
    });
    let vx = 0.004;
    let vy = 0.002;
    let target = { x: 0.004, y: 0.002 };
    let raf = 0;
    let visible = true;

    const render = () => {
      const size = sphere.clientWidth / 2 - 40;
      for (let index = 0; index < points.length; index++) {
        const [x, y, z] = points[index];
        const cosY = Math.cos(vx); const sinY = Math.sin(vx);
        const x1 = x * cosY + z * sinY; const z1 = -x * sinY + z * cosY;
        const cosX = Math.cos(vy); const sinX = Math.sin(vy);
        const y1 = y * cosX - z1 * sinX; const z2 = y * sinX + z1 * cosX;
        points[index] = [x1, y1, z2];
        const depth = (z2 + 1) / 2;
        const item = items[index];
        item.style.transform = `translate(-50%,-50%) translate3d(${x1 * size}px, ${y1 * size}px, 0) scale(${0.6 + depth * 0.6})`;
        item.style.opacity = String(0.25 + depth * 0.75);
        item.style.filter = depth < 0.35 ? 'blur(1.5px)' : 'none';
        item.style.zIndex = String(Math.round(depth * 100));
      }
    };

    const loop = () => {
      vx += (target.x - vx) * 0.05;
      vy += (target.y - vy) * 0.05;
      render();
      if (visible) raf = requestAnimationFrame(loop);
    };

    if (still) { vx = 0; vy = 0; render(); } else raf = requestAnimationFrame(loop);
    const resizer = new ResizeObserver(() => { if (still || !visible) { const [sx, sy] = [vx, vy]; vx = 0; vy = 0; render(); vx = sx; vy = sy; } });
    resizer.observe(sphere);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !still) raf = requestAnimationFrame(loop);
    });
    io.observe(sphere);

    const move = (event: PointerEvent) => {
      const rect = sphere.getBoundingClientRect();
      const dx = (event.clientX - rect.left) / rect.width - 0.5;
      const dy = (event.clientY - rect.top) / rect.height - 0.5;
      target = { x: dx * 0.04, y: -dy * 0.04 };
    };
    const leave = () => { target = { x: 0.004, y: 0.002 }; };
    sphere.addEventListener('pointermove', move);
    sphere.addEventListener('pointerleave', leave);

    return () => { cancelAnimationFrame(raf); resizer.disconnect(); io.disconnect(); sphere.removeEventListener('pointermove', move); sphere.removeEventListener('pointerleave', leave); };
  }, []);

  return (
    <section className="grid w-full max-w-5xl items-center gap-10 rounded-3xl border border-zinc-200 bg-white px-6 py-12 lg:grid-cols-2 lg:px-12 dark:border-zinc-800 dark:bg-zinc-950">
      <div>
        <p className="text-sm font-semibold text-teal-700 dark:text-teal-400">Stack-agnostic</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">Works with the tools you already love.</h1>
        <p className="mt-4 max-w-md text-zinc-600 dark:text-zinc-400">Drop-in SDKs and templates for 24 frameworks, databases and hosts. No rewrite required.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#start" className="rounded-xl bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200">Start building</a>
          <a href="#integrations" className="rounded-xl border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900">All integrations</a>
        </div>
      </div>
      <div ref={sphereRef} className="relative mx-auto aspect-square w-full max-w-sm">
        <ul aria-label="Supported technologies" className="absolute inset-0">
          {tags.map((tag) => (
            <li key={tag} data-tag className="absolute left-1/2 top-1/2 whitespace-nowrap rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm font-semibold text-zinc-800 shadow-sm will-change-transform dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100" style={{ transform: 'translate(-50%,-50%)' }}>{tag}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
