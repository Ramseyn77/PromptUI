/**
 * @registry
 * name: Auction Bid Panel
 * category: Forms
 * style: Dark
 * tags: recent
 * description: Panneau d'enchère marketplace en direct : compte à rebours, prix qui monte avec les offres concurrentes et offre rapide.
 * prompt: Create a dark responsive auction bidding panel with a live countdown, a current bid that rises when simulated rival bids arrive (with a short highlight and a "You've been outbid" notice), bidder count, quick increment buttons, a numeric bid input that always stays above the current bid, and a place-bid confirmation that makes the user the leading bidder. Simulate activity on the client, announce bid changes through aria-live, close bidding when the timer ends and respect prefers-reduced-motion.
 */
'use client';

import { Gavel, ShieldCheck, Users } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';

const RIVAL_INTERVAL = 7000;
const rivalSteps = [10, 25, 15, 20];

export function AuctionBidPanel() {
  const [seconds, setSeconds] = useState(3725);
  const [current, setCurrent] = useState(1240);
  const [bidders, setBidders] = useState(18);
  const [leading, setLeading] = useState(false);
  const [bid, setBid] = useState(1280);
  const [placed, setPlaced] = useState(false);
  const ended = seconds === 0;

  useEffect(() => { const timer = window.setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000); return () => window.clearInterval(timer); }, []);

  // A rival outbids the current price at a steady pace while the auction is open.
  useEffect(() => {
    if (ended) return;
    let turn = 0;
    const timer = window.setInterval(() => {
      setCurrent((value) => value + rivalSteps[turn % rivalSteps.length]);
      if (turn % 2 === 1) setBidders((value) => value + 1);
      setLeading(false);
      turn += 1;
    }, RIVAL_INTERVAL);
    return () => window.clearInterval(timer);
  }, [ended]);

  // The proposed bid must always beat the current price.
  useEffect(() => { setBid((value) => Math.max(value, current + 10)); }, [current]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (ended || bid <= current) return;
    setCurrent(bid);
    setLeading(true);
    setPlaced(true);
    window.setTimeout(() => setPlaced(false), 1800);
  };
  const clock = `${String(Math.floor(seconds / 3600)).padStart(2, '0')}:${String(Math.floor(seconds % 3600 / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

  return (
    <form onSubmit={submit} className="w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 text-white shadow-2xl">
      <style>{`@keyframes pui-bid-flash{0%{color:#fdba74;transform:translateY(-4px)}}@media(prefers-reduced-motion:reduce){.pui-bid-flash{animation:none!important}}`}</style>
      <div className="bg-gradient-to-r from-orange-500/20 to-fuchsia-500/20 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3"><span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-orange-300"><span className={`size-2 rounded-full ${ended ? 'bg-zinc-500' : 'bg-red-500 motion-safe:animate-pulse'}`} aria-hidden="true" /><Gavel size={15} />{ended ? 'Auction closed' : 'Live auction'}</span><span role="timer" className="rounded-lg bg-black/30 px-2.5 py-1 font-mono text-sm tabular-nums">{clock}</span></div>
        <p className="mt-5 text-sm text-zinc-400">Current bid</p>
        <div className="mt-1 flex items-end justify-between gap-3">
          {/* The live region stays mounted; only the inner value remounts to replay the highlight. */}
          <div aria-live="polite"><p key={current} className="pui-bid-flash text-4xl font-bold tracking-tight tabular-nums motion-safe:animate-[pui-bid-flash_.6s_ease-out]">${current.toLocaleString('en-US')}</p></div>
          <p className="mb-1 flex items-center gap-1 text-xs text-zinc-400"><Users size={14} />{bidders} bidders</p>
        </div>
        <p className={`mt-2 text-xs font-medium ${leading ? 'text-emerald-300' : 'text-orange-200/80'}`}>{leading ? 'You are the highest bidder' : 'Another bidder is leading'}</p>
      </div>
      <div className="p-5 sm:p-6"><label htmlFor="auction-bid" className="text-sm font-medium text-zinc-200">Your maximum bid</label><div className="mt-2 flex items-center rounded-xl border border-zinc-700 bg-zinc-900 px-3 focus-within:border-orange-400"><span className="text-zinc-500">$</span><input id="auction-bid" type="number" min={current + 10} step={5} value={bid} disabled={ended} onChange={(event) => { setBid(Number(event.target.value)); setPlaced(false); }} className="min-w-0 flex-1 bg-transparent px-2 py-3 font-semibold outline-none disabled:opacity-50" /></div>
        <div className="mt-3 grid grid-cols-3 gap-2">{[10, 25, 50].map((amount) => <button key={amount} type="button" disabled={ended} onClick={() => setBid((value) => value + amount)} className="rounded-lg bg-zinc-900 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-800 disabled:opacity-40">+${amount}</button>)}</div>
        <button type="submit" disabled={ended || bid <= current} className={`mt-4 w-full rounded-xl py-3 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${placed ? 'bg-emerald-500 text-emerald-950' : 'bg-orange-400 text-zinc-950 hover:bg-orange-300'}`}>{ended ? 'Bidding has ended' : placed ? 'Bid placed successfully' : `Place bid · $${bid.toLocaleString('en-US')}`}</button>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-zinc-500"><ShieldCheck size={14} />Your bid is protected and encrypted</p>
      </div>
    </form>
  );
}
