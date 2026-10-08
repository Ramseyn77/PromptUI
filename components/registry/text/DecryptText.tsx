/**
 * @registry
 * name: Decrypt Text
 * category: Text
 * style: Dark
 * tags: featured, recent
 * description: Texte qui se déchiffre lettre par lettre depuis des caractères aléatoires, relançable au survol.
 * prompt: Create a decrypting text effect: characters start as random glyphs and resolve left-to-right into the final text over ~1s (interval), spaces preserved; re-runs on hover/focus. Monospace, the real text available to screen readers (aria-label), static with reduced motion. Light and dark mode.
 */
'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

const target = 'ACCESS GRANTED';
const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*';

export function DecryptText() {
  const [text, setText] = useState(target);
  const timer = useRef<number | undefined>(undefined);

  const run = useCallback(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    window.clearInterval(timer.current);
    let frame = 0;
    timer.current = window.setInterval(() => {
      frame += 1;
      setText(target.split('').map((char, index) => (char === ' ' || index < frame / 2 ? char : glyphs[Math.floor(Math.random() * glyphs.length)])).join(''));
      if (frame / 2 >= target.length) window.clearInterval(timer.current);
    }, 35);
  }, []);

  useEffect(() => { run(); return () => window.clearInterval(timer.current); }, [run]);

  return (
    <button type="button" onMouseEnter={run} onFocus={run} aria-label={target} className="rounded-2xl bg-zinc-950 px-6 py-4 font-mono text-2xl font-bold tracking-widest text-emerald-400 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 dark:bg-zinc-900">
      <span aria-hidden>{text}</span>
    </button>
  );
}
