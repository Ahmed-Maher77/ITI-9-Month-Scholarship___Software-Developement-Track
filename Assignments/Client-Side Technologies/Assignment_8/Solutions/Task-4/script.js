let isAnimated = true;

// ============ Selectors ============
const message = document.getElementById("message");
const imgsContainer = document.querySelector(".imgs-container");
let images;
let timerId;
setTimeout(() => {
    images = document.getElementsByTagName("img");
}, 0);


// =========== Main Program ==========
renderImages();
startAnimation();
setTimeout(() => {
    for (let i = 0; i < images.length; i++) {
        images[i].onmouseover = function() {
            clearInterval(timerId);
            isAnimated = false;
            changeMessage();
        };
        images[i].onmouseout = function() {
            startAnimation();
            isAnimated = true;
            changeMessage();
        };
    }
}, 0);


// ============ Functions ============
function renderImages() {    
    for (let i = 0; i < 4; i++) {
        const imgTag = "<img src='./images/marble1.jpg' alt='marble image'>"
        imgsContainer.innerHTML += imgTag;
    }
}

function startAnimation() {
    let currentImageIndex = 0;
    timerId = setInterval(() => {
        // return all images to marble1 (default)
        for (let j = 0; j < images.length; j++) {
            images[j].src = "./images/marble1.jpg";
        }
        // change the current image
        if (currentImageIndex < images.length - 1) {
            currentImageIndex++;
        } else {
            currentImageIndex = 0;
        }
        images[currentImageIndex].src = "./images/marble3.jpg";
    }, 500);
}

function changeMessage() {
    if (isAnimated) {
        message.textContent = "Hover to Pause the Animation";
    } else {
        message.textContent = "Leave to Play the Animation";
    }
}