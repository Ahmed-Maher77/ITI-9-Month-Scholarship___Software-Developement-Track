import dbConnect from '@/lib/mongodb';
import Product from '@/models/product';
import { GUEST_PRODUCT_LIMIT } from '@/lib/constants';
import {
  buildProductFilter,
  buildProductSort,
  serializeProduct,
  type ProductQueryOptions,
} from '@/lib/products';

export async function getProductsFromDb(options: ProductQueryOptions = {}) {
  await dbConnect();

  const filter = buildProductFilter(options);
  const sort = buildProductSort(options.sort);
  let query = Product.find(filter).sort(sort);

  if (options.limit) {
    query = query.limit(options.limit);
  }

  const docs = await query.lean().exec();
  return docs.map((doc) => serializeProduct(doc as Parameters<typeof serializeProduct>[0]));
}

export async function getProductByIdFromDb(id: string) {
  await dbConnect();
  const doc = await Product.findById(id).lean();
  return doc ? serializeProduct(doc as Parameters<typeof serializeProduct>[0]) : null;
}

export async function getCategoriesFromDb() {
  await dbConnect();
  return Product.distinct('category');
}

export async function getGuestVisibleProductIds(): Promise<string[]> {
  const products = await getProductsFromDb({ limit: GUEST_PRODUCT_LIMIT });
  return products.map((p) => p.id);
}

export async function canGuestAccessProduct(id: string): Promise<boolean> {
  const ids = await getGuestVisibleProductIds();
  return ids.includes(id);
}
