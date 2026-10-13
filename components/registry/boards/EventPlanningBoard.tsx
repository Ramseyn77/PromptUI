/**
 * @registry
 * name: Event Planning Board
 * category: Boards
 * style: Gradient
 * tags: recent
 * description: Board d'organisation d'événement par phases (Lieu, Intervenants, Logistique, Communication) avec budget consommé, échéances et J-x.
 * prompt: Create an event planning board for a conference: header with event name, date, "D−24" countdown pill and a budget bar ($18.4k of $25k spent); four columns (Venue, Speakers, Logistics, Marketing) with cards showing task, owner initials, cost and due date, plus a status dot; cards can be marked done with a checkbox which strikes them through and adds their cost to the spent budget; overdue cards show a red due date; horizontal scroll on mobile. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const columns = ['Venue', 'Speakers', 'Logistics', 'Marketing'];
const initial = [
  { id: 1, col: 0, title: 'Sign venue contract', owner: 'AD', cost: 9000, due: 'Sep 30', late: false, done: true },
  { id: 2, col: 0, title: 'Floor plan & stage', owner: 'LM', cost: 1200, due: 'Oct 20', late: false, done: false },
  { id: 3, col: 1, title: 'Confirm keynote', owner: 'MT', cost: 2500, due: 'Oct 10', late: true, done: false },
  { id: 4, col: 1, title: 'Speaker travel', owner: 'MT', cost: 3400, due: 'Oct 25', late: false, done: false },
  { id: 5, col: 2, title: 'Catering for 300', owner: 'KM', cost: 5400, due: 'Oct 28', late: false, done: true },
  { id: 6, col: 2, title: 'Badges & lanyards', owner: 'KM', cost: 600, due: 'Oct 30', late: false, done: false },
  { id: 7, col: 3, title: 'Launch ticket sales', owner: 'IR', cost: 0, due: 'Sep 15', late: false, done: true },
  { id: 8, col: 3, title: 'Sponsor deck', owner: 'IR', cost: 800, due: 'Oct 8', late: true, done: false },
];
const budget = 25000;

export function EventPlanningBoard() {
  const [cards, setCards] = useState(initial);
  const spent = cards.filter((card) => card.done).reduce((sum, card) => sum + card.cost, 0) + 3600;

  return (
    <section className="w-full max-w-5xl rounded-3xl bg-gradient-to-br from-fuchsia-50 via-white to-sky-50 p-5 dark:from-fuchsia-950/40 dark:via-zinc-950 dark:to-sky-950/40">
      <div className="flex flex-wrap items-center gap-3"><h3 className="text-lg font-semibold text-zinc-950 dark:text-white">DesignConf Dakar</h3><span className="text-sm text-zinc-500">Nov 6 · 300 guests</span><span className="rounded-full bg-fuchsia-600 px-2.5 py-0.5 text-xs font-semibold text-white">D−24</span></div>
      <div className="mt-3"><div className="flex justify-between text-xs text-zinc-600 dark:text-zinc-400"><span>Budget</span><span aria-live="polite" className="tabular-nums">${spent.toLocaleString('en-US')} of ${budget.toLocaleString('en-US')}</span></div><div className="mt-1 h-2 rounded-full bg-white dark:bg-white/10"><div className={`h-full rounded-full transition-all ${spent > budget ? 'bg-rose-500' : 'bg-gradient-to-r from-fuchsia-500 to-sky-500'}`} style={{ width: `${Math.min(100, (spent / budget) * 100)}%` }} /></div></div>
      <div className="mt-5 flex gap-3 overflow-x-auto pb-1" data-lenis-prevent>
        {columns.map((column, index) => {
          const list = cards.filter((card) => card.col === index);
          return (
            <section key={column} aria-label={column} className="w-56 shrink-0 rounded-2xl bg-white/70 p-3 dark:bg-white/5">
              <h4 className="flex justify-between text-sm font-semibold text-zinc-900 dark:text-zinc-100">{column}<span className="text-xs font-normal text-zinc-500">{list.filter((card) => card.done).length}/{list.length}</span></h4>
              <ul className="mt-2 space-y-2">
                {list.map((card) => (
                  <li key={card.id} className="rounded-xl bg-white p-3 shadow-sm dark:bg-zinc-900">
                    <label className="flex items-start gap-2 text-sm"><input type="checkbox" checked={card.done} onChange={() => setCards(cards.map((item) => (item.id === card.id ? { ...item, done: !item.done } : item)))} className="mt-0.5 accent-fuchsia-600" /><span className={card.done ? 'text-zinc-400 line-through' : 'text-zinc-900 dark:text-zinc-100'}>{card.title}</span></label>
                    <div className="mt-2 flex items-center gap-2 text-[11px]"><span className="grid size-5 place-items-center rounded-full bg-zinc-900 text-[9px] font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">{card.owner}</span><span className="tabular-nums text-zinc-500">{card.cost ? `$${card.cost.toLocaleString('en-US')}` : 'Free'}</span><span className={`ml-auto ${card.late && !card.done ? 'font-semibold text-rose-600 dark:text-rose-400' : 'text-zinc-500'}`}>{card.late && !card.done ? `Overdue · ${card.due}` : card.due}</span></div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </section>
  );
}
