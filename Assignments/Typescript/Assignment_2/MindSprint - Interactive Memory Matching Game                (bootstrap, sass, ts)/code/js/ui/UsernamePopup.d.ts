declare class UsernamePopup {
    private modalElement;
    private formElement;
    private usernameInput;
    private cancelButton;
    private modalInstance;
    private resolver;
    constructor();
    open(initialValue?: string): Promise<string | null>;
    private buildModal;
    private bindEvents;
    private resolveAndClose;
    private resolve;
}
export default UsernamePopup;
//# sourceMappingURL=UsernamePopup.d.ts.map