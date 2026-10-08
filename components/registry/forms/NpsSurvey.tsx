/**
 * @registry
 * name: NPS Survey
 * category: Forms
 * style: Minimal
 * tags: recent
 * description: Questionnaire NPS de 0 à 10 avec couleurs détracteur / passif / promoteur et question de suivi adaptée.
 * prompt: Create an NPS survey card: "How likely are you to recommend us?" with an 11-button scale 0–10 (radiogroup) colored by band when selected (0–6 rose, 7–8 amber, 9–10 emerald), "Not likely / Very likely" captions, then a follow-up textarea whose question adapts to the band, and a Submit → thank-you state. Buttons wrap to 2 rows on narrow widths. Light and dark mode.
 */
'use client';
import { useId, useState } from 'react';

export function NpsSurvey() {
  const uid = useId();
  const [score, setScore] = useState<number | null>(9);
  const [done, setDone] = useState(false);
  const band = score === null ? null : score <= 6 ? 'detractor' : score <= 8 ? 'passive' : 'promoter';
  const tone = { detractor: 'bg-rose-500 text-white', passive: 'bg-amber-400 text-amber-950', promoter: 'bg-emerald-500 text-white' };
  const question = { detractor: 'What disappointed you the most?', passive: 'What would make it a 10?', promoter: 'What do you love the most?' };

  if (done) return <div role="status" className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-950"><p className="font-semibold text-zinc-900 dark:text-zinc-100">Thank you! 🙏</p><p className="mt-1 text-sm text-zinc-500">Your answer goes straight to the product team.</p></div>;

  return (
    <form onSubmit={(event) => { event.preventDefault(); setDone(true); }} className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <p id={`${uid}-nps-q`} className="font-semibold text-zinc-900 dark:text-zinc-100">How likely are you to recommend Acme to a friend?</p>
      <div role="radiogroup" aria-labelledby={`${uid}-nps-q`} className="mt-4 grid grid-cols-6 gap-1.5 sm:grid-cols-11">
        {Array.from({ length: 11 }, (_, value) => <button key={value} type="button" role="radio" aria-checked={score === value} onClick={() => setScore(value)} className={`h-9 rounded-lg border text-sm font-semibold tabular-nums transition ${score === value && band ? `${tone[band]} border-transparent` : 'border-zinc-200 text-zinc-700 hover:border-zinc-400 dark:border-zinc-800 dark:text-zinc-300'}`}>{value}</button>)}
      </div>
      <div className="mt-1.5 flex justify-between text-[11px] text-zinc-400"><span>Not likely</span><span>Very likely</span></div>
      {band && (
        <label className="mt-4 block text-sm font-medium text-zinc-800 dark:text-zinc-200">{question[band]}
          <textarea rows={3} className="mt-1.5 w-full resize-none rounded-xl border border-zinc-300 bg-transparent p-2.5 text-sm font-normal text-zinc-900 outline-none focus:border-teal-500 dark:border-zinc-700 dark:text-zinc-100" />
        </label>
      )}
      <button type="submit" disabled={score === null} className="mt-3 w-full rounded-xl bg-zinc-950 py-2.5 text-sm font-semibold text-white disabled:opacity-40 dark:bg-white dark:text-zinc-950">Submit</button>
    </form>
  );
}
