/**
 * @registry
 * name: Pricing Teaser CTA
 * category: CTA
 * style: SaaS
 * tags: recent
 * description: Bandeau tarif d'appel : prix barré, remise annuelle, liste de bénéfices cochés et double bouton.
 * prompt: Create a pricing teaser CTA band: left side headline + three checked benefits, right side a price block with crossed-out monthly price, discounted yearly price, "Save 25%" badge and "Start 14-day trial" + "See all plans" buttons; columns from md, stacked on mobile. Light and dark mode.
 */
import { Check } from 'lucide-react';

export function PricingTeaserCta() {
  return (
    <section className="grid w-full max-w-3xl items-center gap-6 rounded-3xl border border-zinc-200 bg-white p-6 md:grid-cols-[1.3fr_1fr] md:p-8 dark:border-zinc-800 dark:bg-zinc-950">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">Everything you need to launch, one simple price.</h2>
        <ul className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
          {['Unlimited projects and pages', 'Custom domain with SSL', 'Analytics and A/B tests'].map((item) => <li key={item} className="flex items-center gap-2"><span className="grid size-5 place-items-center rounded-full bg-teal-100 text-teal-700 dark:bg-teal-400/15 dark:text-teal-300"><Check aria-hidden className="size-3" /></span>{item}</li>)}
        </ul>
      </div>
      <div className="rounded-2xl bg-zinc-50 p-5 dark:bg-zinc-900">
        <div className="flex items-center gap-2">
          <span className="text-sm text-zinc-400 line-through">$24</span>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300">Save 25%</span>
        </div>
        <p className="mt-1"><span className="text-4xl font-bold text-zinc-950 dark:text-zinc-50">$18</span><span className="text-sm text-zinc-500"> / month, billed yearly</span></p>
        <button type="button" className="mt-4 w-full rounded-xl bg-zinc-950 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200">Start 14-day trial</button>
        <a href="#plans" className="mt-2 block text-center text-sm font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100">See all plans</a>
      </div>
    </section>
  );
}
