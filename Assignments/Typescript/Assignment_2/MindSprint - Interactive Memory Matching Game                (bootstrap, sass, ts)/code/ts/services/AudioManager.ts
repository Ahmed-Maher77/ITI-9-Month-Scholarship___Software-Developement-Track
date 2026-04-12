import IAudioManager from "../interfaces/IAudioManager.js";

class AudioManager implements IAudioManager {
    bgAudio = new Audio("./files/audio/Sad-Emotional-Piano-Music-Background Music.mp3");
    successAudio = new Audio("./files/audio/success-sound-effect.mp3");
    failAudio = new Audio("./files/audio/Fail-sound-effect.mp3");
    gameOverAudio = new Audio("./files/audio/Game-Over-sound-effect.mp3");
    winAudio = new Audio("./files/audio/Winning-Sound-Effect.mp3");
    cardFlipAudio = new Audio("./files/audio/Flip-Card-Sound-Effects.mp3");
    private canResumeBg = true;
    private muted = false;
    private bgWasPlayingBeforeMute = false;

    // Enables continuous playback for background music by default.
    constructor() {
        this.bgAudio.loop = true;
    }

    // Returns all managed audio tracks for bulk operations.
    private get tracks() {
        return [
            this.bgAudio,
            this.successAudio,
            this.failAudio,
            this.gameOverAudio,
            this.winAudio,
            this.cardFlipAudio,
        ];
    }

    // Stops every track and rewinds them to the beginning.
    private stopAllSounds() {
        this.successAudio.onended = null;
        this.failAudio.onended = null;

        this.tracks.forEach((track) => {
            track.pause();
            track.currentTime = 0;
        });
    }

    // Applies mute state to all tracks and restores bg playback when needed.
    setMuted(value: boolean) {
        if (this.muted === value) {
            return;
        }

        if (value) {
            this.bgWasPlayingBeforeMute = !this.bgAudio.paused && this.canResumeBg;
        }

        this.muted = value;
        this.tracks.forEach((track) => {
            track.muted = value;
        });

        if (value) {
            this.stopAllSounds();
            return;
        }

        if (this.bgWasPlayingBeforeMute && this.canResumeBg) {
            this.bgAudio.play();
        }

        this.bgWasPlayingBeforeMute = false;
    }

    // Toggles mute state and returns the updated value.
    toggleMute() {
        this.setMuted(!this.muted);
        return this.muted;
    }

    // Reports whether audio output is currently muted.
    isMuted() {
        return this.muted;
    }


    // Plays looping/ambient background audio.
    playBg() {
        if (this.muted) {
            return;
        }
        this.canResumeBg = true;
        this.bgAudio.play();
    }

    // Pauses the background audio track.
    stopBg() {
        this.bgAudio.pause();
    }

    // Plays success cue and resumes background audio when it ends.
    playSuccess() {
        if (this.muted) {
            return;
        }
        // stop bg audio
        this.bgAudio.pause();
        // clear fail callback to avoid stale resumes
        this.failAudio.onended = null;
        // play success audio
        this.successAudio.currentTime = 0;
        this.successAudio.play();
        // after success audio ends, play bg audio again
        this.successAudio.onended = () => {
            if (!this.canResumeBg) {
                return;
            }
            this.bgAudio.play();
        };
    }

    // Plays fail cue and resumes background audio when it ends.
    playFail() {
        if (this.muted) {
            return;
        }
        // stop bg audio
        this.bgAudio.pause();
        // clear success callback to avoid stale resumes
        this.successAudio.onended = null;
        // play fail audio
        this.failAudio.currentTime = 0;
        this.failAudio.play();
        // after fail audio ends, play bg audio again
        this.failAudio.onended = () => {
            if (!this.canResumeBg) {
                return;
            }
            this.bgAudio.play();
        };
    }

    // Plays card-flip effect without interrupting the background track.
    playCardFlip() {
        if (this.muted) {
            return;
        }
        this.cardFlipAudio.currentTime = 0;
        this.cardFlipAudio.play();
    }

    // Stops background music and plays game-over sound.
    playGameOver() {
        this.canResumeBg = false;
        this.successAudio.onended = null;
        this.failAudio.onended = null;
        this.successAudio.pause();
        this.failAudio.pause();
        this.bgAudio.pause();
        this.bgAudio.currentTime = 0;
        this.gameOverAudio.currentTime = 0;
        if (!this.muted) {
            this.gameOverAudio.play();
        }
    }

    // Stops background music and plays winning sound.
    playWin() {
        this.canResumeBg = false;
        this.successAudio.onended = null;
        this.failAudio.onended = null;
        this.successAudio.pause();
        this.failAudio.pause();
        this.bgAudio.pause();
        this.bgAudio.currentTime = 0;
        this.winAudio.currentTime = 0;
        if (!this.muted) {
            this.winAudio.play();
        }
    }
}

export default AudioManager;
