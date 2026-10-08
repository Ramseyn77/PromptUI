/**
 * @registry
 * name: Grid Glow Hero
 * category: Hero
 * style: Dark
 * tags: featured, recent
 * description: Hero centré sur fond quadrillé qui s'estompe, halo lumineux et double CTA.
 * prompt: Create a centered hero on a masked grid background (CSS linear-gradient lines fading with a radial mask) with a soft top glow, pill badge, large headline, subtitle and two CTAs. Dark by default with a light mode variant.
 */
export function GridGlowHero() {
  return (
    <section className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-zinc-50 px-6 py-20 text-center dark:bg-zinc-950">
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,rgb(0_0_0/.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(0_0_0/.06)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)] dark:bg-[linear-gradient(to_right,rgb(255_255_255/.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/.07)_1px,transparent_1px)]"
      />
      <div aria-hidden className="absolute left-1/2 top-0 h-56 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-violet-500/25 blur-3xl" />
      <div className="relative mx-auto max-w-2xl">
        <span className="rounded-full border border-zinc-300 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-600 backdrop-blur dark:border-white/15 dark:bg-white/5 dark:text-zinc-300">Open source · MIT</span>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-6xl dark:text-white">The component layer for ambitious products</h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400">Accessible building blocks, sensible defaults and prompts your AI agent understands.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" className="rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950">Get started</button>
          <button type="button" className="rounded-full border border-zinc-300 bg-white/60 px-6 py-3 text-sm font-semibold text-zinc-800 backdrop-blur transition hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">Browse components</button>
        </div>
      </div>
    </section>
  );
}
