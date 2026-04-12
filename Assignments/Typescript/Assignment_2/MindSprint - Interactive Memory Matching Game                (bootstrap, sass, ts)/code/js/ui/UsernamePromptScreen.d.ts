declare class UsernamePromptScreen {
    private modalElement;
    private formElement;
    private inputElement;
    private feedbackElement;
    private modal;
    private onSubmit;
    constructor();
    setOnSubmit(callback: (username: string) => void): void;
    open(initialValue: string): void;
    private createModal;
    private handleEvents;
    private showError;
    private clearError;
}
export default UsernamePromptScreen;
//# sourceMappingURL=UsernamePromptScreen.d.ts.map