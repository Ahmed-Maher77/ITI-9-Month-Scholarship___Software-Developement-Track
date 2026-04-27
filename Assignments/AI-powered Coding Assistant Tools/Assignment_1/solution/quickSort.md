# QuickSort Algorithm Documentation

## Overview
QuickSort is a highly efficient, divide-and-conquer sorting algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays: those less than the pivot and those greater than the pivot. The sub-arrays are then sorted recursively. This process results in a sorted array.

## Steps
1. **Choose a Pivot:** Select a pivot element from the array (commonly random, first, or last element).
2. **Partition:** Rearrange the array so that all elements less than the pivot come before it, and all elements greater come after. Elements equal to the pivot can go either way.
3. **Recursively Sort:** Recursively apply the above steps to the sub-arrays of elements less than and greater than the pivot.
4. **Combine:** The base case of the recursion is arrays of size 0 or 1, which are already sorted. The final result is the concatenation of the sorted left sub-array, the pivot(s), and the sorted right sub-array.

## Example: Sorting [8, 3, 1, 7, 0, 10, 2]

Let's walk through the sorting process:

### Step 1: Initial Array
[8, 3, 1, 7, 0, 10, 2]

### Step 2: Choose a Pivot
Suppose we pick the first element as the pivot: **8**

### Step 3: Partition
- Elements less than 8: [3, 1, 7, 0, 2]
- Elements equal to 8: [8]
- Elements greater than 8: [10]

### Step 4: Recursively Sort Sub-arrays
#### Sort [3, 1, 7, 0, 2] (pivot = 3)
- Less than 3: [1, 0, 2]
- Equal to 3: [3]
- Greater than 3: [7]

Sort [1, 0, 2] (pivot = 1)
- Less than 1: [0]
- Equal to 1: [1]
- Greater than 1: [2]

Sort [0]: [0] (base case)
Sort [2]: [2] (base case)

Combine: [0, 1, 2]

Combine with [3]: [0, 1, 2, 3]

Sort [7]: [7] (base case)

Combine: [0, 1, 2, 3, 7]

#### Sort [10]: [10] (base case)

### Step 5: Combine All
[0, 1, 2, 3, 7] + [8] + [10] = **[0, 1, 2, 3, 7, 8, 10]**

## Summary
QuickSort efficiently sorts arrays by recursively partitioning them around pivots. Its average time complexity is O(n log n), making it suitable for large datasets.

---

## Comparison: QuickSort vs MergeSort, HeapSort, and JavaScript Built-in Sort

| Algorithm   | Time Complexity (Best/Average/Worst) | Space Complexity | Stable | In-place | Pros | Cons | Use Cases |
|-------------|--------------------------------------|------------------|--------|----------|------|------|----------|
| **QuickSort** | O(n log n) / O(n log n) / O(n²)      | O(log n) (in-place) / O(n) (functional) | No (unless modified) | Yes | Fast in practice, low memory (in-place), cache-friendly | Worst-case O(n²), not stable by default | General-purpose, large datasets, when in-place is needed |
| **MergeSort** | O(n log n) / O(n log n) / O(n log n) | O(n)             | Yes    | No       | Stable, predictable performance, good for linked lists | Needs extra memory, slower in practice | Sorting linked lists, stable sort required |
| **HeapSort**  | O(n log n) / O(n log n) / O(n log n) | O(1)             | No     | Yes      | In-place, good worst-case, no extra memory | Not stable, less cache-friendly, slower than QuickSort in practice | Embedded systems, memory-constrained environments |
| **JS Built-in** | O(n log n) / O(n log n) / O(n log n) | O(n) (spec-dependent) | Yes (since ES2019) | Yes (spec-dependent) | Highly optimized, stable, easy to use | Implementation-dependent, may use extra memory | Most use cases, recommended for general sorting |

### Stability
- **Stable sort:** Maintains the relative order of equal elements.
- QuickSort and HeapSort are not stable by default; MergeSort and JS built-in sort (since ES2019) are stable.

### Pros & Cons
- **QuickSort:** Fastest in practice for most cases, but not stable and can degrade to O(n²) if not implemented with random pivots or median-of-three.
- **MergeSort:** Always O(n log n), stable, but uses extra memory.
- **HeapSort:** In-place and good worst-case, but not stable and usually slower than QuickSort.
- **JS Built-in:** Optimized, stable, and easy to use; best for most applications.

### Use Cases
- **QuickSort:** When in-place sorting is needed and stability is not required.
- **MergeSort:** When stability is required or sorting linked lists.
- **HeapSort:** When memory is limited and stability is not required.
- **JS Built-in:** Default choice for most JavaScript applications.
