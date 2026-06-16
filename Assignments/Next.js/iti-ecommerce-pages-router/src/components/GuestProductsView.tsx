import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/types/product';
import { GUEST_PRODUCT_LIMIT } from '@/lib/constants';

interface GuestProductsViewProps {
  products: Product[];
}

export default function GuestProductsView({ products }: GuestProductsViewProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4 sm:px-6">
        <p className="text-sm text-[var(--color-text-secondary)]">
          Showing <strong>{products.length}</strong> of our collection.{' '}
          <Link href="/login" className="font-semibold text-[var(--color-primary)] hover:underline">
            Sign in
          </Link>{' '}
          to browse all products, search, filter, and sort.
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 3} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">No products found</h2>
        </div>
      )}

      {products.length >= GUEST_PRODUCT_LIMIT && (
        <div className="flex justify-center pt-4">
          <Link
            href="/login?callbackUrl=/products"
            className="inline-flex items-center justify-center rounded-lg bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary-hover)] transition-all"
          >
            Sign in to see all products
          </Link>
        </div>
      )}
    </div>
  );
}
