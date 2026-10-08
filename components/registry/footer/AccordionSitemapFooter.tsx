/**
 * @registry
 * name: Accordion Sitemap Footer
 * category: Footer
 * style: SaaS
 * tags: featured, recent
 * description: Plan du site en colonnes sur desktop et en accordéons repliables sur mobile.
 * prompt: Create a sitemap footer: on md+ four visible link columns; below md each column becomes an accordion (button with aria-expanded toggling its list, chevron rotation) so the mobile footer stays short. Uses the same data for both. Light and dark mode.
 */
'use client';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const sections = [
  { title: 'Solutions', links: ['Marketing', 'Analytics', 'Commerce', 'Insights'] },
  { title: 'Support', links: ['Pricing', 'Documentation', 'Guides', 'API status'] },
  { title: 'Company', links: ['About', 'Blog', 'Jobs', 'Press'] },
  { title: 'Legal', links: ['Claim', 'Privacy', 'Terms'] },
];

export function AccordionSitemapFooter() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <footer className="w-full max-w-5xl rounded-3xl border border-zinc-200 bg-zinc-50 px-6 py-8 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="grid md:grid-cols-4 md:gap-8">
        {sections.map((section) => {
          const expanded = open === section.title;
          return (
            <nav key={section.title} aria-label={section.title} className="border-b border-zinc-200 md:border-0 dark:border-zinc-800">
              <h3>
                <button type="button" aria-expanded={expanded} onClick={() => setOpen(expanded ? null : section.title)} className="flex w-full items-center justify-between py-3 text-left text-sm font-semibold text-zinc-900 md:pointer-events-none md:py-0 dark:text-white">
                  {section.title}<ChevronDown aria-hidden className={`size-4 transition-transform md:hidden ${expanded ? 'rotate-180' : ''}`} />
                </button>
              </h3>
              <ul className={`space-y-2 pb-4 md:mt-3 md:block md:pb-0 ${expanded ? 'block' : 'hidden'}`}>
                {section.links.map((link) => <li key={link}><a href="#" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">{link}</a></li>)}
              </ul>
            </nav>
          );
        })}
      </div>
      <p className="mt-8 text-xs text-zinc-500 dark:text-zinc-400">© 2026 Lumen Labs, Inc.</p>
    </footer>
  );
}
