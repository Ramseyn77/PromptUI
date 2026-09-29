/**
 * @registry
 * name: CTA Band Footer
 * category: Footer
 * style: Dark
 * tags: recent
 * description: Pied de page sombre precede d un bandeau d appel a l action lumineux avec double bouton.
 * prompt: Create a dark footer that starts with a glowing CTA band (headline, subtitle, two buttons, radial glow) and continues with compact link columns and a bottom copyright row. Always dark; responsive stacking.
 */
export function CtaBandFooter() {
  return (
    <footer className="w-full max-w-5xl overflow-hidden rounded-3xl bg-zinc-950 text-zinc-300">
      <div className="relative px-6 py-12 text-center">
        <div aria-hidden className="absolute left-1/2 top-0 h-40 w-[30rem] max-w-full -translate-x-1/2 rounded-full bg-teal-500/25 blur-3xl" />
        <h2 className="relative text-3xl font-semibold tracking-tight text-white">Ready to build faster?</h2>
        <p className="relative mt-2 text-sm text-zinc-400">Join 12,000 teams shipping with PromptUI.</p>
        <div className="relative mt-6 flex flex-col justify-center gap-2 sm:flex-row">
          <a href="#" className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950">Get started free</a>
          <a href="#" className="rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/5">Talk to sales</a>
        </div>
      </div>
      <div className="grid gap-8 border-t border-white/10 px-6 py-8 text-sm sm:grid-cols-3">
        {[['Product', ['Library', 'Playground', 'Prompts']], ['Company', ['About', 'Careers', 'Contact']], ['Legal', ['Privacy', 'Terms', 'DPA']]].map(([title, links]) => (
          <nav key={title as string} aria-label={title as string}>
            <p className="font-semibold text-white">{title as string}</p>
            <ul className="mt-3 space-y-2">{(links as string[]).map((link) => <li key={link}><a href="#" className="text-zinc-400 hover:text-white">{link}</a></li>)}</ul>
          </nav>
        ))}
      </div>
      <p className="border-t border-white/10 px-6 py-4 text-xs text-zinc-500">© 2026 PromptUI</p>
    </footer>
  );
}
