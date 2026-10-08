/**
 * @registry
 * name: Scroll Spy Navbar
 * category: Navbar
 * style: Minimal
 * tags: recent
 * description: Navigation d'une page longue qui surligne la section visible pendant le défilement, avec soulignement glissant.
 * prompt: Create a scroll-spy navbar inside a scrollable demo page (data-lenis-prevent): anchor links (Features, Pricing, FAQ, Contact) whose active state follows the section in view using IntersectionObserver rooted on the scroll container; a sliding underline moves to the active link; clicking a link smooth-scrolls the container to the section (instant with reduced motion). Light and dark mode.
 */
'use client';
import { useEffect, useRef, useState } from 'react';

const sections = ['Features', 'Pricing', 'FAQ', 'Contact'];

export function ScrollSpyNavbar() {
  const container = useRef<HTMLDivElement>(null);
  const links = useRef<(HTMLAnchorElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [bar, setBar] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const root = container.current;
    if (!root) return;
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index)); }), { root, rootMargin: '-40% 0px -55% 0px' });
    root.querySelectorAll('section').forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => { const link = links.current[active]; if (link) setBar({ left: link.offsetLeft, width: link.offsetWidth }); }, [active]);

  function go(index: number) {
    const root = container.current;
    const target = root?.querySelectorAll('section')[index] as HTMLElement | undefined;
    if (root && target) root.scrollTo({ top: target.offsetTop - 56, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }

  return (
    <div className="relative h-96 w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <nav aria-label="Page sections" className="absolute inset-x-0 top-0 z-10 border-b border-zinc-200 bg-white/90 px-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
        <div className="relative flex gap-5">
          {sections.map((section, index) => <a key={section} ref={(node) => { links.current[index] = node; }} href={`#${section.toLowerCase()}`} aria-current={active === index ? 'location' : undefined} onClick={(event) => { event.preventDefault(); go(index); }} className={`py-3 text-sm font-medium transition-colors ${active === index ? 'text-zinc-950 dark:text-white' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'}`}>{section}</a>)}
          <span aria-hidden className="absolute bottom-0 h-0.5 rounded-full bg-teal-500 transition-all duration-300" style={{ left: bar.left, width: bar.width }} />
        </div>
      </nav>
      <div ref={container} data-lenis-prevent className="relative h-full overflow-y-auto px-5 pt-14">
        {sections.map((section, index) => (
          <section key={section} data-index={index} className="min-h-64 border-b border-dashed border-zinc-200 py-6 dark:border-zinc-800">
            <h3 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">{section}</h3>
            <div className="mt-3 space-y-2">{[90, 75, 82].map((width) => <div key={width} className="h-2 rounded bg-zinc-100 dark:bg-zinc-800" style={{ width: `${width}%` }} />)}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
