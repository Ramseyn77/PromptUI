/**
 * @registry
 * name: Flashcard Card
 * category: Cards
 * style: Gradient
 * tags: featured, recent
 * description: Carte de révision qui se retourne en 3D (question / réponse), auto-évaluation « À revoir / Bien / Facile » et progression du paquet.
 * prompt: Create a study flashcard: a 3D flip card (front: question with deck label; back: answer with an example) flipped by click, Space or Enter (aria-pressed, aria-live announces the side); after flipping, three self-rating buttons (Again, Good, Easy) advance to the next card and record a score; a deck progress bar "4 / 10" and a mini tally of ratings; the flip is instant with reduced motion. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const cards = [
  ['What does “aria-live” do?', 'Announces dynamic content changes to screen readers.', '<p aria-live="polite">Saved</p>'],
  ['Which CSS property creates a 3D space for children?', 'perspective (on the parent)', 'perspective: 800px;'],
  ['What is the difference between em and rem?', 'em is relative to the parent font size, rem to the root.', '1.5rem = 24px at 16px root'],
  ['What does useId guarantee?', 'Stable unique ids that match between server and client.', 'const id = useId();'],
];

export function FlashcardCard() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [tally, setTally] = useState({ Again: 0, Good: 1, Easy: 2 });
  const [question, answer, example] = cards[index];

  function rate(key: keyof typeof tally) {
    setTally({ ...tally, [key]: tally[key] + 1 });
    setFlipped(false);
    setIndex((index + 1) % cards.length);
  }

  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center justify-between text-xs text-zinc-500"><span>Web accessibility · deck</span><span className="tabular-nums">{index + 1} / {cards.length}</span></div>
      <div className="mt-1.5 h-1 rounded-full bg-zinc-200 dark:bg-zinc-800"><div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all" style={{ width: `${((index + 1) / cards.length) * 100}%` }} /></div>
      <button type="button" aria-pressed={flipped} aria-label={flipped ? `Answer: ${answer}` : `Question: ${question}. Press to reveal the answer`} onClick={() => setFlipped(!flipped)} className="mt-4 block h-56 w-full rounded-3xl outline-none [perspective:1000px] focus-visible:ring-4 focus-visible:ring-violet-400/50">
        <span className={`relative block size-full transition-transform duration-500 [transform-style:preserve-3d] motion-reduce:duration-0 ${flipped ? '[transform:rotateY(180deg)]' : ''}`}>
          <span className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-6 text-center text-white shadow-xl [backface-visibility:hidden]"><span className="text-[11px] font-semibold uppercase tracking-widest text-white/70">Question</span><span className="mt-3 text-xl font-semibold leading-snug">{question}</span><span className="mt-4 text-xs text-white/70">Tap to flip</span></span>
          <span className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-white p-6 text-center shadow-xl ring-1 ring-zinc-200 [backface-visibility:hidden] [transform:rotateY(180deg)] dark:bg-zinc-900 dark:ring-zinc-800"><span className="text-[11px] font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">Answer</span><span className="mt-3 text-lg font-medium text-zinc-950 dark:text-white">{answer}</span><code className="mt-3 rounded-lg bg-zinc-100 px-2 py-1 font-mono text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">{example}</code></span>
        </span>
      </button>
      <p aria-live="polite" className="sr-only">{flipped ? 'Showing answer' : 'Showing question'}</p>
      <div className={`mt-4 grid grid-cols-3 gap-2 transition-opacity ${flipped ? 'opacity-100' : 'pointer-events-none opacity-30'}`}>
        {([['Again', 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300'], ['Good', 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300'], ['Easy', 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300']] as const).map(([key, tone]) => <button key={key} type="button" disabled={!flipped} onClick={() => rate(key)} className={`rounded-xl py-2 text-sm font-semibold ${tone}`}>{key}<span className="block text-[10px] font-normal opacity-70">{tally[key]} so far</span></button>)}
      </div>
    </div>
  );
}
