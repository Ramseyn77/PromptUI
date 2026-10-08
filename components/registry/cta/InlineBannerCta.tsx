/**
 * @registry
 * name: Inline Banner CTA
 * category: CTA
 * style: SaaS
 * tags: recent
 * description: Bandeau d'appel à l'action compact à insérer dans un contenu, icône, texte et bouton fermable.
 * prompt: Create an inline content CTA banner (for docs or articles): icon tile, bold title + one line of text, primary action link, and a dismiss button (aria-label) that collapses it with a height transition; horizontal on sm, stacked on mobile. Light and dark mode.
 */
'use client';
import { Sparkles, X } from 'lucide-react';
import { useState } from 'react';

export function InlineBannerCta() {
  const [open, setOpen] = useState(true);

  return (
    <div className={`grid w-full max-w-2xl transition-[grid-template-rows,opacity] duration-300 ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
      <aside aria-label="Upgrade suggestion" className="overflow-hidden">
        <div className="flex flex-col gap-4 rounded-2xl border border-violet-200 bg-violet-50 p-4 sm:flex-row sm:items-center dark:border-violet-500/30 dark:bg-violet-500/10">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-violet-600 text-white"><Sparkles aria-hidden className="size-5" /></span>
          <p className="flex-1 text-sm text-zinc-700 dark:text-zinc-300"><strong className="block text-zinc-900 dark:text-white">Generate this page with AI</strong>Paste the prompt into your agent and get a full layout in seconds.</p>
          <div className="flex items-center gap-2">
            <a href="#" className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500">Copy prompt</a>
            <button type="button" aria-label="Dismiss" onClick={() => setOpen(false)} className="grid size-8 place-items-center rounded-lg text-zinc-500 hover:bg-violet-100 dark:hover:bg-violet-500/20"><X className="size-4" /></button>
          </div>
        </div>
      </aside>
      {!open && <button type="button" onClick={() => setOpen(true)} className="mt-2 w-fit text-xs text-violet-700 underline dark:text-violet-300">Show banner again</button>}
    </div>
  );
}
