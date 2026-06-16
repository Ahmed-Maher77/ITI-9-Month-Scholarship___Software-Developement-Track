import Link from 'next/link';
import Container from '@/components/Container';

export default function NotFound() {
  return (
    <Container className="py-24 flex flex-col items-center justify-center text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.2"
        stroke="currentColor"
        className="w-32 h-32 text-[var(--color-primary)]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
        />
      </svg>

      <h1 className="mt-8 text-6xl font-black tracking-tight text-[var(--color-text-primary)]">404</h1>
      <h2 className="mt-4 text-2xl font-bold text-[var(--color-text-secondary)]">Page Not Found</h2>
      
      <p className="mt-4 max-w-md text-sm text-[var(--color-text-muted)] leading-relaxed">
        The page you are looking for doesn&apos;t exist, or has been moved to another URL. Let&apos;s get you back on track.
      </p>

      <div className="mt-10 flex gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl bg-[var(--color-primary)] px-6 py-3.5 text-base font-semibold text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary-hover)] active:scale-[0.98] transition-all"
        >
          Go Back Home
        </Link>
        <Link
          href="/products"
          className="inline-flex items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-6 py-3.5 text-base font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] active:scale-[0.98] transition-all"
        >
          Browse Products
        </Link>
      </div>
    </Container>
  );
}
