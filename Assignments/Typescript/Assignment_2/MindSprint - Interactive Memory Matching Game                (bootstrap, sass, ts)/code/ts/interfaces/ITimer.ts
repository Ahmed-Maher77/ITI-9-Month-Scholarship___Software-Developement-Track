interface ITimer {
    timerId: number | null;
    maxTime: number;
    currentTime: number;


    start: (onTimeout: () => void, onTick?: (remainingMs: number) => void) => void;
    pause: () => void;
    resume: () => void;
    stop: () => void;
    reset: () => void;
    getTime: () => number;
}

export default ITimer;
