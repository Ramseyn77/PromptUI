/**
 * @registry
 * name: Answer Feedback Form
 * category: AI Chat
 * style: SaaS
 * tags: recent
 * description: Après un pouce vers le bas, panneau de raisons rapides à cocher et commentaire pour améliorer la réponse.
 * prompt: Create an AI answer feedback flow: under an assistant message, thumbs up/down buttons (aria-pressed); thumbs down expands a panel with reason chips as toggle buttons (Inaccurate, Not helpful, Too long, Unsafe, Outdated code), an optional comment textarea and Submit, which collapses to "Thanks — this helps us improve." Light and dark mode.
 */
'use client';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useState } from 'react';

const reasons = ['Inaccurate', 'Not helpful', 'Too long', 'Unsafe', 'Outdated code'];

export function AnswerFeedbackForm() {
  const [vote, setVote] = useState<'up' | 'down' | null>('down');
  const [picked, setPicked] = useState<string[]>(['Outdated code']);
  const [sent, setSent] = useState(false);

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl bg-zinc-100 px-4 py-3 text-sm text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">Use <code className="rounded bg-white px-1 dark:bg-zinc-800">getServerSideProps</code> to fetch data on every request.</div>
      <div className="mt-2 flex gap-1">
        <button type="button" aria-label="Good answer" aria-pressed={vote === 'up'} onClick={() => { setVote('up'); setSent(true); }} className={`grid size-8 place-items-center rounded-lg ${vote === 'up' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}><ThumbsUp aria-hidden className="size-4" /></button>
        <button type="button" aria-label="Bad answer" aria-pressed={vote === 'down'} onClick={() => { setVote('down'); setSent(false); }} className={`grid size-8 place-items-center rounded-lg ${vote === 'down' ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}><ThumbsDown aria-hidden className="size-4" /></button>
      </div>
      {sent ? <p role="status" className="mt-2 text-xs text-zinc-500">Thanks — this helps us improve.</p> : vote === 'down' && (
        <form onSubmit={(event) => { event.preventDefault(); setSent(true); }} className="mt-2 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">What was wrong?</p>
          <div className="mt-2 flex flex-wrap gap-1.5">{reasons.map((reason) => { const on = picked.includes(reason); return <button key={reason} type="button" aria-pressed={on} onClick={() => setPicked((list) => (on ? list.filter((item) => item !== reason) : [...list, reason]))} className={`rounded-full border px-2.5 py-1 text-xs font-medium ${on ? 'border-rose-400 bg-rose-50 text-rose-800 dark:border-rose-500/50 dark:bg-rose-500/10 dark:text-rose-200' : 'border-zinc-300 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300'}`}>{reason}</button>; })}</div>
          <textarea aria-label="Additional comments" rows={2} placeholder="Tell us more (optional)" className="mt-3 w-full resize-none rounded-xl border border-zinc-300 bg-transparent p-2 text-sm text-zinc-900 outline-none focus:border-teal-500 dark:border-zinc-700 dark:text-zinc-100" />
          <button type="submit" disabled={!picked.length} className="mt-2 rounded-lg bg-zinc-950 px-3 py-1.5 text-sm font-semibold text-white disabled:opacity-40 dark:bg-white dark:text-zinc-950">Submit</button>
        </form>
      )}
    </div>
  );
}
