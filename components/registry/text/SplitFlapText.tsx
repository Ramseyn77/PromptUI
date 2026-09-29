/**
 * @registry
 * name: Split Flap Text
 * category: Text
 * style: Dark
 * tags: recent
 * description: Afficheur a palettes facon aeroport, chaque case fait defiler les lettres jusqu a la bonne.
 * prompt: Create a split-flap display: fixed-width tiles for each character of a destination word; on change every tile cycles through the alphabet until it lands on its letter (per-tile interval, staggered stop), with a center hinge line and dark tiles. Cycles through PARIS, DAKAR, TOKYO; sr-only live text. Dark in both themes.
 */
'use client';
import { useEffect, useState } from 'react';

const words = ['PARIS', 'DAKAR', 'TOKYO', 'OSLO'];
const alphabet = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const width = 5;

export function SplitFlapText() {
  const [index, setIndex] = useState(0);
  const [tiles, setTiles] = useState(words[0].padEnd(width).split(''));

  useEffect(() => {
    const cycle = window.setInterval(() => setIndex((value) => (value + 1) % words.length), 3000);
    return () => window.clearInterval(cycle);
  }, []);

  useEffect(() => {
    const target = words[index].padEnd(width).split('');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setTiles(target); return; }
    const timer = window.setInterval(() => {
      setTiles((current) => {
        const next = current.map((char, i) => (char === target[i] ? char : alphabet[(alphabet.indexOf(char) + 1) % alphabet.length]));
        if (next.join('') === target.join('')) window.clearInterval(timer);
        return next;
      });
    }, 45);
    return () => window.clearInterval(timer);
  }, [index]);

  return (
    <div className="rounded-2xl bg-zinc-900 p-4 shadow-xl">
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[.3em] text-amber-400/80">Destination</p>
      <p aria-live="polite" className="sr-only">{words[index]}</p>
      <div aria-hidden className="flex gap-1.5">
        {tiles.map((char, i) => (
          <span key={i} className="relative grid h-14 w-11 place-items-center overflow-hidden rounded-md bg-zinc-800 font-mono text-3xl font-bold text-amber-300 shadow-inner">
            {char}
            <span className="absolute inset-x-0 top-1/2 h-px bg-black/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
