/**
 * @registry
 * name: Barrel Roll Navigation
 * category: Buttons
 * style: Dark
 * tags: recent
 * description: Boutons precedent et suivant declenchant une rotation a 360 deg de la page avant la navigation.
 * prompt: Create previous and next navigation buttons that perform a full-page 360-degree barrel-roll transition before navigating. Support optional previousHref and nextHref props, prevent repeated clicks during animation, show a demo page counter when no URLs are supplied, and respect reduced-motion preferences.
 */
'use client';

import { ArrowLeft, ArrowRight, RotateCw } from 'lucide-react';
import { useRef, useState } from 'react';

type BarrelRollNavigationProps = {
  previousHref?: string;
  nextHref?: string;
};

export function BarrelRollNavigation({ previousHref, nextHref }: BarrelRollNavigationProps = {}) {
  const [page, setPage] = useState(2);
  const [rolling, setRolling] = useState<'previous' | 'next' | null>(null);
  const busy = useRef(false);
  const section = useRef<HTMLElement>(null);

  const navigate = async (direction: 'previous' | 'next', href?: string) => {
    if (busy.current) return;
    busy.current = true;
    setRolling(direction);

    // Roll the document that hosts the component (the page, or the iframe it is embedded in).
    const doc = section.current?.ownerDocument ?? document;
    const reducedMotion = (doc.defaultView ?? window).matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reducedMotion) {
      const root = doc.documentElement;
      const previousOverflow = root.style.overflow;
      root.style.overflow = 'hidden';
      const degrees = direction === 'next' ? 360 : -360;
      const animation = root.animate(
        [
          { transform: 'rotate(0deg) scale(1)', opacity: 1 },
          { transform: `rotate(${degrees / 2}deg) scale(.78)`, opacity: 0.72, offset: 0.5 },
          { transform: `rotate(${degrees}deg) scale(1)`, opacity: 1 },
        ],
        { duration: 900, easing: 'cubic-bezier(.7,0,.3,1)' },
      );
      try { await animation.finished; } finally { root.style.overflow = previousOverflow; }
    }

    if (href) {
      window.location.assign(href);
      return;
    }
    setPage((value) => direction === 'next' ? (value === 5 ? 1 : value + 1) : (value === 1 ? 5 : value - 1));
    setRolling(null);
    busy.current = false;
  };

  return (
    <section ref={section} className="w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 p-5 text-white shadow-2xl sm:p-7">
      <div className="rounded-2xl bg-gradient-to-br from-violet-500/20 via-zinc-900 to-cyan-500/20 px-5 py-8 text-center sm:px-8 sm:py-10">
        <RotateCw aria-hidden className={`mx-auto size-7 text-violet-300 ${rolling ? 'motion-safe:animate-spin' : ''}`} />
        <p className="mt-4 text-xs font-bold uppercase tracking-[.25em] text-zinc-500">Active page</p>
        <p aria-live="polite" className="mt-1 text-4xl font-black tracking-tight">Chapter {page}</p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-400">The entire page completes a barrel roll before the destination appears.</p>
      </div>

      <nav aria-label="Page navigation" className="mt-4 grid grid-cols-2 gap-3">
        <button type="button" disabled={rolling !== null} onClick={() => navigate('previous', previousHref)} className="group flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[.06] px-3 py-3 text-sm font-semibold transition hover:border-violet-400/50 hover:bg-violet-500/15 disabled:cursor-wait disabled:opacity-50">
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1 motion-reduce:transform-none" />
          {rolling === 'previous' ? 'Rolling…' : 'Previous'}
        </button>
        <button type="button" disabled={rolling !== null} onClick={() => navigate('next', nextHref)} className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-3 py-3 text-sm font-bold text-zinc-950 transition hover:brightness-110 disabled:cursor-wait disabled:opacity-50">
          {rolling === 'next' ? 'Rolling…' : 'Next'}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
        </button>
      </nav>
    </section>
  );
}
