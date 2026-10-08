/**
 * @registry
 * name: Marquee Footer
 * category: Footer
 * style: Editorial
 * tags: recent
 * description: Footer éditorial avec bandeau géant défilant « Let's work together », colonnes de liens et pause au survol.
 * prompt: Create an editorial footer with a giant scrolling marquee headline "Let’s work together ✦" in a serif display font that loops seamlessly (duplicated track, aria-hidden copy), pauses on hover/focus and is static with reduced motion; below, three link columns, a big email link and a bottom bar; stacks on mobile. Light and dark mode.
 */
export function MarqueeFooter() {
  const phrase = 'Let’s work together ✦ ';

  return (
    <footer className="w-full overflow-hidden bg-[#f4f1ea] text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <style>{`
        @keyframes pui-footer-marquee { to { transform: translateX(-50%) } }
        .pui-footer-track:hover, .pui-footer-track:focus-within { animation-play-state: paused }
      `}</style>
      <a href="#" className="block border-y border-zinc-900/10 py-6 dark:border-white/10" aria-label="Start a project: let’s work together">
        <div className="pui-footer-track flex w-max motion-safe:animate-[pui-footer-marquee_22s_linear_infinite]">
          {[0, 1].map((copy) => <span key={copy} aria-hidden className="whitespace-nowrap font-serif text-6xl italic sm:text-8xl">{phrase.repeat(3)}</span>)}
        </div>
      </a>
      <div className="mx-auto grid max-w-5xl gap-8 px-6 py-10 sm:grid-cols-2 md:grid-cols-4">
        <div className="md:col-span-1"><p className="text-xs uppercase tracking-widest text-zinc-500">Say hello</p><a href="#" className="mt-2 block font-serif text-2xl underline decoration-1 underline-offset-4 hover:decoration-2">studio@atelier.co</a></div>
        {[['Studio', ['About', 'Process', 'Journal']], ['Work', ['Brands', 'Products', 'Archive']], ['Social', ['Instagram', 'Dribbble', 'LinkedIn']]].map(([title, links]) => (
          <nav key={title as string} aria-label={title as string}>
            <p className="text-xs uppercase tracking-widest text-zinc-500">{title}</p>
            <ul className="mt-2 space-y-1.5 text-sm">{(links as string[]).map((link) => <li key={link}><a href="#" className="hover:underline">{link}</a></li>)}</ul>
          </nav>
        ))}
      </div>
      <div className="mx-auto flex max-w-5xl justify-between border-t border-zinc-900/10 px-6 py-4 text-xs text-zinc-500 dark:border-white/10"><span>© 2026 Atelier</span><span>Lisbon · Paris</span></div>
    </footer>
  );
}
