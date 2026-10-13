/**
 * @registry
 * name: Wifi Signal Loader
 * category: Loader
 * style: Dark
 * tags: recent
 * description: Loader de connexion Wi-Fi : arcs qui s'allument du centre vers l'extérieur en boucle, puis état « Connecté » après la recherche.
 * prompt: Create a wifi connecting loader on a dark card: an SVG wifi glyph made of a dot and three arcs that light up sequentially from the inside out in a loop while "Connecting to Home 5G…" is shown; after 3 seconds it switches to a connected state with all arcs lit in emerald and "Connected · 120 Mbps"; a "Reconnect" button restarts the sequence; role=status announces both states; reduced motion keeps arcs static at half opacity while connecting. Dark in both themes.
 */
'use client';
import { useEffect, useState } from 'react';

export function WifiSignalLoader() {
  const [connected, setConnected] = useState(false);
  const [run, setRun] = useState(0);

  useEffect(() => {
    setConnected(false);
    const timer = window.setTimeout(() => setConnected(true), 3000);
    return () => window.clearTimeout(timer);
  }, [run]);

  const arc = () => `${connected ? 'stroke-emerald-400' : 'stroke-sky-400 opacity-20 motion-safe:animate-[pui-wifi-arc_1.4s_ease-in-out_infinite] motion-reduce:opacity-50'}`;

  return (
    <div className="flex w-full max-w-xs flex-col items-center rounded-3xl bg-zinc-950 p-8 text-white ring-1 ring-white/10">
      <style>{`@keyframes pui-wifi-arc { 0%, 100% { opacity: .15 } 40%, 60% { opacity: 1 } }`}</style>
      <svg viewBox="0 0 48 40" className="w-24" fill="none" strokeLinecap="round" strokeWidth="4" aria-hidden>
        <circle cx="24" cy="34" r="3" className={connected ? 'fill-emerald-400' : 'fill-sky-400'} />
        {[['M16 26a11 11 0 0 1 16 0', 0], ['M10 20a19 19 0 0 1 28 0', 0.2], ['M4 14a27 27 0 0 1 40 0', 0.4]].map(([d, delay], index) => <path key={index} d={d as string} className={arc()} style={connected ? undefined : { animationDelay: `${delay}s` }} />)}
      </svg>
      <p role="status" className="mt-5 text-sm font-medium">{connected ? 'Connected · 120 Mbps' : 'Connecting to Home 5G…'}</p>
      <button type="button" onClick={() => setRun(run + 1)} className="mt-4 rounded-full px-4 py-1.5 text-xs font-medium ring-1 ring-white/15 hover:bg-white/5">Reconnect</button>
    </div>
  );
}
