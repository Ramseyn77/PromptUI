/**
 * @registry
 * name: Avatar Stack Tooltip
 * category: Tooltips
 * style: Minimal
 * tags: recent
 * description: Pile d avatars ou chaque avatar montre le nom et le role en bulle au survol, avec compteur +N.
 * prompt: Create an overlapping avatar stack where each avatar (a focusable button) lifts on hover/focus and shows a tooltip with name and role above it; the last chip "+4" shows the remaining names in its tooltip. role="tooltip" + aria-describedby, light and dark mode.
 */
const people = [
  { name: 'Awa Diallo', role: 'Design', hue: 170 },
  { name: 'Lucas Martin', role: 'Engineering', hue: 250 },
  { name: 'Mei Chen', role: 'Product', hue: 20 },
  { name: 'Omar Haddad', role: 'Founder', hue: 320 },
];

export function AvatarStackTooltip() {
  const tip = 'pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-lg bg-zinc-900 px-2 py-1 text-xs text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100 group-has-[:focus-visible]:translate-y-0 group-has-[:focus-visible]:opacity-100 dark:bg-white dark:text-zinc-900';
  return (
    <div className="flex pt-12">
      {people.map((person, index) => (
        <span key={person.name} className="group relative -ml-2 first:ml-0">
          <button type="button" aria-describedby={`avatar-tip-${index}`} aria-label={person.name} className="grid size-11 place-items-center rounded-full border-2 border-white text-xs font-bold text-white transition group-hover:z-10 group-hover:-translate-y-1 dark:border-zinc-950" style={{ background: `hsl(${person.hue} 55% 50%)` }}>{person.name.split(' ').map((part) => part[0]).join('')}</button>
          <span id={`avatar-tip-${index}`} role="tooltip" className={tip}><strong className="font-semibold">{person.name}</strong> · {person.role}</span>
        </span>
      ))}
      <span className="group relative -ml-2">
        <button type="button" aria-describedby="avatar-tip-more" aria-label="4 more people" className="grid size-11 place-items-center rounded-full border-2 border-white bg-zinc-200 text-xs font-bold text-zinc-700 dark:border-zinc-950 dark:bg-zinc-800 dark:text-zinc-200">+4</button>
        <span id="avatar-tip-more" role="tooltip" className={tip}>Kofi, Sara, Tom and Inès</span>
      </span>
    </div>
  );
}
