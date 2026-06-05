# Assignments

## String Calculator

Create a `StringCalculator` with the following requirements:

1. Implement `Add(string numbers)` returning an integer.
    - An empty string returns `0`.
    - Support inputs with 0, 1, or 2 integers (e.g. `""`, `"1"`, `"1,2"`).
    - `Add` returns the sum of integers in the input string.

2. Support an unknown number of numbers in the input string.

3. Allow newlines between numbers in addition to commas (e.g. `"1\n2,3"` equals `6`).

4. If any negative numbers are present, throw an error with message `negatives not allowed: <list>` showing all negatives.

### Notes

- Start with tests for each small step (empty string, single number, two numbers), then refactor.
- Extend tests to cover multiple numbers, newlines, and negative-number errors.
