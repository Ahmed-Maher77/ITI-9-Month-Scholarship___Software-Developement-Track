import Link from "next/link";


export default function ItemNotFound() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 shadow-xl p-8 text-center">
        {/* Not Found Illustration */}
        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>

        {/* Text Details */}
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          Product Not Found
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
          The workstation accessory or gear item you are looking for does not exist, or has been removed from our curated collection.
        </p>

        {/* Action Button */}
        <Link
          href="/items"
          className="inline-block px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 font-medium rounded-lg text-sm transition-colors shadow-sm"
        >
          Return to Catalog
        </Link>
      </div>
    </div>
  );
}
