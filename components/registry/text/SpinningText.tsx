/**
 * @registry
 * name: Spinning Text
 * category: Text
 * style: Editorial
 * tags: recent
 * description: Badge circulaire dont le texte tourne en continu autour d'une flèche, ralentit au survol.
 * prompt: Create a spinning text badge: characters of "SCROLL TO EXPLORE • SCROLL TO EXPLORE • " are each positioned around a circle with rotate(i * 360/n deg) translateY(-radius), the ring rotates continuously (12s) and slows down on hover via animation-duration change; a center arrow button. Accessible label for the full text; static with reduced motion. Light and dark mode.
 */
import { ArrowDown } from 'lucide-react';

const text = 'SCROLL TO EXPLORE • SCROLL TO EXPLORE • ';

export function SpinningText() {
  const characters = text.split('');

  return (
    <a href="#explore" aria-label="Scroll to explore" className="group relative grid size-44 place-items-center rounded-full text-zinc-950 outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:text-zinc-50">
      <style>{`@keyframes pui-spin-text{to{transform:rotate(360deg)}}.pui-spin-ring{animation:pui-spin-text 12s linear infinite}.group:hover .pui-spin-ring{animation-duration:30s}@media (prefers-reduced-motion:reduce){.pui-spin-ring{animation:none}}`}</style>
      <span aria-hidden className="pui-spin-ring absolute inset-0">
        {characters.map((character, index) => (
          <span key={index} className="absolute left-1/2 top-1/2 -ml-[0.3em] -mt-[0.6em] font-mono text-[13px] font-bold" style={{ transform: `rotate(${(index * 360) / characters.length}deg) translateY(-72px)` }}>{character}</span>
        ))}
      </span>
      <span className="grid size-16 place-items-center rounded-full bg-zinc-950 text-white transition group-hover:scale-110 dark:bg-teal-400 dark:text-zinc-950"><ArrowDown aria-hidden className="size-6" /></span>
    </a>
  );
}
