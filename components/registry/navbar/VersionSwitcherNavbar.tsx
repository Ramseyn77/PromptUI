/**
 * @registry
 * name: Version Switcher Navbar
 * category: Navbar
 * style: Dark
 * tags: recent
 * description: Navbar de documentation sombre avec sélecteur de version (liste déroulante), recherche ⌘K, lien GitHub textuel et bascule de menu mobile.
 * prompt: Create a dark documentation navbar: logo + "docs" label, a version switcher button showing "v3.2" that opens an in-flow listbox (defaultOpen) with versions, the latest tagged "latest" and old ones tagged "legacy", selected with a check; a search button showing ⌘K; text links Guides / API / Examples / Changelog; a "Star 12.4k" text button; under lg the links collapse into a menu button with aria-expanded. Dark in both themes.
 */
'use client';
import { Check, ChevronDown, Menu, Search, Star } from 'lucide-react';
import { useState } from 'react';

const versions = [['v3.2', 'latest'], ['v3.1', ''], ['v3.0', ''], ['v2.9', 'legacy'], ['v1.x', 'legacy']];
const links = ['Guides', 'API', 'Examples', 'Changelog'];

export function VersionSwitcherNavbar({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [version, setVersion] = useState('v3.2');
  const [open, setOpen] = useState(defaultOpen);
  const [menu, setMenu] = useState(false);

  return (
    <header className="w-full bg-zinc-950 px-4 text-zinc-300 ring-1 ring-white/10">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3">
        <a href="#" className="flex items-center gap-1.5 font-bold text-white"><span className="grid size-6 place-items-center rounded-md bg-emerald-500 text-xs text-zinc-950">◆</span>Prism<span className="font-normal text-zinc-500">docs</span></a>
        <div className="relative">
          <button type="button" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(!open)} className="flex items-center gap-1 rounded-md border border-white/10 px-2 py-1 font-mono text-xs text-zinc-200 hover:bg-white/5">{version}<ChevronDown aria-hidden className="size-3" /></button>
        </div>
        <button type="button" className="ml-2 hidden h-8 w-56 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 text-sm text-zinc-500 hover:border-white/20 sm:flex"><Search aria-hidden className="size-4" />Search docs<kbd className="ml-auto rounded border border-white/10 px-1 font-mono text-[10px]">⌘K</kbd></button>
        <nav aria-label="Docs" className="ml-auto hidden lg:block"><ul className="flex gap-5 text-sm">{links.map((link) => <li key={link}><a href="#" className="hover:text-white">{link}</a></li>)}</ul></nav>
        <a href="#" className="ml-auto hidden items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1 text-xs hover:bg-white/5 sm:flex lg:ml-4"><Star aria-hidden className="size-3.5" />Star <span className="text-white">12.4k</span></a>
        <button type="button" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu(!menu)} className="ml-auto grid size-9 place-items-center rounded-md hover:bg-white/5 sm:ml-0 lg:hidden"><Menu aria-hidden className="size-5" /></button>
      </div>
      {open && (
        <div className="mx-auto mb-3 max-w-6xl">
          <div className="w-56 rounded-xl border border-white/10 bg-zinc-900 p-1 shadow-xl">
            <ul role="listbox" aria-label="Documentation version">{versions.map(([name, tag]) => <li key={name} role="option" aria-selected={version === name} tabIndex={0} onClick={() => { setVersion(name); setOpen(false); }} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setVersion(name); setOpen(false); } }} className="flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 font-mono text-sm outline-none hover:bg-white/5 focus-visible:bg-white/10"><span className="w-4">{version === name && <Check aria-hidden className="size-3.5 text-emerald-400" />}</span>{name}{tag && <span className={`ml-auto rounded px-1.5 font-sans text-[10px] font-semibold ${tag === 'latest' ? 'bg-emerald-400/15 text-emerald-300' : 'bg-white/10 text-zinc-400'}`}>{tag}</span>}</li>)}</ul>
          </div>
        </div>
      )}
      {menu && <nav aria-label="Docs mobile" className="pb-3 lg:hidden"><ul className="space-y-1 text-sm">{links.map((link) => <li key={link}><a href="#" className="block rounded-md px-2 py-2 hover:bg-white/5">{link}</a></li>)}</ul></nav>}
    </header>
  );
}
