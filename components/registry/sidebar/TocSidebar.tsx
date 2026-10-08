/**
 * @registry
 * name: TOC Sidebar
 * category: Sidebar
 * style: Editorial
 * tags: recent
 * description: Table des matières d'article qui surligne la section lue pendant le défilement.
 * prompt: Create an article layout with a "On this page" table-of-contents sidebar: headings in a scrollable article are observed with IntersectionObserver (root = the scroll container) and the matching TOC link gets an active indicator; clicking a link scrolls that section into view. TOC hidden below sm. Light and dark mode.
 */
'use client';
import { useEffect, useRef, useState } from 'react';

const sections = ['Overview', 'Installation', 'Usage', 'Theming', 'FAQ'];

export function TocSidebar() {
  const [active, setActive] = useState(sections[0]);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (visible) setActive(visible.target.id.replace('toc-', ''));
    }, { root, rootMargin: '0px 0px -70% 0px' });
    root.querySelectorAll('h3').forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, []);

  function go(section: string) {
    // Scroll only the article container (scrollIntoView would also scroll the page).
    const heading = scroller.current?.querySelector<HTMLElement>(`#toc-${section}`);
    if (heading) scroller.current?.scrollTo({ top: heading.offsetTop - 8, behavior: 'smooth' });
  }

  return (
    <div className="flex w-full max-w-2xl gap-6 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div ref={scroller} tabIndex={0} aria-label="Article" className="relative h-72 flex-1 overflow-y-auto pr-2 outline-none">
        {sections.map((section) => (
          <section key={section} className="pb-10">
            <h3 id={`toc-${section}`} className="scroll-mt-2 text-lg font-semibold text-zinc-900 dark:text-white">{section}</h3>
            <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">Placeholder paragraph for the {section.toLowerCase()} section. Scroll to see the table of contents follow along as each heading reaches the top.</p>
          </section>
        ))}
      </div>
      <nav aria-label="On this page" className="hidden w-40 shrink-0 sm:block">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">On this page</p>
        <ul className="mt-3 border-l border-zinc-200 dark:border-zinc-800">
          {sections.map((section) => <li key={section}><button type="button" aria-current={active === section ? 'location' : undefined} onClick={() => go(section)} className={`-ml-px block border-l-2 py-1 pl-3 text-left text-sm transition ${active === section ? 'border-teal-500 font-medium text-teal-700 dark:text-teal-300' : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'}`}>{section}</button></li>)}
        </ul>
      </nav>
    </div>
  );
}
