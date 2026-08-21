'use client';

import { BarChart3, ClipboardCopy, Eye, MessageSquare, RefreshCw, Share2, Sparkles, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { AnalyticsEvent, FeedbackRecord, getAnalyticsEvents, getRemoteAnalytics } from '@/utils/analytics';

const labels: Record<AnalyticsEvent['type'], string> = {
  visitor: 'Visiteur',
  return: 'Retour',
  component_view: 'Composant vu',
  code_copied: 'Code copie',
  prompt_copied: 'Prompt copie',
  share: 'Partage',
  feedback: 'Feedback',
};

const metricConfig = [
  ['Visiteurs', 'Acquisition', 'visitor', Users],
  ['Composants vus', 'Interet', 'component_view', Eye],
  ['Code copie', 'Utilite reelle', 'code_copied', ClipboardCopy],
  ['Prompt copie', 'Validation de l idee', 'prompt_copied', Sparkles],
  ['Retours', 'Interet durable', 'return', RefreshCw],
  ['Partages', 'Potentiel viral', 'share', Share2],
] as const;

export function AnalyticsDashboard() {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [feedback, setFeedback] = useState<FeedbackRecord[]>([]);
  const [source, setSource] = useState<'supabase' | 'local'>('local');

  async function sync() {
    const remote = await getRemoteAnalytics();
    if (remote.usingSupabase) {
      setEvents(remote.events);
      setFeedback(remote.feedback);
      setSource('supabase');
      return;
    }
    const localEvents = getAnalyticsEvents();
    setEvents(localEvents);
    setFeedback(localEvents.filter((event) => event.type === 'feedback').map((event) => {
      const payload = event.payload as any;
      return {
        id: event.id,
        useful: payload?.useful ?? 'Peut-etre',
        favorite: payload?.favorite ?? 'Autre',
        missing: payload?.missing ?? '',
        visitorId: event.visitorId,
        createdAt: event.createdAt,
      };
    }));
    setSource('local');
  }

  useEffect(() => {
    void sync();
    const onSync = () => void sync();
    window.addEventListener('promptui-analytics-updated', onSync);
    window.addEventListener('storage', onSync);
    return () => {
      window.removeEventListener('promptui-analytics-updated', onSync);
      window.removeEventListener('storage', onSync);
    };
  }, []);

  const metrics = useMemo(() => {
    const uniqueVisitors = new Set(events.map((event) => event.visitorId)).size;
    return {
      visitor: uniqueVisitors,
      return: events.filter((event) => event.type === 'return').length,
      component_view: events.filter((event) => event.type === 'component_view').length,
      code_copied: events.filter((event) => event.type === 'code_copied').length,
      prompt_copied: events.filter((event) => event.type === 'prompt_copied').length,
      share: events.filter((event) => event.type === 'share').length,
    };
  }, [events]);

  const topComponents = useMemo(() => {
    const counts = new Map<string, { name: string; views: number; code: number; prompt: number }>();
    events.forEach((event) => {
      if (!event.componentSlug) return;
      const current = counts.get(event.componentSlug) ?? { name: event.componentName ?? event.componentSlug, views: 0, code: 0, prompt: 0 };
      if (event.type === 'component_view') current.views += 1;
      if (event.type === 'code_copied') current.code += 1;
      if (event.type === 'prompt_copied') current.prompt += 1;
      counts.set(event.componentSlug, current);
    });
    return [...counts.values()].sort((a, b) => b.views + b.code + b.prompt - (a.views + a.code + a.prompt)).slice(0, 8);
  }, [events]);

  const timeline = events.slice().reverse().slice(0, 30);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex flex-col justify-between gap-4 border-b border-[var(--line)] pb-8 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold text-[var(--accent)]">Analytics produit</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">Parcours et feedback</h1>
          <p className="mt-3 max-w-2xl text-[var(--muted)]">Parcours : visiteur, composant consulte, code copie, prompt copie, retour et partage.</p>
          <p className="mt-2 text-sm text-[var(--muted)]">Source actuelle : {source === 'supabase' ? 'Supabase' : 'localStorage fallback'}</p>
        </div>
        <button onClick={() => void sync()} className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold shadow-sm">
          <RefreshCw size={15}/>
          Actualiser
        </button>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {metricConfig.map(([title, hint, key, Icon]) => (
          <article key={key} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--muted)]">{title}</p>
                <p className="mt-2 text-3xl font-semibold">{metrics[key]}</p>
              </div>
              <div className="grid size-11 place-items-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]"><Icon size={19}/></div>
            </div>
            <p className="mt-4 text-xs uppercase text-[var(--muted)]">{hint}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_.85fr]">
        <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm">
          <div className="flex items-center gap-2 font-semibold"><BarChart3 size={17}/>Composants les plus engages</div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="text-xs uppercase text-[var(--muted)]">
                <tr><th className="py-3">Composant</th><th>Vues</th><th>Code</th><th>Prompt</th></tr>
              </thead>
              <tbody>
                {topComponents.length ? topComponents.map((item) => (
                  <tr key={item.name} className="border-t border-[var(--line)]">
                    <td className="py-3 font-medium">{item.name}</td>
                    <td>{item.views}</td>
                    <td>{item.code}</td>
                    <td>{item.prompt}</td>
                  </tr>
                )) : <tr><td className="py-6 text-[var(--muted)]" colSpan={4}>Aucune donnee pour le moment.</td></tr>}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm">
          <div className="flex items-center gap-2 font-semibold"><MessageSquare size={17}/>Feedback</div>
          <div className="mt-5 space-y-3">
            {feedback.length ? feedback.map((item) => {
              return (
                <article key={item.id} className="rounded-xl border border-[var(--line)] p-4">
                  <p className="text-sm font-medium">Utile : {item.useful} / Prefere : {item.favorite}</p>
                  <p className="mt-2 text-sm text-[var(--muted)]">{item.missing || 'Pas de manque indique.'}</p>
                </article>
              );
            }) : <p className="text-sm text-[var(--muted)]">Aucun feedback pour le moment.</p>}
          </div>
        </section>
      </div>

      <section className="mt-8 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm">
        <h2 className="font-semibold">Flux recent</h2>
        <div className="mt-4 space-y-2">
          {timeline.length ? timeline.map((event) => (
            <div key={event.id} className="grid gap-2 rounded-xl border border-[var(--line)] px-4 py-3 text-sm md:grid-cols-[160px_1fr_170px]">
              <span className="font-medium">{labels[event.type]}</span>
              <span className="text-[var(--muted)]">{event.componentName ?? event.path}</span>
              <span className="text-xs text-[var(--muted)]">{new Date(event.createdAt).toLocaleString('fr-FR')}</span>
            </div>
          )) : <p className="text-sm text-[var(--muted)]">Aucun evenement enregistre.</p>}
        </div>
      </section>
    </div>
  );
}
