/**
 * @registry
 * name: Download Apps CTA
 * category: CTA
 * style: Dark
 * tags: recent
 * description: Appel au téléchargement avec détection du système, boutons par plateforme et version mise en avant.
 * prompt: Create a desktop app download CTA on a dark panel: headline, the detected platform's button highlighted as primary ("Download for macOS", detected via navigator.userAgent after mount, default macOS to stay hydration safe), secondary buttons for the other platforms, version/size line and a terminal install alternative (brew command). Dark in both themes.
 */
'use client';
import { Apple, Download, Monitor, Terminal } from 'lucide-react';
import { useEffect, useState } from 'react';

const platforms = [
  { key: 'mac', label: 'macOS', icon: Apple, size: '84 MB · Universal' },
  { key: 'win', label: 'Windows', icon: Monitor, size: '91 MB · x64' },
  { key: 'linux', label: 'Linux', icon: Terminal, size: '88 MB · .deb / .rpm' },
] as const;

export function DownloadAppsCta() {
  const [os, setOs] = useState<'mac' | 'win' | 'linux'>('mac');

  useEffect(() => {
    const agent = navigator.userAgent;
    if (/Windows/.test(agent)) setOs('win');
    else if (/Linux/.test(agent) && !/Android/.test(agent)) setOs('linux');
  }, []);

  const main = platforms.find((platform) => platform.key === os)!;
  const MainIcon = main.icon;

  return (
    <section className="w-full max-w-xl rounded-3xl bg-zinc-950 p-8 text-center text-white ring-1 ring-white/10">
      <h2 className="text-3xl font-semibold tracking-tight">Take your notes offline.</h2>
      <p className="mt-2 text-zinc-400">Native apps with instant sync and keyboard-first everything.</p>
      <button type="button" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"><MainIcon aria-hidden className="size-4" />Download for {main.label}<Download aria-hidden className="size-4" /></button>
      <p className="mt-2 text-xs text-zinc-500">v3.8.1 · {main.size}</p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {platforms.filter((platform) => platform.key !== os).map(({ key, label, icon: Icon }) => <button key={key} type="button" onClick={() => setOs(key)} className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs text-zinc-300 hover:bg-white/5"><Icon aria-hidden className="size-3.5" />{label}</button>)}
      </div>
      <p className="mt-6 inline-block rounded-lg bg-white/5 px-3 py-2 font-mono text-xs text-zinc-300"><span className="text-teal-400">$</span> brew install --cask acme-notes</p>
    </section>
  );
}
