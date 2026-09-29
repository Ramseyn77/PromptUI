/**
 * @registry
 * name: Infinity Loader
 * category: Loader
 * style: Gradient
 * tags: recent
 * description: Symbole infini trace en SVG avec un segment lumineux qui le parcourt sans fin.
 * prompt: Create an infinity-symbol loader: a faint SVG lemniscate path as a track and the same path with a short gradient dash (stroke-dasharray) whose dashoffset animates so a comet travels around it. role="status". Light and dark mode, reduced-motion safe.
 */
export function InfinityLoader() {
  const path = 'M20 30 C20 12 45 12 60 30 C75 48 100 48 100 30 C100 12 75 12 60 30 C45 48 20 48 20 30 Z';
  return (
    <>
      <style>{`@keyframes pui-infinity{to{stroke-dashoffset:-240}}`}</style>
      <div role="status" className="flex flex-col items-center gap-2">
        <svg aria-hidden viewBox="0 0 120 60" className="w-32">
          <defs><linearGradient id="pui-infinity-gradient"><stop offset="0" stopColor="#14b8a6" /><stop offset="1" stopColor="#8b5cf6" /></linearGradient></defs>
          <path d={path} fill="none" strokeWidth="6" strokeLinecap="round" className="stroke-zinc-200 dark:stroke-zinc-800" />
          <path d={path} fill="none" stroke="url(#pui-infinity-gradient)" strokeWidth="6" strokeLinecap="round" strokeDasharray="60 180" className="motion-safe:animate-[pui-infinity_1.6s_linear_infinite]" />
        </svg>
        <span className="text-sm text-zinc-600 dark:text-zinc-400">Syncing…</span>
      </div>
    </>
  );
}
