/**
 * @registry
 * name: Interview Loop Board
 * category: Boards
 * style: Minimal
 * tags: recent
 * description: Board de processus d'entretiens pour un candidat : étapes du parcours, interviewers, scorecards notées, avis consolidés et décision finale.
 * prompt: Create an interview loop board for one candidate: header with candidate initials, name, role and a stage pill; a horizontal row of interview cards (Phone screen, Portfolio review, System design, Values) each with interviewer initials, time, status (Done, Scheduled, Pending feedback) and when done a 1–4 score with recommendation (Strong yes, Yes, No, Strong no) color-coded; clicking a card expands its notes; a consolidated summary row averages scores; a decision radiogroup (Hire, Hold, Reject) with a Submit button and aria-live confirmation. Light and dark mode.
 */
'use client';
import { useId, useState } from 'react';

const interviews = [
  { title: 'Phone screen', who: 'IR', time: 'Oct 2', status: 'Done', score: 4, notes: 'Clear communicator, strong motivation for the role.' },
  { title: 'Portfolio review', who: 'AD', time: 'Oct 6', status: 'Done', score: 3, notes: 'Great craft, could go deeper on research methods.' },
  { title: 'System design', who: 'LM', time: 'Oct 9', status: 'Pending feedback', score: 0, notes: '' },
  { title: 'Values', who: 'SO', time: 'Oct 13', status: 'Scheduled', score: 0, notes: '' },
];
const verdict = ['', 'Strong no', 'No', 'Yes', 'Strong yes'];
const tone = ['', 'bg-rose-500', 'bg-orange-400', 'bg-emerald-400', 'bg-emerald-600'];

export function InterviewLoopBoard() {
  const uid = useId();
  const [open, setOpen] = useState<number | null>(1);
  const [decision, setDecision] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const scored = interviews.filter((item) => item.score);
  const average = scored.reduce((sum, item) => sum + item.score, 0) / Math.max(1, scored.length);

  return (
    <section className="w-full max-w-4xl rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-full bg-amber-100 font-semibold text-amber-800 dark:bg-amber-500/20 dark:text-amber-200">ZL</span><div className="flex-1"><p className="font-semibold text-zinc-950 dark:text-white">Zoe Laurent</p><p className="text-sm text-zinc-500">Senior Product Designer</p></div><span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">Onsite loop</span></div>
      <ol className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {interviews.map((item, index) => (
          <li key={item.title}>
            <button type="button" aria-expanded={open === index} onClick={() => setOpen(open === index ? null : index)} className={`w-full rounded-xl border p-3 text-left transition ${open === index ? 'border-zinc-900 dark:border-zinc-100' : 'border-zinc-200 hover:border-zinc-300 dark:border-zinc-800'}`}>
              <div className="flex items-center gap-2"><span className="text-xs font-semibold text-zinc-400">{index + 1}</span><p className="flex-1 text-sm font-semibold text-zinc-950 dark:text-white">{item.title}</p><span className="grid size-6 place-items-center rounded-full bg-zinc-100 text-[10px] font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">{item.who}</span></div>
              <p className="mt-1 text-xs text-zinc-500">{item.time} · <span className={item.status === 'Pending feedback' ? 'text-amber-600 dark:text-amber-400' : ''}>{item.status}</span></p>
              {item.score > 0 && <p className="mt-2 flex items-center gap-2 text-xs font-medium text-zinc-800 dark:text-zinc-200"><span className="flex gap-0.5" aria-hidden>{[1, 2, 3, 4].map((dot) => <span key={dot} className={`h-1.5 w-4 rounded-full ${dot <= item.score ? tone[item.score] : 'bg-zinc-200 dark:bg-zinc-700'}`} />)}</span>{verdict[item.score]}</p>}
              {open === index && <p className="mt-2 border-t border-zinc-100 pt-2 text-xs leading-relaxed text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">{item.notes || 'No feedback yet.'}</p>}
            </button>
          </li>
        ))}
      </ol>
      <div className="mt-5 flex flex-wrap items-center gap-4 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-900">
        <p className="text-sm text-zinc-700 dark:text-zinc-300">Average <strong className="text-zinc-950 dark:text-white">{average.toFixed(1)} / 4</strong> from {scored.length} of {interviews.length} interviews</p>
        <div role="radiogroup" aria-label="Decision" className="ml-auto flex gap-1.5">{['Hire', 'Hold', 'Reject'].map((value) => <label key={value} className={`cursor-pointer rounded-lg border px-3 py-1.5 text-sm has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-indigo-500 ${decision === value ? 'border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-900' : 'border-zinc-300 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300'}`}><input type="radio" name={`${uid}-decision`} checked={decision === value} onChange={() => { setDecision(value); setSubmitted(false); }} className="sr-only" />{value}</label>)}</div>
        <button type="button" disabled={!decision} onClick={() => setSubmitted(true)} className="rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-semibold text-white disabled:opacity-40">Submit</button>
        <p aria-live="polite" className="w-full text-xs text-emerald-700 dark:text-emerald-400">{submitted ? `Decision “${decision}” sent to the hiring manager.` : ''}</p>
      </div>
    </section>
  );
}
