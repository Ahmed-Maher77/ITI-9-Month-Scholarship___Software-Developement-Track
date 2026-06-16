import Link from "next/link";

export const metadata = {
  title: "ITI | Premium Workspace Gear",
  description: "High-performance tech accessories and ergonomic gear designed for software engineering professionals.",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      {/* Navbar */}
      <header className="w-full border-b border-zinc-200/50 bg-white/50 dark:border-zinc-800/50 dark:bg-[#0a0a0a]/50 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-mono text-xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
              ITI
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/items"
              className="text-sm font-semibold px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors shadow-sm"
            >
              Explore Catalog
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-200 dark:border-violet-800 bg-violet-50/50 dark:bg-violet-950/20 text-xs font-semibold text-violet-700 dark:text-violet-400 mb-8 animate-fade-in">
            <span>🚀</span> Next.js App Router Architecture
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none mb-6">
            Elevate Your <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent dark:from-violet-400 dark:via-indigo-400 dark:to-blue-400">
              Programming Workspace
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-base sm:text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed mb-10">
            A premium collection of high-performance tech accessories, custom mechanical keyboards, and audio equipment curated specifically for developers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/items"
              className="w-full sm:w-auto h-12 px-8 flex items-center justify-center font-bold text-base rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-all shadow-md hover:-translate-y-0.5"
            >
              Browse Catalog
            </Link>
            
            <Link
              href="/api/items"
              target="_blank"
              className="w-full sm:w-auto h-12 px-8 flex items-center justify-center font-semibold text-base rounded-xl border border-zinc-200 hover:bg-zinc-100/50 dark:border-zinc-800 dark:hover:bg-zinc-900/50 transition-all"
            >
              Test GET /api/items ↗
            </Link>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-zinc-200/50 dark:border-zinc-800/50">
          <div className="flex flex-col p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm">
            <span className="text-3xl mb-4">🗂️</span>
            <h3 className="font-bold text-lg mb-2">Route Handlers</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              API routes implemented as App Router route handlers. Return clean JSON structures and HTTP status codes.
            </p>
          </div>

          <div className="flex flex-col p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm">
            <span className="text-3xl mb-4">⚙️</span>
            <h3 className="font-bold text-lg mb-2">Server Components</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              No initial client fetches. Pages are asynchronous Server Components fetching data on the server.
            </p>
          </div>

          <div className="flex flex-col p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm">
            <span className="text-3xl mb-4">⏳</span>
            <h3 className="font-bold text-lg mb-2">Skeleton Loading</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Utilizes Next.js <code className="font-mono text-xs px-1 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800">loading.js</code> conventions for dynamic, pulsing skeleton layouts.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-zinc-200/50 bg-white/20 dark:border-zinc-800/50 dark:bg-[#0a0a0a]/20 mt-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 dark:text-zinc-500">
          <p>© 2026 Antigravity. Built with Next.js App Router.</p>
          <div className="flex gap-4">
            <Link href="/api/items/1" target="_blank" className="hover:underline">
              API Route [id]
            </Link>
            <span>•</span>
            <Link href="/items/999" className="hover:underline">
              Test 404 Route
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
