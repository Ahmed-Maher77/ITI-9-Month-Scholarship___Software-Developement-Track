// take a message from the user
// open a child window
// show the message using innerHTML
// close after 5 seconds


const triggerBtn = document.getElementById("show-child-msg");
triggerBtn.onclick = show_timeBounded_msg;

// ============= Functions =============
function show_timeBounded_msg() {
    const msg = getValidString();
    let childWindow = window.open(
        "child.html",
        "_blank",
        "width=400, height=400, top=200, left=200"
    );
    if (childWindow.closed || childWindow == null) {
        console.log("Popup window blocked");
    }
    showPageMsg(childWindow, msg);
}

// take a message from the user
function getValidString() {
    let value;
    let isValid = false;
    do {
        value = prompt("Enter a message");
        if (value.trim().length > 0 && value != null) {
            isValid = true;
        }
    } while (!isValid);
    return value;
}

// show the message on the child window
function showPageMsg(win, msg) {
    const msgContainer = "<p id='msg-container'></p>";
    win.onload = function () {
        win.document.querySelector("main").innerHTML = msgContainer;
        showTypeingMsg("msg-container", msg, win);
    };
}

// show the message as typing animation
function showTypeingMsg(msgContainerId, msg, win) {
    const msgContainer = win.document.getElementById(msgContainerId);
    let index = 0;
    let timerId = setInterval(function () {
        if (index < msg.length) {
            msgContainer.textContent += msg[index];
            index++;
        } else {
            clearInterval(timerId);
            setTimeout(() => {
                win.close();
            }, 3000);
        }
    }, 200);
}
