/**
 * @registry
 * name: Terminal Boot Loader
 * category: Loader
 * style: Dark
 * tags: recent
 * description: Écran de démarrage façon terminal : lignes de log qui s'affichent une à une avec statut [ OK ], barre ASCII de progression et curseur clignotant.
 * prompt: Create a terminal boot loader: a dark terminal window with traffic-light dots and title "prompt-os", boot log lines appearing one by one on an interval (e.g. "Mounting /workspace … [ OK ]") with colored status tags, an ASCII progress bar "[#########.....] 64%" that updates, and a blinking block cursor at the end; when done it prints "Ready." and a Replay button appears; the log container is role=log with aria-live polite; reduced motion shows all lines at once. Dark in both themes.
 */
'use client';
import { RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';

const lines = [['Loading kernel modules', 'OK'], ['Mounting /workspace', 'OK'], ['Starting design tokens service', 'OK'], ['Connecting to registry (842 components)', 'OK'], ['Warming component cache', 'WARN'], ['Compiling previews', 'OK'], ['Launching playground', 'OK']] as const;

export function TerminalBootLoader() {
  const [count, setCount] = useState<number>(lines.length);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setCount(lines.length); return; }
    setCount(0);
    const timer = window.setInterval(() => setCount((value) => { if (value >= lines.length) { window.clearInterval(timer); return value; } return value + 1; }), 450);
    return () => window.clearInterval(timer);
  }, [run]);

  const percent = Math.round((count / lines.length) * 100);
  const filled = Math.round((count / lines.length) * 20);
  const done = count >= lines.length;

  return (
    <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-[#0b0f0c] font-mono text-[13px] text-zinc-300 shadow-2xl ring-1 ring-white/10">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2"><span className="size-2.5 rounded-full bg-rose-500" /><span className="size-2.5 rounded-full bg-amber-400" /><span className="size-2.5 rounded-full bg-emerald-500" /><span className="ml-2 text-[11px] text-zinc-500">prompt-os — boot</span></div>
      <div role="log" aria-live="polite" className="min-h-[15rem] space-y-1 p-4">
        {lines.slice(0, count).map(([text, status]) => <p key={text} className="flex gap-2"><span className="text-zinc-500">›</span><span className="flex-1">{text}</span><span className={status === 'OK' ? 'text-emerald-400' : 'text-amber-400'}>[ {status} ]</span></p>)}
        <p aria-hidden className="pt-2 text-emerald-300">[{'#'.repeat(filled)}{'.'.repeat(20 - filled)}] {percent}%</p>
        {done && <p className="text-white">Ready.</p>}
        <p aria-hidden><span className="text-emerald-400">$</span> <span className="inline-block h-4 w-2 translate-y-0.5 bg-emerald-400 motion-safe:animate-pulse" /></p>
      </div>
      {done && <button type="button" onClick={() => setRun(run + 1)} className="m-4 mt-0 flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-zinc-400 ring-1 ring-white/10 hover:text-white"><RotateCcw aria-hidden className="size-3.5" />Replay boot</button>}
    </div>
  );
}
