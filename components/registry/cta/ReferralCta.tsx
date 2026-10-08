/**
 * @registry
 * name: Referral CTA
 * category: CTA
 * style: Gradient
 * tags: featured, recent
 * description: Bloc de parrainage avec lien personnel à copier, récompense, compteur d'amis invités et paliers.
 * prompt: Create a referral CTA: gradient card with "Give $20, get $20" headline, a personal link field with Copy button (copied state), progress toward the next reward tier (3/5 friends) with tier markers, and share buttons (Email, X, WhatsApp as generic icons with text). Responsive stacking. Light and dark mode.
 */
'use client';
import { Check, Copy, Gift, Mail, MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';

export function ReferralCta() {
  const [copied, setCopied] = useState(false);
  const invited = 3;

  async function copy() {
    try { await navigator.clipboard.writeText('https://acme.app/r/ama-24'); } catch {}
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <section className="w-full max-w-xl overflow-hidden rounded-3xl bg-gradient-to-br from-fuchsia-500 via-violet-500 to-indigo-600 p-6 text-white sm:p-8">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold"><Gift aria-hidden className="size-3.5" />Referral program</span>
      <h2 className="mt-4 text-3xl font-bold tracking-tight">Give $20, get $20.</h2>
      <p className="mt-1 text-white/80">Invite a friend. When they upgrade, you both get credit.</p>
      <div className="mt-5 flex gap-2 rounded-2xl bg-white/15 p-1.5 backdrop-blur">
        <input readOnly aria-label="Your referral link" value="acme.app/r/ama-24" className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none" />
        <button type="button" onClick={copy} className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-violet-700">{copied ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}{copied ? 'Copied' : 'Copy link'}</button>
      </div>
      <div className="mt-6">
        <div className="flex justify-between text-xs text-white/80"><span>{invited} of 5 friends joined</span><span>Next: 1 month free</span></div>
        <div className="relative mt-2 h-2 rounded-full bg-white/20">
          <div className="h-full rounded-full bg-white" style={{ width: `${(invited / 5) * 100}%` }} />
          {[1, 2, 3, 4, 5].map((tier) => <span key={tier} aria-hidden className={`absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white ${tier <= invited ? 'bg-white' : 'bg-violet-500'}`} style={{ left: `${(tier / 5) * 100}%` }} />)}
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {([[Mail, 'Email'], [Send, 'Post'], [MessageCircle, 'WhatsApp']] as const).map(([Icon, label]) => <button key={label} type="button" className="inline-flex items-center gap-1.5 rounded-xl border border-white/30 px-3 py-2 text-sm font-medium hover:bg-white/10"><Icon aria-hidden className="size-4" />{label}</button>)}
      </div>
    </section>
  );
}
