/**
 * @registry
 * name: Feedback Form
 * category: Forms
 * style: Gradient
 * tags: recent
 * description: Formulaire de feedback avec humeur en emojis, categorie en pastilles et message optionnel.
 * prompt: Create a product feedback widget: a 5-emoji sentiment radiogroup (each emoji grows when selected), category chips (Bug, Idea, Praise) as a single-select group, an optional textarea, and a gradient submit button that becomes a "Thanks!" confirmation; submit disabled until a mood is chosen. Light and dark mode.
 */
'use client';
import { useState, type FormEvent } from 'react';

const moods = [['😡', 'Very bad'], ['🙁', 'Bad'], ['😐', 'Neutral'], ['🙂', 'Good'], ['😍', 'Love it']];
const categories = ['Bug', 'Idea', 'Praise'];

export function FeedbackForm() {
  const [mood, setMood] = useState<number | null>(null);
  const [category, setCategory] = useState('Idea');
  const [done, setDone] = useState(false);
  const submit = (event: FormEvent) => { event.preventDefault(); setDone(true); };

  if (done) return <div role="status" className="w-full max-w-sm rounded-3xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-950"><p className="text-4xl">🎉</p><p className="mt-2 font-semibold text-zinc-900 dark:text-white">Thanks for the feedback!</p><button type="button" onClick={() => { setDone(false); setMood(null); }} className="mt-3 text-sm text-teal-700 hover:underline dark:text-teal-400">Send more</button></div>;

  return (
    <form onSubmit={submit} className="w-full max-w-sm space-y-5 rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <fieldset>
        <legend className="text-sm font-semibold text-zinc-900 dark:text-white">How do you feel about PromptUI?</legend>
        <div className="mt-3 flex justify-between">
          {moods.map(([emoji, label], index) => (
            <label key={label} className={`cursor-pointer rounded-2xl p-1.5 text-3xl transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal-500 ${mood === index ? 'scale-125 bg-zinc-100 dark:bg-zinc-800' : mood === null ? 'hover:scale-110' : 'opacity-50 grayscale hover:opacity-100 hover:grayscale-0'}`}>
              <input type="radio" name="mood" className="sr-only" checked={mood === index} onChange={() => setMood(index)} />
              <span aria-hidden>{emoji}</span><span className="sr-only">{label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="text-sm font-semibold text-zinc-900 dark:text-white">Category</legend>
        <div className="mt-2 flex gap-2">{categories.map((name) => <button key={name} type="button" aria-pressed={category === name} onClick={() => setCategory(name)} className={`rounded-full px-3 py-1 text-sm font-medium ${category === name ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'border border-zinc-300 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300'}`}>{name}</button>)}</div>
      </fieldset>
      <label className="block text-sm font-semibold text-zinc-900 dark:text-white">Tell us more <span className="font-normal text-zinc-400">(optional)</span><textarea rows={3} className="mt-2 w-full resize-none rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm font-normal text-zinc-900 outline-none focus:border-teal-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white" /></label>
      <button type="submit" disabled={mood === null} className="w-full rounded-xl bg-gradient-to-r from-teal-500 to-violet-500 py-2.5 text-sm font-semibold text-white disabled:opacity-40">Send feedback</button>
    </form>
  );
}
