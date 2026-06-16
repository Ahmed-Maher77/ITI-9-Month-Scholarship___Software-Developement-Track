import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Container from '@/components/Container';
import { auth } from '@/auth';
import { canGuestAccessProduct, getProductByIdFromDb } from '@/lib/product-service';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getProduct(id: string) {
  return getProductByIdFromDb(id);
}

// Dynamic SEO metadata generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  return {
    title: product.title,
    description: product.description
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const session = await auth();
  const isGuest = !session?.user;

  if (isGuest) {
    const allowed = await canGuestAccessProduct(id);
    if (!allowed) {
      notFound();
    }
  }

  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const {
    title,
    description,
    category,
    brand,
    price,
    discountPercentage,
    rating,
    stock,
    availabilityStatus,
    sku,
    weight,
    dimensions,
    warrantyInformation,
    shippingInformation,
    returnPolicy,
    reviews,
    images,
    thumbnail,
  } = product;

  const originalPrice = discountPercentage
    ? (price / (1 - discountPercentage / 100)).toFixed(2)
    : null;

  // Render rating stars helper
  const renderStars = (ratingVal: number) => {
    const rounded = Math.round(ratingVal * 2) / 2;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rounded) {
        stars.push(
          <svg key={i} className="h-5 w-5 fill-amber-450 text-amber-450" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else if (i - 0.5 === rounded) {
        stars.push(
          <div key={i} className="relative h-5 w-5">
            <svg className="absolute h-5 w-5 text-[var(--color-border-strong)]" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <div className="absolute top-0 left-0 w-[50%] overflow-hidden h-full">
              <svg className="h-5 w-5 fill-amber-450 text-amber-450" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        );
      } else {
        stars.push(
          <svg key={i} className="h-5 w-5 text-[var(--color-border-strong)]" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    return stars;
  };

  const isLowStock = stock < 10;
  const isOutOfStock = stock === 0;

  return (
    <div className="py-12 md:py-20">
      <Container>
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors mb-8 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to products
        </Link>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-8 flex items-center justify-center">
              <Image
                src={images[0] || thumbnail}
                alt={title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-6"
                priority
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.slice(0, 4).map((img, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-2"
                  >
                    <Image src={img} alt={`${title} gallery ${index}`} fill className="object-contain p-1" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-6 flex flex-col justify-start space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 items-center text-xs font-medium tracking-wide text-[var(--color-text-muted)] uppercase">
                <span>{category}</span>
                {brand && (
                  <>
                    <span className="text-[var(--color-border-strong)]">•</span>
                    <span>{brand}</span>
                  </>
                )}
              </div>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl leading-tight">
                {title}
              </h1>

              <div className="mt-3 flex items-center gap-2">
                <div className="flex">{renderStars(rating)}</div>
                <span className="text-sm font-semibold text-[var(--color-text-secondary)]">
                  {rating.toFixed(2)}
                </span>
                <span className="text-xs text-[var(--color-text-muted)]">
                  ({reviews.length} reviews)
                </span>
              </div>
            </div>

            <hr className="border-[var(--color-border)]" />

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-[var(--color-text-primary)]">${price.toFixed(2)}</span>
              {originalPrice && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[var(--color-text-muted)] line-through">
                    ${originalPrice}
                  </span>
                  <span className="rounded-md bg-[var(--color-error-light)] px-2 py-0.5 text-xs font-semibold text-[var(--color-error)]">
                    -{Math.round(discountPercentage)}% OFF
                  </span>
                </div>
              )}
            </div>

            <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
              {description}
            </p>

            <div className="flex items-center gap-2">
              <span className="text-sm text-[var(--color-text-secondary)]">Availability:</span>
              <span
                className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold ${
                  isOutOfStock
                    ? 'bg-[var(--color-error-light)] text-[var(--color-error)]'
                    : isLowStock
                    ? 'bg-[var(--color-warning-light)] text-[var(--color-warning)]'
                    : 'bg-[var(--color-success-light)] text-[var(--color-success)]'
                }`}
              >
                {availabilityStatus} ({stock} left)
              </span>
            </div>

            <hr className="border-[var(--color-border)]" />

            <div className="space-y-4">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
                Specifications
              </h2>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div className="border-b border-[var(--color-border)] py-2">
                  <span className="text-[var(--color-text-muted)] block text-xs">SKU</span>
                  <span className="font-medium text-[var(--color-text-primary)]">{sku}</span>
                </div>
                <div className="border-b border-[var(--color-border)] py-2">
                  <span className="text-[var(--color-text-muted)] block text-xs">Weight</span>
                  <span className="font-medium text-[var(--color-text-primary)]">{weight}g</span>
                </div>
                <div className="border-b border-[var(--color-border)] py-2">
                  <span className="text-[var(--color-text-muted)] block text-xs">Dimensions</span>
                  <span className="font-medium text-[var(--color-text-primary)]">
                    {dimensions.width}W x {dimensions.height}H x {dimensions.depth}D cm
                  </span>
                </div>
                <div className="border-b border-[var(--color-border)] py-2">
                  <span className="text-[var(--color-text-muted)] block text-xs">Warranty</span>
                  <span className="font-medium text-[var(--color-text-primary)]">{warrantyInformation}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-[var(--color-text-muted)] shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125a1.125 1.125 0 0 0 1.125-1.125V9.75M8.25 18.75h6M12 5.25v13.5M21 9.75H12"
                  />
                </svg>
                <div className="text-xs">
                  <p className="font-semibold text-[var(--color-text-primary)]">Shipping</p>
                  <p className="text-[var(--color-text-muted)] mt-0.5">{shippingInformation}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-[var(--color-text-muted)] shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                  />
                </svg>
                <div className="text-xs">
                  <p className="font-semibold text-[var(--color-text-primary)]">Returns</p>
                  <p className="text-[var(--color-text-muted)] mt-0.5">{returnPolicy}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {reviews.length > 0 && (
          <div className="mt-20 border-t border-[var(--color-border)] pt-16">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-8">
              Customer Reviews ({reviews.length})
            </h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((rev, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-semibold text-sm text-[var(--color-text-primary)]">{rev.reviewerName}</p>
                      <span className="text-xs text-[var(--color-text-muted)]">
                        {new Date(rev.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex gap-0.5 mb-3">{renderStars(rev.rating)}</div>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[var(--color-border)] text-xs text-[var(--color-text-muted)]">
                    Verified Purchase
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
