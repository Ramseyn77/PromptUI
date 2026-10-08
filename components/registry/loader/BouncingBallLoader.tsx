/**
 * @registry
 * name: Bouncing Ball Loader
 * category: Loader
 * style: Gradient
 * tags: recent
 * description: Balle dégradée qui rebondit en s'écrasant au sol, avec ombre qui grandit et rétrécit en rythme.
 * prompt: Create a bouncing ball loader: a gradient ball that falls with ease-in and rises with ease-out, squashing on impact (scaleX 1.25, scaleY 0.75), while an elliptical shadow beneath grows darker and wider as the ball lands; "Loading your workspace" caption with animated ellipsis; role="status". Static with reduced motion. Light and dark mode.
 */
export function BouncingBallLoader() {
  return (
    <div role="status" className="flex flex-col items-center">
      <style>{`@keyframes pui-bounce-ball{0%{transform:translateY(0)}45%{transform:translateY(80px) scale(1)}50%{transform:translateY(84px) scale(1.25,.75)}55%{transform:translateY(80px) scale(1)}100%{transform:translateY(0)}}
@keyframes pui-bounce-shadow{0%,100%{transform:scale(.45);opacity:.25}50%{transform:scale(1);opacity:.6}}
@keyframes pui-dots{0%{content:''}33%{content:'.'}66%{content:'..'}100%{content:'...'}}
.pui-ellipsis::after{content:'...';animation:pui-dots 1.2s steps(1) infinite}
@media (prefers-reduced-motion:reduce){.pui-ball-anim,.pui-ellipsis::after{animation:none!important}}`}</style>
      <div className="relative h-32 w-20">
        <span className="pui-ball-anim absolute left-1/2 top-0 -ml-5 size-10 origin-bottom rounded-full bg-gradient-to-br from-amber-300 via-orange-500 to-rose-500 shadow-inner" style={{ animation: 'pui-bounce-ball 1s cubic-bezier(.5,0,.5,1) infinite' }} />
        <span className="pui-ball-anim absolute bottom-0 left-1/2 -ml-6 h-2.5 w-12 rounded-[50%] bg-zinc-900 blur-[2px] dark:bg-black" style={{ animation: 'pui-bounce-shadow 1s cubic-bezier(.5,0,.5,1) infinite' }} />
      </div>
      <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400"><span className="pui-ellipsis">Loading your workspace</span></p>
    </div>
  );
}
