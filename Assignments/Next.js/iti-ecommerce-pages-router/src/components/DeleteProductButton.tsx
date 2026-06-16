'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

interface DeleteProductButtonProps {
  productId: string;
  productTitle: string;
}

export default function DeleteProductButton({ productId, productTitle }: DeleteProductButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm(`Delete "${productTitle}"? This cannot be undone.`)) return;

    startTransition(async () => {
      const res = await fetch(`/api/products/${productId}`, { method: 'DELETE' });
      if (res.ok) {
        router.refresh();
      } else {
        alert('Failed to delete product.');
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="rounded-md px-3 py-1.5 text-xs font-medium text-[var(--color-error)] hover:bg-[var(--color-error-light)] disabled:opacity-50 transition-colors"
    >
      {isPending ? 'Deleting…' : 'Delete'}
    </button>
  );
}
