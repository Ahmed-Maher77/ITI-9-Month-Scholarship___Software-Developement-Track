# JavaScript Unit Testing Assignment

This document contains the exercises for the JavaScript Unit Testing assignment. Follow the instructions for each problem and write the appropriate unit tests using the requested assertion styles.

## Problem 1: `capitalizeText`

Expected behavior:

- Input: `"hamada"` -> Output: `HAMADA`
- Input: `12` -> Output: an error

```javascript
const capitalizeText = (input) => {
  if (typeof input !== "string") {
    throw new TypeError("parameter should be string");
  }
  return input.toUpperCase();
};
```

Tasks:

- Test that the function accepts a string and returns a string.
- Test that the function capitalizes a string correctly.
- Test that passing a number throws a `TypeError` with the message `parameter should be string`.
- Test that the function accepts only one parameter.

---

## Problem 2: `createArray`

Expected behavior:

- Input: `3` -> Output: `[0, 1, 2]`

```javascript
const createArray = (number) => {
  const myArray = Array.from(Array(number).keys());
  return myArray;
};
```

Tasks:

- Test that the return value is an array.
- Test that passing `3` returns an array of length `3` and includes `1`.
- Delay the testing process for 5 seconds.
- Use different assertion styles such as `expect`, `should`, and `assert`.
- After finishing the test process, try running it in a browser as a bonus.
- Create a pending test case.

Examples:

- `createArray(3)` -> `[0, 1, 2]`
- `createArray(5)` -> `[0, 1, 2, 3, 4]`

---

## Problem 3: Object Comparison

```javascript
let obj = { id: 1 };
let obj1 = { x: obj };
let obj2 = { x: obj };
```

Task:

- Check whether `obj1` is equal to `obj2` using `expect`, `should`, and `assert`.

---

## Problem 4: `CheckPositivity`

```javascript
function CheckPositivity(x) {
  if (x > 0) {
    return true;
  } else {
    return false;
  }
}
```

Task:

- Check the expected value using `expect`, `should`, and `assert` when `x = 4`, `x = -1`, and `x = 0`.

---

## Problem 5: `Mult`

```javascript
function Mult(x) {
  return x * 2;
}
```

Tasks using `assert`:

- Make sure that `x > 0`.
- Make sure that the returned number is above zero.

---

## Problem 6: Nested Object Assertion

```javascript
let obj3 = { a: { b: [{ x: 1 }] } };
```

Task:

- Using `assert`, check that `a.b[0]` includes `{ x: 1 }`.

---

## Bonus Problems

### Problem 7

- Create a form with two inputs, one for a number and one for a string, in your HTML.
- Validate the values of those inputs.

### Problem 8

- Try to render the unit testing results in the browser.