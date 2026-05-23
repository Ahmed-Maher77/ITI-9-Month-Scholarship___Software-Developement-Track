MathUtils = function () {};

MathUtils.prototype.sum = function (number1, number2) {
    if (arguments.length !== 2) {
        throw new Error("Two parameters are required");
    }
    if (typeof number1 !== "number" || typeof number2 !== "number") {
        throw new Error("Parameters must be numbers");
    }
    return number1 + number2;
};

MathUtils.prototype.substract = function (number1, number2) {
    if (arguments.length !== 2) {
        throw new Error("Two parameters are required");
    }
    if (typeof number1 !== "number" || typeof number2 !== "number") {
        throw new Error("Parameters must be numbers");
    }
    return number1 - number2;
};

MathUtils.prototype.multiply = function (number1, number2) {
    if (arguments.length !== 2) {
        throw new Error("Two parameters are required");
    }
    if (typeof number1 !== "number" || typeof number2 !== "number") {
        throw new Error("Parameters must be numbers");
    }
    return number1 * number2;
};

MathUtils.prototype.divide = function (number1, number2) {
    if (arguments.length !== 2) {
        throw new Error("Two parameters are required");
    }
    if (typeof number1 !== "number" || typeof number2 !== "number") {
        throw new Error("Parameters must be numbers");
    }
    return number1 / number2;
};

MathUtils.prototype.average = function (number1, number2) {
    if (arguments.length !== 2) {
        throw new Error("Two parameters are required");
    }
    if (typeof number1 !== "number" || typeof number2 !== "number") {
        throw new Error("Parameters must be numbers");
    }
    return (number1 + number2) / 2;
};

MathUtils.prototype.factorial = function (number) {
    if (arguments.length !== 1) {
        throw new Error("One parameter is required");
    }
    if (typeof number !== "number") {
        throw new Error("Parameter must be a number");
    }
    if (number < 0) {
        throw new Error("There is no factorial for negative numbers");
    } else if (number == 1 || number == 0) {
        return 1;
    } else {
        return number * this.factorial(number - 1);
    }
};

MathUtils.prototype.checkPositivity = function (number) {
    if (arguments.length !== 1) {
        throw new Error("One parameter is required");
    }
    if (typeof number !== "number") {
        throw new Error("Parameter must be a number");
    }
    if (number < 0) return false;
    else return true;
};

module.exports = { MathUtils };
