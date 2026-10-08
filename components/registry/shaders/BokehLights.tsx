/**
 * @registry
 * name: Bokeh Lights
 * category: Shaders
 * style: Gradient
 * tags: recent
 * description: Fond de lumières bokeh flottantes, floues et superposées, aux teintes chaudes ou froides au choix.
 * prompt: Create a bokeh lights background in CSS: ~18 soft blurred circles of varying size and opacity with mix-blend screen drift slowly on independent keyframe paths over a deep gradient; positions and timings come from a deterministic table (no Math.random in render); a Warm / Cool toggle swaps the palette with a color transition; static with reduced motion; centered headline. Works in light and dark (always a night scene).
 */
'use client';
import { useState } from 'react';

const lights = Array.from({ length: 18 }, (_, index) => ({
  left: (index * 37) % 100,
  top: (index * 53 + 11) % 100,
  size: 40 + ((index * 29) % 90),
  delay: -((index * 7) % 14),
  duration: 12 + ((index * 5) % 10),
  opacity: 0.25 + ((index * 13) % 50) / 100,
  path: index % 3,
}));
const palettes = { Warm: ['#fbbf24', '#fb7185', '#f97316'], Cool: ['#38bdf8', '#a78bfa', '#2dd4bf'] } as const;

export function BokehLights() {
  const [palette, setPalette] = useState<keyof typeof palettes>('Warm');

  return (
    <div className="relative h-72 w-full max-w-xl overflow-hidden rounded-3xl bg-[linear-gradient(160deg,#0f0a1e,#1a1033_55%,#09090b)]">
      <style>{`
        @keyframes pui-bokeh-0 { 0%, 100% { transform: translate(0, 0) } 50% { transform: translate(30px, -24px) } }
        @keyframes pui-bokeh-1 { 0%, 100% { transform: translate(0, 0) } 50% { transform: translate(-26px, 18px) } }
        @keyframes pui-bokeh-2 { 0%, 100% { transform: translate(0, 0) scale(1) } 50% { transform: translate(14px, 26px) scale(1.15) } }
      `}</style>
      {lights.map((light, index) => (
        <span key={index} aria-hidden className="absolute rounded-full mix-blend-screen blur-md transition-colors duration-1000 motion-safe:animate-[var(--pui-anim)]" style={{ left: `${light.left}%`, top: `${light.top}%`, width: light.size, height: light.size, marginLeft: -light.size / 2, marginTop: -light.size / 2, opacity: light.opacity, background: `radial-gradient(circle, ${palettes[palette][index % 3]} 0%, transparent 70%)`, ['--pui-anim' as string]: `pui-bokeh-${light.path} ${light.duration}s ease-in-out ${light.delay}s infinite` }} />
      ))}
      <div className="relative grid h-full place-items-center p-6 text-center">
        <div>
          <p className="text-3xl font-semibold tracking-tight text-white">City after dark</p>
          <div role="group" aria-label="Light palette" className="mt-4 inline-flex rounded-full bg-white/10 p-1 text-xs backdrop-blur">{(Object.keys(palettes) as (keyof typeof palettes)[]).map((name) => <button key={name} type="button" aria-pressed={palette === name} onClick={() => setPalette(name)} className={`rounded-full px-3 py-1 font-medium ${palette === name ? 'bg-white text-zinc-900' : 'text-white/80'}`}>{name}</button>)}</div>
        </div>
      </div>
    </div>
  );
}
