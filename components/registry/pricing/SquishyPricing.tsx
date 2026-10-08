/**
 * @registry
 * name: Squishy Pricing
 * category: Pricing
 * style: Gradient
 * tags: featured, recent
 * description: Cartes colorées qui s'écrasent et rebondissent au survol, avec formes décoratives.
 * prompt: Create playful pricing cards in bold colors (teal, violet, amber) with a large decorative circle shape; on hover they scale and squish with a springy cubic-bezier, the circle drifts, and on press they compress (active:scale-95). Dark text on light colors for contrast in both themes.
 */
const plans = [
  { name: 'Basic', price: 9, tone: 'bg-teal-300', shape: 'bg-teal-200' },
  { name: 'Plus', price: 19, tone: 'bg-violet-300', shape: 'bg-violet-200' },
  { name: 'Max', price: 39, tone: 'bg-amber-300', shape: 'bg-amber-200' },
];

export function SquishyPricing() {
  return (
    <section className="grid w-full max-w-3xl gap-4 sm:grid-cols-3">
      {plans.map((plan) => (
        <button
          key={plan.name}
          type="button"
          className={`group relative h-64 overflow-hidden rounded-[2rem] p-6 text-left text-zinc-950 transition-transform duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] hover:scale-[1.04] hover:-rotate-1 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-zinc-950/30 dark:focus-visible:ring-white/40 ${plan.tone}`}
        >
          <span aria-hidden className={`absolute -bottom-16 -right-16 size-48 rounded-full transition-transform duration-700 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:-translate-x-6 group-hover:-translate-y-6 group-hover:scale-110 ${plan.shape}`} />
          <span className="relative block text-sm font-bold uppercase tracking-wider">{plan.name}</span>
          <span className="relative mt-3 block text-5xl font-black tracking-tight">${plan.price}</span>
          <span className="relative block text-sm font-medium opacity-70">per month</span>
          <span className="relative mt-10 inline-block rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white">Pick {plan.name}</span>
        </button>
      ))}
    </section>
  );
}
