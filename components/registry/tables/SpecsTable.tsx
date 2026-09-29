/**
 * @registry
 * name: Specs Table
 * category: Tables
 * style: Editorial
 * tags: recent
 * description: Fiche technique produit en paires cle-valeur groupees par section, avec rayures discretes.
 * prompt: Create a product specifications table grouped into sections (Display, Performance, Battery) using <th scope="row"> keys and value cells, subtle zebra striping and section headings; stacks key above value below sm. Light and dark mode.
 */
const sections = [
  { title: 'Display', rows: [['Size', '14.2" Liquid Retina'], ['Resolution', '3024 × 1964'], ['Refresh rate', 'Up to 120 Hz']] },
  { title: 'Performance', rows: [['Chip', '12-core CPU, 18-core GPU'], ['Memory', '36 GB unified']] },
  { title: 'Battery', rows: [['Video playback', 'Up to 22 hours'], ['Charging', '96 W USB-C']] },
];

export function SpecsTable() {
  return (
    <div className="w-full max-w-xl space-y-6 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      {sections.map((section) => (
        <table key={section.title} className="w-full text-sm">
          <caption className="pb-2 text-left text-xs font-semibold uppercase tracking-[.18em] text-teal-700 dark:text-teal-400">{section.title}</caption>
          <tbody>
            {section.rows.map(([key, value]) => (
              <tr key={key} className="flex flex-col odd:bg-zinc-50 sm:table-row dark:odd:bg-zinc-900">
                <th scope="row" className="px-3 pt-2.5 text-left font-normal text-zinc-500 sm:w-2/5 sm:py-2.5 dark:text-zinc-400">{key}</th>
                <td className="px-3 pb-2.5 font-medium text-zinc-900 sm:py-2.5 dark:text-white">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
}
