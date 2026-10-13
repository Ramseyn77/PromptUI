/**
 * @registry
 * name: Rocket Launch Loader
 * category: Loader
 * style: Dark
 * tags: featured, recent
 * description: Loader de déploiement : fusée qui vibre puis décolle à 100 %, flamme animée, étoiles qui défilent et étapes du build avec pourcentage.
 * prompt: Create a dark deploy loader with a rocket: an SVG/CSS rocket that shakes slightly with a flickering flame while progress goes 0→100% through build steps (Installing, Building, Uploading, Going live) shown under a progress bar (role=progressbar); background stars stream downward to suggest motion; at 100% the rocket lifts off out of the frame and "Deployed 🚀" appears with a Replay button; reduced motion removes shake, stars and lift-off. Dark in both themes.
 */
'use client';
import { RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';

const steps = ['Installing dependencies', 'Building', 'Uploading assets', 'Going live'];
const stars = Array.from({ length: 18 }, (_, index) => ({ left: (index * 37) % 100, delay: -((index * 0.37) % 2), size: 1 + (index % 3) }));

export function RocketLaunchLoader() {
  const [progress, setProgress] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    setProgress(0);
    const timer = window.setInterval(() => setProgress((value) => { if (value >= 100) { window.clearInterval(timer); return 100; } return value + 2; }), 90);
    return () => window.clearInterval(timer);
  }, [run]);

  const done = progress >= 100;

  return (
    <div className="relative w-full max-w-xs overflow-hidden rounded-3xl bg-gradient-to-b from-indigo-950 via-zinc-950 to-zinc-950 p-6 text-white ring-1 ring-white/10">
      <style>{`
        @keyframes pui-star-fall { from { transform: translateY(-20px) } to { transform: translateY(260px) } }
        @keyframes pui-rocket-shake { 0%, 100% { transform: translate(0, 0) } 25% { transform: translate(-1px, 1px) } 75% { transform: translate(1px, -1px) } }
        @keyframes pui-flame { 0%, 100% { transform: scaleY(1) } 50% { transform: scaleY(1.35) } }
        @keyframes pui-liftoff { to { transform: translateY(-260px) } }
        @media (prefers-reduced-motion: reduce) { .pui-rocket-scene * { animation: none !important } }
      `}</style>
      <div aria-hidden className="pui-rocket-scene relative h-44">
        {stars.map((star, index) => <span key={index} className="absolute top-0 rounded-full bg-white/70" style={{ left: `${star.left}%`, width: star.size, height: star.size, animation: `pui-star-fall ${done ? 0.6 : 1.8}s linear ${star.delay}s infinite` }} />)}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2" style={{ animation: done ? 'pui-liftoff 1s cubic-bezier(.5,0,.8,.4) forwards' : 'pui-rocket-shake .15s linear infinite' }}>
          <svg viewBox="0 0 40 80" className="h-28 w-14"><path d="M20 2 C32 16 32 40 28 56 L12 56 C8 40 8 16 20 2 Z" fill="#e4e4e7" /><circle cx="20" cy="26" r="6" fill="#6366f1" stroke="#a5b4fc" strokeWidth="2" /><path d="M12 44 L2 60 L12 56 Z M28 44 L38 60 L28 56 Z" fill="#f43f5e" /><path d="M14 56 L26 56 L20 64 Z" fill="#a1a1aa" /></svg>
          <span className="absolute left-1/2 top-[86%] block h-8 w-4 origin-top -translate-x-1/2 rounded-b-full bg-gradient-to-b from-amber-300 via-orange-500 to-transparent" style={{ animation: 'pui-flame .12s ease-in-out infinite' }} />
        </div>
      </div>
      <div role="progressbar" aria-label="Deploy progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} className="mt-4 h-1.5 rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-400" style={{ width: `${progress}%` }} /></div>
      <div role="status" className="mt-3 flex items-center justify-between text-sm">
        <span>{done ? 'Deployed 🚀' : steps[Math.min(steps.length - 1, Math.floor(progress / 25))]}</span>
        {done ? <button type="button" onClick={() => setRun(run + 1)} className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white"><RotateCcw aria-hidden className="size-3.5" />Replay</button> : <span className="font-mono text-xs tabular-nums text-zinc-400">{progress}%</span>}
      </div>
    </div>
  );
}
