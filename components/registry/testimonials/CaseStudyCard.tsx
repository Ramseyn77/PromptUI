/**
 * @registry
 * name: Case Study Card
 * category: Testimonials
 * style: Dark
 * tags: featured, recent
 * description: Étude de cas client avec logo, citation, trois résultats chiffrés et lien vers l'histoire complète.
 * prompt: Create a customer case-study card: company wordmark, headline result, short quote with author, three metric tiles (e.g. -42% support tickets, 3× faster, +18% conversion) with big numbers, and a "Read the story →" link. Inverted surface (dark in light mode, light in dark mode); stacks on mobile.
 */
import { ArrowRight } from 'lucide-react';

const metrics = [['−42%', 'support tickets'], ['3×', 'faster releases'], ['+18%', 'conversion']];

export function CaseStudyCard() {
  return (
    <article className="w-full max-w-3xl rounded-3xl bg-zinc-950 p-8 text-white dark:bg-white dark:text-zinc-950">
      <p className="text-xl font-black tracking-tight opacity-80">NORTHWIND</p>
      <h3 className="mt-4 text-2xl font-semibold leading-tight sm:text-3xl">How Northwind rebuilt its dashboard in six weeks</h3>
      <blockquote className="mt-4 max-w-xl text-sm leading-6 opacity-75">“We stopped debating pixels and started shipping. The components gave us a shared vocabulary.” — Chloé Bernard, Engineering Manager</blockquote>
      <dl className="mt-8 grid gap-3 sm:grid-cols-3">
        {metrics.map(([value, label]) => (
          <div key={label} className="rounded-2xl bg-white/10 p-4 dark:bg-zinc-950/5">
            <dt className="order-2 text-sm opacity-70">{label}</dt>
            <dd className="text-3xl font-semibold tracking-tight text-teal-300 dark:text-teal-700">{value}</dd>
          </div>
        ))}
      </dl>
      <a href="#" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold hover:underline">Read the story <ArrowRight aria-hidden className="size-4" /></a>
    </article>
  );
}
