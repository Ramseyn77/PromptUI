/**
 * @registry
 * name: Radial Progress Stats
 * category: Charts
 * style: Gradient
 * tags: featured, recent
 * description: Trois progressions radiales façon daisyUI (objectifs du trimestre) qui se remplissent à l'apparition.
 * prompt: Create daisyUI-style radial progress stats: three conic-gradient rings (role="progressbar" with aria-valuenow) showing quarterly goals (Revenue 78%, Retention 64%, NPS 91%) with the percentage in the center, a label and delta below; the rings animate from 0 using an @property custom property. Reduced motion shows final values. Light and dark mode.
 */
const goals = [
  { label: 'Revenue', value: 78, delta: '+6 pts', color: '#14b8a6' },
  { label: 'Retention', value: 64, delta: '−2 pts', color: '#8b5cf6' },
  { label: 'NPS goal', value: 91, delta: '+11 pts', color: '#f59e0b' },
];

export function RadialProgressStats() {
  return (
    <section className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <style>{`@property --pui-rp{syntax:'<number>';inherits:false;initial-value:0}@keyframes pui-rp-fill{from{--pui-rp:0}}.pui-rp{animation:pui-rp-fill 1.2s cubic-bezier(.22,1,.36,1)}@media (prefers-reduced-motion:reduce){.pui-rp{animation:none}}`}</style>
      <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Q4 goals</h3>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {goals.map((goal) => (
          <div key={goal.label} className="text-center">
            <div role="progressbar" aria-valuenow={goal.value} aria-valuemin={0} aria-valuemax={100} aria-label={goal.label} className="pui-rp relative mx-auto grid size-20 place-items-center rounded-full [--pui-track:#f4f4f5] dark:[--pui-track:#27272a]" style={{ ['--pui-rp' as string]: goal.value, background: `conic-gradient(${goal.color} calc(var(--pui-rp) * 1%), var(--pui-track) 0)` }}>
              <span className="grid size-[3.6rem] place-items-center rounded-full bg-white text-lg font-bold tabular-nums text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">{goal.value}%</span>
            </div>
            <p className="mt-2 text-sm font-medium text-zinc-800 dark:text-zinc-200">{goal.label}</p>
            <p className={`text-xs ${goal.delta.startsWith('+') ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>{goal.delta}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
