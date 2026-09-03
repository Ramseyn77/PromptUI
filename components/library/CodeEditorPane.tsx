'use client';

import { useRef } from 'react';
import { highlightHtml } from '@/utils/highlightHtml';

export function CodeEditorPane({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const preRef = useRef<HTMLPreElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const syncScroll = () => {
    if (!preRef.current || !textareaRef.current) return;
    preRef.current.scrollTop = textareaRef.current.scrollTop;
    preRef.current.scrollLeft = textareaRef.current.scrollLeft;
  };

  return (
    <div className="relative min-h-0 flex-1">
      <pre
        ref={preRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-auto whitespace-pre-wrap break-words p-4 font-mono text-[13px] leading-6 text-zinc-200"
        dangerouslySetInnerHTML={{ __html: `${highlightHtml(value)}\n` }}
      />
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onScroll={syncScroll}
        spellCheck={false}
        className="absolute inset-0 h-full w-full resize-none overflow-auto whitespace-pre-wrap break-words bg-transparent p-4 font-mono text-[13px] leading-6 text-transparent caret-white outline-none"
      />
    </div>
  );
}
