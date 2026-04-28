interface AudioManager {
    bgAudio: HTMLAudioElement;
    successAudio: HTMLAudioElement;
    failAudio: HTMLAudioElement;
    gameOverAudio: HTMLAudioElement;
    winAudio: HTMLAudioElement;
    cardFlipAudio: HTMLAudioElement;


    playBg: () => void;
    stopBg: () => void;
    playSuccess: () => void;
    playFail: () => void;
    playCardFlip: () => void;
    playGameOver: () => void;
    playWin: () => void;
    setMuted: (value: boolean) => void;
    toggleMute: () => boolean;
    isMuted: () => boolean;
}

export default AudioManager;
