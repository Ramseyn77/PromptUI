/**
 * @registry
 * name: Gradient Mesh Hero
 * category: Hero
 * style: Gradient
 * tags: featured, recent
 * description: Hero sur dégradé maillé qui suit doucement le curseur, avec titre centré, badge et double appel à l'action.
 * prompt: Create a hero on a soft mesh gradient: four large blurred color blobs positioned with CSS variables that drift toward the pointer (lerped in requestAnimationFrame), a centered badge, headline, subtitle and two CTAs; blobs stay still with reduced motion. Light (pastel) and dark (deep jewel tones) palettes.
 */
'use client';
import { useEffect, useRef } from 'react';

export function GradientMeshHero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let target = { x: 0.5, y: 0.5 };
    let current = { x: 0.5, y: 0.5 };
    let raf = 0;
    const loop = () => {
      current = { x: current.x + (target.x - current.x) * 0.05, y: current.y + (target.y - current.y) * 0.05 };
      node.style.setProperty('--mx', `${(current.x * 100).toFixed(1)}%`);
      node.style.setProperty('--my', `${(current.y * 100).toFixed(1)}%`);
      raf = requestAnimationFrame(loop);
    };
    const move = (event: PointerEvent) => { const box = node.getBoundingClientRect(); target = { x: (event.clientX - box.left) / box.width, y: (event.clientY - box.top) / box.height }; };
    node.addEventListener('pointermove', move);
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); node.removeEventListener('pointermove', move); };
  }, []);

  return (
    <section ref={ref} className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-white px-6 py-20 text-center [--mx:50%] [--my:50%] dark:bg-zinc-950">
      <div aria-hidden className="absolute inset-0 opacity-80 blur-3xl dark:opacity-60" style={{ background: 'radial-gradient(30% 40% at var(--mx) var(--my), #a78bfa, transparent), radial-gradient(35% 45% at 15% 20%, #5eead4, transparent), radial-gradient(30% 40% at 85% 30%, #f9a8d4, transparent), radial-gradient(40% 40% at 60% 95%, #fde68a, transparent)' }} />
      <div className="relative">
        <span className="rounded-full border border-zinc-900/10 bg-white/60 px-3 py-1 text-xs font-medium text-zinc-700 backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-zinc-200">New · Realtime collaboration</span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-6xl dark:text-white">Where your whole team thinks out loud.</h1>
        <p className="mx-auto mt-4 max-w-xl text-zinc-700 dark:text-zinc-300">Docs, whiteboards and tasks in one fluid canvas.</p>
        <div className="mt-8 flex justify-center gap-3"><a href="#start" className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Get started</a><a href="#demo" className="rounded-full bg-white/70 px-5 py-3 text-sm font-semibold text-zinc-900 backdrop-blur dark:bg-white/10 dark:text-white">Watch demo</a></div>
      </div>
    </section>
  );
}
