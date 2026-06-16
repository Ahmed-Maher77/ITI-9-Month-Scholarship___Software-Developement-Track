'use client';

import { useEffect, useState } from 'react';
import type { FeedNews, FeedQuote } from '@/lib/fetch-feed';

interface ToastItem {
  id: string;
  type: 'quote' | 'news';
  title: string;
  body: string;
}

interface ToastHostProps {
  quotes: FeedQuote[];
  news: FeedNews[];
}

const TOAST_DURATION = 6000;

export default function ToastHost({ quotes, news }: ToastHostProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const items: ToastItem[] = [
      ...quotes.map((q) => ({
        id: `quote-${q.id}`,
        type: 'quote' as const,
        title: `Quote by ${q.author}`,
        body: q.quote,
      })),
      ...news.map((n) => ({
        id: `news-${n.id}`,
        type: 'news' as const,
        title: n.title,
        body: n.body,
      })),
    ];

    if (items.length === 0) return;

    const staggerTimers = items.map((item, index) =>
      window.setTimeout(() => {
        setToasts((prev) => [...prev, item]);

        window.setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== item.id));
        }, TOAST_DURATION);
      }, index * 800)
    );

    return () => staggerTimers.forEach(clearTimeout);
  }, [quotes, news]);

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-20 right-4 z-[100] flex flex-col gap-3 w-full max-w-sm pointer-events-none"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto toast-enter rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4 shadow-lg"
          role="status"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                    toast.type === 'quote'
                      ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)]'
                      : 'bg-[var(--color-accent-light)] text-[var(--color-accent)]'
                  }`}
                >
                  {toast.type === 'quote' ? 'Quote' : 'News'}
                </span>
              </div>
              <p className="text-sm font-semibold text-[var(--color-text-primary)] line-clamp-1">
                {toast.title}
              </p>
              <p className="mt-1 text-xs text-[var(--color-text-secondary)] line-clamp-3">
                {toast.body}
              </p>
            </div>
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              className="shrink-0 rounded-md p-1 text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]"
              aria-label="Dismiss"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
