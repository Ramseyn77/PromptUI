/**
 * @registry
 * name: Leaderboard Table
 * category: Tables
 * style: Gradient
 * tags: recent
 * description: Classement avec médailles pour le podium, barres de progression et évolution de rang.
 * prompt: Create a leaderboard table: rank with gold/silver/bronze medal badges for the top 3, player with avatar, a points progress bar relative to the leader, and a rank-change indicator (▲ green / ▼ rose / – neutral). Light and dark mode.
 */
const players = [
  { name: 'Ada', points: 9820, change: 2 },
  { name: 'Kenji', points: 9410, change: -1 },
  { name: 'Zoé', points: 8760, change: 1 },
  { name: 'Marco', points: 7120, change: 0 },
  { name: 'Priya', points: 6540, change: -2 },
];
const medals = ['bg-gradient-to-br from-amber-300 to-amber-500 text-amber-950', 'bg-gradient-to-br from-zinc-200 to-zinc-400 text-zinc-800', 'bg-gradient-to-br from-orange-300 to-orange-600 text-orange-950'];

export function LeaderboardTable() {
  const top = players[0].points;
  return (
    <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <table className="w-full text-sm">
        <caption className="border-b border-zinc-200 px-4 py-3 text-left font-semibold text-zinc-900 dark:border-zinc-800 dark:text-white">Weekly leaderboard</caption>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
          {players.map((player, index) => (
            <tr key={player.name}>
              <td className="w-12 px-4 py-3"><span className={`grid size-7 place-items-center rounded-full text-xs font-bold ${medals[index] ?? 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400'}`}>{index + 1}</span></td>
              <td className="py-3 font-medium text-zinc-900 dark:text-white">{player.name}</td>
              <td className="w-1/3 py-3">
                <div className="h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800"><div className="h-full rounded-full bg-gradient-to-r from-teal-400 to-violet-500" style={{ width: `${(player.points / top) * 100}%` }} /></div>
              </td>
              <td className="px-3 py-3 text-right tabular-nums text-zinc-700 dark:text-zinc-300">{player.points.toLocaleString('en-US')}</td>
              <td className={`w-10 pr-4 text-right text-xs font-semibold ${player.change > 0 ? 'text-emerald-600 dark:text-emerald-400' : player.change < 0 ? 'text-rose-600 dark:text-rose-400' : 'text-zinc-400'}`}>
                <span aria-label={player.change > 0 ? `Up ${player.change}` : player.change < 0 ? `Down ${-player.change}` : 'No change'}>{player.change > 0 ? `▲${player.change}` : player.change < 0 ? `▼${-player.change}` : '–'}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
