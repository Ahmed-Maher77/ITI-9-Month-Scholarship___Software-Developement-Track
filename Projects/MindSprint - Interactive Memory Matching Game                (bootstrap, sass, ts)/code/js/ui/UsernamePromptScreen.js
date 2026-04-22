class UsernamePromptScreen {
    modalElement;
    formElement;
    inputElement;
    feedbackElement;
    modal;
    onSubmit = null;
    // Creates modal instance and wires required DOM references and events.
    constructor() {
        this.modalElement = this.createModal();
        this.formElement = this.modalElement.querySelector("form");
        this.inputElement = this.modalElement.querySelector("#username-input");
        this.feedbackElement = this.modalElement.querySelector("#username-feedback");
        this.modal = new bootstrap.Modal(this.modalElement, {
            backdrop: "static",
            keyboard: true,
            focus: true,
        });
        this.handleEvents();
    }
    // Registers callback to execute after valid username submission.
    setOnSubmit(callback) {
        this.onSubmit = callback;
    }
    // Opens the username modal with optional initial input value.
    open(initialValue) {
        this.inputElement.value = initialValue;
        this.clearError();
        this.modal.show();
    }
    // Creates the username modal markup if it does not already exist.
    createModal() {
        const existingModal = document.getElementById("username-modal");
        if (existingModal) {
            return existingModal;
        }
        const container = document.createElement("div");
        container.innerHTML = `
<div class="modal fade" id="username-modal" tabindex="-1" aria-hidden="true" aria-labelledby="username-modal-title">
    <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content username-modal-card border-0 shadow-lg rounded-4 overflow-hidden">
            <form novalidate>
                <div class="modal-header border-0 px-4 pt-4 pb-2">
                    <h5 id="username-modal-title" class="modal-title fw-bold">Enter Your Name</h5>
                </div>
                <div class="modal-body px-4 pb-3 pt-0">
                    <label for="username-input" class="form-label">Username</label>
                    <input id="username-input" type="text" class="form-control rounded-3 py-2" placeholder="Type your name" required minlength="2" />
                    <div id="username-feedback" class="invalid-feedback d-none">Username is required.</div>
                </div>
                <div class="modal-footer border-0 px-4 pb-4 pt-0 gap-2 d-flex flex-row-reverse gap-2 mt-4 flex-nowrap">
                <button type="submit" class="btn main-btn px-4 py-2 w-100">Start Game</button>
                    <button type="button" id="cancel-username-btn" class="btn cancel-btn px-4 py-2 w-100">Cancel</button>
                </div>
            </form>
        </div>
    </div>
</div>`;
        const modal = container.firstElementChild;
        document.body.append(modal);
        return modal;
    }
    // Binds submit, cancel, and bootstrap modal lifecycle handlers.
    handleEvents() {
        this.formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            const username = this.inputElement.value.trim();
            if (!username) {
                this.showError("Username is required.");
                return;
            }
            if (username.length < 2) {
                this.showError("Username must be at least 2 characters.");
                return;
            }
            this.clearError();
            this.hideModalSafely();
            if (this.onSubmit) {
                this.onSubmit(username);
            }
        });
        const cancelButton = this.modalElement.querySelector("#cancel-username-btn");
        cancelButton.addEventListener("click", () => {
            this.clearError();
            this.hideModalSafely();
        });
        this.modalElement.addEventListener("hidden.bs.modal", () => {
            this.clearError();
        });
        this.modalElement.addEventListener("shown.bs.modal", () => {
            this.inputElement.focus();
            this.inputElement.select();
        });
    }
    // Shows a validation message on the username input.
    showError(message) {
        this.feedbackElement.textContent = message;
        this.feedbackElement.classList.remove("d-none");
        this.inputElement.classList.add("is-invalid");
    }
    // Clears validation UI state from the username input.
    clearError() {
        this.feedbackElement.textContent = "";
        this.feedbackElement.classList.add("d-none");
        this.inputElement.classList.remove("is-invalid");
    }
    // Blurs focused modal controls before hiding to avoid aria-hidden focus warnings.
    hideModalSafely() {
        const activeElement = document.activeElement;
        if (activeElement && this.modalElement.contains(activeElement)) {
            activeElement.blur();
        }
        this.modal.hide();
    }
}
export default UsernamePromptScreen;
//# sourceMappingURL=UsernamePromptScreen.js.map