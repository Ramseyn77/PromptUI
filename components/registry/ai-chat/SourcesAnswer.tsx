/**
 * @registry
 * name: Sources Answer
 * category: AI Chat
 * style: Editorial
 * tags: featured, recent
 * description: Réponse IA avec citations numérotées et cartes de sources qui se surlignent au survol.
 * prompt: Create an AI answer with inline numbered citations; a row of source cards (favicon letter, domain, title) sits above the answer, and hovering or focusing a citation highlights its source card (shared state). Horizontal scroll for sources on mobile. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const sources = [
  { id: 1, domain: 'web.dev', title: 'Largest Contentful Paint' },
  { id: 2, domain: 'nextjs.org', title: 'Image optimization' },
  { id: 3, domain: 'mdn.io', title: 'Lazy loading' },
];

export function SourcesAnswer() {
  const [active, setActive] = useState<number | null>(null);
  const cite = (id: number) => (
    <button type="button" onMouseEnter={() => setActive(id)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(id)} onBlur={() => setActive(null)} aria-label={`Source ${id}`} className="mx-0.5 inline-grid size-5 -translate-y-0.5 place-items-center rounded-md bg-zinc-100 align-middle text-[10px] font-bold text-zinc-600 hover:bg-teal-500 hover:text-white dark:bg-zinc-800 dark:text-zinc-300">{id}</button>
  );

  return (
    <article className="w-full max-w-lg">
      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Sources</p>
      <ul className="mt-2 flex gap-2 overflow-x-auto pb-1">
        {sources.map((source) => (
          <li key={source.id} className={`w-40 shrink-0 rounded-xl border p-2.5 transition ${active === source.id ? 'border-teal-500 bg-teal-500/5' : 'border-zinc-200 dark:border-zinc-800'}`}>
            <p className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400"><span className="grid size-4 place-items-center rounded bg-zinc-900 text-[9px] font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">{source.domain[0].toUpperCase()}</span>{source.domain}</p>
            <p className="mt-1 truncate text-xs font-medium text-zinc-900 dark:text-white">{source.title}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm leading-7 text-zinc-800 dark:text-zinc-200">
        To speed up the largest image, serve modern formats and correct sizes{cite(1)}. Next.js does this automatically with its image component{cite(2)}, and below-the-fold media should load lazily{cite(3)}.
      </p>
    </article>
  );
}
