// selectors
// const galleryFigure = document.querySelector("main figure");
// const galleryImage = galleryFigure.querySelector("img");
// create images array
// let currentImgIndex = 0
// when click next => showNextImage()
// currentImgIndex++;  => condition: currentImgIndex < images.length - 1
// T => galleryImage.src = images[currentImgIndex];
// if (currentImgIndex === images.length - 1) => disable next btn
// else => nothing
// when click previous => showPreviousImage()
// currentImgIndex--;  => condition: currentImgIndex > 0
// T => galleryImage.src = images[currentImgIndex];
// if (currentImgIndex === images.length - 1) => disable previous btn
// else => nothing



// ============ selectors ==========
const galleryFigure = document.querySelector("main figure");
const galleryImage = galleryFigure.querySelector("img");
const nextBtn = document.getElementById("next-btn");
const previousBtn = document.getElementById("previous-btn");
const activateSlideshow = document.getElementById("activate-slideshow");
const stopSlideshow = document.getElementById("stop-slideshow");

const images = [
    "./images/1.jpg",
    "./images/2.jpg",
    "./images/3.jpg",
    "./images/4.jpg",
    "./images/5.jpg",
    "./images/6.jpg",
];
let currentImgIndex = 0;
let timerId;

// ============ Main Events  ============
nextBtn.onclick = showNextImage;
previousBtn.onclick = showPreviousImage;
activateSlideshow.onclick = slideShow;
stopSlideshow.onclick = stopSlideShow;

// ============ Functions ============
function showNextImage() {
    if (currentImgIndex < images.length - 1) {
        currentImgIndex++;
        galleryImage.src = images[currentImgIndex];

        // activate previous btn
        previousBtn.disabled = previousBtn.disabled? false : null;

        if (currentImgIndex === images.length - 1) {
            nextBtn.disabled = true;
            console.log("last image in Next");
        }
    }
}

function showPreviousImage() {
    if (currentImgIndex > 0) {
        currentImgIndex--;
        galleryImage.src = images[currentImgIndex];

        // activate next btn
        nextBtn.disabled = nextBtn.disabled? false : null;

        if (currentImgIndex === 0) {
            previousBtn.disabled = true;
            console.log("last image in Previous");
        }
    }
}

function slideShow() {
    timerId = setInterval(function () {
        if (currentImgIndex < images.length - 1) {
            currentImgIndex++;
        } else {
            currentImgIndex = 0;
        }
    
        galleryImage.src = images[currentImgIndex];
    }, 2000);
}

function stopSlideShow() {
    clearInterval(timerId);
    console.log("slideshow stopped");
}