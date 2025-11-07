// =========================================
// 🧩 Assignment 2 — Replace Array Values
// =========================================
// 🎯 Objective:
// Take an array of numbers from the user and replace:
// - All elements from index 0 → mid with 1
// - All elements from index mid+1 → end with 0
//
// Example:
// Input  : [5, 2, 7, 9, 3, 8]
// Output : [1, 1, 1, 0, 0, 0]
//
// -----------------------------------------
// 🪜 Steps to Implement:
//
// 1️⃣ Take array values from the user (0 → size-1)
//     - Ensure all inputs are valid numbers
//
// 2️⃣ Determine the middle index:
//         mid = (array_size / 2) - 1
//     Example: for size = 6 → mid = 2 → indices 0–2 are the first half
//
// 3️⃣ Loop over the array:
//     - If arr[i] <= arr[mid] → replace with 1
//     - Otherwise → replace with 0
//
// -----------------------------------------
// 🧠 Example Walkthrough:
//
// size = 6 → mid = 2
// Input  → [3, 5, 7, 9, 2, 4]
// Process → [1, 1, 1, 0, 0, 0]
// Output → [1, 1, 1, 0, 0, 0]
// -----------------------------------------



#include <iostream>
using namespace std;

// Function declarations
void get_array_from_user(int arr[], int size);    // it can be implemented with => std:span<int> arr => isn't avilable in many compilers
void replaceArrayValues(int arr[], int size);

int main() {
    const int arr_size = 6;
    int numbersArr[arr_size];
    
    get_array_from_user(numbersArr, arr_size);
    replaceArrayValues(numbersArr, arr_size);
    
    cout << "\nArray after replacement: ";
    for (int num : numbersArr) {
        cout << num << " ";
    }
    cout << endl;
    
    return 0;
}

// Get array input from user
void get_array_from_user(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        cout << "Enter number " << i + 1 << ": ";
        cin >> arr[i];
    }
}

// Replace values based on comparison with middle element
void replaceArrayValues(int arr[], int size) {
    const int mid = (size / 2) - 1;  // middle index

    for (int i = 0; i < size; i++) {
        if (arr[i] <= arr[mid]) {
            arr[i] = 1;
        } else {
            arr[i] = 0;
        }
    }
}
