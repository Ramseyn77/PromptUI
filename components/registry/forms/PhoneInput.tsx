/**
 * @registry
 * name: Phone Input
 * category: Forms
 * style: SaaS
 * tags: recent
 * description: Champ téléphone avec indicatif pays, format automatique par groupes et validation de longueur.
 * prompt: Create an international phone field: a country select (FR +33, CI +225, US +1, SN +221) joined to a tel input that keeps digits only and auto-formats into groups of two (or 3-3-4 for US), with a validity check icon when the length matches the country's expected digits; aria-describedby example hint. Light and dark mode.
 */
'use client';
import { CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const countries = {
  FR: { dial: '+33', digits: 9, example: '6 12 34 56 78' },
  CI: { dial: '+225', digits: 10, example: '07 08 09 10 11' },
  US: { dial: '+1', digits: 10, example: '415 555 0132' },
  SN: { dial: '+221', digits: 9, example: '77 123 45 67' },
} as const;

function format(digits: string, country: keyof typeof countries) {
  if (country === 'US') return [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6, 10)].filter(Boolean).join(' ');
  if (country === 'FR' || country === 'SN') return [digits.slice(0, 1 + Number(country === 'SN')), ...(digits.slice(1 + Number(country === 'SN')).match(/.{1,2}/g) ?? [])].filter(Boolean).join(' ');
  return (digits.match(/.{1,2}/g) ?? []).join(' ');
}

export function PhoneInput() {
  const [country, setCountry] = useState<keyof typeof countries>('CI');
  const [digits, setDigits] = useState('0708091');
  const config = countries[country];
  const valid = digits.length === config.digits;

  return (
    <div className="w-full max-w-sm">
      <label htmlFor="phone" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Phone number</label>
      <div className="mt-1.5 flex rounded-xl border border-zinc-300 bg-white focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-500/15 dark:border-zinc-700 dark:bg-zinc-900">
        <label className="sr-only" htmlFor="phone-country">Country code</label>
        <select id="phone-country" value={country} onChange={(event) => { setCountry(event.target.value as keyof typeof countries); setDigits(''); }} className="rounded-l-xl border-r border-zinc-200 bg-transparent px-2.5 text-sm font-medium text-zinc-700 outline-none dark:border-zinc-700 dark:text-zinc-200">
          {Object.entries(countries).map(([code, item]) => <option key={code} value={code}>{code} {item.dial}</option>)}
        </select>
        <input id="phone" type="tel" inputMode="tel" autoComplete="tel-national" value={format(digits, country)} onChange={(event) => setDigits(event.target.value.replace(/\D/g, '').slice(0, config.digits))} aria-describedby="phone-hint" className="h-11 min-w-0 flex-1 bg-transparent px-3 text-sm tabular-nums text-zinc-900 outline-none dark:text-white" />
        {valid && <CheckCircle2 aria-label="Valid number" className="mr-3 size-5 self-center text-emerald-500" />}
      </div>
      <p id="phone-hint" className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">Example: {config.dial} {config.example}</p>
    </div>
  );
}
