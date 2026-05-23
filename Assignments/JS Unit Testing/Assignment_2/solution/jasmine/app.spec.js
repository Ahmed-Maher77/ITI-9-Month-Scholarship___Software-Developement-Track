const { MathUtils } = require("./app");

describe("MathUtils Test Suite", function () {
    let math;

    beforeEach(function () {
        math = new MathUtils();
    });

    // type validation
    function expectInvalidInput(fn) {
        expect(fn).toThrowError();
    }

    // SUM
    describe("sum()", function () {
        it("should add two positive numbers", function () {
            expect(math.sum(2, 3)).toBe(5);
        });

        it("should add negative numbers", function () {
            expect(math.sum(-2, -3)).toBe(-5);
        });

        it("should fail if second parameter is undefined", function () {
            expectInvalidInput(() => math.sum(2));
        });

        it("should fail if parameters are missing", function () {
            expectInvalidInput(() => math.sum());
        });
    });

    // SUBTRACT
    describe("substract()", function () {
        it("should subtract two numbers", function () {
            expect(math.substract(10, 5)).toBe(5);
        });

        it("should fail for string input", function () {
            expectInvalidInput(() => math.substract("10", 5));
        });

        it("should fail if missing parameters", function () {
            expectInvalidInput(() => math.substract(10));
        });
    });

    // MULTIPLY
    describe("multiply()", function () {
        it("should multiply two numbers", function () {
            expect(math.multiply(4, 5)).toBe(20);
        });

        it("should return 0 when multiplying by 0", function () {
            expect(math.multiply(4, 0)).toBe(0);
        });

        it("should fail for array input", function () {
            expectInvalidInput(() => math.multiply([2], 5));
        });

        it("should fail if no parameters passed", function () {
            expectInvalidInput(() => math.multiply());
        });
    });

    // DIVIDE
    describe("divide()", function () {
        it("should divide two numbers", function () {
            expect(math.divide(10, 2)).toBe(5);
        });

        it("should return Infinity when dividing by 0", function () {
            expect(math.divide(10, 0)).toBe(Infinity);
        });

        it("should fail for string input", function () {
            expectInvalidInput(() => math.divide(10, "2"));
        });

        it("should fail for missing second parameter", function () {
            expectInvalidInput(() => math.divide(10));
        });
    });

    // AVERAGE
    describe("average()", function () {
        it("should calculate average", function () {
            expect(math.average(4, 6)).toBe(5);
        });

        it("should fail for null input", function () {
            expectInvalidInput(() => math.average(null, 6));
        });
    });

    // FACTORIAL
    describe("factorial()", function () {
        it("should return factorial of positive number", function () {
            expect(math.factorial(5)).toBe(120);
        });

        it("should return 1 for factorial of 0", function () {
            expect(math.factorial(0)).toBe(1);
        });

        it("should throw error for negative numbers", function () {
            expect(function () {
                math.factorial(-5);
            }).toThrowError("There is no factorial for negative numbers");
        });

        it("should fail for string input", function () {
            expect(() => math.factorial("5")).toThrowError();
        });

        it("should fail for missing parameter", function () {
            expect(() => math.factorial()).toThrowError();
        });
    });

    // CHECK POSITIVITY
    describe("checkPositivity()", function () {
        it("should return true for positive number", function () {
            expect(math.checkPositivity(5)).toBeTrue();
        });

        it("should return false for negative number", function () {
            expect(math.checkPositivity(-5)).toBeFalse();
        });

        it("should return true for zero", function () {
            expect(math.checkPositivity(0)).toBeTrue();
        });

        it("should fail for string input", function () {
            expectInvalidInput(() => math.checkPositivity("5"));
        });

        it("should fail for undefined input", function () {
            expectInvalidInput(() => math.checkPositivity());
        });
    });
});
