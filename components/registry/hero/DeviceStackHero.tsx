/**
 * @registry
 * name: Device Stack Hero
 * category: Hero
 * style: Gradient
 * tags: recent
 * description: Hero multi-appareils : ordinateur, tablette et téléphone superposés en perspective qui s'écartent au survol, avec badges de plateformes.
 * prompt: Create a cross-platform hero: headline "Your notes, on every screen", subcopy, platform text pills (Web, macOS, Windows, iOS, Android) and a CTA; on the right a stack of three CSS device mockups (laptop, tablet, phone) layered with perspective transforms, each showing the same mini notes UI; hovering or focusing the stack fans the devices apart; gradient backdrop blob; stacks vertically on mobile and the fan is static with reduced motion. Light and dark mode.
 */
const Screen = ({ compact }: { compact?: boolean }) => (
  <div className="h-full bg-white p-2 dark:bg-zinc-900">
    <div className="h-2 w-1/2 rounded bg-zinc-800 dark:bg-zinc-200" />
    {[0, 1, 2, ...(compact ? [] : [3])].map((row) => <div key={row} className="mt-2 rounded-md bg-amber-100 p-1.5 dark:bg-amber-500/20"><div className="h-1 w-3/4 rounded bg-amber-400" /><div className="mt-1 h-1 w-1/2 rounded bg-amber-300/70" /></div>)}
  </div>
);

export function DeviceStackHero() {
  return (
    <section className="relative w-full overflow-hidden bg-zinc-50 px-6 py-14 dark:bg-zinc-950">
      <div aria-hidden className="absolute -right-20 top-10 size-96 rounded-full bg-gradient-to-br from-amber-300/50 via-rose-300/40 to-violet-400/40 blur-3xl dark:from-amber-500/20 dark:via-rose-500/20 dark:to-violet-500/20" />
      <div className="relative mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl dark:text-white">Your notes, on every screen</h1>
          <p className="mt-4 max-w-md text-zinc-600 dark:text-zinc-400">Write on your laptop, pick up on your phone. Sync is instant and works offline.</p>
          <ul className="mt-5 flex flex-wrap gap-2">{['Web', 'macOS', 'Windows', 'iOS', 'Android'].map((platform) => <li key={platform} className="rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">{platform}</li>)}</ul>
          <a href="#" className="mt-6 inline-block rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Download free</a>
        </div>
        <div tabIndex={0} aria-label="Laptop, tablet and phone showing the app" className="group relative mx-auto h-72 w-full max-w-md rounded-2xl outline-none [perspective:1200px] focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-white">
          <div className="absolute left-0 top-6 w-72 transition-transform duration-500 [transform:rotateY(18deg)] group-hover:[transform:rotateY(10deg)_translateX(-24px)] group-focus-visible:[transform:rotateY(10deg)_translateX(-24px)] motion-reduce:transition-none">
            <div className="h-44 overflow-hidden rounded-t-xl border-[6px] border-zinc-900 dark:border-zinc-700"><Screen /></div>
            <div className="mx-auto h-3 w-[110%] -translate-x-[4.5%] rounded-b-xl bg-zinc-300 dark:bg-zinc-600" />
          </div>
          <div className="absolute left-40 top-12 w-40 transition-transform duration-500 [transform:rotateY(18deg)] group-hover:[transform:rotateY(10deg)_translateX(30px)] group-focus-visible:[transform:rotateY(10deg)_translateX(30px)] motion-reduce:transition-none">
            <div className="h-52 overflow-hidden rounded-2xl border-[6px] border-zinc-800 shadow-2xl dark:border-zinc-600"><Screen /></div>
          </div>
          <div className="absolute right-2 top-24 w-24 transition-transform duration-500 [transform:rotateY(18deg)] group-hover:[transform:rotateY(10deg)_translateX(40px)_translateY(-10px)] group-focus-visible:[transform:rotateY(10deg)_translateX(40px)] motion-reduce:transition-none">
            <div className="h-44 overflow-hidden rounded-[1.4rem] border-[5px] border-zinc-950 shadow-2xl dark:border-zinc-500"><Screen compact /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
