#ifndef BTS_H
#define BTS_H

#include <iostream>
#include <string>
#include <vector>
#include <cmath>
using namespace std;

// ================= Employee Struct =================
struct Employee {
    int id;
    string name;
    float age;
};

// ================= Binary Search Tree Class =================
class BTS {

    struct Node {
        Employee data;
        Node *left;
        Node *right;
        Node(Employee e) : data(e), left(nullptr), right(nullptr) {}
    };

    Node *root;
    int size;

    // ---------- Helper Functions ----------
    Node* cloneNodes(Node* src);
    void insertNode_recursive(Node*& subtreeRoot, Node* newNode);
    Node* searchNode(Node* root, int id);
    string findNodeType(Node* node);
    Node* findParent(Node* subtreeRoot, Node* child);
    Node* findMin(Node* subtreeRoot);

    void deleteLeafNode(Node* node);
    void deleteNodeWithOneChild(Node* node);
    void deleteNodeWithTwoChildren(Node* node);

    void traverseTree(Node *root);
    int CountLevels(Node* node);
    bool isBalanced(Node* node);

    void storeInOrder(Node* node, vector<Employee>& arr);
    Node* buildBalancedBST(vector<Employee>& arr, int start, int end);
    void traverseTreeAndDeleteNodes(Node* root);

public:
    // ---------- Constructors ----------
    BTS();
    BTS(BTS &other);  // deep copy

    // ---------- Insert ----------
    void insertEmployee(int id, string name, float age);
    void insertEmployeeBalanced(int id, string name, float age);
    void insertNode_iterative(int id, string name, float age);

    // ---------- Delete ----------
    void deleteNode(int id);
    void deleteNodeBalanced(int id);

    // ---------- Search ----------
    bool contains(int id);

    // ---------- Traversal ----------
    void printInorder();

    // ---------- Count ----------
    int getSize();
    int getLevels();
    bool checkBalanced();
    bool isEmpty();

    // ---------- Balance ----------
    void rebalance();

    // ---------- Destructor ----------
    ~BTS();
};

#endif
