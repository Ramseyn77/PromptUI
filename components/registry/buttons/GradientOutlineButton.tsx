/**
 * @registry
 * name: Gradient Outline Button
 * category: Buttons
 * style: Gradient
 * tags: recent
 * description: Boutons à contour dégradé dont le fond se remplit du dégradé au survol, en trois tailles.
 * prompt: Create gradient outline buttons: a 2px gradient border (teal → violet → pink) done with a gradient wrapper and inner surface; on hover/focus the inner surface fades out so the gradient fills the button and the text turns white; three sizes (sm, md, lg) plus an icon-only round variant with aria-label. Light and dark mode.
 */
import { ArrowRight, Sparkles } from 'lucide-react';

const sizes = [['px-3 py-1.5 text-xs', 'Small'], ['px-4 py-2 text-sm', 'Medium'], ['px-6 py-3 text-base', 'Large']] as const;

export function GradientOutlineButton() {
  const wrap = 'group relative inline-flex rounded-full bg-gradient-to-r from-teal-400 via-violet-500 to-pink-500 p-[2px] outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950';

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {sizes.map(([size, label]) => (
        <button key={label} type="button" className={wrap}>
          <span className={`inline-flex items-center gap-1.5 rounded-full bg-white font-semibold text-zinc-900 transition-colors duration-300 group-hover:bg-transparent group-hover:text-white group-focus-visible:bg-transparent group-focus-visible:text-white dark:bg-zinc-950 dark:text-zinc-100 ${size}`}>{label}<ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" /></span>
        </button>
      ))}
      <button type="button" aria-label="Generate with AI" className={wrap}>
        <span className="grid size-10 place-items-center rounded-full bg-white text-violet-600 transition-colors duration-300 group-hover:bg-transparent group-hover:text-white dark:bg-zinc-950 dark:text-violet-300"><Sparkles aria-hidden className="size-4" /></span>
      </button>
    </div>
  );
}
