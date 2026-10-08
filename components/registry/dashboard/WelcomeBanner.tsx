/**
 * @registry
 * name: Welcome Banner
 * category: Dashboard
 * style: Gradient
 * tags: featured, recent
 * description: Bannière d'accueil du tableau de bord avec salutation, résumé du jour et actions rapides.
 * prompt: Create a dashboard welcome banner: gradient panel with "Good morning, Camille", a one-line summary with highlighted numbers, three quick-action buttons with icons, and a decorative blurred circle; stacks on mobile. Dismissible with a close button. Light and dark mode.
 */
'use client';
import { FilePlus, UserPlus, Upload, X } from 'lucide-react';
import { useState } from 'react';

export function WelcomeBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return <button type="button" onClick={() => setVisible(true)} className="text-sm text-teal-700 underline dark:text-teal-400">Show welcome banner</button>;

  return (
    <section className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 via-teal-700 to-violet-700 p-6 text-white sm:p-8">
      <div aria-hidden className="absolute -right-16 -top-16 size-56 rounded-full bg-white/15 blur-2xl" />
      <button type="button" aria-label="Dismiss welcome banner" onClick={() => setVisible(false)} className="absolute right-4 top-4 grid size-8 place-items-center rounded-lg text-white/80 hover:bg-white/15 hover:text-white"><X className="size-4" /></button>
      <p className="text-sm text-white/80">Tuesday, Sep 29</p>
      <h2 className="mt-1 text-2xl font-semibold sm:text-3xl">Good morning, Camille</h2>
      <p className="mt-2 max-w-md text-sm text-white/85">You have <strong>3 reviews</strong> waiting and revenue is up <strong>12%</strong> this week.</p>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        {[[FilePlus, 'New project'], [UserPlus, 'Invite teammate'], [Upload, 'Import data']].map(([Icon, label]) => {
          const ActionIcon = Icon as typeof FilePlus;
          return <button key={label as string} type="button" className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-medium backdrop-blur transition hover:bg-white/25"><ActionIcon aria-hidden className="size-4" />{label as string}</button>;
        })}
      </div>
    </section>
  );
}
