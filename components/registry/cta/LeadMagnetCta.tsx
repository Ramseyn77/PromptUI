/**
 * @registry
 * name: Lead Magnet CTA
 * category: CTA
 * style: Editorial
 * tags: recent
 * description: Offre de guide gratuit : couverture de livre 3D inclinée, sommaire des chapitres, formulaire prénom + e-mail et confirmation de téléchargement.
 * prompt: Create an editorial lead magnet CTA: a 3D-tilted ebook cover built in CSS (spine shadow, title "The Pricing Playbook", 64 pages) that straightens on hover; next to it a serif headline, a numbered list of 4 chapter highlights, a form with first name and work email (validation, aria-invalid), a consent checkbox, and "Send me the guide" which shows a success panel "Check your inbox, Awa" with a download link (aria-live); stacks on mobile. Light (paper) and dark mode.
 */
'use client';
import { Download } from 'lucide-react';
import { useId, useState, type FormEvent } from 'react';

const chapters = ['Why most SaaS pricing pages fail', 'Choosing your value metric', 'Anchoring with three tiers', 'Running price tests safely'];

export function LeadMagnetCta() {
  const uid = useId();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tried, setTried] = useState(false);
  const [done, setDone] = useState(false);
  const emailOk = /^\S+@\S+\.\S+$/.test(email);

  function submit(event: FormEvent) {
    event.preventDefault();
    setTried(true);
    if (name.trim() && emailOk) setDone(true);
  }

  const field = (bad: boolean) => `mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-900/15 dark:bg-zinc-900 dark:text-zinc-100 ${bad ? 'border-rose-500' : 'border-zinc-900/15 dark:border-white/15'}`;

  return (
    <section className="grid w-full max-w-4xl items-center gap-10 rounded-3xl bg-[#f4efe6] p-8 md:grid-cols-[auto_1fr] dark:bg-zinc-950">
      <div className="mx-auto [perspective:900px]">
        <div className="group relative h-64 w-48 transition-transform duration-500 [transform:rotateY(-24deg)] hover:[transform:rotateY(0deg)] motion-reduce:transition-none">
          <div className="absolute inset-0 rounded-r-lg rounded-l-sm bg-gradient-to-br from-emerald-800 to-emerald-950 p-5 text-white shadow-[12px_16px_30px_rgba(0,0,0,0.35)]">
            <span aria-hidden className="absolute inset-y-0 left-0 w-3 bg-black/25" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-200">Free guide</p>
            <p className="mt-3 font-serif text-2xl leading-tight">The Pricing Playbook</p>
            <p className="absolute bottom-5 left-5 text-xs text-emerald-200">64 pages · 2026 edition</p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-serif text-3xl text-zinc-950 dark:text-white">Price like you mean it</h3>
        <ol className="mt-4 space-y-2">{chapters.map((chapter, index) => <li key={chapter} className="flex gap-3 text-sm text-zinc-700 dark:text-zinc-300"><span className="font-serif text-lg leading-none text-emerald-700 dark:text-emerald-400">{String(index + 1).padStart(2, '0')}</span>{chapter}</li>)}</ol>
        <div aria-live="polite" className="mt-6">
          {done ? (
            <div className="rounded-2xl bg-emerald-700 p-5 text-white"><p className="font-semibold">Check your inbox, {name.trim()}.</p><p className="mt-1 text-sm text-emerald-100">We also made it available right here:</p><a href="#" className="mt-3 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-emerald-800"><Download aria-hidden className="size-4" />Download PDF</a></div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <label htmlFor={`${uid}-name`} className="text-xs font-medium text-zinc-700 dark:text-zinc-300">First name<input id={`${uid}-name`} value={name} aria-invalid={tried && !name.trim()} onChange={(event) => setName(event.target.value)} autoComplete="given-name" className={field(tried && !name.trim())} /></label>
                <label htmlFor={`${uid}-email`} className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Work email<input id={`${uid}-email`} type="email" value={email} aria-invalid={tried && !emailOk} onChange={(event) => setEmail(event.target.value)} autoComplete="email" className={field(tried && !emailOk)} /></label>
              </div>
              <label className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400"><input type="checkbox" className="mt-0.5 accent-emerald-700" />Send me the monthly pricing teardown (optional)</label>
              <button type="submit" className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Send me the guide</button>
              {tried && (!name.trim() || !emailOk) && <p className="text-xs text-rose-600 dark:text-rose-400">Please add your first name and a valid email.</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
