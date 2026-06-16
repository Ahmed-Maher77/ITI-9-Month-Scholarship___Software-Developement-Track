import type { Metadata } from 'next';
import { Suspense } from 'react';
import Container from '@/components/Container';
import ProductFilters from '@/components/ProductFilters';
import GuestProductsView from '@/components/GuestProductsView';
import { GridSkeleton } from '@/components/Skeleton';
import { auth } from '@/auth';
import { getCategoriesFromDb, getProductsFromDb } from '@/lib/product-service';
import { GUEST_PRODUCT_LIMIT } from '@/lib/constants';
import type { SortOption } from '@/lib/products';

export const metadata: Metadata = {
  title: 'All Products',
  description: 'Browse all premium products available on ShopSphere. High quality items at discounted rates.',
};

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    sort?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const session = await auth();
  const isGuest = !session?.user;
  const params = await searchParams;
  const q = params.q;
  const category = params.category;
  const sort = (params.sort as SortOption) ?? '';

  if (isGuest) {
    const products = await getProductsFromDb({ limit: GUEST_PRODUCT_LIMIT });

    return (
      <div className="py-12 md:py-20">
        <Container>
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
              All Products
            </h1>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              Preview our collection — sign in for the full catalog
            </p>
          </div>
          <GuestProductsView products={products} />
        </Container>
      </div>
    );
  }

  const [products, categories] = await Promise.all([
    getProductsFromDb({ q, category, sort }),
    getCategoriesFromDb(),
  ]);

  return (
    <div className="py-12 md:py-20">
      <Container>
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            All Products
          </h1>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Search, filter, and sort our premium collection
          </p>
        </div>

        <Suspense fallback={<GridSkeleton count={8} />}>
          <ProductFilters
            categories={categories}
            products={products}
            initialQ={q ?? ''}
            initialCategory={category ?? ''}
            initialSort={sort}
          />
        </Suspense>
      </Container>
    </div>
  );
}
