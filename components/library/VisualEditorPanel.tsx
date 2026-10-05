'use client';

import { AlignCenter, AlignLeft, AlignRight, MousePointerClick, Type } from 'lucide-react';
import {
  alignOptions,
  alignPattern,
  backgroundSwatches,
  bgColorPattern,
  fontSizeOptions,
  fontSizePattern,
  fontWeightOptions,
  fontWeightPattern,
  getMatchingClass,
  paddingOptions,
  paddingPattern,
  radiusOptions,
  radiusPattern,
  setBackgroundColor,
  setFontSize,
  setFontWeight,
  setPadding,
  setRadius,
  setTextAlign,
  setTextColor,
  textColorPattern,
  textColorSwatches,
} from '@/utils/tailwindEdits';
import { useLocale } from '@/i18n/LocaleProvider';

const alignIcons = { 'text-left': AlignLeft, 'text-center': AlignCenter, 'text-right': AlignRight } as const;

function SwatchGroup({
  label,
  options,
  active,
  onPick,
}: {
  label: string;
  options: Array<{ label: string; className: string }>;
  active?: string;
  onPick: (className: string) => void;
}) {
  const optionLabel = useOptionLabel();
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase text-[var(--muted)]">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((item) => (
          <button
            key={item.className}
            title={optionLabel(item)}
            aria-label={optionLabel(item)}
            onClick={() => onPick(item.className)}
            className={`size-8 rounded-full border-2 ${item.className} ${active === item.className ? 'border-[var(--accent)]' : 'border-[var(--line)]'}`}
          />
        ))}
      </div>
    </div>
  );
}

function ButtonGroup({
  label,
  options,
  active,
  onPick,
}: {
  label: string;
  options: Array<{ label: string; className: string }>;
  active?: string;
  onPick: (className: string) => void;
}) {
  const optionLabel = useOptionLabel();
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase text-[var(--muted)]">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((item) => (
          <button
            key={item.className}
            onClick={() => onPick(item.className)}
            className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${active === item.className ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]' : 'border-[var(--line)] text-[var(--muted)] hover:text-[var(--foreground)]'}`}
          >
            {optionLabel(item)}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Option labels are English in tailwindEdits; the dictionary overrides the ones that differ in other languages. */
function useOptionLabel() {
  const { t } = useLocale();
  return (item: { label: string; className: string }) => t.visual.optionLabels[item.className] ?? item.label;
}

export function VisualEditorPanel({ element, onChange }: { element: HTMLElement | null; onChange: () => void }) {
  const { t } = useLocale();
  const optionLabel = useOptionLabel();
  if (!element) {
    return (
      <div data-lenis-prevent className="flex h-[min(72vh,760px)] min-h-[420px] min-w-0 flex-col overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] shadow-sm lg:h-[calc(100dvh-15rem)]">
        <div className="border-b border-[var(--line)] px-4 py-3">
          <div className="flex items-center gap-2 text-sm font-semibold"><MousePointerClick size={16}/>{t.visual.title}</div>
        </div>
        <div className="flex flex-1 items-center justify-center p-6 text-center text-sm text-[var(--muted)]">
          {t.visual.empty}
        </div>
      </div>
    );
  }

  const hasOnlyText = element.children.length === 0;
  const apply = (fn: () => void) => { fn(); onChange(); };

  return (
    <div data-lenis-prevent className="flex h-[min(72vh,760px)] min-h-[420px] min-w-0 flex-col overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] shadow-sm lg:h-[calc(100dvh-15rem)]">
      <div className="border-b border-[var(--line)] px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-semibold"><MousePointerClick size={16}/>{t.visual.title}</div>
        <p className="mt-1 truncate text-xs text-[var(--muted)]">{t.visual.selected} <span className="font-mono text-[var(--accent)]">&lt;{element.tagName.toLowerCase()}&gt;</span></p>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto p-4">
        {hasOnlyText && (
          <label className="block">
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase text-[var(--muted)]"><Type size={13}/>{t.visual.text}</span>
            <input
              defaultValue={element.textContent ?? ''}
              onChange={(event) => apply(() => { element.textContent = event.target.value; })}
              className="mt-2 w-full rounded-xl border border-[var(--line)] bg-transparent px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
            />
          </label>
        )}

        <SwatchGroup
          label={t.visual.background}
          options={backgroundSwatches}
          active={getMatchingClass(element, bgColorPattern)}
          onPick={(className) => apply(() => setBackgroundColor(element, className))}
        />

        <SwatchGroup
          label={t.visual.textColor}
          options={textColorSwatches}
          active={getMatchingClass(element, textColorPattern)}
          onPick={(className) => apply(() => setTextColor(element, className))}
        />

        <ButtonGroup
          label={t.visual.textSize}
          options={fontSizeOptions}
          active={getMatchingClass(element, fontSizePattern)}
          onPick={(className) => apply(() => setFontSize(element, className))}
        />

        <ButtonGroup
          label={t.visual.weight}
          options={fontWeightOptions}
          active={getMatchingClass(element, fontWeightPattern)}
          onPick={(className) => apply(() => setFontWeight(element, className))}
        />

        <div>
          <p className="mb-2 text-xs font-semibold uppercase text-[var(--muted)]">{t.visual.align}</p>
          <div className="flex gap-1.5">
            {alignOptions.map((item) => {
              const Icon = alignIcons[item.className as keyof typeof alignIcons];
              const active = getMatchingClass(element, alignPattern) === item.className;
              return (
                <button
                  key={item.className}
                  title={optionLabel(item)}
                  aria-label={optionLabel(item)}
                  onClick={() => apply(() => setTextAlign(element, item.className))}
                  className={`flex size-9 items-center justify-center rounded-lg border transition ${active ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]' : 'border-[var(--line)] text-[var(--muted)] hover:text-[var(--foreground)]'}`}
                >
                  <Icon size={15}/>
                </button>
              );
            })}
          </div>
        </div>

        <ButtonGroup
          label={t.visual.radius}
          options={radiusOptions}
          active={getMatchingClass(element, radiusPattern)}
          onPick={(className) => apply(() => setRadius(element, className))}
        />

        <ButtonGroup
          label={t.visual.padding}
          options={paddingOptions}
          active={getMatchingClass(element, paddingPattern)}
          onPick={(className) => apply(() => setPadding(element, className))}
        />
      </div>
    </div>
  );
}
