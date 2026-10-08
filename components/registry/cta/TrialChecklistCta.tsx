/**
 * @registry
 * name: Trial Checklist CTA
 * category: CTA
 * style: Minimal
 * tags: recent
 * description: Appel à l'essai gratuit avec liste de garanties cochées en grille et bouton principal.
 * prompt: Create a free-trial CTA: headline and subtitle, a 2-column (1 on mobile) checklist of reassurances (No credit card, Cancel anytime, Free migrations, 24/7 support) with check-circle icons, and a centered primary button with a small note below. Light and dark mode.
 */
import { CheckCircle2 } from 'lucide-react';

const perks = ['No credit card required', 'Cancel anytime', 'Free migration help', '24/7 human support'];

export function TrialChecklistCta() {
  return (
    <section className="w-full max-w-2xl rounded-3xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-950">
      <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">Try everything free for 14 days</h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Set up in two minutes. Your data stays yours.</p>
      <ul className="mx-auto mt-6 grid max-w-md gap-3 text-left text-sm sm:grid-cols-2">
        {perks.map((perk) => <li key={perk} className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300"><CheckCircle2 aria-hidden className="size-5 shrink-0 text-teal-600 dark:text-teal-400" />{perk}</li>)}
      </ul>
      <a href="#" className="mt-8 inline-block rounded-xl bg-teal-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 hover:bg-teal-700">Start your free trial</a>
      <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">Then $12/month. Switch plans anytime.</p>
    </section>
  );
}
