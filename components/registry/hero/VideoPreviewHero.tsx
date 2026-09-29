/**
 * @registry
 * name: Video Preview Hero
 * category: Hero
 * style: Gradient
 * tags: recent
 * description: Hero avec apercu video, bouton lecture pulse et modal de lecture simulee.
 * prompt: Create a hero with headline and CTA above a 16:9 video poster (gradient scene) with a pulsing play button; clicking toggles a "Playing" state with a progress bar. Button has aria-label and aria-pressed. Light and dark mode.
 */
'use client';
import { Pause, Play } from 'lucide-react';
import { useState } from 'react';

export function VideoPreviewHero() {
  const [playing, setPlaying] = useState(false);

  return (
    <>
      <style>{`@keyframes pui-video-ping{0%{transform:scale(1);opacity:.6}100%{transform:scale(1.8);opacity:0}}@keyframes pui-video-progress{from{width:0}to{width:100%}}`}</style>
      <section className="w-full max-w-4xl rounded-3xl bg-white px-6 py-12 text-center dark:bg-zinc-950">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">See it in 90 seconds</h1>
        <p className="mx-auto mt-4 max-w-lg text-zinc-600 dark:text-zinc-400">A quick tour of how teams go from idea to launch with Orbit.</p>
        <div className="relative mx-auto mt-10 aspect-video max-w-3xl overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_20%_20%,#2dd4bf,transparent_40%),radial-gradient(circle_at_80%_30%,#8b5cf6,transparent_45%),linear-gradient(135deg,#0f172a,#1e1b4b)] shadow-2xl">
          <button
            type="button"
            aria-label={playing ? 'Pause video' : 'Play video'}
            aria-pressed={playing}
            onClick={() => setPlaying((value) => !value)}
            className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-zinc-950 shadow-xl transition hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
          >
            {!playing && <span aria-hidden className="absolute inset-0 rounded-full bg-white motion-safe:animate-[pui-video-ping_1.6s_ease-out_infinite]" />}
            {playing ? <Pause className="relative size-6" /> : <Play className="relative ml-1 size-6 fill-current" />}
          </button>
          <div className="absolute inset-x-4 bottom-4 h-1 overflow-hidden rounded-full bg-white/20">
            {playing && <div className="h-full rounded-full bg-white motion-safe:animate-[pui-video-progress_12s_linear_forwards]" />}
          </div>
        </div>
      </section>
    </>
  );
}
