/**
 * @registry
 * name: App Rating Prompt CTA
 * category: CTA
 * style: Glass
 * tags: recent
 * description: Demande de note in-app en deux temps : étoiles, puis redirection vers le store pour 4–5 étoiles ou formulaire de retour privé pour 1–3.
 * prompt: Create an in-app rating prompt rendered in flow (defaultOpen) on a glass card: "Enjoying Habitly?" with five star buttons as a radiogroup (hover preview, arrow keys); choosing 4–5 stars shows "Thanks! Would you rate us on the store?" with "Rate on store" and "Not now", choosing 1–3 shows a short private feedback textarea with Send; after sending or rating it shows a thank-you and closes; "Maybe later" dismisses; state changes announced via aria-live. Light and dark mode.
 */
'use client';
import { Star, X } from 'lucide-react';
import { useRef, useState, type KeyboardEvent } from 'react';

export function AppRatingPromptCta({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [done, setDone] = useState(false);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const next = Math.min(5, Math.max(1, (rating || 0) + (event.key === 'ArrowRight' ? 1 : -1)));
    setRating(next);
    refs.current[next - 1]?.focus();
  }

  if (!open) return <button type="button" onClick={() => { setOpen(true); setDone(false); setRating(0); }} className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Show rating prompt</button>;

  return (
    <div className="w-full max-w-sm rounded-[2rem] bg-[linear-gradient(135deg,#fde68a,#fbcfe8,#c7d2fe)] p-3 dark:bg-[linear-gradient(135deg,#78350f,#831843,#312e81)]">
      <section aria-label="Rate the app" className="relative rounded-3xl border border-white/60 bg-white/65 p-6 text-center backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/65">
        <button type="button" aria-label="Close" onClick={() => setOpen(false)} className="absolute right-3 top-3 grid size-8 place-items-center rounded-full text-zinc-500 hover:bg-black/5 dark:hover:bg-white/10"><X aria-hidden className="size-4" /></button>
        <div aria-live="polite">
          {done ? <p className="py-6 font-semibold text-zinc-950 dark:text-white">Thank you! 💛 It really helps.</p> : (
            <>
              <span aria-hidden className="mx-auto grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-rose-500 text-2xl shadow-lg">🌱</span>
              <h3 className="mt-4 text-lg font-semibold text-zinc-950 dark:text-white">Enjoying Habitly?</h3>
              <div role="radiogroup" aria-label="Rating" onKeyDown={onKeyDown} onMouseLeave={() => setHover(0)} className="mt-3 flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((value) => <button key={value} ref={(node) => { refs.current[value - 1] = node; }} type="button" role="radio" aria-checked={rating === value} aria-label={`${value} star${value > 1 ? 's' : ''}`} tabIndex={(rating || 1) === value ? 0 : -1} onMouseEnter={() => setHover(value)} onClick={() => setRating(value)} className="rounded-md p-0.5 transition-transform hover:scale-110"><Star aria-hidden className={`size-8 ${(hover || rating) >= value ? 'fill-amber-400 text-amber-400' : 'text-zinc-300 dark:text-zinc-600'}`} /></button>)}
              </div>
              {rating >= 4 && <div className="mt-4"><p className="text-sm text-zinc-700 dark:text-zinc-300">Thanks! Would you rate us on the store?</p><div className="mt-3 flex gap-2"><button type="button" onClick={() => setDone(true)} className="flex-1 rounded-xl bg-zinc-950 py-2 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Rate on store</button><button type="button" onClick={() => setOpen(false)} className="flex-1 rounded-xl py-2 text-sm text-zinc-600 dark:text-zinc-400">Not now</button></div></div>}
              {rating > 0 && rating <= 3 && <form onSubmit={(event) => { event.preventDefault(); setDone(true); }} className="mt-4 text-left"><label className="text-sm text-zinc-700 dark:text-zinc-300">What could be better?<textarea rows={3} className="mt-1 w-full resize-none rounded-xl border border-white/70 bg-white/80 px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-rose-400/40 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-100" /></label><button type="submit" className="mt-2 w-full rounded-xl bg-zinc-950 py-2 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Send privately</button></form>}
              {rating === 0 && <button type="button" onClick={() => setOpen(false)} className="mt-4 text-xs text-zinc-500 underline">Maybe later</button>}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
