import React from 'react'

const AnimatedScrollIndicator = ({ scrollToNext, t }) => {
  return (
    <button
                id="hero-scroll-arrow"
                onClick={scrollToNext}
                aria-label="Scroll to next section"
                className="mt-14 flex flex-col items-center gap-2 group cursor-pointer border-none bg-transparent p-2 outline-none focus-visible:ring-2 focus-visible:ring-kashf-blue rounded-full"
            >
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-500 transition-colors duration-300 group-hover:text-kashf-light-blue select-none">
                    {t("hero.scrollDown", { defaultValue: "Scroll" })}
                </span>

                {/* Mouse-shaped scroll indicator */}
                <span
                    className="relative flex items-start justify-center w-6 h-10 rounded-full border-2 border-neutral-600 transition-all duration-300 group-hover:border-kashf-blue/70 group-hover:shadow-[0_0_14px_rgba(6,182,212,0.35)]"
                    aria-hidden="true"
                >
                    {/* Bouncing scroll dot */}
                    <span
                        className="mt-1.5 w-1 h-2 rounded-full bg-neutral-500 group-hover:bg-kashf-light-blue transition-colors duration-300"
                        style={{ animation: "scrollDotBounce 1.5s ease-in-out infinite" }}
                    />
                </span>

                {/* Short line below */}
                <span
                    className="w-px h-6 bg-gradient-to-b from-neutral-600 to-transparent group-hover:from-kashf-blue/60 transition-colors duration-300"
                    aria-hidden="true"
                />
            </button>
  )
}

export default AnimatedScrollIndicator
