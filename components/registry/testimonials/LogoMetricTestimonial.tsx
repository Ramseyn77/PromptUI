/**
 * @registry
 * name: Logo Metric Testimonial
 * category: Testimonials
 * style: Minimal
 * tags: recent
 * description: Temoignages courts accompagnes du logo client et d un resultat chiffre en grand.
 * prompt: Create a three-column (stacked on mobile) testimonial row where each item has a customer wordmark, a large metric with label, a one-sentence quote and the author's name/role, separated by vertical hairlines on md. Light and dark mode.
 */
const items = [
  { logo: 'Lumen', metric: '2.4×', label: 'faster onboarding', quote: 'New hires ship on day one.', author: 'Awa D., Head of Eng' },
  { logo: 'Orbit', metric: '−60%', label: 'design debt', quote: 'One system, zero drift.', author: 'Noah K., Design Lead' },
  { logo: 'Kite', metric: '$1.2M', label: 'new ARR', quote: 'The new site paid for itself.', author: 'Mei C., CEO' },
];

export function LogoMetricTestimonial() {
  return (
    <section className="grid w-full max-w-4xl gap-8 rounded-3xl border border-zinc-200 bg-white p-8 md:grid-cols-3 md:gap-0 md:divide-x md:divide-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:md:divide-zinc-800">
      {items.map((item) => (
        <figure key={item.logo} className="md:px-6 md:first:pl-0 md:last:pr-0">
          <p className="text-lg font-black tracking-tight text-zinc-400 dark:text-zinc-600">{item.logo}</p>
          <p className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">{item.metric}</p>
          <p className="text-sm text-teal-700 dark:text-teal-400">{item.label}</p>
          <blockquote className="mt-4 text-sm text-zinc-700 dark:text-zinc-300">“{item.quote}”</blockquote>
          <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{item.author}</figcaption>
        </figure>
      ))}
    </section>
  );
}
