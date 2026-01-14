function NumSequence(start, end, step) {
    const list = [];

    // validate input
    for (const num of Array.from(arguments)) {
        if (isNaN(num)) throw new Error("All arguments must be numbers");
    }

    // check range validity
    if (start > end) throw new Error("Start must be less than or equal to End");
    if (step <= 0) throw new Error("Step must be a positive number");

    // fill the list
    (function () {
        for (let i = start; i < end; i += step) {
            list.push(i);
        }
    })();

    // ========== public methods ==========
    // Push to End
    this.append = function (num) {
        // ensure number achieves the step condition
        if (num !== list.at(-1) + step)
            throw new Error("Number does not follow the step condition");
        // add to the end of the list
        list.push(num);
    };

    // Push to Front
    this.prepend = function (num) {
        // ensure number achieves the step condition
        if (num !== list.at(0) - step)
            throw new Error("Number does not follow the step condition");
        // add to the front of the list
        list.unshift(num);
    };

    // Remove from End
    this.pop = function () {
        // ensure list is not empty
        if (list.length === 0) throw new Error("List is empty");
        // remove from the end of the list
        return list.pop();
    };

    // Remove from Front
    this.dequeue = function () {
        // ensure list is not empty
        if (list.length === 0) throw new Error("List is empty");
        // remove from the front of the list
        return list.shift();
    };

    // Get List
    this.getList = function () {
        return list;
    };

    // Get List Size
    this.getSize = function () {
        return list.length;
    };
}




// ========== Test Cases ==========
console.log("=========== Basic Creation =============");
const seq = new NumSequence(0, 10, 2);
console.log(seq.getList()); // [0, 2, 4, 6, 8]
console.log("Size:", seq.getSize()); // 5

console.log("=========== Append & Prepend =============");
seq.append(10);
seq.prepend(-2);
console.log(seq.getList()); // [-2, 0, 2, 4, 6, 8, 10]

console.log("=========== Pop & Dequeue =============");
console.log("Popped:", seq.pop()); // 10
console.log("Dequeued:", seq.dequeue()); // -2
console.log(seq.getList()); // [0, 2, 4, 6, 8]

console.log("=========== Error Handling =============");
try {
    new NumSequence(10, 1, 2);
} catch (e) {
    console.log(e.message);
}
try {
    seq.append(100);
} catch (e) {
    console.log(e.message);
}
