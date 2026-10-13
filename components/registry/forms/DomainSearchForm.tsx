/**
 * @registry
 * name: Domain Search Form
 * category: Forms
 * style: Gradient
 * tags: recent
 * description: Recherche de nom de domaine : vérification simulée de disponibilité par extension, prix, suggestions et ajout au panier.
 * prompt: Create a domain search form: a large input with a gradient Search button; submitting shows a short "Checking…" state then a results list for the typed name across .com, .io, .dev, .app and .co, each with an availability badge (taken ones greyed, available ones with a price and an Add button that toggles to "In cart"); availability is decided deterministically from the name length so it's stable; a cart summary with total appears when items are added; input is sanitised to lowercase letters, digits and dashes. Light and dark mode.
 */
'use client';
import { Check, Search } from 'lucide-react';
import { useId, useState, type FormEvent } from 'react';

const tlds = [['.com', 12], ['.io', 39], ['.dev', 15], ['.app', 18], ['.co', 25]] as const;

export function DomainSearchForm() {
  const uid = useId();
  const [name, setName] = useState('promptui');
  const [searched, setSearched] = useState('promptui');
  const [checking, setChecking] = useState(false);
  const [cart, setCart] = useState<string[]>([]);
  const results = tlds.map(([tld, price], index) => ({ domain: searched + tld, price, available: (searched.length + index) % 3 !== 0 }));
  const total = results.filter((result) => cart.includes(result.domain)).reduce((sum, result) => sum + result.price, 0);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!name) return;
    setChecking(true);
    window.setTimeout(() => { setSearched(name); setChecking(false); }, 700);
  }

  return (
    <div className="w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <form onSubmit={submit} className="flex gap-2">
        <label htmlFor={`${uid}-domain`} className="sr-only">Domain name</label>
        <input id={`${uid}-domain`} value={name} onChange={(event) => setName(event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))} placeholder="yourbrand" className="min-w-0 flex-1 rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100" />
        <button type="submit" disabled={!name || checking} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-5 text-sm font-semibold text-white disabled:opacity-50"><Search aria-hidden className="size-4" /><span className="hidden sm:inline">Search</span></button>
      </form>
      <div aria-live="polite" aria-busy={checking} className="mt-4">
        {checking ? <p className="py-6 text-center text-sm text-zinc-500">Checking availability…</p> : (
          <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {results.map((result) => {
              const inCart = cart.includes(result.domain);
              return (
                <li key={result.domain} className={`flex items-center gap-3 py-2.5 ${result.available ? '' : 'opacity-50'}`}>
                  <span className="min-w-0 flex-1 truncate font-medium text-zinc-950 dark:text-white">{result.domain}</span>
                  {result.available ? <>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">Available</span>
                    <span className="w-16 text-right text-sm tabular-nums text-zinc-700 dark:text-zinc-300">${result.price}/yr</span>
                    <button type="button" aria-pressed={inCart} onClick={() => setCart((list) => (inCart ? list.filter((item) => item !== result.domain) : [...list, result.domain]))} className={`flex w-20 items-center justify-center gap-1 rounded-lg py-1.5 text-xs font-semibold ${inCart ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950' : 'border border-zinc-300 text-zinc-800 dark:border-zinc-700 dark:text-zinc-200'}`}>{inCart ? <><Check aria-hidden className="size-3.5" />In cart</> : 'Add'}</button>
                  </> : <span className="text-xs text-zinc-500">Taken</span>}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {cart.length > 0 && <div className="mt-3 flex items-center justify-between rounded-xl bg-violet-50 px-4 py-3 text-sm dark:bg-violet-500/10"><span className="text-violet-900 dark:text-violet-200">{cart.length} domain{cart.length > 1 ? 's' : ''} · <strong className="tabular-nums">${total}/yr</strong></span><button type="button" className="rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white">Checkout</button></div>}
    </div>
  );
}
