/**
 * @registry
 * name: Ripple Background
 * category: Shaders
 * style: Minimal
 * tags: recent
 * description: Cercles concentriques qui respirent en cascade derrière un contenu centré, comme une onde.
 * prompt: Create a ripple background: 8 concentric circles centered behind content, each slightly larger and more transparent, scaling softly (0.95 to 1) with staggered delays so a wave seems to travel outward; circles masked to fade at the bottom. Centered content: icon tile, title, subtitle. Static with reduced motion. Light and dark mode.
 */
import { Radio } from 'lucide-react';

export function RippleBackground() {
  return (
    <div className="relative grid h-80 w-full max-w-xl place-items-center overflow-hidden rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <style>{`@keyframes pui-ripple-bg{0%,100%{transform:translate(-50%,-50%) scale(1)}50%{transform:translate(-50%,-50%) scale(.9)}}`}</style>
      <div aria-hidden className="absolute inset-0 [mask-image:linear-gradient(to_bottom,#fff,transparent)]">
        {Array.from({ length: 8 }, (_, index) => {
          const size = 120 + index * 70;
          return (
            <span
              key={index}
              className="absolute left-1/2 top-1/2 rounded-full border border-zinc-300 bg-zinc-200/30 shadow-xl motion-safe:animate-[pui-ripple-bg_3.4s_ease_infinite] dark:border-teal-400/30 dark:bg-teal-400/5"
              style={{ width: size, height: size, opacity: 0.9 - index * 0.1, animationDelay: `${index * 0.06}s`, transform: 'translate(-50%,-50%)' }}
            />
          );
        })}
      </div>
      <div className="relative text-center">
        <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-zinc-950 text-white dark:bg-teal-400 dark:text-zinc-950"><Radio aria-hidden className="size-6" /></span>
        <p className="mt-4 text-2xl font-bold text-zinc-950 dark:text-zinc-50">Broadcasting live</p>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">1,204 listeners tuned in</p>
      </div>
    </div>
  );
}
