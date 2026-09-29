/**
 * @registry
 * name: OKR Board
 * category: Boards
 * style: Minimal
 * tags: recent
 * description: Objectifs trimestriels avec resultats cles, progression, statut de confiance et responsable.
 * prompt: Create an OKR board: objective cards each with owner avatar, overall progress ring, and key results listed with current/target values, mini progress bars and a confidence status pill (On track green, At risk amber, Off track rose). Two columns from md. Light and dark mode.
 */
const objectives = [
  { title: 'Make onboarding delightful', owner: 'LM', results: [['Activation rate', 38, 45, '%', false], ['Time to first value', 6, 5, 'min', true]] },
  { title: 'Grow self-serve revenue', owner: 'NK', results: [['New MRR', 18, 30, 'k$', false], ['Trial conversion', 11, 15, '%', false]] },
] as const;

function status(ratio: number) {
  if (ratio >= 0.8) return ['On track', 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'];
  if (ratio >= 0.6) return ['At risk', 'bg-amber-500/10 text-amber-700 dark:text-amber-400'];
  return ['Off track', 'bg-rose-500/10 text-rose-700 dark:text-rose-400'];
}

export function OkrBoard() {
  return (
    <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
      {objectives.map((objective) => {
        const ratios = objective.results.map(([, current, target, , lowerIsBetter]) => Math.min(1, lowerIsBetter ? target / current : current / target));
        const overall = ratios.reduce((sum, ratio) => sum + ratio, 0) / ratios.length;
        const circumference = 2 * Math.PI * 16;
        return (
          <article key={objective.title} className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-start gap-3">
              <div className="flex-1"><p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Objective</p><h3 className="font-semibold text-zinc-900 dark:text-white">{objective.title}</h3></div>
              <svg viewBox="0 0 40 40" className="size-12 -rotate-90" role="img" aria-label={`${Math.round(overall * 100)}% complete`}>
                <circle cx="20" cy="20" r="16" fill="none" strokeWidth="4" className="stroke-zinc-100 dark:stroke-zinc-800" />
                <circle cx="20" cy="20" r="16" fill="none" strokeWidth="4" strokeLinecap="round" stroke="#14b8a6" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - overall)} />
              </svg>
            </div>
            <ul className="mt-4 space-y-3">
              {objective.results.map(([label, current, target, unit], index) => {
                const [text, tone] = status(ratios[index]);
                return (
                  <li key={label}>
                    <div className="flex items-center justify-between gap-2 text-sm"><span className="text-zinc-700 dark:text-zinc-300">{label}</span><span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${tone}`}>{text}</span></div>
                    <div className="mt-1 flex items-center gap-2"><div className="h-1.5 flex-1 rounded-full bg-zinc-100 dark:bg-zinc-800"><div className="h-full rounded-full bg-teal-500" style={{ width: `${ratios[index] * 100}%` }} /></div><span className="text-xs tabular-nums text-zinc-500">{current}/{target}{unit}</span></div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400"><span className="grid size-6 place-items-center rounded-full bg-zinc-200 text-[10px] font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">{objective.owner}</span>Owner</p>
          </article>
        );
      })}
    </div>
  );
}
