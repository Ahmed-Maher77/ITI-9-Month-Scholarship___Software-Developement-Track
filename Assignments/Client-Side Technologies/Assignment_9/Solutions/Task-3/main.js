// once I type anything inside the input field
// reset the timer

// set a timer (settimeout) firs every 30 seconds
// stop the timer
// fire the custom event

// selectors
const inputField = document.querySelector("input");

// variables
const timer = document.querySelector("#timer span");
let timerId; // fire after 30 seconds to dispatch the custom event
let counterTimerId; // track the time

const passiveUserEvent = new Event("passiveUserEvent");
// listen to the custom event
window.addEventListener("passiveUserEvent", function () {
    alert("You have been inactive for 30 seconds");
});

startTimer();
showTimerProgress();

// once I type anything inside the input field => reset the timer
inputField.oninput = function () {
    clearTimeout(timerId);
    console.log("Timer has reseted");
    resetTimer();
};

// 30-second timer
function startTimer() {
    timerId = setTimeout(() => {
        window.dispatchEvent(passiveUserEvent);
        clearTimers();
    }, 30000);
}

// track the time
function showTimerProgress() {
    counterTimerId = setInterval(function () {
        timer.innerHTML = parseInt(timer.innerHTML) + 1;
    }, 1000);
}

// reset the timers
function resetTimer() {
    timer.innerHTML = 0;
    startTimer();
}

// clear the timers
function clearTimers() {
    clearTimeout(timerId);
    clearInterval(counterTimerId);
}
