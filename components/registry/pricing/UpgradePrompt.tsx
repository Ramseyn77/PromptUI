/**
 * @registry
 * name: Upgrade Prompt
 * category: Pricing
 * style: Glass
 * tags: recent
 * description: Carte d'invitation à passer au plan supérieur quand une limite est atteinte, avec comparaison.
 * prompt: Create an in-app upgrade prompt: a usage-limit warning bar at 100%, "You've reached your free limit" title, a mini two-column Free vs Pro comparison of three limits, primary Upgrade and secondary "Maybe later" actions. Glass surface on a soft gradient backdrop; light and dark mode.
 */
import { Sparkles } from 'lucide-react';

const rows = [['Projects', '3', 'Unlimited'], ['AI generations', '20/mo', '1,000/mo'], ['Team members', '1', '10']];

export function UpgradePrompt() {
  return (
    <div className="w-full max-w-md rounded-3xl bg-gradient-to-br from-violet-200 via-sky-100 to-teal-100 p-5 dark:from-violet-950 dark:via-zinc-900 dark:to-teal-950">
      <section className="rounded-2xl border border-white/60 bg-white/70 p-5 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/60">
        <div className="h-1.5 rounded-full bg-rose-500" role="progressbar" aria-label="Free plan usage" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} />
        <h3 className="mt-4 flex items-center gap-2 font-semibold text-zinc-900 dark:text-white"><Sparkles aria-hidden className="size-4 text-violet-600 dark:text-violet-400" /> You&apos;ve reached your free limit</h3>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Upgrade to keep generating components this month.</p>
        <table className="mt-4 w-full text-sm">
          <thead className="text-xs text-zinc-500 dark:text-zinc-400"><tr><th className="py-1 text-left font-medium">Limit</th><th className="py-1 text-right font-medium">Free</th><th className="py-1 text-right font-medium text-violet-700 dark:text-violet-300">Pro</th></tr></thead>
          <tbody>{rows.map(([label, free, pro]) => <tr key={label} className="border-t border-zinc-900/5 dark:border-white/10"><td className="py-1.5 text-zinc-700 dark:text-zinc-300">{label}</td><td className="py-1.5 text-right text-zinc-500">{free}</td><td className="py-1.5 text-right font-semibold text-zinc-900 dark:text-white">{pro}</td></tr>)}</tbody>
        </table>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row-reverse">
          <button type="button" className="flex-1 rounded-xl bg-violet-600 py-2.5 text-sm font-semibold text-white hover:bg-violet-500">Upgrade to Pro</button>
          <button type="button" className="flex-1 rounded-xl py-2.5 text-sm font-semibold text-zinc-700 hover:bg-white/60 dark:text-zinc-300 dark:hover:bg-white/10">Maybe later</button>
        </div>
      </section>
    </div>
  );
}
