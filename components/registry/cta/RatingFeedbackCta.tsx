/**
 * @registry
 * name: Rating Feedback CTA
 * category: CTA
 * style: Minimal
 * tags: recent
 * description: Encart « Comment était votre expérience ? » avec 5 émotions, puis question adaptée et remerciement.
 * prompt: Create an in-app feedback CTA: "How was your experience?" with five emoji faces as a radiogroup (scale on hover, selected grows with a ring); low scores reveal a textarea "What went wrong?", high scores reveal a "Leave a review" button; sending shows a thank-you state. Light and dark mode.
 */
'use client';
import { useId, useState } from 'react';

const faces = ['😞', '🙁', '😐', '🙂', '😍'];

export function RatingFeedbackCta() {
  const [score, setScore] = useState<number | null>(null);
  const [sent, setSent] = useState(false);
  const id = useId();

  if (sent) return <div role="status" className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-950"><p className="text-3xl">💚</p><p className="mt-2 font-semibold text-zinc-900 dark:text-zinc-100">Thanks for the feedback!</p><button type="button" onClick={() => { setSent(false); setScore(null); }} className="mt-2 text-xs text-zinc-500 underline">Reset demo</button></div>;

  return (
    <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <p id={id} className="text-center font-semibold text-zinc-900 dark:text-zinc-100">How was your experience?</p>
      <div role="radiogroup" aria-labelledby={id} className="mt-4 flex justify-center gap-2">
        {faces.map((face, index) => (
          <button key={face} type="button" role="radio" aria-checked={score === index} aria-label={`${index + 1} out of 5`} onClick={() => setScore(index)} className={`grid size-11 place-items-center rounded-full text-2xl outline-none transition hover:scale-110 focus-visible:ring-2 focus-visible:ring-teal-500 ${score === index ? 'scale-125 bg-teal-50 ring-2 ring-teal-500 dark:bg-teal-400/10' : score !== null ? 'opacity-50' : ''}`}>{face}</button>
        ))}
      </div>
      {score !== null && (score <= 2 ? (
        <form onSubmit={(event) => { event.preventDefault(); setSent(true); }} className="mt-5">
          <label className="text-sm text-zinc-700 dark:text-zinc-300">What went wrong?
            <textarea rows={3} className="mt-1 w-full resize-none rounded-xl border border-zinc-300 bg-transparent p-2 text-sm text-zinc-900 outline-none focus:border-teal-500 dark:border-zinc-700 dark:text-zinc-100" />
          </label>
          <button type="submit" className="mt-2 w-full rounded-xl bg-zinc-950 py-2 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Send</button>
        </form>
      ) : (
        <div className="mt-5 text-center">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Glad you like it! Mind sharing a quick review?</p>
          <button type="button" onClick={() => setSent(true)} className="mt-3 rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white">Leave a review</button>
        </div>
      ))}
    </div>
  );
}
