'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Container from '@/components/Container';

export default function ProductDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Product details page error:', error);
  }, [error]);

  return (
    <Container className="py-20 flex flex-col items-center justify-center text-center">
      <div className="rounded-full bg-[var(--color-error-light)] p-4 text-[var(--color-error)]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
      </div>
      <h2 className="mt-6 text-2xl font-bold text-[var(--color-text-primary)]">Failed to load product details</h2>
      <p className="mt-2 max-w-md text-sm text-[var(--color-text-muted)] leading-relaxed">
        There was an error retrieving the details for this product. It may have been removed or there could be a network issue.
      </p>
      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => reset()}
          className="rounded-xl bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-[var(--color-primary-foreground)] shadow-md hover:bg-[var(--color-primary-hover)] transition-all active:scale-[0.98]"
        >
          Try Again
        </button>
        <Link
          href="/products"
          className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-5 py-3 text-sm font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] transition-all"
        >
          Back to Products
        </Link>
      </div>
    </Container>
  );
}
