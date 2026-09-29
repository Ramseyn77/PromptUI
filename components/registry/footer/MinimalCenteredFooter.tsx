/**
 * @registry
 * name: Minimal Centered Footer
 * category: Footer
 * style: Minimal
 * tags: recent
 * description: Pied de page centre et epure : logo, liens en ligne, icones de contact et copyright.
 * prompt: Create a minimal centered footer: small logo mark, a wrapping row of links, a row of round icon buttons (Mail, RSS, website) with aria-labels, and a muted copyright line. Light and dark mode.
 */
import { AtSign, Globe, Rss } from 'lucide-react';

export function MinimalCenteredFooter() {
  return (
    <footer className="w-full max-w-3xl rounded-3xl bg-white px-6 py-10 text-center dark:bg-zinc-950">
      <span className="mx-auto grid size-10 place-items-center rounded-xl bg-zinc-950 font-bold text-white dark:bg-white dark:text-zinc-950">P</span>
      <nav aria-label="Footer" className="mt-6">
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400">
          {['About', 'Blog', 'Jobs', 'Press', 'Accessibility', 'Partners'].map((link) => <li key={link}><a href="#" className="hover:text-zinc-900 dark:hover:text-white">{link}</a></li>)}
        </ul>
      </nav>
      <div className="mt-6 flex justify-center gap-2">
        {[[AtSign, 'Email us'], [Rss, 'RSS feed'], [Globe, 'Website']].map(([Icon, label]) => {
          const IconComponent = Icon as typeof AtSign;
          return <a key={label as string} href="#" aria-label={label as string} className="grid size-9 place-items-center rounded-full border border-zinc-200 text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-white"><IconComponent className="size-4" /></a>;
        })}
      </div>
      <p className="mt-6 text-xs text-zinc-500 dark:text-zinc-400">© 2026 PromptUI. Made with care in Abidjan & Paris.</p>
    </footer>
  );
}
