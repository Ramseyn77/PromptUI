/**
 * @registry
 * name: Event Countdown Footer
 * category: Footer
 * style: Dark
 * tags: recent
 * description: Footer de conférence : compte à rebours jusqu'à l'événement, lieu, sponsors en texte, billets restants et liens du programme.
 * prompt: Create a dark conference site footer: a big countdown to the event (days, hours, minutes) that ticks after mount from a fixed starting value, the venue and date, a "Get tickets" button with "38 early-bird tickets left", a row of sponsor wordmarks in neutral text styles grouped by tier (Gold, Silver), link columns (Program, Speakers, Venue, Code of conduct) and a bottom bar with the hashtag and social text links; stacks on mobile. Dark in both themes.
 */
'use client';
import { useEffect, useState } from 'react';

const sponsors = { Gold: ['NOVA', 'kora', 'Atelier'], Silver: ['Lumen', 'shamba', 'Vela', 'Orbit'] };

export function EventCountdownFooter() {
  const [left, setLeft] = useState(23 * 86400 + 6 * 3600 + 41 * 60);

  useEffect(() => {
    const timer = window.setInterval(() => setLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const parts = [['days', Math.floor(left / 86400)], ['hours', Math.floor((left % 86400) / 3600)], ['minutes', Math.floor((left % 3600) / 60)]] as const;

  return (
    <footer className="w-full bg-zinc-950 px-6 py-12 text-zinc-400">
      <div className="mx-auto max-w-5xl">
        <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-fuchsia-400">DesignConf Dakar · Nov 6–7</p>
            <div aria-hidden className="mt-4 flex gap-4">{parts.map(([label, value]) => <div key={label}><p className="font-mono text-5xl font-bold tabular-nums text-white sm:text-6xl">{String(value).padStart(2, '0')}</p><p className="text-xs uppercase tracking-wider">{label}</p></div>)}</div>
            <p className="sr-only">The conference starts on November 6.</p>
            <p className="mt-4 text-sm">Musée des Civilisations noires · Dakar</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10"><p className="text-white">Early-bird tickets</p><p className="mt-1 text-sm"><span className="font-semibold text-fuchsia-300">38 left</span> at €149</p><a href="#" className="mt-4 block rounded-xl bg-fuchsia-500 py-2.5 text-center text-sm font-semibold text-white hover:bg-fuchsia-400">Get tickets</a></div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6">{Object.entries(sponsors).map(([tier, names]) => <div key={tier} className="mb-3 flex flex-wrap items-center gap-x-6 gap-y-2"><span className="w-14 text-[11px] uppercase tracking-wider text-zinc-500">{tier}</span>{names.map((name, index) => <span key={name} className={`text-zinc-300 ${tier === 'Gold' ? 'text-xl' : 'text-sm'} ${['font-black tracking-widest', 'font-serif italic', 'font-semibold', 'font-mono'][index % 4]}`}>{name}</span>)}</div>)}</div>
        <div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-4">{[['Program', ['Schedule', 'Workshops', 'Afterparty']], ['Speakers', ['Lineup', 'Call for talks', 'Speaker guide']], ['Venue', ['Getting there', 'Hotels', 'Accessibility']], ['About', ['Code of conduct', 'Volunteer', 'Contact']]].map(([title, links]) => <nav key={title as string} aria-label={title as string}><p className="text-sm font-semibold text-white">{title as string}</p><ul className="mt-3 space-y-2 text-sm">{(links as string[]).map((link) => <li key={link}><a href="#" className="hover:text-white">{link}</a></li>)}</ul></nav>)}</div>
        <div className="mt-10 flex flex-wrap justify-between gap-3 border-t border-white/10 pt-5 text-xs"><span className="font-mono text-fuchsia-300">#DesignConfDKR</span><span className="flex gap-4">{['Instagram', 'LinkedIn', 'YouTube'].map((link) => <a key={link} href="#" className="hover:text-white">{link}</a>)}</span></div>
      </div>
    </footer>
  );
}
