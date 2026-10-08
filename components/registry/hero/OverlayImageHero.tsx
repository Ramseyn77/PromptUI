/**
 * @registry
 * name: Overlay Image Hero
 * category: Hero
 * style: Editorial
 * tags: recent
 * description: Hero façon daisyUI hero-overlay : visuel plein cadre, voile dégradé, titre centré et formulaire de recherche de séjour.
 * prompt: Create a daisyUI-style overlay hero: a full-bleed scenic gradient illustration (layered CSS mountains and sun, no external images) under a dark gradient overlay, centered white headline and subtitle, and a glass search bar with destination, dates and guests fields plus a search button; the bar stacks on mobile. Text keeps AA contrast in both themes.
 */
import { CalendarDays, MapPin, Search, Users } from 'lucide-react';

export function OverlayImageHero() {
  return (
    <section className="relative grid min-h-[26rem] w-full max-w-5xl place-items-center overflow-hidden rounded-3xl px-5 py-14 text-center text-white">
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-orange-300 via-rose-400 to-indigo-800">
        <span className="absolute left-1/2 top-[38%] size-40 -translate-x-1/2 rounded-full bg-amber-100/90 blur-[2px]" />
        <span className="absolute inset-x-0 bottom-0 h-1/2 bg-indigo-950/80 [clip-path:polygon(0_60%,18%_20%,34%_55%,52%_5%,70%_50%,86%_25%,100%_55%,100%_100%,0_100%)]" />
        <span className="absolute inset-x-0 bottom-0 h-1/3 bg-zinc-950 [clip-path:polygon(0_45%,22%_10%,45%_60%,63%_15%,82%_55%,100%_20%,100%_100%,0_100%)]" />
      </div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
      <div className="relative max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-200">Weekend escapes</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-6xl">Wake up somewhere wilder.</h1>
        <p className="mt-3 text-white/85">Cabins, ryokans and riads hand-picked by people who actually stayed there.</p>
        <form onSubmit={(event) => event.preventDefault()} className="mt-8 grid gap-2 rounded-2xl border border-white/25 bg-white/15 p-2 text-left backdrop-blur-md sm:grid-cols-[1.4fr_1fr_0.8fr_auto]">
          {([[MapPin, 'Where to?', 'Destination'], [CalendarDays, 'Oct 16 – 18', 'Dates'], [Users, '2 guests', 'Guests']] as const).map(([Icon, value, label]) => <label key={label} className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2"><Icon aria-hidden className="size-4 text-white/80" /><span className="sr-only">{label}</span><input defaultValue={label === 'Destination' ? '' : value} placeholder={value} className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/70" /></label>)}
          <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900"><Search aria-hidden className="size-4" />Search</button>
        </form>
      </div>
    </section>
  );
}
