import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { id, title, price, discountPercentage, rating, thumbnail, category } = product;

  // Calculate original price for visual representation if there's a discount
  const originalPrice = discountPercentage
    ? (price / (1 - discountPercentage / 100)).toFixed(2)
    : null;

  // Render rating stars (5 star rating scale)
  const renderStars = (ratingVal: number) => {
    const rounded = Math.round(ratingVal * 2) / 2; // Round to nearest 0.5
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rounded) {
        stars.push(
          <svg key={i} className="h-4 w-4 fill-amber-400 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else if (i - 0.5 === rounded) {
        stars.push(
          <div key={i} className="relative h-4 w-4">
            <svg className="absolute h-4 w-4 text-[var(--color-border-strong)]" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <div className="absolute top-0 left-0 w-[50%] overflow-hidden h-full">
              <svg className="h-4 w-4 fill-amber-400 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        );
      } else {
        stars.push(
          <svg key={i} className="h-4 w-4 text-[var(--color-border-strong)]" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[var(--color-border-strong)]">
      <div className="relative aspect-square w-full overflow-hidden bg-[var(--color-surface)]">
        {discountPercentage > 0 && (
          <span className="absolute top-3 left-3 z-10 rounded-md bg-[var(--color-error)] px-2 py-1 text-xs font-semibold text-[var(--color-error-foreground)]">
            -{Math.round(discountPercentage)}%
          </span>
        )}
        <span className="absolute top-3 right-3 z-10 rounded-md bg-[var(--color-surface-elevated)]/90 px-2 py-1 text-xs font-medium text-[var(--color-text-muted)]">
          {category}
        </span>
        <Image
          src={thumbnail}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          priority={priority}
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-1 text-sm font-semibold text-[var(--color-text-primary)]">
          <Link href={`/products/${id}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {title}
          </Link>
        </h3>

        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex">{renderStars(rating)}</div>
          <span className="text-xs text-[var(--color-text-muted)]">({rating.toFixed(1)})</span>
        </div>

        <div className="mt-auto pt-4 flex items-end justify-between">
          <div className="flex flex-col">
            {originalPrice && (
              <span className="text-xs text-[var(--color-text-muted)] line-through">
                ${originalPrice}
              </span>
            )}
            <span className="text-lg font-bold text-[var(--color-text-primary)]">
              ${price.toFixed(2)}
            </span>
          </div>

          <div className="rounded-lg border border-[var(--color-border)] p-1.5 text-[var(--color-text-muted)] group-hover:border-[var(--color-primary)] group-hover:text-[var(--color-primary)] transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
