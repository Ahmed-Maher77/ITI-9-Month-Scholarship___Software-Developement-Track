import Container from '@/components/Container';
import { DetailSkeleton } from '@/components/Skeleton';

export default function ProductDetailLoading() {
  return (
    <div className="py-12 md:py-20 animate-pulse">
      <Container>
        <div className="h-5 w-32 rounded bg-[var(--color-border)] mb-8" />
        <DetailSkeleton />
      </Container>
    </div>
  );
}
