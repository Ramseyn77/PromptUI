/**
 * @registry
 * name: Wordmark Footer
 * category: Footer
 * style: Editorial
 * tags: featured, recent
 * description: Pied de page avec nom de marque geant qui deborde, liens discrets et contact en haut.
 * prompt: Create an editorial footer with a contact line and small link rows at the top, and a giant wordmark at the bottom that spans the full width (font-size in vw-ish via text-[18vw] capped, tight leading, partially cropped by overflow-hidden). Inverted colors: dark in light mode, light in dark mode.
 */
export function WordmarkFooter() {
  return (
    <footer className="w-full max-w-5xl overflow-hidden rounded-3xl bg-zinc-950 px-6 pt-10 text-white dark:bg-[#f5f1e8] dark:text-zinc-950">
      <div className="flex flex-col justify-between gap-8 sm:flex-row">
        <div>
          <p className="text-sm opacity-60">Say hello</p>
          <a href="mailto:hello@studio.dev" className="mt-1 block text-2xl font-medium underline-offset-4 hover:underline">hello@studio.dev</a>
        </div>
        <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
          {['Work', 'Studio', 'Journal', 'Contact', 'Newsletter', 'Careers'].map((link) => <a key={link} href="#" className="opacity-70 transition hover:opacity-100">{link}</a>)}
        </div>
      </div>
      <p aria-hidden className="mt-12 select-none text-center font-black leading-[.72] tracking-tighter text-[length:min(22vw,11rem)]">studio</p>
    </footer>
  );
}
