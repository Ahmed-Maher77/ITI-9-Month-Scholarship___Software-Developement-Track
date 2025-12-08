// Task 4 — Full Double Linked List
// Supports: Add, Delete, Search, Display, Copy, Assignment, Index Access


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

// Doubly Linked List Class
class DLL {
    Node* head;
    Node* tail;
    int size;

public:
    // Constructor: initialize empty list
    DLL() : head(nullptr), tail(nullptr), size(0) {}

    // Copy constructor: deep copy from another DLL
    DLL(const DLL& other) : head(nullptr), tail(nullptr), size(0) {
        Node* curr = other.head;
        while (curr) {
            AddNode(curr->data);
            curr = curr->next;
        }
    }

    // Copy assignment operator: deep copy
    DLL& operator=(const DLL& other) {
        if (this == &other) return *this; // self-assignment check
        // Clear current list
        while (!isEmpty()) deleteNode(head->data.id);

        Node* curr = other.head;
        while (curr) {
            AddNode(curr->data);
            curr = curr->next;
        }
        return *this;
    }

    // Index operator: access node by position
    Node* operator[](int index) {
        if (index < 0 || index >= size) return nullptr;
        Node* curr = head;
        for (int i = 0; i < index; i++) curr = curr->next;
        return curr;
    }

    // Get employee data from user
    Employee getUserData() {
        Employee e;
        cout << "Enter Employee Data\n";
        cout << "ID: "; cin >> e.id;
        cout << "Name: "; cin.ignore(); getline(cin, e.name);
        cout << "Age: "; cin >> e.age;
        return e;
    }

    // Add node at the end
    void AddNode(const Employee& emp) {
        Node* newNode = new Node();
        newNode->data = emp;

        if (isEmpty()) { // empty list
            newNode->next = newNode->prev = nullptr;
            head = tail = newNode;
        } else { // append at tail
            newNode->prev = tail;
            newNode->next = nullptr;
            tail->next = newNode;
            tail = newNode;
        }
        size++;
    }

    // Search node by ID
    Node* searchList(int id) {
        Node* curr = head;
        while (curr) {
            if (curr->data.id == id) return curr;
            curr = curr->next;
        }
        return nullptr; // not found
    }

    // Delete node by ID
    bool deleteNode(int id) {
        Node* curr = searchList(id);
        if (!curr) return false;

        if (curr == head) { // delete head
            head = head->next;
            if (head) head->prev = nullptr;
            else tail = nullptr;
        } else if (curr == tail) { // delete tail
            tail = tail->prev;
            tail->next = nullptr;
        } else { // delete middle node
            curr->prev->next = curr->next;
            curr->next->prev = curr->prev;
        }

        delete curr;
        size--;
        return true;
    }

    // Display a node by ID
    void displayNode(int id) {
        Node* curr = searchList(id);
        if (!curr) cout << id << " not found\n";
        else cout << "ID: " << curr->data.id << ", Name: " << curr->data.name
                  << ", Age: " << curr->data.age << endl;
    }

    // Display all nodes
    void displayAll() {
        Node* curr = head;
        while (curr) {
            cout << "ID: " << curr->data.id << "\nName: " << curr->data.name
                 << "\nAge: " << curr->data.age << "\n============\n";
            curr = curr->next;
        }
    }

    // Get total number of nodes
    int getSize() { return size; }

    // Check if list is empty
    bool isEmpty() { return head == nullptr; }

    // Destructor: free all nodes
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

// Demo main function
int main() {
    DLL dLinkedList;

    // Insert 3 nodes
    for (int i = 0; i < 3; i++) {
        Employee emp = dLinkedList.getUserData();
        dLinkedList.AddNode(emp);
        cout << "\n--- Current List ---\n";
        dLinkedList.displayAll();
    }

    // Search
    int searchId;
    cout << "\nEnter ID to search: ";
    cin >> searchId;
    dLinkedList.displayNode(searchId);

    // Delete
    int delId;
    cout << "\nEnter ID to delete: ";
    cin >> delId;
    if (dLinkedList.deleteNode(delId))
        cout << "Deleted successfully.\n";
    else
        cout << "ID not found.\n";

    cout << "\n--- List After Deletion ---\n";
    dLinkedList.displayAll();
    cout << "Total Nodes: " << dLinkedList.getSize() << "\n";

    // Copy constructor test
    DLL copiedList = dLinkedList;
    cout << "\n--- Copied List ---\n";
    copiedList.displayAll();

    return 0;
}
