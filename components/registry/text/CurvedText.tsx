/**
 * @registry
 * name: Curved Text
 * category: Text
 * style: Minimal
 * tags: recent
 * description: Texte dispose en cercle via SVG textPath qui tourne lentement autour d une icone centrale.
 * prompt: Create a rotating circular text badge: SVG circle path with <textPath> repeating "SCROLL TO EXPLORE • MADE WITH CARE •" in uppercase tracking, rotating slowly (CSS keyframe on the SVG), with a centered arrow icon; text uses currentColor for light/dark. Accessible label on the wrapper, reduced-motion safe.
 */
import { ArrowDown } from 'lucide-react';

export function CurvedText() {
  return (
    <>
      <style>{`@keyframes pui-rotate-text{to{transform:rotate(360deg)}}`}</style>
      <div role="img" aria-label="Scroll to explore" className="relative grid size-40 place-items-center text-zinc-900 dark:text-white">
        <svg viewBox="0 0 100 100" className="absolute inset-0 motion-safe:animate-[pui-rotate-text_14s_linear_infinite]">
          <defs><path id="pui-circle-path" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" /></defs>
          <text className="fill-current text-[8.4px] font-semibold uppercase tracking-[.18em]"><textPath href="#pui-circle-path">Scroll to explore • Made with care •</textPath></text>
        </svg>
        <span className="grid size-14 place-items-center rounded-full bg-teal-500 text-white"><ArrowDown aria-hidden className="size-6" /></span>
      </div>
    </>
  );
}
