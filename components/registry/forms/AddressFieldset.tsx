/**
 * @registry
 * name: Address Fieldset
 * category: Forms
 * style: SaaS
 * tags: recent
 * description: Bloc d'adresse façon fieldset daisyUI : pays qui adapte les libellés (code postal, état/région) et validation.
 * prompt: Create a daisyUI fieldset-style address form: legend, country select that adapts labels and formats (France → "Code postal" 5 digits, United States → "ZIP code" + State select, Senegal → "Region" with no postal code), street lines, city; inline validation on blur with aria-invalid and messages, and a "Use as billing address" checkbox. 2 columns from sm. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const countries = {
  France: { postal: 'Postal code', pattern: /^\d{5}$/, region: null },
  'United States': { postal: 'ZIP code', pattern: /^\d{5}(-\d{4})?$/, region: ['California', 'New York', 'Texas'] },
  Senegal: { postal: null, pattern: null, region: ['Dakar', 'Thiès', 'Saint-Louis'] },
} as const;
type Country = keyof typeof countries;

export function AddressFieldset() {
  const [country, setCountry] = useState<Country>('France');
  const [postal, setPostal] = useState('7500');
  const [touched, setTouched] = useState(true);
  const rule = countries[country];
  const postalInvalid = touched && rule.pattern !== null && !rule.pattern.test(postal);
  const field = 'mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-teal-500/20 dark:bg-zinc-950 dark:text-zinc-100';
  const ok = 'border-zinc-300 focus:border-teal-500 dark:border-zinc-700';

  return (
    <fieldset className="w-full max-w-md rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
      <legend className="px-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Shipping address</legend>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-xs font-medium text-zinc-600 sm:col-span-2 dark:text-zinc-400">Country
          <select value={country} onChange={(event) => { setCountry(event.target.value as Country); setTouched(false); setPostal(''); }} className={`${field} ${ok}`}>{Object.keys(countries).map((name) => <option key={name}>{name}</option>)}</select>
        </label>
        <label className="text-xs font-medium text-zinc-600 sm:col-span-2 dark:text-zinc-400">Street address<input autoComplete="address-line1" defaultValue="12 rue des Lilas" className={`${field} ${ok}`} /></label>
        <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">City<input autoComplete="address-level2" defaultValue={country === 'Senegal' ? 'Dakar' : 'Paris'} key={country} className={`${field} ${ok}`} /></label>
        {rule.postal && (
          <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">{rule.postal}
            <input inputMode="numeric" autoComplete="postal-code" aria-invalid={postalInvalid} value={postal} onChange={(event) => setPostal(event.target.value)} onBlur={() => setTouched(true)} className={`${field} ${postalInvalid ? 'border-rose-500 focus:border-rose-500' : ok}`} />
            {postalInvalid && <span className="mt-1 block text-[11px] text-rose-600 dark:text-rose-400">Enter a valid {rule.postal.toLowerCase()}.</span>}
          </label>
        )}
        {rule.region && <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">{country === 'United States' ? 'State' : 'Region'}<select className={`${field} ${ok}`}>{rule.region.map((name) => <option key={name}>{name}</option>)}</select></label>}
        <label className="flex items-center gap-2 text-sm text-zinc-700 sm:col-span-2 dark:text-zinc-300"><input type="checkbox" defaultChecked className="accent-teal-600" />Use as billing address</label>
      </div>
    </fieldset>
  );
}
