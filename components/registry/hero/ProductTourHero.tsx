/**
 * @registry
 * name: Product Tour Hero
 * category: Hero
 * style: SaaS
 * tags: featured, recent
 * description: Hero avec visite guidée du produit : onglets de fonctionnalités qui changent la capture d'écran simulée, barre de progression auto et pause au survol.
 * prompt: Create a product tour hero: headline and CTAs on top, then a row of 4 feature tabs (Inbox, Automations, Reports, Integrations) as a tablist; the active tab shows a thin progress bar that fills over 5 seconds and auto-advances to the next tab, pausing while the pointer or focus is inside; below, a browser-frame mockup whose content changes per tab with a crossfade; arrow keys move between tabs; reduced motion disables auto-advance. Light and dark mode.
 */
'use client';
import { BarChart3, Inbox, Plug, Workflow } from 'lucide-react';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';

const tabs = [
  { label: 'Inbox', icon: Inbox, rows: ['Refund request · Kora Bank', 'Invoice question · Atelier', 'Login issue · Lumen'] },
  { label: 'Automations', icon: Workflow, rows: ['When ticket is urgent → page on-call', 'When VIP replies → assign to Awa', 'Every Friday → send digest'] },
  { label: 'Reports', icon: BarChart3, rows: ['First response: 4m 12s', 'CSAT this week: 96%', 'Backlog: 18 tickets'] },
  { label: 'Integrations', icon: Plug, rows: ['Slack · connected', 'Stripe · connected', 'Linear · connect'] },
];

export function ProductTourHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setTimeout(() => { setActive((value) => (value + 1) % tabs.length); setCycle((value) => value + 1); }, 5000);
    return () => window.clearTimeout(timer);
  }, [active, paused, cycle]);

  function select(index: number) { setActive(index); setCycle((value) => value + 1); }
  function onKeyDown(event: KeyboardEvent) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const next = (active + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    select(next);
    refs.current[next]?.focus();
  }

  return (
    <section className="w-full bg-white px-5 py-14 dark:bg-zinc-950" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <style>{`@keyframes pui-tour-fill { from { transform: scaleX(0) } to { transform: scaleX(1) } }`}</style>
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-white">Support that runs itself</h1>
        <p className="mx-auto mt-4 max-w-xl text-zinc-600 dark:text-zinc-400">One inbox, smart automations and reports your team actually reads.</p>
        <div className="mt-6 flex justify-center gap-3"><a href="#" className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Start free</a><a href="#" className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-800 dark:border-zinc-700 dark:text-zinc-200">Watch tour</a></div>
        <div role="tablist" aria-label="Product tour" onKeyDown={onKeyDown} className="mt-10 grid grid-cols-2 gap-2 md:grid-cols-4">
          {tabs.map(({ label, icon: Icon }, index) => (
            <button key={label} ref={(node) => { refs.current[index] = node; }} type="button" role="tab" aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => select(index)} className={`relative overflow-hidden rounded-xl border px-3 py-3 text-left text-sm font-medium transition ${active === index ? 'border-indigo-500 bg-indigo-50 text-indigo-900 dark:bg-indigo-500/10 dark:text-indigo-100' : 'border-zinc-200 text-zinc-600 hover:border-zinc-300 dark:border-zinc-800 dark:text-zinc-400'}`}>
              <Icon aria-hidden className="mb-1 size-4" />{label}
              {active === index && <span key={cycle} aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-indigo-500 motion-safe:animate-[pui-tour-fill_5s_linear_forwards]" style={{ animationPlayState: paused ? 'paused' : 'running' }} />}
            </button>
          ))}
        </div>
        <div role="tabpanel" aria-label={tabs[active].label} className="mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 text-left shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-1.5 border-b border-zinc-200 px-4 py-2.5 dark:border-zinc-800"><span className="size-2.5 rounded-full bg-rose-400" /><span className="size-2.5 rounded-full bg-amber-400" /><span className="size-2.5 rounded-full bg-emerald-400" /><span className="ml-3 rounded-md bg-white px-2 py-0.5 text-[11px] text-zinc-500 dark:bg-zinc-800">app.relay.so/{tabs[active].label.toLowerCase()}</span></div>
          <ul key={active} className="space-y-2 p-5 motion-safe:animate-[pui-tour-in_.35s_ease-out]">
            {tabs[active].rows.map((row, index) => <li key={row} className="flex items-center gap-3 rounded-xl bg-white p-3 text-sm text-zinc-800 shadow-sm dark:bg-zinc-950 dark:text-zinc-200"><span className={`size-2 rounded-full ${['bg-indigo-500', 'bg-emerald-500', 'bg-amber-500'][index]}`} />{row}</li>)}
          </ul>
          <style>{`@keyframes pui-tour-in { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }`}</style>
        </div>
      </div>
    </section>
  );
}
