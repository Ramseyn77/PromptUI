/**
 * @registry
 * name: Logo Cloud Hero
 * category: Hero
 * style: Minimal
 * tags: recent
 * description: Hero centre avec preuve sociale sous forme de nuage de logos textuels.
 * prompt: Create a centered hero with rating line (five stars + "4.9 from 1,200 reviews"), headline, subtitle, CTA, and a "Trusted by" row of six wordmark logos in muted gray that brighten on hover. Wrap on mobile. Light and dark mode.
 */
import { Star } from 'lucide-react';

const logos = ['Northwind', 'Lumen', 'Acme', 'Orbit', 'Helix', 'Kite'];

export function LogoCloudHero() {
  return (
    <section className="w-full max-w-5xl rounded-3xl bg-white px-6 py-14 text-center dark:bg-zinc-950">
      <p className="inline-flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400">
        <span className="flex text-amber-400">{Array.from({ length: 5 }, (_, index) => <Star key={index} aria-hidden className="size-4 fill-current" />)}</span>
        4.9 from 1,200 reviews
      </p>
      <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">Customer support your users will actually love</h1>
      <p className="mx-auto mt-4 max-w-xl text-zinc-600 dark:text-zinc-400">Shared inbox, AI replies and live chat in one fast, friendly tool.</p>
      <button type="button" className="mt-8 rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700">Try it free for 14 days</button>
      <p className="mt-14 text-xs font-semibold uppercase tracking-[.2em] text-zinc-500 dark:text-zinc-400">Trusted by fast-growing teams</p>
      <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {logos.map((logo) => (
          <li key={logo} className="text-xl font-bold tracking-tight text-zinc-400 transition hover:text-zinc-900 dark:text-zinc-600 dark:hover:text-white">{logo}</li>
        ))}
      </ul>
    </section>
  );
}
