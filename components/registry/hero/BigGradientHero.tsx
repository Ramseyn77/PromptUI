/**
 * @registry
 * name: Big Gradient Hero
 * category: Hero
 * style: Gradient
 * tags: recent
 * description: Hero typographique géant dont chaque ligne porte un dégradé animé différent, avec mots qui glissent à l'apparition.
 * prompt: Create a typography-only hero: three huge stacked words ("Plan." "Build." "Grow.") each filled with a different slowly animating gradient (background-position loop), sliding up with a staggered entrance on mount; a short subtitle and one CTA below. Font size clamps with viewport. Animations off with reduced motion. Light and dark mode.
 */
export function BigGradientHero() {
  const words = [['Plan.', 'from-sky-500 via-indigo-500 to-sky-500'], ['Build.', 'from-fuchsia-500 via-orange-400 to-fuchsia-500'], ['Grow.', 'from-emerald-500 via-teal-300 to-emerald-500']];

  return (
    <section className="w-full max-w-4xl rounded-3xl bg-white px-6 py-14 dark:bg-zinc-950">
      <style>{`@keyframes pui-gradient-pan{to{background-position:200% 0}}@keyframes pui-word-up{from{transform:translateY(60%);opacity:0}}`}</style>
      <h1 className="font-black leading-[0.9] tracking-tighter">
        {words.map(([word, tone], index) => (
          <span key={word} className="block overflow-hidden pb-2">
            <span className={`block bg-gradient-to-r bg-[length:200%_100%] bg-clip-text text-[length:clamp(3rem,10vw,6rem)] text-transparent motion-safe:animate-[pui-gradient-pan_6s_linear_infinite,pui-word-up_.8s_cubic-bezier(.22,1,.36,1)_both] ${tone}`} style={{ animationDelay: `0s, ${index * 0.12}s` }}>{word}</span>
          </span>
        ))}
      </h1>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-zinc-600 dark:text-zinc-400">The operating system for small studios: projects, clients and invoices in one calm place.</p>
        <a href="#start" className="w-fit rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Start for free</a>
      </div>
    </section>
  );
}
