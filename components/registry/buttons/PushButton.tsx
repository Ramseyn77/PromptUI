/**
 * @registry
 * name: Push Button 3D
 * category: Buttons
 * style: Minimal
 * tags: recent
 * description: Boutons en relief qui s enfoncent physiquement au clic.
 * prompt: Create tactile 3D push buttons: a darker base layer and a raised face translated up 6px that rises on hover and sinks to 0 on :active. Provide a primary teal and a neutral variant, both with dark mode colors and a focus ring.
 */
export function PushButton() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-5">
      {[
        { label: 'Deploy', base: 'bg-teal-700 dark:bg-teal-800', face: 'bg-teal-500 text-white dark:bg-teal-400 dark:text-teal-950' },
        { label: 'Cancel', base: 'bg-zinc-300 dark:bg-zinc-700', face: 'bg-white text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100' },
      ].map(({ label, base, face }) => (
        // The darker base stays put; the face sinks onto it when pressed.
        <button
          key={label}
          type="button"
          className={`group rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 ${base}`}
        >
          <span
            className={`block -translate-y-1.5 rounded-2xl px-7 py-3 text-sm font-bold shadow-sm transition-transform duration-100 group-hover:-translate-y-2 group-active:translate-y-0 ${face}`}
          >
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}
