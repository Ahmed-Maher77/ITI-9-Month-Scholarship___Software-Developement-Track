import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchItemById } from "@/lib/api-client";


// Generate metadata dynamically based on the item details.
export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const item = await fetchItemById(id);
    if (!item) {
      return {
        title: "Product Not Found",
        description: "The requested workstation item does not exist.",
      };
    }
    return {
      title: `${item.name} | Antigravity Catalog`,
      description: item.description,
    };
  } catch (error) {
    return {
      title: "Product Details",
      description: "Explore our premium accessories.",
    };
  }
}

export default async function ItemDetailsPage({ params }) {
  const { id } = await params;
  let item = null;
  let error = null;

  try {
    item = await fetchItemById(id);
  } catch (err) {
    error = err.message;
  }

  // Trigger not-found UI if request completed but no item returned
  if (!item && !error) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      {/* Detail Header */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/80 dark:border-zinc-800/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/items" className="flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
            <span>←</span> Back to Catalog
          </Link>
          
          <div className="text-xs px-2.5 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 font-mono">
            Item ID: #{id}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Error Handling */}
        {error && (
          <div className="my-12 p-6 rounded-xl border border-red-200 bg-red-50/50 text-center dark:border-red-900/50 dark:bg-red-950/20 max-w-xl mx-auto">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-400">Error Fetching Product</h3>
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>
            <Link
              href={`/items/${id}`}
              className="mt-4 inline-block text-xs font-semibold px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
            >
              Retry
            </Link>
          </div>
        )}

        {item && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Image Card */}
            <div className="lg:col-span-5 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden shadow-md">
              <div className="relative aspect-square w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>

            {/* Right Column: Details Content */}
            <div className="lg:col-span-7 flex flex-col">
              {/* Category & Stock Status */}
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-150/10 dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-900/30">
                  {item.category}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${
                    item.inStock
                      ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 dark:text-emerald-400"
                      : "bg-rose-500/10 text-rose-600 border border-rose-500/20 dark:text-rose-400"
                  }`}
                >
                  {item.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-3">
                {item.name}
              </h1>

              {/* Ratings */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex text-amber-500 text-lg">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>{i < Math.floor(item.rating) ? "★" : "☆"}</span>
                  ))}
                </div>
                <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                  {item.rating}
                </span>
                <span className="text-xs text-zinc-400 dark:text-zinc-500">
                  ({item.reviewsCount} verified reviews)
                </span>
              </div>

              {/* Price Banner */}
              <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl p-6 mb-8 flex items-center justify-between">
                <div>
                  <span className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block mb-1">Price</span>
                  <span className="text-3xl font-black text-zinc-900 dark:text-white">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                <button
                  disabled={!item.inStock}
                  className={`px-6 py-3 rounded-xl font-bold text-sm shadow-sm transition-all duration-200 ${
                    item.inStock
                      ? "bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-900 cursor-pointer"
                      : "bg-zinc-200 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600 cursor-not-allowed"
                  }`}
                >
                  {item.inStock ? "Add to Workspace" : "Out of Stock"}
                </button>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">Overview</h3>
                <p className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {item.description}
                </p>
              </div>

              {/* Features Checklist */}
              <div className="mb-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {item.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Specifications */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">Specifications</h3>
                <div className="border border-zinc-200/60 dark:border-zinc-800/60 rounded-xl overflow-hidden bg-white dark:bg-zinc-900">
                  <dl className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
                    {Object.entries(item.specs).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-3 px-6 py-3.5 text-sm">
                        <dt className="font-semibold text-zinc-500 dark:text-zinc-400 capitalize">{key.replace(/([A-Z])/g, " $1")}</dt>
                        <dd className="col-span-2 text-zinc-900 dark:text-white pl-4 border-l border-zinc-100 dark:border-zinc-800">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
