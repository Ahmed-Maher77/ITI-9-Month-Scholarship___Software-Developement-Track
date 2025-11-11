// Assignment 6: (self Study) pointer to pointer(using Raw, using Modern) (not given at lecture) with an example

// Ex1: using row pointers
#include <iostream>
using namespace std;

int main() {
    int value = 42;

    int* ptr = &value;     // pointer to int
    int** ptr2 = &ptr;     // pointer to pointer (int**)

    cout << "Value: " << value << endl;
    cout << "Address of value (&value): " << &value << endl;
    cout << "Pointer ptr (holds &value): " << ptr << endl;
    cout << "Pointer to pointer ptr2 (holds &ptr): " << ptr2 << endl;

    // Accessing value using pointer to pointer
    cout << "Value via *ptr: " << *ptr << endl;
    cout << "Value via **ptr2: " << **ptr2 << endl;

    // Modifying the value through double pointer
    **ptr2 = 99;
    cout << "After modification, value = " << value << endl;

    return 0;
}





// Ex2: using modern pointers
#include <iostream>
#include <memory> // for unique_ptr
using namespace std;

int main() {
    int rows = 3, cols = 4;

    // Create an array of unique_ptr<int[]>
    unique_ptr<unique_ptr<int[]>[]> matrix(new unique_ptr<int[]>[rows]);

    for (int i = 0; i < rows; i++)
        matrix[i] = make_unique<int[]>(cols);

    // Fill values
    for (int i = 0; i < rows; i++)
        for (int j = 0; j < cols; j++)
            matrix[i][j] = i + j;

    // Print
    cout << "Matrix using modern C++ smart pointers:\n";
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++)
            cout << matrix[i][j] << " ";
        cout << endl;
    }

    // No need for delete — automatic cleanup!
    return 0;
}

