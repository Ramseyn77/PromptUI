/**
 * @registry
 * name: Gradient Pricing Stack
 * category: Pricing
 * style: Gradient
 * tags: recent
 * description: Offres empilées en éventail : cliquer une carte la fait passer devant avec son dégradé, les autres reculent.
 * prompt: Create a stacked pricing deck: three plan cards (Basic, Pro, Ultra) each with its own gradient, stacked with offset and rotation like a fanned hand; clicking or focusing a card (buttons with aria-pressed) brings it to the front (z-index, scale, rotate 0) while others tuck back; the front card shows price, features and a Choose button. Transitions off with reduced motion. Light and dark mode.
 */
'use client';
import { Check } from 'lucide-react';
import { useState } from 'react';

const plans = [
  { name: 'Basic', price: 0, tone: 'from-sky-400 to-cyan-500', features: ['1 project', 'Community support'] },
  { name: 'Pro', price: 19, tone: 'from-violet-500 to-fuchsia-500', features: ['Unlimited projects', 'Custom domain', 'Analytics'] },
  { name: 'Ultra', price: 49, tone: 'from-orange-400 to-rose-500', features: ['Everything in Pro', 'SSO', 'Priority support'] },
];

export function GradientPricingStack() {
  const [front, setFront] = useState(1);

  return (
    <div className="relative mx-auto h-[22rem] w-72">
      {plans.map((plan, index) => {
        const offset = index - front;
        const active = offset === 0;
        return (
          <button key={plan.name} type="button" aria-pressed={active} onClick={() => setFront(index)} onFocus={() => setFront(index)} className={`absolute inset-x-0 top-6 h-72 rounded-3xl bg-gradient-to-br p-5 text-left text-white shadow-xl outline-none transition-all duration-500 focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none ${plan.tone}`} style={{ zIndex: 10 - Math.abs(offset), transform: active ? 'translateY(0) scale(1) rotate(0deg)' : `translate(${offset * 28}px, ${Math.abs(offset) * -12}px) scale(.92) rotate(${offset * 6}deg)`, opacity: active ? 1 : 0.85 }}>
            <span className="text-sm font-semibold uppercase tracking-wider text-white/85">{plan.name}</span>
            <span className="mt-2 block text-4xl font-bold">${plan.price}<span className="text-base font-normal text-white/80">/mo</span></span>
            <span className={`mt-4 block space-y-1.5 text-sm transition-opacity ${active ? 'opacity-100' : 'opacity-0'}`}>{plan.features.map((feature) => <span key={feature} className="flex items-center gap-2"><Check aria-hidden className="size-4" />{feature}</span>)}</span>
            {active && <span className="absolute inset-x-5 bottom-5 block rounded-xl bg-white py-2 text-center text-sm font-semibold text-zinc-900">Choose {plan.name}</span>}
          </button>
        );
      })}
    </div>
  );
}
