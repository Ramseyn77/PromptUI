/**
 * @registry
 * name: Event RSVP Form
 * category: Forms
 * style: Glass
 * tags: recent
 * description: Réponse à une invitation : Oui / Peut-être / Non, accompagnants, régime alimentaire et message à l'hôte.
 * prompt: Create an event RSVP form on a glassy card over a gradient: event title, date and place; a three-choice radiogroup (Going / Maybe / Can't go) as big buttons with emoji; when Going or Maybe, extra fields appear (number of guests stepper 0–3, dietary select, note to host); submit shows "See you there!" or "We'll miss you" accordingly. Light and dark mode.
 */
'use client';
import { useId, useState } from 'react';

const choices = [['going', '🎉', 'Going'], ['maybe', '🤔', 'Maybe'], ['no', '😢', 'Can’t go']] as const;

export function EventRsvpForm() {
  const uid = useId();
  const [choice, setChoice] = useState<string>('going');
  const [guests, setGuests] = useState(1);
  const [sent, setSent] = useState(false);

  return (
    <div className="w-full max-w-sm rounded-3xl bg-gradient-to-br from-amber-200 via-pink-200 to-violet-300 p-3 dark:from-amber-900/50 dark:via-pink-900/50 dark:to-violet-900/50">
      <form onSubmit={(event) => { event.preventDefault(); setSent(true); }} className="rounded-2xl border border-white/60 bg-white/70 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/70">
        <p className="text-xs font-semibold uppercase tracking-wider text-pink-700 dark:text-pink-300">You're invited</p>
        <h3 className="text-xl font-bold text-zinc-950 dark:text-white">Aïcha's 30th rooftop party</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">Sat, Nov 7 · 19:00 · Plateau, Dakar</p>
        {sent ? <p role="status" className="mt-5 rounded-xl bg-white/80 p-4 text-center font-semibold text-zinc-900 dark:bg-white/10 dark:text-white">{choice === 'no' ? 'We’ll miss you 💛' : 'See you there! 🥂'}<button type="button" onClick={() => setSent(false)} className="mt-1 block w-full text-xs font-normal text-zinc-500 underline">Edit response</button></p> : (
          <>
            <div role="radiogroup" aria-label="Your answer" className="mt-4 grid grid-cols-3 gap-2">{choices.map(([value, emoji, label]) => <button key={value} type="button" role="radio" aria-checked={choice === value} onClick={() => setChoice(value)} className={`rounded-xl py-3 text-center text-xs font-semibold transition ${choice === value ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950' : 'bg-white/70 text-zinc-700 hover:bg-white dark:bg-white/10 dark:text-zinc-200'}`}><span aria-hidden className="block text-xl">{emoji}</span>{label}</button>)}</div>
            {choice !== 'no' && (
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-sm text-zinc-800 dark:text-zinc-200"><span id={`${uid}-guests`}>Plus guests</span><div role="group" aria-labelledby={`${uid}-guests`} className="flex items-center gap-3"><button type="button" aria-label="Fewer guests" disabled={guests <= 0} onClick={() => setGuests((value) => value - 1)} className="size-7 rounded-full bg-white/80 font-bold disabled:opacity-40 dark:bg-white/10">−</button><output aria-live="polite" className="w-4 text-center tabular-nums">{guests}</output><button type="button" aria-label="More guests" disabled={guests >= 3} onClick={() => setGuests((value) => value + 1)} className="size-7 rounded-full bg-white/80 font-bold disabled:opacity-40 dark:bg-white/10">+</button></div></div>
                <label className="block text-xs text-zinc-600 dark:text-zinc-300">Dietary needs<select className="mt-1 w-full rounded-lg bg-white/80 px-2 py-2 text-sm text-zinc-900 dark:bg-white/10 dark:text-white"><option>None</option><option>Vegetarian</option><option>Vegan</option><option>Halal</option></select></label>
                <label className="block text-xs text-zinc-600 dark:text-zinc-300">Note to Aïcha<textarea rows={2} className="mt-1 w-full resize-none rounded-lg bg-white/80 p-2 text-sm text-zinc-900 dark:bg-white/10 dark:text-white" /></label>
              </div>
            )}
            <button type="submit" className="mt-4 w-full rounded-xl bg-pink-600 py-2.5 text-sm font-semibold text-white">Send RSVP</button>
          </>
        )}
      </form>
    </div>
  );
}
