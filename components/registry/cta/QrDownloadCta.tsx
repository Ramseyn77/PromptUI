/**
 * @registry
 * name: QR Download CTA
 * category: CTA
 * style: Dark
 * tags: recent
 * description: Appel à télécharger l'app : QR code décoratif déterministe à scanner sur ordinateur, envoi du lien par SMS en alternative et note des stores.
 * prompt: Create a dark "Get the app" CTA: left a headline, three benefit bullets and a "Text me the link" form (country code select + phone input, validation, aria-live success "Link sent"); right a QR code card built from a deterministic 21×21 module grid with the three finder squares, a small center logo and the caption "Scan with your phone camera"; on mobile the QR card is hidden and replaced by two store buttons. Dark in both themes.
 */
'use client';
import { Check } from 'lucide-react';
import { useId, useState, type FormEvent } from 'react';

const size = 21;
const finder = (x: number, y: number) => [[0, 0], [14, 0], [0, 14]].some(([fx, fy]) => x >= fx && x < fx + 7 && y >= fy && y < fy + 7);
const finderOn = (x: number, y: number) => { const lx = x % 7 === x ? x : x >= 14 ? x - 14 : x; const ly = y >= 14 ? y - 14 : y; return lx === 0 || lx === 6 || ly === 0 || ly === 6 || (lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4); };
const modules = Array.from({ length: size * size }, (_, index) => { const x = index % size; const y = Math.floor(index / size); if (finder(x, y)) return finderOn(x, y); if (x >= 8 && x <= 12 && y >= 8 && y <= 12) return false; return (x * 7 + y * 13 + x * y) % 3 === 0; });

export function QrDownloadCta() {
  const uid = useId();
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'sent'>('idle');

  function submit(event: FormEvent) {
    event.preventDefault();
    setStatus(phone.replace(/\D/g, '').length >= 8 ? 'sent' : 'error');
  }

  return (
    <section className="grid w-full max-w-3xl items-center gap-8 rounded-3xl bg-zinc-950 p-8 text-white ring-1 ring-white/10 md:grid-cols-[1fr_auto]">
      <div>
        <h3 className="text-3xl font-semibold tracking-tight">Take your budget everywhere</h3>
        <ul className="mt-4 space-y-2 text-sm text-zinc-300">{['Offline mode for spotty connections', 'Instant alerts when bills are due', 'Face ID lock'].map((item) => <li key={item} className="flex items-center gap-2"><Check aria-hidden className="size-4 text-emerald-400" />{item}</li>)}</ul>
        <form onSubmit={submit} noValidate className="mt-6">
          <label htmlFor={`${uid}-phone`} className="text-sm font-medium">Text me the link</label>
          <div className="mt-2 flex gap-2">
            <select aria-label="Country code" className="rounded-lg bg-white/5 px-2 text-sm ring-1 ring-white/10"><option className="bg-zinc-900">+221</option><option className="bg-zinc-900">+234</option><option className="bg-zinc-900">+33</option><option className="bg-zinc-900">+1</option></select>
            <input id={`${uid}-phone`} type="tel" autoComplete="tel-national" value={phone} aria-invalid={status === 'error'} onChange={(event) => { setPhone(event.target.value); setStatus('idle'); }} placeholder="77 123 45 67" className="min-w-0 flex-1 rounded-lg bg-white/5 px-3 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-emerald-400" />
            <button type="submit" className="rounded-lg bg-emerald-400 px-4 text-sm font-semibold text-zinc-950 hover:bg-emerald-300">Send</button>
          </div>
          <p aria-live="polite" className={`mt-1.5 h-4 text-xs ${status === 'error' ? 'text-rose-400' : 'text-emerald-300'}`}>{status === 'error' ? 'Enter a valid phone number.' : status === 'sent' ? 'Link sent — check your messages.' : ''}</p>
        </form>
        <div className="mt-4 flex gap-2 md:hidden">{['App Store', 'Google Play'].map((store) => <a key={store} href="#" className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950">{store}</a>)}</div>
      </div>
      <figure className="hidden rounded-3xl bg-white p-5 text-center md:block">
        <div className="relative grid size-44 gap-px" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }} role="img" aria-label="QR code to download the app">
          {modules.map((on, index) => <span key={index} className={on ? 'bg-zinc-950' : 'bg-white'} />)}
          <span className="absolute left-1/2 top-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-lg bg-emerald-500 text-sm font-black text-zinc-950">₿</span>
        </div>
        <figcaption className="mt-3 text-xs text-zinc-500">Scan with your phone camera</figcaption>
      </figure>
    </section>
  );
}
