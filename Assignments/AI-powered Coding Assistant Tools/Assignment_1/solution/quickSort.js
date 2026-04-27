/**
 * QuickSort algorithm (recursive)
 * @param {number[]} arr - The array to sort
 * @returns {number[]} - The sorted array
 */

function quickSort(arr) {
    // Handle non-array, null, or undefined input safely
    if (!Array.isArray(arr)) {
        console.error(
            "Invalid input: quickSort expects an array. Returning empty array.",
        );
        return [];
    }
    // Arrays with 0 or 1 element are already sorted
    if (arr.length <= 1) {
        return arr.slice(); // Return a shallow copy
    }

    // Choose a random pivot to avoid worst-case performance
    const pivotIndex = Math.floor(Math.random() * arr.length);
    const pivot = arr[pivotIndex];

    // Arrays to hold elements less than, equal to, and greater than the pivot
    const left = [];
    const middle = [];
    const right = [];

    // Partition the array
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else if (arr[i] > pivot) {
            right.push(arr[i]);
        } else {
            middle.push(arr[i]); // Handles duplicates and the pivot itself
        }
    }

    // Recursively sort left and right, then combine with middle
    return [...quickSort(left), ...middle, ...quickSort(right)];
}

// Example usage:
const arr = [5, 3, 8, 4, 2];
const sorted = quickSort(arr);
console.log(sorted); // [2, 3, 4, 5, 8]
