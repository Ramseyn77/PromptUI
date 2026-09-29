/**
 * @registry
 * name: Partners Footer
 * category: Footer
 * style: Minimal
 * tags: recent
 * description: Pied de page avec bandeau de partenaires et certifications, puis liens et mentions.
 * prompt: Create a footer with a "Trusted partners & certifications" strip of wordmark logos and compliance badges (SOC 2, GDPR, ISO 27001 as outlined pills with a shield icon), followed by a compact links row and copyright. Light and dark mode.
 */
import { ShieldCheck } from 'lucide-react';

export function PartnersFooter() {
  return (
    <footer className="w-full max-w-4xl rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="text-center text-xs font-semibold uppercase tracking-[.2em] text-zinc-500 dark:text-zinc-400">Trusted partners & certifications</p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {['Stripe', 'Vercel', 'Linear', 'Notion'].map((logo) => <span key={logo} className="text-lg font-bold tracking-tight text-zinc-400 dark:text-zinc-600">{logo}</span>)}
      </div>
      <ul className="mt-5 flex flex-wrap justify-center gap-2">
        {['SOC 2 Type II', 'GDPR', 'ISO 27001'].map((badge) => <li key={badge} className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"><ShieldCheck aria-hidden className="size-3.5 text-emerald-600 dark:text-emerald-400" />{badge}</li>)}
      </ul>
      <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-zinc-200 pt-4 text-xs text-zinc-500 sm:flex-row dark:border-zinc-800 dark:text-zinc-400">
        <nav aria-label="Footer" className="flex gap-4">{['Security', 'Trust center', 'Privacy'].map((link) => <a key={link} href="#" className="hover:text-zinc-900 dark:hover:text-white">{link}</a>)}</nav>
        <p>© 2026 Vault Inc.</p>
      </div>
    </footer>
  );
}
