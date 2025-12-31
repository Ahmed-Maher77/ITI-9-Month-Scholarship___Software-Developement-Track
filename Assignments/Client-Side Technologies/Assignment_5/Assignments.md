# JavaScript Fundamentals – Assignments

## 1. Basics

### 1.1 Display Message Using HTML Headings
Ask the user to enter a message, then display it using different HTML heading tags  
(from `<h1>` to `<h6>`) **using loops**.

⚠️ **Note:**  
Do **NOT** write the header elements explicitly in your script.

---

### 1.2 Sum of User Inputs
Write a script that:
- Takes **n values** from the user
- Stops receiving values when:
  - The user enters `0`, **or**
  - The total sum exceeds `100`
- Validates that all entered data is **numeric**
- Displays the **total sum** in the console

---

### 1.3 Maximum Value Using Ternary Operator
Using the **ternary operator**, write a script that:
- Accepts **two numbers** from the user
- Displays the **maximum value**

---

### 1.4 Divisibility Check
Ask the user to enter **three numerical values** `x`, `y`, and `z`.

The script should check whether:
- `x` is divisible by `y` only
- `x` is divisible by `z` only
- `x` is divisible by **both `y` and `z`**

#### Examples:
- Input: `10, 2, 5`  
  Output: `10 is divisible by both 2 and 5`

- Input: `10, 2, 4`  
  Output: `10 is divisible by 2 only`

- Input: `10, 4, 5`  
  Output: `10 is divisible by 5 only`

---

### 1.5 Multiples of 3 and 5 in a Range
Write a script that:
- Takes **two input values** defining a range
- Finds and displays:
  - Numbers that are multiples of **3**
  - Numbers that are multiples of **5**
- Displays all found values
- Calculates and displays their **total sum**

#### Example:
Input: `1, 10`

Output:
```js
Multiples of 3: 3, 6, 9
Multiples of 5: 5, 10
Total sum is 33
```

---

### 1.6 Star Pattern
Write a script that:
- Takes a number of rows as input
- Prints a **star pattern**
- Each row contains a number of stars equal to the row number

#### Example:
Input: `3`

Output:
```js
*
**
***
```

---

### 1.7 Range Display Based on Condition
Ask the user to enter **three values**:
- `x` → number
- `y` → number
- `z` → string (`"odd"`, `"even"`, or `"no"`)

The script should:
- Validate the **data types** of all inputs
- Display numbers between `x` and `y` based on `z`:
  - `"odd"` → display only odd numbers
  - `"even"` → display only even numbers
  - `"no"` → display all numbers
- Include `x` and/or `y` if applicable
- Display:
  - The resulting numbers
  - Their **sum**
- Apply a **console display style**
- Output numbers in:
  - Ascending order if `x < y`
  - Descending order if `x > y`

#### Examples:
- Input: `9, 15, "no"`  
  Output: `9, 10, 11, 12, 13, 14, 15`  
  Sum: `84`

- Input: `9, 15, "odd"`  
  Output: `9, 11, 13, 15`  
  Sum: `48`

- Input: `9, 15, "even"`  
  Output: `10, 12, 14`  
  Sum: `36`
