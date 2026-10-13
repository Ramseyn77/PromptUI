/**
 * @registry
 * name: Feature Announcement CTA
 * category: CTA
 * style: Glass
 * tags: recent
 * description: Annonce de nouveauté en carrousel de 3 diapositives : visuel animé, puces de progression, « Essayer maintenant » et rappel plus tard.
 * prompt: Create a "What's new" feature announcement card rendered in flow (defaultOpen): a glass card with a 3-slide carousel (each with an animated gradient visual, title and one-sentence description), dot indicators as tab buttons, Back / Next buttons and arrow-key support; the last slide's primary action becomes "Try it now"; "Remind me later" closes it and shows a small "1 new feature" pill to reopen; slide changes are announced via aria-live. Light and dark mode.
 */
'use client';
import { Sparkles, X } from 'lucide-react';
import { useState, type KeyboardEvent } from 'react';

const slides = [
  { title: 'Ask your data anything', text: 'Type a question and get a chart back in seconds.', tone: 'from-violet-400 via-fuchsia-400 to-pink-400', shape: 'rounded-full' },
  { title: 'Shared workspaces', text: 'Invite clients to a read-only space with their own dashboards.', tone: 'from-sky-400 via-cyan-400 to-emerald-400', shape: 'rounded-2xl rotate-12' },
  { title: 'Scheduled reports', text: 'Send any dashboard as a PDF every Monday at 9:00.', tone: 'from-amber-300 via-orange-400 to-rose-400', shape: 'rounded-[40%_60%_55%_45%]' },
];

export function FeatureAnnouncementCta({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const last = index === slides.length - 1;

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') setIndex(Math.min(slides.length - 1, index + 1));
    if (event.key === 'ArrowLeft') setIndex(Math.max(0, index - 1));
    if (event.key === 'Escape') setOpen(false);
  }

  if (!open) return <button type="button" onClick={() => setOpen(true)} className="flex items-center gap-1.5 rounded-full bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white"><Sparkles aria-hidden className="size-3.5" />{slides.length} new features</button>;

  return (
    <div className="w-full max-w-sm rounded-[2rem] bg-[linear-gradient(135deg,#e0e7ff,#fae8ff,#fef3c7)] p-3 dark:bg-[linear-gradient(135deg,#1e1b4b,#3b0764,#451a03)]">
      <style>{`@keyframes pui-announce-float { 0%, 100% { transform: translateY(0) scale(1) } 50% { transform: translateY(-8px) scale(1.05) } }`}</style>
      <section aria-roledescription="carousel" aria-label="What's new" onKeyDown={onKeyDown} className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/60 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/60">
        <button type="button" aria-label="Close" onClick={() => setOpen(false)} className="absolute right-3 top-3 z-10 grid size-8 place-items-center rounded-full bg-white/70 text-zinc-600 hover:text-zinc-950 dark:bg-zinc-900/70 dark:text-zinc-300"><X aria-hidden className="size-4" /></button>
        <div aria-hidden className="grid h-40 place-items-center bg-white/30 dark:bg-white/5"><span key={index} className={`size-24 bg-gradient-to-br shadow-xl motion-safe:animate-[pui-announce-float_3s_ease-in-out_infinite] ${slide.tone} ${slide.shape}`} /></div>
        <div aria-live="polite" className="px-6 pt-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">New · {index + 1} of {slides.length}</p>
          <h3 className="mt-1 text-xl font-semibold text-zinc-950 dark:text-white">{slide.title}</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{slide.text}</p>
        </div>
        <div className="flex items-center gap-2 px-6 pb-5 pt-5">
          <div role="tablist" aria-label="Slides" className="flex gap-1.5">{slides.map((item, dot) => <button key={item.title} type="button" role="tab" aria-selected={dot === index} aria-label={`Slide ${dot + 1}`} onClick={() => setIndex(dot)} className={`h-2 rounded-full transition-all ${dot === index ? 'w-6 bg-violet-600' : 'w-2 bg-zinc-300 dark:bg-zinc-600'}`} />)}</div>
          <div className="ml-auto flex gap-2">
            {index > 0 && <button type="button" onClick={() => setIndex(index - 1)} className="rounded-full px-3 py-1.5 text-sm text-zinc-600 hover:bg-white/60 dark:text-zinc-300 dark:hover:bg-white/10">Back</button>}
            <button type="button" onClick={() => (last ? setOpen(false) : setIndex(index + 1))} className="rounded-full bg-zinc-950 px-4 py-1.5 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">{last ? 'Try it now' : 'Next'}</button>
          </div>
        </div>
        <button type="button" onClick={() => setOpen(false)} className="w-full border-t border-white/50 py-2.5 text-xs text-zinc-500 hover:text-zinc-900 dark:border-white/10 dark:hover:text-zinc-100">Remind me later</button>
      </section>
    </div>
  );
}
