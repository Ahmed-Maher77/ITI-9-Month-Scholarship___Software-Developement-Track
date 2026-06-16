import type { ProductDocument } from '@/models/product';
import type { Product, Dimensions } from '@/types/product';

export function serializeProduct(doc: ProductDocument | Record<string, unknown>): Product {
  const raw = doc as Record<string, unknown>;
  const id = raw._id != null ? String(raw._id) : String(raw.id ?? '');

  return {
    id,
    title: String(raw.title ?? ''),
    description: String(raw.description ?? ''),
    category: String(raw.category ?? ''),
    price: Number(raw.price ?? 0),
    discountPercentage: Number(raw.discountPercentage ?? 0),
    rating: Number(raw.rating ?? 0),
    stock: Number(raw.stock ?? 0),
    tags: Array.isArray(raw.tags) ? raw.tags.map(String) : [],
    brand: raw.brand ? String(raw.brand) : undefined,
    sku: String(raw.sku ?? ''),
    weight: Number(raw.weight ?? 0),
    dimensions: {
      width: Number((raw.dimensions as Dimensions)?.width ?? 0),
      height: Number((raw.dimensions as Dimensions)?.height ?? 0),
      depth: Number((raw.dimensions as Dimensions)?.depth ?? 0),
    },
    warrantyInformation: String(raw.warrantyInformation ?? ''),
    shippingInformation: String(raw.shippingInformation ?? ''),
    availabilityStatus: String(raw.availabilityStatus ?? 'In Stock'),
    reviews: Array.isArray(raw.reviews)
      ? raw.reviews.map((r) => {
          const review = r as Record<string, unknown>;
          return {
            rating: Number(review.rating ?? 0),
            comment: String(review.comment ?? ''),
            date: String(review.date ?? ''),
            reviewerName: String(review.reviewerName ?? ''),
            reviewerEmail: String(review.reviewerEmail ?? ''),
          };
        })
      : [],
    returnPolicy: String(raw.returnPolicy ?? ''),
    minimumOrderQuantity: Number(raw.minimumOrderQuantity ?? 1),
    meta: {
      createdAt: raw.createdAt instanceof Date
        ? raw.createdAt.toISOString()
        : String(raw.createdAt ?? new Date().toISOString()),
      updatedAt: raw.updatedAt instanceof Date
        ? raw.updatedAt.toISOString()
        : String(raw.updatedAt ?? new Date().toISOString()),
      barcode: '',
      qrCode: '',
    },
    images: Array.isArray(raw.images) ? raw.images.map(String) : [],
    thumbnail: String(raw.thumbnail ?? ''),
  };
}

export type SortOption = 'price-asc' | 'price-desc' | 'rating-desc' | '';

export interface ProductQueryOptions {
  q?: string;
  category?: string;
  sort?: SortOption;
  limit?: number;
}

export function buildProductFilter(options: ProductQueryOptions) {
  const filter: Record<string, unknown> = {};

  if (options.q?.trim()) {
    const regex = new RegExp(options.q.trim(), 'i');
    filter.$or = [{ title: regex }, { description: regex }, { category: regex }];
  }

  if (options.category?.trim()) {
    filter.category = options.category.trim();
  }

  return filter;
}

export function buildProductSort(sort?: SortOption): Record<string, 1 | -1> {
  switch (sort) {
    case 'price-asc':
      return { price: 1 };
    case 'price-desc':
      return { price: -1 };
    case 'rating-desc':
      return { rating: -1 };
    default:
      return { createdAt: -1 };
  }
}
