/**
 * @registry
 * name: Quick Notes Widget
 * category: Dashboard
 * style: Editorial
 * tags: recent
 * description: Bloc-notes de tableau de bord avec notes colorées, épinglage, ajout rapide et indicateur « enregistré ».
 * prompt: Create a quick notes dashboard widget: a textarea composer (Enter adds, Shift+Enter newline) with color dots to pick a note color, a grid of short sticky notes (2 columns) showing text and relative time, pin/delete icon buttons per note revealed on hover/focus, pinned notes first, and a subtle "Saved" indicator after each change. Light and dark mode.
 */
'use client';
import { Pin, Trash2 } from 'lucide-react';
import { useState, type KeyboardEvent } from 'react';

const colors = { amber: 'bg-amber-100 dark:bg-amber-500/15', sky: 'bg-sky-100 dark:bg-sky-500/15', rose: 'bg-rose-100 dark:bg-rose-500/15', emerald: 'bg-emerald-100 dark:bg-emerald-500/15' } as const;
type Color = keyof typeof colors;

export function QuickNotesWidget() {
  const [notes, setNotes] = useState([
    { id: 1, text: 'Call the printer about the Q4 brochures', color: 'amber' as Color, pinned: true, time: '2h' },
    { id: 2, text: 'Ask Ana for the new hero copy', color: 'sky' as Color, pinned: false, time: '5h' },
    { id: 3, text: 'Renew SSL before Friday', color: 'rose' as Color, pinned: false, time: '1d' },
  ]);
  const [draft, setDraft] = useState('');
  const [color, setColor] = useState<Color>('emerald');
  const [saved, setSaved] = useState(false);
  const touch = () => { setSaved(true); window.setTimeout(() => setSaved(false), 1200); };

  function onKey(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey && draft.trim()) {
      event.preventDefault();
      setNotes((list) => [{ id: Date.now(), text: draft.trim(), color, pinned: false, time: 'now' }, ...list]);
      setDraft('');
      touch();
    }
  }

  const sorted = [...notes].sort((a, b) => Number(b.pinned) - Number(a.pinned));

  return (
    <section className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between"><h3 className="font-serif text-lg font-semibold text-zinc-900 dark:text-zinc-100">Notes</h3><span aria-live="polite" className="text-xs text-emerald-600 dark:text-emerald-400">{saved ? 'Saved' : ''}</span></div>
      <textarea aria-label="New note" rows={2} value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={onKey} placeholder="Write a note and press Enter" className="mt-2 w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-sm text-zinc-900 outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100" />
      <div role="radiogroup" aria-label="Note color" className="mt-1 flex gap-1.5">{(Object.keys(colors) as Color[]).map((name) => <button key={name} type="button" role="radio" aria-checked={color === name} aria-label={name} onClick={() => setColor(name)} className={`size-5 rounded-full ${colors[name]} ${color === name ? 'ring-2 ring-zinc-900 ring-offset-1 dark:ring-white dark:ring-offset-zinc-950' : ''}`} />)}</div>
      <ul className="mt-3 grid grid-cols-2 gap-2">
        {sorted.map((note) => (
          <li key={note.id} className={`group relative min-h-24 rounded-xl p-3 text-sm text-zinc-800 dark:text-zinc-100 ${colors[note.color]}`}>
            <p className="pr-6">{note.text}</p>
            <p className="mt-2 text-[11px] text-zinc-500 dark:text-zinc-400">{note.pinned && '📌 '}{note.time}</p>
            <div className="absolute right-1.5 top-1.5 flex flex-col gap-0.5 opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100">
              <button type="button" aria-label={note.pinned ? 'Unpin note' : 'Pin note'} aria-pressed={note.pinned} onClick={() => { setNotes((list) => list.map((item) => (item.id === note.id ? { ...item, pinned: !item.pinned } : item))); touch(); }} className="grid size-6 place-items-center rounded-md text-zinc-600 hover:bg-black/5 dark:text-zinc-300 dark:hover:bg-white/10"><Pin aria-hidden className={`size-3.5 ${note.pinned ? 'fill-current' : ''}`} /></button>
              <button type="button" aria-label="Delete note" onClick={() => { setNotes((list) => list.filter((item) => item.id !== note.id)); touch(); }} className="grid size-6 place-items-center rounded-md text-zinc-600 hover:bg-black/5 hover:text-rose-600 dark:text-zinc-300 dark:hover:bg-white/10"><Trash2 aria-hidden className="size-3.5" /></button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
