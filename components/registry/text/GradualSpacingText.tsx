/**
 * @registry
 * name: Gradual Spacing Text
 * category: Text
 * style: Minimal
 * tags: recent
 * description: Titre dont les lettres arrivent depuis la gauche en s'espaçant puis se resserrent, lettre après lettre, avec bouton de relecture.
 * prompt: Create a gradual spacing headline inspired by Magic UI: each letter starts invisible and offset to the left with extra letter spacing, then slides in and tightens into place with a staggered delay per character; spaces preserved; a Replay button restarts the animation via a key change on the letters container (not the button, so focus stays); full text in sr-only, letters aria-hidden; reduced motion shows the final state. Light and dark mode.
 */
'use client';
import { RotateCcw } from 'lucide-react';
import { useState } from 'react';

export function GradualSpacingText({ text = 'Gradual Spacing' }: { text?: string }) {
  const [run, setRun] = useState(0);

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <style>{`@keyframes pui-gradual { from { opacity: 0; transform: translateX(-18px); letter-spacing: .4em } to { opacity: 1; transform: none; letter-spacing: normal } }`}</style>
      <h2 className="text-center text-5xl font-bold tracking-tight text-zinc-950 sm:text-6xl dark:text-white">
        <span className="sr-only">{text}</span>
        <span key={run} aria-hidden className="inline-flex">
          {text.split('').map((char, index) => <span key={index} className="inline-block motion-safe:animate-[pui-gradual_.5s_cubic-bezier(.2,.8,.2,1)_both]" style={{ animationDelay: `${index * 45}ms` }}>{char === ' ' ? ' ' : char}</span>)}
        </span>
      </h2>
      <button type="button" onClick={() => setRun(run + 1)} className="flex items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-1.5 text-xs text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900"><RotateCcw aria-hidden className="size-3.5" />Replay</button>
    </div>
  );
}
