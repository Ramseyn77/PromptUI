/**
 * @registry
 * name: Masked Line Reveal
 * category: Text
 * style: Editorial
 * tags: recent
 * description: Paragraphe éditorial dont les lignes surgissent de derrière un masque, une par une, à l'entrée dans l'écran.
 * prompt: Create an editorial masked line reveal: a large serif statement split into lines, each line wrapped in an overflow-hidden mask with the inner text translated 110% down and rotated slightly, sliding up with staggered delays when the block enters the viewport (IntersectionObserver, once); a small "Replay" button retriggers; fully visible immediately with reduced motion or before hydration-safe mount. Light (paper) and dark mode.
 */
'use client';
import { RotateCcw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const lines = ['We believe interfaces', 'should feel inevitable —', 'quiet, precise, and', 'a little bit delightful.'];

export function MaskedLineReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'idle' | 'hidden' | 'shown'>('idle');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setState('hidden');
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setState('shown'); observer.disconnect(); } }, { threshold: 0.4 });
    observer.observe(ref.current!);
    return () => observer.disconnect();
  }, []);

  function replay() {
    setState('hidden');
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => setState('shown')));
  }

  return (
    <div ref={ref} className="w-full max-w-2xl rounded-3xl bg-[#f5f1e8] p-8 dark:bg-zinc-950">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">Manifesto</p>
      <h2 className="mt-4 font-serif text-4xl leading-[1.1] text-zinc-900 sm:text-5xl dark:text-zinc-100">
        {lines.map((line, index) => (
          <span key={line} className="block overflow-hidden pb-1">
            <span className={`block origin-top-left ${state === 'hidden' ? 'translate-y-[110%] rotate-3' : 'translate-y-0 rotate-0'} ${state === 'shown' ? 'transition-transform duration-[900ms] ease-[cubic-bezier(.2,.8,.2,1)]' : ''}`} style={{ transitionDelay: state === 'shown' ? `${index * 120}ms` : '0ms' }}>{line}</span>
          </span>
        ))}
      </h2>
      <button type="button" onClick={replay} className="mt-6 inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"><RotateCcw aria-hidden className="size-4" />Replay</button>
    </div>
  );
}
