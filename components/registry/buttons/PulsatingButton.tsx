/**
 * @registry
 * name: Pulsating Button
 * category: Buttons
 * style: Minimal
 * tags: recent
 * description: Bouton d'appel à l'action entouré d'une onde qui pulse doucement pour attirer l'œil.
 * prompt: Create a pulsating call-to-action button: solid teal pill with a live dot; a box-shadow ring expands from 0 to 12px and fades out in a 1.6s loop (keyframes on box-shadow using a CSS variable color); pulse stops on hover and with reduced motion. Focus ring visible. Light and dark mode.
 */
export function PulsatingButton() {
  return (
    <button type="button" className="relative inline-flex items-center gap-2.5 rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white outline-none transition hover:bg-teal-500 focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:ring-offset-2 motion-safe:animate-[pui-pulse-ring_1.6s_ease-out_infinite] hover:animate-none dark:bg-teal-400 dark:text-teal-950 dark:hover:bg-teal-300 dark:focus-visible:ring-offset-zinc-950">
      <style>{`@keyframes pui-pulse-ring{0%{box-shadow:0 0 0 0 rgba(20,184,166,.55)}100%{box-shadow:0 0 0 14px rgba(20,184,166,0)}}`}</style>
      <span aria-hidden className="size-2 rounded-full bg-white dark:bg-teal-950" />
      Join the live session
    </button>
  );
}
