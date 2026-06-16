import Link from 'next/link';
import Container from './Container';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="space-y-4 md:col-span-5">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-[var(--color-primary)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span>ShopSphere</span>
            </Link>
            <p className="max-w-sm text-sm text-[var(--color-text-muted)] leading-relaxed">
              Your one-stop destination for premium products. Explore, choose, and experience the best quality with fast shipping and exceptional customer service.
            </p>
          </div>
          <div className="md:col-span-3 md:col-start-8">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">Shop</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/products" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">
                  Featured Items
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">Company</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <span className="text-sm text-[var(--color-text-secondary)]">About Us</span>
              </li>
              <li>
                <span className="text-sm text-[var(--color-text-secondary)]">Contact</span>
              </li>
              <li>
                <span className="text-sm text-[var(--color-text-secondary)]">Privacy Policy</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-[var(--color-border)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-text-muted)]">
            &copy; {currentYear} ShopSphere. All rights reserved.
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            Data provided by <a href="https://dummyjson.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary)] transition-colors underline">DummyJSON</a>.
          </p>
        </div>
      </Container>
    </footer>
  );
}
