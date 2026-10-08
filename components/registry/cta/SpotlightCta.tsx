/**
 * @registry
 * name: Spotlight CTA
 * category: CTA
 * style: Dark
 * tags: featured, recent
 * description: Appel à l'action sombre éclairé par un halo qui suit la souris, bordure lumineuse et bouton brillant.
 * prompt: Create a dark CTA panel with a radial spotlight that follows the pointer (CSS variables set on pointermove, no re-render), a subtle gradient border, headline, subtitle and a glowing teal button. Always dark (stage-like); the spotlight is hidden with reduced motion.
 */
'use client';
import { useRef, type PointerEvent } from 'react';

export function SpotlightCta() {
  const ref = useRef<HTMLElement>(null);
  const move = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    ref.current?.style.setProperty('--x', `${event.clientX - rect.left}px`);
    ref.current?.style.setProperty('--y', `${event.clientY - rect.top}px`);
  };

  return (
    <section ref={ref} onPointerMove={move} className="group relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 px-6 py-16 text-center [--x:50%] [--y:0%]">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:hidden" style={{ background: 'radial-gradient(400px circle at var(--x) var(--y), rgba(45,212,191,.18), transparent 70%)' }} />
      <div className="relative mx-auto max-w-xl">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Build what&apos;s next, tonight.</h2>
        <p className="mt-3 text-zinc-400">Everything you need to go from idea to launch, in one library.</p>
        <a href="#" className="mt-8 inline-block rounded-xl bg-teal-400 px-6 py-3 text-sm font-semibold text-teal-950 shadow-[0_0_30px_rgba(45,212,191,.45)] transition hover:shadow-[0_0_45px_rgba(45,212,191,.65)]">Get started</a>
      </div>
    </section>
  );
}
