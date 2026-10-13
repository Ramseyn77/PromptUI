/**
 * @registry
 * name: New Feature Popover
 * category: Tooltips
 * style: Gradient
 * tags: featured, recent
 * description: Popover de découverte d'une nouveauté, ancré à un bouton avec un point pulsant « New », flèche, illustration et actions Essayer / Plus tard.
 * prompt: Create a feature discovery popover: a toolbar with a few icon buttons where one ("AI assist") has a pulsing gradient beacon dot; the popover (open by default, in flow) points to it with an arrow, shows a small gradient illustration, a "New" badge, title, one-line description, a "1 of 2" step label and buttons "Got it" (dismisses and removes the beacon) and "Try it" (focuses the button); Escape dismisses; the trigger is aria-describedby the popover. Light and dark mode.
 */
'use client';
import { Bold, Italic, Link2, Sparkles } from 'lucide-react';
import { useId, useRef, useState } from 'react';

export function NewFeaturePopover({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const uid = useId();
  const [open, setOpen] = useState(defaultOpen);
  const [seen, setSeen] = useState(false);
  const targetRef = useRef<HTMLButtonElement>(null);
  const tool = 'grid size-9 place-items-center rounded-lg text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800';

  return (
    <div className="w-full max-w-sm" onKeyDown={(event) => { if (event.key === 'Escape') { setOpen(false); setSeen(true); } }}>
      <div role="toolbar" aria-label="Editor" className="flex w-fit items-center gap-1 rounded-xl border border-zinc-200 bg-white p-1 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <button type="button" aria-label="Bold" className={tool}><Bold aria-hidden className="size-4" /></button>
        <button type="button" aria-label="Italic" className={tool}><Italic aria-hidden className="size-4" /></button>
        <button type="button" aria-label="Link" className={tool}><Link2 aria-hidden className="size-4" /></button>
        <button ref={targetRef} type="button" aria-label="AI assist" aria-describedby={open ? `${uid}-pop` : undefined} onClick={() => setOpen(!open)} className={`${tool} relative text-violet-600 dark:text-violet-400`}>
          <Sparkles aria-hidden className="size-4" />
          {!seen && <span aria-hidden className="absolute right-1 top-1 flex size-2.5"><span className="absolute inset-0 rounded-full bg-fuchsia-500 motion-safe:animate-ping" /><span className="relative size-2.5 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500" /></span>}
        </button>
      </div>
      {open && (
        <div id={`${uid}-pop`} role="dialog" aria-label="New: AI assist" className="relative ml-[7.25rem] mt-3 w-64 rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-amber-400 p-px shadow-xl">
          <span aria-hidden className="absolute -top-1.5 left-4 size-3 rotate-45 bg-violet-500" />
          <div className="relative rounded-2xl bg-white p-4 dark:bg-zinc-950">
            <div aria-hidden className="grid h-20 place-items-center rounded-xl bg-gradient-to-br from-violet-100 to-amber-50 dark:from-violet-500/20 dark:to-amber-500/10"><Sparkles className="size-8 text-violet-500" /></div>
            <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-zinc-950 dark:text-white"><span className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-1.5 text-[10px] font-bold uppercase text-white">New</span>AI assist</p>
            <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">Select any text and let AI rewrite, shorten or translate it.</p>
            <div className="mt-3 flex items-center gap-2"><span className="text-[11px] text-zinc-400">1 of 2</span><button type="button" onClick={() => { setOpen(false); setSeen(true); }} className="ml-auto rounded-lg px-2.5 py-1 text-xs text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">Got it</button><button type="button" onClick={() => { setOpen(false); setSeen(true); targetRef.current?.focus(); }} className="rounded-lg bg-zinc-950 px-2.5 py-1 text-xs font-semibold text-white dark:bg-white dark:text-zinc-950">Try it</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
