export default function ItemDetailsLoading() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 animate-pulse">
      {/* Header Placeholder */}
      <div className="w-full border-b border-zinc-200/80 bg-white/80 dark:border-zinc-800/80 dark:bg-[#0a0a0a]/80 h-16 flex items-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl flex items-center justify-between">
          <div className="h-5 w-28 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-5 w-24 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Image Box Placeholder */}
          <div className="lg:col-span-5 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden p-0">
            <div className="aspect-square w-full bg-zinc-200 dark:bg-zinc-850" />
          </div>

          {/* Right Column: Details Content Placeholders */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Category & Stock Badges */}
            <div className="flex gap-3 mb-4">
              <div className="h-6 w-20 bg-zinc-200 dark:bg-zinc-850 rounded-full" />
              <div className="h-6 w-24 bg-zinc-200 dark:bg-zinc-850 rounded-full" />
            </div>

            {/* Title */}
            <div className="h-10 w-2/3 bg-zinc-200 dark:bg-zinc-850 rounded mb-4" />

            {/* Rating */}
            <div className="h-5 w-48 bg-zinc-200 dark:bg-zinc-850 rounded mb-6" />

            {/* Price Banner */}
            <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl p-6 mb-8 flex items-center justify-between">
              <div>
                <div className="h-3.5 w-10 bg-zinc-200 dark:bg-zinc-805 rounded mb-1" />
                <div className="h-8 w-28 bg-zinc-200 dark:bg-zinc-805 rounded" />
              </div>
              <div className="h-12 w-40 bg-zinc-200 dark:bg-zinc-805 rounded-xl" />
            </div>

            {/* Description */}
            <div className="mb-8">
              <div className="h-4 w-20 bg-zinc-200 dark:bg-zinc-850 rounded mb-3" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-850 rounded" />
                <div className="h-4 w-11/12 bg-zinc-200 dark:bg-zinc-850 rounded" />
                <div className="h-4 w-4/5 bg-zinc-200 dark:bg-zinc-850 rounded" />
              </div>
            </div>

            {/* Features Checklist */}
            <div className="mb-8">
              <div className="h-4 w-28 bg-zinc-200 dark:bg-zinc-850 rounded mb-4" />
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="h-4 w-4 rounded bg-zinc-200 dark:bg-zinc-850 shrink-0 mt-0.5" />
                    <div className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-850 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Specs Table */}
            <div>
              <div className="h-4 w-28 bg-zinc-200 dark:bg-zinc-850 rounded mb-4" />
              <div className="border border-zinc-200/60 dark:border-zinc-800/60 rounded-xl overflow-hidden bg-white dark:bg-zinc-900">
                <div className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="grid grid-cols-3 px-6 py-4">
                      <div className="h-4 w-16 bg-zinc-200 dark:bg-zinc-850 rounded" />
                      <div className="col-span-2 h-4 w-1/2 bg-zinc-200 dark:bg-zinc-850 rounded pl-4" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
