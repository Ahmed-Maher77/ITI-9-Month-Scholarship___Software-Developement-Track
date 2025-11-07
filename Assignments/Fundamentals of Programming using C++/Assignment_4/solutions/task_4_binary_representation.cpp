// =========================================
// 🧩 Assignment 4 — Binary Representation
// =========================================
// 🎯 Objective:
// Write a program that takes a number from the user
// and prints its binary representation.
//
// -----------------------------------------
// 🪜 Steps to Implement:
//
// 1️⃣ Take an integer input from the user.
// 2️⃣ Check conditions:
//     - If number == 0 → print 0
//     - Otherwise → convert to binary.
// 3️⃣ Conversion logic:
//     - Create an array of 32 bits (since int = 4 bytes = 32 bits).
//     - Store remainders of num % 2 and divide num by 2 iteratively.
//     - Print the binary representation in correct order.
// 4️⃣ Optional: Print all 32 bits for signed integers.
// -----------------------------------------
//
// 💡 Example:
// Input  : 10
// Output : 00000000000000000000000000001010
// -----------------------------------------





// ===========================================================
// ✅ Solution 1 — Using <bitset>
// ===========================================================
#include <iostream>
#include <bitset>  // For bitset class
using namespace std;

int main() {
    int number;

    cout << "Enter a number: ";
    cin >> number;

    // Create a 32-bit binary representation
    bitset<32> binaryNumber(number);  // int = 4 bytes = 32 bits

    cout << "Binary representation of " << number << " is: " << binaryNumber << endl;

    return 0;
}





// ===========================================================
// ✅ Solution 2 — Using Recursion and Bitwise Operations
// ===========================================================
// This version manually computes and prints the binary form
// using bitwise AND (&), bit shifting, and recursion.
// -----------------------------------------
// 🧠 Bitwise Logic Explanation:
//
// - mask = 1 << 31 (for 32 bits)
// - unum & mask → extracts the leftmost bit
// - mask >>= 1   → shifts mask right by one bit each recursion
//
// Example for mask shifting:
// 10000000 00000000 00000000 00000000
// ↓
// 01000000 00000000 00000000 00000000
// ↓
// 00100000 00000000 00000000 00000000
// ...
// ↓
// 00000000 00000000 00000000 00000001
// -----------------------------------------

#include <iostream>
using namespace std;

// Recursive function to print binary bits
void printBinaryRecursive(unsigned int unum, unsigned int mask, int BITS) {
    if (BITS <= 0) return;

    cout << ((unum & mask) ? '1' : '0');  // Extract current bit
    mask >>= 1;                           // Shift mask right by 1 bit
    printBinaryRecursive(unum, mask, BITS - 1);
}

// Wrapper function
void printBinary(int num) {
    const int BITS = 32;                         // int = 32 bits
    unsigned int mask = 1u << (BITS - 1);        // Start from most significant bit
    unsigned int unum = static_cast<unsigned int>(num); // Treat number as unsigned

    printBinaryRecursive(unum, mask, BITS);
}

int main() {
    int number;
    cout << "Enter a number: ";
    cin >> number;

    cout << "Binary representation of " << number << " is: ";
    printBinary(number);
    cout << endl;

    return 0;
}
