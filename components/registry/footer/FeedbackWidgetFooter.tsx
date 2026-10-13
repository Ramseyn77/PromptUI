/**
 * @registry
 * name: Feedback Widget Footer
 * category: Footer
 * style: Minimal
 * tags: recent
 * description: Pied de page de documentation : « Cette page vous a-t-elle aidé ? » avec réactions, commentaire optionnel, page précédente/suivante et date de mise à jour.
 * prompt: Create a documentation page footer: a "Was this page helpful?" row with four emoji reaction buttons (radiogroup); choosing one reveals an optional comment textarea and Send, then a thank-you message (aria-live); below, previous/next page cards with labels and titles; a meta row with "Last updated Oct 2, 2026", an "Edit this page" link and a "Report an issue" link. Light and dark mode.
 */
'use client';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useId, useState } from 'react';

const reactions = [['😞', 'Not helpful'], ['😐', 'Somewhat'], ['🙂', 'Helpful'], ['🤩', 'Very helpful']];

export function FeedbackWidgetFooter() {
  const uid = useId();
  const [choice, setChoice] = useState<number | null>(null);
  const [sent, setSent] = useState(false);

  return (
    <footer className="w-full max-w-3xl space-y-6 border-t border-zinc-200 px-4 pt-6 dark:border-zinc-800">
      <section aria-labelledby={`${uid}-title`} className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
        <div aria-live="polite">
          {sent ? <p className="text-sm text-zinc-700 dark:text-zinc-300">Thanks for the feedback — it goes straight to the docs team. 💛</p> : (
            <>
              <div className="flex flex-wrap items-center gap-3">
                <p id={`${uid}-title`} className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Was this page helpful?</p>
                <div role="radiogroup" aria-labelledby={`${uid}-title`} className="flex gap-1">{reactions.map(([emoji, label], index) => <button key={label} type="button" role="radio" aria-checked={choice === index} aria-label={label} onClick={() => setChoice(index)} className={`grid size-9 place-items-center rounded-full text-lg transition ${choice === index ? 'scale-110 bg-zinc-100 ring-2 ring-zinc-900 dark:bg-zinc-800 dark:ring-white' : 'grayscale hover:grayscale-0'}`}>{emoji}</button>)}</div>
              </div>
              {choice !== null && (
                <form onSubmit={(event) => { event.preventDefault(); setSent(true); }} className="mt-3 flex flex-col gap-2 sm:flex-row">
                  <label htmlFor={`${uid}-comment`} className="sr-only">Comment</label>
                  <textarea id={`${uid}-comment`} rows={2} placeholder={choice < 2 ? 'What was missing or confusing?' : 'Anything we could add? (optional)'} className="min-w-0 flex-1 resize-none rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-700 dark:text-zinc-100" />
                  <button type="submit" className="rounded-lg bg-zinc-950 px-4 py-2 text-sm font-semibold text-white sm:self-end dark:bg-white dark:text-zinc-950">Send</button>
                </form>
              )}
            </>
          )}
        </div>
      </section>
      <nav aria-label="Pagination" className="grid gap-3 sm:grid-cols-2">
        <a href="#" className="group rounded-2xl border border-zinc-200 p-4 hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"><span className="flex items-center gap-1 text-xs text-zinc-500"><ArrowLeft aria-hidden className="size-3.5 transition-transform group-hover:-translate-x-0.5" />Previous</span><span className="mt-1 block font-medium text-zinc-950 dark:text-white">Installation</span></a>
        <a href="#" className="group rounded-2xl border border-zinc-200 p-4 text-right hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"><span className="flex items-center justify-end gap-1 text-xs text-zinc-500">Next<ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" /></span><span className="mt-1 block font-medium text-zinc-950 dark:text-white">Theming</span></a>
      </nav>
      <div className="flex flex-wrap gap-x-5 gap-y-2 pb-2 text-xs text-zinc-500"><span>Last updated Oct 2, 2026</span><a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">Edit this page</a><a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">Report an issue</a></div>
    </footer>
  );
}
