/**
 * @registry
 * name: Affinity Map Board
 * category: Boards
 * style: Gradient
 * tags: recent
 * description: Board de synthèse de recherche UX : post-its d'insights à regrouper en clusters nommés, compteur par thème et notes non triées.
 * prompt: Create a research affinity map board: an "Unsorted" tray of sticky-note insights (quote + participant id) and three named clusters (Onboarding friction, Pricing confusion, Delight moments) with a soft tinted area each; each note has a small "Move to…" select to place it into a cluster or back to unsorted; clusters show a count and the biggest one gets a "Top theme" badge; a "New cluster" input adds a cluster; horizontal scroll on mobile. Light and dark mode.
 */
'use client';
import { useState, type FormEvent } from 'react';

const notesInit = [
  { id: 1, text: 'I didn’t know where to start after signing up', who: 'P3', group: 'Onboarding friction' },
  { id: 2, text: 'Is the Pro plan per seat or per workspace?', who: 'P1', group: 'Pricing confusion' },
  { id: 3, text: 'Templates felt like magic', who: 'P5', group: 'Delight moments' },
  { id: 4, text: 'The import step failed twice with my CSV', who: 'P2', group: 'Unsorted' },
  { id: 5, text: 'I loved the confetti when I finished setup', who: 'P4', group: 'Unsorted' },
  { id: 6, text: 'Annual discount wasn’t obvious', who: 'P6', group: 'Unsorted' },
  { id: 7, text: 'Too many emails in the first week', who: 'P3', group: 'Onboarding friction' },
];
const tints = ['bg-amber-100/70 dark:bg-amber-500/10', 'bg-sky-100/70 dark:bg-sky-500/10', 'bg-pink-100/70 dark:bg-pink-500/10', 'bg-emerald-100/70 dark:bg-emerald-500/10', 'bg-violet-100/70 dark:bg-violet-500/10'];

export function AffinityMapBoard() {
  const [notes, setNotes] = useState(notesInit);
  const [clusters, setClusters] = useState(['Onboarding friction', 'Pricing confusion', 'Delight moments']);
  const [name, setName] = useState('');
  const counts = clusters.map((cluster) => notes.filter((note) => note.group === cluster).length);
  const top = clusters[counts.indexOf(Math.max(...counts))];

  function add(event: FormEvent) {
    event.preventDefault();
    if (name.trim() && !clusters.includes(name.trim())) setClusters([...clusters, name.trim()]);
    setName('');
  }

  const Note = ({ note }: { note: (typeof notesInit)[number] }) => (
    <li className="rotate-[-0.6deg] rounded-sm bg-yellow-200 p-2.5 text-xs text-zinc-900 shadow-md even:rotate-[0.8deg] dark:bg-yellow-300">
      <p className="leading-snug">“{note.text}”</p>
      <div className="mt-2 flex items-center justify-between gap-1"><span className="font-semibold text-zinc-600">{note.who}</span><select aria-label={`Move note from ${note.who}`} value={note.group} onChange={(event) => setNotes((list) => list.map((item) => (item.id === note.id ? { ...item, group: event.target.value } : item)))} className="max-w-[7rem] rounded bg-white/60 px-1 py-0.5 text-[10px]"><option>Unsorted</option>{clusters.map((cluster) => <option key={cluster}>{cluster}</option>)}</select></div>
    </li>
  );

  return (
    <div className="w-full max-w-4xl rounded-3xl bg-gradient-to-br from-zinc-50 to-violet-50 p-4 dark:from-zinc-950 dark:to-violet-950/40">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-semibold text-zinc-950 dark:text-white">Interview synthesis · 6 participants</h3>
        <form onSubmit={add} className="ml-auto flex gap-1.5"><input aria-label="New cluster name" value={name} onChange={(event) => setName(event.target.value)} placeholder="New cluster" className="w-32 rounded-lg border border-zinc-300 bg-white px-2 py-1 text-xs dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100" /><button type="submit" className="rounded-lg bg-zinc-950 px-2.5 text-xs font-semibold text-white dark:bg-white dark:text-zinc-950">Add</button></form>
      </div>
      <div className="mt-4 flex gap-3 overflow-x-auto pb-2" data-lenis-prevent>
        <section aria-label="Unsorted" className="w-52 shrink-0 rounded-2xl border-2 border-dashed border-zinc-300 p-3 dark:border-zinc-700"><h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Unsorted · {notes.filter((note) => note.group === 'Unsorted').length}</h4><ul className="mt-2 space-y-2">{notes.filter((note) => note.group === 'Unsorted').map((note) => <Note key={note.id} note={note} />)}</ul></section>
        {clusters.map((cluster, index) => (
          <section key={cluster} aria-label={cluster} className={`w-52 shrink-0 rounded-2xl p-3 ${tints[index % tints.length]}`}>
            <h4 className="flex items-center gap-1.5 text-sm font-semibold text-zinc-900 dark:text-zinc-100">{cluster}<span className="text-xs font-normal text-zinc-500">{counts[index]}</span></h4>
            {cluster === top && counts[index] > 0 && <span className="mt-1 inline-block rounded-full bg-zinc-950 px-2 py-0.5 text-[10px] font-semibold text-white dark:bg-white dark:text-zinc-950">Top theme</span>}
            <ul className="mt-2 space-y-2">{notes.filter((note) => note.group === cluster).map((note) => <Note key={note.id} note={note} />)}</ul>
          </section>
        ))}
      </div>
    </div>
  );
}
