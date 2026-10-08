/**
 * @registry
 * name: Sticky Mobile CTA
 * category: CTA
 * style: SaaS
 * tags: recent
 * description: Barre d'achat collée en bas d'un écran produit mobile, qui apparaît quand le bouton principal sort de la vue.
 * prompt: Create a sticky bottom CTA for a mobile product page inside a phone-sized scrollable frame (data-lenis-prevent): product content with a primary "Add to bag" button; when that button scrolls out of view (IntersectionObserver on the frame) a bottom bar slides up with thumbnail, price and the same action. Light and dark mode.
 */
'use client';
import { ShoppingBag } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function StickyMobileCta() {
  const frame = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), { root: frame.current });
    if (button.current) observer.observe(button.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative h-[30rem] w-72 overflow-hidden rounded-[2rem] border-[6px] border-zinc-900 bg-white dark:border-zinc-700 dark:bg-zinc-950">
      <div ref={frame} data-lenis-prevent className="h-full overflow-y-auto pb-20">
        <div className="aspect-square bg-gradient-to-br from-amber-200 via-rose-200 to-violet-300 dark:from-amber-700/40 dark:via-rose-700/40 dark:to-violet-700/40" />
        <div className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Linen collection</p>
          <h3 className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Relaxed overshirt</h3>
          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">€89</p>
          <button ref={button} type="button" className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 py-3 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950"><ShoppingBag aria-hidden className="size-4" />Add to bag</button>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">Washed European linen with a soft hand. Boxy fit, mother-of-pearl buttons, chest pocket. Scroll down to see the sticky bar appear.</p>
          {Array.from({ length: 4 }, (_, index) => <div key={index} className="mt-3 h-16 rounded-xl bg-zinc-100 dark:bg-zinc-900" />)}
        </div>
      </div>
      <div aria-hidden={!visible} className={`absolute inset-x-0 bottom-0 flex items-center gap-3 border-t border-zinc-200 bg-white/95 p-3 backdrop-blur transition-transform duration-300 dark:border-zinc-800 dark:bg-zinc-950/95 ${visible ? 'translate-y-0' : 'translate-y-full'}`}>
        <span className="size-10 shrink-0 rounded-lg bg-gradient-to-br from-amber-200 to-violet-300" />
        <span className="flex-1 text-sm"><span className="block font-semibold text-zinc-900 dark:text-zinc-100">Overshirt</span><span className="text-zinc-500">€89</span></span>
        <button type="button" tabIndex={visible ? 0 : -1} className="rounded-xl bg-zinc-950 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Add</button>
      </div>
    </div>
  );
}
