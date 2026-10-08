/**
 * @registry
 * name: Team Personal Pricing
 * category: Pricing
 * style: Glass
 * tags: recent
 * description: Tarifs avec onglets Personnel / Équipe : les cartes changent de contenu et le prix devient « par membre ».
 * prompt: Create pricing with Personal / Team tabs (tablist with sliding indicator): Personal shows Free and Plus cards, Team shows Team and Enterprise cards with "per member" pricing and a seats note; cards cross-fade on switch; the highlighted card has a glass gradient border. Two columns from sm. Light and dark mode.
 */
'use client';
import { Check } from 'lucide-react';
import { useState } from 'react';

const sets = {
  Personal: [
    { name: 'Free', price: '$0', note: 'forever', features: ['3 projects', 'Community support'], hot: false },
    { name: 'Plus', price: '$8', note: 'per month', features: ['Unlimited projects', 'Custom domain', 'Version history'], hot: true },
  ],
  Team: [
    { name: 'Team', price: '$14', note: 'per member / month', features: ['Shared workspace', 'Roles & permissions', 'Admin console'], hot: true },
    { name: 'Enterprise', price: 'Custom', note: 'annual contract', features: ['SSO & SCIM', 'Audit log', 'Dedicated CSM'], hot: false },
  ],
};
type Tab = keyof typeof sets;

export function TeamPersonalPricing() {
  const [tab, setTab] = useState<Tab>('Team');

  return (
    <section className="w-full max-w-xl rounded-3xl bg-gradient-to-br from-sky-100 via-white to-violet-100 p-5 dark:from-sky-950/40 dark:via-zinc-950 dark:to-violet-950/40">
      <div role="tablist" aria-label="Plan type" className="relative mx-auto grid w-56 grid-cols-2 rounded-full bg-white/70 p-1 shadow-sm backdrop-blur dark:bg-white/10">
        <span aria-hidden className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-zinc-950 transition-transform duration-300 dark:bg-white ${tab === 'Team' ? 'translate-x-full' : ''}`} />
        {(Object.keys(sets) as Tab[]).map((name) => <button key={name} type="button" role="tab" aria-selected={tab === name} onClick={() => setTab(name)} className={`relative rounded-full py-1.5 text-sm font-semibold ${tab === name ? 'text-white dark:text-zinc-950' : 'text-zinc-600 dark:text-zinc-300'}`}>{name}</button>)}
      </div>
      <div key={tab} role="tabpanel" className="mt-5 grid gap-3 motion-safe:animate-[pui-plans-in_.3s_ease-out] sm:grid-cols-2">
        <style>{`@keyframes pui-plans-in{from{opacity:0;transform:translateY(6px)}}`}</style>
        {sets[tab].map((plan) => (
          <div key={plan.name} className={`rounded-2xl p-[1.5px] ${plan.hot ? 'bg-gradient-to-br from-sky-400 to-violet-500' : 'bg-white/60 dark:bg-white/10'}`}>
            <div className="h-full rounded-[calc(1rem-1.5px)] bg-white/80 p-5 backdrop-blur dark:bg-zinc-900/80">
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{plan.name}</p>
              <p className="mt-2"><span className="text-3xl font-bold text-zinc-950 dark:text-zinc-50">{plan.price}</span> <span className="text-xs text-zinc-500">{plan.note}</span></p>
              <ul className="mt-4 space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">{plan.features.map((feature) => <li key={feature} className="flex items-center gap-2"><Check aria-hidden className="size-4 text-violet-500" />{feature}</li>)}</ul>
              <button type="button" className={`mt-5 w-full rounded-xl py-2 text-sm font-semibold ${plan.hot ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950' : 'border border-zinc-300 text-zinc-800 dark:border-zinc-700 dark:text-zinc-200'}`}>{plan.price === 'Custom' ? 'Contact sales' : 'Choose ' + plan.name}</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
