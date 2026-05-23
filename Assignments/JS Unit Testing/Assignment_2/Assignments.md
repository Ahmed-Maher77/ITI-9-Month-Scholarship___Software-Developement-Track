# Assignment 2: JavaScript Unit Testing

## Overview

In this assignment, you will practice unit testing in JavaScript using three different testing styles:

- **Mocha + Chai** for API response assertions.
- **Jasmine** for testing utility methods.
- **Async/Await** for testing asynchronous requests without using `done()`.

Your tests should be clean, readable, and written in a professional structure.

## General Requirements

- Use clear test names that describe the expected behavior.
- Follow the Arrange, Act, Assert pattern where possible.
- Keep tests independent and deterministic.
- Avoid testing implementation details unless they affect the public behavior.
- Use meaningful assertions and make failures easy to understand.

## Task 1: Test an API Response Using Mocha and Chai

Given the following code:

```javascript
fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
        if (!response.ok) {
            throw new Error(
                "Network response was not ok " + response.statusText,
            );
        }
        return response.json();
    })
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error(
            "There has been a problem with your fetch operation:",
            error,
        );
    });
```

### Required Testing Scenarios

Write Mocha and Chai tests to verify the returned data.

Your test suite should assert that:

1. The response is an array.
2. The array contains the expected number of posts.
3. Each item in the array is an object.
4. The first item includes the expected post fields such as `userId`, `id`, `title`, and `body`.

### Notes

- Mock the network request instead of depending on a live API in your unit tests.
- Keep the test data stable so the test results are reproducible.

## Task 2: Unit Test the `MathUtils` Utility Using Jasmine

Implement Jasmine test cases for the following utility:

```javascript
MathUtils = function () {};

MathUtils.prototype.sum = function (number1, number2) {
    return number1 + number2;
};

MathUtils.prototype.substract = function (number1, number2) {
    return number1 - number2;
};

MathUtils.prototype.multiply = function (number1, number2) {
    return number1 * number2;
};

MathUtils.prototype.divide = function (number1, number2) {
    return number1 / number2;
};

MathUtils.prototype.average = function (number1, number2) {
    return (number1 + number2) / 2;
};

MathUtils.prototype.factorial = function (number) {
    if (number < 0) {
        throw new Error("There is no factorial for negative numbers");
    } else if (number == 1 || number == 0) {
        return 1;
    } else {
        return number * this.factorial(number - 1);
    }
};

MathUtils.prototype.checkPositivity = function (number) {
    if (number < 0) return false;
    else return true;
};
```

### Required Testing Scenarios

Write Jasmine specs for each method and cover the following cases:

- `sum` returns the correct addition result.
- `substract` returns the correct subtraction result.
- `multiply` returns the correct multiplication result.
- `divide` returns the correct division result.
- `average` returns the correct average.
- `factorial` returns the correct result for positive numbers.
- `factorial` returns `1` for `0` and `1`.
- `factorial` throws an error for negative numbers.
- `checkPositivity` returns `true` for positive numbers and `false` for negative numbers.

### Notes

- Use `describe` and `it` blocks to organize the suite.
- Add expectations for normal values and edge cases.
- Ensure the test names clearly describe the behavior being verified.

## Task 3: Test Two Requests Using Async/Await

Write two request-based tests in Node.js using `async/await` instead of `done()`.

### Requirements

- Use `async` test functions.
- Replace callback-style synchronization with `await`.
- Assert the response status, returned data, or any expected contract for each request.
- Keep the two tests independent and readable.

### Expected Outcome

By the end of this task, you should have two asynchronous test cases that:

1. Execute cleanly with `async/await`.
2. Avoid callback nesting.
3. Fail with clear error messages if the request does not behave as expected.

## Submission Guidelines

- Keep your test files well structured.
- Use consistent formatting and naming conventions.
- Include only the necessary dependencies for Mocha, Chai, and Jasmine.
- Make sure all tests pass before submission.
