import Link from "next/link";
import { fetchItems } from "@/lib/api-client";

export const metadata = {
  title: "Premium Tech Catalog | Gear & Accessories",
  description: "Browse our curated collection of high-end developer workspace and workstation gear.",
};

export default async function ItemsPage({ searchParams }) {
  // Await searchParams in Next.js 15/16+
  const params = await searchParams;
  const selectedCategory = params.category || "";
  const searchQuery = params.search || "";

  let items = [];
  let error = null;

  try {
    items = await fetchItems();
  } catch (err) {
    error = err.message;
  }

  // Extract unique categories for filter badges
  const categories = ["All", ...new Set(items.map((item) => item.category))];

  // Perform server-side filtering
  const filteredItems = items.filter((item) => {
    const matchesCategory = !selectedCategory || selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      {/* Catalog Header */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/80 dark:border-zinc-800/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 font-mono text-xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
                ITI
              </span>
              <span className="text-xs px-2 py-0.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400">
                CATALOG
              </span>
            </Link>
          </div>
          
          <nav className="flex items-center gap-4">
            <Link 
              href="/" 
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
            >
              Home
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page title and search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent">
              Workspace Essentials
            </h1>
            <p className="mt-2 text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-xl">
              A carefully curated selection of premium gear designed to elevate your programming and productivity experience.
            </p>
          </div>

          {/* Pure HTML Server-side Search Form */}
          <form action="/items" method="GET" className="flex items-center w-full md:max-w-xs gap-2">
            {selectedCategory && (
              <input type="hidden" name="category" value={selectedCategory} />
            )}
            <div className="relative flex-1">
              <input
                type="text"
                name="search"
                defaultValue={searchQuery}
                placeholder="Search catalog..."
                className="w-full h-10 px-4 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="h-10 px-4 py-2 text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              Search
            </button>
          </form>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-zinc-200/60 dark:border-zinc-800/60">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mr-2">
            Categories:
          </span>
          {categories.map((cat) => {
            const isActive = (!selectedCategory && cat === "All") || selectedCategory === cat;
            // Build filter URL preserving current search if present
            const href = cat === "All" 
              ? (searchQuery ? `/items?search=${encodeURIComponent(searchQuery)}` : "/items")
              : `/items?category=${encodeURIComponent(cat)}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ""}`;

            return (
              <Link
                key={cat}
                href={href}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                  isActive
                    ? "bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100 shadow-sm"
                    : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-700"
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>

        {/* Error Fallback */}
        {error && (
          <div className="my-12 p-6 rounded-xl border border-red-200 bg-red-50/50 text-center dark:border-red-900/50 dark:bg-red-950/20 max-w-xl mx-auto">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-400">Failed to Load Products</h3>
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>
            <Link
              href="/items"
              className="mt-4 inline-block text-xs font-semibold px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
            >
              Retry Connection
            </Link>
          </div>
        )}

        {/* Items Grid */}
        {!error && (
          <>
            {filteredItems.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
                <p className="text-zinc-500 dark:text-zinc-400">No items match your filter criteria.</p>
                <Link
                  href="/items"
                  className="mt-4 inline-block text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Clear all filters
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="group relative flex flex-col bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Item Image */}
                    <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-850">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/95 text-zinc-900 shadow-sm border border-zinc-100/10 backdrop-blur-sm dark:bg-zinc-900/95 dark:text-zinc-100 dark:border-zinc-800">
                          {item.category}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase shadow-sm ${
                            item.inStock
                              ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 dark:text-emerald-400"
                              : "bg-rose-500/10 text-rose-600 border border-rose-500/20 dark:text-rose-400"
                          }`}
                        >
                          {item.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="flex flex-col flex-1 p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
                          ${item.price.toFixed(2)}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-amber-500">★</span>
                          <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                            {item.rating}
                          </span>
                          <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                            ({item.reviewsCount})
                          </span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold leading-6 text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
                        <Link href={`/items/${item.id}`}>
                          <span className="absolute inset-0" aria-hidden="true" />
                          {item.name}
                        </Link>
                      </h3>

                      <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-6">
                        {item.description}
                      </p>

                      {/* Action */}
                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                          View details <span>→</span>
                        </span>
                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
                          ID: #{item.id}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
