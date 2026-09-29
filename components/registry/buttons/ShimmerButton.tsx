/**
 * @registry
 * name: Shimmer Button
 * category: Buttons
 * style: Dark
 * tags: featured, recent
 * description: Bouton CTA avec un reflet lumineux qui balaie la surface a intervalle regulier.
 * prompt: Create a pill CTA button in React + Tailwind: solid zinc-950 (white in dark mode), a skewed translucent highlight that sweeps across every ~3s via a CSS keyframe, an arrow icon that nudges right on hover, press scale .97, visible focus ring, animation disabled with prefers-reduced-motion.
 */
import { ArrowRight } from 'lucide-react';

export function ShimmerButton() {
  return (
    <>
      <style>{`@keyframes pui-shimmer{0%{transform:translateX(0)}60%,100%{transform:translateX(300%)}}`}</style>
      <button
        type="button"
        className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-zinc-950 px-7 text-sm font-semibold text-white shadow-lg shadow-zinc-950/20 transition active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:bg-white dark:text-zinc-950 dark:shadow-white/10 dark:focus-visible:ring-offset-zinc-950"
      >
        <span
          aria-hidden
          className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent motion-safe:animate-[pui-shimmer_2.8s_ease-in-out_infinite] dark:via-teal-400/30"
        />
        <span className="relative">Get early access</span>
        <ArrowRight aria-hidden className="relative size-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </>
  );
}
