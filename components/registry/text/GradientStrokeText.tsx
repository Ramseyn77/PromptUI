/**
 * @registry
 * name: Gradient Stroke Text
 * category: Text
 * style: Gradient
 * tags: recent
 * description: Titre en contour dégradé (SVG) dont le trait se dessine puis se remplit au survol.
 * prompt: Create gradient stroke text with SVG: a big word drawn as text with a linear-gradient stroke, transparent fill and stroke-dasharray animation that draws the outline on mount; on hover/focus the fill fades in with the same gradient. The SVG has role="img" and aria-label with the word; draw animation skipped with reduced motion. Light and dark mode.
 */
'use client';
import { useId } from 'react';

export function GradientStrokeText() {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');

  return (
    <a href="#create" className="group block w-full max-w-xl outline-none focus-visible:ring-2 focus-visible:ring-violet-500">
      <style>{`@keyframes pui-stroke-draw{from{stroke-dashoffset:1400}to{stroke-dashoffset:0}}`}</style>
      <svg viewBox="0 0 600 140" role="img" aria-label="Create" className="w-full">
        <defs>
          <linearGradient id={`g${id}`} x1="0" x2="1"><stop offset="0" stopColor="#14b8a6" /><stop offset=".5" stopColor="#8b5cf6" /><stop offset="1" stopColor="#f43f5e" /></linearGradient>
        </defs>
        <text x="50%" y="108" textAnchor="middle" fontSize="128" fontWeight="900" fontFamily="ui-sans-serif, system-ui" stroke={`url(#g${id})`} strokeWidth="2.5" strokeDasharray="1400" className="fill-transparent transition-[fill] duration-500 motion-safe:animate-[pui-stroke-draw_2.2s_ease-out_both] group-hover:fill-[color:var(--pui-fill)] group-focus-visible:fill-[color:var(--pui-fill)]" style={{ ['--pui-fill' as string]: `url(#g${id})` }}>CREATE</text>
      </svg>
    </a>
  );
}
