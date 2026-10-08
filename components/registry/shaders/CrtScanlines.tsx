/**
 * @registry
 * name: CRT Scanlines
 * category: Shaders
 * style: Dark
 * tags: recent
 * description: Écran cathodique rétro : lignes de balayage, vignettage, aberration chromatique et barre de rafraîchissement qui défile.
 * prompt: Create a retro CRT screen effect in pure CSS: a rounded, slightly curved screen with a green phosphor terminal text, repeating-linear-gradient scanlines, a radial vignette, a subtle RGB chromatic offset via text-shadow, a bright refresh bar sweeping top to bottom and a faint flicker; a "power" toggle collapses the picture into a horizontal line then a dot; animations disabled with reduced motion. Dark in both themes.
 */
'use client';
import { useState } from 'react';

export function CrtScanlines() {
  const [on, setOn] = useState(true);

  return (
    <div className="w-full max-w-lg rounded-[2rem] bg-zinc-800 p-4 shadow-2xl ring-1 ring-black/40">
      <style>{`
        @keyframes pui-crt-sweep { from { transform: translateY(-100%) } to { transform: translateY(900%) } }
        @keyframes pui-crt-flicker { 0%, 100% { opacity: 1 } 50% { opacity: .94 } }
        @keyframes pui-crt-off { 0% { transform: scale(1, 1) } 60% { transform: scale(1, .004) } 100% { transform: scale(0, .004) } }
        @keyframes pui-crt-on { 0% { transform: scale(0, .004) } 40% { transform: scale(1, .004) } 100% { transform: scale(1, 1) } }
        @media (prefers-reduced-motion: reduce) { .pui-crt * { animation: none !important } }
      `}</style>
      <div className="pui-crt relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-black">
        <div className="absolute inset-0 motion-safe:animate-[pui-crt-flicker_.12s_infinite]" style={{ animation: on ? 'pui-crt-on .5s ease-out both' : 'pui-crt-off .45s ease-in forwards' }}>
          <div className="h-full bg-[radial-gradient(ellipse_at_center,#0b2b17,#020a05)] p-6 font-mono text-sm leading-relaxed text-[#5bff8f]" style={{ textShadow: '1px 0 rgba(255,0,80,.55), -1px 0 rgba(0,180,255,.55), 0 0 8px rgba(91,255,143,.6)' }}>
            <p>PROMPT-OS v2.4 (c) 1987</p>
            <p>MEMORY CHECK ........ 640K OK</p>
            <p className="mt-3">&gt; LOAD &quot;HELLO&quot;,8,1</p>
            <p>SEARCHING FOR HELLO</p>
            <p>READY.</p>
            <p className="mt-3">&gt; <span className="inline-block h-4 w-2.5 translate-y-0.5 bg-[#5bff8f] motion-safe:animate-pulse" /></p>
          </div>
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,.35)_0_1px,transparent_1px_3px)]" />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[12%] bg-gradient-to-b from-transparent via-white/[.07] to-transparent motion-safe:animate-[pui-crt-sweep_5s_linear_infinite]" />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,.75))]" />
        </div>
        <div aria-hidden className={`pointer-events-none absolute inset-0 bg-black transition-opacity ${on ? 'opacity-0 duration-0' : 'opacity-100 delay-500 duration-200'}`} />
      </div>
      <div className="mt-3 flex items-center justify-between px-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">Prompt-Vision</span>
        <button type="button" aria-pressed={on} onClick={() => setOn(!on)} className="flex items-center gap-2 rounded-full bg-zinc-900 px-3 py-1.5 text-xs text-zinc-300 ring-1 ring-white/10 hover:text-white"><span className={`size-2 rounded-full ${on ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-zinc-600'}`} />Power</button>
      </div>
    </div>
  );
}
