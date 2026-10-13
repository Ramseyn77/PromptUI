/**
 * @registry
 * name: Pixel Dissolve Grid
 * category: Shaders
 * style: Dark
 * tags: recent
 * description: Grille de pixels qui se dissout et se reconstitue en vagues depuis le centre, révélant un titre, avec couleurs en dégradé.
 * prompt: Create a pixel dissolve effect in CSS: a 24×14 grid of square cells over a headline; each cell's opacity animates with a delay based on its distance from the center (computed with integer math, no randomness) so a dissolve wave ripples outward and back on a loop, revealing and covering the text; cell colors follow a violet→cyan gradient by column; clicking "Replay" restarts the wave; static (fully revealed) with reduced motion. Dark in both themes.
 */
'use client';
import { useState } from 'react';

const cols = 24;
const rows = 14;
const cells = Array.from({ length: cols * rows }, (_, index) => {
  const x = index % cols;
  const y = Math.floor(index / cols);
  const distance = Math.abs(x - cols / 2) + Math.abs(y - rows / 2) * 1.6;
  return { key: index, delay: (distance * 0.06 + ((x * 7 + y * 3) % 5) * 0.03).toFixed(2), hue: 265 - Math.round((x / cols) * 80) };
});

export function PixelDissolveGrid() {
  const [run, setRun] = useState(0);

  return (
    <div className="relative h-72 w-full max-w-xl overflow-hidden rounded-3xl bg-zinc-950">
      <style>{`
        @keyframes pui-dissolve { 0%, 15% { opacity: 1; transform: scale(1) } 45%, 70% { opacity: 0; transform: scale(.3) } 100% { opacity: 1; transform: scale(1) } }
        @media (prefers-reduced-motion: reduce) { .pui-dissolve-cell { animation: none !important; opacity: 0 !important } }
      `}</style>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div><p className="text-5xl font-black tracking-tight text-white">Pixel perfect.</p><p className="mt-2 text-sm text-zinc-400">Every component, every breakpoint.</p></div>
      </div>
      <div key={run} aria-hidden className="pointer-events-none absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}>
        {cells.map((cell) => <span key={cell.key} className="pui-dissolve-cell" style={{ background: `hsl(${cell.hue} 80% 55%)`, animation: `pui-dissolve 4.5s ease-in-out ${cell.delay}s infinite both` }} />)}
      </div>
      <button type="button" onClick={() => setRun(run + 1)} className="absolute bottom-3 right-3 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur hover:bg-white/20">Replay</button>
    </div>
  );
}
