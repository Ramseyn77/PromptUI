/**
 * @registry
 * name: AI Summary Card
 * category: AI Chat
 * style: Gradient
 * tags: featured, recent
 * description: Résumé IA d'un long fil avec points clés, décisions, actions assignées et bascule court / détaillé.
 * prompt: Create an AI thread summary card: sparkle header "Summary of 48 messages" with a Short/Detailed segmented toggle; key points as bullets, a "Decisions" section with check icons, "Action items" with assignee avatars and due dates (checkable), and a footer "Generated from #launch · 2 min ago" with thumbs up/down. Gradient border; light and dark mode.
 */
'use client';
import { CheckCircle2, Sparkles, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useState } from 'react';

export function AiSummaryCard() {
  const [detailed, setDetailed] = useState(false);
  const [done, setDone] = useState<string[]>([]);
  const actions = [['Ama', 'Update pricing page copy', 'Fri'], ['Leo', 'Fix iOS checkout bug', 'Thu'], ['Mia', 'Send press kit', 'Mon']];

  return (
    <article className="w-full max-w-md rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400 p-[1.5px]">
      <div className="rounded-[calc(1rem-1.5px)] bg-white p-5 dark:bg-zinc-950">
        <div className="flex items-center gap-2">
          <Sparkles aria-hidden className="size-4 text-fuchsia-500" />
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Summary of 48 messages</p>
          <div role="radiogroup" aria-label="Length" className="ml-auto flex rounded-md bg-zinc-100 p-0.5 text-xs dark:bg-zinc-900">{['Short', 'Detailed'].map((label) => <button key={label} type="button" role="radio" aria-checked={detailed === (label === 'Detailed')} onClick={() => setDetailed(label === 'Detailed')} className={`rounded px-2 py-0.5 ${detailed === (label === 'Detailed') ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white' : 'text-zinc-500'}`}>{label}</button>)}</div>
        </div>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
          <li>Launch moves to Oct 20 to finish the iOS fixes.</li>
          <li>Pricing stays at $12 with a new yearly discount.</li>
          {detailed && <><li>Support will add a launch FAQ and macros.</li><li>Press embargo lifts at 9:00 CET on launch day.</li></>}
        </ul>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Decisions</p>
        <p className="mt-1 flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300"><CheckCircle2 aria-hidden className="size-4 text-emerald-500" />Ship web first, iOS 48h later</p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Action items</p>
        <ul className="mt-1 space-y-1.5">{actions.map(([who, task, due]) => <li key={task}><label className={`flex items-center gap-2 text-sm ${done.includes(task) ? 'text-zinc-400 line-through' : 'text-zinc-700 dark:text-zinc-300'}`}><input type="checkbox" checked={done.includes(task)} onChange={() => setDone((list) => (list.includes(task) ? list.filter((item) => item !== task) : [...list, task]))} className="accent-fuchsia-600" /><span aria-hidden className="grid size-5 place-items-center rounded-full bg-fuchsia-100 text-[9px] font-bold text-fuchsia-700 dark:bg-fuchsia-500/20 dark:text-fuchsia-200">{who[0]}</span><span className="flex-1">{task}</span><span className="text-xs text-zinc-400">{due}</span></label></li>)}</ul>
        <div className="mt-4 flex items-center gap-2 border-t border-zinc-100 pt-3 text-xs text-zinc-400 dark:border-zinc-900"><span className="flex-1">Generated from #launch · 2 min ago</span><button type="button" aria-label="Helpful" className="grid size-7 place-items-center rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"><ThumbsUp aria-hidden className="size-3.5" /></button><button type="button" aria-label="Not helpful" className="grid size-7 place-items-center rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"><ThumbsDown aria-hidden className="size-3.5" /></button></div>
      </div>
    </article>
  );
}
