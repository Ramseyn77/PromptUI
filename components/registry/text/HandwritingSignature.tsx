/**
 * @registry
 * name: Handwriting Signature
 * category: Text
 * style: Editorial
 * tags: recent
 * description: Signature manuscrite en SVG qui se dessine d'un trait continu, avec bouton pour la retracer.
 * prompt: Create an animated SVG signature: a single cursive-like path drawn with stroke-dasharray/dashoffset over ~2.5s (pathLength="1" for easy math), round caps, ink color via currentColor, restart via a key change on a "Sign again" button; sr-only text of the name. Light and dark mode.
 */
'use client';
import { useState } from 'react';

export function HandwritingSignature() {
  const [run, setRun] = useState(0);

  return (
    <>
      <style>{`@keyframes pui-sign{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}`}</style>
      <figure className="flex flex-col items-center gap-3 text-zinc-900 dark:text-zinc-100">
        <svg key={run} viewBox="0 0 320 110" className="w-72" role="img" aria-label="Signature: Camille Martin">
          <path
            pathLength={1}
            d="M20 70c10-30 30-45 42-40 12 5-6 40-20 48-14 8 4-20 26-28 16-6 12 18 22 18 12 0 16-26 26-24 8 2-4 22 6 22 12 0 18-30 28-28 8 2-2 24 8 24 14 0 20-34 34-32 12 2 2 30 16 28 18-2 30-28 46-30 14-2 20 10 32 6"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={1}
            className="motion-safe:animate-[pui-sign_2.6s_ease-in-out_both]"
          />
          <path pathLength={1} d="M40 92h230" stroke="currentColor" strokeOpacity=".25" strokeWidth={1.5} strokeDasharray={1} className="motion-safe:animate-[pui-sign_1s_2.4s_ease-out_both]" />
        </svg>
        <figcaption className="text-sm text-zinc-500 dark:text-zinc-400">Camille Martin, Founder</figcaption>
        <button type="button" onClick={() => setRun((value) => value + 1)} className="text-xs font-medium text-teal-700 hover:underline dark:text-teal-400">Sign again</button>
      </figure>
    </>
  );
}
