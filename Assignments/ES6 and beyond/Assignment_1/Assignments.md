# ES.next – Lab 1

## 1️⃣ Swap values using destructuring

```js
let x = 5;
let y = 10;

[x, y] = [y, x];

console.log(x); // 10
console.log(y); // 5
```

---

## 2️⃣ Get min and max value from any array

Using **rest parameters** and **spread operator**:

```js
function getMinMax(...arr) {
  return {
    min: Math.min(...arr),
    max: Math.max(...arr)
  };
}

const numbers = [3, 7, 1, 9, 4, 12];

const result = getMinMax(...numbers);

console.log("Min value:", result.min);
console.log("Max value:", result.max);
```

> ✅ Array length is not fixed.

---

## 3️⃣ Array API methods

```js
var fruits = ["apple", "strawberry", "banana", "orange", "mango"];
```

### a) Test that every element is a string

```js
const allStrings = fruits.every(item => typeof item === "string");
console.log(allStrings);
```

---

### b) Test that some elements start with "a"

```js
const startsWithA = fruits.some(item => item.startsWith("a"));
console.log(startsWithA);
```

---

### c) Filter elements that start with "b" or "s"

```js
const filteredFruits = fruits.filter(item =>
  item.startsWith("b") || item.startsWith("s")
);

console.log(filteredFruits);
```

---

### d) Generate new array with liking message

```js
const likedFruits = fruits.map(item => `I like ${item}`);

console.log(likedFruits);
```

---

### e) Display elements using forEach

```js
likedFruits.forEach(item => console.log(item));
```

---

## ✅ Technologies Used

* JavaScript (ES6 / ES.next)
* Destructuring
* Rest Parameters
* Spread Operator
* Array Methods (every, some, filter, map, forEach)
