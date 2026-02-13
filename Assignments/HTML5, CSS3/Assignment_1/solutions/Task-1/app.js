// selectors
const video = document.querySelector("video");
const scrubberSlider = document.getElementById("scrubber-slider");
const playBtn = document.getElementById("play-btn");
const forwardBtn = document.getElementById("forward");
const backwordBtn = document.getElementById("backword");
const loopBtn = document.getElementById("loop");
const resetBtn = document.getElementById("reset");
const volumeBtn = document.getElementById("volume");
const volumeSlider = document.getElementById("volume-slider");
const fullScreenBtn = document.getElementById("full-screen");
const timeDisplay = document.getElementById("time-display");
const nextVideoBtn = document.getElementById("next-video");



const videos = [
    "media/001 Course Structure and Projects.mp4",
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "media/frozen.mp4",
];

// scrubber state
let isScrubbing = false;
let wasPlayingBeforeScrub = false;
let currentVideoIndex = 0;

// ========== Main Program ==========
// set scrubber max when ready
video.addEventListener("loadedmetadata", () => {
    scrubberSlider.max = Math.floor(video.duration);
    scrubberSlider.value = 0;
    // keep UI consistent on load
    loopBtn.classList.toggle("active", video.loop);
    updateTimeDisplay();
});

// Event Listeners
playBtn.addEventListener("click", togglePlayPause);
forwardBtn.addEventListener("click", goForward);
backwordBtn.addEventListener("click", goBackward);
loopBtn.addEventListener("click", toggleLoop);
resetBtn.addEventListener("click", resetVideo);

// scrubber events (mouse)
scrubberSlider.addEventListener("mousedown", startScrub);
scrubberSlider.addEventListener("mouseup", endScrub);
scrubberSlider.addEventListener("input", handleScrubInput);

// scrubber events (touch)
scrubberSlider.addEventListener("touchstart", startScrub);
scrubberSlider.addEventListener("touchend", endScrub);
scrubberSlider.addEventListener("touchcancel", endScrub);

video.addEventListener("timeupdate", syncScrubberWithVideo);
video.addEventListener("ended", handleVideoEnded);
volumeSlider.addEventListener("input", updateVolume);
volumeBtn.addEventListener("click", toggleVolume);
fullScreenBtn.addEventListener("click", toggleFullScreen);
nextVideoBtn.addEventListener("click", playNextVideo);


// ============ Functions ============
// Scrubber handlers
function startScrub() {
    isScrubbing = true;
    wasPlayingBeforeScrub = !video.paused;
    if (wasPlayingBeforeScrub) {
        video.pause();
    }
}

function handleScrubInput() {
    const newTime = Number(scrubberSlider.value);
    video.currentTime = newTime;
    updateTimeDisplay();
}

function updateTimeDisplay() {
    if (!timeDisplay) return;

    const current = Math.floor(video.currentTime);
    const duration = Math.floor(video.duration);
    
    timeDisplay.textContent = `${formatTime(current)} / ${formatTime(duration)}`;
}


function formatTime(time) {
    if (!Number.isFinite(time) || time < 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function endScrub() {
    isScrubbing = false;
    let newTime = Number(scrubberSlider.value);
    if (video.loop && newTime >= Number(scrubberSlider.max)) {
        newTime = 0;
        scrubberSlider.value = 0;
    }

    video.currentTime = newTime;
    updateTimeDisplay();
    if (wasPlayingBeforeScrub) {
        video.play();
    }
}

// sync the scrubber with the video current time
function syncScrubberWithVideo() {
    if (isScrubbing) return; // don't fight user while they scrub
    scrubberSlider.value = Math.floor(video.currentTime);
    updateTimeDisplay();
}

// when video naturally reaches the end
function handleVideoEnded() {
    if (!video.loop) {
        playBtn.firstElementChild.classList.replace("fa-pause", "fa-play");
    }
}


// Toggle Play/Pause
function togglePlayPause() {
    const isPlaying = !video.paused; // Check if the video is playing
    if (isPlaying) {
        video.pause();
        playBtn.firstElementChild.classList.replace("fa-pause", "fa-play");
    } else {
        video.play();
        playBtn.firstElementChild.classList.replace("fa-play", "fa-pause");
    }
}

// Go Forward/Backward 10 seconds
function goForward() {
    const newTime = video.currentTime + 10;
    if (newTime < video.duration) {
        video.currentTime = newTime;
    }
}
function goBackward() {
    const newTime = video.currentTime - 10;
    if (newTime > 0) {
        video.currentTime = newTime;
    }
}

// Toggle loop
function toggleLoop() {
    const isloop = video.loop;
    video.loop = !isloop;
    loopBtn.classList.toggle("active");
}

// Reset Video
function resetVideo() {
    video.currentTime = 0;
    scrubberSlider.value = 0;
    updateTimeDisplay();
    if (!video.paused) {
        togglePlayPause();
    }
}

// Reach the end of the video
function reachEnd() {
    const videoDuration = video.duration;
    video.currentTime = videoDuration;
}

// Toggle Volume
function toggleVolume() {
    const isMuted = video.muted;
    video.muted = !isMuted;
    if (isMuted) {
        volumeBtn.firstElementChild.classList.replace("fa-volume-xmark", "fa-volume-high");
    } else {
        volumeBtn.firstElementChild.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
}

// Update Volume
function updateVolume() {
    const volumeValue = volumeSlider.value;
    video.volume = volumeValue;
}


// Toggle Full Screen
function toggleFullScreen() {
    const isFullScreen = document.fullscreenElement;
    if (!isFullScreen) {
        video.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}


// Play Next Video
function playNextVideo() {
    video.src = videos[(++currentVideoIndex) % videos.length];
    video.load();
    video.play();
}