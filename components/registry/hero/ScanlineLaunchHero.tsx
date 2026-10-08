/**
 * @registry
 * name: Scanline Launch Hero
 * category: Hero
 * style: Dark
 * tags: featured, recent
 * description: Hero de lancement avec grille technique et faisceau lumineux qui balaie la scène.
 * prompt: Create a dark product-launch hero with a technical grid background, a slow horizontal scan beam, a compact release badge, a bold responsive headline, supporting copy and two CTA buttons. Add three small floating status chips that remain decorative and hide the least important ones on narrow screens. Keep all text readable without animation, use scoped CSS keyframes and respect prefers-reduced-motion.
 */

import { ArrowUpRight, CircleCheck, Sparkles } from 'lucide-react';

export function ScanlineLaunchHero() {
  return (
    <section className="relative w-full overflow-hidden rounded-[2rem] bg-zinc-950 px-5 py-14 text-center text-white sm:px-10 sm:py-20 lg:py-24">
      <style>{`@keyframes pui-scanline{0%{transform:translateX(-130%)}100%{transform:translateX(230%)}}@keyframes pui-chip-float{50%{transform:translateY(-8px)}}@media(prefers-reduced-motion:reduce){.pui-scan,.pui-float{animation:none!important}}`}</style>
      <div aria-hidden className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:36px_36px]" />
      <div aria-hidden className="pui-scan absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-teal-400/20 to-transparent blur-xl motion-safe:animate-[pui-scanline_5s_ease-in-out_infinite]" />
      <div aria-hidden className="absolute left-1/2 top-1/3 size-72 -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl" />
      <span aria-hidden className="pui-float absolute left-[7%] top-10 hidden rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-teal-200 backdrop-blur sm:block motion-safe:animate-[pui-chip-float_3.2s_ease-in-out_infinite]">99.99% uptime</span>
      <span aria-hidden className="pui-float absolute bottom-12 right-[6%] hidden rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-violet-200 backdrop-blur md:block motion-safe:animate-[pui-chip-float_3.8s_.5s_ease-in-out_infinite]">Deploy in 42s</span>
      <div className="relative mx-auto max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-300/10 px-3 py-1.5 text-xs font-semibold text-teal-200"><Sparkles aria-hidden className="size-3.5" /> PromptUI 2.0 is live</span>
        <h1 className="mt-5 text-balance text-4xl font-black leading-[.98] tracking-tight sm:mt-6 sm:text-6xl lg:text-7xl">From prompt to polished interface.</h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-zinc-400 sm:mt-6 sm:text-base">Explore production-ready components, understand every interaction and ship a consistent product faster.</p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row">
          <button className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-zinc-950 transition hover:bg-teal-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"><CircleCheck aria-hidden className="size-4" /> Explore components</button>
          <button className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60">Read the docs <ArrowUpRight aria-hidden className="size-4" /></button>
        </div>
      </div>
    </section>
  );
}
