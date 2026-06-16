import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/product';
import { requireAuth } from '@/lib/auth-guard';
import { GUEST_PRODUCT_LIMIT } from '@/lib/constants';
import {
  buildProductFilter,
  buildProductSort,
  serializeProduct,
  type SortOption,
} from '@/lib/products';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = request.nextUrl;
    const q = searchParams.get('q') ?? undefined;
    const category = searchParams.get('category') ?? undefined;
    const sort = (searchParams.get('sort') as SortOption) ?? undefined;
    const limitParam = searchParams.get('limit');
    let limit = limitParam ? parseInt(limitParam, 10) : undefined;

    const { unauthorized } = await requireAuth();
    if (unauthorized) {
      limit = limit ?? GUEST_PRODUCT_LIMIT;
      if (q || category || sort) {
        return NextResponse.json(
          { error: 'Sign in to search, filter, or sort products' },
          { status: 401 }
        );
      }
    }

    const filter = buildProductFilter({ q, category, sort });
    const sortObj = buildProductSort(sort);

    let query = Product.find(filter).sort(sortObj);
    if (limit) {
      query = query.limit(limit);
    }

    const products = await query.lean().exec();
    const total = await Product.countDocuments(filter);

    return NextResponse.json({
      products: products.map((p) => serializeProduct(p as Parameters<typeof serializeProduct>[0])),
      total,
    });
  } catch (error) {
    console.error('GET /api/products error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { unauthorized } = await requireAuth();
    if (unauthorized) return unauthorized;

    await dbConnect();
    const body = await request.json();

    const product = await Product.create({
      title: body.title,
      description: body.description,
      category: body.category,
      price: Number(body.price),
      discountPercentage: Number(body.discountPercentage ?? 0),
      rating: Number(body.rating ?? 0),
      stock: Number(body.stock ?? 0),
      tags: body.tags ?? [],
      brand: body.brand ?? '',
      sku: body.sku ?? '',
      weight: Number(body.weight ?? 0),
      dimensions: body.dimensions ?? {},
      warrantyInformation: body.warrantyInformation ?? '',
      shippingInformation: body.shippingInformation ?? '',
      availabilityStatus: body.availabilityStatus ?? 'In Stock',
      returnPolicy: body.returnPolicy ?? '',
      minimumOrderQuantity: Number(body.minimumOrderQuantity ?? 1),
      images: body.images ?? [],
      thumbnail: body.thumbnail ?? body.images?.[0] ?? '',
    });

    return NextResponse.json(serializeProduct(product), { status: 201 });
  } catch (error) {
    console.error('POST /api/products error:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
