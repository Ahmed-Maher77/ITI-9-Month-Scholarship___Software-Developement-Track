import type { Metadata } from 'next';
import Container from '@/components/Container';
import ProductForm from '@/components/ProductForm';

export const metadata: Metadata = {
  title: 'Add Product',
  description: 'Create a new product in ShopSphere.',
};

export default function NewProductPage() {
  return (
    <div className="py-12 md:py-20">
      <Container>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] mb-8">
          Add New Product
        </h1>
        <ProductForm mode="create" />
      </Container>
    </div>
  );
}
