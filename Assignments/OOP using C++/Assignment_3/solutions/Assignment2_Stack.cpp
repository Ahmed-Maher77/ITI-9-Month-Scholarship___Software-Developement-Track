// Assignment 2: complete Stack Implementation

#include <iostream>
using namespace std;

class Stack {
private:
    int* arr;              // Dynamic array for stack elements
    int top;               // Index of top element
    int capacity;          // Stack size limit
    static int counter;    // Static counter for objects

public:
    // 1️⃣ Delete default constructor (disallow creation without size)
    Stack() = delete;

    // 2️⃣ Parameterized constructor (with default size = 5)
    explicit Stack(int size = 5)
        : capacity(size > 0 ? size : 5), top(0)
    {
        arr = new int[capacity];
        counter++;
        cout << "✅ Stack object #" << counter << " created (size = " << capacity << ")\n";
    }

    // 3️⃣ Copy constructor
    Stack(const Stack& other)
        : capacity(other.capacity), top(other.top)
    {
        arr = new int[capacity];
        for (int i = 0; i < top; ++i)
            arr[i] = other.arr[i];

        counter++;
        cout << "📋 Copy constructor called (Stack #" << counter << ")\n";
    }

    // 4️⃣ Move constructor
    Stack(Stack&& other) noexcept
        : arr(other.arr), top(other.top), capacity(other.capacity)
    {
        other.arr = nullptr;
        other.top = 0;
        other.capacity = 0;

        counter++;
        cout << "🚀 Move constructor called (Stack #" << counter << ")\n";
    }

    // 5️⃣ Copy assignment operator
    Stack& operator=(const Stack& other) {
        if (this != &other) {
            delete[] arr; // free old memory

            capacity = other.capacity;
            top = other.top;
            arr = new int[capacity];
            for (int i = 0; i < top; ++i)
                arr[i] = other.arr[i];

            cout << "📋 Copy assignment operator called.\n";
        }
        return *this;
    }

    // 6️⃣ Move assignment operator
    Stack& operator=(Stack&& other) noexcept {
        if (this != &other) {
            delete[] arr; // free old memory

            arr = other.arr;
            top = other.top;
            capacity = other.capacity;

            other.arr = nullptr;
            other.top = 0;
            other.capacity = 0;

            cout << "🚀 Move assignment operator called.\n";
        }
        return *this;
    }

    // 7️⃣ Overload [] operator
    int operator[](int index) const {
        if (index < 0 || index >= top) {
            cout << "❌ Invalid index access.\n";
            return -1;
        }
        return arr[index];
    }

    // 8️⃣ Push operation (with chaining)
    Stack& push(int val) {
        if (top >= capacity) {
            cout << "⚠️ Stack overflow!\n";
            return *this;
        }
        arr[top++] = val;
        return *this;
    }

    // 9️⃣ Pop operation (with reference return)
    Stack& pop(int& ele) {
        if (isEmpty()) {
            cout << "⚠️ Stack underflow!\n";
            return *this;
        }
        ele = arr[--top];
        return *this;
    }

    // 🔟 Check empty
    bool isEmpty() const {
        return top == 0;
    }

    // 11️⃣ Show stack content
    void show() const {
        if (isEmpty()) {
            cout << "🕳️ Stack is empty.\n";
            return;
        }

        cout << "🧱 Stack content (top → bottom): [ ";
        for (int i = top - 1; i >= 0; --i)
            cout << arr[i] << " ";
        cout << "]\n";
    }

    // 12️⃣ Static method for active object count
    static void showCounter() {
        cout << "📦 Active Stack objects: " << counter << endl;
    }

    // 13️⃣ Destructor
    ~Stack() {
        delete[] arr;
        counter--;
        cout << "🗑️ Destructor called. Stack destroyed. Active count = " << counter << endl;
    }
};

// Initialize static counter
int Stack::counter = 0;

// ======================= MAIN ==========================
int main() {
    cout << "=== Stack Example ===\n";

    Stack s1(5);
    s1.push(10).push(20).push(30);
    s1.show();

    int val;
    s1.pop(val);
    cout << "Popped value: " << val << endl;
    s1.show();

    cout << "\n📋 Copy constructor test:\n";
    Stack s2 = s1;   // invokes copy constructor
    s2.show();

    cout << "\n🚀 Move constructor test:\n";
    Stack s3 = std::move(s2);
    s3.show();

    cout << "\nCopy assignment operator:\n";
    Stack s4(5);
    s4 = s1;
    
    cout << "\nMove assignment operator:\n";
    Stack s5(5);
    s5 = std::move(s3);

    cout << "\n💡 Access element using []: s3[1] = " << s3[1] << endl;

    Stack::showCounter();

    cout << "\n=== End of Program ===\n";
    return 0;
}
