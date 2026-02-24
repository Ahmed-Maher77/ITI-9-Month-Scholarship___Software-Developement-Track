// Scroll reveal animations

let scrollObserver = null;

// Reveal elements with .reveal-on-scroll
export function initScrollRevealAnimations() {
    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    if (!revealElements.length) return;

    // If IntersectionObserver is missing, show all immediately
    if (!("IntersectionObserver" in window)) {
        revealElements.forEach((el) =>
            el.classList.add("reveal-on-scroll--visible"),
        );
        return;
    }

    if (!scrollObserver) {
        scrollObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("reveal-on-scroll--visible");
                        scrollObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15,
            },
        );
    }

    revealElements.forEach((el) => {
        if (!el.classList.contains("reveal-on-scroll--visible")) {
            scrollObserver.observe(el);
        }
    });
}

// Observe one element (for dynamic content)
export function observeRevealElement(el) {
    if (!el) return;

    // Make sure it has the base class
    if (!el.classList.contains("reveal-on-scroll")) {
        el.classList.add("reveal-on-scroll");
    }

    // No IntersectionObserver: show immediately
    if (!("IntersectionObserver" in window)) {
        el.classList.add("reveal-on-scroll--visible");
        return;
    }

    if (!scrollObserver) return;

    if (!el.classList.contains("reveal-on-scroll--visible")) {
        scrollObserver.observe(el);
    }
}

