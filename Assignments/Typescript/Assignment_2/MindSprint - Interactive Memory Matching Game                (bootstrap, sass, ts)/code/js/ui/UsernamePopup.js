class UsernamePopup {
    modalElement;
    formElement;
    usernameInput;
    cancelButton;
    modalInstance;
    resolver = null;
    constructor() {
        this.modalElement = this.buildModal();
        this.formElement = this.modalElement.querySelector("form");
        this.usernameInput = this.modalElement.querySelector("#username-input");
        this.cancelButton = this.modalElement.querySelector("#cancel-username-btn");
        this.modalInstance = new bootstrap.Modal(this.modalElement, {
            backdrop: "static",
            keyboard: true,
            focus: true,
        });
        this.bindEvents();
    }
    open(initialValue = "") {
        this.usernameInput.value = initialValue;
        return new Promise((resolve) => {
            this.resolver = resolve;
            this.modalInstance.show();
            setTimeout(() => this.usernameInput.focus(), 0);
        });
    }
    buildModal() {
        const existingModal = document.getElementById("username-modal");
        if (existingModal) {
            return existingModal;
        }
        const wrapper = document.createElement("div");
        wrapper.innerHTML = `
<div class="modal fade" id="username-modal" tabindex="-1" aria-labelledby="username-modal-title" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <form class="needs-validation" novalidate>
        <div class="modal-header">
          <h5 class="modal-title" id="username-modal-title">Start Game</h5>
        </div>
        <div class="modal-body">
          <label for="username-input" class="form-label">Username</label>
          <input id="username-input" type="text" class="form-control" placeholder="Enter your username" minlength="2" maxlength="20" required />
          <div class="invalid-feedback">Please enter at least 2 characters.</div>
        </div>
        <div class="modal-footer">
          <button id="cancel-username-btn" type="button" class="btn btn-outline-secondary">Cancel</button>
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
    bindEvents() {
        this.formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            event.stopPropagation();
            if (!this.formElement.checkValidity()) {
                this.formElement.classList.add("was-validated");
                this.usernameInput.focus();
                return;
            }
            const username = this.usernameInput.value.trim();
            this.formElement.classList.remove("was-validated");
            this.resolveAndClose(username);
        });
        this.cancelButton.addEventListener("click", () => {
            this.formElement.classList.remove("was-validated");
            this.resolveAndClose(null);
        });
        this.modalElement.addEventListener("hidden.bs.modal", () => {
            this.formElement.classList.remove("was-validated");
            if (this.resolver) {
                this.resolve(null);
            }
        });
    }
    resolveAndClose(value) {
        this.resolve(value);
        this.modalInstance.hide();
    }
    resolve(value) {
        if (!this.resolver) {
            return;
        }
        const resolve = this.resolver;
        this.resolver = null;
        resolve(value);
    }
}
export default UsernamePopup;
//# sourceMappingURL=UsernamePopup.js.map