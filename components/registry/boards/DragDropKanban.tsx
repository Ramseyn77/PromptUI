/**
 * @registry
 * name: Drag Drop Kanban
 * category: Boards
 * style: SaaS
 * tags: featured, recent
 * description: Kanban où l'on glisse les cartes entre colonnes, avec alternative clavier par boutons de déplacement.
 * prompt: Create a kanban board with native HTML5 drag and drop between three columns (To do, In progress, Done), a highlighted drop zone while dragging, per-column counts, and keyboard-accessible "move left/right" buttons on each card as an alternative to dragging. Columns scroll horizontally on mobile. Light and dark mode.
 */
'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, type DragEvent } from 'react';

const columns = ['To do', 'In progress', 'Done'] as const;
type Card = { id: number; title: string; column: number };

export function DragDropKanban() {
  const [cards, setCards] = useState<Card[]>([
    { id: 1, title: 'Audit color contrast', column: 0 },
    { id: 2, title: 'Write onboarding copy', column: 0 },
    { id: 3, title: 'Build pricing page', column: 1 },
    { id: 4, title: 'Set up analytics', column: 2 },
  ]);
  const [over, setOver] = useState<number | null>(null);

  const move = (id: number, column: number) => setCards((current) => current.map((card) => (card.id === id ? { ...card, column } : card)));
  const onDrop = (event: DragEvent, column: number) => { event.preventDefault(); move(Number(event.dataTransfer.getData('text/plain')), column); setOver(null); };

  return (
    <div className="flex w-full max-w-3xl gap-3 overflow-x-auto pb-2">
      {columns.map((name, column) => {
        const list = cards.filter((card) => card.column === column);
        return (
          <section
            key={name}
            aria-label={name}
            onDragOver={(event) => { event.preventDefault(); setOver(column); }}
            onDragLeave={() => setOver(null)}
            onDrop={(event) => onDrop(event, column)}
            className={`min-h-56 w-60 shrink-0 rounded-2xl border-2 p-3 transition sm:w-auto sm:flex-1 ${over === column ? 'border-dashed border-teal-500 bg-teal-500/5' : 'border-transparent bg-zinc-100 dark:bg-zinc-900'}`}
          >
            <h3 className="flex items-center justify-between px-1 text-sm font-semibold text-zinc-700 dark:text-zinc-300">{name}<span className="rounded-full bg-white px-2 text-xs text-zinc-500 dark:bg-zinc-800">{list.length}</span></h3>
            <ul className="mt-3 space-y-2">
              {list.map((card) => (
                <li key={card.id} draggable onDragStart={(event) => event.dataTransfer.setData('text/plain', String(card.id))} className="group cursor-grab rounded-xl border border-zinc-200 bg-white p-3 text-sm text-zinc-800 shadow-sm active:cursor-grabbing dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
                  {card.title}
                  <div className="mt-2 flex justify-end gap-1 opacity-60 group-hover:opacity-100 group-focus-within:opacity-100">
                    <button type="button" aria-label={`Move "${card.title}" left`} disabled={column === 0} onClick={() => move(card.id, column - 1)} className="grid size-6 place-items-center rounded-md hover:bg-zinc-100 disabled:opacity-25 dark:hover:bg-zinc-800"><ChevronLeft className="size-3.5" /></button>
                    <button type="button" aria-label={`Move "${card.title}" right`} disabled={column === columns.length - 1} onClick={() => move(card.id, column + 1)} className="grid size-6 place-items-center rounded-md hover:bg-zinc-100 disabled:opacity-25 dark:hover:bg-zinc-800"><ChevronRight className="size-3.5" /></button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
