/**
 * @registry
 * name: Rating Matrix Form
 * category: Forms
 * style: Minimal
 * tags: recent
 * description: Questionnaire en matrice : plusieurs critères notés de 1 à 5 avec boutons radio alignés, ligne par ligne.
 * prompt: Create a survey rating matrix: rows are criteria (Ease of use, Speed, Design, Support), columns are 1–5 with header labels (Poor … Excellent); each row is a radiogroup (fieldset with legend visually hidden) of styled radio dots; answered rows get a subtle tint; progress "3 of 4 answered" and Submit enabled when complete. On mobile the scale labels collapse to numbers. Light and dark mode.
 */
'use client';
import { useId, useState } from 'react';

const criteria = ['Ease of use', 'Speed', 'Design', 'Support'];
const scale = ['Poor', 'Fair', 'Good', 'Great', 'Excellent'];

export function RatingMatrixForm() {
  const uid = useId();
  const [answers, setAnswers] = useState<Record<string, number>>({ 'Ease of use': 4, Speed: 5 });
  const count = Object.keys(answers).length;

  return (
    <form onSubmit={(event) => event.preventDefault()} className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="font-semibold text-zinc-900 dark:text-zinc-100">Rate your experience</p>
      <div aria-hidden className="mt-4 grid grid-cols-[7rem_repeat(5,1fr)] text-center text-[10px] text-zinc-500">
        <span />{scale.map((label, index) => <span key={label}><span className="hidden sm:inline">{label}</span><span className="sm:hidden">{index + 1}</span></span>)}
      </div>
      {criteria.map((criterion) => (
        <fieldset key={criterion} className={`grid grid-cols-[7rem_repeat(5,1fr)] items-center rounded-lg py-2 transition-colors ${answers[criterion] ? 'bg-teal-50/60 dark:bg-teal-400/5' : ''}`}>
          <legend className="sr-only">{criterion}</legend>
          <span aria-hidden className="pl-2 text-sm text-zinc-800 dark:text-zinc-200">{criterion}</span>
          {scale.map((label, index) => (
            <label key={label} className="grid cursor-pointer place-items-center">
              <input type="radio" name={`${uid}-${criterion}`} className="peer sr-only" checked={answers[criterion] === index + 1} onChange={() => setAnswers((value) => ({ ...value, [criterion]: index + 1 }))} aria-label={`${criterion}: ${label}`} />
              <span aria-hidden className="grid size-5 place-items-center rounded-full border-2 border-zinc-300 transition peer-checked:border-teal-600 peer-focus-visible:ring-2 peer-focus-visible:ring-teal-500 peer-checked:[&>span]:scale-100 dark:border-zinc-600"><span className="size-2.5 scale-0 rounded-full bg-teal-600 transition-transform" /></span>
            </label>
          ))}
        </fieldset>
      ))}
      <div className="mt-4 flex items-center justify-between">
        <span aria-live="polite" className="text-xs text-zinc-500">{count} of {criteria.length} answered</span>
        <button type="submit" disabled={count < criteria.length} className="rounded-lg bg-zinc-950 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40 dark:bg-white dark:text-zinc-950">Submit</button>
      </div>
    </form>
  );
}
