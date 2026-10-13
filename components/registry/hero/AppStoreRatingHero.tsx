/**
 * @registry
 * name: App Store Rating Hero
 * category: Hero
 * style: Minimal
 * tags: recent
 * description: Hero d'application mobile : note 4,9 étoiles, badges de téléchargement, lauriers « App of the day » et téléphone avec écran d'app.
 * prompt: Create a mobile app hero: left column with laurel-framed "App of the Day" award, a headline, subcopy, a 4.9 star rating row with "12k ratings", two store download buttons (generic Apple/Play glyph-free labels "Download on the App Store" / "Get it on Google Play"), and a "Free · No ads" note; right column a CSS phone frame showing a habit app screen with a progress ring and three habit rows; stacks on mobile with the phone below. Light and dark mode.
 */
import { Star } from 'lucide-react';

export function AppStoreRatingHero() {
  const circumference = 2 * 3.1416 * 34;
  return (
    <section className="w-full bg-white px-6 py-14 dark:bg-zinc-950">
      <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
        <div>
          <p className="flex w-fit items-center gap-2 text-sm font-semibold text-amber-600 dark:text-amber-400"><span aria-hidden className="text-xl">❦</span>App of the Day<span aria-hidden className="-scale-x-100 text-xl">❦</span></p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl dark:text-white">Small habits. <br />Big streaks.</h1>
          <p className="mt-4 max-w-md text-zinc-600 dark:text-zinc-400">Build routines that stick with gentle reminders, streak shields and weekly insights.</p>
          <div className="mt-5 flex items-center gap-2"><span className="flex text-amber-400" aria-hidden>{[0, 1, 2, 3, 4].map((index) => <Star key={index} className="size-4 fill-current" />)}</span><span className="text-sm text-zinc-600 dark:text-zinc-400"><strong className="text-zinc-950 dark:text-white">4.9</strong> · 12k ratings</span></div>
          <div className="mt-6 flex flex-wrap gap-3">
            {[['Download on the', 'App Store'], ['Get it on', 'Google Play']].map(([small, big]) => <a key={big} href="#" className="rounded-xl bg-zinc-950 px-4 py-2 text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"><span className="block text-[10px] leading-none opacity-80">{small}</span><span className="block text-base font-semibold leading-tight">{big}</span></a>)}
          </div>
          <p className="mt-3 text-xs text-zinc-500">Free · No ads · iOS & Android</p>
        </div>
        <div className="mx-auto w-60 rounded-[2.5rem] border-[10px] border-zinc-900 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-900" aria-hidden>
          <div className="mx-auto mt-2 h-5 w-20 rounded-full bg-zinc-900 dark:bg-zinc-700" />
          <div className="px-5 pb-6 pt-4">
            <p className="text-xs text-zinc-500">Thursday</p>
            <p className="text-lg font-bold text-zinc-950 dark:text-white">Today</p>
            <div className="relative mx-auto mt-3 size-24">
              <svg viewBox="0 0 80 80" className="size-24 -rotate-90"><circle cx="40" cy="40" r="34" fill="none" strokeWidth="8" className="stroke-zinc-100 dark:stroke-zinc-800" /><circle cx="40" cy="40" r="34" fill="none" strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference.toFixed(1)} strokeDashoffset={(circumference * 0.33).toFixed(1)} className="stroke-emerald-500" /></svg>
              <span className="absolute inset-0 grid place-items-center text-sm font-bold text-zinc-950 dark:text-white">2/3</span>
            </div>
            <ul className="mt-4 space-y-2 text-xs">
              {[['💧', 'Drink water', true], ['📚', 'Read 10 pages', true], ['🧘', 'Meditate', false]].map(([icon, label, done]) => <li key={label as string} className="flex items-center gap-2 rounded-xl bg-zinc-50 p-2 dark:bg-zinc-800"><span>{icon}</span><span className={`flex-1 ${done ? 'text-zinc-400 line-through' : 'text-zinc-800 dark:text-zinc-200'}`}>{label}</span><span className={`size-4 rounded-full ${done ? 'bg-emerald-500' : 'border-2 border-zinc-300 dark:border-zinc-600'}`} /></li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
