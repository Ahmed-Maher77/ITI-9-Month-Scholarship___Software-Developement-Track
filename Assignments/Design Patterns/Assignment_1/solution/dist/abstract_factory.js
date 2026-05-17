// ==================== Bad example ====================
class Button {
    render(deviceType) {
        if (deviceType === 'ios') {
            console.log('ios button created');
        }
        else if (deviceType === 'android') {
            console.log('android button created');
        }
    }
}
class Modal {
    render(deviceType) {
        if (deviceType === 'ios') {
            console.log('ios modal created');
        }
        else if (deviceType === 'android') {
            console.log('android modal created');
        }
    }
}
class AndroidButton {
    render() {
        console.log('android button created');
    }
}
class IOSButton {
    render() {
        console.log('ios button created');
    }
}
class AndroidModal {
    render() {
        console.log('android modal created');
    }
}
class IOSModal {
    render() {
        console.log('ios modal created');
    }
}
class AndroidUIFactory {
    createButton() {
        return new AndroidButton();
    }
    createModal() {
        return new AndroidModal();
    }
}
class IOSUIFactory {
    createButton() {
        return new IOSButton();
    }
    createModal() {
        return new IOSModal();
    }
}
class Application {
    uiFactory;
    constructor(uiFactory) {
        this.uiFactory = uiFactory;
    }
    run() {
        const button = this.uiFactory.createButton();
        const modal = this.uiFactory.createModal();
        button.render();
        modal.render();
    }
}
const androidApp = new Application(new AndroidUIFactory());
androidApp.run();
const iosApp = new Application(new IOSUIFactory());
iosApp.run();
export {};
//# sourceMappingURL=abstract_factory.js.map