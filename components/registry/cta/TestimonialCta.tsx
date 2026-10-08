/**
 * @registry
 * name: Testimonial CTA
 * category: CTA
 * style: Editorial
 * tags: recent
 * description: Appel à l'action qui s'appuie sur une citation client, signature et bouton d'essai.
 * prompt: Create a CTA that leads with social proof: a short customer quote in large serif, avatar + name + company, then a divider and the CTA line with a primary button; two-column on md (quote left, CTA right). Warm paper in light mode, charcoal in dark mode.
 */
export function TestimonialCta() {
  return (
    <section className="grid w-full max-w-4xl gap-8 rounded-3xl bg-[#faf6ee] p-8 md:grid-cols-[1.4fr_1fr] md:items-center dark:bg-zinc-900">
      <figure>
        <blockquote className="font-serif text-2xl leading-snug text-zinc-900 dark:text-white">“We rebuilt our whole marketing site in a week. It&apos;s the best money we spent this year.”</blockquote>
        <figcaption className="mt-5 flex items-center gap-3 text-sm"><span className="size-10 rounded-full bg-gradient-to-br from-teal-300 to-sky-500" /><span><strong className="block text-zinc-900 dark:text-white">Kofi Mensah</strong><span className="text-zinc-600 dark:text-zinc-400">CEO, Ayo Labs</span></span></figcaption>
      </figure>
      <div className="border-t border-zinc-900/15 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0 dark:border-white/15">
        <p className="text-lg font-semibold text-zinc-900 dark:text-white">Your turn.</p>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">14-day free trial, full access.</p>
        <a href="#" className="mt-5 inline-block rounded-xl bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Start free trial</a>
      </div>
    </section>
  );
}
