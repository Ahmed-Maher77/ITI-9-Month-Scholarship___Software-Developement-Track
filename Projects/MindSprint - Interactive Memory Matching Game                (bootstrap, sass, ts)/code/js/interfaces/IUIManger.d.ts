import Card from "../models/Card.js";
type EndGameStats = {
    username: string;
    moves: number;
    wrongTries: number;
    matches: number;
    totalMatches: number;
    progress: number;
};
interface IUIManger {
    renderCardsOnUI(cards: Card[]): void;
    enableAllCards(cards: Card[]): void;
    disableAllCards(cards: Card[]): void;
    showStartCountdownScreen(): Promise<void>;
    rotateCards(cards: Card[]): void;
    flipCard(card: Card): void;
    updatePlayerName(name: string): void;
    updateWrongTries(value: number): void;
    updateProgress(value: number): void;
    updateTimer(remainingMs: number): void;
    updatePauseButtonState(isPaused: boolean): void;
    showTimeoutMessage(): Promise<void>;
    showPauseOverlay(): void;
    hidePauseOverlay(): void;
    showGameResult(result: "win" | "lose", stats: EndGameStats): void;
}
export default IUIManger;
//# sourceMappingURL=IUIManger.d.ts.map