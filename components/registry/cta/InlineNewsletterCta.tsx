/**
 * @registry
 * name: Inline Newsletter CTA
 * category: CTA
 * style: Gradient
 * tags: featured, recent
 * description: Bloc d inscription newsletter en degrade avec formulaire en ligne, preuve sociale et confirmation.
 * prompt: Create a newsletter CTA section: gradient panel with headline and subtitle on the left, an inline email form on the right (stacked on mobile) with a proper label, a subscriber count line, and a success state after submit. Readable in light and dark mode.
 */
'use client';
import { Check } from 'lucide-react';
import { useState, type FormEvent } from 'react';

export function InlineNewsletterCta() {
  const [done, setDone] = useState(false);
  const submit = (event: FormEvent) => { event.preventDefault(); setDone(true); };

  return (
    <section className="grid w-full max-w-4xl gap-6 rounded-3xl bg-gradient-to-br from-teal-500 to-violet-600 p-8 text-white md:grid-cols-2 md:items-center">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">New components, every Friday.</h2>
        <p className="mt-2 text-sm text-white/85">One short email with fresh blocks and the prompts behind them.</p>
      </div>
      <div>
        {done ? (
          <p role="status" className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-4 py-3 text-sm font-semibold"><Check aria-hidden className="size-4" /> You&apos;re in! Check your inbox.</p>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row">
            <label htmlFor="cta-newsletter" className="sr-only">Email address</label>
            <input id="cta-newsletter" type="email" required placeholder="you@company.com" className="h-12 min-w-0 flex-1 rounded-xl border border-white/30 bg-white/15 px-4 text-sm text-white placeholder:text-white/70 outline-none backdrop-blur focus:border-white focus:ring-4 focus:ring-white/20" />
            <button type="submit" className="h-12 rounded-xl bg-white px-5 text-sm font-semibold text-zinc-900 hover:bg-white/90">Subscribe</button>
          </form>
        )}
        <p className="mt-3 text-xs text-white/75">Join 18,400 designers and developers. No spam.</p>
      </div>
    </section>
  );
}
