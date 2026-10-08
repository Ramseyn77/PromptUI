/**
 * @registry
 * name: Toast Stack
 * category: Tooltips
 * style: Minimal
 * tags: featured, recent
 * description: Notifications empilées façon Sonner : elles se superposent, s'étalent au survol et se ferment seules.
 * prompt: Create a Sonner-style toast stack: buttons trigger Success, Error, Promise (loading then resolved) and Action (with Undo) toasts; toasts stack at the bottom with the newest in front and older ones scaled down and offset behind; hovering or focusing the stack expands it into a full list; each toast auto-dismisses after 4s (paused while expanded) and has a close button. aria-live="polite" region; transitions disabled with reduced motion. Light and dark mode.
 */
'use client';
import { CheckCircle2, Info, Loader2, X, XCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Toast = { id: number; kind: 'success' | 'error' | 'loading' | 'info'; title: string; text: string; action?: boolean; sticky?: boolean };
const icons = { success: CheckCircle2, error: XCircle, loading: Loader2, info: Info };
const tones = { success: 'text-emerald-500', error: 'text-rose-500', loading: 'text-zinc-400 motion-safe:animate-spin', info: 'text-sky-500' };

export function ToastStack() {
  const [toasts, setToasts] = useState<Toast[]>([
    { id: -3, kind: 'info', title: 'New comment', text: 'Malik replied to your design', sticky: true },
    { id: -2, kind: 'error', title: 'Sync paused', text: 'Reconnect to resume uploads', sticky: true },
    { id: -1, kind: 'success', title: 'Event created', text: 'Sunday, Oct 4 at 9:00', sticky: true },
  ]);
  const [expanded, setExpanded] = useState(false);
  const serial = useRef(1);

  const dismiss = (id: number) => setToasts((list) => list.filter((toast) => toast.id !== id));

  function push(toast: Omit<Toast, 'id'>) {
    const id = serial.current++;
    setToasts((list) => [...list.slice(-3), { ...toast, id }]);
    return id;
  }

  useEffect(() => {
    if (expanded) return;
    const timers = toasts.filter((toast) => toast.kind !== 'loading' && !toast.sticky).map((toast) => window.setTimeout(() => dismiss(toast.id), 4000));
    return () => timers.forEach(window.clearTimeout);
  }, [toasts, expanded]);

  function promise() {
    const id = push({ kind: 'loading', title: 'Uploading report…', text: 'report-q3.pdf' });
    window.setTimeout(() => setToasts((list) => list.map((toast) => (toast.id === id ? { ...toast, kind: 'success', title: 'Report uploaded', text: '2.4 MB · shared with team' } : toast))), 1800);
  }

  const trigger = 'rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800';

  return (
    <div className="flex h-[25rem] w-full max-w-sm flex-col">
      <div className="flex flex-wrap gap-2">
        <button type="button" className={trigger} onClick={() => push({ kind: 'success', title: 'Changes saved', text: 'Your profile is up to date.' })}>Success</button>
        <button type="button" className={trigger} onClick={() => push({ kind: 'error', title: 'Payment failed', text: 'Your card was declined.' })}>Error</button>
        <button type="button" className={trigger} onClick={promise}>Promise</button>
        <button type="button" className={trigger} onClick={() => push({ kind: 'info', title: 'Message archived', text: '1 conversation moved.', action: true })}>Action</button>
      </div>
      <ol
        aria-live="polite"
        aria-label="Notifications"
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        onFocus={() => setExpanded(true)}
        onBlur={() => setExpanded(false)}
        className="relative mt-4 flex-1"
      >
        {toasts.map((toast, index) => {
          const depth = toasts.length - 1 - index;
          const Icon = icons[toast.kind];
          const offset = expanded ? -depth * 76 : -depth * 12;
          return (
            <li
              key={toast.id}
              className="absolute inset-x-0 bottom-0 flex items-start gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-lg transition-all duration-300 motion-reduce:transition-none dark:border-zinc-800 dark:bg-zinc-900"
              style={{ transform: `translateY(${offset}px) scale(${expanded ? 1 : 1 - depth * 0.05})`, opacity: depth > 2 ? 0 : 1, zIndex: index }}
            >
              <Icon aria-hidden className={`mt-0.5 size-4 shrink-0 ${tones[toast.kind]}`} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{toast.title}</p>
                <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">{toast.text}</p>
              </div>
              {toast.action && <button type="button" onClick={() => dismiss(toast.id)} className="rounded-md bg-zinc-950 px-2 py-1 text-xs font-semibold text-white dark:bg-white dark:text-zinc-950">Undo</button>}
              <button type="button" aria-label="Dismiss notification" onClick={() => dismiss(toast.id)} className="grid size-6 place-items-center rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"><X aria-hidden className="size-3.5" /></button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
