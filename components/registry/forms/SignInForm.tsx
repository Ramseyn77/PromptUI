/**
 * @registry
 * name: Sign In Form
 * category: Forms
 * style: SaaS
 * tags: featured, recent
 * description: Formulaire de connexion avec fournisseurs, email, mot de passe affichable, se souvenir et validation.
 * prompt: Create a sign-in card: two provider buttons (Google-like and Apple-like with generic icons), an "or" divider, email and password fields with labels, a show/hide password toggle (aria-pressed), "Remember me" checkbox, "Forgot password?" link, inline validation errors (aria-invalid + aria-describedby) and a loading submit state. Light and dark mode.
 */
'use client';
import { Eye, EyeOff, Globe, Loader2, Smartphone } from 'lucide-react';
import { useState, type FormEvent } from 'react';

export function SignInForm() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const input = 'mt-1.5 h-11 w-full rounded-xl border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 aria-[invalid=true]:border-rose-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white';

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (String(data.get('password')).length < 8) { setError('Password must be at least 8 characters.'); return; }
    setError('');
    setLoading(true);
    window.setTimeout(() => setLoading(false), 1200);
  }

  return (
    <form onSubmit={submit} noValidate className="w-full max-w-sm rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Welcome back</h2>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Sign in to continue to your workspace.</p>
      <div className="mt-5 grid grid-cols-2 gap-2">
        {[[Globe, 'Google'], [Smartphone, 'Apple']].map(([Icon, label]) => {
          const IconComponent = Icon as typeof Globe;
          return <button key={label as string} type="button" className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300 py-2.5 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"><IconComponent aria-hidden className="size-4" />{label as string}</button>;
        })}
      </div>
      <div className="my-5 flex items-center gap-3 text-xs text-zinc-400"><span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />or<span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" /></div>
      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Email<input name="email" type="email" autoComplete="email" defaultValue="camille@lumen.io" className={input} /></label>
      <label className="mt-4 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        <span className="flex justify-between">Password<a href="#" className="text-xs font-normal text-teal-700 hover:underline dark:text-teal-400">Forgot password?</a></span>
        <span className="relative block">
          <input name="password" type={show ? 'text' : 'password'} autoComplete="current-password" defaultValue="short" aria-invalid={Boolean(error)} aria-describedby={error ? 'signin-error' : undefined} className={`${input} pr-11`} />
          <button type="button" aria-label={show ? 'Hide password' : 'Show password'} aria-pressed={show} onClick={() => setShow((value) => !value)} className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800">{show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button>
        </span>
      </label>
      {error && <p id="signin-error" className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">{error}</p>}
      <label className="mt-4 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400"><input type="checkbox" defaultChecked className="size-4 accent-teal-600" />Remember me</label>
      <button type="submit" disabled={loading} aria-busy={loading} className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 text-sm font-semibold text-white disabled:opacity-70 dark:bg-white dark:text-zinc-950">{loading && <Loader2 aria-hidden className="size-4 motion-safe:animate-spin" />}{loading ? 'Signing in…' : 'Sign in'}</button>
    </form>
  );
}
