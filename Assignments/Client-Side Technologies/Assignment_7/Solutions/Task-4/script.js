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
        childWindow.onload = function() {
            moveWindow(childWindow);
        } 
    }
}
animateChildWindow();


function moveWindow(win) {
    let step = 0;
    
    intervalId = setInterval(() => {
        step += 10;
        win.scrollTo({left: 0, top: step});
        if (win.scrollY >= win.innerHeight) {
            clearInterval(intervalId);
        }
    }, 10);

    // OR:
    // win.scrollTo({left: 0, top: win.document.documentElement.scrollHeight, behavior: "smooth"});
}




// ======== Using setTimeout ========
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
        clearTimeout(timeoutId);
    } else {
        childWindow.onload = function() {
            moveWindow(childWindow);
        } 
    }
}
animateChildWindow();

function moveWindow(win) {
    let step = 0;
    step += 10;
    animateTimeOut(step, win);
}

function animateTimeOut(step, win) {
    step += 10;
    win.scrollTo({left: 0, top: step});
    timeoutId = setTimeout(function () {
        animateTimeOut(step, win)
    }, 1);

    clearTimeout(timeoutId);
    console.log("cleared");
}
