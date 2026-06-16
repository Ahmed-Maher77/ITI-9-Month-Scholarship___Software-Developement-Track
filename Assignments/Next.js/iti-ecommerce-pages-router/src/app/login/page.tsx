import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Container from '@/components/Container';
import { LoginButtons } from '@/components/AuthButton';
import { auth } from '@/auth';
import { GUEST_PRODUCT_LIMIT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to ShopSphere to access the full catalog and admin tools.',
};

interface PageProps {
  searchParams: Promise<{ callbackUrl?: string }>;
}

export default async function LoginPage({ searchParams }: PageProps) {
  const session = await auth();
  const params = await searchParams;
  const callbackUrl = params.callbackUrl ?? '/products';

  if (session?.user) {
    redirect(callbackUrl);
  }

  return (
    <div className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Welcome to ShopSphere
          </h1>
          <p className="mt-3 text-sm text-[var(--color-text-muted)]">
            Sign in to browse all products, use search &amp; filters, and manage the catalog.
          </p>

          <div className="mt-8 flex justify-center">
            <LoginButtons callbackUrl={callbackUrl} />
          </div>

          <p className="mt-8 text-xs text-[var(--color-text-muted)]">
            Guests can preview {GUEST_PRODUCT_LIMIT} products.{' '}
            <Link href="/products" className="text-[var(--color-primary)] hover:underline">
              Continue as guest
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
}
