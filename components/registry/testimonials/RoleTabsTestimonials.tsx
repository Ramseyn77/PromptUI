/**
 * @registry
 * name: Role Tabs Testimonials
 * category: Testimonials
 * style: SaaS
 * tags: recent
 * description: Témoignages classés par métier dans des onglets : designers, développeurs, fondateurs.
 * prompt: Create testimonials grouped by audience with an accessible tablist (Designers, Developers, Founders; arrow keys move focus/selection), each panel showing two quote cards with avatar, name and company. Light and dark mode.
 */
'use client';
import { useRef, useState, type KeyboardEvent } from 'react';

const tabs = {
  Designers: [['Léa', 'Studio Nord', 'Pixel-perfect out of the box.'], ['Kenji', 'Mori', 'Finally a kit that respects typography.']],
  Developers: [['Kofi', 'Ayo Labs', 'Clean TypeScript, zero lock-in.'], ['Sara', 'Pulse', 'Accessibility is baked in, not bolted on.']],
  Founders: [['Omar', 'Tadam', 'We launched two weeks early.'], ['Mia', 'Loop', 'Our site finally looks like a real company.']],
};
type Tab = keyof typeof tabs;

export function RoleTabsTestimonials() {
  const [tab, setTab] = useState<Tab>('Designers');
  const names = Object.keys(tabs) as Tab[];
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKey(event: KeyboardEvent, index: number) {
    const delta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!delta) return;
    const next = (index + delta + names.length) % names.length;
    setTab(names[next]);
    refs.current[next]?.focus();
  }

  return (
    <section className="w-full max-w-2xl">
      <div role="tablist" aria-label="Audience" className="flex gap-1 rounded-xl bg-zinc-100 p-1 dark:bg-zinc-900">
        {names.map((name, index) => (
          <button key={name} ref={(node) => { refs.current[index] = node; }} type="button" role="tab" id={`role-tab-${name}`} aria-selected={tab === name} aria-controls={`role-panel-${name}`} tabIndex={tab === name ? 0 : -1} onClick={() => setTab(name)} onKeyDown={(event) => onKey(event, index)} className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${tab === name ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-white' : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400'}`}>{name}</button>
        ))}
      </div>
      <div role="tabpanel" id={`role-panel-${tab}`} aria-labelledby={`role-tab-${tab}`} className="mt-4 grid gap-3 sm:grid-cols-2">
        {tabs[tab].map(([name, company, quote]) => (
          <figure key={name} className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
            <blockquote className="text-sm leading-6 text-zinc-800 dark:text-zinc-200">“{quote}”</blockquote>
            <figcaption className="mt-4 flex items-center gap-2.5 text-sm"><span className="grid size-8 place-items-center rounded-full bg-teal-500/15 font-semibold text-teal-700 dark:text-teal-300">{name[0]}</span><span className="font-semibold text-zinc-900 dark:text-white">{name}</span><span className="text-zinc-500">· {company}</span></figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
