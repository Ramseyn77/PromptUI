/**
 * @registry
 * name: Typing Animation
 * category: Text
 * style: Minimal
 * tags: recent
 * description: Texte qui se tape lettre par lettre avec curseur bloc clignotant et bouton pour rejouer.
 * prompt: Create a typing animation: a headline types itself character by character (45ms per char, slight pause after punctuation) with a blinking block caret; a small "Replay" button restarts it. The full sentence is exposed to screen readers via aria-label while the animated text is aria-hidden; shows full text immediately with reduced motion. Light and dark mode.
 */
'use client';
import { RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';

const sentence = 'Design faster. Ship calmer. Sleep better.';

export function TypingAnimation() {
  const [length, setLength] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setLength(sentence.length); return; }
    setLength(0);
    let index = 0;
    let timer = 0;
    const tick = () => {
      index += 1;
      setLength(index);
      if (index < sentence.length) timer = window.setTimeout(tick, /[.,]/.test(sentence[index - 1]) ? 380 : 45);
    };
    timer = window.setTimeout(tick, 300);
    return () => window.clearTimeout(timer);
  }, [run]);

  return (
    <div className="w-full max-w-lg">
      <style>{`@keyframes pui-caret{50%{opacity:0}}`}</style>
      <h3 aria-label={sentence} className="min-h-[5rem] text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
        <span aria-hidden>{sentence.slice(0, length)}</span>
        <span aria-hidden className="ml-1 inline-block h-[0.9em] w-[0.5em] translate-y-[0.1em] bg-teal-500 motion-safe:animate-[pui-caret_1s_steps(1)_infinite]" />
      </h3>
      <button type="button" onClick={() => setRun((value) => value + 1)} className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"><RotateCcw aria-hidden className="size-3.5" />Replay</button>
    </div>
  );
}
