/**
 * @registry
 * name: Startup Badges Footer
 * category: Footer
 * style: Gradient
 * tags: recent
 * description: Footer de startup avec badges de confiance (SOC 2, RGPD, uptime), statut système et sélecteur de langue.
 * prompt: Create a startup footer with trust badges: a gradient top border, brand + tagline, four link columns, a row of compliance badges (SOC 2 Type II, GDPR, ISO 27001, 99.99% uptime) as outlined pills with icons, a live "All systems operational" status link with a green dot, a language select and copyright; grid collapses to 2 columns on mobile. Light and dark mode.
 */
'use client';
import { Activity, Globe, Lock, ShieldCheck } from 'lucide-react';
import { useId } from 'react';

const columns = { Product: ['Features', 'Integrations', 'Pricing', 'Changelog'], Company: ['About', 'Customers', 'Careers', 'Press'], Resources: ['Docs', 'Guides', 'API status', 'Community'], Legal: ['Terms', 'Privacy', 'DPA', 'Security'] };
const badges = [{ label: 'SOC 2 Type II', icon: ShieldCheck }, { label: 'GDPR', icon: Lock }, { label: 'ISO 27001', icon: ShieldCheck }, { label: '99.99% uptime', icon: Activity }];

export function StartupBadgesFooter() {
  const uid = useId();

  return (
    <footer className="w-full bg-white dark:bg-zinc-950">
      <div aria-hidden className="h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div><p className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-lg font-bold text-transparent">Lumen</p><p className="mt-2 max-w-xs text-sm text-zinc-500">The analytics platform your security team will actually approve.</p></div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-4">
            {Object.entries(columns).map(([title, links]) => (
              <nav key={title} aria-label={title}>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</p>
                <ul className="mt-3 space-y-2 text-sm text-zinc-500">{links.map((link) => <li key={link}><a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">{link}</a></li>)}</ul>
              </nav>
            ))}
          </div>
        </div>
        <ul aria-label="Certifications" className="mt-10 flex flex-wrap gap-2">
          {badges.map(({ label, icon: Icon }) => <li key={label} className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:text-zinc-300"><Icon aria-hidden className="size-3.5 text-violet-500" />{label}</li>)}
        </ul>
        <div className="mt-6 flex flex-col gap-4 border-t border-zinc-100 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-900">
          <a href="#" className="inline-flex items-center gap-2 hover:text-zinc-900 dark:hover:text-zinc-100"><span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.2)]" />All systems operational</a>
          <div className="flex items-center gap-4">
            <label htmlFor={`${uid}-lang`} className="flex items-center gap-1.5"><Globe aria-hidden className="size-3.5" /><span className="sr-only">Language</span></label>
            <select id={`${uid}-lang`} className="-ml-3 rounded border-0 bg-transparent text-xs text-zinc-600 dark:text-zinc-300"><option>English</option><option>Français</option><option>Deutsch</option></select>
            <span>© 2026 Lumen Inc.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
