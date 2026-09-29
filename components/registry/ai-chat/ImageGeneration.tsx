/**
 * @registry
 * name: Image Generation
 * category: AI Chat
 * style: Glass
 * tags: recent
 * description: Carte de generation d images avec prompt, placeholders scintillants puis resultats.
 * prompt: Create an AI image generation card: a prompt row with a Generate button; while generating, a 2x2 grid of shimmering placeholders with a progress percentage, then four gradient "images" fade in with a hover download button. aria-busy on the grid. Light and dark mode.
 */
'use client';
import { Download, Wand2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const results = ['from-teal-300 to-sky-500', 'from-violet-400 to-fuchsia-500', 'from-amber-300 to-rose-400', 'from-emerald-300 to-teal-600'];

export function ImageGeneration() {
  const [progress, setProgress] = useState<number | null>(null);
  const generating = progress !== null && progress < 100;

  useEffect(() => {
    if (!generating) return;
    const timer = window.setTimeout(() => setProgress((value) => Math.min(100, (value ?? 0) + 7)), 120);
    return () => window.clearTimeout(timer);
  }, [progress, generating]);

  return (
    <>
      <style>{`@keyframes pui-shimmer-bg{to{background-position:-200% 0}}@keyframes pui-fade-in{from{opacity:0;transform:scale(.96)}}`}</style>
      <section className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex gap-2">
          <p className="flex-1 truncate rounded-xl bg-zinc-100 px-3 py-2.5 text-sm text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">A calm desk at sunrise, soft pastel light</p>
          <button type="button" disabled={generating} onClick={() => setProgress(0)} className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-950 px-3.5 text-sm font-semibold text-white disabled:opacity-50 dark:bg-white dark:text-zinc-950"><Wand2 aria-hidden className="size-4" /> Generate</button>
        </div>
        <div aria-busy={generating} className="mt-3 grid grid-cols-2 gap-2">
          {results.map((gradient, index) => (
            progress === 100 ? (
              <div key={gradient} className={`group relative aspect-square rounded-2xl bg-gradient-to-br ${gradient} motion-safe:animate-[pui-fade-in_.4s_ease-out_both]`} style={{ animationDelay: `${index * 80}ms` }}>
                <button type="button" aria-label={`Download image ${index + 1}`} className="absolute bottom-2 right-2 grid size-8 place-items-center rounded-lg bg-white/80 text-zinc-900 opacity-0 transition group-hover:opacity-100 focus:opacity-100"><Download className="size-4" /></button>
              </div>
            ) : (
              <div key={gradient} className="aspect-square rounded-2xl bg-[linear-gradient(90deg,#f4f4f5_25%,#e4e4e7_50%,#f4f4f5_75%)] bg-[length:200%_100%] motion-safe:animate-[pui-shimmer-bg_1.4s_linear_infinite] dark:bg-[linear-gradient(90deg,#18181b_25%,#27272a_50%,#18181b_75%)]" />
            )
          ))}
        </div>
        <p role="status" className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">{progress === null ? 'Ready when you are.' : generating ? `Generating… ${progress}%` : '4 images ready.'}</p>
      </section>
    </>
  );
}
