import IAudioManager from "../interfaces/IAudioManager.js";
declare class AudioManager implements IAudioManager {
    bgAudio: HTMLAudioElement;
    successAudio: HTMLAudioElement;
    failAudio: HTMLAudioElement;
    gameOverAudio: HTMLAudioElement;
    winAudio: HTMLAudioElement;
    cardFlipAudio: HTMLAudioElement;
    private canResumeBg;
    private muted;
    private bgWasPlayingBeforeMute;
    constructor();
    private get tracks();
    private stopAllSounds;
    setMuted(value: boolean): void;
    toggleMute(): boolean;
    isMuted(): boolean;
    playBg(): void;
    stopBg(): void;
    playSuccess(): void;
    playFail(): void;
    playCardFlip(): void;
    playGameOver(): void;
    playWin(): void;
}
export default AudioManager;
//# sourceMappingURL=AudioManager.d.ts.map