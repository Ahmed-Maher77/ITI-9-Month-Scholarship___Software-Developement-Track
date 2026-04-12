class Timer {
    timerId = null;
    maxTime = 5 * 60 * 1000; // 5 minutes in milliseconds
    currentTime = this.maxTime;
    onTimeoutHandler = null;
    onTickHandler = null;
    // Starts a fresh countdown and stores the callbacks for pause/resume.
    start(onTimeout, onTick) {
        this.stop();
        this.onTimeoutHandler = onTimeout;
        this.onTickHandler = onTick ?? null;
        this.currentTime = this.maxTime;
        this.runCountdown();
    }
    // Pauses the active countdown without clearing the remaining time.
    pause() {
        this.stop();
    }
    // Resumes a paused countdown from the current remaining time.
    resume() {
        if (this.timerId !== null || !this.onTimeoutHandler) {
            return;
        }
        this.runCountdown();
    }
    // Stops the active timer if one is running.
    stop() {
        if (this.timerId !== null) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }
    // Resets tracked time and clears stored callbacks.
    reset() {
        this.stop();
        this.currentTime = this.maxTime;
        this.onTimeoutHandler = null;
        this.onTickHandler = null;
    }
    // Returns current tracked time value.
    getTime() {
        return this.currentTime;
    }
    // Runs the interval using the current remaining time as the baseline.
    runCountdown() {
        const endAt = Date.now() + this.currentTime;
        this.onTickHandler?.(this.currentTime);
        this.timerId = window.setInterval(() => {
            const remaining = Math.max(0, endAt - Date.now());
            this.currentTime = remaining;
            this.onTickHandler?.(remaining);
            if (remaining <= 0) {
                this.stop();
                this.onTimeoutHandler?.();
            }
        }, 250);
    }
}
export default Timer;
//# sourceMappingURL=Timer.js.map