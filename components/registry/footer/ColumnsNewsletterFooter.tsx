/**
 * @registry
 * name: Columns Newsletter Footer
 * category: Footer
 * style: SaaS
 * tags: featured, recent
 * description: Pied de page complet avec colonnes de liens, inscription newsletter et barre légale.
 * prompt: Create a full footer: brand block with tagline, three link columns (Product, Company, Resources) in a nav with headings, a newsletter form with label and success state, and a bottom bar with copyright and legal links. 1 column mobile → 2 on sm → 5-col grid on lg. Light and dark mode.
 */
'use client';
import { useState, type FormEvent } from 'react';

const columns = [
  { title: 'Product', links: ['Components', 'Templates', 'Pricing', 'Changelog'] },
  { title: 'Company', links: ['About', 'Careers', 'Blog', 'Press'] },
  { title: 'Resources', links: ['Docs', 'Guides', 'Community', 'Status'] },
];

export function ColumnsNewsletterFooter() {
  const [done, setDone] = useState(false);
  const submit = (event: FormEvent) => { event.preventDefault(); setDone(true); };

  return (
    <footer className="w-full max-w-5xl rounded-3xl border border-zinc-200 bg-white px-6 pt-10 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="text-lg font-bold text-zinc-900 dark:text-white">Northwind</p>
          <p className="mt-2 max-w-xs text-sm text-zinc-600 dark:text-zinc-400">Beautiful building blocks for teams who ship every week.</p>
          {done ? <p role="status" className="mt-5 text-sm font-medium text-emerald-600 dark:text-emerald-400">Thanks! Check your inbox.</p> : (
            <form onSubmit={submit} className="mt-5 flex max-w-sm gap-2">
              <label htmlFor="footer-email" className="sr-only">Email for newsletter</label>
              <input id="footer-email" type="email" required placeholder="you@company.com" className="h-10 min-w-0 flex-1 rounded-lg border border-zinc-300 bg-transparent px-3 text-sm text-zinc-900 outline-none focus:border-teal-500 dark:border-zinc-700 dark:text-white" />
              <button type="submit" className="rounded-lg bg-zinc-950 px-4 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Subscribe</button>
            </form>
          )}
        </div>
        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">{column.title}</p>
            <ul className="mt-3 space-y-2">{column.links.map((link) => <li key={link}><a href="#" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">{link}</a></li>)}</ul>
          </nav>
        ))}
      </div>
      <div className="mt-10 flex flex-col gap-3 border-t border-zinc-200 py-6 text-xs text-zinc-500 sm:flex-row sm:justify-between dark:border-zinc-800 dark:text-zinc-400">
        <p>© 2026 Northwind Inc. All rights reserved.</p>
        <div className="flex gap-4">{['Privacy', 'Terms', 'Cookies'].map((link) => <a key={link} href="#" className="hover:text-zinc-900 dark:hover:text-white">{link}</a>)}</div>
      </div>
    </footer>
  );
}
