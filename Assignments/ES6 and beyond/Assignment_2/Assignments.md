# ES.next Lab 2

## 1) Course Information Function

Create your own function that accepts multiple parameters to generate course information and display it. Assume that the function accepts course information as an object that contains:

- `courseName`
- `courseDuration`
- `courseOwner`

If any of the required fields are not set in the function call, it should have default values as follows:

- `courseName = "ES6"`
- `courseDuration = "3 days"`
- `courseOwner = "JavaScript"`

**Bonus:** Throw an exception if the passed object includes properties other than those described above.

**Note:** The user is allowed not to pass all of these properties; they can pass only the needed properties.

## 2) Fibonacci Series Generator

Create a generator that returns the Fibonacci series that takes only one parameter. Make two different implementations as described below:

- **a.** The parameter passed determines the number of elements displayed from the series.
- **b.** The parameter passed determines the maximum number of the displayed series should not exceed its value.

## 3) Custom Replace Method

Create your own object that has the `[Symbol.replace]` method so that if any long string (e.g., its length exceeds 15 characters) calls `replace` and passes your object as the replace method parameter, it will display only 15 characters of the string with a terminating "…".

## 4) Iterable Object Implementation

Create an iterable object by implementing the `@@iterator` method (i.e., `Symbol.iterator`), so that you can use `for..of` and retrieve its properties.

**Bonus:** Make proper updates to retrieve the object’s properties and their values.
