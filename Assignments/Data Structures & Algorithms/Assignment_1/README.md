# Assignments and Solutions

This file contains all required assignments along with their solutions, organized and ready to upload to GitHub.

---

## 📌 Assignment 1 — Bubble Sort

### **Solution:**

```cpp
#include <iostream>
using namespace std;

void swap(int &a, int &b) {
    int temp = a;
    a = b;
    b = temp;
}

void bubbleSort(int *arr, int size) {
    bool isSorted;
    for (int i = 0; i < size - 1; i++) {
        isSorted = true;
        for (int j = 0; j < size - i - 1; j++) {
            if (arr[j] > arr[j+1]) {
                swap(arr[j], arr[j+1]);
                isSorted = false;
            }
        }
        if (isSorted) break;
    }
}

int main() {
    int arr[6] = {5, 2, 7, 9, 8, 10};
    bubbleSort(arr, 6);

    cout << "[";
    for (int i = 0; i < 6; i++) {
        cout << arr[i] << ", ";
    }
    cout << "]";

    return 0;
}
```

---

## 📌 Assignment 2 — Merge Sort

### **Solution:**

```cpp
#include <iostream>
using namespace std;

void merge(int *arr, int FLeft, int LLeft, int FRight, int LRight) {
    int size = LRight - FLeft + 1;
    int tempArr[size];
    int currentIndex = 0, SaveFLeft = FLeft;

    while (FLeft <= LLeft && FRight <= LRight) {
        if (arr[FLeft] <= arr[FRight])
            tempArr[currentIndex++] = arr[FLeft++];
        else
            tempArr[currentIndex++] = arr[FRight++];
    }

    while (FLeft <= LLeft)
        tempArr[currentIndex++] = arr[FLeft++];
    while (FRight <= LRight)
        tempArr[currentIndex++] = arr[FRight++];

    for (int i = 0; i < currentIndex; i++)
        arr[SaveFLeft + i] = tempArr[i];
}

void mergeSort(int *arr, int first, int last) {
    if (first >= last) return;

    int middle = (first + last) / 2;
    mergeSort(arr, first, middle);
    mergeSort(arr, middle + 1, last);

    merge(arr, first, middle, middle + 1, last);
}

int main() {
    int arr[6] = {5, 2, 7, 9, 8, 10};
    mergeSort(arr, 0, 5);

    for (int i = 0; i < 6; i++)
        cout << arr[i] << " ";

    return 0;
}
```

---

## 📌 Assignment 3 — Linear Search (Sorted Array)

### **Solution:**

```cpp
#include <iostream>
using namespace std;

string linearSearch_sorted(int *arr, int size, int searched) {
    for (int i = 0; i < size; i++) {
        if (arr[i] == searched)
            return "found: " + to_string(searched) + ", at: " + to_string(i);
        else if (arr[i] > searched)
            return to_string(searched) + " not found";
    }
    return to_string(searched) + " not found";
}

int main() {
    int arr[6] = {0, 1, 2, 5, 8, 10};
    cout << linearSearch_sorted(arr, 6, 5) << endl;
    cout << linearSearch_sorted(arr, 6, 6) << endl;
    return 0;
}
```

---

## 📌 Assignment 4 — Binary Search (Recursive & Iterative)

### **Solution:**

```cpp
#include <iostream>
using namespace std;

string binarySearch_recursive(int *arr, int searched, int first, int last) {
    if (first > last)
        return to_string(searched) + " not found";

    int middle = (first + last) / 2;

    if (searched == arr[middle])
        return "found: " + to_string(searched) + ", at index " + to_string(middle);
    else if (searched < arr[middle])
        return binarySearch_recursive(arr, searched, first, middle - 1);
    else
        return binarySearch_recursive(arr, searched, middle + 1, last);
}

string binarySearch_iterative(int *arr, int searched, int first, int last) {
    while (first <= last) {
        int middle = (first + last) / 2;

        if (searched == arr[middle])
            return "found: " + to_string(searched) + ", at index " + to_string(middle);
        else if (searched < arr[middle])
            last = middle - 1;
        else
            first = middle + 1;
    }
    return to_string(searched) + " not found";
}

int main() {
    int arr[6] = {0, 1, 2, 5, 8, 10};
    cout << binarySearch_recursive(arr, 1, 0, 5) << endl;
    cout << binarySearch_iterative(arr, 5, 0, 5) << endl;
    cout << binarySearch_recursive(arr, 20, 0, 5) << endl;
    cout << binarySearch_iterative(arr, 50, 0, 5) << endl;
    return 0;
}
```

---

## 📌 Assignment 5 — Quick Sort

### **Solution:**

```cpp
#include <iostream>
using namespace std;

int partitionArray(int *arr, int first, int last) {
    int pivot = arr[last];
    int i = first - 1;

    for (int j = first; j < last; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }

    swap(arr[i + 1], arr[last]);
    return i + 1;
}

void quickSort(int *arr, int first, int last) {
    if (first < last) {
        int pivotIndex = partitionArray(arr, first, last);
        quickSort(arr, first, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, last);
    }
}

int main() {
    int arr[6] = {8, 4, 7, 2, 9, 1};
    quickSort(arr, 0, 5);

    for (int i = 0; i < 6; i++)
        cout << arr[i] << " ";

    return 0;
}
```

---

## 📌 Assignment 6 — Heap Sort (Divide & Conquer)

### **Solution:**

```cpp
#include <iostream>
using namespace std;

void swap(int &a, int &b) {
    int temp = a;
    a = b;
    b = temp;
}

void heapify(int *arr, int size, int i) {
    int Left = 2*i + 1;
    int Right = 2*i + 2;
    int max = i;

    if (Left < size && arr[Left] > arr[max]) max = Left;
    if (Right < size && arr[Right] > arr[max]) max = Right;

    if (max != i) {
        swap(arr[i], arr[max]);
        heapify(arr, size, max);
    }
}

void buildHeap(int *arr, int size) {
    for (int i = size/2 - 1; i >= 0; i--)
        heapify(arr, size, i);
}

void heapSort(int *arr, int size) {
    buildHeap(arr, size);
    for (int i = size - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}

void printArray(int *arr, int size) {
    for (int i = 0; i < size; i++)
        cout << arr[i] << " ";
    cout << endl;
}

int main() {
    int arr[5] = {90, 10, 40, 70, 5};
    heapSort(arr, 5);
    printArray(arr, 5);
    return 0;
}
```

---

All assignments and their complete solutions are now included and ready for GitHub upload.
