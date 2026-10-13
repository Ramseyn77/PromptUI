/**
 * @registry
 * name: Poll Card
 * category: Cards
 * style: SaaS
 * tags: recent
 * description: Carte de sondage : choix unique, résultats révélés après le vote avec barres animées, votre choix marqué, temps restant et changement de vote.
 * prompt: Create a poll card: author header, question, four options as a radiogroup; after voting, each option turns into a result bar that animates to its percentage with the vote count, the user's choice gets a check and bold label, the leading option is tinted; footer shows total votes, "2 days left" and a "Change vote" link that returns to voting; results are announced via aria-live. Light and dark mode.
 */
'use client';
import { Check } from 'lucide-react';
import { useId, useState } from 'react';

const options = [['Tailwind CSS', 412], ['CSS Modules', 138], ['Vanilla Extract', 64], ['Styled Components', 97]] as const;

export function PollCard() {
  const uid = useId();
  const [choice, setChoice] = useState<number | null>(null);
  const [voted, setVoted] = useState(false);
  const counts = options.map(([, count], index) => count + (voted && choice === index ? 1 : 0));
  const total = counts.reduce((sum, value) => sum + value, 0);
  const leader = counts.indexOf(Math.max(...counts));

  return (
    <article className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center gap-2 text-xs text-zinc-500"><span className="grid size-7 place-items-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">FE</span><span className="font-medium text-zinc-900 dark:text-zinc-100">Frontend Guild</span>· poll</div>
      <h3 id={`${uid}-q`} className="mt-3 font-semibold text-zinc-950 dark:text-white">How do you style React apps in 2026?</h3>
      {!voted ? (
        <form onSubmit={(event) => { event.preventDefault(); if (choice !== null) setVoted(true); }}>
          <div role="radiogroup" aria-labelledby={`${uid}-q`} className="mt-3 space-y-2">
            {options.map(([label], index) => <label key={label} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-sm has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-indigo-500 ${choice === index ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10' : 'border-zinc-200 hover:border-zinc-300 dark:border-zinc-700'}`}><input type="radio" name={`${uid}-poll`} checked={choice === index} onChange={() => setChoice(index)} className="accent-indigo-600" /><span className="text-zinc-800 dark:text-zinc-200">{label}</span></label>)}
          </div>
          <button type="submit" disabled={choice === null} className="mt-4 w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white disabled:opacity-40">Vote</button>
        </form>
      ) : (
        <ul aria-live="polite" className="mt-3 space-y-2">
          {options.map(([label], index) => {
            const percent = Math.round((counts[index] / total) * 100);
            return (
              <li key={label} className="relative overflow-hidden rounded-xl bg-zinc-100 px-3 py-2.5 text-sm dark:bg-zinc-800">
                <span aria-hidden className={`absolute inset-y-0 left-0 rounded-xl transition-[width] duration-700 ease-out ${index === leader ? 'bg-indigo-200 dark:bg-indigo-500/30' : 'bg-zinc-200 dark:bg-zinc-700'}`} style={{ width: `${percent}%` }} />
                <span className="relative flex items-center gap-2"><span className={`flex-1 ${choice === index ? 'font-semibold text-zinc-950 dark:text-white' : 'text-zinc-700 dark:text-zinc-300'}`}>{label}{choice === index && <Check aria-label="Your vote" className="ml-1.5 inline size-3.5 text-indigo-600 dark:text-indigo-400" />}</span><span className="font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">{percent}%</span></span>
              </li>
            );
          })}
        </ul>
      )}
      <div className="mt-4 flex items-center justify-between text-xs text-zinc-500"><span>{total.toLocaleString('en-US')} votes · 2 days left</span>{voted && <button type="button" onClick={() => setVoted(false)} className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">Change vote</button>}</div>
    </article>
  );
}
