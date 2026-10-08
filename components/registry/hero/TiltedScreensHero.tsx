/**
 * @registry
 * name: Tilted Screens Hero
 * category: Hero
 * style: SaaS
 * tags: featured, recent
 * description: Hero avec trois écrans d'application en perspective inclinée qui se redressent légèrement au survol.
 * prompt: Create a product hero: headline, subtitle and two CTAs above a stage where three app screen mockups (CSS-only UI: sidebar, charts bars, cards) sit in 3D perspective, rotated and overlapping; hovering the stage straightens them (rotateX/Y transition); reduced motion keeps them static. The stage scales down on mobile without changing layout width. Light and dark mode.
 */
export function TiltedScreensHero() {
  const screen = (accent: string) => (
    <div className="flex h-full overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-900">
      <div className="w-1/5 space-y-1.5 border-r border-zinc-100 p-2 dark:border-zinc-800">{[0, 1, 2, 3].map((line) => <span key={line} className={`block h-1.5 rounded ${line === 1 ? accent : 'bg-zinc-200 dark:bg-zinc-700'}`} />)}</div>
      <div className="flex-1 p-3">
        <span className="block h-2 w-1/3 rounded bg-zinc-300 dark:bg-zinc-600" />
        <div className="mt-3 flex h-1/2 items-end gap-1.5">{[40, 65, 35, 80, 55, 90, 70].map((h, i) => <span key={i} className={`flex-1 rounded-t ${i === 5 ? accent : 'bg-zinc-200 dark:bg-zinc-700'}`} style={{ height: `${h}%` }} />)}</div>
        <div className="mt-3 grid grid-cols-3 gap-1.5">{[0, 1, 2].map((card) => <span key={card} className="h-5 rounded bg-zinc-100 dark:bg-zinc-800" />)}</div>
      </div>
    </div>
  );

  return (
    <section className="w-full max-w-5xl overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-b from-zinc-50 to-white px-6 pt-12 text-center dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950">
      <h1 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">One dashboard for every team you run.</h1>
      <p className="mx-auto mt-4 max-w-xl text-zinc-600 dark:text-zinc-400">Sales, support and product metrics side by side. Set up in an afternoon.</p>
      <div className="mt-7 flex justify-center gap-3"><a href="#trial" className="rounded-xl bg-zinc-950 px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Start free trial</a><a href="#tour" className="rounded-xl border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-800 dark:border-zinc-700 dark:text-zinc-200">Take the tour</a></div>
      <div className="group relative mx-auto mt-10 h-52 max-w-3xl [perspective:1400px] sm:h-60">
        <div className="absolute left-[2%] top-8 h-40 w-[46%] transition-transform duration-700 [transform:rotateY(22deg)_rotateX(8deg)] group-hover:[transform:rotateY(10deg)_rotateX(4deg)] motion-reduce:transition-none sm:h-48">{screen('bg-violet-500')}</div>
        <div className="absolute right-[2%] top-8 h-40 w-[46%] transition-transform duration-700 [transform:rotateY(-22deg)_rotateX(8deg)] group-hover:[transform:rotateY(-10deg)_rotateX(4deg)] motion-reduce:transition-none sm:h-48">{screen('bg-amber-500')}</div>
        <div className="absolute left-1/2 top-0 z-10 h-44 w-[56%] transition-transform duration-700 [transform:translateX(-50%)_rotateX(14deg)] group-hover:[transform:translateX(-50%)_rotateX(4deg)] motion-reduce:transition-none sm:h-56">{screen('bg-teal-500')}</div>
      </div>
    </section>
  );
}
