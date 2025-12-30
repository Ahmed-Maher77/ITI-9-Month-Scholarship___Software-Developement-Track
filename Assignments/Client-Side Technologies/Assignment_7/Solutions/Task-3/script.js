// ======== Using setInterval ========
let intervalId;
function animateChildWindow() {
    const childWindow = window.open(
        "child.html",
        "_blank",
        "width=400, height=400"
    );
    // check if the child window is blocked => null
    if (!childWindow || childWindow.closed) {
        console.log("the child window is blocked");
        clearInterval(intervalId);
    } else {
        moveWindow(childWindow);
    }
}
animateChildWindow();

function moveWindow(win) {
    let direction = 1;
    let step = 1;
    const movementMargin = 50;
    intervalId = setInterval(function () {

        const screenWidth = screen.availWidth;
        const childWindowWidth = win.outerWidth;

        if (step + childWindowWidth >= screenWidth - movementMargin) {
            direction = -1;
        } else if (step <= 0 + movementMargin) {
            direction = 1;
        }

        step += 80 * direction;
        win.moveTo(step, 0);
    }, 500);
}

function stopMovingChild() {
    clearInterval(intervalId);
}






// // ======== Using setInterval ========
let timeoutId;
function animateChildWindow() {
    const childWindow = window.open(
        "child.html",
        "_blank",
        "width=400, height=400"
    );
    // check if the child window is blocked => null
    if (!childWindow || childWindow.closed) {
        console.log("the child window is blocked");
        clearTimeout(intervalId);
    } else {
        moveWindow(childWindow);
    }
}
animateChildWindow();

function moveWindow(win) {
    let direction = 1;
    let step = 1;
    const movementMargin = 50;

    function moveTimeout() {
        const screenWidth = screen.availWidth;
        const childWindowWidth = win.outerWidth;
    
        if (step + childWindowWidth >= screenWidth - movementMargin) {
            direction = -1;
        } else if (step <= 0 + movementMargin) {
            direction = 1;
        }
    
        step += 80 * direction;
        win.moveTo(step, 0);
    
        timeoutId = setTimeout(moveTimeout, 500);
    }
    moveTimeout()
}

function stopMovingChild() {
    clearTimeout(timeoutId);
}










// innerWidth	Only the content area (viewport)
// outerWidth	Entire browser window, edge to edge


