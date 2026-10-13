/**
 * @registry
 * name: Open Source Footer
 * category: Footer
 * style: Dark
 * tags: recent
 * description: Footer de projet open source : version, licence MIT, contributeurs en avatars empilés, commande d'installation copiable et liens docs.
 * prompt: Create a dark open-source project footer: left the project mark, one-line description, latest version pill "v2.8.1" and "MIT licensed"; a copyable install command box `npm i prism-ui` with a Copy button (aria-live "Copied"); a contributors row of overlapping initials avatars with "+214 contributors"; link columns (Docs, Community, Project); a bottom bar with "Built in public" and a sponsor link; stacks on mobile. Dark in both themes.
 */
'use client';
import { Check, Copy, Heart } from 'lucide-react';
import { useState } from 'react';

const contributors = ['AD', 'LM', 'MT', 'KM', 'IR', 'SO', 'NK', 'ZL'];
const columns = { Docs: ['Getting started', 'Components', 'Theming', 'API'], Community: ['Discussions', 'Discord', 'Showcase', 'Code of conduct'], Project: ['Changelog', 'Roadmap', 'Contributing', 'Security'] };

export function OpenSourceFooter() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try { await navigator.clipboard.writeText('npm i prism-ui'); } catch { /* clipboard unavailable */ }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <footer className="w-full bg-zinc-950 px-6 py-12 text-zinc-400 ring-1 ring-white/10">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.4fr_2fr]">
        <div>
          <p className="flex items-center gap-2 text-lg font-bold text-white"><span className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 text-sm text-zinc-950">P</span>Prism UI</p>
          <p className="mt-2 text-sm">Accessible React components you own.</p>
          <p className="mt-3 flex gap-2 text-xs"><span className="rounded-full bg-emerald-400/15 px-2 py-0.5 font-mono text-emerald-300">v2.8.1</span><span className="rounded-full bg-white/10 px-2 py-0.5">MIT licensed</span></p>
          <div className="mt-5 flex items-center gap-2 rounded-xl bg-white/5 p-1.5 pl-3 font-mono text-sm ring-1 ring-white/10"><span className="text-zinc-500">$</span><span className="flex-1 text-zinc-100">npm i prism-ui</span><button type="button" onClick={copy} aria-label="Copy install command" className="grid size-8 place-items-center rounded-lg hover:bg-white/10">{copied ? <Check aria-hidden className="size-4 text-emerald-400" /> : <Copy aria-hidden className="size-4" />}</button></div>
          <p aria-live="polite" className="mt-1 h-4 text-xs text-emerald-400">{copied ? 'Copied' : ''}</p>
          <div className="mt-4 flex items-center gap-3"><ul aria-label="Contributors" className="flex -space-x-2">{contributors.map((initials, index) => <li key={initials} className="grid size-8 place-items-center rounded-full text-[10px] font-bold text-white ring-2 ring-zinc-950" style={{ background: `hsl(${(index * 45) % 360} 55% 45%)` }}>{initials}</li>)}</ul><a href="#" className="text-xs hover:text-white">+214 contributors</a></div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {Object.entries(columns).map(([title, links]) => <nav key={title} aria-label={title}><p className="text-sm font-semibold text-white">{title}</p><ul className="mt-3 space-y-2 text-sm">{links.map((link) => <li key={link}><a href="#" className="hover:text-white">{link}</a></li>)}</ul></nav>)}
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-5xl flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5 text-xs"><span>Built in public · © 2026 Prism contributors</span><a href="#" className="flex items-center gap-1.5 hover:text-white"><Heart aria-hidden className="size-3.5 fill-pink-500 text-pink-500" />Sponsor the project</a></div>
    </footer>
  );
}
