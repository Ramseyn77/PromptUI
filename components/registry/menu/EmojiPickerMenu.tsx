/**
 * @registry
 * name: Emoji Picker Menu
 * category: Menu
 * style: Glass
 * tags: featured, recent
 * description: Sélecteur d'emoji en verre dépoli avec onglets de catégories, recherche, récents et choix du teint.
 * prompt: Create a glassy emoji picker menu (open by default) attached to a reaction button: category tabs (Recent, Smileys, Hands, Food, Objects) as a tablist, a search input filtering by name, an 8-column grid of emoji buttons with aria-labels, a skin-tone selector applying to hand emojis, a footer preview showing the hovered/focused emoji and name; picking one adds it to the reaction bar and to Recent. Light and dark mode.
 */
'use client';
import { Smile } from 'lucide-react';
import { useState } from 'react';

const sets: Record<string, [string, string][]> = {
  Smileys: [['😀', 'grinning'], ['😂', 'joy'], ['🥹', 'holding back tears'], ['😍', 'heart eyes'], ['🤔', 'thinking'], ['😎', 'cool'], ['🥳', 'party'], ['😴', 'sleeping'], ['🤯', 'mind blown'], ['😇', 'halo'], ['🙃', 'upside down'], ['😬', 'grimace'], ['🫠', 'melting'], ['🤗', 'hug'], ['😅', 'sweat smile'], ['😭', 'crying']],
  Hands: [['👍', 'thumbs up'], ['👏', 'clap'], ['🙌', 'raised hands'], ['👋', 'wave'], ['🤝', 'handshake'], ['✌️', 'victory'], ['🙏', 'pray'], ['💪', 'muscle']],
  Food: [['🍕', 'pizza'], ['🍣', 'sushi'], ['🌮', 'taco'], ['🍩', 'donut'], ['☕', 'coffee'], ['🍎', 'apple'], ['🥑', 'avocado'], ['🍪', 'cookie']],
  Objects: [['🚀', 'rocket'], ['💡', 'bulb'], ['🎉', 'tada'], ['🔥', 'fire'], ['✅', 'check'], ['❤️', 'heart'], ['⭐', 'star'], ['🐛', 'bug']],
};
const tones = ['', '🏻', '🏽', '🏿'];
const toneable = ['👍', '👏', '🙌', '👋', '🙏', '💪'];

export function EmojiPickerMenu({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [tab, setTab] = useState('Recent');
  const [query, setQuery] = useState('');
  const [tone, setTone] = useState('');
  const [recent, setRecent] = useState<[string, string][]>([['🎉', 'tada'], ['👍', 'thumbs up'], ['🔥', 'fire']]);
  const [reactions, setReactions] = useState<Record<string, number>>({ '🎉': 3, '👍': 5 });
  const [preview, setPreview] = useState<[string, string] | null>(null);
  const withTone = (emoji: string) => (tone && toneable.includes(emoji) ? emoji + tone : emoji);
  const all = Object.values(sets).flat();
  const list = query ? all.filter(([, name]) => name.includes(query.toLowerCase())) : tab === 'Recent' ? recent : sets[tab];

  function pick(entry: [string, string]) {
    const emoji = withTone(entry[0]);
    setReactions((value) => ({ ...value, [emoji]: (value[emoji] ?? 0) + 1 }));
    setRecent((value) => [entry, ...value.filter(([item]) => item !== entry[0])].slice(0, 16));
  }

  return (
    <div className="w-80 rounded-3xl bg-[linear-gradient(135deg,#c4b5fd,#f9a8d4,#fcd34d)] p-4 dark:bg-[linear-gradient(135deg,#2e1065,#500724,#422006)]">
      <div className="flex flex-wrap gap-1.5">
        {Object.entries(reactions).map(([emoji, count]) => <span key={emoji} className="rounded-full bg-white/60 px-2 py-0.5 text-sm backdrop-blur dark:bg-white/10 dark:text-white">{emoji} <span className="text-xs tabular-nums">{count}</span></span>)}
        <button type="button" aria-label="Add reaction" aria-expanded={open} onClick={() => setOpen(!open)} className="grid size-7 place-items-center rounded-full bg-white/60 text-zinc-700 backdrop-blur hover:bg-white/80 dark:bg-white/10 dark:text-white"><Smile aria-hidden className="size-4" /></button>
      </div>
      {open && (
        <div className="mt-3 rounded-2xl border border-white/50 bg-white/55 p-2 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/60">
          <div className="flex gap-2">
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search emoji" aria-label="Search emoji" className="min-w-0 flex-1 rounded-lg bg-white/70 px-2.5 py-1.5 text-sm text-zinc-900 outline-none dark:bg-white/10 dark:text-white" />
            <div role="radiogroup" aria-label="Skin tone" className="flex items-center gap-0.5">{tones.map((value, index) => <button key={index} type="button" role="radio" aria-checked={tone === value} aria-label={['Default', 'Light', 'Medium', 'Dark'][index]} onClick={() => setTone(value)} className={`grid size-6 place-items-center rounded-md text-sm ${tone === value ? 'bg-white shadow-sm dark:bg-white/20' : ''}`}>{'👋' + value}</button>)}</div>
          </div>
          {!query && <div role="tablist" aria-label="Categories" className="mt-2 flex gap-1 overflow-x-auto text-xs">{['Recent', ...Object.keys(sets)].map((name) => <button key={name} type="button" role="tab" aria-selected={tab === name} onClick={() => setTab(name)} className={`rounded-full px-2.5 py-1 font-medium ${tab === name ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-700 hover:bg-white/60 dark:text-zinc-300 dark:hover:bg-white/10'}`}>{name}</button>)}</div>}
          <div className="mt-2 grid h-36 grid-cols-8 content-start gap-0.5 overflow-y-auto" data-lenis-prevent>
            {list.map((entry) => <button key={entry[0]} type="button" aria-label={entry[1]} onClick={() => pick(entry)} onMouseEnter={() => setPreview(entry)} onFocus={() => setPreview(entry)} className="grid aspect-square place-items-center rounded-lg text-xl transition hover:scale-110 hover:bg-white/70 focus:bg-white/70 focus:outline-none dark:hover:bg-white/10 dark:focus:bg-white/10">{withTone(entry[0])}</button>)}
            {!list.length && <p className="col-span-8 py-6 text-center text-sm text-zinc-500">No emoji found</p>}
          </div>
          <p className="mt-1 flex h-8 items-center gap-2 border-t border-white/40 px-1 pt-1 text-xs text-zinc-600 dark:border-white/10 dark:text-zinc-300">{preview ? <><span className="text-xl">{withTone(preview[0])}</span>:{preview[1].replace(/ /g, '_')}:</> : 'Pick an emoji'}</p>
        </div>
      )}
    </div>
  );
}
