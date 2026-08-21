export type AnalyticsEventType =
  | 'visitor'
  | 'return'
  | 'component_view'
  | 'code_copied'
  | 'prompt_copied'
  | 'share'
  | 'feedback';

export type FeedbackPayload = {
  useful: 'Oui' | 'Peut-etre' | 'Non';
  favorite: 'Code' | 'Prompt IA' | 'Preview' | 'Autre';
  missing: string;
};

export type AnalyticsEvent = {
  id: string;
  type: AnalyticsEventType;
  visitorId: string;
  path: string;
  componentSlug?: string;
  componentName?: string;
  payload?: FeedbackPayload | Record<string, string>;
  createdAt: string;
};

export type FeedbackRecord = FeedbackPayload & {
  id: string;
  visitorId: string;
  createdAt: string;
};

type SupabaseEventRow = {
  id: string;
  type: AnalyticsEventType;
  visitor_id: string | null;
  path: string | null;
  component_slug: string | null;
  component_name: string | null;
  payload: FeedbackPayload | Record<string, string> | null;
  created_at: string;
};

type SupabaseFeedbackRow = {
  id: string;
  useful: FeedbackPayload['useful'] | null;
  favorite: FeedbackPayload['favorite'] | null;
  missing: string | null;
  visitor_id: string | null;
  created_at: string;
};

const EVENTS_KEY = 'promptui-analytics-events';
const VISITOR_KEY = 'promptui-visitor-id';
const LAST_SEEN_KEY = 'promptui-last-seen';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function canUseStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage);
}

function hasSupabase() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

function createId(prefix: string) {
  const cryptoId = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
  return `${prefix}-${cryptoId}`;
}

function supabaseHeaders(prefer?: string) {
  return {
    apikey: supabaseAnonKey ?? '',
    Authorization: `Bearer ${supabaseAnonKey ?? ''}`,
    'Content-Type': 'application/json',
    ...(prefer ? { Prefer: prefer } : {}),
  };
}

async function supabaseRequest<T>(path: string, init?: RequestInit): Promise<T | null> {
  if (!hasSupabase()) return null;
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
      ...init,
      headers: {
        ...supabaseHeaders(init?.method === 'POST' ? 'return=minimal' : undefined),
        ...init?.headers,
      },
    });
    if (!response.ok) return null;
    if (response.status === 204) return null;
    return await response.json() as T;
  } catch {
    return null;
  }
}

function toEvent(row: SupabaseEventRow): AnalyticsEvent {
  return {
    id: row.id,
    type: row.type,
    visitorId: row.visitor_id ?? 'unknown',
    path: row.path ?? '/',
    componentSlug: row.component_slug ?? undefined,
    componentName: row.component_name ?? undefined,
    payload: row.payload ?? undefined,
    createdAt: row.created_at,
  };
}

function toFeedback(row: SupabaseFeedbackRow): FeedbackRecord {
  return {
    id: row.id,
    useful: row.useful ?? 'Peut-etre',
    favorite: row.favorite ?? 'Autre',
    missing: row.missing ?? '',
    visitorId: row.visitor_id ?? 'unknown',
    createdAt: row.created_at,
  };
}

export function getVisitorId() {
  if (!canUseStorage()) return 'server';
  const existing = localStorage.getItem(VISITOR_KEY);
  if (existing) return existing;
  const visitorId = createId('visitor');
  localStorage.setItem(VISITOR_KEY, visitorId);
  return visitorId;
}

export function getAnalyticsEvents(): AnalyticsEvent[] {
  if (!canUseStorage()) return [];
  try {
    return JSON.parse(localStorage.getItem(EVENTS_KEY) ?? '[]') as AnalyticsEvent[];
  } catch {
    return [];
  }
}

export async function getRemoteAnalytics() {
  const [eventRows, feedbackRows] = await Promise.all([
    supabaseRequest<SupabaseEventRow[]>('events?select=*&order=created_at.desc&limit=500'),
    supabaseRequest<SupabaseFeedbackRow[]>('feedback?select=*&order=created_at.desc&limit=100'),
  ]);

  return {
    events: eventRows?.map(toEvent) ?? [],
    feedback: feedbackRows?.map(toFeedback) ?? [],
    usingSupabase: Boolean(eventRows || feedbackRows),
  };
}

async function sendEventToSupabase(event: AnalyticsEvent) {
  await supabaseRequest('events', {
    method: 'POST',
    body: JSON.stringify({
      type: event.type,
      visitor_id: event.visitorId,
      path: event.path,
      component_slug: event.componentSlug ?? null,
      component_name: event.componentName ?? null,
      payload: event.payload ?? null,
      created_at: event.createdAt,
    }),
  });

  if (event.type === 'feedback' && event.payload) {
    const payload = event.payload as FeedbackPayload;
    await supabaseRequest('feedback', {
      method: 'POST',
      body: JSON.stringify({
        useful: payload.useful,
        favorite: payload.favorite,
        missing: payload.missing,
        visitor_id: event.visitorId,
      }),
    });
  }
}

export function trackEvent(event: Omit<AnalyticsEvent, 'id' | 'visitorId' | 'path' | 'createdAt'> & { path?: string }) {
  if (!canUseStorage()) return;
  const events = getAnalyticsEvents();
  const next: AnalyticsEvent = {
    id: createId('event'),
    visitorId: getVisitorId(),
    path: event.path ?? window.location.pathname,
    createdAt: new Date().toISOString(),
    ...event,
  };
  localStorage.setItem(EVENTS_KEY, JSON.stringify([...events, next].slice(-500)));
  void sendEventToSupabase(next);
  window.dispatchEvent(new Event('promptui-analytics-updated'));
}

export function trackVisit(path: string) {
  if (!canUseStorage()) return;
  const lastSeen = localStorage.getItem(LAST_SEEN_KEY);
  const now = Date.now();
  const last = lastSeen ? Number(lastSeen) : 0;
  const hasVisitor = Boolean(localStorage.getItem(VISITOR_KEY));

  if (!hasVisitor) {
    trackEvent({ type: 'visitor', path });
  } else if (last && now - last > 1000 * 60 * 60 * 6) {
    trackEvent({ type: 'return', path });
  }

  localStorage.setItem(LAST_SEEN_KEY, String(now));
}

export function clearAnalyticsEvents() {
  if (!canUseStorage()) return;
  localStorage.removeItem(EVENTS_KEY);
  window.dispatchEvent(new Event('promptui-analytics-updated'));
}
