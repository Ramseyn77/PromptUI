/**
 * @registry
 * name: Color Tooltip Variants
 * category: Tooltips
 * style: Gradient
 * tags: recent
 * description: Info-bulles colorées façon daisyUI (primaire, succès, alerte, erreur, info) au survol et au focus.
 * prompt: Create daisyUI-style colored tooltips: five buttons (Primary, Success, Warning, Error, Info) each showing a tooltip above it in the matching color with an arrow, on hover and on keyboard focus (CSS group-hover/group-focus-within, role="tooltip" referenced by aria-describedby). Tooltips scale in from the arrow. Light and dark mode.
 */
export function ColorTooltipVariants() {
  const variants = [
    { label: 'Primary', tip: 'Save and publish', bg: 'bg-teal-600', text: 'text-white' },
    { label: 'Success', tip: 'All checks passed', bg: 'bg-emerald-500', text: 'text-emerald-950' },
    { label: 'Warning', tip: '3 seats left', bg: 'bg-amber-400', text: 'text-amber-950' },
    { label: 'Error', tip: 'Payment declined', bg: 'bg-rose-500', text: 'text-white' },
    { label: 'Info', tip: 'Updated 2 min ago', bg: 'bg-sky-500', text: 'text-white' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 pt-12">
      {variants.map((variant) => (
        <span key={variant.label} className="group relative">
          <button type="button" aria-describedby={`tip-${variant.label}`} className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-800 outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">{variant.label}</button>
          <span id={`tip-${variant.label}`} role="tooltip" className={`pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 scale-90 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium opacity-0 shadow-lg transition group-hover:scale-100 group-hover:opacity-100 group-focus-within:scale-100 group-focus-within:opacity-100 origin-bottom ${variant.bg} ${variant.text}`}>
            {variant.tip}
            <span aria-hidden className={`absolute left-1/2 top-full -mt-1 size-2 -translate-x-1/2 rotate-45 ${variant.bg}`} />
          </span>
        </span>
      ))}
    </div>
  );
}
