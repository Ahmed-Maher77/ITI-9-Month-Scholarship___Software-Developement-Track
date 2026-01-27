function getBoundaries(...numsArr) {
    const min = Math.min(...numsArr);
    const max = Math.max(...numsArr);
    return { min, max };
}


// Example usage:
const arr = [3, 5, 1, 8, -2, 7];
const { min, max } = getBoundaries(...arr);

console.log(`Min: ${min}, Max: ${max}`); // Min: -2, Max: 8