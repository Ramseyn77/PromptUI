/**
 * @registry
 * name: Info Icon Tooltip
 * category: Tooltips
 * style: Minimal
 * tags: recent
 * description: Aide contextuelle de champ : icône « i » à côté du label qui explique le champ au survol et au focus.
 * prompt: Create form fields with contextual help: next to each label a small info icon button (aria-label "More info about …") shows a tooltip on hover/focus explaining the field; the input also references the help text via aria-describedby. Light and dark mode.
 */
import { Info } from 'lucide-react';

const fields = [
  { id: 'vat', label: 'VAT number', help: 'Found on your invoices. EU businesses only.', placeholder: 'FR12345678901' },
  { id: 'slug', label: 'Workspace URL', help: 'Lowercase letters, numbers and dashes. You can change it later.', placeholder: 'my-team' },
];

export function InfoIconTooltip() {
  return (
    <form className="w-full max-w-sm space-y-5 pt-8" onSubmit={(event) => event.preventDefault()}>
      {fields.map((field) => (
        <div key={field.id}>
          <div className="flex items-center gap-1.5">
            <label htmlFor={`field-${field.id}`} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{field.label}</label>
            <span className="group relative inline-flex">
              <button type="button" aria-label={`More info about ${field.label}`} aria-describedby={`help-${field.id}`} className="grid size-5 place-items-center rounded-full text-zinc-400 hover:text-zinc-700 focus-visible:text-zinc-700 dark:hover:text-zinc-200"><Info className="size-4" /></button>
              <span id={`help-${field.id}`} role="tooltip" className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-56 -translate-x-1/2 rounded-lg bg-zinc-900 px-3 py-2 text-xs leading-5 text-white opacity-0 transition group-hover:opacity-100 group-has-[:focus-visible]:opacity-100 dark:bg-white dark:text-zinc-900">{field.help}</span>
            </span>
          </div>
          <input id={`field-${field.id}`} placeholder={field.placeholder} aria-describedby={`help-${field.id}`} className="mt-1.5 h-10 w-full rounded-xl border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-teal-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white" />
        </div>
      ))}
    </form>
  );
}
