import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Container from '@/components/Container';
import ProductForm from '@/components/ProductForm';
import { getProductByIdFromDb } from '@/lib/product-service';

export const metadata: Metadata = {
  title: 'Edit Product',
  description: 'Edit a product in ShopSphere.',
};

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductByIdFromDb(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="py-12 md:py-20">
      <Container>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] mb-8">
          Edit Product
        </h1>
        <ProductForm mode="edit" product={product} />
      </Container>
    </div>
  );
}
