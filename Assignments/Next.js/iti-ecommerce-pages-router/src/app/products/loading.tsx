import Container from '@/components/Container';
import { GridSkeleton } from '@/components/Skeleton';

export default function ProductsLoading() {
  return (
    <div className="py-12 md:py-20 animate-pulse">
      <Container>
        <div className="mb-10 space-y-3">
          <div className="h-10 w-48 rounded-lg bg-[var(--color-border)]" />
          <div className="h-4 w-64 rounded-md bg-[var(--color-border)]" />
        </div>
        <GridSkeleton count={8} />
      </Container>
    </div>
  );
}
