/**
 * @registry
 * name: RTL Direction Toggle
 * category: Toggle
 * style: SaaS
 * tags: recent
 * description: Bascule de sens de lecture LTR / RTL qui retourne un aperçu d'interface (navigation, chat, formulaire) grâce aux propriétés logiques CSS.
 * prompt: Create an LTR / RTL direction toggle: a segmented radiogroup (LTR English / RTL العربية) that sets dir on a preview card; the preview uses logical properties (ms-, me-, ps-, pe-, text-start, rounded-s/e) so the sidebar, chat bubbles, form labels, icons that imply direction (chevrons flipped with rtl:rotate-180) and progress bars mirror correctly; the language-specific text swaps; a note explains logical properties; announced via aria-live. Light and dark mode.
 */
'use client';
import { ChevronRight, Search } from 'lucide-react';
import { useState } from 'react';

const copy = {
  ltr: { title: 'Messages', search: 'Search', them: 'Is the order shipped?', me: 'Yes, it arrives tomorrow.', label: 'Reply', send: 'Send', nav: ['Inbox', 'Sent', 'Archive'] },
  rtl: { title: 'الرسائل', search: 'بحث', them: 'هل تم شحن الطلب؟', me: 'نعم، سيصل غدًا.', label: 'الرد', send: 'إرسال', nav: ['الوارد', 'المرسل', 'الأرشيف'] },
};

export function RtlDirectionToggle() {
  const [dir, setDir] = useState<'ltr' | 'rtl'>('rtl');
  const text = copy[dir];

  return (
    <div className="w-full max-w-lg">
      <div role="radiogroup" aria-label="Text direction" className="inline-grid grid-cols-2 rounded-xl bg-zinc-100 p-1 text-sm dark:bg-zinc-900">{([['ltr', 'LTR · English'], ['rtl', 'RTL · العربية']] as const).map(([value, label]) => <button key={value} type="button" role="radio" aria-checked={dir === value} onClick={() => setDir(value)} className={`rounded-lg px-3 py-1.5 font-medium ${dir === value ? 'bg-white text-zinc-950 shadow-sm dark:bg-zinc-700 dark:text-white' : 'text-zinc-500'}`}>{label}</button>)}</div>
      <p aria-live="polite" className="sr-only">Direction {dir === 'rtl' ? 'right to left' : 'left to right'}</p>
      <div dir={dir} lang={dir === 'rtl' ? 'ar' : 'en'} className="mt-3 flex overflow-hidden rounded-2xl border border-zinc-200 bg-white text-start dark:border-zinc-800 dark:bg-zinc-950">
        <nav aria-label={text.title} className="w-28 shrink-0 border-e border-zinc-200 bg-zinc-50 p-2 dark:border-zinc-800 dark:bg-zinc-900">{text.nav.map((item, index) => <a key={item} href="#" className={`flex items-center justify-between rounded-md px-2 py-1.5 text-sm ${index === 0 ? 'bg-white font-medium text-zinc-950 shadow-sm dark:bg-zinc-800 dark:text-white' : 'text-zinc-600 dark:text-zinc-400'}`}>{item}<ChevronRight aria-hidden className="size-3.5 rtl:rotate-180" /></a>)}</nav>
        <div className="min-w-0 flex-1 p-3">
          <div className="flex items-center gap-2"><h3 className="flex-1 font-semibold text-zinc-950 dark:text-white">{text.title}</h3><span className="flex items-center gap-1 rounded-md bg-zinc-100 px-2 py-1 text-xs text-zinc-500 dark:bg-zinc-800"><Search aria-hidden className="size-3" />{text.search}</span></div>
          <p className="me-8 mt-3 w-fit rounded-2xl rounded-ss-md bg-zinc-100 px-3 py-2 text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">{text.them}</p>
          <p className="ms-auto mt-2 w-fit rounded-2xl rounded-se-md bg-indigo-600 px-3 py-2 text-sm text-white">{text.me}</p>
          <label className="mt-3 block text-xs text-zinc-500">{text.label}<span className="mt-1 flex gap-2"><input className="min-w-0 flex-1 rounded-lg border border-zinc-300 bg-transparent px-2 py-1.5 text-sm text-zinc-900 dark:border-zinc-700 dark:text-zinc-100" /><button type="button" className="rounded-lg bg-zinc-950 px-3 text-xs font-semibold text-white dark:bg-white dark:text-zinc-950">{text.send}</button></span></label>
          <div className="mt-3 h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800"><div className="h-full w-2/3 rounded-full bg-indigo-500" /></div>
        </div>
      </div>
      <p className="mt-2 text-xs text-zinc-500">Built with logical properties: <code className="font-mono">ms-*</code>, <code className="font-mono">border-e</code>, <code className="font-mono">rounded-ss-*</code>, <code className="font-mono">text-start</code>.</p>
    </div>
  );
}
