'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, ChevronDown, Code2, Copy, ExternalLink, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import type { LibraryComponent } from '@/types/component';
import { ComponentPreview } from '@/components/library/ComponentPreview';
import { FitPreview } from '@/components/library/FitPreview';

type SliderItem = Pick<LibraryComponent, 'slug' | 'name' | 'category' | 'style' | 'description' | 'code' | 'prompt'>;

export function RecentComponentSlider({ items }: { items: SliderItem[] }) {
  const [active, setActive] = useState<SliderItem | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState<'prompt' | 'code' | null>(null);
  const [paused, setPaused] = useState(false);
  const activeIndex = useMemo(() => active ? items.findIndex((item) => item.slug === active.slug) : -1, [active, items]);
  const loopItems = useMemo(() => [...items, ...items], [items]);

  useEffect(() => {
    if (!active) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setActive(null); };
    window.addEventListener('keydown', onKey);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [active]);

  async function copy(value: string, type: 'prompt' | 'code') {
    await navigator.clipboard.writeText(value);
    setCopied(type);
    window.setTimeout(() => setCopied(null), 1400);
  }

  function openSibling(direction: 'prev' | 'next') {
    if (activeIndex < 0) return;
    const nextIndex = direction === 'next'
      ? (activeIndex + 1) % items.length
      : (activeIndex - 1 + items.length) % items.length;
    setActive(items[nextIndex]);
    setMenuOpen(false);
  }

  function viewCount(slug: string) {
    const score = slug.split('').reduce((total, char) => total + char.charCodeAt(0), 0);
    return `${(score % 8) + 2}.${score % 9}k vues`;
  }

  return (
    <>
      <div className="relative">
        <style>{`@keyframes recentSliderLoop{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
        <div className="-mx-4 overflow-hidden px-4 pb-5">
        <div
          className="flex w-max gap-8 will-change-transform"
          style={{ animation: 'recentSliderLoop 44s linear infinite', animationPlayState: paused ? 'paused' : 'running' }}
        >
          {loopItems.map((item, index) => (
            <article
              key={`${item.slug}-${index}`}
              onClick={() => setActive(item)}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setActive(item);
                }
              }}
              role="button"
              data-fit-host
              tabIndex={0}
              className="group relative w-[82vw] max-w-[420px] shrink-0 cursor-pointer overflow-visible rounded-[1.6rem] bg-transparent text-left outline-none transition hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[var(--accent)] md:w-[420px]"
            >
              <div className="pointer-events-none h-72 p-2">
                <FitPreview>
                  <ComponentPreview slug={item.slug}/>
                </FitPreview>
              </div>
              <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 opacity-0 transition group-hover:opacity-100">
                <div>
                  <h3 className="text-lg font-black text-white">{item.name}</h3>
                  <p className="mt-1 text-xs font-semibold text-white/65">{viewCount(item.slug)}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        </div>
      </div>

      {active && createPortal(
        <div data-lenis-prevent role="dialog" aria-modal="true" aria-label={active.name} className="fixed inset-0 z-[80] bg-black/82 text-white backdrop-blur-md">
          <div className="flex h-14 items-center justify-between border-b border-white/10 px-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-black">{active.name}</p>
              <p className="text-[10px] uppercase text-white/45">{active.category} / {active.style}</p>
            </div>
            <button onClick={() => setActive(null)} aria-label="Fermer" className="grid size-10 place-items-center rounded-full transition hover:bg-white/10">
              <X size={19}/>
            </button>
          </div>

          <button onClick={() => openSibling('prev')} aria-label="Composant precedent" className="absolute left-4 top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 transition hover:bg-white/20 md:grid">
            <ArrowLeft size={19}/>
          </button>
          <button onClick={() => openSibling('next')} aria-label="Composant suivant" className="absolute right-4 top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 transition hover:bg-white/20 md:grid">
            <ArrowRight size={19}/>
          </button>

          <div className="mx-auto flex h-[calc(100vh-8.5rem)] max-w-7xl items-center justify-center px-4 py-6">
            <div className="preview-grid max-h-full w-full overflow-auto rounded-[1.75rem] border border-white/10 bg-[#080808] p-5 shadow-2xl shadow-black">
              <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3">
                <span className="text-sm font-semibold">{active.name}</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/65">expanded preview</span>
              </div>
              <div className="grid min-h-[520px] place-items-center rounded-2xl bg-white/[.02] p-6">
                <ComponentPreview slug={active.slug}/>
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-5 flex justify-center px-4">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/70 p-2 shadow-2xl backdrop-blur">
              <Link href={`/components/${active.slug}`} className="rounded-full px-4 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10">
                Open
              </Link>
              <button onClick={() => copy(active.prompt, 'prompt')} className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 font-ui text-sm font-semibold text-[var(--on-accent)] transition hover:bg-[var(--accent-strong)]">
                {copied === 'prompt' ? <Check size={16}/> : <Copy size={16}/>}
                {copied === 'prompt' ? 'Prompt copié' : 'Copy prompt'}
              </button>
              <div className="relative">
                <button onClick={() => setMenuOpen((value) => !value)} aria-label="Plus d'actions" className="grid size-11 place-items-center rounded-full bg-[var(--accent)] text-[var(--on-accent)] transition hover:bg-[var(--accent-strong)]">
                  <ChevronDown size={17} className={`transition ${menuOpen ? 'rotate-180' : ''}`}/>
                </button>
                {menuOpen && (
                  <div className="absolute bottom-[calc(100%+.65rem)] right-0 w-48 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 p-1 shadow-2xl">
                    <button onClick={() => copy(active.code, 'code')} className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-white transition hover:bg-white/10">
                      {copied === 'code' ? <Check size={15}/> : <Code2 size={15}/>}
                      {copied === 'code' ? 'Code copié' : 'Copy code'}
                    </button>
                    <Link href={`/components/${active.slug}`} className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
                      <ExternalLink size={15}/> Fiche composant
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
