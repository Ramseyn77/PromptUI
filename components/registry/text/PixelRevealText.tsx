/**
 * @registry
 * name: Pixel Reveal Text
 * category: Text
 * style: Dark
 * tags: recent
 * description: Titre qui apparaît en se « dépixelisant » : grille de blocs masquant le texte qui disparaissent en ordre pseudo-aléatoire déterministe, avec relance.
 * prompt: Create a pixel reveal headline on a dark panel: the headline text sits under a grid of 18×5 colored blocks (same gradient hue as the text) which fade out in a deterministic scattered order (index-based hash, no Math.random) over ~1.2s, revealing the text; the effect runs when the panel scrolls into view (IntersectionObserver, once) and a Replay button restarts it by toggling between two identical animation names; reduced motion shows the text immediately. Dark in both themes.
 */
'use client';
import { useEffect, useRef, useState } from 'react';

const cols = 18;
const rows = 5;
const blocks = Array.from({ length: cols * rows }, (_, index) => ({ delay: ((index * 47) % 97) * 12, hue: 250 + ((index % cols) / cols) * 80 }));

export function PixelRevealText() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setRun(1); observer.disconnect(); } }, { threshold: 0.5 });
    observer.observe(ref.current!);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex w-full max-w-2xl flex-col items-center gap-5 rounded-3xl bg-zinc-950 px-6 py-12 ring-1 ring-white/10">
      <style>{`@keyframes pui-pixel-a { from { opacity: 1 } to { opacity: 0 } } @keyframes pui-pixel-b { from { opacity: 1 } to { opacity: 0 } } @media (prefers-reduced-motion: reduce) { .pui-pixel-block { display: none } }`}</style>
      <h2 className="relative text-center text-5xl font-black tracking-tight sm:text-6xl">
        <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">Render the future</span>
        <span aria-hidden className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}>
          {blocks.map((block, index) => <span key={index} className="pui-pixel-block" style={{ background: `hsl(${block.hue.toFixed(0)} 80% 60%)`, opacity: run ? undefined : 1, animation: run ? `pui-pixel-${run % 2 ? 'a' : 'b'} .25s steps(2) ${block.delay}ms both` : undefined }} />)}
        </span>
      </h2>
      <button type="button" onClick={() => setRun(run + 1)} className="rounded-full px-4 py-1.5 text-xs text-zinc-300 ring-1 ring-white/15 hover:bg-white/5">Replay</button>
    </div>
  );
}
