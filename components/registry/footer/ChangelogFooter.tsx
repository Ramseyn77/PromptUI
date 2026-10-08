/**
 * @registry
 * name: Changelog Footer
 * category: Footer
 * style: SaaS
 * tags: recent
 * description: Pied de page produit qui met en avant la dernière mise à jour, la version et un lien vers le changelog.
 * prompt: Create a product footer with a "What's new" strip on top (version pill v4.2, release title, date and "Read changelog" link) followed by three link columns, social icon buttons with aria-labels and a bottom line. Columns stack on mobile. Light and dark mode.
 */
import { AtSign, PlaySquare, Rss, Sparkles } from 'lucide-react';

export function ChangelogFooter() {
  return (
    <footer className="w-full max-w-4xl rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <a href="#changelog" className="flex flex-wrap items-center gap-3 rounded-t-3xl border-b border-zinc-200 bg-zinc-50 px-6 py-3 text-sm hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800">
        <span className="inline-flex items-center gap-1 rounded-full bg-teal-600 px-2 py-0.5 text-xs font-semibold text-white"><Sparkles aria-hidden className="size-3" />v4.2</span>
        <span className="font-medium text-zinc-900 dark:text-zinc-100">Real-time cursors and comment threads</span>
        <span className="text-zinc-500">Oct 2</span>
        <span className="ml-auto font-medium text-teal-700 dark:text-teal-400">Read changelog →</span>
      </a>
      <div className="grid gap-8 px-6 py-8 sm:grid-cols-3">
        {[['Product', ['Features', 'Pricing', 'Roadmap']], ['Developers', ['API', 'SDKs', 'Status']], ['Company', ['About', 'Blog', 'Jobs']]].map(([title, links]) => (
          <nav key={title as string} aria-label={title as string}>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title as string}</p>
            <ul className="mt-3 space-y-2">{(links as string[]).map((link) => <li key={link}><a href={`#${link.toLowerCase()}`} className="text-sm text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50">{link}</a></li>)}</ul>
          </nav>
        ))}
      </div>
      <div className="flex flex-col gap-3 border-t border-zinc-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
        <p className="text-xs text-zinc-500">© 2026 Lumen Software</p>
        <div className="flex gap-1">{([[AtSign, 'Email'], [PlaySquare, 'Video channel'], [Rss, 'RSS feed']] as const).map(([Icon, label]) => <a key={label} href="#social" aria-label={label} className="grid size-8 place-items-center rounded-lg text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"><Icon aria-hidden className="size-4" /></a>)}</div>
      </div>
    </footer>
  );
}
