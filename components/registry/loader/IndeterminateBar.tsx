/**
 * @registry
 * name: Indeterminate Bar
 * category: Loader
 * style: SaaS
 * tags: recent
 * description: Barres de progression indéterminées : glissement, rayures animées et barre fine de page.
 * prompt: Create three indeterminate progress bars: a segment sliding across a track, an animated diagonal-stripes bar, and a thin top-of-page bar that grows then fades; each role="progressbar" without aria-valuenow and with an aria-label. Light and dark mode, reduced-motion safe.
 */
export function IndeterminateBar() {
  return (
    <>
      <style>{`@keyframes pui-slide-bar{0%{left:-40%;width:40%}60%{left:100%;width:60%}100%{left:100%;width:60%}}@keyframes pui-stripes{to{background-position:28px 0}}@keyframes pui-top-bar{0%{transform:scaleX(0);opacity:1}80%{transform:scaleX(1);opacity:1}100%{transform:scaleX(1);opacity:0}}`}</style>
      <div className="w-full max-w-sm space-y-6">
        <div role="progressbar" aria-label="Loading" className="relative h-1.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
          <span className="absolute inset-y-0 rounded-full bg-teal-500 motion-safe:animate-[pui-slide-bar_1.4s_ease-in-out_infinite]" />
        </div>
        <div role="progressbar" aria-label="Processing" className="h-3 overflow-hidden rounded-full bg-violet-500 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,.25)_0_7px,transparent_7px_14px)] bg-[length:28px_100%] motion-safe:animate-[pui-stripes_.6s_linear_infinite]" />
        <div className="relative h-16 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
          <div role="progressbar" aria-label="Page loading" className="absolute inset-x-0 top-0 h-0.5 origin-left bg-gradient-to-r from-teal-500 to-violet-500 motion-safe:animate-[pui-top-bar_2s_ease-out_infinite]" />
          <p className="px-4 pt-6 text-xs text-zinc-500 dark:text-zinc-400">Top-of-page navigation bar</p>
        </div>
      </div>
    </>
  );
}
