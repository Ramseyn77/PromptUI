/**
 * @registry
 * name: Memory Chips Panel
 * category: AI Chat
 * style: Glass
 * tags: recent
 * description: Panneau « Ce que l'assistant retient de vous » avec souvenirs supprimables, ajout et interrupteur global.
 * prompt: Create an AI memory panel: title "What I remember about you", a global memory switch (role="switch"), a list of memory chips grouped by category (Work, Preferences) each with a remove button and an undo toast, plus an input to add a new memory; when memory is off the list dims and a note explains it. Glass surface on a soft gradient. Light and dark mode.
 */
'use client';
import { Brain, X } from 'lucide-react';
import { useId, useState, type FormEvent } from 'react';

export function MemoryChipsPanel() {
  const [on, setOn] = useState(true);
  const titleId = useId();
  const [items, setItems] = useState([
    { group: 'Work', text: 'Product designer at Lumen' }, { group: 'Work', text: 'Uses Figma and Next.js' },
    { group: 'Preferences', text: 'Prefers short answers' }, { group: 'Preferences', text: 'Writes in French and English' },
  ]);
  const [removed, setRemoved] = useState<{ group: string; text: string } | null>(null);
  const [draft, setDraft] = useState('');

  const add = (event: FormEvent) => { event.preventDefault(); if (draft.trim()) { setItems((list) => [...list, { group: 'Preferences', text: draft.trim() }]); setDraft(''); } };

  return (
    <div className="w-full max-w-md rounded-3xl bg-gradient-to-br from-violet-100 to-sky-100 p-3 dark:from-violet-950/50 dark:to-sky-950/50">
      <div className="rounded-2xl border border-white/60 bg-white/70 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/70">
        <div className="flex items-center gap-2">
          <Brain aria-hidden className="size-5 text-violet-600 dark:text-violet-300" />
          <p id={titleId} className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">What I remember about you</p>
          <button type="button" role="switch" aria-checked={on} aria-labelledby={titleId} onClick={() => setOn((value) => !value)} className={`relative ml-auto h-5 w-9 rounded-full transition ${on ? 'bg-violet-600' : 'bg-zinc-300 dark:bg-zinc-700'}`}><span className={`absolute top-0.5 size-4 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-4' : 'translate-x-0.5'}`} /></button>
        </div>
        {!on && <p className="mt-2 text-xs text-zinc-500">Memory is off. New chats won't use or save these.</p>}
        <div className={`transition-opacity ${on ? '' : 'opacity-40'}`}>
          {['Work', 'Preferences'].map((group) => (
            <div key={group} className="mt-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">{group}</p>
              <ul className="mt-1.5 flex flex-wrap gap-1.5">{items.filter((item) => item.group === group).map((item) => <li key={item.text} className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs text-zinc-800 shadow-sm dark:bg-white/10 dark:text-zinc-100">{item.text}<button type="button" aria-label={`Forget ${item.text}`} onClick={() => { setItems((list) => list.filter((entry) => entry !== item)); setRemoved(item); }} className="rounded-full p-0.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-white/10"><X aria-hidden className="size-3" /></button></li>)}</ul>
            </div>
          ))}
          <form onSubmit={add} className="mt-3 flex gap-2"><input aria-label="New memory" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Remember that…" className="min-w-0 flex-1 rounded-lg border border-zinc-200 bg-white/80 px-2.5 py-1.5 text-xs text-zinc-900 outline-none focus:border-violet-500 dark:border-zinc-700 dark:bg-zinc-950/60 dark:text-zinc-100" /><button type="submit" className="rounded-lg bg-violet-600 px-3 text-xs font-semibold text-white">Add</button></form>
        </div>
        {removed && <p role="status" className="mt-3 flex items-center justify-between rounded-lg bg-zinc-900 px-3 py-1.5 text-xs text-white dark:bg-white dark:text-zinc-900">Forgot “{removed.text}”<button type="button" onClick={() => { setItems((list) => [...list, removed]); setRemoved(null); }} className="font-semibold underline">Undo</button></p>}
      </div>
    </div>
  );
}
