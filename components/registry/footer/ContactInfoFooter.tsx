/**
 * @registry
 * name: Contact Info Footer
 * category: Footer
 * style: Minimal
 * tags: recent
 * description: Pied de page commerce local avec adresse, horaires d ouverture, telephone et carte stylisee.
 * prompt: Create a local-business footer: contact block using <address> (street, phone link, email link) with icons, opening hours as a <dl> with today highlighted, and a decorative map tile (CSS grid streets + pin, aria-hidden). 1 column mobile, 3 columns md. Light and dark mode.
 */
import { Clock, MapPin, Phone } from 'lucide-react';

const hours = [['Mon – Fri', '8:00 – 19:00'], ['Saturday', '9:00 – 17:00'], ['Sunday', 'Closed']];

export function ContactInfoFooter() {
  return (
    <footer className="grid w-full max-w-4xl gap-6 rounded-3xl border border-zinc-200 bg-white p-6 md:grid-cols-3 dark:border-zinc-800 dark:bg-zinc-950">
      <address className="space-y-3 text-sm not-italic text-zinc-700 dark:text-zinc-300">
        <p className="text-base font-semibold text-zinc-900 dark:text-white">Café Lumière</p>
        <p className="flex gap-2"><MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-teal-600" />12 rue des Lilas<br />75011 Paris</p>
        <p className="flex gap-2"><Phone aria-hidden className="size-4 text-teal-600" /><a href="tel:+33142000000" className="hover:underline">+33 1 42 00 00 00</a></p>
      </address>
      <div className="text-sm">
        <p className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-white"><Clock aria-hidden className="size-4 text-teal-600" />Opening hours</p>
        <dl className="mt-3 space-y-1.5">
          {hours.map(([day, time], index) => (
            <div key={day} className={`flex justify-between rounded-lg px-2 py-1 ${index === 0 ? 'bg-teal-500/10 font-medium text-teal-800 dark:text-teal-300' : 'text-zinc-600 dark:text-zinc-400'}`}><dt>{day}</dt><dd>{time}</dd></div>
          ))}
        </dl>
      </div>
      <div aria-hidden className="relative h-40 overflow-hidden rounded-2xl bg-[#e8efe9] bg-[linear-gradient(90deg,#fff_2px,transparent_2px),linear-gradient(0deg,#fff_2px,transparent_2px)] bg-[size:40px_32px] dark:bg-zinc-800 dark:bg-[linear-gradient(90deg,#3f3f46_2px,transparent_2px),linear-gradient(0deg,#3f3f46_2px,transparent_2px)]">
        <span className="absolute left-1/2 top-1/2 grid size-9 -translate-x-1/2 -translate-y-full place-items-center rounded-full rounded-bl-none bg-rose-500 text-white shadow-lg [rotate:-45deg]"><span className="size-3 rounded-full bg-white" /></span>
      </div>
    </footer>
  );
}
