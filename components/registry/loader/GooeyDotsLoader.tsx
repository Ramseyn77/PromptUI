/**
 * @registry
 * name: Gooey Dots Loader
 * category: Loader
 * style: Gradient
 * tags: featured, recent
 * description: Loader liquide : des gouttes fusionnent et se séparent autour d'un centre grâce à un filtre SVG gooey, en dégradé animé.
 * prompt: Create a gooey loader: five colored dots orbit and bounce horizontally around a central blob with staggered CSS keyframes; an SVG filter (feGaussianBlur + feColorMatrix alpha threshold, id from useId) applied to the container makes them merge like liquid; colors use a violet→pink→amber gradient; role=status with an sr-only "Loading"; reduced motion shows the static blob. Light and dark mode.
 */
import { useId } from 'react';

export function GooeyDotsLoader() {
  const filterId = `pui-goo-loader-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const dots = [['#8b5cf6', 0], ['#a855f7', 0.15], ['#ec4899', 0.3], ['#f97316', 0.45], ['#f59e0b', 0.6]] as const;

  return (
    <div role="status" className="grid place-items-center p-10">
      <style>{`
        @keyframes pui-goo-move { 0%, 100% { transform: translateX(-42px) } 50% { transform: translateX(42px) } }
        @keyframes pui-goo-pulse { 0%, 100% { transform: scale(1) } 50% { transform: scale(1.25) } }
      `}</style>
      <svg aria-hidden className="absolute size-0"><defs><filter id={filterId}><feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" /><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" /></filter></defs></svg>
      <div aria-hidden className="relative h-16 w-48" style={{ filter: `url(#${filterId})` }}>
        <span className="absolute left-1/2 top-1/2 -ml-5 -mt-5 size-10 rounded-full bg-fuchsia-500 motion-safe:animate-[pui-goo-pulse_1.6s_ease-in-out_infinite]" />
        {dots.map(([color, delay]) => <span key={color} className="absolute left-1/2 top-1/2 -ml-3 -mt-3 size-6 rounded-full motion-safe:animate-[pui-goo-move_1.6s_ease-in-out_infinite]" style={{ background: color, animationDelay: `${delay}s` }} />)}
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
}
