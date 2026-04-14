import Board from "../models/Board.js";
import Card from "../models/Card.js";
import GameStatus from "../game/GameStatus.js";
import AudioManager from "../services/AudioManager.js";
interface IGame {
    username: string;
    board: Board;
    firstCard: Card | null;
    secondCard: Card | null;
    moves: number;
    wrongTries: number;
    matches: number;
    totalMatches: number;
    progress: number;
    status: GameStatus;
    audio: AudioManager;
    initializeGame(): void;
    start(): Promise<void>;
    selectCard(card: Card): void;
    togglePause(): boolean;
    pauseGame(): boolean;
    resumeGame(): boolean;
    checkMatch(): void;
    endWithSuccess(): void;
    endWithFailure(): void;
    endGame(): void;
}
export default IGame;
//# sourceMappingURL=IGame.d.ts.map