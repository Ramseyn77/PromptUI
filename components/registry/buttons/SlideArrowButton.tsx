/**
 * @registry
 * name: Slide Arrow Button
 * category: Buttons
 * style: Editorial
 * tags: recent
 * description: Bouton dont le texte glisse vers le haut et est remplacé par une copie pendant qu'une flèche entre.
 * prompt: Create a CTA whose label rolls up on hover/focus (two stacked copies in an overflow-hidden line, translateY -100%) while an arrow slides in from the left into a circle that grows; springy easing. Dark in light mode, light in dark mode.
 */
import { ArrowRight } from 'lucide-react';

export function SlideArrowButton() {
  return (
    <button type="button" className="group inline-flex h-14 items-center gap-3 rounded-full bg-zinc-950 pl-6 pr-2 text-sm font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:bg-white dark:text-zinc-950 dark:focus-visible:ring-offset-zinc-950">
      <span className="relative h-5 overflow-hidden">
        <span className="block transition-transform duration-500 ease-[cubic-bezier(.65,0,.35,1)] group-hover:-translate-y-full group-focus-visible:-translate-y-full">Start a project</span>
        <span aria-hidden className="absolute left-0 top-full block transition-transform duration-500 ease-[cubic-bezier(.65,0,.35,1)] group-hover:-translate-y-full group-focus-visible:-translate-y-full">Start a project</span>
      </span>
      <span className="grid size-10 place-items-center overflow-hidden rounded-full bg-teal-400 text-zinc-950 transition-transform duration-500 group-hover:scale-110">
        <ArrowRight aria-hidden className="size-4 -translate-x-6 transition-transform duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:translate-x-0 group-focus-visible:translate-x-0" />
      </span>
    </button>
  );
}
