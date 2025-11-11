// Assignment 2: input and output from an array using pointers

#include <iostream>
using namespace std;

int main() {
    int arr[5];
    int *ptr = arr;

    for (int i = 0; i < 5; i++) {
        cout << "Enter element " << i + 1 << ": ";
        cin >> *ptr;
        ptr++;
    }
    
    ptr = arr;
    cout << "===============================================" << endl;

    for (int i = 0; i < 5; i++) {
        cout << "Element " << i + 1 << ": " << *ptr << endl;
        *ptr++;
    }
    
    return 0;
}