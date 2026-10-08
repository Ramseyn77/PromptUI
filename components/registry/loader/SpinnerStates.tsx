/**
 * @registry
 * name: Spinner States
 * category: Loader
 * style: Minimal
 * tags: recent
 * description: Spinner façon shadcn décliné en contexte : bouton, badge, champ de saisie et état vide de traitement.
 * prompt: Create a shadcn-style spinner (lucide Loader2 rotating, role="status" with aria-label) shown in context: three button sizes in loading state (disabled, aria-busy), a "Syncing" badge, an input with a trailing spinner while validating a username, and an empty-state card "Processing payment" with spinner, text and Cancel button. Spinning disabled with reduced motion (pulse instead). Light and dark mode.
 */
import { Loader2 } from 'lucide-react';

function Spinner({ className = 'size-4' }: { className?: string }) {
  return <Loader2 role="status" aria-label="Loading" className={`${className} motion-safe:animate-spin motion-reduce:animate-pulse`} />;
}

export function SpinnerStates() {
  return (
    <div className="grid w-full max-w-md gap-5">
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" disabled aria-busy="true" className="inline-flex h-8 items-center gap-1.5 rounded-md bg-zinc-950 px-3 text-xs font-medium text-white opacity-80 dark:bg-white dark:text-zinc-950"><Spinner className="size-3.5" />Saving</button>
        <button type="button" disabled aria-busy="true" className="inline-flex h-9 items-center gap-2 rounded-lg border border-zinc-300 px-4 text-sm font-medium text-zinc-700 opacity-80 dark:border-zinc-700 dark:text-zinc-300"><Spinner />Please wait</button>
        <button type="button" disabled aria-busy="true" className="inline-flex h-11 items-center gap-2 rounded-xl bg-teal-600 px-5 text-sm font-semibold text-white opacity-90"><Spinner />Deploying</button>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700 dark:bg-sky-400/10 dark:text-sky-300"><Spinner className="size-3" />Syncing</span>
      </div>
      <label className="grid gap-1.5">
        <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Username</span>
        <span className="flex items-center rounded-lg border border-zinc-300 bg-white pr-3 focus-within:border-teal-500 dark:border-zinc-700 dark:bg-zinc-950">
          <input defaultValue="ada-lovelace" className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-zinc-900 outline-none dark:text-zinc-100" />
          <span className="text-zinc-400"><Spinner /></span>
        </span>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">Checking availability…</span>
      </label>
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-zinc-300 p-8 text-center dark:border-zinc-700">
        <span className="grid size-11 place-items-center rounded-full bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300"><Spinner className="size-5" /></span>
        <p className="mt-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Processing your payment</p>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">This can take up to 30 seconds. Please do not refresh.</p>
        <button type="button" className="mt-4 rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900">Cancel</button>
      </div>
    </div>
  );
}
