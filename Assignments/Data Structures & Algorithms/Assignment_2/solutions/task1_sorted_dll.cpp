// Task 1 — Sorted Double Linked List


#include <iostream>
using namespace std;

// Employee structure
struct Employee {
    int id;
    string name;
    float age;
};

// Node for doubly linked list
class Node {
public:
    Employee data;
    Node* next;
    Node* prev;
};

// Sorted Doubly Linked List class
class SortedDDL {
    Node *head;
    Node *tail;
    int size;

public:
    // Constructor
    SortedDDL() : head(nullptr), tail(nullptr), size(0) {}

    // Copy constructor (deep copy)
    SortedDDL(const SortedDDL& other) : head(nullptr), tail(nullptr), size(0) {
        Node* curr = other.head;
        while (curr != nullptr) {
            insertNode(curr->data);
            curr = curr->next;
        }
    }

    // Prompt user to enter employee data
    Employee getUserData() {
        Employee newEmployee;
        cout << "Enter Employee Data:\n";
        cout << "ID: "; cin >> newEmployee.id;
        cout << "Name: "; cin.ignore(); getline(cin, newEmployee.name);
        cout << "Age: "; cin >> newEmployee.age;
        return newEmployee;
    }

    // Insert node in sorted order (by ID)
    void insertNode(Employee& newEmployee) {
        Node* newNode = new Node();
        newNode->data = newEmployee;
        newNode->next = newNode->prev = nullptr;
        size++;

        if (isEmpty()) {  // Empty list
            head = tail = newNode;
            return;
        }

        if (newEmployee.id < head->data.id) {  // Insert at front
            newNode->next = head;
            head->prev = newNode;
            head = newNode;
            return;
        }

        if (newEmployee.id > tail->data.id) {  // Insert at end
            newNode->prev = tail;
            tail->next = newNode;
            tail = newNode;
            return;
        }

        // Insert in middle
        Node* temp = head->next;
        while (temp != nullptr) {
            if (newEmployee.id < temp->data.id) {
                newNode->next = temp;
                newNode->prev = temp->prev;
                temp->prev->next = newNode;
                temp->prev = newNode;
                return;
            }
            temp = temp->next;
        }
    }

    // Search for node by ID
    Node* searchList(int id) {
        Node* curr = head;
        while (curr != nullptr) {
            if (curr->data.id == id) return curr;
            curr = curr->next;
        }
        return nullptr;
    }

    // Delete node by ID
    bool deleteNode(int id) {
        Node* curr = searchList(id);
        if (!curr) return false;

        if (curr == head) {  // Delete head
            head = head->next;
            if (head) head->prev = nullptr;
            else tail = nullptr;
        }
        else if (curr == tail) {  // Delete tail
            tail = tail->prev;
            tail->next = nullptr;
        }
        else {  // Delete middle node
            curr->prev->next = curr->next;
            curr->next->prev = curr->prev;
        }

        delete curr;
        size--;
        return true;
    }

    // Display a single node by ID
    void displayNode(int id) {
        Node* curr = searchList(id);
        if (!curr) cout << id << ": Node not found\n";
        else cout << curr->data.id << ": " << curr->data.name << ", Age: " << curr->data.age << endl;
    }

    // Display all nodes
    void displayAll() {
        Node* curr = head;
        while (curr != nullptr) {
            cout << "ID: " << curr->data.id << "\n";
            cout << "Name: " << curr->data.name << "\n";
            cout << "Age: " << curr->data.age << "\n";
            cout << "============\n";
            curr = curr->next;
        }
    }

    // Return number of nodes
    int getSize() { return size; }

    // Check if list is empty
    bool isEmpty() { return head == nullptr; }

    // Destructor
    ~SortedDDL() {
        Node* current = head;
        while (current != nullptr) {
            Node* next = current->next;
            delete current;
            current = next;
        }
        head = tail = nullptr;
        size = 0;
    }
};

int main() {
    SortedDDL dLinkedList;

    // Insert 3 employees and display list after each insertion
    for (int i = 0; i < 3; i++) {
        Employee emp = dLinkedList.getUserData();
        dLinkedList.insertNode(emp);
        cout << "\n--- Current List ---\n";
        dLinkedList.displayAll();
    }

    // Search for a node
    int searchedId;
    cout << "\nSearch for ID: ";
    cin >> searchedId;
    Node* result = dLinkedList.searchList(searchedId);
    if (result) cout << "Found: " << result->data.name << endl;
    else cout << "ID Not Found\n";

    // Delete a node
    int deletedId;
    cout << "\nEnter ID to delete: ";
    cin >> deletedId;
    if (dLinkedList.deleteNode(deletedId))
        cout << "Deleted successfully!\n";
    else
        cout << "ID not found, cannot delete.\n";

    cout << "\n--- List After Deletion ---\n";
    dLinkedList.displayAll();
    cout << "Total Nodes = " << dLinkedList.getSize() << endl;

    // Test copy constructor
    SortedDDL dLinkedList2 = dLinkedList;
    cout << "\n--- Copied List ---\n";
    dLinkedList2.displayAll();

    return 0;
}
