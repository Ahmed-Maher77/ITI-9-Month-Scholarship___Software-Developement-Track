// Assignment 1: Stack Implementation

#include <iostream>
using namespace std;

const int MAX_SIZE = 10;

class Stack {
private:
    int* arr;        // raw pointer to dynamic array
    int top;         // index of the top element
    static int counter;  // static counter for all objects
    int capacity;    // stack size limit

public:
    // Default constructor
    Stack() {
        capacity = MAX_SIZE;
        arr = new int[capacity];
        top = 0;
        counter++;
        cout << "Stack object " << counter << " created successfully." << endl;
    }

    // Parameterized constructor
    Stack(int size) {
        capacity = size > 0 ? size : MAX_SIZE;
        arr = new int[capacity];
        top = 0;
        counter++;
        cout << "Stack object " << counter << " (custom size) created successfully." << endl;
    }

    // Push method (with chaining)
    Stack& push(int val) {
        if (top >= capacity) {
            cout << "Stack is full!" << endl;
            return *this;
        }
        arr[top++] = val;
        return *this; // method chaining
    }

    // Pop method (with reference)
    Stack& pop(int &ele) {
        if (isEmpty()) {
            cout << "Stack is empty!" << endl;
            return *this;
        }
        ele = arr[--top];
        return *this;
    }

    // Get top element
    int getTop() {
        if (isEmpty()) {
            cout << "Stack is empty!" << endl;
            return -1;
        }
        return arr[top - 1];
    }

    // Check if stack is empty
    bool isEmpty() {
        return top == 0;
    }

    // Display elements
    void showElements() {
        if (isEmpty()) {
            cout << "Stack is empty!" << endl;
            return;
        }
        cout << "Stack elements (top → bottom): [ ";
        for (int i = top - 1; i >= 0; i--) {
            cout << arr[i] << " ";
        }
        cout << "]" << endl;
    }

    // Static method to show count
    static void showCount() {
        cout << "Total Stack objects created: " << counter << endl;
    }

    // Destructor
    ~Stack() {
        delete[] arr;
        cout << "🗑️ Releasing resources of Stack object." << endl;
    }
};

// initialize static variable
int Stack::counter = 0;

// ========================= MAIN =========================
int main() {
    Stack S1;             // default constructor
    S1.push(5).push(10).push(20);   // method chaining
    S1.showElements();
    S1.showCount();

    int x;
    S1.pop(x);
    cout << "Popped element: " << x << endl;

    S1.showElements();

    Stack S2(5);          // parameterized constructor
    S2.push(100).push(200).push(300);
    S2.showElements();
    S2.showCount();

    return 0;
}
