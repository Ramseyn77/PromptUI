/**
 * @registry
 * name: Liquid Fill Switch
 * category: Toggle
 * style: Gradient
 * tags: recent
 * description: Switch dont la couleur monte comme un liquide lorsque l option est activee.
 * prompt: Create an accessible liquid-fill toggle. The control is a large rounded switch with a white thumb; when enabled, a teal-to-violet liquid layer rises inside the track with a gently waving top edge and the thumb slides right. Include a visible label and status text, use role="switch" with aria-checked, support keyboard activation, light/dark mode and prefers-reduced-motion.
 */
'use client';

import { useState } from 'react';

export function LiquidFillSwitch() {
  const [enabled, setEnabled] = useState(false);
  return (
    <div className="flex items-center gap-4 rounded-[2rem] border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <style>{`@keyframes pui-liquid-wave{from{transform:translateX(-50%) rotate(0deg)}to{transform:translateX(-50%) rotate(360deg)}}@media(prefers-reduced-motion:reduce){.pui-liquid-wave{animation:none!important}}`}</style>
      <button type="button" role="switch" aria-checked={enabled} aria-label="Enable live sync" onClick={() => setEnabled((value) => !value)} className={`relative h-14 w-24 shrink-0 overflow-hidden rounded-full border-2 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 ${enabled ? 'border-teal-400 bg-teal-50 dark:bg-teal-950' : 'border-zinc-300 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900'}`}>
        <span aria-hidden className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-violet-600 to-teal-400 transition-[height] duration-700 ${enabled ? 'h-[78%]' : 'h-0'}`}>
          {/* A large rounded square in the track color spins over the liquid surface: its uneven corners carve a moving wave. */}
          <span className={`pui-liquid-wave absolute bottom-[calc(100%_-_6px)] left-1/2 size-48 rounded-[42%] bg-teal-50 transition-opacity duration-300 motion-safe:animate-[pui-liquid-wave_4s_linear_infinite] dark:bg-teal-950 ${enabled ? 'opacity-100' : 'opacity-0'}`} style={{ transform: 'translateX(-50%)' }} />
        </span>
        <span aria-hidden className={`absolute top-1/2 size-11 -translate-y-1/2 rounded-full bg-white shadow-lg transition-[left] duration-500 ${enabled ? 'left-[calc(100%_-_2.95rem)]' : 'left-1'}`} />
      </button>
      <div><p className="text-sm font-semibold text-zinc-950 dark:text-white">Live sync</p><p className={`mt-1 text-xs font-medium ${enabled ? 'text-teal-600 dark:text-teal-400' : 'text-zinc-500'}`} aria-live="polite">{enabled ? 'Connected and updating' : 'Updates are paused'}</p></div>
    </div>
  );
}
