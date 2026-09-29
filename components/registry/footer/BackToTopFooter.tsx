/**
 * @registry
 * name: Back To Top Footer
 * category: Footer
 * style: SaaS
 * tags: recent
 * description: Pied de page avec bouton « retour en haut » circulaire qui anime sa fleche au survol.
 * prompt: Create a footer with logo and links on one side and a round "Back to top" button on the other; the arrow slides up and loops on hover, click scrolls the window smoothly to the top (behavior respects prefers-reduced-motion). Light and dark mode.
 */
'use client';
import { ArrowUp } from 'lucide-react';

export function BackToTopFooter() {
  function toTop() {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  }

  return (
    <>
      <style>{`@keyframes pui-arrow-loop{0%{transform:translateY(0)}49%{transform:translateY(-140%)}50%{transform:translateY(140%)}100%{transform:translateY(0)}}`}</style>
      <footer className="flex w-full max-w-4xl flex-col gap-6 rounded-3xl border border-zinc-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-950">
        <div>
          <p className="font-bold text-zinc-900 dark:text-white">Orbit</p>
          <nav aria-label="Footer" className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-zinc-600 dark:text-zinc-400">{['Product', 'Docs', 'Pricing', 'Blog'].map((link) => <a key={link} href="#" className="hover:text-zinc-900 dark:hover:text-white">{link}</a>)}</nav>
        </div>
        <button type="button" onClick={toTop} className="group inline-flex items-center gap-3 self-start text-sm font-medium text-zinc-700 sm:self-auto dark:text-zinc-300">
          Back to top
          <span className="grid size-11 place-items-center overflow-hidden rounded-full border border-zinc-300 transition group-hover:border-zinc-900 group-hover:bg-zinc-900 group-hover:text-white dark:border-zinc-700 dark:group-hover:border-white dark:group-hover:bg-white dark:group-hover:text-zinc-900">
            <ArrowUp aria-hidden className="size-4 group-hover:motion-safe:animate-[pui-arrow-loop_.6s_ease-in-out]" />
          </span>
        </button>
      </footer>
    </>
  );
}
