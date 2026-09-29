import { Sparkles } from 'lucide-react';

export function BorderBeamButton() {
  return (
    <>
      <style>{`@keyframes pui-beam{to{transform:rotate(360deg)}}`}</style>
      <button
        type="button"
        className="group relative inline-flex overflow-hidden rounded-full bg-zinc-200 p-px shadow-sm transition active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:bg-zinc-800 dark:focus-visible:ring-offset-zinc-950"
      >
        {/* Oversized conic gradient spinning behind a 1px gap: reads as a light running along the border. */}
        <span
          aria-hidden
          className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0_65%,#2dd4bf_78%,#a78bfa_90%,transparent_100%)] motion-safe:animate-[pui-beam_3.2s_linear_infinite]"
        />
        <span className="relative inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-zinc-900 transition-colors group-hover:bg-zinc-50 dark:bg-zinc-950 dark:text-white dark:group-hover:bg-zinc-900">
          <Sparkles aria-hidden className="size-4 text-violet-500 dark:text-violet-400" />
          Generate with AI
        </span>
      </button>
    </>
  );
}
