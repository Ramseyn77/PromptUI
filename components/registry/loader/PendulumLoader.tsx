/**
 * @registry
 * name: Pendulum Loader
 * category: Loader
 * style: Minimal
 * tags: recent
 * description: Pendule de Newton en CSS : les billes des extrémités se balancent en alternance, avec ombres synchronisées.
 * prompt: Create a Newton's cradle loader in CSS: five balls hanging from strings under a thin bar; the first ball swings out left and back, then the last swings right, alternating with ease-in-out timing; small floor shadows shrink as the end balls rise; role=status with sr-only "Loading"; static with reduced motion. Light and dark mode.
 */
export function PendulumLoader() {
  return (
    <div role="status" className="flex flex-col items-center gap-3 p-6">
      <style>{`
        @keyframes pui-pendulum-left { 0%, 50%, 100% { transform: rotate(0) } 25% { transform: rotate(32deg) } }
        @keyframes pui-pendulum-right { 0%, 50%, 100% { transform: rotate(0) } 75% { transform: rotate(-32deg) } }
        @keyframes pui-pendulum-shadow-left { 0%, 50%, 100% { transform: scaleX(1); opacity: .35 } 25% { transform: scaleX(.6) translateX(-14px); opacity: .15 } }
        @keyframes pui-pendulum-shadow-right { 0%, 50%, 100% { transform: scaleX(1); opacity: .35 } 75% { transform: scaleX(.6) translateX(14px); opacity: .15 } }
      `}</style>
      <span aria-hidden className="h-1 w-36 rounded-full bg-zinc-800 dark:bg-zinc-200" />
      <div aria-hidden className="-mt-3 flex">
        {[0, 1, 2, 3, 4].map((index) => (
          <span key={index} className={`flex w-6 origin-top flex-col items-center ${index === 0 ? 'motion-safe:animate-[pui-pendulum-left_1.6s_ease-in-out_infinite]' : index === 4 ? 'motion-safe:animate-[pui-pendulum-right_1.6s_ease-in-out_infinite]' : ''}`}>
            <span className="h-14 w-px bg-zinc-400 dark:bg-zinc-600" />
            <span className="size-6 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-600 shadow-inner dark:from-zinc-200 dark:to-zinc-500" />
          </span>
        ))}
      </div>
      <div aria-hidden className="flex">
        {[0, 1, 2, 3, 4].map((index) => <span key={index} className={`mx-0.5 h-1 w-5 rounded-full bg-zinc-900 opacity-35 blur-[1px] dark:bg-black ${index === 0 ? 'motion-safe:animate-[pui-pendulum-shadow-left_1.6s_ease-in-out_infinite]' : index === 4 ? 'motion-safe:animate-[pui-pendulum-shadow-right_1.6s_ease-in-out_infinite]' : ''}`} />)}
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
}
