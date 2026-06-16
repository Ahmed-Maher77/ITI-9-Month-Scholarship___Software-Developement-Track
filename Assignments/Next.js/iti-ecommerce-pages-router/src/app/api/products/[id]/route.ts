import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/product';
import { requireAuth } from '@/lib/auth-guard';
import { canGuestAccessProduct } from '@/lib/product-service';
import { serializeProduct } from '@/lib/products';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    const { unauthorized } = await requireAuth();
    if (unauthorized) {
      const allowed = await canGuestAccessProduct(id);
      if (!allowed) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }
    }

    await dbConnect();
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(serializeProduct(product));
  } catch (error) {
    console.error('GET /api/products/[id] error:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { unauthorized } = await requireAuth();
    if (unauthorized) return unauthorized;

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    await dbConnect();
    const body = await request.json();

    const product = await Product.findByIdAndUpdate(
      id,
      {
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
      },
      { new: true, runValidators: true }
    );

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(serializeProduct(product));
  } catch (error) {
    console.error('PUT /api/products/[id] error:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const { unauthorized } = await requireAuth();
    if (unauthorized) return unauthorized;

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    await dbConnect();
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/products/[id] error:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
