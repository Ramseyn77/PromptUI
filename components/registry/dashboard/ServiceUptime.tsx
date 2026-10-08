/**
 * @registry
 * name: Service Uptime
 * category: Dashboard
 * style: Dark
 * tags: featured, recent
 * description: Page de statut avec barres de disponibilité sur 45 jours par service et incidents colorés.
 * prompt: Create a status widget: overall "All systems operational" banner, then per service a row of 45 thin day bars (green ok, amber degraded, rose outage) with title tooltips, uptime %, and "45 days ago / Today" axis. Light and dark mode.
 */
const services = [
  { name: 'API', uptime: '99.98%', incidents: { 12: 'degraded' } },
  { name: 'Dashboard', uptime: '100%', incidents: {} },
  { name: 'Webhooks', uptime: '99.71%', incidents: { 30: 'outage', 31: 'degraded' } },
] as const;

export function ServiceUptime() {
  const tone = { ok: 'bg-emerald-500', degraded: 'bg-amber-400', outage: 'bg-rose-500' };
  return (
    <section className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-700 dark:text-emerald-400"><span className="size-2 rounded-full bg-emerald-500" /> All systems operational</p>
      <ul className="mt-5 space-y-5">
        {services.map((service) => (
          <li key={service.name}>
            <div className="flex justify-between text-sm"><span className="font-medium text-zinc-900 dark:text-white">{service.name}</span><span className="text-zinc-500 dark:text-zinc-400">{service.uptime} uptime</span></div>
            <div className="mt-2 flex gap-[2px]">
              {Array.from({ length: 45 }, (_, day) => {
                const state = (service.incidents as Record<number, 'degraded' | 'outage'>)[day] ?? 'ok';
                return <span key={day} title={`Day ${45 - day}: ${state}`} className={`h-7 flex-1 rounded-sm ${tone[state]} opacity-90 transition hover:opacity-100 hover:scale-y-110`} />;
              })}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-2 flex justify-between text-[11px] text-zinc-400"><span>45 days ago</span><span>Today</span></div>
    </section>
  );
}
