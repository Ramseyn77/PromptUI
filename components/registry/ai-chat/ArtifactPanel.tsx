/**
 * @registry
 * name: Artifact Panel
 * category: AI Chat
 * style: Minimal
 * tags: featured, recent
 * description: Panneau d'artefact généré par l'IA avec onglets Aperçu / Code, versions et boutons copier et télécharger.
 * prompt: Create an AI artifact panel (like Claude/v0): header with title, version switcher (v1/v2/v3 buttons with aria-pressed), Copy and Download icon buttons; tabs Preview / Code (tablist) where Preview renders a small pricing card that changes per version and Code shows its JSX source in a scrollable mono block. Light and dark mode.
 */
'use client';
import { Check, Copy, Download } from 'lucide-react';
import { useState } from 'react';

const versions = [
  { label: 'v1', accent: 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900', price: '$12' },
  { label: 'v2', accent: 'bg-teal-600 text-white', price: '$15' },
  { label: 'v3', accent: 'bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white', price: '$19' },
];

export function ArtifactPanel() {
  const [version, setVersion] = useState(2);
  const [tab, setTab] = useState<'Preview' | 'Code'>('Preview');
  const [copied, setCopied] = useState(false);
  const v = versions[version];
  const code = `<div className="rounded-2xl border p-5">\n  <p className="text-sm">Pro</p>\n  <p className="text-3xl font-bold">${v.price}</p>\n  <button className="${v.accent.split(' ')[0]}">\n    Upgrade\n  </button>\n</div>`;

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center gap-2 border-b border-zinc-200 px-3 py-2 dark:border-zinc-800">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Pricing card</p>
        <div className="ml-2 flex rounded-md bg-zinc-100 p-0.5 dark:bg-zinc-900">{versions.map((item, index) => <button key={item.label} type="button" aria-pressed={version === index} onClick={() => setVersion(index)} className={`rounded px-1.5 py-0.5 font-mono text-[11px] ${version === index ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white' : 'text-zinc-500'}`}>{item.label}</button>)}</div>
        <button type="button" aria-label="Copy code" onClick={() => { setCopied(true); window.setTimeout(() => setCopied(false), 1200); }} className="ml-auto grid size-7 place-items-center rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800">{copied ? <Check aria-hidden className="size-4 text-emerald-500" /> : <Copy aria-hidden className="size-4" />}</button>
        <button type="button" aria-label="Download" className="grid size-7 place-items-center rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"><Download aria-hidden className="size-4" /></button>
      </div>
      <div role="tablist" className="flex gap-1 px-3 pt-2">{(['Preview', 'Code'] as const).map((name) => <button key={name} type="button" role="tab" aria-selected={tab === name} onClick={() => setTab(name)} className={`rounded-md px-2.5 py-1 text-xs font-medium ${tab === name ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'}`}>{name}</button>)}</div>
      <div role="tabpanel" className="p-3">
        {tab === 'Preview' ? (
          <div className="grid place-items-center rounded-xl bg-zinc-50 py-6 dark:bg-zinc-900">
            <div className="w-44 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-950">
              <p className="text-sm text-zinc-500">Pro</p>
              <p className="text-3xl font-bold text-zinc-950 dark:text-zinc-50">{v.price}<span className="text-sm font-normal text-zinc-400">/mo</span></p>
              <span className={`mt-3 block rounded-lg py-1.5 text-center text-sm font-semibold ${v.accent}`}>Upgrade</span>
            </div>
          </div>
        ) : <pre className="h-44 overflow-auto rounded-xl bg-zinc-950 p-3 font-mono text-xs leading-5 text-zinc-300" data-lenis-prevent>{code}</pre>}
      </div>
    </div>
  );
}
