'use client';
import { Code2, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { LibraryComponent } from '@/types/component';
import { getComponentPrompt, type PromptLanguage } from '@/utils/componentPrompt';
import { localizedDescription } from '@/data/components';
import { CopyButton } from '@/components/ui/CopyButton';
import { tokenize } from '@/components/ui/CodeBlock';
import { ComponentPreview } from './ComponentPreview';
import { useLocale } from '@/i18n/LocaleProvider';

// Stage colors for the preview; the hex is shown like a color chip (uiverse-style). Labels come from the dictionary.
const stages = {
  auto: { className: 'bg-[var(--surface-2)]', hex: 'theme' },
  light: { className: 'bg-[#f4f4f5]', hex: '#f4f4f5' },
  dark: { className: 'bg-[#18181b]', hex: '#18181b' },
} as const;

type Stage = keyof typeof stages;

export function ComponentShowcase({ item }: { item: LibraryComponent }) {
  const [stage, setStage] = useState<Stage>('auto');
  const [tab, setTab] = useState<'code' | 'prompt'>('code');
  const { t, locale } = useLocale();
  // The prompt starts in the site language; the French template embeds the French description.
  const [language, setLanguage] = useState<PromptLanguage>(locale);
  const prompt = useMemo(() => getComponentPrompt({ ...item, description: localizedDescription(item, language) }, language), [item, language]);
  const highlighted = useMemo(() => tokenize(item.code), [item.code]);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Preview */}
      <section aria-label={t.showcase.preview} className={`relative flex min-h-[420px] flex-col overflow-hidden rounded-3xl border border-[var(--line-soft)] transition-colors lg:h-[600px] ${stages[stage].className}`}>
        <div className="flex items-center justify-end gap-2 p-3">
          <span className="font-mono text-xs font-bold text-[var(--muted)]">{stages[stage].hex}</span>
          <div role="radiogroup" aria-label={t.showcase.background} className="flex items-center gap-1 rounded-full border border-[var(--line)] bg-[var(--surface)]/80 p-1 backdrop-blur">
            {(Object.keys(stages) as Stage[]).map((key) => (
              <button
                key={key}
                type="button"
                role="radio"
                aria-checked={stage === key}
                aria-label={t.showcase.stages[key]}
                title={t.showcase.stages[key]}
                onClick={() => setStage(key)}
                className={`size-6 rounded-full border transition ${stage === key ? 'ring-2 ring-[var(--accent)] ring-offset-1 ring-offset-[var(--surface)]' : ''} ${
                  key === 'auto' ? 'border-[var(--line)] bg-[linear-gradient(135deg,#f4f4f5_50%,#18181b_50%)]' : `border-[var(--line)] ${stages[key].className}`
                }`}
              />
            ))}
          </div>
        </div>
        <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto px-5 pb-10 md:px-10">
          <ComponentPreview slug={item.slug}/>
        </div>
      </section>

      {/* Code / prompt */}
      <section aria-label={t.showcase.source} className="flex min-h-[420px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#111113] text-zinc-200 lg:h-[600px]">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3 py-2.5">
          <div role="tablist" aria-label={t.showcase.content} className="flex gap-1">
            {([['code', 'Code', Code2], ['prompt', t.showcase.aiPrompt, Sparkles]] as const).map(([key, label, Icon]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={tab === key}
                onClick={() => setTab(key)}
                className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 font-ui text-sm font-semibold transition ${
                  tab === key ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-zinc-100'
                }`}
              >
                <Icon size={15}/>{label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {tab === 'prompt' && (
              <div className="inline-flex rounded-full border border-white/10 p-0.5">
                {(['fr', 'en'] as PromptLanguage[]).map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={language === value}
                    onClick={() => setLanguage(value)}
                    className={`rounded-full px-2.5 py-1 font-mono text-[11px] uppercase transition ${language === value ? 'bg-white text-zinc-950' : 'text-zinc-400 hover:text-white'}`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            )}
            <CopyButton
              value={tab === 'code' ? item.code : prompt}
              label={t.common.copy}
              analyticsType={tab === 'code' ? 'code_copied' : 'prompt_copied'}
              componentSlug={item.slug}
              componentName={item.name}
            />
          </div>
        </div>
        {tab === 'code' ? (
          <pre data-lenis-prevent className="min-h-0 flex-1 overflow-auto p-5 text-[13px] leading-6"><code dangerouslySetInnerHTML={{ __html: highlighted }}/></pre>
        ) : (
          <div data-lenis-prevent className="min-h-0 flex-1 overflow-auto p-5">
            <p className="whitespace-pre-wrap text-sm leading-7 text-zinc-300">{prompt}</p>
            <p className="mt-6 text-xs leading-5 text-zinc-500">{t.showcase.pasteHint}</p>
          </div>
        )}
      </section>
    </div>
  );
}
