import React from 'react';

// Common shimmer animation classes
const shimmer =
  'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CardSkeleton() {
  return (
    <div className={`flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5 shadow-sm ${shimmer}`}>
      <div className="relative aspect-square w-full rounded-xl bg-[var(--color-surface)]" />
      <div className="mt-4 h-5 w-3/4 rounded-lg bg-[var(--color-border)]" />
      <div className="mt-2 h-4 w-1/2 rounded-lg bg-[var(--color-border)]" />
      <div className="mt-6 flex items-center justify-between">
        <div className="space-y-1 w-1/3">
          <div className="h-3 rounded-md bg-[var(--color-border)]" />
          <div className="h-5 rounded-md bg-[var(--color-border)]" />
        </div>
        <div className="h-9 w-9 rounded-full bg-[var(--color-border)]" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className={`grid grid-cols-1 gap-8 md:grid-cols-2 py-8 md:py-12 ${shimmer}`}>
      <div className="aspect-square w-full rounded-2xl bg-[var(--color-surface)]" />

      <div className="flex flex-col space-y-6">
        <div className="space-y-2">
          <div className="h-5 w-1/4 rounded-md bg-[var(--color-border)]" />
          <div className="h-10 w-3/4 rounded-lg bg-[var(--color-border)]" />
        </div>

        <div className="h-5 w-1/3 rounded-md bg-[var(--color-border)]" />

        <div className="h-10 w-1/4 rounded-lg bg-[var(--color-border)]" />

        <hr className="border-[var(--color-border)]" />

        <div className="space-y-2">
          <div className="h-4 w-full rounded-md bg-[var(--color-border)]" />
          <div className="h-4 w-full rounded-md bg-[var(--color-border)]" />
          <div className="h-4 w-2/3 rounded-md bg-[var(--color-border)]" />
        </div>

        <hr className="border-[var(--color-border)]" />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="h-3 w-1/3 rounded-md bg-[var(--color-border)]" />
            <div className="h-5 w-2/3 rounded-md bg-[var(--color-border)]" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-1/3 rounded-md bg-[var(--color-border)]" />
            <div className="h-5 w-2/3 rounded-md bg-[var(--color-border)]" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-1/3 rounded-md bg-[var(--color-border)]" />
            <div className="h-5 w-2/3 rounded-md bg-[var(--color-border)]" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-1/3 rounded-md bg-[var(--color-border)]" />
            <div className="h-5 w-2/3 rounded-md bg-[var(--color-border)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
