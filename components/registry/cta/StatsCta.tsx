/**
 * @registry
 * name: Stats CTA
 * category: CTA
 * style: Editorial
 * tags: recent
 * description: Appel a l action appuye par trois chiffres cles en grand et un bouton centre.
 * prompt: Create a CTA section: centered headline, three big stats in a row separated by hairlines (value + label), and one primary button with arrow; stats stack on mobile. Editorial serif numbers, light and dark mode.
 */
import { ArrowRight } from 'lucide-react';

const stats = [['12k+', 'teams onboarded'], ['4.9/5', 'average rating'], ['2 days', 'to first launch']];

export function StatsCta() {
  return (
    <section className="w-full max-w-4xl rounded-3xl bg-[#faf6ee] px-6 py-12 text-center dark:bg-zinc-900">
      <h2 className="mx-auto max-w-xl text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">Join the teams shipping better interfaces</h2>
      <dl className="mx-auto mt-10 grid max-w-2xl gap-6 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-zinc-900/15 dark:sm:divide-white/15">
        {stats.map(([value, label]) => <div key={label} className="flex flex-col-reverse"><dt className="text-sm text-zinc-600 dark:text-zinc-400">{label}</dt><dd className="font-serif text-4xl text-zinc-900 dark:text-white">{value}</dd></div>)}
      </dl>
      <a href="#" className="mt-10 inline-flex items-center gap-2 rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:gap-3 dark:bg-white dark:text-zinc-950">Start building <ArrowRight aria-hidden className="size-4" /></a>
    </section>
  );
}
