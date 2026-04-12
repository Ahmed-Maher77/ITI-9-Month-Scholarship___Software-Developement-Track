import Game from "./game/Game.js";
import UsernamePromptScreen from "./ui/UsernamePromptScreen.js";
const game = new Game();
const usernamePromptScreen = new UsernamePromptScreen();
// Initialize game on page load
document.addEventListener("DOMContentLoaded", () => {
    game.initializeGame();
});
// ============= DOM Selection ================
const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("action-btn");
const programScreen = document.getElementById("program-screen");
const welcomeMessage = document.getElementById("welcome-message");
const currentYear = document.getElementById("current-year");
const cardsContainerWrapper = document.getElementById(
    "cards-container-wrapper",
);
const muteToggleBtn = document.getElementById("mute-toggle-btn");
const pauseToggleBtn = document.getElementById("pause-toggle-btn");
// ============= Event Listeners ================
if (currentYear) {
    currentYear.textContent = new Date().getFullYear().toString();
}
const updateMuteButtonState = (isMuted) => {
    if (!muteToggleBtn) {
        return;
    }
    muteToggleBtn.classList.toggle("is-muted", isMuted);
    muteToggleBtn.setAttribute("aria-pressed", String(isMuted));
    muteToggleBtn.setAttribute(
        "aria-label",
        isMuted ? "Unmute sounds" : "Mute sounds",
    );
    muteToggleBtn.title = isMuted ? "Unmute sounds" : "Mute sounds";
    muteToggleBtn.innerHTML = isMuted
        ? '<i class="fa-solid fa-volume-xmark"></i>'
        : '<i class="fa-solid fa-volume-high"></i>';
};
updateMuteButtonState(game.audio.isMuted());
game.ui.updatePauseButtonState(false);
muteToggleBtn?.addEventListener("click", () => {
    const isMuted = game.audio.toggleMute();
    updateMuteButtonState(isMuted);
});
pauseToggleBtn?.addEventListener("click", () => {
    const isPaused = game.togglePause();
    game.ui.updatePauseButtonState(isPaused);
});
// Start Button
startBtn?.addEventListener("click", () => {
    usernamePromptScreen.open(game.username == "Player" ? "" : game.username);
});
// Username Prompt Submission
usernamePromptScreen.setOnSubmit((username) => {
    game.username = username;
    startScreen?.classList.add("d-none");
    game.ui.updatePlayerName(username);
    game.start().then(() => {
        pauseToggleBtn?.classList.remove("d-none");
        game.ui.updatePauseButtonState(false);
    });
});
// Card Click
cardsContainerWrapper?.addEventListener("click", (event) => {
    const target = event.target;
    const cardElement = target.closest("figure[data-card-id]");
    const cardId = cardElement?.dataset.cardId;
    if (!cardId) {
        return;
    }
    const card = game.board.cards.find((item) => item.id === Number(cardId));
    if (!card) {
        return;
    }
    game.selectCard(card);
});
//# sourceMappingURL=main.js.map
