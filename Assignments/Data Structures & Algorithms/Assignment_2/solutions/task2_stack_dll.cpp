// Task 2 — Stack using DLL Inheritance


#include <iostream>
using namespace std;

// Employee structure
struct Employee {
    int id;
    string name;
    float age;
};

// Node structure for DLL
class Node {
public:
    Employee data;
    Node* next;
    Node* prev;
};

// Doubly Linked List (DLL) Base Class
class DLL {
protected:
    Node* head;
    Node* tail;
    int size;

public:
    // Constructor
    DLL() : head(nullptr), tail(nullptr), size(0) {}

    // Insert a node at the front (used by Stack push)
    void insertAtFront(const Employee& emp) {
        Node* newNode = new Node();
        newNode->data = emp;

        if (isEmpty()) { // Empty list
            newNode->prev = newNode->next = nullptr;
            head = tail = newNode;
        } else { // Non-empty list
            newNode->next = head;
            newNode->prev = nullptr;
            head->prev = newNode;
            head = newNode;
        }
        size++;
    }

    // Delete a node from the front (used by Stack pop)
    Node* deleteFromFront() {
        if (isEmpty()) {
            cout << "List is empty\n";
            return nullptr;
        }

        Node* temp = head;
        if (size == 1) { // Only one node
            head = tail = nullptr;
        } else { // More than one node
            head = head->next;
            head->prev = nullptr;
        }
        size--;
        return temp; // Caller should delete the node
    }

    // Check if list is empty
    bool isEmpty() {
        return head == nullptr;
    }

    // Return current size of the list
    int getSize() {
        return size;
    }

    // Display all nodes
    void displayAll() {
        Node* curr = head;
        while (curr != nullptr) {
            cout << curr->data.id << " - " << curr->data.name << " - " << curr->data.age << endl;
            curr = curr->next;
        }
    }

    // Destructor to free all nodes
    ~DLL() {
        Node* curr = head;
        while (curr) {
            Node* nxt = curr->next;
            delete curr;
            curr = nxt;
        }
        head = tail = nullptr;
        size = 0;
    }
};

// Stack Class Derived from DLL
class StackDLL : public DLL {
public:
    // Push an element onto the stack
    void push(const Employee& emp) {
        insertAtFront(emp);
    }

    // Pop an element from the stack
    Node* pop() {
        return deleteFromFront(); // Caller responsible for deleting the node
    }

    // Peek at the top element
    void peek() {
        if (isEmpty()) {
            cout << "Stack is empty\n";
            return;
        }
        cout << "Top: " << head->data.id << " - " << head->data.name << endl;
    }
};

// Demo
int main() {
    StackDLL s;

    // Push employees onto the stack
    s.push({1, "John", 25});
    s.push({2, "Sara", 20});
    s.push({3, "Ali", 30});

    cout << "\n=== Peek ===\n";
    s.peek();
    cout << "Size = " << s.getSize() << endl;

    cout << "\n=== Pop ===\n";
    Node* p = s.pop();
    if (p) {
        cout << "Popped: " << p->data.id << " - " << p->data.name << endl;
        delete p; // Free popped node
    }

    cout << "Size = " << s.getSize() << endl;

    return 0;
}
