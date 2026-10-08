/**
 * @registry
 * name: Content Pipeline Board
 * category: Boards
 * style: Editorial
 * tags: recent
 * description: Pipeline éditorial Idée → Rédaction → Relecture → Publié avec cartes d'articles, auteur, nombre de mots et échéance.
 * prompt: Create an editorial content pipeline board: four columns (Ideas, Drafting, Review, Published) with article cards showing type tag (Blog, Newsletter, Case study), serif title, author avatar, word count progress toward target and due date (red when overdue); cards advance with a keyboard-accessible "Advance" button; columns scroll horizontally on mobile. Light (paper) and dark mode.
 */
'use client';
import { useState } from 'react';

const columns = ['Ideas', 'Drafting', 'Review', 'Published'];

export function ContentPipelineBoard() {
  const [cards, setCards] = useState([
    { id: 1, title: 'Why we killed our design system', type: 'Blog', words: 0, target: 1500, due: 'Oct 20', late: false, col: 0 },
    { id: 2, title: 'Kora’s 3× faster launches', type: 'Case study', words: 900, target: 1200, due: 'Oct 6', late: true, col: 1 },
    { id: 3, title: 'October product notes', type: 'Newsletter', words: 650, target: 700, due: 'Oct 9', late: false, col: 2 },
    { id: 4, title: 'Tokens without tears', type: 'Blog', words: 1800, target: 1800, due: 'Sep 30', late: false, col: 3 },
  ]);

  return (
    <div className="flex w-full max-w-4xl snap-x gap-3 overflow-x-auto rounded-3xl bg-[#f6f3ec] p-4 dark:bg-zinc-950" data-lenis-prevent>
      {columns.map((column, index) => (
        <section key={column} aria-label={column} className="w-56 shrink-0 snap-start">
          <h3 className="px-1 font-serif text-lg text-zinc-900 dark:text-zinc-100">{column} <span className="font-sans text-xs text-zinc-400">{cards.filter((card) => card.col === index).length}</span></h3>
          <ul className="mt-2 space-y-2">
            {cards.filter((card) => card.col === index).map((card) => (
              <li key={card.id} className="rounded-xl bg-white p-3 shadow-sm dark:bg-zinc-900">
                <span className="rounded bg-amber-100 px-1.5 text-[10px] font-semibold uppercase tracking-wider text-amber-800 dark:bg-amber-500/15 dark:text-amber-300">{card.type}</span>
                <p className="mt-1.5 font-serif text-sm leading-snug text-zinc-900 dark:text-zinc-100">{card.title}</p>
                <div className="mt-2 h-1 rounded-full bg-zinc-100 dark:bg-zinc-800"><div className="h-full rounded-full bg-zinc-800 dark:bg-zinc-200" style={{ width: `${Math.min(100, (card.words / card.target) * 100)}%` }} /></div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-500"><span>{card.words}/{card.target} words</span><span className={card.late && card.col < 3 ? 'font-semibold text-rose-600 dark:text-rose-400' : ''}>{card.due}</span></div>
                {index < 3 && <button type="button" onClick={() => setCards((list) => list.map((item) => (item.id === card.id ? { ...item, col: item.col + 1, words: item.col === 1 ? item.target : item.words } : item)))} className="mt-2 w-full rounded-md border border-zinc-200 py-1 text-xs text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">Advance to {columns[index + 1]}</button>}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
