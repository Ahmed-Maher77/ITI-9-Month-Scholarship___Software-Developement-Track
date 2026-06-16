import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';
import SessionProvider from '@/components/SessionProvider';
import ToastHost from '@/components/ToastHost';
import { getFeed } from '@/lib/fetch-feed';
import './globals.css';

export const metadata: Metadata = {
  title: 'ShopSphere | Premium E-Commerce Store',
  description: 'Shop the latest products with premium quality, great discounts, and fast shipping on ShopSphere.',
  keywords: ['e-commerce', 'shopping', 'products', 'deals', 'discounts'],
  authors: [{ name: 'ShopSphere Team' }],
  creator: 'Ahmed Maher.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const feed = await getFeed();

  return (
    <html lang="en" className="h-full scroll-smooth" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <ThemeProvider>
          <SessionProvider>
            <ToastHost quotes={feed.quotes} news={feed.news} />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
