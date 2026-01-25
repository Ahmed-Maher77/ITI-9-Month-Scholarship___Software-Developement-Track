// ================== Access ==================
const domImage = document.body.firstElementChild.firstElementChild;
const list = document.body.children[1].firstElementChild;
console.log(domImage);



// ================== create ==================
// clone image
const clonedImg = domImage.cloneNode();

// create a footer
const footer = document.createElement("footer");

// append cloned image to footer
footer.appendChild(clonedImg);

// add align-left class to footer
footer.classList.add("align-left");

// append footer to body
document.body.appendChild(footer);


// modify list
list.style.listStyleType = "circle";
// or: list.classList.add("circle");