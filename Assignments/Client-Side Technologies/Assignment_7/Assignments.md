# JavaScript Fundamentals – Assignments

## 1. Built-in Objects

### 1.1 Array Object
- Fill an array with `n` numerical values from the user.
- `n` is determined by the user.
- Sort the array in:
  - Ascending order
  - Descending order
- Display the results in the console.

---

### 1.2 Object Object

#### 1.2.1 showAddr Function
- Accepts an address object with:
  - street
  - buildingNum
  - city
- Returns the full address with the registered date.

**Example**
```js
{ street: "abc st.", buildingNum: 15, city: "xyz" }
```

---

### 1.2.2 dispVal Function

- Takes:
    - an object with two properties
    - a string representing a key
- Returns the value of the property.

**Example**
```js
dispVal({ nm: "ali", age: 10 }, "age")
```

---

## 2. BOM

### 2.1 Window Object

---

### 2.1.1 Flying Child Window
- Create a parent window that opens a flying child window.
- The child window should:
  - Always stay on top.
  - Move up and down within the boundaries of the user screen.
- The parent window should contain a button to stop the child window movement.
- Implement the task using:
  - `setInterval`
  - `setTimeout`

---

### 2.1.2 Scrollable Advertising Child Window
- Create a parent window that opens a scrollable advertising child window.
- The child window should automatically scroll its content.
- Implement the task using:
  - `setInterval`
  - `setTimeout`
