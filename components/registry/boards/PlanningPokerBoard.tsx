/**
 * @registry
 * name: Planning Poker Board
 * category: Boards
 * style: Gradient
 * tags: recent
 * description: Table de planning poker : cartes Fibonacci à choisir, votes cachés des coéquipiers puis révélation avec moyenne.
 * prompt: Create a planning poker board: the current story title, a table area with teammate seats showing face-down cards once they've voted, your hand of Fibonacci cards (1, 2, 3, 5, 8, 13, ?) as a radiogroup that lifts the selected card; a Reveal button flips all cards (3D flip, instant with reduced motion) and shows average, min/max and a "consensus" badge when votes agree; Reset starts a new round. Light and dark mode.
 */
'use client';
import { useState } from 'react';

const deck = ['1', '2', '3', '5', '8', '13', '?'];
const team = [['Ana', '5'], ['Leo', '8'], ['Kofi', '5'], ['Mia', '5']];

export function PlanningPokerBoard() {
  const [mine, setMine] = useState<string | null>('5');
  const [revealed, setRevealed] = useState(false);
  const votes = [...team.map(([, vote]) => vote), mine].filter((vote): vote is string => !!vote && vote !== '?').map(Number);
  const average = votes.length ? (votes.reduce((sum, vote) => sum + vote, 0) / votes.length).toFixed(1) : '–';
  const consensus = new Set(votes).size === 1;

  return (
    <section className="w-full max-w-lg rounded-3xl bg-gradient-to-br from-emerald-700 to-teal-900 p-5 text-white">
      <p className="text-xs uppercase tracking-wider text-emerald-200">Story ACM-142</p>
      <h3 className="text-lg font-semibold">Export reports as PDF</h3>
      <div className="mt-4 flex flex-wrap justify-center gap-4 rounded-2xl bg-black/15 p-4 [perspective:800px]">
        {[...team, ['You', mine ?? '']].map(([name, vote]) => (
          <div key={name} className="text-center">
            <div className="relative h-16 w-11 transition-transform duration-500 [transform-style:preserve-3d] motion-reduce:transition-none" style={{ transform: revealed ? 'rotateY(180deg)' : 'none' }}>
              <span className={`absolute inset-0 grid place-items-center rounded-lg border border-white/30 [backface-visibility:hidden] ${vote ? 'bg-[repeating-linear-gradient(45deg,#ffffff22_0_4px,transparent_4px_8px)] bg-emerald-500' : 'border-dashed bg-transparent'}`} />
              <span className="absolute inset-0 grid place-items-center rounded-lg bg-white text-lg font-bold text-emerald-900 [backface-visibility:hidden] [transform:rotateY(180deg)]">{vote || '–'}</span>
            </div>
            <p className="mt-1 text-xs text-emerald-100">{name}</p>
          </div>
        ))}
      </div>
      <div aria-live="polite" className="mt-3 min-h-6 text-center text-sm">{revealed && <>Average <strong>{average}</strong> · range {Math.min(...votes)}–{Math.max(...votes)} {consensus && <span className="ml-1 rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-emerald-800">Consensus 🎉</span>}</>}</div>
      <div role="radiogroup" aria-label="Your estimate" className="mt-3 flex justify-center gap-1.5">
        {deck.map((card) => <button key={card} type="button" role="radio" aria-checked={mine === card} disabled={revealed} onClick={() => setMine(card)} className={`h-14 w-9 rounded-lg border-2 text-sm font-bold transition ${mine === card ? '-translate-y-2 border-white bg-white text-emerald-800 shadow-lg' : 'border-white/40 bg-white/10 hover:-translate-y-1'} disabled:opacity-60`}>{card}</button>)}
      </div>
      <div className="mt-4 flex justify-center gap-2">
        <button type="button" disabled={revealed || !mine} onClick={() => setRevealed(true)} className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-emerald-800 disabled:opacity-50">Reveal cards</button>
        <button type="button" onClick={() => { setRevealed(false); setMine(null); }} className="rounded-xl border border-white/40 px-4 py-2 text-sm font-semibold">New round</button>
      </div>
    </section>
  );
}
