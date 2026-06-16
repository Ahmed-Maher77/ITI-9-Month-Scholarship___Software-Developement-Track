import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import DeleteProductButton from '@/components/DeleteProductButton';
import { getProductsFromDb } from '@/lib/product-service';

export const metadata: Metadata = {
  title: 'Admin — Products',
  description: 'Manage products in ShopSphere.',
};

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const products = await getProductsFromDb();

  return (
    <div className="py-12 md:py-20">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
              Admin — Products
            </h1>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              {products.length} product{products.length !== 1 ? 's' : ''} in catalog
            </p>
          </div>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center justify-center rounded-lg bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary-hover)] transition-all"
          >
            Add Product
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[var(--color-border)] py-16 text-center">
            <p className="text-[var(--color-text-muted)]">No products in the database yet.</p>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              Run <code className="rounded bg-[var(--color-surface)] px-1.5 py-0.5">npm run seed</code> or add one manually.
            </p>
            <Link
              href="/admin/products/new"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary-hover)] transition-all"
            >
              Add First Product
            </Link>
          </div>
        ) : (
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-surface)] border-b border-[var(--color-border)]">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-[var(--color-text-secondary)]">Title</th>
                <th className="px-4 py-3 text-left font-semibold text-[var(--color-text-secondary)]">Category</th>
                <th className="px-4 py-3 text-left font-semibold text-[var(--color-text-secondary)]">Price</th>
                <th className="px-4 py-3 text-left font-semibold text-[var(--color-text-secondary)]">Rating</th>
                <th className="px-4 py-3 text-right font-semibold text-[var(--color-text-secondary)]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {products.map((product) => (
                <tr key={product.id} className="bg-[var(--color-surface-elevated)]">
                  <td className="px-4 py-3 font-medium text-[var(--color-text-primary)]">{product.title}</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">{product.category}</td>
                  <td className="px-4 py-3 text-[var(--color-text-primary)]">${product.price.toFixed(2)}</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">{product.rating.toFixed(1)}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="rounded-md px-3 py-1.5 text-xs font-medium text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition-colors"
                      >
                        Edit
                      </Link>
                      <DeleteProductButton productId={product.id} productTitle={product.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </Container>
    </div>
  );
}
