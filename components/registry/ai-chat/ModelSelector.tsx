/**
 * @registry
 * name: Model Selector
 * category: AI Chat
 * style: SaaS
 * tags: recent
 * description: Sélecteur de modèle IA avec descriptions, badges de vitesse et coche sur le modèle actif.
 * prompt: Create an AI model picker: trigger button showing the current model (aria-haspopup="listbox"), opening a listbox of models with name, one-line description, a speed/quality badge and a check on the selected one. defaultOpen prop for previews. Light and dark mode.
 */
'use client';
import { Check, ChevronsUpDown, Zap } from 'lucide-react';
import { useState } from 'react';

const models = [
  { id: 'fast', name: 'Swift', text: 'Instant answers for everyday tasks', badge: 'Fastest' },
  { id: 'balanced', name: 'Balance', text: 'Great quality at a good speed', badge: 'Default' },
  { id: 'deep', name: 'Depth', text: 'Long reasoning for hard problems', badge: 'Smartest' },
];

export function ModelSelector({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [selected, setSelected] = useState('balanced');
  const current = models.find((model) => model.id === selected)!;

  return (
    <div className="w-full max-w-xs">
      <button type="button" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="flex w-full items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-left text-sm font-semibold text-zinc-900 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-white">
        <Zap aria-hidden className="size-4 text-amber-500" /> {current.name}
        <ChevronsUpDown aria-hidden className="ml-auto size-4 text-zinc-400" />
      </button>
      {open && (
        <ul role="listbox" aria-label="Model" className="mt-2 rounded-2xl border border-zinc-200 bg-white p-1.5 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
          {models.map((model) => (
            <li key={model.id} role="option" aria-selected={selected === model.id}>
              <button type="button" onClick={() => { setSelected(model.id); setOpen(false); }} className="flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-zinc-100 dark:hover:bg-zinc-900">
                <span className="flex-1">
                  <span className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white">{model.name}<span className="rounded-full bg-zinc-100 px-1.5 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">{model.badge}</span></span>
                  <span className="block text-xs text-zinc-500 dark:text-zinc-400">{model.text}</span>
                </span>
                {selected === model.id && <Check aria-hidden className="mt-0.5 size-4 text-teal-600 dark:text-teal-400" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
