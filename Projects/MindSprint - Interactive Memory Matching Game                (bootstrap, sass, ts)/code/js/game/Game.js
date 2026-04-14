import GameStatus from "./GameStatus.js";
import Board from "../models/Board.js";
import AudioManager from "../services/AudioManager.js";
import UIManger from "../ui/UIManger.js";
import Timer from "../services/Timer.js";
class Game {
    username = "";
    board;
    firstCard = null;
    secondCard = null;
    ui = new UIManger();
    timer = new Timer();
    moves = 0;
    wrongTries = 0;
    matches = 0;
    totalMatches = 0;
    progress = 0;
    status = GameStatus.Idle;
    audio = new AudioManager();
    // ============= Methods ================
    // Resets game state, creates/shuffles cards, and renders the initial board.
    initializeGame() {
        // reset game state, variables, status
        this.moves = 0;
        this.wrongTries = 0;
        this.matches = 0;
        this.totalMatches = 0;
        this.firstCard = null;
        this.secondCard = null;
        this.status = GameStatus.Idle;
        // reset progress
        this.progress = 0;
        // create cards
        const cardValues = [
            "angular.svg",
            "gitlab.svg",
            "postgresql.svg",
            "python.svg",
            "wordpress-blue.svg",
            "yarn.svg",
        ];
        this.board = new Board(cardValues);
        this.totalMatches = this.board.cards.length / 2;
        // shuffle cards
        this.board.shuffle();
        // render cards on UI
        this.ui.renderCardsOnUI(this.board.cards);
        // reset timer
        this.timer.reset();
        // disable all cards on UI
        this.ui.disableAllCards(this.board.cards);
        this.ui.updateWrongTries(this.wrongTries);
        this.ui.updateProgress(this.progress);
        this.ui.updateTimer(this.timer.getTime());
        // add default player name
        this.username = "Player";
        this.ui.updatePlayerName(this.username);
        this.ui.hidePauseOverlay();
    }
    // Starts a round flow: countdown, preview flip, audio, timer, and card activation.
    async start() {
        // show start countdown screen (3..2..1)
        await this.ui.showStartCountdownScreen();
        // rotate cards
        this.ui.rotateCards(this.board.cards);
        // play bg audio
        this.audio.playBg();
        this.status = GameStatus.Playing;
        // start timer
        this.timer.start(async () => {
            if (this.status !== GameStatus.Won && this.status !== GameStatus.Lost) {
                this.status = GameStatus.Checking;
                await this.ui.showTimeoutMessage();
                this.endWithFailure();
            }
        }, (remainingMs) => {
            this.ui.updateTimer(remainingMs);
        });
        // enable all cards on UI
        this.ui.enableAllCards(this.board.cards);
    }
    // Pauses the active round, timer, audio, and card interactions.
    pauseGame() {
        if (this.status !== GameStatus.Playing) {
            return false;
        }
        this.status = GameStatus.Paused;
        this.timer.pause();
        this.audio.stopBg();
        this.ui.disableAllCards(this.board.cards);
        this.ui.showPauseOverlay();
        return true;
    }
    // Resumes a paused round and restores the active game state.
    resumeGame() {
        if (this.status !== GameStatus.Paused) {
            return false;
        }
        this.status = GameStatus.Playing;
        this.ui.hidePauseOverlay();
        this.timer.resume();
        this.audio.playBg();
        this.ui.enableAllCards(this.board.cards);
        return true;
    }
    // Toggles between paused and playing states.
    togglePause() {
        this.status === GameStatus.Paused
            ? this.resumeGame()
            : this.pauseGame();
        return this.status === GameStatus.Paused;
    }
    // Handles a single card selection and triggers match check when two cards are chosen.
    selectCard(card) {
        if (this.status !== GameStatus.Playing) {
            return;
        }
        if (!card.isActive || card.isMatched || card.isFlipped) {
            return;
        }
        // flip the selected card (login + ui)
        this.ui.flipCard(card);
        this.audio.playCardFlip();
        // set first/second Card
        if (!this.firstCard) {
            this.firstCard = card;
        }
        else if (!this.secondCard) {
            this.secondCard = card;
            // check match
            this.checkMatch();
        }
    }
    // Compares selected cards and updates match/mismatch state.
    checkMatch() {
        if (!this.firstCard || !this.secondCard) {
            return;
        }
        this.status = GameStatus.Checking;
        this.moves += 1;
        const firstSelectedCard = this.firstCard;
        const secondSelectedCard = this.secondCard;
        if (firstSelectedCard.value === secondSelectedCard.value) {
            firstSelectedCard.isMatched = true;
            secondSelectedCard.isMatched = true;
            this.matches += 1;
            this.progress = (this.matches / this.totalMatches) * 100;
            this.ui.updateProgress(this.progress);
            this.firstCard = null;
            this.secondCard = null;
            if (this.matches >= this.totalMatches) {
                this.endWithSuccess();
                return;
            }
            this.audio.playSuccess();
            this.status = GameStatus.Playing;
            return;
        }
        this.wrongTries += 1;
        this.ui.updateWrongTries(this.wrongTries);
        this.audio.playFail();
        window.setTimeout(() => {
            this.ui.flipCard(firstSelectedCard);
            this.ui.flipCard(secondSelectedCard);
            this.firstCard = null;
            this.secondCard = null;
            if (this.status !== GameStatus.Won &&
                this.status !== GameStatus.Lost) {
                this.status = GameStatus.Playing;
            }
        }, 700);
    }
    // Finalizes UI/audio/state when player wins.
    endWithSuccess() {
        this.status = GameStatus.Won;
        this.progress = 100;
        this.ui.updateProgress(this.progress);
        this.endGame();
        this.audio.playWin();
    }
    // Finalizes UI/audio/state when player loses.
    endWithFailure() {
        this.status = GameStatus.Lost;
        this.endGame();
        this.audio.playGameOver();
    }
    // Ends the current game and runs result flow.
    endGame() {
        this.timer.stop();
        this.audio.stopBg();
        this.ui.disableAllCards(this.board.cards);
        this.ui.hidePauseOverlay();
        if (this.status !== GameStatus.Won && this.status !== GameStatus.Lost) {
            this.status = GameStatus.Lost;
        }
        this.ui.showGameResult(this.status === GameStatus.Won ? "win" : "lose", {
            username: this.username,
            moves: this.moves,
            wrongTries: this.wrongTries,
            matches: this.matches,
            totalMatches: this.totalMatches,
            progress: this.progress,
        });
    }
}
export default Game;
//# sourceMappingURL=Game.js.map