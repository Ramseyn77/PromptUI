/**
 * @registry
 * name: Safari Mockup
 * category: Cards
 * style: Minimal
 * tags: recent
 * description: Fenêtre de navigateur façon Safari avec barre d'adresse, onglets et mini landing page à l'intérieur.
 * prompt: Create a Safari-style browser window mockup: toolbar with red/yellow/green traffic lights, back/forward chevrons, centered rounded address bar with a lock icon and domain, share and plus icons; the viewport shows a mini landing page (nav, headline, two buttons, three feature tiles). Use it to frame screenshots. Light and dark window chrome.
 */
import { ChevronLeft, ChevronRight, Lock, Plus, RotateCw, Share } from 'lucide-react';

export function SafariMockup() {
  return (
    <figure aria-label="Browser window showing acme.dev" className="w-full max-w-2xl overflow-hidden rounded-xl border border-zinc-300 bg-white shadow-2xl shadow-zinc-900/10 dark:border-zinc-700 dark:bg-zinc-900 dark:shadow-black/40">
      <div aria-hidden className="flex items-center gap-3 border-b border-zinc-200 bg-zinc-100 px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-800/70">
        <div className="flex gap-1.5"><span className="size-3 rounded-full bg-[#ff5f57]" /><span className="size-3 rounded-full bg-[#febc2e]" /><span className="size-3 rounded-full bg-[#28c840]" /></div>
        <div className="hidden gap-2 text-zinc-400 sm:flex"><ChevronLeft className="size-4" /><ChevronRight className="size-4" /></div>
        <div className="mx-auto flex w-full max-w-xs items-center justify-center gap-1.5 rounded-md bg-white px-3 py-1 text-xs text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
          <Lock className="size-3" />acme.dev<RotateCw className="ml-auto size-3 text-zinc-400" />
        </div>
        <div className="hidden gap-3 text-zinc-400 sm:flex"><Share className="size-4" /><Plus className="size-4" /></div>
      </div>
      <div className="bg-white p-6 dark:bg-zinc-950 sm:p-8">
        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <span className="font-bold text-zinc-900 dark:text-zinc-100">acme</span>
          <span className="hidden gap-4 sm:flex"><span>Product</span><span>Pricing</span><span>Docs</span></span>
        </div>
        <h3 className="mx-auto mt-8 max-w-sm text-center text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">Ship your next idea this weekend</h3>
        <div className="mt-5 flex justify-center gap-2">
          <span className="rounded-md bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-white dark:bg-white dark:text-zinc-950">Start free</span>
          <span className="rounded-md border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">Live demo</span>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-3">
          {['from-teal-200 to-emerald-300', 'from-sky-200 to-indigo-300', 'from-violet-200 to-fuchsia-300'].map((tone) => <div key={tone} className={`h-16 rounded-lg bg-gradient-to-br ${tone} dark:opacity-70`} />)}
        </div>
      </div>
    </figure>
  );
}
