/**
 * @registry
 * name: Mega Links Footer
 * category: Footer
 * style: Minimal
 * tags: recent
 * description: Grand pied de page à cinq colonnes de liens, badges « Nouveau », sélecteur de région et barre légale.
 * prompt: Create a mega footer: brand column with short pitch and region select, then five link columns (Product, Solutions, Resources, Company, Legal) with "New" badges on a couple of links; 2 columns on mobile, 3 on md, 6 from xl; bottom bar with copyright and status dot. Uses nav landmarks with aria-label per column. Light and dark mode.
 */
const columns = {
  Product: ['Overview', 'Pricing', 'Changelog', 'Integrations', 'AI Assistant'],
  Solutions: ['Startups', 'Agencies', 'Enterprise', 'Education'],
  Resources: ['Docs', 'Guides', 'Templates', 'Community', 'Webinars'],
  Company: ['About', 'Careers', 'Press', 'Contact'],
  Legal: ['Terms', 'Privacy', 'Cookies', 'DPA'],
};
const fresh = new Set(['AI Assistant', 'Templates']);

export function MegaLinksFooter() {
  return (
    <footer className="w-full max-w-6xl rounded-3xl border border-zinc-200 bg-white px-6 py-10 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 xl:grid-cols-6">
        <div className="col-span-2 md:col-span-3 xl:col-span-1">
          <p className="text-lg font-bold text-zinc-950 dark:text-zinc-50">acme<span className="text-teal-600">.</span></p>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">The workspace for teams who ship.</p>
          <label className="mt-4 block text-xs text-zinc-500">Region
            <select className="mt-1 block rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-sm text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"><option>🇪🇺 Europe</option><option>🇺🇸 United States</option><option>🌍 Africa</option></select>
          </label>
        </div>
        {Object.entries(columns).map(([title, links]) => (
          <nav key={title} aria-label={title}>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</p>
            <ul className="mt-3 space-y-2">{links.map((link) => <li key={link}><a href={`#${link.toLowerCase().replace(/\s/g, '-')}`} className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50">{link}{fresh.has(link) && <span className="rounded bg-teal-100 px-1 text-[10px] font-semibold text-teal-800 dark:bg-teal-400/15 dark:text-teal-300">New</span>}</a></li>)}</ul>
          </nav>
        ))}
      </div>
      <div className="mt-10 flex flex-col gap-2 border-t border-zinc-200 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
        <span>© 2026 Acme Inc. All rights reserved.</span>
        <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-full bg-emerald-500" />All systems operational</span>
      </div>
    </footer>
  );
}
