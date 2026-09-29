/**
 * @registry
 * name: Three Tier Pricing
 * category: Pricing
 * style: SaaS
 * tags: featured, recent
 * description: Trois offres cote a cote, l offre du milieu mise en avant avec badge et bouton plein.
 * prompt: Create a three-tier pricing section (stacked on mobile, 3 columns from md): Starter, Pro (highlighted: ring, "Most popular" badge, filled CTA, slightly raised on md) and Business; each with price/month, description, CTA and a feature list with checks. Light and dark mode.
 */
import { Check } from 'lucide-react';

const tiers = [
  { name: 'Starter', price: 0, text: 'For side projects', features: ['1 project', 'Community blocks', 'Email support'] },
  { name: 'Pro', price: 29, text: 'For growing teams', features: ['Unlimited projects', 'All blocks + prompts', 'Priority support', 'Custom themes'], featured: true },
  { name: 'Business', price: 99, text: 'For larger orgs', features: ['Everything in Pro', 'SSO & audit logs', 'Dedicated manager'] },
];

export function ThreeTierPricing() {
  return (
    <section className="grid w-full max-w-5xl items-start gap-4 md:grid-cols-3">
      {tiers.map((tier) => (
        <article key={tier.name} className={`relative rounded-3xl p-6 ${tier.featured ? 'bg-white ring-2 ring-teal-500 shadow-xl md:-mt-3 dark:bg-zinc-950' : 'border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950'}`}>
          {tier.featured && <span className="absolute -top-3 left-6 rounded-full bg-teal-600 px-3 py-1 text-xs font-semibold text-white">Most popular</span>}
          <h3 className="font-semibold text-zinc-900 dark:text-white">{tier.name}</h3>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{tier.text}</p>
          <p className="mt-5 flex items-baseline gap-1"><span className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">${tier.price}</span><span className="text-sm text-zinc-500">/month</span></p>
          <button type="button" className={`mt-6 w-full rounded-xl py-2.5 text-sm font-semibold transition ${tier.featured ? 'bg-teal-600 text-white hover:bg-teal-700' : 'border border-zinc-300 text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900'}`}>{tier.price ? 'Start free trial' : 'Get started'}</button>
          <ul className="mt-6 space-y-2.5 text-sm">
            {tier.features.map((feature) => <li key={feature} className="flex gap-2 text-zinc-700 dark:text-zinc-300"><Check aria-hidden className="mt-0.5 size-4 shrink-0 text-teal-600 dark:text-teal-400" />{feature}</li>)}
          </ul>
        </article>
      ))}
    </section>
  );
}
