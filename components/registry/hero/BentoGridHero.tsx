/**
 * @registry
 * name: Bento Grid Hero
 * category: Hero
 * style: SaaS
 * tags: featured, recent
 * description: Hero avec titre centré et grille bento de cinq tuiles produit (graphique, intégrations, sécurité, IA, vitesse) qui s'animent au survol.
 * prompt: Create a SaaS hero with a centered headline, subcopy and two CTAs above a bento grid of five tiles: a large analytics tile with a mini bar chart, an integrations tile with a ring of app initials, a security tile with a shield and SOC 2 badge, an AI tile with a typing prompt line, and a speed tile with a big "38 ms" stat; tiles lift and reveal a soft gradient on hover/focus-within; the grid collapses to one column on mobile and 2 columns on tablet. Light and dark mode.
 */
import { Bolt, ShieldCheck, Sparkles } from 'lucide-react';

const tile = 'group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-within:-translate-y-1 dark:border-zinc-800 dark:bg-zinc-900';
const glow = 'pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-fuchsia-500/0 transition duration-300 group-hover:from-indigo-500/10 group-hover:to-fuchsia-500/10';

export function BentoGridHero() {
  return (
    <section className="w-full bg-zinc-50 px-5 py-14 dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl text-center">
        <p className="mx-auto w-fit rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">New · Workflows 2.0</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-white">Everything your ops team needs, in one grid</h1>
        <p className="mx-auto mt-4 max-w-xl text-zinc-600 dark:text-zinc-400">Dashboards, automations and audit trails that stay fast at any scale.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3"><a href="#" className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Start free</a><a href="#" className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-800 dark:border-zinc-700 dark:text-zinc-200">Book a demo</a></div>
      </div>
      <div className="mx-auto mt-10 grid max-w-5xl gap-4 text-left md:grid-cols-2 xl:grid-cols-3 xl:grid-rows-2">
        <article className={`${tile} xl:col-span-2`}>
          <span aria-hidden className={glow} />
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">Live analytics</p>
          <p className="text-xs text-zinc-500">Weekly active workflows</p>
          <div aria-hidden className="mt-4 flex h-28 items-end gap-2">{[30, 45, 38, 60, 52, 74, 68, 88, 80, 96].map((height, index) => <span key={index} className="flex-1 rounded-t-md bg-indigo-500/80 transition-all duration-500 group-hover:bg-indigo-500" style={{ height: `${height}%` }} />)}</div>
        </article>
        <article className={tile}>
          <span aria-hidden className={glow} />
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">120+ integrations</p>
          <div aria-hidden className="relative mx-auto mt-4 size-28">
            {['SL', 'GH', 'NT', 'FG', 'ST', 'LN'].map((name, index) => <span key={name} className="absolute grid size-9 place-items-center rounded-full bg-zinc-100 text-[10px] font-bold text-zinc-700 shadow-sm transition-transform duration-500 group-hover:scale-110 dark:bg-zinc-800 dark:text-zinc-200" style={{ left: `${[50, 93, 93, 50, 7, 7][index]}%`, top: `${[0, 25, 75, 100, 75, 25][index]}%`, transform: 'translate(-50%, -50%)' }}>{name}</span>)}
            <span className="absolute left-1/2 top-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl bg-indigo-600 text-xs font-bold text-white">OP</span>
          </div>
        </article>
        <article className={tile}>
          <span aria-hidden className={glow} />
          <ShieldCheck aria-hidden className="size-8 text-emerald-500" />
          <p className="mt-3 text-sm font-semibold text-zinc-900 dark:text-white">Secure by default</p>
          <p className="mt-1 text-xs text-zinc-500">SSO, SCIM and audit logs on every plan.</p>
          <span className="mt-3 inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">SOC 2 Type II</span>
        </article>
        <article className={tile}>
          <span aria-hidden className={glow} />
          <Sparkles aria-hidden className="size-6 text-fuchsia-500" />
          <p className="mt-3 text-sm font-semibold text-zinc-900 dark:text-white">Ask in plain English</p>
          <p className="mt-2 rounded-xl bg-zinc-100 px-3 py-2 font-mono text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">“Alert me when refunds spike”<span className="ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-fuchsia-500 motion-safe:animate-pulse" /></p>
        </article>
        <article className={tile}>
          <span aria-hidden className={glow} />
          <Bolt aria-hidden className="size-6 text-amber-500" />
          <p className="mt-3 text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">38 ms</p>
          <p className="text-xs text-zinc-500">p95 query time across 2B events</p>
        </article>
      </div>
    </section>
  );
}
