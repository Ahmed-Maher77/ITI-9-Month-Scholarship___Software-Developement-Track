const iterableObject = {
    username: "ahmed maher",
    age: 23,
    country: "Egypt",
    [Symbol.iterator]: function () {
        const keys = Object.keys(this);
        let idx = 0;
        return {
            next() {
                return {
                    value: { k: keys[idx], v: iterableObject[keys[idx++]] },
                    done: idx > keys.length,
                }; // value is the key
            },
        };
    },
};

for (const key of iterableObject) {
    console.log(`${key.k} => ${key.v}`);
}
