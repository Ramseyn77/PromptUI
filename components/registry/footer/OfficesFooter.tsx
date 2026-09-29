/**
 * @registry
 * name: Offices Footer
 * category: Footer
 * style: Dark
 * tags: recent
 * description: Pied de page d agence internationale avec bureaux, heures locales et contacts.
 * prompt: Create an agency footer listing offices (Paris, Abidjan, Montréal) with city, address, and each office's live local time (Intl.DateTimeFormat with timeZone, rendered after mount to avoid hydration mismatch, updating every minute), plus contact email and copyright. Always dark; responsive grid.
 */
'use client';
import { useEffect, useState } from 'react';

const offices = [
  { city: 'Paris', address: '18 rue Oberkampf', zone: 'Europe/Paris' },
  { city: 'Abidjan', address: 'Boulevard Latrille, Cocody', zone: 'Africa/Abidjan' },
  { city: 'Montréal', address: '400 rue Saint-Paul O.', zone: 'America/Toronto' },
];

export function OfficesFooter() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <footer className="w-full max-w-4xl rounded-3xl bg-zinc-950 p-8 text-zinc-300">
      <p className="text-2xl font-semibold text-white">Let&apos;s build something.</p>
      <a href="mailto:studio@north.agency" className="mt-1 inline-block text-teal-300 hover:underline">studio@north.agency</a>
      <ul className="mt-8 grid gap-6 sm:grid-cols-3">
        {offices.map((office) => (
          <li key={office.city} className="border-t border-white/10 pt-4">
            <p className="font-semibold text-white">{office.city}</p>
            <p className="mt-1 text-sm text-zinc-400">{office.address}</p>
            <p className="mt-3 font-mono text-sm text-teal-300">{now ? new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: office.zone }).format(now) : '--:--'} <span className="text-zinc-500">local</span></p>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-xs text-zinc-500">© 2026 North Agency</p>
    </footer>
  );
}
