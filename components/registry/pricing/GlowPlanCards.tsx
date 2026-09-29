/**
 * @registry
 * name: Glow Plan Cards
 * category: Pricing
 * style: Dark
 * tags: featured, recent
 * description: Cartes d offres sombres, l offre phare entouree d une bordure lumineuse en degrade anime.
 * prompt: Create dark pricing cards where the featured plan has an animated gradient border (rotating conic gradient behind a 1px inset) and a soft outer glow; other plans have subtle borders. Two columns from sm. Inverts to light surfaces in light mode while keeping the glow.
 */
import { Check } from 'lucide-react';

const plans = [
  { name: 'Hobby', price: 0, features: ['3 apps', 'Community support'] },
  { name: 'Pro', price: 24, features: ['Unlimited apps', 'Analytics', 'Priority support'], featured: true },
];

export function GlowPlanCards() {
  return (
    <>
      <style>{`@keyframes pui-glow-spin{to{transform:rotate(360deg)}}`}</style>
      <section className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
        {plans.map((plan) => {
          const body = (
            <div className="relative h-full rounded-[23px] bg-white p-6 dark:bg-zinc-950">
              <p className="font-semibold text-zinc-900 dark:text-white">{plan.name}</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">${plan.price}<span className="text-sm font-normal text-zinc-500">/mo</span></p>
              <ul className="mt-5 space-y-2 text-sm">{plan.features.map((feature) => <li key={feature} className="flex gap-2 text-zinc-700 dark:text-zinc-300"><Check aria-hidden className="mt-0.5 size-4 text-violet-500" />{feature}</li>)}</ul>
              <button type="button" className={`mt-6 w-full rounded-xl py-2.5 text-sm font-semibold ${plan.featured ? 'bg-violet-600 text-white hover:bg-violet-500' : 'border border-zinc-300 text-zinc-800 dark:border-zinc-700 dark:text-zinc-100'}`}>{plan.featured ? 'Upgrade to Pro' : 'Start free'}</button>
            </div>
          );
          return plan.featured ? (
            <div key={plan.name} className="relative overflow-hidden rounded-3xl p-px shadow-[0_0_40px_-8px_rgba(139,92,246,.6)]">
              <div aria-hidden className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,#8b5cf6,#14b8a6,#f59e0b,#8b5cf6)] motion-safe:animate-[pui-glow-spin_5s_linear_infinite]" />
              {body}
            </div>
          ) : (
            <div key={plan.name} className="rounded-3xl border border-zinc-200 p-px dark:border-zinc-800">{body}</div>
          );
        })}
      </section>
    </>
  );
}
