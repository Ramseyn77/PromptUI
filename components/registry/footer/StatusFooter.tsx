/**
 * @registry
 * name: Status Footer
 * category: Footer
 * style: Dark
 * tags: recent
 * description: Pied de page développeur avec statut des systèmes, version, commit et raccourcis.
 * prompt: Create a developer-product footer: left a pulsing green "All systems normal" status link, center version and short commit hash in mono, right keyboard shortcut hint (⌘K) and docs/changelog links; single row on md, stacked on mobile. Light and dark mode.
 */
export function StatusFooter() {
  return (
    <>
      <style>{`@keyframes pui-status-ping{75%,100%{transform:scale(2.2);opacity:0}}`}</style>
      <footer className="flex w-full max-w-4xl flex-col gap-3 rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-xs text-zinc-600 md:flex-row md:items-center md:justify-between dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
        <a href="#" className="inline-flex items-center gap-2 font-medium text-emerald-700 hover:underline dark:text-emerald-400">
          <span className="relative flex size-2"><span className="absolute inset-0 rounded-full bg-emerald-500 motion-safe:animate-[pui-status-ping_1.6s_ease-out_infinite]" /><span className="relative size-2 rounded-full bg-emerald-500" /></span>
          All systems normal
        </a>
        <p className="font-mono">v4.12.0 · <span className="text-zinc-400">a1f9c3e</span></p>
        <div className="flex items-center gap-4">
          <span>Search <kbd className="rounded border border-zinc-300 px-1 font-mono dark:border-zinc-700">⌘K</kbd></span>
          <a href="#" className="hover:text-zinc-900 dark:hover:text-white">Docs</a>
          <a href="#" className="hover:text-zinc-900 dark:hover:text-white">Changelog</a>
        </div>
      </footer>
    </>
  );
}
