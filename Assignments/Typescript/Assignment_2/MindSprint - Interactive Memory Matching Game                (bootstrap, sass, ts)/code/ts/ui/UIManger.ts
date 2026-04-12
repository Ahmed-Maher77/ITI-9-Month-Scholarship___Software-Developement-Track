
import Card from "../models/Card.js";
import IUIManger from "../interfaces/IUIManger.js";
import truncateText from "../utils/truncateText.js";

class UIManger implements IUIManger {
    cardsContainerWrapper = document.getElementById(
        "cards-container-wrapper",
    ) as HTMLDivElement | null;
    wrongTriesValue = document.querySelector(
        ".wrong-tries-value",
    ) as HTMLSpanElement | null;
    progressElement = document.getElementById(
        "game-progress",
    ) as HTMLDivElement | null;
    progressBarElement = document.querySelector(
        "#game-progress .progress-bar",
    ) as HTMLDivElement | null;
    progressNumberElement = document.querySelector(
        "#game-progress .progress-bar-number",
    ) as HTMLDivElement | null;
    timerValueElement = document.getElementById(
        "timer-value",
    ) as HTMLSpanElement | null;
    endGameOverlayId = "end-game-overlay";
    pauseOverlayId = "pause-overlay";


    // Builds and injects all card elements into the board container.
    renderCardsOnUI(cards: Card[]) {

        if (!this.cardsContainerWrapper) {
            return;
        }

        this.cardsContainerWrapper.innerHTML = "";

        const fragment = document.createDocumentFragment();

        cards.forEach((card, index) => {
            const figure = document.createElement("figure");
            figure.dataset.cardId = String(card.id);

            const frontFace = document.createElement("div");
            frontFace.className = "front-face image-reveal w-100";

            const img = document.createElement("img");
            img.src = `./images/${card.value}`;
            img.alt = card.value.replace(".svg", "");
            frontFace.appendChild(img);

            const backFace = document.createElement("div");
            backFace.className = "back-face image-mystery w-100";
            backFace.textContent = String(index + 1);

            figure.append(frontFace, backFace);

            fragment.append(figure);
        });

        this.cardsContainerWrapper.appendChild(fragment);
    };


    // Enables interaction for every card in the current board.
    enableAllCards(cards: Card[]) {
        for (const card of cards) {
            card.isActive = true;
        }
    };

    // Disables interaction for every card in the current board.
    disableAllCards(cards: Card[]) {
        for (const card of cards) {
            card.isActive = false;
        }
    };


    // Shows the game-start countdown overlay and resolves when it disappears.
    showStartCountdownScreen(): Promise<void> {
        return new Promise((resolve) => {
        const existingOverlay = document.getElementById("start-countdown-overlay");
        existingOverlay?.remove();

        const overlay = document.createElement("div");
        overlay.id = "start-countdown-overlay";
        Object.assign(overlay.style, {
            position: "fixed",
            inset: "0",
            background: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(2px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "9999",
            opacity: "1",
            transition: "opacity 0.3s ease",
        });

        const countdownText = document.createElement("div");
        Object.assign(countdownText.style, {
            color: "#ffffff",
            fontSize: "clamp(3rem, 14vw, 7rem)",
            fontWeight: "700",
            textShadow: "0 8px 18px rgba(0, 0, 0, 0.45)",
            userSelect: "none",
        });

        let counter = 3;
        countdownText.textContent = String(counter);

        overlay.appendChild(countdownText);
        document.body.appendChild(overlay);

        const intervalId = window.setInterval(() => {
            counter--;

            if (counter > 0) {
                countdownText.textContent = String(counter);
                return;
            }

            countdownText.textContent = "GO!";
            window.clearInterval(intervalId);

            window.setTimeout(() => {
                overlay.style.opacity = "0";
                window.setTimeout(() => {
                    overlay.remove();
                    resolve();
                }, 300);
            }, 450);
        }, 900);
        });
    }

    // Temporarily flips all cards for preview, then returns them to hidden state.
    rotateCards(cards: Card[]) {
        if (!this.cardsContainerWrapper) {
            return;
        }

        const cardElements = Array.from(
            this.cardsContainerWrapper.querySelectorAll<HTMLDivElement>("figure"),
        );

        cards.forEach((card) => {
            card.isFlipped = true;
        });

        cardElements.forEach((cardElement) => {
            cardElement.classList.add("flipped");
        });

        window.setTimeout(() => {
            cards.forEach((card) => {
                card.isFlipped = false;
            });

            cardElements.forEach((cardElement) => {
                cardElement.classList.remove("flipped");
            });
        }, 3000);
    }


    // Updates the top-bar greeting with a truncated player name.
    updatePlayerName(name: string) {
        const welcomeMessage = document.getElementById(
            "welcome-message",
        ) as HTMLHeadingElement | null;

        if (!welcomeMessage) {
            return;
        }

        welcomeMessage.innerHTML = `👋 <span class="welcome-label">Hello:</span> <b>${truncateText(name, 13)}</b>!`;
    }

    // Reflects mismatch count in the top bar.
    updateWrongTries(value: number) {
        if (!this.wrongTriesValue) {
            return;
        }

        this.wrongTriesValue.textContent = ` ${value} `;
    }

    // Updates top progress bar width, label, and aria value.
    updateProgress(value: number) {
        const normalizedValue = Math.max(0, Math.min(100, Math.round(value)));

        if (this.progressElement) {
            this.progressElement.setAttribute(
                "aria-valuenow",
                String(normalizedValue),
            );
        }

        if (this.progressBarElement) {
            this.progressBarElement.style.width = `${normalizedValue}%`;
        }

        if (this.progressNumberElement) {
            this.progressNumberElement.textContent = `${normalizedValue}%`;
        }
    }

    // Updates the top timer label in mm:ss format.
    updateTimer(remainingMs: number) {
        if (!this.timerValueElement) {
            return;
        }

        const totalSeconds = Math.max(0, Math.ceil(remainingMs / 1000));
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const formatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        this.timerValueElement.textContent = ` ${formatted} `;
    }

    // Updates the pause button icon and accessibility state.
    updatePauseButtonState(isPaused: boolean) {
        const pauseToggleBtn = document.getElementById(
            "pause-toggle-btn",
        ) as HTMLButtonElement | null;
        const muteToggleBtn = document.getElementById(
            "mute-toggle-btn",
        ) as HTMLButtonElement | null;

        if (!pauseToggleBtn || !muteToggleBtn) {
            return;
        }

        pauseToggleBtn.classList.toggle("is-paused", isPaused);
        muteToggleBtn.style.zIndex = isPaused ? "10000" : "2";
        pauseToggleBtn.setAttribute("aria-pressed", String(isPaused));
        pauseToggleBtn.setAttribute(
            "aria-label",
            isPaused ? "Resume game" : "Pause game",
        );
        pauseToggleBtn.title = isPaused ? "Resume game" : "Pause game";
        pauseToggleBtn.innerHTML = isPaused
            ? '<i class="fa-solid fa-play"></i>'
            : '<i class="fa-solid fa-pause"></i>';
    }

    // Shows a timeout overlay that visually matches the game-start countdown style.
    showTimeoutMessage(): Promise<void> {
        return new Promise((resolve) => {
            const existingOverlay = document.getElementById("timeout-overlay");
            existingOverlay?.remove();

            const overlay = document.createElement("div");
            overlay.id = "timeout-overlay";
            Object.assign(overlay.style, {
                position: "fixed",
                inset: "0",
                background: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(2px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: "9999",
                opacity: "1",
                transition: "opacity 0.3s ease",
            });

            const text = document.createElement("div");
            text.textContent = "TIME OUT!";
            Object.assign(text.style, {
                color: "#ffffff",
                fontSize: "clamp(2.5rem, 12vw, 6rem)",
                fontWeight: "700",
                textShadow: "0 8px 18px rgba(0, 0, 0, 0.45)",
                userSelect: "none",
            });

            overlay.appendChild(text);
            document.body.appendChild(overlay);

            window.setTimeout(() => {
                overlay.style.opacity = "0";
                window.setTimeout(() => {
                    overlay.remove();
                    resolve();
                }, 300);
            }, 1100);
        });
    }

    // Shows a pause overlay while the round is suspended.
    showPauseOverlay() {
        const existingOverlay = document.getElementById(this.pauseOverlayId);
        existingOverlay?.remove();

        const overlay = document.createElement("div");
        overlay.id = this.pauseOverlayId;
        overlay.className = "pause-overlay";
        overlay.innerHTML = `
            <div class="pause-overlay-backdrop" aria-hidden="true"></div>
            <div class="pause-overlay-card">
                <i class="fa-solid fa-pause"></i>
                <h2>Paused</h2>
                <p>Resume to continue the round.</p>
            </div>
        `;

        document.body.appendChild(overlay);
    }

    // Removes the pause overlay after resuming the round.
    hidePauseOverlay() {
        const existingOverlay = document.getElementById(this.pauseOverlayId);
        existingOverlay?.remove();
    }

    // Shows end-game popup with result-specific decoration and final stats.
    showGameResult(
        result: "win" | "lose",
        stats: {
            username: string;
            moves: number;
            wrongTries: number;
            matches: number;
            totalMatches: number;
            progress: number;
        },
    ) {
        const existingOverlay = document.getElementById(this.endGameOverlayId);
        existingOverlay?.remove();

        const overlay = document.createElement("div");
        overlay.id = this.endGameOverlayId;
        overlay.className = "end-game-overlay";

        const isWin = result === "win";
        const title = isWin ? "You Won!" : "Game Over";
        const subtitle = isWin
            ? "Brilliant memory run."
            : "Nice try. Give it another shot.";
        const icon = isWin ? "fa-solid fa-trophy" : "fa-solid fa-heart-crack";
        const sceneDecorations = isWin
            ? [
                  { icon: "fa-solid fa-star", top: "8%", left: "10%", size: "1.6rem", delay: "0s" },
                  { icon: "fa-solid fa-sparkles", top: "14%", left: "28%", size: "1.3rem", delay: "0.25s" },
                  { icon: "fa-solid fa-star", top: "16%", left: "78%", size: "1.8rem", delay: "0.5s" },
                  { icon: "fa-solid fa-trophy", top: "30%", left: "6%", size: "1.9rem", delay: "0.15s" },
                  { icon: "fa-solid fa-star", top: "34%", left: "88%", size: "1.4rem", delay: "0.4s" },
                  { icon: "fa-solid fa-sparkles", top: "48%", left: "12%", size: "1.5rem", delay: "0.55s" },
                  { icon: "fa-solid fa-star", top: "52%", left: "82%", size: "2rem", delay: "0.1s" },
                  { icon: "fa-solid fa-heart", top: "66%", left: "20%", size: "1.4rem", delay: "0.3s" },
                  { icon: "fa-solid fa-sparkles", top: "70%", left: "72%", size: "1.2rem", delay: "0.6s" },
                  { icon: "fa-solid fa-star", top: "82%", left: "40%", size: "1.7rem", delay: "0.2s" },
                  { icon: "fa-solid fa-star", top: "86%", left: "8%", size: "1.1rem", delay: "0.45s" },
                  { icon: "fa-solid fa-sparkles", top: "88%", left: "90%", size: "1.5rem", delay: "0.05s" },
              ]
            : [
                  { icon: "fa-solid fa-heart-crack", top: "10%", left: "16%", size: "1.5rem", delay: "0s" },
                  { icon: "fa-solid fa-xmark", top: "12%", left: "82%", size: "1.4rem", delay: "0.25s" },
                  { icon: "fa-solid fa-triangle-exclamation", top: "28%", left: "8%", size: "1.7rem", delay: "0.4s" },
                  { icon: "fa-solid fa-heart-crack", top: "34%", left: "76%", size: "1.9rem", delay: "0.15s" },
                  { icon: "fa-solid fa-xmark", top: "46%", left: "18%", size: "1.3rem", delay: "0.6s" },
                  { icon: "fa-solid fa-triangle-exclamation", top: "50%", left: "88%", size: "1.6rem", delay: "0.3s" },
                  { icon: "fa-solid fa-heart-crack", top: "64%", left: "10%", size: "1.4rem", delay: "0.45s" },
                  { icon: "fa-solid fa-xmark", top: "68%", left: "84%", size: "1.7rem", delay: "0.1s" },
                  { icon: "fa-solid fa-triangle-exclamation", top: "80%", left: "28%", size: "1.5rem", delay: "0.55s" },
                  { icon: "fa-solid fa-heart-crack", top: "84%", left: "56%", size: "2rem", delay: "0.2s" },
                  { icon: "fa-solid fa-xmark", top: "90%", left: "38%", size: "1.2rem", delay: "0.35s" },
                  { icon: "fa-solid fa-triangle-exclamation", top: "92%", left: "92%", size: "1.4rem", delay: "0.05s" },
              ];

        const normalizedProgress = Math.max(
            0,
            Math.min(100, Math.round(stats.progress)),
        );

        const sceneDecorationMarkup = sceneDecorations
            .map(
                (item) => `
                    <span style="top: ${item.top}; left: ${item.left}; --scene-size: ${item.size}; animation-delay: ${item.delay};">
                        <i class="${item.icon}"></i>
                    </span>
                `,
            )
            .join("");

        overlay.innerHTML = `
            <div class="end-game-backdrop"></div>
            <div class="end-game-scene-decoration" aria-hidden="true">
                ${sceneDecorationMarkup}
            </div>
            <section class="end-game-card ${isWin ? "end-game-win" : "end-game-lose"}">
                <div class="end-game-decoration" aria-hidden="true">
                    <span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <header class="end-game-header">
                    <i class="${icon}"></i>
                    <h2>${title}</h2>
                    <p>${subtitle}</p>
                </header>
                <div class="end-game-stats">
                    <p><span>Player Name</span><b>${truncateText(stats.username || "Player", 18)}</b></p>
                    <p><span>Moves</span><b>${stats.moves}</b></p>
                    <p><span>Wrong Tries</span><b>${stats.wrongTries}</b></p>
                    <p><span>Matches</span><b>${stats.matches} / ${stats.totalMatches}</b></p>
                    <p><span>Progress</span><b>${normalizedProgress}%</b></p>
                </div>
                <button type="button" class="end-game-btn">Play Again</button>
            </section>
        `;

        document.body.appendChild(overlay);

        const replayButton = overlay.querySelector(
            ".end-game-btn",
        ) as HTMLButtonElement | null;
        replayButton?.addEventListener("click", () => {
            window.location.reload();
        });
    }


    // Flips a specific card in both model state and corresponding DOM element.
    flipCard(card: Card) {        
        const cardElement = this.cardsContainerWrapper?.querySelector<HTMLDivElement>(
            `figure[data-card-id="${card.id}"]`,
        );

        if (!cardElement) {
            return;
        }

        card.flip();
        cardElement.classList.toggle("flipped");
    }
}

export default UIManger;