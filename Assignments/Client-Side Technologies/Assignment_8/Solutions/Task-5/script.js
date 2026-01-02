// render the images (default img - Moon.gif) - 3 rows × 4 columns = 12 images

// combine both arrays (imagesFirst and imagesSecond) into allImages array
// shuffle the allImages array randomly

// loop through all images (12 images)
// when click on any of them:
//     if: image is already matched (in matchedImages array)
//         => return (don't allow clicking)
//     if: image is hidden (Moon.gif) AND not already selected
//         if: firstImage is empty
//             T =>
//                 firstImage = allImages[index of the current image]
//                 firstImageIndex_dom = index of the current image
//                 replace the src of the current image with "./images/" + firstImage
//             F =>
//                 secondImage = allImages[index of the current image]
//                 secondImageIndex_dom = index of the current image
//                 replace the src of the current image with "./images/" + secondImage
//                 isMatch();

// isMatch() function
// firstImage === secondImage
//     T =>
//         matchCounter++
//         add firstImageIndex_dom and secondImageIndex_dom to matchedImages array
//         if: matchCounter === imagesFirst.length
//             => show message ("You won! congratulations")
//         reset firstImage, secondImage, firstImageIndex_dom, secondImageIndex_dom
//     F =>
//         show message ("OOPS! unmatched images")
//         after 2 seconds:
//             reset images[firstImageIndex_dom].src = "./images/Moon.gif"
//             reset images[secondImageIndex_dom].src = "./images/Moon.gif"
//             reset firstImage, secondImage, firstImageIndex_dom, secondImageIndex_dom
//             remove the message container

// ======== Selectors ========
const imagesContainer = document.querySelector(".imgs-container");

console.log(imagesContainer);
const header = document.querySelector("header");

// ======== Setting Global Variables ========
const imagesFirst = ["1.gif", "2.gif", "3.gif", "4.gif", "5.gif", "6.gif"];
const imagesSecond = ["1.gif", "2.gif", "3.gif", "4.gif", "5.gif", "6.gif"];
let firstImage = "",
    secondImage = "";
let firstImageIndex_dom, secondImageIndex_dom;
let matchCounter = 0;
let allImages = []; // Array to store which image is at each position
let matchedImages = []; // Array to track which images are already matched

// ============ Main Program ============
renderImage();

// Combine both arrays and shuffle
allImages = [...imagesFirst, ...imagesSecond];
allImages.sort(function () {
    return Math.random() - 0.5;
});

setTimeout(() => {
    const images = imagesContainer.getElementsByTagName("img");

    // Set click handlers for ALL 12 images
    for (let i = 0; i < images.length; i++) {
        images[i].onclick = function () {
            // Prevent clicking on already matched images or currently revealed images
            if (matchedImages.includes(i)) {
                return;
            }
            // Check if image is currently hidden (Moon.gif) and not already selected
            const currentSrc = images[i].src;
            const isHidden = currentSrc.includes("Moon.gif");
            const isNotSelected =
                i !== firstImageIndex_dom && i !== secondImageIndex_dom;

            if (isHidden && isNotSelected) {
                if (firstImage === "") {
                    firstImage = allImages[i];
                    firstImageIndex_dom = i;
                    images[i].src = "./images/" + firstImage;
                } else {
                    secondImage = allImages[i];
                    secondImageIndex_dom = i;
                    images[i].src = "./images/" + secondImage;
                    isMatch();
                }
            }
        };
    }
}, 0);

// ============ Functions ============
function renderImage() {
    for (let i = 0; i < 3; i++) {
        // rows
        let imagesRow = "";
        for (let j = 0; j < 4; j++) {
            // columns
            imagesRow += "<img src='./images/Moon.gif'>";
        }
        imagesRow += "<br>";
        imagesContainer.innerHTML += imagesRow;
    }
}

function isMatch() {
    if (firstImage === secondImage) {
        matchCounter++;
        // Mark both images as matched
        matchedImages.push(firstImageIndex_dom);
        matchedImages.push(secondImageIndex_dom);
        if (matchCounter === imagesFirst.length) {
            if (!document.getElementById("msg-container")) {
                header.innerHTML +=
                    "<p id='msg-container'><span style='color: green'>You won! congratulations</span></p>";
            }
        }
        // Reset selection variables
        firstImage = secondImage = "";
        firstImageIndex_dom = undefined;
        secondImageIndex_dom = undefined;
    } else {
        if (!document.getElementById("msg-container")) {
            header.innerHTML +=
                "<p id='msg-container'><span style='color: red'>OOPS! unmatched images</span></p>";
        }
        setTimeout(() => {
            imagesContainer.getElementsByTagName("img")[
                firstImageIndex_dom
            ].src = "./images/Moon.gif";
            imagesContainer.getElementsByTagName("img")[
                secondImageIndex_dom
            ].src = "./images/Moon.gif";
            // Reset selection variables
            firstImage = secondImage = "";
            firstImageIndex_dom = undefined;
            secondImageIndex_dom = undefined;
            const msgContainer = document.getElementById("msg-container");
            if (msgContainer) {
                msgContainer.remove();
            }
        }, 2000);
    }
}

// trials
