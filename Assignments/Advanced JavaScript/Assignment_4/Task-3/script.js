// selectors
const leftImg = document.querySelector('#left-img');
const rightImg = document.querySelector('#right-img');
const bottomImg = document.querySelector('#bottom-img');
const startBtn = document.querySelector('#start-btn');
const stopBtn = document.querySelector('#stop-btn');
const resetBtn = document.querySelector('#reset-btn');



const imgPositions = [10, 10, 10]; // left, right, bottom
const imgIntervals = [];



// =========== Main Program ==========
// when the user clicks "start"
startBtn.addEventListener("click", startAnimation);
// when the user clicks "stop"
stopBtn.addEventListener("click", stopAnimation);

// when the user clicks "reset"
resetBtn.addEventListener("click", resetAnimation);


// initial state
stopBtn.disabled = true;

function startAnimation() {
    startImgAnimation(leftImg, "left", 0);
    startImgAnimation(rightImg, "right", 1);
    startImgAnimation(bottomImg, "bottom", 2);
    startBtn.disabled = true;
    stopBtn.disabled = false;
}

function stopAnimation() {
    for (let i = 0; i < imgIntervals.length; i++) {
        clearInterval(imgIntervals[i]);
    }
    stopBtn.disabled = true;
    startBtn.disabled = false;
    startBtn.innerText = "Go Again";
}


function resetAnimation() {
    // reset imgPositions
    for (let i = 0; i < imgPositions.length; i++) {
        imgPositions[i] = 10;
    }
    // clear intervals
    for (let i = 0; i < imgIntervals.length; i++) {
        clearInterval(imgIntervals[i]);
    }
    // reset img styles
    leftImg.style.left = "10px";
    rightImg.style.right = "10px";
    bottomImg.style.bottom = "10px";
    // update start/stop button states
    startBtn.disabled = false;
    stopBtn.disabled = true;
    startBtn.innerText = "Start";
}


// set interval to run every 0.5 second
// get currentPosition (left-right-bottom)
// direction = 1 or -1
// update currentPosition by 20px (depends on direction)
// get the border box => reverse direction




function startImgAnimation(img, imgDirection, index) {
    let direction = 1;
    const step = 10;
    imgIntervals[index] = setInterval(() => {
        const currentPosition = imgPositions[index] || parseInt(getComputedStyle(img)[imgDirection]);
        // if: (imgPosition + imgWidth) >= box_innerWidth - 10 {padding} => negative direction
        // currentPosition <= 10 {padding} => positive direction
        const boxInnerWidth = imgDirection != 'bottom' ? document.getElementById('pics').clientWidth : document.getElementById('pics').clientHeight;
        const imgTotalWidth = currentPosition + 60; // 60 is img width
        if (imgTotalWidth >= boxInnerWidth - 10 || currentPosition < 10) {
            direction *= -1;
        }
        const newPosition = currentPosition + (step * direction);
        imgPositions[index] = newPosition;
        img.style[imgDirection] = newPosition + "px";
    }, 50);
}