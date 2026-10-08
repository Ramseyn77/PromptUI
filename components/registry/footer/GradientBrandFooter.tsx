/**
 * @registry
 * name: Gradient Brand Footer
 * category: Footer
 * style: Gradient
 * tags: featured, recent
 * description: Pied de page sur dégradé aurore avec grand slogan, inscription newsletter vitrée et liens en ligne.
 * prompt: Create a gradient footer: an aurora gradient background (teal → indigo → fuchsia) with soft noise-free blobs, a large two-line slogan, a glassy newsletter form, inline link rows and a bottom copyright line; white text in both themes with sufficient contrast. Responsive stacking.
 */
'use client';
import { useId } from 'react';

export function GradientBrandFooter() {
  const uid = useId();
  return (
    <footer className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 via-indigo-600 to-fuchsia-600 px-6 py-12 text-white sm:px-10">
      <div aria-hidden className="absolute -right-24 -top-24 size-72 rounded-full bg-white/15 blur-3xl" />
      <div aria-hidden className="absolute -bottom-32 left-10 size-72 rounded-full bg-fuchsia-300/30 blur-3xl" />
      <div className="relative grid gap-8 md:grid-cols-2 md:items-end">
        <p className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Build bold.<br />Ship calm.</p>
        <form onSubmit={(event) => event.preventDefault()} className="rounded-2xl border border-white/25 bg-white/10 p-2 backdrop-blur">
          <label htmlFor={`${uid}-gradient-footer-email`} className="sr-only">Email</label>
          <div className="flex gap-2">
            <input id={`${uid}-gradient-footer-email`} type="email" placeholder="Your email" className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/60" />
            <button type="submit" className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-indigo-700">Subscribe</button>
          </div>
        </form>
      </div>
      <nav aria-label="Footer" className="relative mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/85">
        {['Product', 'Pricing', 'Docs', 'Blog', 'Careers', 'Privacy', 'Terms'].map((link) => <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-white hover:underline">{link}</a>)}
      </nav>
      <p className="relative mt-6 border-t border-white/20 pt-4 text-xs text-white/70">© 2026 Aurora Labs · Made with care in Lisbon & Dakar</p>
    </footer>
  );
}
