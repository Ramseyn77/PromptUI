/**
 * @registry
 * name: Enterprise Contact Card
 * category: Pricing
 * style: SaaS
 * tags: recent
 * description: Encart entreprise « Sur devis » avec avantages, logos clients et prise de rendez-vous.
 * prompt: Create an enterprise pricing banner: "Custom pricing" headline, short pitch, a 2-column list of enterprise perks with icons (SSO, SLA, dedicated support, on-prem), and two CTAs (Talk to sales / Read security docs); horizontal from md. Light and dark mode.
 */
import { Headphones, Lock, Server, Timer } from 'lucide-react';

const perks = [
  { icon: Lock, label: 'SAML SSO & SCIM' },
  { icon: Timer, label: '99.99% uptime SLA' },
  { icon: Headphones, label: 'Dedicated success manager' },
  { icon: Server, label: 'Private cloud or on-prem' },
];

export function EnterpriseContactCard() {
  return (
    <section className="grid w-full max-w-4xl gap-8 rounded-3xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-6 sm:p-8 md:grid-cols-[1fr_1.1fr] md:items-center dark:border-zinc-800 dark:from-zinc-950 dark:to-zinc-900">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-violet-700 dark:text-violet-400">Enterprise</p>
        <h3 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">Custom pricing</h3>
        <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">Volume discounts, security reviews and an onboarding plan built around your team.</p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button type="button" className="rounded-xl bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Talk to sales</button>
          <button type="button" className="rounded-xl border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-800 dark:border-zinc-700 dark:text-zinc-100">Security docs</button>
        </div>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {perks.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-4 text-sm font-medium text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
            <span className="grid size-9 place-items-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400"><Icon aria-hidden className="size-4" /></span>{label}
          </li>
        ))}
      </ul>
    </section>
  );
}
