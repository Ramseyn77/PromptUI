/**
 * @registry
 * name: App Download Footer
 * category: Footer
 * style: Gradient
 * tags: recent
 * description: Pied de page d'application mobile avec boutons de stores, QR code stylisé et liens.
 * prompt: Create a mobile-app footer: gradient card with "Get the app" headline, App Store / Google Play buttons and a decorative QR code (CSS grid of squares, aria-hidden, with sr-only text), then a simple links row and copyright below. Stacks on mobile. Light and dark mode.
 */
import { Apple, Play } from 'lucide-react';

const qr = Array.from({ length: 81 }, (_, index) => ((index * 7 + (index % 9) * 3) % 5 < 2 ? 1 : 0));

export function AppDownloadFooter() {
  return (
    <footer className="w-full max-w-4xl space-y-6 rounded-3xl bg-white p-6 dark:bg-zinc-950">
      <div className="flex flex-col items-center gap-6 rounded-2xl bg-gradient-to-br from-sky-500 to-violet-600 p-6 text-white sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="text-2xl font-semibold">Get the app</p>
          <p className="mt-1 text-sm text-white/80">Track your budget anywhere, even offline.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
            {[[Apple, 'App Store'], [Play, 'Google Play']].map(([Icon, label]) => {
              const StoreIcon = Icon as typeof Apple;
              return <a key={label as string} href="#" className="inline-flex items-center gap-2 rounded-xl bg-black/80 px-3.5 py-2 text-sm font-semibold hover:bg-black"><StoreIcon aria-hidden className="size-4" />{label as string}</a>;
            })}
          </div>
        </div>
        <div className="rounded-xl bg-white p-2">
          <div aria-hidden className="grid grid-cols-9 gap-px">{qr.map((cell, index) => <span key={index} className={`size-2 ${cell ? 'bg-zinc-950' : 'bg-white'}`} />)}</div>
          <span className="sr-only">QR code to download the app</span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-3 text-sm text-zinc-500 sm:flex-row dark:text-zinc-400">
        <nav aria-label="Footer" className="flex gap-5">{['Help', 'Privacy', 'Terms'].map((link) => <a key={link} href="#" className="hover:text-zinc-900 dark:hover:text-white">{link}</a>)}</nav>
        <p className="text-xs">© 2026 Pocket Budget</p>
      </div>
    </footer>
  );
}
