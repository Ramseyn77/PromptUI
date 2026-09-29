/**
 * @registry
 * name: Storage Usage
 * category: Dashboard
 * style: Minimal
 * tags: recent
 * description: Barre d espace de stockage segmentee par type de fichier avec legende et bouton d upgrade.
 * prompt: Create a storage usage card: "38.4 GB of 50 GB used", a single segmented bar with colored segments per file type (documents, images, video, other) and remaining space, a legend with sizes, and an upgrade link. Accessible text summary. Light and dark mode.
 */
const segments = [
  { label: 'Documents', size: 9.2, color: 'bg-teal-500' },
  { label: 'Images', size: 14.6, color: 'bg-violet-500' },
  { label: 'Video', size: 11.1, color: 'bg-amber-400' },
  { label: 'Other', size: 3.5, color: 'bg-zinc-400' },
];
const total = 50;

export function StorageUsage() {
  const used = segments.reduce((sum, segment) => sum + segment.size, 0);
  return (
    <section className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-baseline justify-between">
        <h3 className="font-semibold text-zinc-900 dark:text-white">Storage</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400"><strong className="font-semibold text-zinc-900 dark:text-white">{used.toFixed(1)} GB</strong> of {total} GB</p>
      </div>
      <div aria-hidden className="mt-4 flex h-3 gap-0.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        {segments.map((segment) => <span key={segment.label} className={segment.color} style={{ width: `${(segment.size / total) * 100}%` }} />)}
      </div>
      <p className="sr-only">{segments.map((segment) => `${segment.label} ${segment.size} GB`).join(', ')}. {(total - used).toFixed(1)} GB free.</p>
      <ul aria-hidden className="mt-4 grid grid-cols-2 gap-2 text-sm">
        {segments.map((segment) => (
          <li key={segment.label} className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400"><span className={`size-2.5 rounded-sm ${segment.color}`} />{segment.label}<span className="ml-auto font-medium tabular-nums text-zinc-900 dark:text-white">{segment.size} GB</span></li>
        ))}
      </ul>
      <div className="mt-5 flex items-center justify-between rounded-xl bg-zinc-50 p-3 dark:bg-zinc-900">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Need more space?</p>
        <a href="#" className="text-sm font-semibold text-teal-700 hover:underline dark:text-teal-400">Upgrade to 200 GB</a>
      </div>
    </section>
  );
}
