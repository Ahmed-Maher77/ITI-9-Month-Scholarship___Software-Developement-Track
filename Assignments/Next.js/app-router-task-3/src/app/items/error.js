"use client";

import { useEffect } from "react";
import Link from "next/link";


export default function ItemsError({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service if available
    console.error("Unhandled route error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 shadow-xl p-8 text-center">
        {/* Error Icon */}
        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400">
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
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>

        {/* Title & Description */}
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          Something went wrong!
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
          {error?.message || "We encountered an unexpected error while loading the items catalog. Please try again or head back."}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg text-sm transition-colors cursor-pointer shadow-sm"
          >
            Try Again
          </button>
          
          <Link
            href="/"
            className="px-5 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-750 dark:text-zinc-300 font-medium rounded-lg text-sm transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
