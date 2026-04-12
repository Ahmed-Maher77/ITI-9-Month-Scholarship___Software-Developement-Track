class UI {
    modalElement;
    modalForm;
    usernameInput;
    feedbackElement;
    modal;
    resolver = null;
    // Creates username modal controller and binds modal/form events.
    constructor() {
        this.modalElement = this.ensureModal();
        this.modalForm = this.modalElement.querySelector("form");
        this.usernameInput = this.modalElement.querySelector("#username-input");
        this.feedbackElement = this.modalElement.querySelector("#username-feedback");
        this.modal = new bootstrap.Modal(this.modalElement, {
            backdrop: "static",
            keyboard: true,
            focus: true,
        });
        this.bindEvents();
    }
    // Opens username prompt and resolves with entered value or null on cancel.
    promptUsername(initialValue = "") {
        this.usernameInput.value = initialValue;
        this.clearError();
        return new Promise((resolve) => {
            this.resolver = resolve;
            this.modal.show();
            setTimeout(() => this.usernameInput.focus(), 0);
        });
    }
    // Displays username validation feedback inside the modal.
    showUsernameError(message = "Please enter a username.") {
        this.feedbackElement.textContent = message;
        this.feedbackElement.classList.remove("d-none");
        this.usernameInput.classList.add("is-invalid");
        this.modal.show();
        this.usernameInput.focus();
    }
    // Clears validation feedback and invalid input styling.
    clearError() {
        this.feedbackElement.textContent = "";
        this.feedbackElement.classList.add("d-none");
        this.usernameInput.classList.remove("is-invalid");
    }
    // Ensures modal markup exists in DOM and returns its root element.
    ensureModal() {
        const existing = document.getElementById("username-modal");
        if (existing) {
            return existing;
        }
        const wrapper = document.createElement("div");
        wrapper.innerHTML = `
<div class="modal fade" id="username-modal" tabindex="-1" aria-hidden="true" aria-labelledby="username-modal-title">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <form novalidate>
        <div class="modal-header">
          <h5 id="username-modal-title" class="modal-title">Welcome</h5>
        </div>
        <div class="modal-body">
          <label for="username-input" class="form-label">Username</label>
          <input id="username-input" type="text" class="form-control" minlength="2" maxlength="20" required />
          <div id="username-feedback" class="invalid-feedback d-none">Please enter at least 2 characters.</div>
        </div>
        <div class="modal-footer">
          <button type="button" id="cancel-username-btn" class="btn btn-outline-secondary">Cancel</button>
          <button type="submit" class="btn btn-primary">Start</button>
        </div>
      </form>
    </div>
  </div>
</div>`;
        const modal = wrapper.firstElementChild;
        document.body.append(modal);
        return modal;
    }
    // Attaches submit/cancel/close handlers for modal behavior.
    bindEvents() {
        this.modalForm.addEventListener("submit", (event) => {
            event.preventDefault();
            if (!this.modalForm.checkValidity()) {
                this.modalForm.classList.add("was-validated");
                this.showUsernameError("Please enter at least 2 characters.");
                return;
            }
            const username = this.usernameInput.value.trim();
            this.modalForm.classList.remove("was-validated");
            this.clearError();
            this.resolve(username);
            this.modal.hide();
        });
        const cancelButton = this.modalElement.querySelector("#cancel-username-btn");
        cancelButton.addEventListener("click", () => {
            this.clearError();
            this.resolve(null);
            this.modal.hide();
        });
        this.modalElement.addEventListener("hidden.bs.modal", () => {
            this.clearError();
            if (this.resolver) {
                this.resolve(null);
            }
            this.modalForm.classList.remove("was-validated");
        });
    }
    // Resolves active prompt promise safely once.
    resolve(value) {
        if (!this.resolver) {
            return;
        }
        const resolve = this.resolver;
        this.resolver = null;
        resolve(value);
    }
}
export default UI;
//# sourceMappingURL=UI.js.map