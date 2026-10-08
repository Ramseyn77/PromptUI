/**
 * @registry
 * name: Radar Scan Loader
 * category: Loader
 * style: Dark
 * tags: recent
 * description: Loader radar : faisceau rotatif sur cercles concentriques, échos qui apparaissent et compteur d'appareils trouvés.
 * prompt: Create a radar scan loader on a dark panel: concentric rings and crosshair lines, a rotating conic-gradient sweep beam, four blips at fixed positions that light up and fade when the beam passes (timed with animation-delay), a "Scanning for devices…" label with a found counter that increments after mount, role=status; static beam with reduced motion. Dark in both themes.
 */
'use client';
import { useEffect, useState } from 'react';

const blips = [{ x: 68, y: 30, delay: 0.45 }, { x: 72, y: 68, delay: 1.1 }, { x: 30, y: 74, delay: 1.75 }, { x: 36, y: 34, delay: 2.5 }];

export function RadarScanLoader() {
  const [found, setFound] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setFound((value) => (value >= 4 ? 0 : value + 1)), 900);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div role="status" className="flex w-full max-w-xs flex-col items-center rounded-3xl bg-zinc-950 p-6 ring-1 ring-white/10">
      <style>{`
        @keyframes pui-radar-spin { to { transform: rotate(360deg) } }
        @keyframes pui-radar-blip { 0%, 8% { opacity: 1; transform: scale(1.4) } 40%, 100% { opacity: .1; transform: scale(1) } }
      `}</style>
      <div aria-hidden className="relative size-48 overflow-hidden rounded-full bg-[radial-gradient(circle,#052e1a,#020a06)] ring-1 ring-emerald-500/30">
        {[25, 50, 75].map((size) => <span key={size} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-500/20" style={{ width: `${size}%`, height: `${size}%` }} />)}
        <span className="absolute inset-x-0 top-1/2 h-px bg-emerald-500/20" />
        <span className="absolute inset-y-0 left-1/2 w-px bg-emerald-500/20" />
        <span className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,rgba(16,185,129,0.55),transparent_70deg)] motion-safe:animate-[pui-radar-spin_3s_linear_infinite]" />
        {blips.map((blip) => <span key={blip.x} className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300 opacity-10 shadow-[0_0_10px_#6ee7b7] motion-safe:animate-[pui-radar-blip_3s_linear_infinite]" style={{ left: `${blip.x}%`, top: `${blip.y}%`, animationDelay: `${blip.delay}s` }} />)}
      </div>
      <p className="mt-5 text-sm font-medium text-emerald-200">Scanning for devices…</p>
      <p aria-hidden className="mt-1 text-xs tabular-nums text-emerald-500/80">{found} found</p>
    </div>
  );
}
