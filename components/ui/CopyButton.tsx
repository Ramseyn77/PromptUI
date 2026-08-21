'use client';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import type { AnalyticsEventType } from '@/utils/analytics';
import { trackEvent } from '@/utils/analytics';

export function CopyButton({ value, label, analyticsType, componentSlug, componentName }: { value: string; label: string; analyticsType?: AnalyticsEventType; componentSlug?: string; componentName?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(value);
    if (analyticsType) trackEvent({ type: analyticsType, componentSlug, componentName });
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }
  return <button onClick={copy} className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-3.5 py-2 text-sm font-semibold text-[var(--foreground)] shadow-sm transition hover:-translate-y-0.5">{copied ? <Check size={15}/> : <Copy size={15}/>} {copied ? 'Copie' : label}</button>;
}
