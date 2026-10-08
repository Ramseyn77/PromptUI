/**
 * @registry
 * name: Savings Calculator Card
 * category: Pricing
 * style: Gradient
 * tags: featured, recent
 * description: Calculateur d'économies : outils actuels cochés avec leur coût, comparaison avec notre offre et économie annuelle animée.
 * prompt: Create a "how much will you save" pricing card: a checklist of tools the user currently pays for (each with a monthly price, team size multiplier input), the total current spend vs our all-in-one plan price, a bar comparison and a big yearly savings figure that animates when it changes; CTA "Start saving". Light and dark mode.
 */
'use client';
import { useState } from 'react';

const tools = [['Docs tool', 8], ['Whiteboard', 10], ['Project tracker', 12], ['Forms', 6], ['Scheduling', 9]] as const;

export function SavingsCalculatorCard() {
  const [on, setOn] = useState<string[]>(['Docs tool', 'Whiteboard', 'Project tracker']);
  const [seats, setSeats] = useState(8);
  const current = tools.filter(([name]) => on.includes(name)).reduce((sum, [, price]) => sum + price, 0) * seats;
  const ours = 15 * seats;
  const yearly = Math.max(0, (current - ours) * 12);

  return (
    <section className="w-full max-w-sm overflow-hidden rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="p-5">
        <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">What do you pay for today?</h3>
        <ul className="mt-3 space-y-1.5">{tools.map(([name, price]) => <li key={name}><label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300"><input type="checkbox" checked={on.includes(name)} onChange={() => setOn((list) => (list.includes(name) ? list.filter((item) => item !== name) : [...list, name]))} className="accent-violet-600" /><span className="flex-1">{name}</span><span className="tabular-nums text-zinc-400">${price}/seat</span></label></li>)}</ul>
        <label className="mt-3 flex items-center justify-between text-sm text-zinc-700 dark:text-zinc-300">Team size<input type="number" min={1} max={500} value={seats} onChange={(event) => setSeats(Math.max(1, Number(event.target.value) || 1))} className="w-20 rounded-lg border border-zinc-300 bg-transparent px-2 py-1 text-right tabular-nums dark:border-zinc-700" /></label>
        <div className="mt-4 space-y-2 text-xs">
          <div><div className="flex justify-between text-zinc-500"><span>Today</span><span className="tabular-nums">${current}/mo</span></div><div className="mt-1 h-2 rounded-full bg-rose-400" style={{ width: '100%' }} /></div>
          <div><div className="flex justify-between text-zinc-500"><span>With us</span><span className="tabular-nums">${ours}/mo</span></div><div className="mt-1 h-2 rounded-full bg-emerald-500 transition-all duration-500" style={{ width: `${current ? Math.min(100, (ours / current) * 100) : 100}%` }} /></div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-violet-600 to-fuchsia-500 p-5 text-white">
        <p className="text-xs uppercase tracking-wider text-white/80">You save</p>
        <p key={yearly} aria-live="polite" className="text-4xl font-bold tabular-nums motion-safe:animate-[pui-save-pop_.3s_ease-out]">${yearly.toLocaleString('en-US')}<span className="text-base font-normal text-white/80">/year</span></p>
        <button type="button" className="mt-3 w-full rounded-xl bg-white py-2.5 text-sm font-semibold text-violet-700">Start saving</button>
      </div>
      <style>{`@keyframes pui-save-pop{from{transform:translateY(4px);opacity:.5}}`}</style>
    </section>
  );
}
