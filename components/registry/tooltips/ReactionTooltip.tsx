/**
 * @registry
 * name: Reaction Tooltip
 * category: Tooltips
 * style: Minimal
 * tags: recent
 * description: Réactions emoji sous un message : survoler une réaction montre qui a réagi, cliquer ajoute la sienne.
 * prompt: Create Slack-style reaction chips under a message: each chip shows emoji + count; hovering or focusing shows a tooltip "Ana, Leo and 3 others reacted with 🎉"; clicking toggles your own reaction (aria-pressed, count +1, highlighted border, "You" added first in the tooltip). Light and dark mode.
 */
'use client';
import { useState } from 'react';

const initial = [
  { emoji: '🎉', people: ['Ana', 'Leo', 'Kofi', 'Mia', 'Sam'] },
  { emoji: '🔥', people: ['Ines', 'Tom'] },
  { emoji: '👀', people: ['Yuki'] },
];

export function ReactionTooltip() {
  const [mine, setMine] = useState<string[]>(['🔥']);

  const names = (people: string[], emoji: string) => {
    const list = mine.includes(emoji) ? ['You', ...people] : people;
    return list.length > 3 ? `${list.slice(0, 2).join(', ')} and ${list.length - 2} others` : list.join(', ').replace(/, ([^,]*)$/, ' and $1');
  };

  return (
    <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-4 pb-16 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex gap-3">
        <span aria-hidden className="size-9 shrink-0 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500" />
        <div>
          <p className="text-sm"><span className="font-semibold text-zinc-900 dark:text-zinc-100">Priya</span> <span className="text-xs text-zinc-400">10:42</span></p>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">v2.4 is live in production 🚀</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {initial.map(({ emoji, people }) => {
              const pressed = mine.includes(emoji);
              return (
                <span key={emoji} className="group relative">
                  <button type="button" aria-pressed={pressed} aria-label={`${emoji} ${people.length + (pressed ? 1 : 0)} reactions`} onClick={() => setMine((list) => (pressed ? list.filter((item) => item !== emoji) : [...list, emoji]))} className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${pressed ? 'border-sky-400 bg-sky-50 text-sky-800 dark:border-sky-500/60 dark:bg-sky-500/10 dark:text-sky-200' : 'border-zinc-200 text-zinc-700 hover:border-zinc-300 dark:border-zinc-700 dark:text-zinc-300'}`}>
                    <span aria-hidden>{emoji}</span><span className="tabular-nums">{people.length + (pressed ? 1 : 0)}</span>
                  </button>
                  <span role="tooltip" className="pointer-events-none absolute left-0 top-full z-10 mt-2 w-max max-w-56 rounded-lg bg-zinc-900 px-2.5 py-1.5 text-xs text-white opacity-0 shadow-lg transition group-hover:opacity-100 group-focus-within:opacity-100 dark:bg-white dark:text-zinc-900">
                    {names(people, emoji)} reacted with {emoji}
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
