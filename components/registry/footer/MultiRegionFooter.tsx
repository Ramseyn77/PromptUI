/**
 * @registry
 * name: Multi Region Footer
 * category: Footer
 * style: SaaS
 * tags: recent
 * description: Footer international : sélecteur de région/langue et de devise en listes, adresses de bureaux par région, conformité locale et liens légaux.
 * prompt: Create an international company footer: a "Region & language" button that opens an in-flow grid panel of regions (Africa, Europe, Americas, Asia-Pacific) each listing country/language links with the current one checked, plus a currency select (USD, EUR, XOF, GBP); office addresses that change with the chosen region; local compliance text (e.g. "Prices include VAT" for Europe); legal links row and copyright; the panel button has aria-expanded and Escape closes it. Light and dark mode.
 */
'use client';
import { Check, Globe } from 'lucide-react';
import { useState } from 'react';

const regions: Record<string, { locales: string[]; office: string; note: string }> = {
  Africa: { locales: ['Sénégal · Français', 'Nigeria · English', 'Kenya · English', 'Maroc · Français'], office: 'Dakar · Lagos · Nairobi', note: 'Mobile money accepted in 12 countries.' },
  Europe: { locales: ['France · Français', 'Deutschland · Deutsch', 'España · Español', 'United Kingdom · English'], office: 'Paris · Berlin · London', note: 'Prices include VAT.' },
  Americas: { locales: ['United States · English', 'Brasil · Português', 'México · Español', 'Canada · Français'], office: 'New York · São Paulo', note: 'Sales tax calculated at checkout.' },
  'Asia-Pacific': { locales: ['Japan · 日本語', 'Singapore · English', 'Australia · English', 'India · English'], office: 'Tokyo · Singapore', note: 'GST included where applicable.' },
};

export function MultiRegionFooter() {
  const [open, setOpen] = useState(true);
  const [region, setRegion] = useState('Africa');
  const [locale, setLocale] = useState('Sénégal · Français');
  const [currency, setCurrency] = useState('XOF');

  return (
    <footer className="w-full border-t border-zinc-200 bg-white px-6 py-10 dark:border-zinc-800 dark:bg-zinc-950" onKeyDown={(event) => { if (event.key === 'Escape') setOpen(false); }}>
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="flex items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"><Globe aria-hidden className="size-4" />{locale}</button>
          <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">Currency<select value={currency} onChange={(event) => setCurrency(event.target.value)} className="rounded-lg border border-zinc-200 bg-transparent px-2 py-1.5 text-zinc-900 dark:border-zinc-700 dark:text-zinc-100">{['USD', 'EUR', 'XOF', 'GBP'].map((code) => <option key={code}>{code}</option>)}</select></label>
          <p className="text-xs text-zinc-500">{regions[region].note}</p>
        </div>
        {open && (
          <div role="region" aria-label="Choose region and language" className="mt-4 grid gap-6 rounded-2xl border border-zinc-200 p-5 sm:grid-cols-2 lg:grid-cols-4 dark:border-zinc-800">
            {Object.entries(regions).map(([name, data]) => (
              <div key={name}>
                <p className="text-sm font-semibold text-zinc-950 dark:text-white">{name}</p>
                <ul className="mt-2 space-y-1">{data.locales.map((item) => <li key={item}><button type="button" aria-current={locale === item ? 'true' : undefined} onClick={() => { setLocale(item); setRegion(name); setOpen(false); }} className={`flex w-full items-center justify-between rounded-md px-2 py-1 text-left text-sm ${locale === item ? 'bg-zinc-100 font-medium text-zinc-950 dark:bg-zinc-800 dark:text-white' : 'text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900'}`}>{item}{locale === item && <Check aria-hidden className="size-3.5" />}</button></li>)}</ul>
              </div>
            ))}
          </div>
        )}
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div><p className="text-sm font-semibold text-zinc-950 dark:text-white">Offices · {region}</p><p aria-live="polite" className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{regions[region].office}</p></div>
          {[['Product', ['Features', 'Pricing', 'Integrations']], ['Company', ['About', 'Careers', 'Press']]].map(([title, links]) => <nav key={title as string} aria-label={title as string}><p className="text-sm font-semibold text-zinc-950 dark:text-white">{title as string}</p><ul className="mt-2 space-y-1.5 text-sm text-zinc-600 dark:text-zinc-400">{(links as string[]).map((link) => <li key={link}><a href="#" className="hover:text-zinc-950 dark:hover:text-white">{link}</a></li>)}</ul></nav>)}
        </div>
        <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-zinc-100 pt-5 text-xs text-zinc-500 dark:border-zinc-800"><span>© 2026 Meridian Ltd.</span>{['Privacy', 'Terms', 'Cookies', 'Imprint', 'Accessibility'].map((link) => <a key={link} href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">{link}</a>)}</div>
      </div>
    </footer>
  );
}
