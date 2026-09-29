/**
 * @registry
 * name: Compact Testimonial List
 * category: Testimonials
 * style: Minimal
 * tags: recent
 * description: Liste compacte de temoignages courts avec avatars, idealle en barre laterale ou colonne.
 * prompt: Create a compact list of short testimonials for sidebars: each row has a small avatar, a one-line quote in quotes, and name · company in muted text, separated by dividers; heading "Loved by makers" with an overall rating chip. Light and dark mode.
 */
const quotes = [
  ['Sofia', 'Palette', 'Exactly the polish I was missing.'],
  ['Kwame', 'Tidy', 'Shipped our pricing page in an hour.'],
  ['Hana', 'Moss', 'Dark mode just works. Everywhere.'],
  ['Luis', 'Fern', 'The prompts are pure gold.'],
];

export function CompactTestimonialList() {
  return (
    <section className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between"><h3 className="font-semibold text-zinc-900 dark:text-white">Loved by makers</h3><span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:text-amber-400">★ 4.9</span></div>
      <ul className="mt-3 divide-y divide-zinc-100 dark:divide-zinc-900">
        {quotes.map(([name, company, quote], index) => (
          <li key={name} className="flex gap-3 py-3">
            <span className="size-8 shrink-0 rounded-full" style={{ background: `hsl(${index * 80 + 170} 55% 55%)` }} />
            <figure><blockquote className="text-sm text-zinc-800 dark:text-zinc-200">“{quote}”</blockquote><figcaption className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{name} · {company}</figcaption></figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
