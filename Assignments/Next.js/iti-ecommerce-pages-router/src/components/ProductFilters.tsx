'use client';

import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useOptimistic,
  useState,
  useTransition,
} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/types/product';
import type { SortOption } from '@/lib/products';

interface ProductFiltersProps {
  categories: string[];
  products: Product[];
  initialQ?: string;
  initialCategory?: string;
  initialSort?: SortOption;
}

function filterAndSort(
  items: Product[],
  q: string,
  cat: string,
  sortVal: SortOption
): Product[] {
  const filtered = items.filter((p) => {
    const term = q.trim().toLowerCase();
    const matchesQuery =
      !term ||
      p.title.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term);
    const matchesCategory = !cat || p.category === cat;
    return matchesQuery && matchesCategory;
  });

  const sorted = [...filtered];
  switch (sortVal) {
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'rating-desc':
      sorted.sort((a, b) => b.rating - a.rating);
      break;
  }

  return sorted;
}

export default function ProductFilters({
  categories,
  products,
  initialQ = '',
  initialCategory = '',
  initialSort = '',
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [query, setQuery] = useState(initialQ);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState<SortOption>(initialSort);

  const deferredQuery = useDeferredValue(query);

  const [optimisticProducts, setOptimisticProducts] = useOptimistic(
    products,
    (_current, next: Product[]) => next
  );

  useEffect(() => {
    setQuery(initialQ);
    setCategory(initialCategory);
    setSort(initialSort);
  }, [initialQ, initialCategory, initialSort]);

  const navigateWithFilters = useCallback(
    (q: string, cat: string, sortVal: SortOption) => {
      const params = new URLSearchParams();
      if (q.trim()) params.set('q', q.trim());
      if (cat) params.set('category', cat);
      if (sortVal) params.set('sort', sortVal);

      const qs = params.toString();

      startTransition(() => {
        setOptimisticProducts(filterAndSort(products, q, cat, sortVal));
        router.push(qs ? `/products?${qs}` : '/products');
      });
    },
    [router, products, setOptimisticProducts]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentQ = searchParams.get('q') ?? '';
      if (deferredQuery !== currentQ) {
        navigateWithFilters(deferredQuery, category, sort);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [deferredQuery, category, sort, navigateWithFilters, searchParams]);

  const displayedProducts = useMemo(
    () => filterAndSort(optimisticProducts, deferredQuery, category, sort),
    [optimisticProducts, deferredQuery, category, sort]
  );

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    navigateWithFilters(query, value, sort);
  };

  const handleSortChange = (value: SortOption) => {
    setSort(value);
    navigateWithFilters(query, category, value);
  };

  const isStale = query !== deferredQuery;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex-1 max-w-md">
          <label htmlFor="search" className="block text-xs font-medium text-[var(--color-text-muted)] mb-1.5">
            Search products
          </label>
          <div className="relative">
            <input
              id="search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, description, category..."
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none"
            />
            {(isPending || isStale) && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg className="h-4 w-4 animate-spin text-[var(--color-primary)]" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <div>
            <label htmlFor="category" className="block text-xs font-medium text-[var(--color-text-muted)] mb-1.5">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 py-2.5 text-sm text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:outline-none"
            >
              <option value="">All categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="sort" className="block text-xs font-medium text-[var(--color-text-muted)] mb-1.5">
              Sort by
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => handleSortChange(e.target.value as SortOption)}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 py-2.5 text-sm text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:outline-none"
            >
              <option value="">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Top Rating</option>
            </select>
          </div>
        </div>
      </div>

      <p className="text-sm text-[var(--color-text-muted)]">
        Showing {displayedProducts.length} product{displayedProducts.length !== 1 ? 's' : ''}
        {(isPending || isStale) && ' (updating…)'}
      </p>

      <ProductGrid products={displayedProducts} isPending={isPending || isStale} />
    </div>
  );
}

function ProductGrid({
  products,
  isPending,
}: {
  products: Product[];
  isPending: boolean;
}) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <svg className="w-16 h-16 text-[var(--color-border-strong)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <h2 className="mt-4 text-xl font-bold text-[var(--color-text-primary)]">No products found</h2>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 transition-opacity ${isPending ? 'opacity-70' : 'opacity-100'}`}
    >
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < 4} />
      ))}
    </div>
  );
}
