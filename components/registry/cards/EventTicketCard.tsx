/**
 * @registry
 * name: Event Ticket Card
 * category: Cards
 * style: Dark
 * tags: featured, recent
 * description: Billet de concert avec talon perforé, infos de siège, code-barres et ajout au portefeuille.
 * prompt: Create an event ticket card: main part with gradient artwork, artist, venue, date/time and gate/row/seat grid; a perforated divider made with two side notches (radial cutouts) and a dashed line; a stub with a CSS-generated barcode (deterministic bar widths) and ticket number; an "Add to wallet" button. Dark ticket in both themes.
 */
const bars = Array.from({ length: 42 }, (_, index) => ((index * 7) % 5) + 1);

export function EventTicketCard() {
  return (
    <article className="w-full max-w-xs overflow-hidden rounded-3xl bg-zinc-900 text-white shadow-2xl shadow-black/30">
      <div className="h-32 bg-[radial-gradient(circle_at_30%_30%,#f472b6,transparent_50%),radial-gradient(circle_at_75%_70%,#818cf8,transparent_55%),linear-gradient(#18181b,#18181b)] p-4">
        <span className="rounded-full bg-black/40 px-2 py-0.5 text-[11px] font-semibold backdrop-blur">Live · Stade de l'Amitié</span>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold">Nova Lines — World Tour</h3>
        <p className="text-sm text-zinc-400">Sat, Nov 14 · Doors 19:00</p>
        <dl className="mt-4 grid grid-cols-3 gap-2 text-center">{[['Gate', 'B'], ['Row', '12'], ['Seat', '27']].map(([label, value]) => <div key={label} className="rounded-xl bg-white/5 py-2"><dt className="text-[10px] uppercase tracking-wider text-zinc-500">{label}</dt><dd className="text-lg font-bold">{value}</dd></div>)}</dl>
      </div>
      <div aria-hidden className="relative h-6">
        <span className="absolute -left-3 top-0 size-6 rounded-full bg-white dark:bg-zinc-950" />
        <span className="absolute -right-3 top-0 size-6 rounded-full bg-white dark:bg-zinc-950" />
        <span className="absolute inset-x-5 top-1/2 border-t-2 border-dashed border-white/15" />
      </div>
      <div className="p-5 pt-2">
        <div role="img" aria-label="Ticket barcode" className="flex h-12 items-stretch justify-center gap-[2px] rounded-lg bg-white px-3 py-2">{bars.map((width, index) => <span key={index} className="bg-zinc-950" style={{ width }} />)}</div>
        <div className="mt-3 flex items-center justify-between text-xs text-zinc-400"><span className="font-mono">TCK-7741-0927</span><button type="button" className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-zinc-950">Add to wallet</button></div>
      </div>
    </article>
  );
}
