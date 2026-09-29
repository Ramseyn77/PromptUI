/**
 * @registry
 * name: Clock Loader
 * category: Loader
 * style: Minimal
 * tags: recent
 * description: Horloge dont les aiguilles tournent rapidement pendant l attente, avec cadran minimal.
 * prompt: Create a clock loader: circular dial with 12 tick marks, a minute hand spinning fast and an hour hand spinning slower (rotate keyframes around the center), center dot, and "Scheduling…" caption. role="status", currentColor dial for light/dark, reduced-motion safe.
 */
export function ClockLoader() {
  return (
    <>
      <style>{`@keyframes pui-hand{to{transform:rotate(360deg)}}`}</style>
      <div role="status" className="flex flex-col items-center gap-3 text-zinc-800 dark:text-zinc-100">
        <svg aria-hidden viewBox="0 0 60 60" className="size-16">
          <circle cx="30" cy="30" r="27" fill="none" stroke="currentColor" strokeWidth="2" />
          {Array.from({ length: 12 }, (_, index) => <line key={index} x1="30" y1="6" x2="30" y2={index % 3 ? 9 : 11} stroke="currentColor" strokeWidth={index % 3 ? 1 : 2} transform={`rotate(${index * 30} 30 30)`} />)}
          <line x1="30" y1="30" x2="30" y2="17" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="origin-center motion-safe:animate-[pui-hand_6s_linear_infinite]" style={{ transformBox: 'view-box' }} />
          <line x1="30" y1="30" x2="30" y2="11" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" className="origin-center motion-safe:animate-[pui-hand_1s_linear_infinite]" style={{ transformBox: 'view-box' }} />
          <circle cx="30" cy="30" r="2.5" fill="currentColor" />
        </svg>
        <span className="text-sm text-zinc-600 dark:text-zinc-400">Scheduling…</span>
      </div>
    </>
  );
}
