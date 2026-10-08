/**
 * @registry
 * name: Shine Border Card
 * category: Cards
 * style: Minimal
 * tags: recent
 * description: Carte de connexion dont la bordure fine est parcourue par un reflet lumineux multicolore.
 * prompt: Create a sign-in card with a 1px "shine border": an absolutely positioned layer with a multi-stop radial gradient whose background-position animates, masked so only the border ring shows (mask-composite exclude). Inside: title, email and password fields with labels, primary button. Reduced-motion safe. Light and dark mode.
 */
'use client';
import { useId } from 'react';

export function ShineBorderCard() {
  const id = useId();

  return (
    <div className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white p-7 shadow-sm dark:bg-zinc-950">
      <style>{`@keyframes pui-shine{0%{background-position:0% 0%}50%{background-position:100% 100%}100%{background-position:0% 0%}}
.pui-shine-ring{padding:1.5px;-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0)}`}</style>
      <div aria-hidden className="pui-shine-ring pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(transparent,transparent,#2dd4bf,#a78bfa,#f472b6,transparent,transparent)] bg-[length:300%_300%] motion-safe:animate-[pui-shine_10s_linear_infinite]" />
      <h3 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">Welcome back</h3>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Enter your credentials to continue.</p>
      <form className="mt-6 space-y-4" onSubmit={(event) => event.preventDefault()}>
        <div>
          <label htmlFor={`${id}-email`} className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Email</label>
          <input id={`${id}-email`} type="email" placeholder="you@company.com" className="mt-1.5 w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-zinc-700 dark:text-zinc-100" />
        </div>
        <div>
          <label htmlFor={`${id}-password`} className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Password</label>
          <input id={`${id}-password`} type="password" placeholder="••••••••" className="mt-1.5 w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-zinc-700 dark:text-zinc-100" />
        </div>
        <button type="submit" className="w-full rounded-lg bg-zinc-950 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200">Sign in</button>
      </form>
    </div>
  );
}
