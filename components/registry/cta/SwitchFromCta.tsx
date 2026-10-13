/**
 * @registry
 * name: Switch From CTA
 * category: CTA
 * style: SaaS
 * tags: recent
 * description: Incitation à migrer depuis un outil concurrent : choix de l'outil actuel, étapes d'import en 3 temps, durée estimée et offre de mois offerts.
 * prompt: Create a "switch from another tool" CTA: a select of current tools (generic names: Spreadsheet, Tool A, Tool B, Other); based on the choice it shows a 3-step migration (Export, Import, Invite team) with time estimates and a note on what transfers ("Boards, comments and attachments"); an offer badge "3 months free when you switch"; a primary "Start import" button and "Talk to a migration expert" link; content changes are announced via aria-live; stacks on mobile. Light and dark mode.
 */
'use client';
import { ArrowRight, Download, Upload, Users } from 'lucide-react';
import { useId, useState } from 'react';

const tools: Record<string, { minutes: number[]; transfers: string }> = {
  Spreadsheet: { minutes: [2, 3, 1], transfers: 'Rows, columns and formulas as fields' },
  'Tool A': { minutes: [3, 5, 2], transfers: 'Boards, comments and attachments' },
  'Tool B': { minutes: [4, 6, 2], transfers: 'Projects, tasks, assignees and due dates' },
  Other: { minutes: [5, 8, 3], transfers: 'Anything you can export as CSV' },
};
const steps = [['Export', Download], ['Import', Upload], ['Invite team', Users]] as const;

export function SwitchFromCta() {
  const uid = useId();
  const [tool, setTool] = useState('Tool A');
  const data = tools[tool];
  const total = data.minutes.reduce((sum, value) => sum + value, 0);

  return (
    <section className="w-full max-w-2xl rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-wrap items-center gap-3"><h3 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">Switching is easier than you think</h3><span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300">3 months free when you switch</span></div>
      <label htmlFor={`${uid}-tool`} className="mt-4 flex flex-wrap items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">I’m currently using<select id={`${uid}-tool`} value={tool} onChange={(event) => setTool(event.target.value)} className="rounded-lg border border-zinc-300 bg-transparent px-2 py-1.5 font-medium text-zinc-950 dark:border-zinc-700 dark:text-white">{Object.keys(tools).map((name) => <option key={name}>{name}</option>)}</select></label>
      <div aria-live="polite">
        <ol className="mt-5 grid gap-3 sm:grid-cols-3">
          {steps.map(([label, Icon], index) => <li key={label} className="relative rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-900"><span className="grid size-9 place-items-center rounded-xl bg-white text-indigo-600 shadow-sm dark:bg-zinc-800 dark:text-indigo-400"><Icon aria-hidden className="size-4" /></span><p className="mt-3 text-sm font-semibold text-zinc-950 dark:text-white">{index + 1}. {label}</p><p className="text-xs text-zinc-500">~{data.minutes[index]} min</p>{index < 2 && <ArrowRight aria-hidden className="absolute -right-3 top-1/2 hidden size-5 -translate-y-1/2 text-zinc-300 sm:block dark:text-zinc-700" />}</li>)}
        </ol>
        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">About <strong className="text-zinc-950 dark:text-white">{total} minutes</strong> from {tool}. What comes along: {data.transfers}.</p>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-4"><a href="#" className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500">Start import</a><a href="#" className="text-sm font-medium text-zinc-700 underline underline-offset-4 dark:text-zinc-300">Talk to a migration expert</a></div>
    </section>
  );
}
