/**
 * @registry
 * name: Gift Subscription Card
 * category: Pricing
 * style: Gradient
 * tags: recent
 * description: Offrir un abonnement : durée (1, 6 ou 12 mois), carte cadeau personnalisée en aperçu, destinataire, message et date d'envoi.
 * prompt: Create a gift subscription card: a live gift card preview (gradient card with the recipient's name, the chosen duration and a short message, with a ribbon); a duration radiogroup (1 month $8, 6 months $42, 12 months $72 "best value"); recipient name and email; a message textarea limited to 120 characters with a counter; a delivery date select (Today, Tomorrow, Christmas Eve); the CTA shows the price and validates the email. Light and dark mode.
 */
'use client';
import { Gift } from 'lucide-react';
import { useId, useState } from 'react';

const durations = [['1 month', 8], ['6 months', 42], ['12 months', 72]] as const;

export function GiftSubscriptionCard() {
  const uid = useId();
  const [duration, setDuration] = useState(2);
  const [name, setName] = useState('Mariama');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('Happy birthday! Enjoy a year of great reads.');
  const [tried, setTried] = useState(false);
  const emailOk = /^\S+@\S+\.\S+$/.test(email);
  const input = 'mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-rose-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100';

  return (
    <div className="grid w-full max-w-3xl gap-6 rounded-3xl border border-zinc-200 bg-white p-6 md:grid-cols-2 dark:border-zinc-800 dark:bg-zinc-950">
      <div aria-hidden className="relative aspect-[1.6] overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500 via-fuchsia-500 to-amber-400 p-5 text-white shadow-xl">
        <span className="absolute inset-y-0 left-1/3 w-5 bg-white/25" />
        <span className="absolute inset-x-0 top-1/2 h-5 bg-white/25" />
        <Gift className="relative size-7" />
        <p className="relative mt-3 text-xs uppercase tracking-widest text-white/80">A gift for</p>
        <p className="relative text-2xl font-bold">{name || 'Someone special'}</p>
        <p className="relative mt-1 line-clamp-2 text-sm text-white/90">{message || 'Your message here'}</p>
        <p className="absolute bottom-4 right-5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">{durations[duration][0]} of Readwise</p>
      </div>
      <form onSubmit={(event) => { event.preventDefault(); setTried(true); }} noValidate className="space-y-3">
        <fieldset><legend className="text-sm font-semibold text-zinc-950 dark:text-white">Duration</legend>
          <div className="mt-2 grid grid-cols-3 gap-2">{durations.map(([label, price], index) => <label key={label} className={`relative cursor-pointer rounded-xl border p-2.5 text-center has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-rose-500 ${duration === index ? 'border-rose-500 bg-rose-50 dark:bg-rose-500/10' : 'border-zinc-200 dark:border-zinc-800'}`}><input type="radio" name={`${uid}-duration`} checked={duration === index} onChange={() => setDuration(index)} className="sr-only" /><span className="block text-xs text-zinc-600 dark:text-zinc-400">{label}</span><span className="block font-bold text-zinc-950 dark:text-white">${price}</span>{index === 2 && <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-rose-500 px-1.5 text-[9px] font-semibold text-white">Best value</span>}</label>)}</div>
        </fieldset>
        <div className="grid grid-cols-2 gap-2">
          <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Recipient<input value={name} onChange={(event) => setName(event.target.value)} className={input} /></label>
          <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Email<input type="email" value={email} aria-invalid={tried && !emailOk} aria-describedby={`${uid}-email-error`} onChange={(event) => setEmail(event.target.value)} className={`${input} ${tried && !emailOk ? '!border-rose-500' : ''}`} /></label>
        </div>
        <p id={`${uid}-email-error`} className="-mt-1 h-3 text-[11px] text-rose-600 dark:text-rose-400">{tried && !emailOk ? 'Enter the recipient’s email.' : ''}</p>
        <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">Message<textarea rows={2} maxLength={120} value={message} onChange={(event) => setMessage(event.target.value)} className={`${input} resize-none`} /><span className="block text-right text-[10px] tabular-nums text-zinc-400">{message.length}/120</span></label>
        <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">Deliver<select className={input}><option>Today</option><option>Tomorrow</option><option>Christmas Eve</option></select></label>
        <button type="submit" className="w-full rounded-xl bg-zinc-950 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Send gift · ${durations[duration][1]}</button>
        <p aria-live="polite" className="text-center text-xs text-emerald-600 dark:text-emerald-400">{tried && emailOk ? `Gift scheduled for ${name || 'your friend'} 🎁` : ''}</p>
      </form>
    </div>
  );
}
