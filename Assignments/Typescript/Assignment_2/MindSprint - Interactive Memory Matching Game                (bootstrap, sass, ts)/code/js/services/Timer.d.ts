import ITimer from "../interfaces/ITimer.js";
declare class Timer implements ITimer {
    timerId: number | null;
    maxTime: number;
    currentTime: number;
    private onTimeoutHandler;
    private onTickHandler;
    start(onTimeout: () => void, onTick?: (remainingMs: number) => void): void;
    pause(): void;
    resume(): void;
    stop(): void;
    reset(): void;
    getTime(): number;
    private runCountdown;
}
export default Timer;
//# sourceMappingURL=Timer.d.ts.map