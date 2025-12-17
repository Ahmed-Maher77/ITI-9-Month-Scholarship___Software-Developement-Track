// Description: Implementation of a dynamic array (user-defined vector) in C++.

#include <iostream>
using namespace std;

template <class T>
class DynamicArray {
private:
    T* arr;          // Pointer to the dynamic array
    int _size;       // Current number of elements
    int _capacity;   // Maximum capacity

public:
    // ================== Constructors ==================
    // Parameterized constructor (default capacity = 2)
    explicit DynamicArray(int capacity = 2) : _size(0), _capacity(capacity) {
        arr = new T[_capacity]; // Allocate memory
    }

    // Copy constructor
    DynamicArray(const DynamicArray& other) {
        _size = other._size;
        _capacity = other._capacity;
        arr = new T[_capacity];
        for (int i = 0; i < _size; i++) {
            arr[i] = other.arr[i];
        }
    }

    // ================== Methods ==================
    void resize(int newCapacity) {
        // Create a new array with new capacity
        T* temp = new T[newCapacity];
        for (int i = 0; i < _size; i++) {
            temp[i] = arr[i]; // Copy elements
        }
        delete[] arr;       // Free old array
        arr = temp;
        _capacity = newCapacity;
    }

    void insert(T ele) {
        // Insert element and resize if needed
        if (_size == _capacity) {
            resize(_capacity * 2);
        }
        arr[_size++] = ele;
    }

    int find(T ele) {
        // Return index of element, -1 if not found
        for (int i = 0; i < _size; i++) {
            if (arr[i] == ele) return i;
        }
        return -1;
    }

    void removeFrom(int index) {
        if (index < 0 || index >= _size) {
            cout << "Element not found" << endl;
            return;
        }
        // Shift elements left
        for (int i = index; i < _size - 1; i++) {
            arr[i] = arr[i + 1];
        }
        _size--;
    }

    void remove(T ele) {
        int index = find(ele);
        removeFrom(index);
    }

    void trim() {
        resize(_size); // Reduce capacity to current size
    }

    bool isEmpty() {
        return _size == 0;
    }

    void print() {
        for (int i = 0; i < _size; i++) {
            cout << arr[i] << " ";
        }
        cout << endl;
    }

    // ================== Destructor ==================
    ~DynamicArray() {
        delete[] arr;
    }
};

// ================== Main Function ==================
int main() {
    DynamicArray<int> arr;

    // Insert elements
    arr.insert(10);
    arr.insert(20);
    arr.insert(30);
    arr.insert(40);
    arr.insert(50);
    arr.insert(60);

    cout << "Original array: ";
    arr.print();

    // Remove element by value
    arr.remove(30);
    cout << "After removing 30: ";
    arr.print();

    // Remove element by index
    arr.removeFrom(0);
    cout << "After removing index 0: ";
    arr.print();

    // Find element
    int index = arr.find(50);
    cout << "Index of 50: " << index << endl;

    // Copy constructor
    DynamicArray<int> arr2(arr);
    cout << "Copied array (copy constructor): ";
    arr2.print();

    return 0;
}
