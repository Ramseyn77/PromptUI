/**
 * @registry
 * name: Quote Spotlight
 * category: Testimonials
 * style: Editorial
 * tags: recent
 * description: Grande citation editoriale en serif avec guillemet decoratif geant et signature.
 * prompt: Create an editorial testimonial: an oversized decorative quote mark, a large serif quote with one highlighted phrase, and a signature row (avatar, name, title, company wordmark) separated by a rule. Warm paper in light mode, charcoal in dark mode.
 */
export function QuoteSpotlight() {
  return (
    <figure className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-[#faf6ee] p-8 sm:p-12 dark:bg-zinc-900">
      <span aria-hidden className="absolute -left-2 -top-10 font-serif text-[12rem] leading-none text-teal-700/15 dark:text-teal-300/10">“</span>
      <blockquote className="relative font-serif text-3xl leading-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
        It&apos;s rare to find a tool that makes you <span className="italic text-teal-700 dark:text-teal-300">faster and more careful</span> at the same time.
      </blockquote>
      <figcaption className="relative mt-8 flex items-center gap-4 border-t border-zinc-900/15 pt-6 dark:border-white/10">
        <span className="size-12 rounded-full bg-[linear-gradient(135deg,#fcd34d,#f472b6)]" />
        <span className="flex-1"><span className="block font-semibold text-zinc-900 dark:text-white">Nadia Rossi</span><span className="block text-sm text-zinc-600 dark:text-zinc-400">VP Product, Helix</span></span>
        <span className="text-lg font-black tracking-tight text-zinc-400 dark:text-zinc-600">HELIX</span>
      </figcaption>
    </figure>
  );
}
