/**
 * @registry
 * name: Outline Sidebar
 * category: Sidebar
 * style: Editorial
 * tags: recent
 * description: Plan de document (table des matières) avec niveaux H2/H3, section active suivie au défilement et barre de progression de lecture.
 * prompt: Create a document outline sidebar beside an article: a scrollable article (data-lenis-prevent) with H2/H3 headings; the sidebar lists them as a nested table of contents where the heading currently in view is highlighted with a sliding left indicator (IntersectionObserver rooted on the article container), clicking scrolls the article to the heading and sets aria-current; a reading progress bar at the top; on mobile the outline collapses into a "On this page" disclosure with aria-expanded. Light (paper) and dark mode.
 */
'use client';
import { ChevronDown } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';

const outline = [
  { id: 'intro', title: 'Why tokens matter', level: 2 }, { id: 'naming', title: 'Naming things', level: 3 }, { id: 'scales', title: 'Scales over values', level: 3 },
  { id: 'themes', title: 'Theming in practice', level: 2 }, { id: 'dark', title: 'Dark mode', level: 3 }, { id: 'ship', title: 'Shipping it', level: 2 },
];

export function OutlineSidebar() {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const articleRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState('intro');
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const root = articleRef.current!;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (visible) setActive(visible.target.getAttribute('data-outline')!);
    }, { root, rootMargin: '0px 0px -65% 0px' });
    root.querySelectorAll('[data-outline]').forEach((node) => observer.observe(node));
    const onScroll = () => setProgress(root.scrollTop / Math.max(1, root.scrollHeight - root.clientHeight));
    root.addEventListener('scroll', onScroll, { passive: true });
    return () => { observer.disconnect(); root.removeEventListener('scroll', onScroll); };
  }, []);

  function go(id: string) {
    const root = articleRef.current!;
    const target = root.querySelector<HTMLElement>(`[data-outline="${id}"]`)!;
    root.scrollTo({ top: target.offsetTop - 12, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    setActive(id);
    setOpen(false);
  }

  const toc = (
    <ul className="relative space-y-0.5 border-l border-zinc-200 dark:border-zinc-800">
      {outline.map((item) => <li key={item.id}><button type="button" aria-current={active === item.id ? 'location' : undefined} onClick={() => go(item.id)} className={`-ml-px block w-full border-l-2 py-1 text-left text-sm transition ${item.level === 3 ? 'pl-6' : 'pl-3'} ${active === item.id ? 'border-zinc-900 font-medium text-zinc-900 dark:border-zinc-100 dark:text-zinc-100' : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'}`}>{item.title}</button></li>)}
    </ul>
  );

  return (
    <div className="relative flex h-[28rem] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-[#fbfaf6] sm:flex-row dark:border-zinc-800 dark:bg-zinc-950">
      <div aria-hidden className="absolute inset-x-0 top-0 z-10 h-0.5 bg-zinc-200 dark:bg-zinc-800"><div className="h-full bg-amber-500" style={{ width: `${progress * 100}%` }} /></div>
      <nav aria-label="On this page" className="shrink-0 border-b border-zinc-200 p-4 sm:w-56 sm:border-b-0 sm:border-r dark:border-zinc-800">
        <button type="button" aria-expanded={open} aria-controls={`${uid}-toc`} onClick={() => setOpen(!open)} className="flex w-full items-center justify-between text-xs font-semibold uppercase tracking-wider text-zinc-500 sm:hidden">On this page<ChevronDown aria-hidden className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`} /></button>
        <p className="hidden text-xs font-semibold uppercase tracking-wider text-zinc-500 sm:block">On this page</p>
        <div id={`${uid}-toc`} className={`${open ? 'block' : 'hidden'} mt-3 sm:block`}>{toc}</div>
      </nav>
      <div ref={articleRef} className="relative flex-1 overflow-y-auto px-6 py-6 font-serif text-zinc-700 dark:text-zinc-300" data-lenis-prevent>
        {outline.map((item) => {
          const Heading = item.level === 2 ? 'h2' : 'h3';
          return (
            <section key={item.id} data-outline={item.id} className="mb-6">
              <Heading className={`${item.level === 2 ? 'text-2xl' : 'text-lg'} font-semibold text-zinc-900 dark:text-zinc-100`}>{item.title}</Heading>
              <p className="mt-2 leading-relaxed">Design tokens turn decisions into data. Instead of scattering hex values across files, you name intent once and let every surface inherit it — from buttons to charts to emails.</p>
              <p className="mt-2 leading-relaxed">The goal isn’t more abstraction; it’s fewer surprises. When a brand color shifts, one change should ripple everywhere it belongs, and nowhere it doesn’t.</p>
            </section>
          );
        })}
      </div>
    </div>
  );
}
