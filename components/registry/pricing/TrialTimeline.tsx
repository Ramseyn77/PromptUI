/**
 * @registry
 * name: Trial Timeline
 * category: Pricing
 * style: Minimal
 * tags: recent
 * description: Explication transparente de l essai gratuit : aujourd hui, rappel J-2, debut de facturation.
 * prompt: Create a free-trial explainer: a vertical timeline with three milestones (Today: full access, Day 12: reminder email, Day 14: billing starts $12/mo) using icons and a connecting gradient line, then a "Start free trial" CTA and "No charge today" note. Light and dark mode.
 */
import { Bell, CreditCard, Unlock } from 'lucide-react';

const steps = [
  { icon: Unlock, title: 'Today', text: 'Unlock every feature. No card charged.' },
  { icon: Bell, title: 'Day 12', text: 'We email you a reminder before the trial ends.' },
  { icon: CreditCard, title: 'Day 14', text: 'Billing starts at $12/month. Cancel anytime before.' },
];

export function TrialTimeline() {
  return (
    <section className="w-full max-w-sm rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">How your free trial works</h3>
      <ol className="relative mt-6 space-y-6">
        <span aria-hidden className="absolute bottom-4 left-5 top-4 w-0.5 bg-gradient-to-b from-teal-500 via-violet-500 to-zinc-200 dark:to-zinc-800" />
        {steps.map(({ icon: Icon, title, text }, index) => (
          <li key={title} className="relative flex gap-4">
            <span className={`grid size-10 shrink-0 place-items-center rounded-full ring-4 ring-white dark:ring-zinc-950 ${index === 0 ? 'bg-teal-600 text-white' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'}`}><Icon aria-hidden className="size-4" /></span>
            <div className="pt-1.5"><p className="text-sm font-semibold text-zinc-900 dark:text-white">{title}</p><p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">{text}</p></div>
          </li>
        ))}
      </ol>
      <button type="button" className="mt-8 w-full rounded-xl bg-teal-600 py-3 text-sm font-semibold text-white hover:bg-teal-700">Start free trial</button>
      <p className="mt-2 text-center text-xs text-zinc-500 dark:text-zinc-400">No charge today</p>
    </section>
  );
}
