/**
 * @registry
 * name: Now Next Later Roadmap
 * category: Boards
 * style: Editorial
 * tags: recent
 * description: Feuille de route produit en trois horizons avec themes colores et votes des utilisateurs.
 * prompt: Create a public roadmap board with three columns (Now, Next, Later) each with a colored top border, cards showing a theme tag, title, short description and an upvote button with count that toggles (aria-pressed). Stacks on mobile. Light and dark mode.
 */
'use client';
import { ChevronUp } from 'lucide-react';
import { useState } from 'react';

const columns = [
  { name: 'Now', tone: 'border-t-teal-500', items: [['Performance', 'Faster previews', 'Instant load for every component.', 128]] },
  { name: 'Next', tone: 'border-t-violet-500', items: [['AI', 'Prompt to page', 'Generate full pages from one prompt.', 342], ['Collab', 'Shared collections', 'Save and share sets with your team.', 97]] },
  { name: 'Later', tone: 'border-t-amber-500', items: [['Figma', 'Figma sync', 'Two-way sync with your design files.', 211]] },
] as const;

export function NowNextLaterRoadmap() {
  const [voted, setVoted] = useState<string[]>([]);

  return (
    <div className="grid w-full max-w-4xl gap-4 md:grid-cols-3">
      {columns.map((column) => (
        <section key={column.name} className={`rounded-2xl border border-t-4 border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900 ${column.tone}`}>
          <h3 className="px-1 text-sm font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">{column.name}</h3>
          <ul className="mt-3 space-y-2">
            {column.items.map(([tag, title, text, votes]) => {
              const on = voted.includes(title);
              return (
                <li key={title} className="flex gap-3 rounded-xl bg-white p-3 dark:bg-zinc-950">
                  <button type="button" aria-pressed={on} aria-label={`Upvote ${title}`} onClick={() => setVoted((current) => (on ? current.filter((item) => item !== title) : [...current, title]))} className={`flex h-12 w-10 shrink-0 flex-col items-center justify-center rounded-lg border text-xs font-semibold transition ${on ? 'border-teal-500 bg-teal-500/10 text-teal-700 dark:text-teal-300' : 'border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300'}`}>
                    <ChevronUp aria-hidden className="size-4" />{votes + (on ? 1 : 0)}
                  </button>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">{tag}</p>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">{title}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
