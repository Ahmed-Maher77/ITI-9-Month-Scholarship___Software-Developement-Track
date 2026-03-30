const addProduct = require("./addProduct");
const updateProduct = require("./updateProduct");



function checkTerminalFlags(args) {
    const validFlags = [{flag: "--name", operation: "add"}, {flag: "--price", operation: "update"}];
    // get the flag
    const flag = validFlags.find(f => args.includes(f.flag));
    if (!flag) {
        console.log("Unknown command");
    } else {
        // get the flag value (operation)
        const flagOperation = flag.operation;
        const flagIndex = args.indexOf(flag.flag);
        executeFlagOperation(flagOperation, args.slice(flagIndex + 1));
    }
}

function executeFlagOperation(operation, values) {   
    switch (operation) {
        case "add":
            addProduct(values[0]);
            break;
        case "update":
            updateProduct(values[0], values[1]);
            break;
        default:
            console.log("Unknown operation");
    }
}


module.exports = checkTerminalFlags;