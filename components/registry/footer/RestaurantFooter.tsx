/**
 * @registry
 * name: Restaurant Footer
 * category: Footer
 * style: Editorial
 * tags: recent
 * description: Footer de restaurant : horaires de la semaine avec le jour courant mis en avant, adresse, réservation rapide et réseaux.
 * prompt: Create a restaurant footer in an editorial style: serif logo and tagline; an opening hours list Monday–Sunday where today's row (computed after mount to avoid hydration mismatch) is highlighted with an "Open now"/"Closed" pill; address with a "Get directions" link and phone; a quick reservation form (date select, party size stepper 1–8, time select) with a "Book a table" button and aria-live confirmation; text social links; stacks on mobile. Light (warm paper) and dark mode.
 */
'use client';
import { Minus, Plus } from 'lucide-react';
import { useEffect, useId, useState } from 'react';

const hours = [['Monday', 'Closed'], ['Tuesday', '18:00 – 23:00'], ['Wednesday', '18:00 – 23:00'], ['Thursday', '18:00 – 23:00'], ['Friday', '12:00 – 15:00 · 18:00 – 00:00'], ['Saturday', '12:00 – 00:00'], ['Sunday', '12:00 – 17:00']];

export function RestaurantFooter() {
  const uid = useId();
  const [today, setToday] = useState<number | null>(null);
  const [party, setParty] = useState(2);
  const [booked, setBooked] = useState(false);

  useEffect(() => { setToday((new Date().getDay() + 6) % 7); }, []);

  return (
    <footer className="w-full bg-[#f3ebdd] px-6 py-12 text-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-3">
        <div>
          <p className="font-serif text-3xl italic text-zinc-950 dark:text-white">Maison Teranga</p>
          <p className="mt-2 text-sm">West African cooking, seasonal and slow.</p>
          <address className="mt-5 text-sm not-italic leading-relaxed">14 Rue des Martyrs<br />75009 Paris<br /><a href="#" className="underline underline-offset-4">Get directions</a> · <a href="#" className="underline underline-offset-4">+33 1 42 00 00 00</a></address>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Opening hours</h2>
          <ul className="mt-3 space-y-1 text-sm">
            {hours.map(([day, time], index) => <li key={day} aria-current={today === index ? 'date' : undefined} className={`flex justify-between gap-3 rounded-md px-2 py-1 ${today === index ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950' : ''}`}><span>{day}</span><span className="text-right tabular-nums">{time}{today === index && <span className="ml-2 rounded-full bg-amber-400 px-1.5 text-[10px] font-semibold text-zinc-950">{time === 'Closed' ? 'Closed' : 'Today'}</span>}</span></li>)}
          </ul>
        </div>
        <form onSubmit={(event) => { event.preventDefault(); setBooked(true); }} className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Book a table</h2>
          <div className="grid grid-cols-2 gap-2">
            <label htmlFor={`${uid}-date`} className="text-xs">Date<select id={`${uid}-date`} className="mt-1 w-full rounded-lg border border-zinc-900/15 bg-white/70 px-2 py-2 text-sm dark:border-white/15 dark:bg-zinc-900"><option>Tonight</option><option>Tomorrow</option><option>This Saturday</option></select></label>
            <label htmlFor={`${uid}-time`} className="text-xs">Time<select id={`${uid}-time`} className="mt-1 w-full rounded-lg border border-zinc-900/15 bg-white/70 px-2 py-2 text-sm dark:border-white/15 dark:bg-zinc-900"><option>19:00</option><option>19:30</option><option>20:30</option><option>21:00</option></select></label>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-zinc-900/15 bg-white/70 px-3 py-1.5 text-sm dark:border-white/15 dark:bg-zinc-900"><span>Guests</span><div className="flex items-center gap-2"><button type="button" aria-label="Fewer guests" disabled={party <= 1} onClick={() => setParty(party - 1)} className="grid size-7 place-items-center rounded-full hover:bg-black/5 disabled:opacity-30 dark:hover:bg-white/10"><Minus aria-hidden className="size-3.5" /></button><output aria-live="polite" className="w-4 text-center tabular-nums">{party}</output><button type="button" aria-label="More guests" disabled={party >= 8} onClick={() => setParty(party + 1)} className="grid size-7 place-items-center rounded-full hover:bg-black/5 disabled:opacity-30 dark:hover:bg-white/10"><Plus aria-hidden className="size-3.5" /></button></div></div>
          <button type="submit" className="w-full rounded-full bg-zinc-950 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">Book a table</button>
          <p aria-live="polite" className="text-xs text-emerald-700 dark:text-emerald-400">{booked ? `Request sent for ${party}. We’ll confirm by SMS.` : ''}</p>
        </form>
      </div>
      <div className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-between gap-3 border-t border-zinc-900/10 pt-5 text-xs text-zinc-500 dark:border-white/10"><span>© 2026 Maison Teranga</span><nav aria-label="Social" className="flex gap-4">{['Instagram', 'TikTok', 'Newsletter'].map((link) => <a key={link} href="#" className="hover:text-zinc-950 dark:hover:text-white">{link}</a>)}</nav></div>
    </footer>
  );
}
