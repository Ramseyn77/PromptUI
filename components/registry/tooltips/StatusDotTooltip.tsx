/**
 * @registry
 * name: Status Dot Tooltip
 * category: Tooltips
 * style: Dark
 * tags: recent
 * description: Pastilles de statut de services avec bulle détaillée : état, latence et dernier incident.
 * prompt: Create a row of service status chips (API, Web, Queue, DB) with colored dots (green/amber/rose, pulsing when degraded); hovering or focusing a chip shows a dark tooltip card with status label, latency and last incident time. role="tooltip" + aria-describedby; light and dark mode.
 */
const services = [
  { name: 'API', status: 'Operational', tone: 'bg-emerald-500', latency: '42 ms', incident: '12 days ago' },
  { name: 'Web', status: 'Operational', tone: 'bg-emerald-500', latency: '88 ms', incident: '3 days ago' },
  { name: 'Queue', status: 'Degraded', tone: 'bg-amber-500', latency: '640 ms', incident: 'Ongoing' },
  { name: 'DB', status: 'Outage', tone: 'bg-rose-500', latency: '—', incident: 'Started 4 min ago' },
];

export function StatusDotTooltip() {
  return (
    <>
      <style>{`@keyframes pui-dot-pulse{0%{box-shadow:0 0 0 0 currentColor}100%{box-shadow:0 0 0 6px transparent}}`}</style>
      <div className="flex flex-wrap gap-2 pt-24">
        {services.map((service) => (
          <span key={service.name} className="group relative">
            <button type="button" aria-describedby={`status-${service.name}`} className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
              <span className={`size-2 rounded-full ${service.tone} ${service.status !== 'Operational' ? 'text-current motion-safe:animate-[pui-dot-pulse_1.4s_ease-out_infinite]' : ''}`} />{service.name}
            </button>
            <span id={`status-${service.name}`} role="tooltip" className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-48 -translate-x-1/2 translate-y-1 rounded-xl bg-zinc-900 p-3 text-xs text-zinc-300 opacity-0 shadow-xl transition group-hover:translate-y-0 group-hover:opacity-100 group-has-[:focus-visible]:translate-y-0 group-has-[:focus-visible]:opacity-100 dark:bg-zinc-800">
              <span className="flex items-center gap-2 font-semibold text-white"><span className={`size-2 rounded-full ${service.tone}`} />{service.status}</span>
              <span className="mt-2 flex justify-between"><span>Latency</span><span className="font-mono text-white">{service.latency}</span></span>
              <span className="mt-1 flex justify-between"><span>Last incident</span><span className="text-white">{service.incident}</span></span>
            </span>
          </span>
        ))}
      </div>
    </>
  );
}
