// ================ Vehicle constructor ================
function Vehicle(s, c, status) {
    // check inputs data types
    if (typeof s !== "number" || typeof c !== "string" || typeof status !== "string") {
        throw new Error("Invalid input types: speed must be a number, color and status must be strings.");
    };
    
    let speed = s, color = c, status = status; // "moving" || "stopped"
    
    Object.defineProperties(this, {
        start: {
            value: function() { return status = "moving"; }
        },
        stop: {
            value: function() { return status = "stopped"; }
        },
        turnLeft: {
            value: function() { console.log("Turning left"); }
        },
        turnRight: {
            value: function() { console.log("Turning right"); }
        },
        goBackward: {
            value: function() { console.log("Going backward"); }
        },
        goForward: {
            value: function() { console.log("Going forward"); }
        },
        toString: {
            value: function() {
                return `Vehicle [speed=${speed}, color=${color}, status=${status}]`;
            }
        },
        valueOf: {
            value: function() { return speed; }
        }
    })
}


// ================ Bicycle constructor ================
function Bicycle(speed, color, status) {
    Vehicle.call(this, speed, color, status);
    Object.defineProperty(this, 'ringBell', {
        value: function() { console.log("Ring ring!"); }
    })
}


// ================ MotorVehicle constructor ================
function MotorVehicle(speed, color, status, sizeOfEngine, licensePlate) {
    Vehicle.call(this, speed, color, status);

    // check inputs data types
    if (typeof sizeOfEngine !== "number" || typeof licensePlate !== "string") {
        throw new Error("Invalid input types: sizeOfEngine must be a number, licensePlate must be a string.");
    }

    let sizeOfEngine = sizeOfEngine; // in CC
    let licensePlate = licensePlate;

    Object.defineProperties(this, {
        getSizeOfEngine: {
            value: function() { return this.sizeOfEngine; }
        },
        getLicensePlate: {
            value: function() { return licensePlate; }
        },
        toString: {
            value: function() {
                return `MotorVehicle [speed=${speed}, color=${color}, status=${status}, sizeOfEngine=${sizeOfEngine}, licensePlate=${licensePlate}]`;
            }
        }
    })
}


// ================ Car constructor ================
function Car(speed, color, status, sizeOfEngine, licensePlate, numOfDoors, numWheels, weight) {
    MotorVehicle.call(this, speed, color, status, sizeOfEngine, licensePlate);

    // check inputs data types
    const fields = [numOfDoors, numWheels, weight];
    for (const field of fields) {
        if (typeof field !== "number")
            throw new Error("Invalid input types: numOfDoors, numWheels, and weight must be number.");
    }

    let numOfDoors = numOfDoors;
    let numWheels = numWheels;
    let weight = weight;

    Object.defineProperties(this, {
        switchOnAirConditioner: {
            value: function() { console.log("Air conditioner is now ON"); }
        },
        getNumOfDoors: {
            value: function() { return numOfDoors; }
        },
        toString: {
            value: function() {
                return `Car [speed=${speed}, color=${color}, status=${status}, sizeOfEngine=${sizeOfEngine}, licensePlate=${licensePlate}, numOfDoors=${numOfDoors}, numWheels=${numWheels}, weight=${weight}]`;
            }
        }
    });
}



// ================ DumpTruck constructor ================
function DumpTruck(speed, color, status, sizeOfEngine, licensePlate, loadCapacity, numWheels, weight) {
    MotorVehicle.call(this, speed, color, status, sizeOfEngine, licensePlate);

    // check inputs data types
    const fields = [loadCapacity, numWheels, weight];
    for (const field of fields) {
        if (typeof field !== "number")
            throw new Error("Invalid input types: loadCapacity, numWheels, and weight must be number.");
    }

    Object.defineProperties(this, {
        lowerLoad: {
            value: function() { console.log("Lowering load"); }
        },
        raiseLoad: {
            value: function() { console.log("Raising load"); }
        },
        toString: {
            value: function() {
                return `DumpTruck [speed=${speed}, color=${color}, status=${status}, sizeOfEngine=${sizeOfEngine}, licensePlate=${licensePlate}, loadCapacity=${loadCapacity}, numWheels=${numWheels}, weight=${weight}]`;
            }
        }
    });
}