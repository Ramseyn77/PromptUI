/**
 * @registry
 * name: Shimmer Image Grid
 * category: Loader
 * style: Gradient
 * tags: recent
 * description: Galerie dont les vignettes chatoient puis apparaissent une à une en fondu flou, avec bouton recharger.
 * prompt: Create an image grid loading state: 6 tiles (3 columns, 2 on mobile) start as shimmering skeletons (moving gradient sheen); they "load" at staggered random-free delays and reveal gradient artworks with a blur-to-sharp fade; a Reload button replays; aria-busy on the grid until all are loaded. Shimmer static with reduced motion. Light and dark mode.
 */
'use client';
import { RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';

const arts = ['from-rose-300 to-amber-200', 'from-sky-300 to-indigo-400', 'from-emerald-300 to-teal-500', 'from-fuchsia-300 to-violet-500', 'from-amber-200 to-orange-500', 'from-cyan-200 to-sky-500'];

export function ShimmerImageGrid() {
  const [loaded, setLoaded] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    setLoaded(0);
    const timers = arts.map((_, index) => window.setTimeout(() => setLoaded((value) => Math.max(value, index + 1)), 600 + index * 380));
    return () => timers.forEach(window.clearTimeout);
  }, [run]);

  return (
    <div className="w-full max-w-md">
      <style>{`@keyframes pui-sheen{from{background-position:150% 0}to{background-position:-50% 0}}`}</style>
      <div className="mb-2 flex items-center justify-between"><p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Moodboard</p><button type="button" onClick={() => setRun((value) => value + 1)} className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"><RotateCcw aria-hidden className="size-3.5" />Reload</button></div>
      <div aria-busy={loaded < arts.length} className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {arts.map((art, index) => (
          <div key={`${run}-${index}`} className="relative aspect-square overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
            {index < loaded ? <div role="img" aria-label={`Artwork ${index + 1}`} className={`absolute inset-0 bg-gradient-to-br ${art} motion-safe:animate-[pui-unblur_.6s_ease-out]`} /> : <div aria-hidden className="absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,.6)_50%,transparent_70%)] bg-[length:200%_100%] motion-safe:animate-[pui-sheen_1.4s_linear_infinite] dark:bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,.08)_50%,transparent_70%)]" />}
          </div>
        ))}
      </div>
      <style>{`@keyframes pui-unblur{from{filter:blur(12px);opacity:0;transform:scale(1.05)}}`}</style>
    </div>
  );
}
