import GameStatus from "./GameStatus.js";
import Card from "../models/Card.js";
import Board from "../models/Board.js";
import AudioManager from "../services/AudioManager.js";
import IGame from "../interfaces/IGame.js";
import UIManger from "../ui/UIManger.js";
import Timer from "../services/Timer.js";
declare class Game implements IGame {
    username: string;
    board: Board;
    firstCard: Card | null;
    secondCard: Card | null;
    ui: UIManger;
    timer: Timer;
    moves: number;
    wrongTries: number;
    matches: number;
    totalMatches: number;
    progress: number;
    status: GameStatus;
    audio: AudioManager;
    initializeGame(): void;
    start(): Promise<void>;
    pauseGame(): boolean;
    resumeGame(): boolean;
    togglePause(): boolean;
    selectCard(card: Card): void;
    checkMatch(): void;
    endWithSuccess(): void;
    endWithFailure(): void;
    endGame(): void;
}
export default Game;
//# sourceMappingURL=Game.d.ts.map