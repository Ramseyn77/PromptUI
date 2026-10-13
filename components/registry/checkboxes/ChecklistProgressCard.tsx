/**
 * @registry
 * name: Checklist Progress Card
 * category: Checkboxes
 * style: Glass
 * tags: featured, recent
 * description: Carte d'onboarding en verre : tâches à cocher avec description, anneau de progression qui se remplit et célébration à 100 %.
 * prompt: Create a glassy onboarding checklist card over a colorful gradient: header "Get started" with a circular SVG progress ring showing "3/5"; five task rows with a custom round checkbox, title, one-line description and an optional "Start" link; checking a task strikes it through and fills the ring; at 100% the ring turns emerald and a "You’re all set 🎉" message appears (aria-live); a "Hide checklist" link collapses it. Light and dark mode.
 */
'use client';
import { Check } from 'lucide-react';
import { useState } from 'react';

const tasks = [['Create your workspace', 'Name it and pick a URL'], ['Invite your team', 'Collaborate with up to 5 people free'], ['Connect a data source', 'Postgres, Sheets or CSV'], ['Build your first dashboard', 'Start from a template'], ['Set up alerts', 'Get notified in Slack or email']];

export function ChecklistProgressCard() {
  const [done, setDone] = useState<number[]>([0, 1, 2]);
  const [hidden, setHidden] = useState(false);
  const progress = done.length / tasks.length;
  const circumference = 2 * 3.1416 * 20;
  const complete = done.length === tasks.length;

  return (
    <div className="w-full max-w-md rounded-3xl bg-[linear-gradient(135deg,#a78bfa,#f472b6,#fbbf24)] p-5 dark:bg-[linear-gradient(135deg,#312e81,#831843,#78350f)]">
      {hidden ? <button type="button" onClick={() => setHidden(false)} className="w-full rounded-2xl bg-white/60 px-4 py-3 text-sm font-semibold text-zinc-900 backdrop-blur dark:bg-black/40 dark:text-white">Show setup checklist ({done.length}/{tasks.length})</button> : (
        <section className="rounded-2xl border border-white/50 bg-white/60 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/60">
          <div className="flex items-center gap-4">
            <div className="relative size-12 shrink-0">
              <svg viewBox="0 0 48 48" className="size-12 -rotate-90" aria-hidden><circle cx="24" cy="24" r="20" fill="none" strokeWidth="4" className="stroke-zinc-900/10 dark:stroke-white/10" /><circle cx="24" cy="24" r="20" fill="none" strokeWidth="4" strokeLinecap="round" strokeDasharray={circumference.toFixed(1)} strokeDashoffset={(circumference * (1 - progress)).toFixed(1)} className={`transition-[stroke-dashoffset] duration-500 ${complete ? 'stroke-emerald-500' : 'stroke-violet-600 dark:stroke-violet-400'}`} /></svg>
              <span className="absolute inset-0 grid place-items-center text-xs font-bold text-zinc-950 dark:text-white">{done.length}/{tasks.length}</span>
            </div>
            <div className="flex-1"><h3 className="font-semibold text-zinc-950 dark:text-white">Get started</h3><p aria-live="polite" className="text-xs text-zinc-600 dark:text-zinc-400">{complete ? 'You’re all set 🎉' : `${tasks.length - done.length} steps left`}</p></div>
            <button type="button" onClick={() => setHidden(true)} className="text-xs text-zinc-600 underline dark:text-zinc-400">Hide</button>
          </div>
          <ul className="mt-4 space-y-1">
            {tasks.map(([title, hint], index) => {
              const on = done.includes(index);
              return (
                <li key={title}>
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl p-2 hover:bg-white/50 dark:hover:bg-white/5">
                    <input type="checkbox" checked={on} onChange={() => setDone((list) => (on ? list.filter((item) => item !== index) : [...list, index]))} className="peer sr-only" />
                    <span aria-hidden className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border-2 transition peer-focus-visible:ring-2 peer-focus-visible:ring-violet-500 ${on ? 'border-violet-600 bg-violet-600 text-white dark:border-violet-400 dark:bg-violet-400 dark:text-zinc-950' : 'border-zinc-400 dark:border-zinc-500'}`}>{on && <Check className="size-3" />}</span>
                    <span className="flex-1"><span className={`block text-sm font-medium ${on ? 'text-zinc-500 line-through' : 'text-zinc-950 dark:text-white'}`}>{title}</span><span className="block text-xs text-zinc-600 dark:text-zinc-400">{hint}</span></span>
                  </label>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
