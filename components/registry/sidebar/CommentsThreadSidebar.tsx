/**
 * @registry
 * name: Comments Thread Sidebar
 * category: Sidebar
 * style: Minimal
 * tags: featured, recent
 * description: Panneau de commentaires de document : fils ancrés sur des passages surlignés, réponses, résolution et filtre Ouverts / Résolus.
 * prompt: Create a document comments sidebar beside a text: the document has highlighted passages, each linked to a comment thread in the sidebar; clicking a highlight or a thread selects both (thread gets a ring, highlight darkens); threads show author initials, time, text and replies, a reply input (Enter to send) and a Resolve button; a segmented filter (Open / Resolved) with counts; resolved threads remove the highlight; on mobile the sidebar stacks below the document. Light and dark mode.
 */
'use client';
import { Check } from 'lucide-react';
import { useState } from 'react';

type Thread = { id: number; quote: string; author: string; text: string; replies: string[]; resolved: boolean };
const initial: Thread[] = [
  { id: 1, quote: 'launch on November 18', author: 'LM', text: 'Can we confirm this with marketing first?', replies: ['Checking with Inès today.'], resolved: false },
  { id: 2, quote: '$19 per seat', author: 'KM', text: 'Should this be $24 to match the annual plan?', replies: [], resolved: false },
  { id: 3, quote: 'the design guild', author: 'MT', text: 'Typo fixed.', replies: [], resolved: true },
];

export function CommentsThreadSidebar() {
  const [threads, setThreads] = useState(initial);
  const [active, setActive] = useState<number | null>(2);
  const [filter, setFilter] = useState<'open' | 'resolved'>('open');
  const [drafts, setDrafts] = useState<Record<number, string>>({});
  const visible = threads.filter((thread) => (filter === 'open' ? !thread.resolved : thread.resolved));
  const mark = (quote: string) => { const thread = threads.find((item) => item.quote === quote && !item.resolved); return thread ? <button type="button" onClick={() => { setActive(thread.id); setFilter('open'); }} className={`rounded-sm px-0.5 ${active === thread.id ? 'bg-amber-300 dark:bg-amber-500/60' : 'bg-amber-100 hover:bg-amber-200 dark:bg-amber-500/25'}`}>{quote}</button> : quote; };

  return (
    <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white md:flex-row dark:border-zinc-800 dark:bg-zinc-950">
      <article className="flex-1 p-6 font-serif text-lg leading-relaxed text-zinc-800 dark:text-zinc-200">
        <h3 className="font-sans text-xl font-semibold text-zinc-950 dark:text-white">Project Aurora · brief</h3>
        <p className="mt-3">We plan to {mark('launch on November 18')}, starting with design partners. Pricing will start at {mark('$19 per seat')} for teams. Please keep this within {mark('the design guild')} until the announcement.</p>
      </article>
      <aside aria-label="Comments" className="w-full shrink-0 border-t border-zinc-200 bg-zinc-50 p-4 md:w-80 md:border-l md:border-t-0 dark:border-zinc-800 dark:bg-zinc-900">
        <div role="group" aria-label="Filter comments" className="grid grid-cols-2 rounded-lg bg-zinc-200/60 p-0.5 text-xs dark:bg-zinc-800">{(['open', 'resolved'] as const).map((value) => <button key={value} type="button" aria-pressed={filter === value} onClick={() => setFilter(value)} className={`rounded-md py-1 capitalize ${filter === value ? 'bg-white font-semibold shadow-sm dark:bg-zinc-700 dark:text-white' : 'text-zinc-600 dark:text-zinc-400'}`}>{value} · {threads.filter((thread) => (value === 'open' ? !thread.resolved : thread.resolved)).length}</button>)}</div>
        <ul className="mt-3 space-y-2">
          {visible.map((thread) => (
            <li key={thread.id}>
              <div role="group" aria-label={`Comment on “${thread.quote}”`} onClick={() => setActive(thread.id)} className={`rounded-xl bg-white p-3 text-sm shadow-sm transition dark:bg-zinc-950 ${active === thread.id ? 'ring-2 ring-amber-400' : ''}`}>
                <p className="truncate border-l-2 border-amber-400 pl-2 text-xs italic text-zinc-500">“{thread.quote}”</p>
                <p className="mt-2 flex items-start gap-2"><span className="grid size-6 shrink-0 place-items-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">{thread.author}</span><span className="text-zinc-800 dark:text-zinc-200">{thread.text}</span></p>
                {thread.replies.map((reply) => <p key={reply} className="ml-8 mt-1.5 text-zinc-600 dark:text-zinc-400"><span className="font-semibold">You:</span> {reply}</p>)}
                {!thread.resolved && (
                  <div className="mt-2 flex gap-1.5">
                    <input aria-label="Reply" value={drafts[thread.id] ?? ''} onChange={(event) => setDrafts({ ...drafts, [thread.id]: event.target.value })} onKeyDown={(event) => { if (event.key === 'Enter' && drafts[thread.id]?.trim()) { setThreads(threads.map((item) => (item.id === thread.id ? { ...item, replies: [...item.replies, drafts[thread.id].trim()] } : item))); setDrafts({ ...drafts, [thread.id]: '' }); } }} placeholder="Reply…" className="min-w-0 flex-1 rounded-md border border-zinc-200 bg-transparent px-2 py-1 text-xs text-zinc-900 outline-none dark:border-zinc-700 dark:text-zinc-100" />
                    <button type="button" aria-label="Resolve thread" onClick={() => setThreads(threads.map((item) => (item.id === thread.id ? { ...item, resolved: true } : item)))} className="grid size-7 place-items-center rounded-md text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10"><Check aria-hidden className="size-4" /></button>
                  </div>
                )}
                {thread.resolved && <button type="button" onClick={() => setThreads(threads.map((item) => (item.id === thread.id ? { ...item, resolved: false } : item)))} className="mt-2 text-xs text-zinc-500 underline">Reopen</button>}
              </div>
            </li>
          ))}
          {!visible.length && <li className="py-6 text-center text-sm text-zinc-500">No {filter} comments</li>}
        </ul>
      </aside>
    </div>
  );
}
