// Active Link Highlighting
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    const sections = document.querySelectorAll(
        "main section, main[id], footer[id]",
    );

    // Custom collapse toggle for mobile navbar.
    const navbarToggler = document.querySelector(".navbar-toggler");
    const targetSelector = navbarToggler
        ? navbarToggler.getAttribute("data-bs-target")
        : null;
    const collapsible = targetSelector
        ? document.querySelector(targetSelector)
        : null;

    if (navbarToggler && collapsible) {
        navbarToggler.addEventListener("click", () => {
            const isOpen = collapsible.classList.toggle("show");
            navbarToggler.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false",
            );
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                collapsible.classList.remove("show");
                navbarToggler.setAttribute("aria-expanded", "false");
            });
        });
    }

    window.addEventListener("scroll", () => {
        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 100) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    });
});

// Page Loader and Scroll Animations
window.addEventListener("load", function () {
    const loader = document.getElementById("pageLoader");
    loader.classList.add("fade-out");

    setTimeout(() => {
        loader.style.display = "none";

        // Initialize scroll animations after loader is hidden
        const animateElements = document.querySelectorAll(
            ".animate-on-scroll, .fade-in-left, .fade-in-right, .scale-in",
        );

        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px",
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animated");
                }
            });
        }, observerOptions);

        animateElements.forEach((element) => {
            observer.observe(element);
        });
    }, 800);
});

// Carousel behavior (next/prev + optional auto ride)
document.addEventListener("DOMContentLoaded", function () {
    const carousels = document.querySelectorAll(".carousel");

    carousels.forEach((carousel) => {
        const items = Array.from(carousel.querySelectorAll(".carousel-item"));
        if (!items.length) {
            return;
        }

        const intervalMs = 5000;
        let timerId = null;

        let currentIndex = items.findIndex((item) =>
            item.classList.contains("active"),
        );
        if (currentIndex < 0) {
            currentIndex = 0;
        }

        const renderSlide = () => {
            items.forEach((item, index) => {
                const isActive = index === currentIndex;
                item.classList.toggle("active", isActive);
                item.style.display = isActive ? "block" : "none";
                item.setAttribute("aria-hidden", isActive ? "false" : "true");
            });
            carousel.dataset.activeIndex = String(currentIndex + 1);
        };

        const showSlide = (index) => {
            currentIndex = (index + items.length) % items.length;
            renderSlide();
        };

        const nextSlide = () => showSlide(currentIndex + 1);
        const prevSlide = () => showSlide(currentIndex - 1);

        const prevControl = carousel.querySelector(
            '[data-carousel-dir="prev"], [data-bs-slide="prev"]',
        );
        const nextControl = carousel.querySelector(
            '[data-carousel-dir="next"], [data-bs-slide="next"]',
        );

        if (prevControl) {
            prevControl.addEventListener("click", (event) => {
                event.preventDefault();
                prevSlide();
            });
        }

        if (nextControl) {
            nextControl.addEventListener("click", (event) => {
                event.preventDefault();
                nextSlide();
            });
        }

        const startAutoRide = () => {
            if (carousel.dataset.carouselAutoplay === "true") {
                stopAutoRide();
                timerId = setInterval(nextSlide, intervalMs);
            }
        };

        const stopAutoRide = () => {
            if (timerId) {
                clearInterval(timerId);
                timerId = null;
            }
        };

        carousel.addEventListener("mouseenter", stopAutoRide);
        carousel.addEventListener("mouseleave", startAutoRide);
        carousel.addEventListener("focusin", stopAutoRide);
        carousel.addEventListener("focusout", startAutoRide);

        renderSlide();
        startAutoRide();
    });
});
