/**
 * @registry
 * name: Interactive Hover Button
 * category: Buttons
 * style: Minimal
 * tags: featured, recent
 * description: Bouton dont le point s'étend pour remplir le fond tandis que le texte glisse et une flèche apparaît.
 * prompt: Create an interactive hover button: outlined pill with a small dot before the label; on hover/focus the dot scales up to fill the whole button with the foreground color, the label slides out to the right and a duplicate label with an arrow slides in from the right in inverted color. Uses transforms only; works in light and dark mode.
 */
import { ArrowRight } from 'lucide-react';

export function InteractiveHoverButton() {
  return (
    <button type="button" className="group relative w-44 overflow-hidden rounded-full border border-zinc-300 bg-white p-2.5 px-6 text-center text-sm font-semibold text-zinc-950 outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus-visible:ring-offset-zinc-950">
      <span className="flex items-center justify-center gap-2">
        <span aria-hidden className="size-2 rounded-full bg-zinc-950 transition-transform duration-500 group-hover:scale-[60] group-focus-visible:scale-[60] dark:bg-zinc-50" />
        <span className="inline-block transition duration-500 group-hover:translate-x-24 group-hover:opacity-0 group-focus-visible:translate-x-24 group-focus-visible:opacity-0">Get started</span>
      </span>
      <span aria-hidden className="absolute inset-0 z-10 flex translate-x-12 items-center justify-center gap-2 text-white opacity-0 transition duration-500 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 dark:text-zinc-950">
        Get started <ArrowRight className="size-4" />
      </span>
    </button>
  );
}
