const obj = {
    [Symbol.replace]: function (str) {
        if (str.length > 15) return str.slice(0, 15) + "...";
        return str;
    },
};






const longString = "This is a long string that needs to be replaced";

const result = longString.replace(obj);

console.log(result); // Output: 'This is a long...'
