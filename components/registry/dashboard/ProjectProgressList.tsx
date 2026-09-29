/**
 * @registry
 * name: Project Progress List
 * category: Dashboard
 * style: Minimal
 * tags: recent
 * description: Liste de projets avec barre de progression, echeance, statut en retard et pile d avatars.
 * prompt: Create a projects widget: each row shows project name and due date (rose "Overdue" when late), a labeled progress bar (role="progressbar"), and overlapping member avatars with a "+N" overflow chip. Light and dark mode.
 */
const projects = [
  { name: 'Mobile app v3', due: 'Oct 12', progress: 72, members: 5, late: false, color: 'bg-teal-500' },
  { name: 'Brand refresh', due: 'Sep 28', progress: 45, members: 3, late: true, color: 'bg-rose-500' },
  { name: 'API v2 docs', due: 'Nov 02', progress: 90, members: 2, late: false, color: 'bg-violet-500' },
];

export function ProjectProgressList() {
  return (
    <section className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="font-semibold text-zinc-900 dark:text-white">Projects</h3>
      <ul className="mt-4 space-y-5">
        {projects.map((project) => (
          <li key={project.name}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">{project.name}</p>
                <p className={`text-xs ${project.late ? 'font-medium text-rose-600 dark:text-rose-400' : 'text-zinc-500 dark:text-zinc-400'}`}>{project.late ? `Overdue · ${project.due}` : `Due ${project.due}`}</p>
              </div>
              <div className="flex -space-x-2">
                {Array.from({ length: Math.min(project.members, 3) }, (_, index) => <span key={index} className="size-7 rounded-full border-2 border-white dark:border-zinc-950" style={{ background: `hsl(${index * 80 + 180} 55% 60%)` }} />)}
                {project.members > 3 && <span className="grid size-7 place-items-center rounded-full border-2 border-white bg-zinc-100 text-[10px] font-semibold text-zinc-600 dark:border-zinc-950 dark:bg-zinc-800 dark:text-zinc-300">+{project.members - 3}</span>}
              </div>
            </div>
            <div className="mt-2 flex items-center gap-3">
              <div role="progressbar" aria-label={`${project.name} progress`} aria-valuenow={project.progress} aria-valuemin={0} aria-valuemax={100} className="h-2 flex-1 rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div className={`h-full rounded-full ${project.color}`} style={{ width: `${project.progress}%` }} />
              </div>
              <span className="w-9 text-right text-xs font-medium tabular-nums text-zinc-600 dark:text-zinc-400">{project.progress}%</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
