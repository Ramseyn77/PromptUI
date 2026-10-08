/**
 * @registry
 * name: Placement Tooltips
 * category: Tooltips
 * style: Minimal
 * tags: featured, recent
 * description: Quatre info-bulles avec flèche, en haut, à droite, en bas et à gauche, au survol et au focus.
 * prompt: Create tooltips in four placements (top, right, bottom, left) around buttons, each with a small rotated-square arrow pointing at the trigger, shown on hover and focus-visible with a fade/scale from the trigger side, role="tooltip" linked via aria-describedby. Dark tooltip in light mode, light in dark mode.
 */
const placements = {
  top: { box: 'bottom-full left-1/2 mb-2 -translate-x-1/2 origin-bottom', arrow: '-bottom-1 left-1/2 -translate-x-1/2' },
  right: { box: 'left-full top-1/2 ml-2 -translate-y-1/2 origin-left', arrow: '-left-1 top-1/2 -translate-y-1/2' },
  bottom: { box: 'top-full left-1/2 mt-2 -translate-x-1/2 origin-top', arrow: '-top-1 left-1/2 -translate-x-1/2' },
  left: { box: 'right-full top-1/2 mr-2 -translate-y-1/2 origin-right', arrow: '-right-1 top-1/2 -translate-y-1/2' },
} as const;

export function PlacementTooltips() {
  return (
    <div className="grid grid-cols-2 gap-x-24 gap-y-14 p-10">
      {(Object.keys(placements) as Array<keyof typeof placements>).map((side) => (
        <div key={side} className="group relative w-fit justify-self-center">
          <button type="button" aria-describedby={`tip-${side}`} className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium capitalize text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">{side}</button>
          <span id={`tip-${side}`} role="tooltip" className={`pointer-events-none absolute z-10 scale-95 whitespace-nowrap rounded-lg bg-zinc-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 transition duration-150 group-hover:scale-100 group-hover:opacity-100 group-has-[:focus-visible]:scale-100 group-has-[:focus-visible]:opacity-100 dark:bg-white dark:text-zinc-900 ${placements[side].box}`}>
            Tooltip on the {side}
            <span aria-hidden className={`absolute size-2 rotate-45 bg-inherit ${placements[side].arrow}`} />
          </span>
        </div>
      ))}
    </div>
  );
}
