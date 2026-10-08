/**
 * @registry
 * name: Elastic Press Button
 * category: Buttons
 * style: Gradient
 * tags: recent
 * description: Boutons gélatineux qui s'écrasent à l'appui puis rebondissent avec un ressort, en trois couleurs.
 * prompt: Create elastic "jelly" buttons: on press (pointer down or Space/Enter) the button squashes (scaleX 1.15 / scaleY 0.85), and on release it plays a springy wobble keyframe (scale overshoot) before settling; three pill buttons in mint, peach and lilac with dark text and soft colored shadows. Wobble disabled with reduced motion. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const buttons = [['Save draft', 'bg-emerald-300 shadow-emerald-400/40'], ['Share', 'bg-orange-300 shadow-orange-400/40'], ['Publish', 'bg-violet-300 shadow-violet-400/40']] as const;

export function ElasticPressButton() {
  const [pressed, setPressed] = useState<string | null>(null);
  const [wobble, setWobble] = useState<Record<string, number>>({});

  const release = (label: string) => { setPressed(null); setWobble((value) => ({ ...value, [label]: (value[label] ?? 0) + 1 })); };

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <style>{`@keyframes pui-jelly{0%{transform:scale(1.15,.85)}30%{transform:scale(.9,1.1)}50%{transform:scale(1.06,.94)}70%{transform:scale(.98,1.02)}100%{transform:scale(1)}}@keyframes pui-jelly-b{0%{transform:scale(1.15,.85)}30%{transform:scale(.9,1.1)}50%{transform:scale(1.06,.94)}70%{transform:scale(.98,1.02)}100%{transform:scale(1)}}`}</style>
      {buttons.map(([label, tone]) => (
        <button
          key={label}
          type="button"
          onPointerDown={() => setPressed(label)}
          onPointerUp={() => release(label)}
          onPointerLeave={() => pressed === label && release(label)}
          onKeyDown={(event) => { if (event.key === ' ' || event.key === 'Enter') setPressed(label); }}
          onKeyUp={(event) => { if (event.key === ' ' || event.key === 'Enter') release(label); }}
          className={`rounded-full px-6 py-3 text-sm font-bold text-zinc-900 shadow-lg outline-none transition-transform duration-100 focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:focus-visible:ring-white dark:focus-visible:ring-offset-zinc-950 ${tone} ${pressed === label ? 'scale-x-[1.15] scale-y-[0.85]' : wobble[label] ? (wobble[label] % 2 ? 'motion-safe:animate-[pui-jelly_.6s_ease-out]' : 'motion-safe:animate-[pui-jelly-b_.6s_ease-out]') : ''}`}
        >{label}</button>
      ))}
    </div>
  );
}
