
// ==================== Bad example ====================
class Button {
    render(deviceType: string) {
        if (deviceType === 'ios') {
            console.log('ios button created');
        } else if (deviceType === 'android') {
            console.log('android button created');
        }
    }
}
class Modal {
    render(deviceType: string) {
        if (deviceType === 'ios') {
            console.log('ios modal created');
        } else if (deviceType === 'android') {
            console.log('android modal created');
        }
    }
}



// ==================== Good example ====================
// depends on abstraction
interface IButton {
    render(): void;
}
interface IModal {
    render(): void;
}

class AndroidButton implements IButton {
    render() {
        console.log('android button created');
    }
}
class IOSButton implements IButton {
    render() {
        console.log('ios button created');
    }
}

class AndroidModal implements IModal {
    render() {
        console.log('android modal created');
    }
}
class IOSModal implements IModal {
    render() {
        console.log('ios modal created');
    }
}


interface UIFactory {
    createButton(): IButton;
    createModal(): IModal;
}
class AndroidUIFactory implements UIFactory {
    createButton(): IButton {
        return new AndroidButton();
    }
    createModal(): IModal {
        return new AndroidModal();
    }
}
class IOSUIFactory implements UIFactory {
    createButton(): IButton {
        return new IOSButton();
    }
    createModal(): IModal {
        return new IOSModal();
    }
}
class Application {
    uiFactory: UIFactory;
    constructor(uiFactory: UIFactory) {
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