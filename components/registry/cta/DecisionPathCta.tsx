/**
 * @registry
 * name: Decision Path CTA
 * category: CTA
 * style: SaaS
 * tags: recent
 * description: CTA interactif qui adapte son message et son action au parcours choisi.
 * prompt: Create an interactive CTA that asks "What are you building?" and offers three accessible choices: Interface, Prototype and Design system. Selecting a path updates the supporting message, small benefit list and primary button label with a soft fade. Use aria-pressed, preserve a visible focus state, stack choices on narrow screens and support light/dark mode.
 */
'use client';

import { ArrowRight, Blocks, LayoutTemplate, WandSparkles } from 'lucide-react';
import { useState } from 'react';

const paths = [
  { name: 'Interface', icon: LayoutTemplate, copy: 'Start from polished production-ready sections.', action: 'Browse interfaces', benefits: ['Responsive layouts', 'Accessible states'] },
  { name: 'Prototype', icon: WandSparkles, copy: 'Move from a rough idea to a clickable flow quickly.', action: 'Build a prototype', benefits: ['Interactive examples', 'Prompt included'] },
  { name: 'Design system', icon: Blocks, copy: 'Create a consistent foundation for every product team.', action: 'Explore foundations', benefits: ['Reusable patterns', 'Theme-ready code'] },
] as const;

export function DecisionPathCta() {
  const [active, setActive] = useState(0);
  const selected = paths[active];

  return (
    <section className="w-full max-w-3xl rounded-[2rem] border border-zinc-200 bg-white p-5 shadow-xl shadow-zinc-900/5 sm:p-8 dark:border-zinc-800 dark:bg-zinc-950">
      <style>{`@keyframes pui-path-fade{from{opacity:0;transform:translateY(8px)}}@media(prefers-reduced-motion:reduce){.pui-path-panel{animation:none!important}}`}</style>
      <p className="text-xs font-semibold uppercase tracking-[.22em] text-teal-600 dark:text-teal-400">Choose your path</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">What are you building?</h2>
      <div className="mt-6 grid gap-2 sm:grid-cols-3">
        {paths.map((path, index) => <button key={path.name} type="button" aria-pressed={active === index} onClick={() => setActive(index)} className={`flex items-center gap-3 rounded-2xl border p-3 text-left text-sm font-semibold outline-none transition focus-visible:ring-2 focus-visible:ring-teal-500 ${active === index ? 'border-teal-500 bg-teal-500/10 text-teal-800 dark:text-teal-200' : 'border-zinc-200 text-zinc-600 hover:border-zinc-400 dark:border-zinc-800 dark:text-zinc-300'}`}><path.icon aria-hidden className="size-4 shrink-0" />{path.name}</button>)}
      </div>
      <div key={selected.name} className="pui-path-panel mt-6 rounded-2xl bg-zinc-50 p-5 motion-safe:animate-[pui-path-fade_.35s_ease-out_both] dark:bg-zinc-900">
        <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">{selected.copy}</p>
        <ul className="mt-3 flex flex-wrap gap-2">{selected.benefits.map((benefit) => <li key={benefit} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-zinc-600 shadow-sm dark:bg-zinc-800 dark:text-zinc-300">{benefit}</li>)}</ul>
        <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:bg-white dark:text-zinc-950">{selected.action}<ArrowRight aria-hidden className="size-4" /></button>
      </div>
    </section>
  );
}
