# Lab 1

1. Create an interface `User` with properties `name` (string) and `age` (number). Both are required, not optional.
    - Create an object with only the `name` property.

2. Create an interface `Profile` with optional properties `username` (string) and `email` (string).
    - Create an object with both properties.

3. Use `Record` to create an object where the keys are `red`, `green`, and `blue`, and the values are their corresponding hex color codes (strings).
    - Test by accessing the `red` key.

4. Create an interface `Person` with properties `name` (string), `age` (number), and `email` (string).
    - Create a new type with only the `name` and `email` properties.
    - Test by creating an object with these properties.

5. Use the same `Person` interface from the previous question.
    - Create a new type without the `age` property.
    - Test by creating an object with only `name` and `email`.

6. Create a union type `Colors = "red" | "green" | "blue" | "yellow"`.
    - Create a new type without `yellow`.
    - Test by assigning a value of the new type.

7. Use the same `Colors` union type from the previous question.
    - Create a new type with only `red` and `blue`.
    - Test by assigning a value of the new type.

8. Create a union type `MaybeString = string | null | undefined`.
    - Create a new type without `null` or `undefined`.
    - Test by assigning a value of the new type.
