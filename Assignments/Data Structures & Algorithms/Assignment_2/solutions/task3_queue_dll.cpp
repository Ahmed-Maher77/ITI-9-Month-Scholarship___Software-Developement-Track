// Task 3 — Queue using DLL Inheritance


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

    // Get employee data from user
    Employee getUserData() {
        int id;
        string name;
        float age;

        cout << "Enter employee data:\n";
        cout << "ID: ";
        cin >> id;
        cin.ignore(); // discard newline
        cout << "Name: ";
        getline(cin, name);
        cout << "Age: ";
        cin >> age;

        return {id, name, age};
    }

    // Insert node at front (used by Stack)
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

    // Delete node from front (used by Stack)
    Node* deleteFromFront() {
        if (isEmpty()) return nullptr;

        Node* temp = head;
        if (size == 1) { // Only one node
            head = tail = nullptr;
        } else {
            head = head->next;
            head->prev = nullptr;
        }
        size--;
        return temp; // Caller deletes node
    }

    bool isEmpty() { return head == nullptr; }
    int getSize() { return size; }

    // Display all nodes
    void displayAll() {
        Node* curr = head;
        while (curr) {
            cout << curr->data.id << " - " << curr->data.name << " - " << curr->data.age << endl;
            curr = curr->next;
        }
    }

    // Destructor to free memory
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

// Queue Class Derived from DLL
class Queue : public DLL {
public:
    Queue() : DLL() {}

    // Enqueue: add node at the end (tail)
    void enqueue(Node* pNew) {
        if (isEmpty()) { // Empty queue
            head = tail = pNew;
            pNew->prev = pNew->next = nullptr;
        } else { // Non-empty queue
            tail->next = pNew;
            pNew->prev = tail;
            pNew->next = nullptr;
            tail = pNew;
        }
        size++;
    }

    // Dequeue: remove node from front (head)
    void dequeue() {
        if (isEmpty()) {
            cout << "Queue is empty\n";
            return;
        }

        Node* temp = head;
        if (size == 1) { // Only one node
            head = tail = nullptr;
        } else {
            head = head->next;
            head->prev = nullptr;
        }
        delete temp;
        size--;
    }

    // Peek at front node
    Node* peek() {
        return head;
    }
};

// Demo
int main() {
    Queue q;
    int choice;

    do {
        cout << "\n======================\n";
        cout << "      QUEUE MENU\n";
        cout << "======================\n";
        cout << "1. Enqueue\n2. Dequeue\n3. Peek\n4. Display All\n5. Exit\n";
        cout << "Enter choice: ";
        cin >> choice;

        switch (choice) {
            case 1: {
                Employee emp = q.getUserData();
                Node* pNew = new Node();
                pNew->data = emp;
                q.enqueue(pNew);
                cout << "\nEmployee enqueued!\n";
                break;
            }

            case 2:
                cout << "\nDequeuing...\n";
                q.dequeue();
                break;

            case 3:
                if (q.peek() == nullptr) {
                    cout << "Queue is empty\n";
                } else {
                    cout << "\nFront Employee:\n";
                    cout << q.peek()->data.id << " - " 
                        << q.peek()->data.name << " - " 
                        << q.peek()->data.age << endl;
                }
                break;

            case 4:
                cout << "\nEmployees in Queue:\n";
                if (q.isEmpty()) cout << "Queue is empty.\n";
                else q.displayAll();
                break;

            case 5:
                cout << "Exiting...\n";
                break;

            default:
                cout << "Invalid choice!\n";
        }

    } while (choice != 5);

    return 0;
}
