// Assignment_1: Stack with Templates

#include <iostream>
using namespace std;

template <class T>
class Stack {
    int top;
    T* stack;
    int size;

public:
    // Default constructor
    Stack() : top(-1), size(5), stack(new T[size]) {}

    // Parameterized constructor
    Stack(int s) : top(-1), size(s > 0 ? s : 5), stack(new T[size > 0 ? size : 5]) {}

    // Copy Constructor
    Stack(const Stack& other)
        : top(other.top), size(other.size), stack(new T[size]) 
    {
        for (int i = 0; i <= top; i++)
            stack[i] = other.stack[i];
    }

    // Copy Assignment
    Stack& operator=(const Stack& other) {
        if (this != &other) {
            delete[] stack;

            size = other.size;
            top = other.top;
            stack = new T[size];

            for (int i = 0; i <= top; i++)
                stack[i] = other.stack[i];
        }
        return *this;
    }

    // Move Constructor
    Stack(Stack&& other) noexcept
        : top(other.top), size(other.size), stack(other.stack)
    {
        other.stack = nullptr;
        other.top = -1;
        other.size = 0;
    }

    // Move Assignment
    Stack& operator=(Stack&& other) noexcept {
        if (this != &other) {
            delete[] stack;

            top = other.top;
            size = other.size;
            stack = other.stack;

            other.stack = nullptr;
            other.top = -1;
            other.size = 0;
        }
        return *this;
    }

    // PUSH
    void push(const T& item) {
        if (isFull()) {
            cout << "Stack Full!\n";
            return;
        }
        stack[++top] = item;
    }

    // POP
    T pop() {
        if (isEmpty()) {
            cout << "Stack Empty!\n";
            return T();   // return default value for any type
        }
        return stack[top--];
    }

    // getTop
    T getTop() const {
        if (isEmpty()) {
            cout << "Stack Empty!\n";
            return T();   // return default value for any type
        }
        return stack[top];
    }

    bool isFull() const { return top == size - 1; }
    bool isEmpty() const { return top == -1; }

    // Print
    void print() const {
        if (isEmpty()) {
            cout << "Stack is empty\n";
            return;
        }
        for (int i = 0; i <= top; i++)
            cout << stack[i] << " ";
        cout << "\n";
    }

    // Destructor
    ~Stack() { delete[] stack; }
};



class Complex {
    int real, imag;

public:
    Complex(int r = 0, int i = 0) : real(r), imag(i) {}

    friend ostream& operator<<(ostream& os, const Complex& c) {
        os << "(" << c.real << "+" << c.imag << "i)";
        return os;
    }
};



int main() {

    cout << "\n===== Stack<int> =====\n";
    Stack<int> si;
    si.push(10);
    si.push(20);
    si.push(30);
    si.print();
    cout << "Popped: " << si.pop() << endl;


    cout << "\n===== Stack<float> =====\n";
    Stack<float> sf;
    sf.push(1.5f);
    sf.push(2.75f);
    sf.print();
    cout << "Top: " << sf.getTop() << endl;


    cout << "\n===== Stack<char> =====\n";
    Stack<char> sc;
    sc.push('A');
    sc.push('B');
    sc.push('C');
    sc.print();


    cout << "\n===== Stack<Complex> =====\n";
    Stack<Complex> scomp;
    scomp.push(Complex(3, 4));
    scomp.push(Complex(5, 2));
    scomp.print();
    cout << "Top: " << scomp.getTop() << endl;


    cout << "\n===== Copy Constructor =====\n";
    Stack<int> copied = si;
    copied.print();


    cout << "\n===== Move Constructor =====\n";
    Stack<int> moved = std::move(si);
    moved.print();


    cout << "\n===== Copy Assignment =====\n";
    Stack<float> assigned;
    assigned = sf;
    assigned.print();


    cout << "\n===== Move Assignment =====\n";
    Stack<char> movedAssign;
    movedAssign = std::move(sc);
    movedAssign.print();


    return 0;
}
