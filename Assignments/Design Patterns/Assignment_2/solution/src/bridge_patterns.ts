// Explain the Bridge pattern and its benefits

// increase_volume , decrease_volume and mute

// interface IDevice {
//     increase_volume(): void;
//     decrease_volume(): void;
//     mute?(): void;
// }

// class TV implements IDevice {
//     // why not both TV and Speaker in one class?
//     constructor(private volume: number) {}
//     increase_volume() {
//         this.volume++;
//         console.log(`volume increased: ${this.volume}`);
//     }
//     decrease_volume() {
//         this.volume--;
//         console.log(`volume decreased: ${this.volume}`);
//     }
// }

// class Speaker implements IDevice {
//     constructor(private volume: number) {}
//     increase_volume() {
//         this.volume++;
//         console.log(`volume increased: ${this.volume}`);
//     }
//     decrease_volume() {
//         this.volume--;
//         console.log(`volume decreased: ${this.volume}`);
//     }
//     mute() {
//         this.volume = 0;
//         console.log(`volume muted: ${this.volume}`);
//     }
// }

// // client code
// // const tv = new TV(10);
// // tv.increase_volume();
// // tv.increase_volume();
// // tv.decrease_volume();
// // // tv.mute();  // error: does not exist

// // const speaker = new Speaker(20);
// // speaker.increase_volume();
// // speaker.decrease_volume();
// // speaker.mute();




// // after bridge pattern
// class RemoteControl {
//     constructor(private device: IDevice) {}
//     volume_up() {
//         this.device.increase_volume();
//     }
//     volume_down() {
//         this.device.decrease_volume();
//     }
//     mute() {
//         if (this.device.mute) {
//             this.device.mute();
//         } else {
//             console.log("mute not supported");
//         }
//     }
// }




// // convert into functions
// console.log("================================");
// const tv = new TV(10);
// const remoteControl = new RemoteControl(tv);
// remoteControl.volume_up();
// remoteControl.volume_up();
// remoteControl.volume_down();
// remoteControl.mute();

// const speaker = new Speaker(20);
// const remoteControl2 = new RemoteControl(speaker);
// remoteControl2.volume_up();
// remoteControl2.volume_down();
// remoteControl2.mute();



// ============= Alternative => Strategy Pattern (BONUS) =================
/*
interface VolumeStrategy {
    increase(): void;
    decrease(): void;
}

class TVStrategy implements VolumeStrategy {
    increase() {
        console.log("TV up");
    }

    decrease() {
        console.log("TV down");
    }
}

class SpeakerStrategy implements VolumeStrategy {
    increase() {
        console.log("Speaker up");
    }

    decrease() {
        console.log("Speaker down");
    }
}

class Remote {
    constructor(private strategy: VolumeStrategy) {}

    increase() {
        this.strategy.increase();
    }
}
*/