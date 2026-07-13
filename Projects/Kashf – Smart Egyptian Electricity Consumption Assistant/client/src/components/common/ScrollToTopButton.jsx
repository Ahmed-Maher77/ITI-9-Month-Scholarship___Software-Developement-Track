import { useState, useEffect } from "react";

const ScrollToTopButton = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 300);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            id="scroll-to-top-btn"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className={`
                fixed bottom-6 end-6 z-50
                flex h-11 w-11 items-center justify-center
                rounded-full
                border border-kashf-blue/30
                bg-kashf-bg/80 backdrop-blur-md
                text-kashf-light-blue shadow-[0_0_20px_rgba(6,182,212,0.25)]
                transition-all duration-500 ease-out
                hover:scale-110 hover:border-kashf-blue/60 hover:shadow-[0_0_30px_rgba(6,182,212,0.45)] hover:bg-kashf-blue/10
                active:scale-95
                ${visible
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-6 pointer-events-none"
                }
            `}
        >
            {/* Up chevron SVG */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
            >
                <polyline points="18 15 12 9 6 15" />
            </svg>
        </button>
    );
};

export default ScrollToTopButton;
