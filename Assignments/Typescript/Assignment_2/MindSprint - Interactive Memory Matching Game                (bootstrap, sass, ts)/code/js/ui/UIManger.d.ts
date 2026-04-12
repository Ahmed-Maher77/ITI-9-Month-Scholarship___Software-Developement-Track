import Card from "../models/Card.js";
import IUIManger from "../interfaces/IUIManger.js";
declare class UIManger implements IUIManger {
    cardsContainerWrapper: HTMLDivElement | null;
    wrongTriesValue: HTMLSpanElement | null;
    progressElement: HTMLDivElement | null;
    progressBarElement: HTMLDivElement | null;
    progressNumberElement: HTMLDivElement | null;
    timerValueElement: HTMLSpanElement | null;
    endGameOverlayId: string;
    pauseOverlayId: string;
    renderCardsOnUI(cards: Card[]): void;
    enableAllCards(cards: Card[]): void;
    disableAllCards(cards: Card[]): void;
    showStartCountdownScreen(): Promise<void>;
    rotateCards(cards: Card[]): void;
    updatePlayerName(name: string): void;
    updateWrongTries(value: number): void;
    updateProgress(value: number): void;
    updateTimer(remainingMs: number): void;
    updatePauseButtonState(isPaused: boolean): void;
    showTimeoutMessage(): Promise<void>;
    showPauseOverlay(): void;
    hidePauseOverlay(): void;
    showGameResult(result: "win" | "lose", stats: {
        username: string;
        moves: number;
        wrongTries: number;
        matches: number;
        totalMatches: number;
        progress: number;
    }): void;
    flipCard(card: Card): void;
}
export default UIManger;
//# sourceMappingURL=UIManger.d.ts.map