import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { fadeUpVariants as itemVariants, containerVariants } from "../../utils/animations";
import { getTestimonials } from "./testimonialsData";
import TestimonialCard from "./TestimonialCard";

// Gap between cards in px — must match the gap-6 class (1.5rem = 24px)
const CARD_GAP = 24;

const TestimonialsSection = () => {
    const { t } = useTranslation();
    const [activePage, setActivePage] = useState(0);
    const [cardsPerPage, setCardsPerPage] = useState(1);
    const [isDraggingState, setIsDraggingState] = useState(false);
    const scrollContainerRef = useRef(null);

    // Keep a ref copy so scroll handler never has a stale closure
    const cardsPerPageRef = useRef(1);

    // Mouse drag refs
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollStartLeft = useRef(0);

    // Touch refs
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);

    const testimonials = getTestimonials(t);

    const pageCount = Math.ceil(testimonials.length / cardsPerPage);

    // ── Scroll a specific page into view ─────────────────────────────────────
    // Uses the actual rendered offsetLeft of the first card in that page
    // so it is always pixel-perfect regardless of gap/padding changes.
    const scrollToPage = useCallback((page, animate = true) => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const slides = container.querySelectorAll(".testimonial-slide");
        const cpp = cardsPerPageRef.current;
        const targetIndex = Math.min(page * cpp, slides.length - 1);
        if (!slides[targetIndex]) return;
        container.scrollTo({
            left: slides[targetIndex].offsetLeft,
            behavior: animate ? "smooth" : "instant",
        });
        setActivePage(page);
    }, []);

    // ── Measure cards-per-page from real DOM dimensions ───────────────────────
    const measureCardsPerPage = useCallback(() => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const slide = container.querySelector(".testimonial-slide");
        if (!slide) return;

        // slideWidth includes the gap that follows it (except the last card)
        const slideWidth = slide.offsetWidth + CARD_GAP;
        // Math.floor: only count cards that fully fit
        const cpp = Math.max(1, Math.floor((container.offsetWidth + CARD_GAP) / slideWidth));

        if (cpp !== cardsPerPageRef.current) {
            cardsPerPageRef.current = cpp;
            setCardsPerPage(cpp);

            // Re-snap to page 0 on breakpoint change to stay in sync
            setActivePage(0);
            container.scrollTo({ left: 0, behavior: "instant" });
        }
    }, []);

    useEffect(() => {
        // Measure after first paint so offsetWidth is real
        const raf = requestAnimationFrame(measureCardsPerPage);
        const ro = new ResizeObserver(measureCardsPerPage);
        if (scrollContainerRef.current) ro.observe(scrollContainerRef.current);
        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
        };
    }, [measureCardsPerPage]);

    // ── Sync active dot while scrolling (uses ref, never stale) ──────────────
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const slides = container.querySelectorAll(".testimonial-slide");
            const scrollLeft = container.scrollLeft;
            let closestSlide = 0;
            let minDist = Infinity;
            slides.forEach((slide, i) => {
                const dist = Math.abs(slide.offsetLeft - scrollLeft);
                if (dist < minDist) { minDist = dist; closestSlide = i; }
            });
            setActivePage(Math.floor(closestSlide / cardsPerPageRef.current));
        };

        container.addEventListener("scroll", handleScroll, { passive: true });
        return () => container.removeEventListener("scroll", handleScroll);
    }, []); // stable — reads from ref, not state

    // ── Mouse drag ────────────────────────────────────────────────────────────
    const onMouseDown = useCallback((e) => {
        // Ignore clicks on buttons (dots)
        if (e.target.closest("button")) return;
        const container = scrollContainerRef.current;
        if (!container) return;
        isDragging.current = true;
        startX.current = e.clientX;
        scrollStartLeft.current = container.scrollLeft;
        setIsDraggingState(true);
        e.preventDefault();
    }, []);

    const onMouseMove = useCallback((e) => {
        if (!isDragging.current) return;
        const container = scrollContainerRef.current;
        if (!container) return;
        // Temporarily disable smooth scroll so the drag follows cursor 1:1
        container.style.scrollBehavior = "auto";
        container.scrollLeft = scrollStartLeft.current - (e.clientX - startX.current);
    }, []);

    const onMouseUp = useCallback((e) => {
        if (!isDragging.current) return;
        isDragging.current = false;
        setIsDraggingState(false);
        const container = scrollContainerRef.current;
        if (!container) return;
        container.style.scrollBehavior = "smooth";

        // Snap to nearest page boundary with smooth animation
        const slides = container.querySelectorAll(".testimonial-slide");
        const scrollLeft = container.scrollLeft;
        let closestSlide = 0;
        let minDist = Infinity;
        slides.forEach((slide, i) => {
            const dist = Math.abs(slide.offsetLeft - scrollLeft);
            if (dist < minDist) { minDist = dist; closestSlide = i; }
        });
        scrollToPage(Math.floor(closestSlide / cardsPerPageRef.current));
    }, [scrollToPage]);

    useEffect(() => {
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, [onMouseMove, onMouseUp]);

    // ── Touch swipe ───────────────────────────────────────────────────────────
    const onTouchStart = useCallback((e) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    }, []);

    const onTouchEnd = useCallback((e) => {
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        const dy = e.changedTouches[0].clientY - touchStartY.current;

        // Only treat as horizontal swipe if X movement dominates
        if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;

        const direction = dx < 0 ? 1 : -1;
        const currentPage = Math.round(
            (scrollContainerRef.current?.scrollLeft ?? 0) /
            ((scrollContainerRef.current?.querySelector(".testimonial-slide")?.offsetWidth ?? 1) + CARD_GAP) /
            cardsPerPageRef.current
        );
        const nextPage = Math.max(0, Math.min(pageCount - 1, currentPage + direction));
        scrollToPage(nextPage);
    }, [pageCount, scrollToPage]);

    return (
        <motion.section 
            id="testimonials" 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="py-16 md:py-24 border-t border-kashf-border"
        >
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
                {/* Heading */}
                <motion.div variants={itemVariants} className="text-center mb-12">
                    <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-100 tracking-tight line-height-15">
                        {t("testimonials.title", { defaultValue: "Egyptians who got their bills under control" })}
                    </h2>
                    <p className="max-w-2xl mx-auto text-base md:text-lg text-neutral-400">
                        {t("testimonials.subtitle", { defaultValue: "Real stories from real users saving money with Kashf" })}
                    </p>
                </motion.div>

                {/* Slider */}
                <motion.div variants={itemVariants} className="relative">
                    <div
                        ref={scrollContainerRef}
                        className="overflow-x-auto scrollbar-hide select-none"
                        style={{
                            cursor: isDraggingState ? "grabbing" : "grab",
                        }}
                        onMouseDown={onMouseDown}
                        onTouchStart={onTouchStart}
                        onTouchEnd={onTouchEnd}
                    >
                        <div className="flex pb-4" style={{ gap: CARD_GAP }}>
                            {testimonials.map((testimonial) => (
                                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                            ))}
                        </div>
                    </div>

                    {/* Page dots */}
                    <div className="flex justify-center gap-2 mt-6">
                        {Array.from({ length: pageCount }).map((_, pageIndex) => (
                            <button
                                key={pageIndex}
                                onClick={() => scrollToPage(pageIndex)}
                                className={`h-2.5 rounded-full transition-all duration-300 ${
                                    activePage === pageIndex
                                        ? "bg-kashf-blue w-8"
                                        : "bg-neutral-600 hover:bg-neutral-500 w-2.5"
                                }`}
                                aria-label={`Go to page ${pageIndex + 1}`}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>

            <style>{`
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </motion.section>
    );
};

export default TestimonialsSection;
