/**
 * @registry
 * name: Phone Mockup Hero
 * category: Hero
 * style: SaaS
 * tags: recent
 * description: Hero d'application mobile avec maquette de téléphone et badges de stores.
 * prompt: Create a mobile-app hero: headline, subtitle, App Store / Google Play styled buttons, and a CSS phone mockup (rounded frame, notch, app screen with balance card and transaction list). Stacks on mobile, side by side from md. Light and dark mode.
 */
import { Apple, Play } from 'lucide-react';

export function PhoneMockupHero() {
  return (
    <section className="grid w-full max-w-5xl items-center gap-10 rounded-3xl bg-sky-50 px-6 py-12 md:grid-cols-2 md:px-12 dark:bg-zinc-900">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">Your money, beautifully organized.</h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">Track spending, split bills and save automatically, right from your pocket.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {[[Apple, 'App Store'], [Play, 'Google Play']].map(([Icon, label]) => {
            const StoreIcon = Icon as typeof Apple;
            return (
              <button key={label as string} type="button" className="inline-flex items-center gap-2.5 rounded-xl bg-zinc-950 px-4 py-2.5 text-left text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200">
                <StoreIcon aria-hidden className="size-5" />
                <span><span className="block text-[10px] opacity-70">Download on</span><span className="block text-sm font-semibold">{label as string}</span></span>
              </button>
            );
          })}
        </div>
      </div>
      <div aria-hidden className="mx-auto w-56 rounded-[2.5rem] bg-zinc-950 p-2.5 shadow-2xl ring-1 ring-zinc-800">
        <div className="relative overflow-hidden rounded-[2rem] bg-white px-4 pb-6 pt-8 dark:bg-zinc-100">
          <span className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-zinc-950" />
          <div className="rounded-2xl bg-gradient-to-br from-sky-500 to-violet-500 p-4 text-white">
            <p className="text-[10px] opacity-80">Balance</p>
            <p className="text-2xl font-semibold">$8,240</p>
          </div>
          {[['Groceries', '-$64'], ['Salary', '+$3,200'], ['Coffee', '-$4.50']].map(([label, amount]) => (
            <div key={label} className="mt-3 flex items-center justify-between text-xs">
              <span className="text-zinc-700">{label}</span>
              <span className={amount.startsWith('+') ? 'font-semibold text-emerald-600' : 'font-semibold text-zinc-900'}>{amount}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
