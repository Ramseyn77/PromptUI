/**
 * @registry
 * name: Auction Bid Panel
 * category: Forms
 * style: Dark
 * tags: recent
 * description: Panneau d'enchere marketplace avec compte a rebours, prix actuel et offre rapide.
 * prompt: Create a dark responsive auction bidding panel with a live countdown, current bid, bidder count, quick increment buttons, numeric bid input and a place-bid confirmation state.
 */
'use client';

import { Gavel, ShieldCheck, Users } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';

export function AuctionBidPanel() {
  const [seconds, setSeconds] = useState(3725);
  const [bid, setBid] = useState(1280);
  const [placed, setPlaced] = useState(false);
  useEffect(() => { const timer = window.setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000); return () => window.clearInterval(timer); }, []);
  const submit = (event: FormEvent) => { event.preventDefault(); setPlaced(true); window.setTimeout(() => setPlaced(false), 1800); };
  const clock = `${String(Math.floor(seconds / 3600)).padStart(2, '0')}:${String(Math.floor(seconds % 3600 / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  return (
    <form onSubmit={submit} className="w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 text-white shadow-2xl">
      <div className="bg-gradient-to-r from-orange-500/20 to-fuchsia-500/20 p-5 sm:p-6"><div className="flex items-center justify-between gap-3"><span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-orange-300"><Gavel size={15} />Live auction</span><span role="timer" className="rounded-lg bg-black/30 px-2.5 py-1 font-mono text-sm tabular-nums">{clock}</span></div><p className="mt-5 text-sm text-zinc-400">Current bid</p><div className="mt-1 flex items-end justify-between gap-3"><p className="text-4xl font-bold tracking-tight">$1,240</p><p className="mb-1 flex items-center gap-1 text-xs text-zinc-400"><Users size={14} />18 bidders</p></div></div>
      <div className="p-5 sm:p-6"><label htmlFor="auction-bid" className="text-sm font-medium text-zinc-200">Your maximum bid</label><div className="mt-2 flex items-center rounded-xl border border-zinc-700 bg-zinc-900 px-3 focus-within:border-orange-400"><span className="text-zinc-500">$</span><input id="auction-bid" type="number" min={1250} step={10} value={bid} onChange={(event) => { setBid(Number(event.target.value)); setPlaced(false); }} className="min-w-0 flex-1 bg-transparent px-2 py-3 font-semibold outline-none" /></div>
        <div className="mt-3 grid grid-cols-3 gap-2">{[10, 25, 50].map((amount) => <button key={amount} type="button" onClick={() => setBid((value) => value + amount)} className="rounded-lg bg-zinc-900 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-800">+${amount}</button>)}</div>
        <button type="submit" className={`mt-4 w-full rounded-xl py-3 text-sm font-bold transition ${placed ? 'bg-emerald-500 text-emerald-950' : 'bg-orange-400 text-zinc-950 hover:bg-orange-300'}`}>{placed ? 'Bid placed successfully' : `Place bid · $${bid.toLocaleString()}`}</button>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-zinc-500"><ShieldCheck size={14} />Your bid is protected and encrypted</p>
      </div>
    </form>
  );
}
