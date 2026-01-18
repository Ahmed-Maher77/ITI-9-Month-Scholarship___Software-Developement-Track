const customObject = {
    description: "Custom object that provides getSetGen functionality",

    getSetGen: function () {
        const obj = this;

        for (let prop in obj) {
            // Skip function properties
            if (typeof obj[prop] === "function") {
                continue;
            }

            const capitalizedProp =
                prop.charAt(0).toUpperCase() + prop.slice(1);

            // Generate getter: get{PropertyName}
            obj["get" + capitalizedProp] = (function (propName) {
                return function () {
                    return obj[propName];
                };
            })(prop);

            // Generate setter: set{PropertyName}
            obj["set" + capitalizedProp] = (function (propName) {
                return function (value) {
                    obj[propName] = value;
                };
            })(prop);
        }
    },
};

// Example 1: obj object
const obj = {
    id: "SD-10",
    location: "SV",
    addr: "123 st.",
    getSetGen: customObject.getSetGen,
};

obj.getSetGen();

console.log("Example 1 - obj object:");
console.log("getId():", obj.getId());
console.log("getLocation():", obj.getLocation());
console.log("getAddr():", obj.getAddr());

obj.setId("SD-20");
console.log("After setId('SD-20'):", obj.getId());

// Example 2: user object using call()
const user = {
    name: "Ali",
    age: 10,
};

customObject.getSetGen.call(user);

console.log("\nExample 2 - user object (using call):");
console.log("getName():", user.getName());
console.log("getAge():", user.getAge());

user.setName("Ahmed");
user.setAge(25);
console.log("After setName('Ahmed') and setAge(25):");
console.log("getName():", user.getName());
console.log("getAge():", user.getAge());
