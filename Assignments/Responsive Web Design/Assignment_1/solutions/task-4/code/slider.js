(() => {
    const slider = document.querySelector("#slider");
    if (!slider) return;

    const slides = Array.from(slider.querySelectorAll("img"));
    const prevBtn = slider.querySelector(".navigation-controls .prev");
    const nextBtn = slider.querySelector(".navigation-controls .next");

    if (slides.length === 0) return;

    let currentIndex = slides.findIndex((img) =>
        img.classList.contains("active"),
    );
    if (currentIndex < 0) currentIndex = 0;

    const showSlide = (index) => {
        slides[currentIndex].classList.remove("active");
        currentIndex = (index + slides.length) % slides.length;
        slides[currentIndex].classList.add("active");
    };

    const showNext = () => showSlide(currentIndex + 1);
    const showPrev = () => showSlide(currentIndex - 1);

    let autoTimer = setInterval(showNext, 4000);

    const resetTimer = () => {
        clearInterval(autoTimer);
        autoTimer = setInterval(showNext, 4000);
    };

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            showNext();
            resetTimer();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            showPrev();
            resetTimer();
        });
    }

    slider.addEventListener("mouseenter", () => clearInterval(autoTimer));
    slider.addEventListener("mouseleave", resetTimer);
})();
