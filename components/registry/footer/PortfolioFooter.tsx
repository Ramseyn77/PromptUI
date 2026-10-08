/**
 * @registry
 * name: Portfolio Footer
 * category: Footer
 * style: Dark
 * tags: recent
 * description: Footer de portfolio : disponibilité en direct, heure locale, bouton copier l'e-mail et retour en haut de page.
 * prompt: Create a dark personal portfolio footer: a green pulsing "Available for freelance from November" badge, a large "Have a project in mind?" heading, a copy-email button that swaps to "Copied!" (aria-live), local time "Lisbon 14:32" that updates each minute (rendered after mount to avoid hydration mismatch), social text links and a back-to-top button; stacks on mobile. Dark in both themes.
 */
'use client';
import { ArrowUp, Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';

export function PortfolioFooter() {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Lisbon' }).format(new Date()));
    update();
    const timer = window.setInterval(update, 30000);
    return () => window.clearInterval(timer);
  }, []);

  async function copy() {
    try { await navigator.clipboard.writeText('maya@maya.design'); } catch { /* clipboard unavailable */ }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <footer className="w-full rounded-3xl bg-zinc-950 px-6 py-10 text-white ring-1 ring-white/10 sm:px-10">
      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300"><span className="relative flex size-2"><span className="absolute inset-0 rounded-full bg-emerald-400 motion-safe:animate-ping" /><span className="relative size-2 rounded-full bg-emerald-400" /></span>Available for freelance from November</span>
      <p className="mt-5 max-w-md text-4xl font-semibold tracking-tight sm:text-5xl">Have a project in mind?</p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-200">{copied ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}maya@maya.design</button>
        <span aria-live="polite" className="text-sm text-emerald-300">{copied ? 'Copied!' : ''}</span>
      </div>
      <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
        <p>Lisbon <span className="tabular-nums text-white">{time || '--:--'}</span></p>
        <nav aria-label="Social" className="flex gap-5">{['Dribbble', 'Read.cv', 'LinkedIn', 'GitHub'].map((link) => <a key={link} href="#" className="hover:text-white">{link}</a>)}</nav>
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center gap-1.5 self-start hover:text-white sm:self-auto"><ArrowUp aria-hidden className="size-4" />Back to top</button>
      </div>
    </footer>
  );
}
