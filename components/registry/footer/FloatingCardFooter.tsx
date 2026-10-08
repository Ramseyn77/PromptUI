/**
 * @registry
 * name: Floating Card Footer
 * category: Footer
 * style: Glass
 * tags: recent
 * description: Pied de page en carte de verre flottante au-dessus d'un fond coloré, liens en pastilles.
 * prompt: Create a floating glass footer card over a soft gradient backdrop: rounded translucent panel with backdrop blur, logo, pill-shaped links that fill on hover, and a small "Made with PromptUI" tag. Light and dark mode.
 */
export function FloatingCardFooter() {
  return (
    <div className="w-full max-w-3xl rounded-3xl bg-[linear-gradient(135deg,#ccfbf1,#ede9fe,#fef3c7)] p-6 dark:bg-[linear-gradient(135deg,#134e4a,#2e1065,#451a03)]">
      <footer className="rounded-2xl border border-white/60 bg-white/60 p-5 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/50">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-zinc-900 dark:text-white">Aurora</p>
          <nav aria-label="Footer" className="flex flex-wrap gap-1.5">
            {['Features', 'Pricing', 'Docs', 'Contact'].map((link) => <a key={link} href="#" className="rounded-full px-3 py-1.5 text-sm text-zinc-700 transition hover:bg-zinc-950 hover:text-white dark:text-zinc-300 dark:hover:bg-white dark:hover:text-zinc-950">{link}</a>)}
          </nav>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-zinc-900/10 pt-3 text-xs text-zinc-500 dark:border-white/10 dark:text-zinc-400">
          <span>© 2026 Aurora</span>
          <span className="rounded-full bg-white/70 px-2 py-0.5 font-medium text-zinc-700 dark:bg-white/10 dark:text-zinc-300">Made with PromptUI</span>
        </div>
      </footer>
    </div>
  );
}
