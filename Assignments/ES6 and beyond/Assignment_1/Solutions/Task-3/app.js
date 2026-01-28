const fruits = ["apple", "strawberry", "bananna", "orange", "mango"];


// a. every element in the array is a string
const isAllString = fruits.every((item) => {
    return (typeof item === "string")
});
console.log(`All the array elements are String: ${isAllString}`);


// ================================================================


// b. check if there are elements start with 'a'
const startsWithA = fruits.some(item => item.startsWith('a'));
console.log(`Array has elements that start with 'a': ${startsWithA}`);


// ================================================================


// c. filter elements that start with 'b' or 's'
const filteredElems = fruits.filter(item => item.startsWith('b') || item.startsWith('s'));
console.log("Elements start with b or s: ", filteredElems);


// ================================================================


// d. create new array with "this is <fruit name>"
const fruitStatements = fruits.map(item => `I like ${item}`);
console.log("Fruit Statements: ", fruitStatements);


// ================================================================


// e. print each element of fruitStatements
fruitStatements.forEach((item, idx) => {
    console.log(`${idx + 1}: ${item}`);
})