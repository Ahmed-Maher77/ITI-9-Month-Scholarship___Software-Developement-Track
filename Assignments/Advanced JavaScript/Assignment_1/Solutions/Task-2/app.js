// ===== Method 1: Using Rest Parameters =====
function reverseParameters1(...args) {
    return args.reverse();
}

// ===== Method 2: Using Arguments Object with Array.from() =====
function reverseParameters2() {
    return Array.from(arguments).reverse();
}

// ===== Method 3: Using apply with Array concat =====
function reverseParameters3() {
    return [].concat.apply([], arguments).reverse();
}


// ===== Testing =====
console.log("Method 1 - Using Rest Parameters:");
console.log(
    "reverseParameters1(1, 2, 3, 4, 5):",
    reverseParameters1(1, 2, 3, 4, 5)
);


console.log("\nMethod 2 - Using Arguments Object:");
console.log(
    "reverseParameters2(1, 2, 3, 4, 5):",
    reverseParameters2(1, 2, 3, 4, 5)
);

console.log("\nMethod 3 - Using Array.prototype.slice.call():");
console.log(
    "reverseParameters3(1, 2, 3, 4, 5):",
    reverseParameters3(1, 2, 3, 4, 5)
);


console.log("\nMethod 5 - Using apply with concat:");



console.log("\nMixed data types:");
console.log(
    "reverseParameters1('hello', 42, true, null, 'world'):",
    reverseParameters1("hello", 42, true, null, "world")
);
console.log(
    "reverseParameters2('hello', 42, true, null, 'world'):",
    reverseParameters2("hello", 42, true, null, "world")
);
