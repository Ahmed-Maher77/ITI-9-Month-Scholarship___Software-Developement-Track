declare class UI {
    private modalElement;
    private modalForm;
    private usernameInput;
    private feedbackElement;
    private modal;
    private resolver;
    constructor();
    promptUsername(initialValue?: string): Promise<string | null>;
    showUsernameError(message?: string): void;
    private clearError;
    private ensureModal;
    private bindEvents;
    private resolve;
}
export default UI;
//# sourceMappingURL=UI.d.ts.map