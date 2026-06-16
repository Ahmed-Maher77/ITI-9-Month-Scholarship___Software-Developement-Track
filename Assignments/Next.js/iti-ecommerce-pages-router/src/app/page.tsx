import Link from 'next/link';
import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import { auth } from '@/auth';
import { getProductsFromDb } from '@/lib/product-service';
import { GUEST_PRODUCT_LIMIT } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const session = await auth();
  const isGuest = !session?.user;
  const limit = isGuest ? GUEST_PRODUCT_LIMIT : 4;
  const featuredProducts = await getProductsFromDb({ limit });

  return (
    <div className="pb-16">
      <section className="relative border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-1.5 text-xs font-medium text-[var(--color-text-muted)]">
              <span className="flex h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
              New Collection Just Landed
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl leading-[1.1]">
              Discover a New Era of{' '}
              <span className="text-[var(--color-primary)]">
                Premium Shopping
              </span>
            </h1>
            <p className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mx-auto">
              Explore curated, high-quality collections designed with you in mind. From trendsetting beauty products to top-tier electronics, find everything you need on ShopSphere.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-lg bg-[var(--color-primary)] px-6 py-3 text-base font-semibold text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary-hover)] active:scale-[0.98] transition-all"
              >
                Shop All Products
                <svg
                  className="ml-2 -mr-1 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              {isGuest && (
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-6 py-3 text-base font-semibold text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] transition-all"
                >
                  Sign in for full catalog
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="featured" className="mt-20 md:mt-28">
        <Container>
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
              Featured Products
            </h2>
            <p className="mt-4 max-w-2xl text-base text-[var(--color-text-muted)]">
              {isGuest
                ? `Preview ${GUEST_PRODUCT_LIMIT} handpicked products — sign in to see more.`
                : 'Browse our handpicked selection of top-selling products. High quality guaranteed.'}
            </p>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} priority={index < 4} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <svg className="w-12 h-12 text-[var(--color-border-strong)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-4 text-lg text-[var(--color-text-muted)]">
                No products yet. Run <code className="text-sm">npm run seed</code> to populate the database.
              </p>
            </div>
          )}

          <div className="mt-12 flex justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-6 py-2.5 text-sm font-semibold text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)] transition-all"
            >
              View All Products
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
