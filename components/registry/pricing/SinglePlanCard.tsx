/**
 * @registry
 * name: Single Plan Card
 * category: Pricing
 * style: Editorial
 * tags: recent
 * description: Offre unique à prix fixe avec liste d'avantages en deux colonnes et garantie de remboursement.
 * prompt: Create a single-plan pricing card: left side with plan name, one-paragraph pitch and a 2-column feature checklist; right side (stacked on mobile) a tinted panel with the price, "pay once, own it forever", CTA and a 30-day money-back note. Light and dark mode.
 */
import { Check, ShieldCheck } from 'lucide-react';

const features = ['All 300+ components', 'Figma source file', 'AI prompts FR/EN', 'Lifetime updates', 'Commercial license', 'Private Discord'];

export function SinglePlanCard() {
  return (
    <section className="grid w-full max-w-4xl overflow-hidden rounded-3xl border border-zinc-200 bg-white md:grid-cols-[1.4fr_1fr] dark:border-zinc-800 dark:bg-zinc-950">
      <div className="p-6 sm:p-8">
        <h3 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">Lifetime access</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">One purchase, every component we ever ship. Build unlimited projects for you and your clients.</p>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[.18em] text-teal-700 dark:text-teal-400">What&apos;s included</p>
        <ul className="mt-3 grid gap-2.5 text-sm sm:grid-cols-2">
          {features.map((feature) => <li key={feature} className="flex gap-2 text-zinc-700 dark:text-zinc-300"><Check aria-hidden className="mt-0.5 size-4 text-teal-600 dark:text-teal-400" />{feature}</li>)}
        </ul>
      </div>
      <div className="flex flex-col justify-center bg-zinc-50 p-6 text-center sm:p-8 dark:bg-zinc-900">
        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Pay once, own it forever</p>
        <p className="mt-3 text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white">$249</p>
        <p className="text-sm text-zinc-500 line-through">$399</p>
        <button type="button" className="mt-6 rounded-xl bg-zinc-950 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950">Get lifetime access</button>
        <p className="mt-4 inline-flex items-center justify-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400"><ShieldCheck aria-hidden className="size-4 text-emerald-500" /> 30-day money-back guarantee</p>
      </div>
    </section>
  );
}
