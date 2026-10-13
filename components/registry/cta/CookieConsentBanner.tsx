/**
 * @registry
 * name: Cookie Consent Banner
 * category: CTA
 * style: Minimal
 * tags: featured, recent
 * description: Bandeau de consentement aux cookies : accepter, refuser au même niveau, et panneau de préférences par catégorie avec interrupteurs.
 * prompt: Create a cookie consent banner rendered in flow (defaultOpen): short copy with a policy link, three equally weighted buttons "Reject all", "Customize", "Accept all"; Customize expands a preferences panel with switches for Necessary (always on, disabled), Analytics, Marketing and Personalisation, each with a description, and a "Save preferences" button; after a choice the banner collapses to a small "Cookie settings" reopen button and announces the saved choice via aria-live. Light and dark mode.
 */
'use client';
import { Cookie } from 'lucide-react';
import { useState } from 'react';

const categories = [['necessary', 'Strictly necessary', 'Required for login, security and your cart.'], ['analytics', 'Analytics', 'Helps us understand which pages are useful.'], ['marketing', 'Marketing', 'Used to measure ads and campaigns.'], ['personal', 'Personalisation', 'Remembers your preferences like language.']] as const;

export function CookieConsentBanner({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [custom, setCustom] = useState(false);
  const [prefs, setPrefs] = useState<Record<string, boolean>>({ necessary: true, analytics: false, marketing: false, personal: true });
  const [status, setStatus] = useState('');

  function save(next: Record<string, boolean>, label: string) {
    setPrefs(next);
    setOpen(false);
    setCustom(false);
    setStatus(label);
  }

  const button = 'flex-1 rounded-xl border border-zinc-300 px-4 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800';

  return (
    <div className="w-full max-w-2xl">
      <p aria-live="polite" className="sr-only">{status}</p>
      {!open ? (
        <button type="button" onClick={() => setOpen(true)} className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"><Cookie aria-hidden className="size-4" />Cookie settings</button>
      ) : (
        <section role="region" aria-label="Cookie consent" className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex gap-3">
            <Cookie aria-hidden className="mt-0.5 size-5 shrink-0 text-amber-600" />
            <p className="text-sm text-zinc-700 dark:text-zinc-300">We use cookies to keep the site working and, with your permission, to improve it. Read our <a href="#" className="font-medium text-zinc-950 underline dark:text-white">cookie policy</a>.</p>
          </div>
          {custom && (
            <ul className="mt-4 divide-y divide-zinc-100 rounded-xl border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
              {categories.map(([key, label, hint]) => (
                <li key={key} className="flex items-center gap-3 p-3">
                  <div className="flex-1"><p className="text-sm font-medium text-zinc-950 dark:text-white">{label}</p><p className="text-xs text-zinc-500">{hint}</p></div>
                  <label className="relative inline-flex cursor-pointer items-center has-[:disabled]:cursor-not-allowed">
                    <input type="checkbox" role="switch" checked={prefs[key]} disabled={key === 'necessary'} onChange={(event) => setPrefs({ ...prefs, [key]: event.target.checked })} className="peer sr-only" />
                    <span className="sr-only">{label}</span>
                    <span aria-hidden className="h-6 w-10 rounded-full bg-zinc-300 transition peer-checked:bg-zinc-900 peer-disabled:opacity-50 peer-focus-visible:ring-2 peer-focus-visible:ring-amber-500 after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-white after:transition peer-checked:after:translate-x-4 dark:bg-zinc-700 dark:peer-checked:bg-white dark:after:bg-zinc-900" />
                  </label>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button type="button" onClick={() => save({ necessary: true, analytics: false, marketing: false, personal: false }, 'Only necessary cookies enabled')} className={button}>Reject all</button>
            {custom ? <button type="button" onClick={() => save(prefs, 'Cookie preferences saved')} className={button}>Save preferences</button> : <button type="button" aria-expanded={custom} onClick={() => setCustom(true)} className={button}>Customize</button>}
            <button type="button" onClick={() => save({ necessary: true, analytics: true, marketing: true, personal: true }, 'All cookies accepted')} className={button}>Accept all</button>
          </div>
        </section>
      )}
    </div>
  );
}
