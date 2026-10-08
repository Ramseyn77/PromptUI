/**
 * @registry
 * name: Outline Fill Text
 * category: Text
 * style: Editorial
 * tags: recent
 * description: Liste de mots en contour qui se remplissent de couleur de gauche à droite au survol.
 * prompt: Create a list of huge outlined words (-webkit-text-stroke, transparent fill) where hovering or focusing a word fills it left-to-right with color using a clipped duplicate layer (clip-path inset transition) and shows a small arrow. Links in a nav; light and dark mode.
 */
import { ArrowUpRight } from 'lucide-react';

const items = ['Work', 'About', 'Journal', 'Contact'];

export function OutlineFillText() {
  return (
    <nav aria-label="Main" className="w-full max-w-md">
      <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {items.map((item) => (
          <li key={item}>
            <a href="#" className="group flex items-center justify-between py-2 outline-none">
              <span className="relative text-5xl font-black uppercase tracking-tight">
                <span className="text-transparent [-webkit-text-stroke:1.5px_#18181b] dark:[-webkit-text-stroke:1.5px_#fafafa]">{item}</span>
                <span aria-hidden className="absolute inset-0 text-teal-600 transition-[clip-path] duration-500 ease-out [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0_0_0)] group-focus-visible:[clip-path:inset(0_0_0_0)] dark:text-teal-400">{item}</span>
              </span>
              <ArrowUpRight aria-hidden className="size-7 -translate-x-2 text-teal-600 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:opacity-100 dark:text-teal-400" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
