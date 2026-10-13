/**
 * @registry
 * name: Travel Itinerary Board
 * category: Boards
 * style: Editorial
 * tags: featured, recent
 * description: Itinéraire de voyage jour par jour en colonnes : activités par horaire, catégorie, déplacements entre lieux, budget du jour et idées à placer.
 * prompt: Create a travel itinerary board: columns for Day 1–4 (date + city) with time-ordered activity cards (time, emoji category, title, place, cost) and small transit connectors between cards ("12 min walk"); a left "Ideas" column of unscheduled activities where each idea has a "Add to…" day select that moves it into that day sorted by time; each day shows its total spend; horizontal scroll with snap on mobile; serif headings on a paper background. Light (paper) and dark mode.
 */
'use client';
import { useState } from 'react';

type Item = { id: number; day: number | null; time: string; icon: string; title: string; place: string; cost: number };
const days = [['Day 1', 'Thu · Marrakech'], ['Day 2', 'Fri · Marrakech'], ['Day 3', 'Sat · Essaouira'], ['Day 4', 'Sun · Essaouira']];
const initial: Item[] = [
  { id: 1, day: 0, time: '10:00', icon: '🕌', title: 'Bahia Palace', place: 'Medina', cost: 7 },
  { id: 2, day: 0, time: '13:00', icon: '🍲', title: 'Lunch at Nomad', place: 'Rahba Kedima', cost: 22 },
  { id: 3, day: 0, time: '17:30', icon: '🌅', title: 'Rooftop sunset', place: 'Jemaa el-Fnaa', cost: 6 },
  { id: 4, day: 1, time: '09:00', icon: '🌿', title: 'Jardin Majorelle', place: 'Gueliz', cost: 15 },
  { id: 5, day: 2, time: '11:00', icon: '🚌', title: 'Bus to Essaouira', place: 'Supratours', cost: 9 },
  { id: 6, day: 3, time: '08:00', icon: '🏄', title: 'Surf lesson', place: 'Plage', cost: 35 },
  { id: 7, day: null, time: '15:00', icon: '🛍️', title: 'Souk shopping', place: 'Medina', cost: 40 },
  { id: 8, day: null, time: '19:30', icon: '🐟', title: 'Fish market dinner', place: 'Port', cost: 18 },
  { id: 9, day: null, time: '10:30', icon: '🧖', title: 'Hammam', place: 'Riad', cost: 30 },
];

export function TravelItineraryBoard() {
  const [items, setItems] = useState(initial);
  const ideas = items.filter((item) => item.day === null);
  const card = (item: Item) => <><p className="text-[11px] font-semibold tabular-nums text-amber-700 dark:text-amber-400">{item.time}</p><p className="mt-0.5 text-sm font-medium text-zinc-950 dark:text-white"><span aria-hidden className="mr-1">{item.icon}</span>{item.title}</p><p className="text-xs text-zinc-500">{item.place} · €{item.cost}</p></>;

  return (
    <div className="flex w-full max-w-5xl snap-x gap-3 overflow-x-auto rounded-3xl bg-[#f6f0e4] p-4 dark:bg-zinc-950" data-lenis-prevent>
      <section aria-label="Ideas" className="w-52 shrink-0 snap-start rounded-2xl border-2 border-dashed border-zinc-900/15 p-3 dark:border-white/15">
        <h3 className="font-serif text-lg text-zinc-950 dark:text-white">Ideas <span className="font-sans text-xs text-zinc-500">{ideas.length}</span></h3>
        <ul className="mt-2 space-y-2">{ideas.map((item) => <li key={item.id} className="rounded-xl bg-white/80 p-3 dark:bg-zinc-900">{card(item)}<select aria-label={`Add ${item.title} to a day`} value="" onChange={(event) => setItems(items.map((entry) => (entry.id === item.id ? { ...entry, day: Number(event.target.value) } : entry)))} className="mt-2 w-full rounded-md border border-zinc-200 bg-transparent px-1.5 py-1 text-xs text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"><option value="" disabled>Add to…</option>{days.map(([label], index) => <option key={label} value={index}>{label}</option>)}</select></li>)}{!ideas.length && <li className="text-xs text-zinc-500">All ideas are planned ✓</li>}</ul>
      </section>
      {days.map(([label, sub], index) => {
        const list = items.filter((item) => item.day === index).sort((a, b) => a.time.localeCompare(b.time));
        return (
          <section key={label} aria-label={`${label}, ${sub}`} className="w-56 shrink-0 snap-start">
            <h3 className="font-serif text-lg text-zinc-950 dark:text-white">{label}</h3>
            <p className="text-xs text-zinc-500">{sub} · <span className="tabular-nums">€{list.reduce((sum, item) => sum + item.cost, 0)}</span></p>
            <ol className="mt-2">
              {list.map((item, position) => (
                <li key={item.id}>
                  {position > 0 && <p aria-hidden className="ml-4 border-l-2 border-dotted border-zinc-900/20 py-1 pl-3 text-[10px] text-zinc-500 dark:border-white/20">{(item.id * 7) % 20 + 5} min walk</p>}
                  <div className="rounded-xl bg-white p-3 shadow-sm dark:bg-zinc-900">{card(item)}{item.id > 6 && <button type="button" onClick={() => setItems(items.map((entry) => (entry.id === item.id ? { ...entry, day: null } : entry)))} className="mt-1 text-[11px] text-zinc-500 underline">Unplan</button>}</div>
                </li>
              ))}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
