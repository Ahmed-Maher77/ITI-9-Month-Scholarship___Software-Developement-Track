const obj = {
    name: "",
    address: "",
    age: 0,
};

const handler = {
    set(target, prop, value) {
        if (prop === "name") {
            if (value.length === 7) {
                target[prop] = value;
                return true;
            }
            throw new Error("Property (name) must be 7 characters long");
        }

        if (prop === "address") {
            if (typeof value === "string") {
                target[prop] = value;
                return true;
            }
            throw new Error("Property (address) must be string");
        }

        if (prop === "age") {
            if (value > 25 && value < 60) {
                target[prop] = value;
                return true;
            }
            throw new Error("Property (age) must be between 25 and 60");
        }

        throw new Error(`Property (${prop}) is not allowed`);
    },
};

const proxyObj = new Proxy(obj, handler);

export { proxyObj };
