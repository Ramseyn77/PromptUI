/**
 * @registry
 * name: Contact Sales CTA
 * category: CTA
 * style: Dark
 * tags: recent
 * description: Appel « Parler à un expert » avec avatars de l'équipe en ligne, temps de réponse et formulaire court.
 * prompt: Create a "Talk to sales" CTA on a dark gradient panel: online team avatar stack with green status dot and "Typically replies in 5 min", headline and logos-free trust line, plus a compact form (work email, team size select) with a submit button that turns into a confirmation. Two columns from md. Dark in both themes.
 */
'use client';
import { ArrowRight, Check } from 'lucide-react';
import { useState } from 'react';

export function ContactSalesCta() {
  const [sent, setSent] = useState(false);

  return (
    <section className="grid w-full max-w-3xl gap-6 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 text-white ring-1 ring-white/10 md:grid-cols-2 md:p-8">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">{['from-rose-400 to-amber-300', 'from-sky-400 to-indigo-500', 'from-emerald-400 to-teal-500'].map((tone) => <span key={tone} aria-hidden className={`size-8 rounded-full bg-gradient-to-br ring-2 ring-zinc-900 ${tone}`} />)}</div>
          <span className="flex items-center gap-1.5 text-xs text-zinc-400"><span className="size-2 rounded-full bg-emerald-400" />Typically replies in 5 min</span>
        </div>
        <h2 className="mt-5 text-3xl font-semibold tracking-tight">Talk to an expert.</h2>
        <p className="mt-2 text-sm text-zinc-400">Custom contracts, SSO, security reviews and volume pricing for teams of 50+.</p>
      </div>
      {sent ? (
        <div role="status" className="grid place-items-center rounded-2xl bg-white/5 p-6 text-center"><Check aria-hidden className="size-8 text-emerald-400" /><p className="mt-2 font-semibold">Thanks! We'll be in touch today.</p></div>
      ) : (
        <form onSubmit={(event) => { event.preventDefault(); setSent(true); }} className="grid gap-3 rounded-2xl bg-white/5 p-4">
          <label className="text-xs text-zinc-400">Work email<input type="email" required placeholder="you@company.com" className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-teal-400" /></label>
          <label className="text-xs text-zinc-400">Team size<select className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-white outline-none focus:border-teal-400"><option>50–200</option><option>200–1,000</option><option>1,000+</option></select></label>
          <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-400 py-2.5 text-sm font-semibold text-teal-950 hover:bg-teal-300">Contact sales<ArrowRight aria-hidden className="size-4" /></button>
        </form>
      )}
    </section>
  );
}
