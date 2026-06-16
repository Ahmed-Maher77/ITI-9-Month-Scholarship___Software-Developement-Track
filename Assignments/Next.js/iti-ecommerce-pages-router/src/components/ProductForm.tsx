'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Product } from '@/types/product';

interface FormState {
  error: string | null;
  success: boolean;
}

const initialState: FormState = { error: null, success: false };

interface ProductFormProps {
  mode: 'create' | 'edit';
  product?: Product;
}

async function submitProduct(
  mode: 'create' | 'edit',
  productId: string | undefined,
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const payload = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    category: formData.get('category') as string,
    price: formData.get('price') as string,
    discountPercentage: formData.get('discountPercentage') as string,
    rating: formData.get('rating') as string,
    stock: formData.get('stock') as string,
    brand: formData.get('brand') as string,
    sku: formData.get('sku') as string,
    thumbnail: formData.get('thumbnail') as string,
  };

  if (!payload.title?.trim() || !payload.description?.trim() || !payload.category?.trim()) {
    return { error: 'Title, description, and category are required.', success: false };
  }

  const url = mode === 'create' ? '/api/products' : `/api/products/${productId}`;
  const method = mode === 'create' ? 'POST' : 'PUT';

  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        price: Number(payload.price) || 0,
        discountPercentage: Number(payload.discountPercentage) || 0,
        rating: Number(payload.rating) || 0,
        stock: Number(payload.stock) || 0,
        images: payload.thumbnail ? [payload.thumbnail] : [],
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return { error: data.error ?? 'Something went wrong.', success: false };
    }

    return { error: null, success: true };
  } catch {
    return { error: 'Network error. Please try again.', success: false };
  }
}

export default function ProductForm({ mode, product }: ProductFormProps) {
  const router = useRouter();

  const boundAction = submitProduct.bind(null, mode, product?.id);

  const [state, formAction, isPending] = useActionState(boundAction, initialState);

  useEffect(() => {
    if (state.success) {
      router.push('/admin/products');
      router.refresh();
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="space-y-6 max-w-2xl">
      {state.error && (
        <div className="rounded-lg border border-[var(--color-error)] bg-[var(--color-error-light)] px-4 py-3 text-sm text-[var(--color-error)]">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Title" name="title" defaultValue={product?.title} required />
        <Field label="Category" name="category" defaultValue={product?.category} required />
        <Field label="Brand" name="brand" defaultValue={product?.brand} />
        <Field label="SKU" name="sku" defaultValue={product?.sku} />
        <Field label="Price" name="price" type="number" step="0.01" defaultValue={product?.price} required />
        <Field label="Discount %" name="discountPercentage" type="number" defaultValue={product?.discountPercentage ?? 0} />
        <Field label="Rating" name="rating" type="number" step="0.1" defaultValue={product?.rating ?? 0} />
        <Field label="Stock" name="stock" type="number" defaultValue={product?.stock ?? 0} />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          required
          defaultValue={product?.description}
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 py-2 text-sm text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:outline-none"
        />
      </div>

      <Field label="Thumbnail URL" name="thumbnail" defaultValue={product?.thumbnail} />

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-lg bg-[var(--color-primary)] px-6 py-2.5 text-sm font-semibold text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary-hover)] disabled:opacity-50 transition-all"
        >
          {isPending ? 'Saving…' : mode === 'create' ? 'Create Product' : 'Update Product'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center justify-center rounded-lg border border-[var(--color-border)] px-6 py-2.5 text-sm font-semibold text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  defaultValue,
  required,
  step,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number;
  required?: boolean;
  step?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        step={step}
        required={required}
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 py-2 text-sm text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:outline-none"
      />
    </div>
  );
}
