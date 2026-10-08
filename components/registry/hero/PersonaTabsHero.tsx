/**
 * @registry
 * name: Persona Tabs Hero
 * category: Hero
 * style: SaaS
 * tags: recent
 * description: Hero dont le titre et l'illustration changent selon l'onglet « Pour les designers / développeurs / marketeurs ».
 * prompt: Create a persona-switching hero: a tablist (For designers / For developers / For marketers) above a headline, subtitle and illustration panel that change per tab with a crossfade; the illustration is CSS-only (canvas mock for designers, code lines for developers, chart bars for marketers); CTA label adapts. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const personas = {
  designers: { title: 'Design in the same place you ship.', text: 'Components, tokens and handoff without a single export.', cta: 'Open the canvas' },
  developers: { title: 'Real code, not screenshots.', text: 'Typed components that land in your repo, ready to edit.', cta: 'Read the docs' },
  marketers: { title: 'Launch pages without a ticket.', text: 'Edit copy, run tests and publish on your own schedule.', cta: 'Try the editor' },
} as const;
type Persona = keyof typeof personas;

export function PersonaTabsHero() {
  const [tab, setTab] = useState<Persona>('developers');
  const p = personas[tab];

  return (
    <section className="w-full max-w-5xl rounded-3xl border border-zinc-200 bg-white px-6 py-12 dark:border-zinc-800 dark:bg-zinc-950">
      <div role="tablist" aria-label="Who is it for" className="mx-auto flex w-fit gap-1 rounded-full bg-zinc-100 p-1 dark:bg-zinc-900">
        {(Object.keys(personas) as Persona[]).map((name) => <button key={name} type="button" role="tab" aria-selected={tab === name} onClick={() => setTab(name)} className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize ${tab === name ? 'bg-white text-zinc-950 shadow-sm dark:bg-zinc-700 dark:text-white' : 'text-zinc-500'}`}>For {name}</button>)}
      </div>
      <div key={tab} role="tabpanel" className="mt-10 grid items-center gap-8 motion-safe:animate-[pui-persona_.4s_ease-out] lg:grid-cols-2">
        <style>{`@keyframes pui-persona{from{opacity:0;transform:translateY(8px)}}`}</style>
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">{p.title}</h1>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">{p.text}</p>
          <a href="#start" className="mt-6 inline-block rounded-xl bg-zinc-950 px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">{p.cta}</a>
        </div>
        <div aria-hidden className="h-56 rounded-2xl bg-zinc-50 p-5 dark:bg-zinc-900">
          {tab === 'designers' && <div className="relative size-full rounded-xl border border-dashed border-violet-300 dark:border-violet-500/40"><span className="absolute left-6 top-6 h-16 w-28 rounded-lg bg-violet-200 dark:bg-violet-500/30" /><span className="absolute bottom-6 right-6 size-20 rounded-full bg-pink-200 dark:bg-pink-500/30" /><span className="absolute left-1/2 top-1/2 size-3 rounded-full bg-violet-600 ring-4 ring-violet-200 dark:ring-violet-500/30" /></div>}
          {tab === 'developers' && <div className="space-y-2.5 font-mono text-xs">{[60, 85, 45, 70, 30, 80].map((width, index) => <div key={index} className="flex gap-2"><span className="text-zinc-400">{index + 1}</span><span className={`h-3 rounded ${['bg-sky-300', 'bg-emerald-300', 'bg-violet-300'][index % 3]} dark:opacity-60`} style={{ width: `${width}%` }} /></div>)}</div>}
          {tab === 'marketers' && <div className="flex h-full items-end gap-3">{[35, 50, 45, 70, 65, 90].map((height, index) => <span key={index} className="flex-1 rounded-t-lg bg-gradient-to-t from-amber-400 to-orange-300" style={{ height: `${height}%` }} />)}</div>}
        </div>
      </div>
    </section>
  );
}
