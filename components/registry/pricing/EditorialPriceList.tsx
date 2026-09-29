/**
 * @registry
 * name: Editorial Price List
 * category: Pricing
 * style: Editorial
 * tags: recent
 * description: Liste de prix typographique facon menu de restaurant, points de conduite et descriptions.
 * prompt: Create a typographic price list like a restaurant menu: serif headings, each service with name, dotted leader line and price aligned right, a one-line italic description below, grouped by section. Warm paper background in light mode, deep charcoal in dark mode.
 */
const sections = [
  { title: 'Design', items: [['Brand identity', '€2,400', 'Logo, palette, type system and guidelines'], ['Website design', '€3,800', 'Up to 8 pages, responsive, handoff ready']] },
  { title: 'Development', items: [['Next.js build', '€4,500', 'CMS, SEO and performance budget included'], ['Maintenance', '€390/mo', 'Updates, monitoring and small changes']] },
];

export function EditorialPriceList() {
  return (
    <section className="w-full max-w-xl rounded-3xl bg-[#faf6ee] p-8 dark:bg-zinc-900">
      {sections.map((section) => (
        <div key={section.title} className="mb-8 last:mb-0">
          <h3 className="font-serif text-2xl italic text-zinc-900 dark:text-white">{section.title}</h3>
          <ul className="mt-4 space-y-5">
            {section.items.map(([name, price, text]) => (
              <li key={name}>
                <p className="flex items-baseline gap-2 text-zinc-900 dark:text-zinc-100">
                  <span className="font-medium">{name}</span>
                  <span aria-hidden className="flex-1 translate-y-[-4px] border-b border-dotted border-zinc-400 dark:border-zinc-600" />
                  <span className="font-serif text-lg tabular-nums">{price}</span>
                </p>
                <p className="mt-1 font-serif text-sm italic text-zinc-600 dark:text-zinc-400">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
