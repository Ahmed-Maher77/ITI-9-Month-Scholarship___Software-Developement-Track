export default function ItemsLoading() {
  const skeletonCards = Array.from({ length: 6 });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100">
      {/* Header Placeholder */}
      <div className="w-full border-b border-zinc-200/80 bg-white/80 dark:border-zinc-800/80 dark:bg-[#0a0a0a]/80 h-16 flex items-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl flex items-center justify-between">
          <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
          <div className="h-5 w-16 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Title & Search Placeholder */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="h-8 w-64 bg-zinc-200 dark:bg-zinc-850 rounded animate-pulse" />
            <div className="h-4 w-96 bg-zinc-200 dark:bg-zinc-850 rounded mt-3 animate-pulse" />
          </div>
          <div className="h-10 w-full md:max-w-xs bg-zinc-200 dark:bg-zinc-850 rounded-lg animate-pulse" />
        </div>

        {/* Categories Bar Placeholder */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-zinc-200/60 dark:border-zinc-800/60">
          <div className="h-4 w-16 bg-zinc-200 dark:bg-zinc-855 rounded animate-pulse mr-2" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-7 w-20 bg-zinc-200 dark:bg-zinc-850 rounded-full animate-pulse" />
          ))}
        </div>

        {/* Grid Placeholder */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skeletonCards.map((_, index) => (
            <div
              key={index}
              className="flex flex-col bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden"
            >
              {/* Image box */}
              <div className="aspect-video w-full bg-zinc-200 dark:bg-zinc-850 animate-pulse" />

              {/* Body */}
              <div className="flex flex-col flex-1 p-6">
                {/* Price & Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="h-6 w-20 bg-zinc-200 dark:bg-zinc-850 rounded animate-pulse" />
                  <div className="h-5 w-12 bg-zinc-200 dark:bg-zinc-850 rounded animate-pulse" />
                </div>

                {/* Title */}
                <div className="h-5 w-3/4 bg-zinc-200 dark:bg-zinc-850 rounded mb-3 animate-pulse" />

                {/* Description */}
                <div className="h-3 w-full bg-zinc-200 dark:bg-zinc-850 rounded mb-2 animate-pulse" />
                <div className="h-3 w-5/6 bg-zinc-200 dark:bg-zinc-850 rounded mb-6 animate-pulse" />

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-850 rounded animate-pulse" />
                  <div className="h-3 w-12 bg-zinc-200 dark:bg-zinc-850 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
