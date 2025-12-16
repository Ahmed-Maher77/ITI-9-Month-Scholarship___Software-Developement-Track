#include "BTS.h"

// =================== Constructors ===================
BTS::BTS() {
    root = nullptr;
    size = 0;
}

// Deep copy constructor
BTS::Node* BTS::cloneNodes(Node* src) {
    if (!src) return nullptr;
    Node* n = new Node(src->data);
    n->left  = cloneNodes(src->left);
    n->right = cloneNodes(src->right);
    return n;
}

BTS::BTS(BTS &other) {
    root = cloneNodes(other.root);
    size = other.size;
}

// =================== Insert ===================
void BTS::insertNode_recursive(Node*& subtreeRoot, Node* newNode) {
    if (!subtreeRoot) {
        subtreeRoot = newNode;
        ++size;
        return;
    }

    if (newNode->data.id == subtreeRoot->data.id) {
        cout << "Duplicate ID not allowed\n";
        delete newNode;
        return;
    }

    if (newNode->data.id < subtreeRoot->data.id)
        insertNode_recursive(subtreeRoot->left, newNode);
    else
        insertNode_recursive(subtreeRoot->right, newNode);
}

void BTS::insertEmployee(int id, string name, float age) {
    Employee e = {id, name, age};
    Node* newNode = new Node(e);
    insertNode_recursive(root, newNode);
}

void BTS::insertEmployeeBalanced(int id, string name, float age) {
    insertEmployee(id, name, age);
    if (!isBalanced(root)) rebalance();
}

void BTS::insertNode_iterative(int id, string name, float age) {
    Employee e = {id, name, age};
    Node* newNode = new Node(e);

    if (!root) {
        root = newNode;
        ++size;
        return;
    }

    Node* curr = root;
    Node* parent = nullptr;

    while (curr) {
        parent = curr;
        if (id == curr->data.id) {
            cout << "Duplicate ID not allowed\n";
            delete newNode;
            return;
        }
        if (id < curr->data.id) curr = curr->left;
        else curr = curr->right;
    }

    if (id < parent->data.id) parent->left = newNode;
    else parent->right = newNode;
    ++size;
}

// =================== Search ===================
BTS::Node* BTS::searchNode(Node* root, int id) {
    if (!root) return nullptr;
    if (id == root->data.id) return root;
    if (id < root->data.id) return searchNode(root->left, id);
    return searchNode(root->right, id);
}

bool BTS::contains(int id) {
    return searchNode(root, id) != nullptr;
}

// =================== Delete ===================
string BTS::findNodeType(Node* node) {
    if (!node) return "none";
    if (!node->left && !node->right) return "leaf";
    if ((node->left && !node->right) || (!node->left && node->right)) return "one_child";
    return "two_children";
}

BTS::Node* BTS::findParent(Node* subtreeRoot, Node* child) {
    if (!subtreeRoot || subtreeRoot == child) return nullptr;

    if (subtreeRoot->left == child || subtreeRoot->right == child)
        return subtreeRoot;

    if (child->data.id < subtreeRoot->data.id)
        return findParent(subtreeRoot->left, child);
    return findParent(subtreeRoot->right, child);
}

BTS::Node* BTS::findMin(Node* subtreeRoot) {
    while (subtreeRoot && subtreeRoot->left)
        subtreeRoot = subtreeRoot->left;
    return subtreeRoot;
}

void BTS::deleteLeafNode(Node* node) {
    Node* parent = findParent(root, node);

    if (!parent) {
        root = nullptr;
        delete node;
        size = 0;
        return;
    }

    if (parent->left == node) parent->left = nullptr;
    else parent->right = nullptr;

    delete node;
    --size;
}

void BTS::deleteNodeWithOneChild(Node* node) {
    Node* parent = findParent(root, node);
    Node* child = node->left ? node->left : node->right;

    if (!parent) {
        root = child;
        delete node;
        --size;
        return;
    }

    if (parent->left == node) parent->left = child;
    else parent->right = child;

    delete node;
    --size;
}

void BTS::deleteNodeWithTwoChildren(Node* node) {
    Node* successor = findMin(node->right);
    node->data = successor->data;

    string type = findNodeType(successor);

    if (type == "leaf") deleteLeafNode(successor);
    else deleteNodeWithOneChild(successor);
}

void BTS::deleteNode(int id) {
    Node* target = searchNode(root, id);
    if (!target) {
        cout << "Node not found\n";
        return;
    }

    string type = findNodeType(target);

    if (type == "leaf") deleteLeafNode(target);
    else if (type == "one_child") deleteNodeWithOneChild(target);
    else deleteNodeWithTwoChildren(target);
}

void BTS::deleteNodeBalanced(int id) {
    deleteNode(id);
    if (!isBalanced(root)) rebalance();
}

// =================== Traversal ===================
void BTS::traverseTree(Node *root) {
    if (!root) return;
    traverseTree(root->left);
    cout << root->data.id << " - " << root->data.name << " - " << root->data.age << endl;
    traverseTree(root->right);
}

void BTS::printInorder() {
    traverseTree(root);
    cout << endl;
}

// =================== Count ===================
int BTS::getSize() { return size; }

int BTS::CountLevels(Node* node) {
    if (!node) return 0;
    int leftHeight  = CountLevels(node->left);
    int rightHeight = CountLevels(node->right);
    return 1 + max(leftHeight, rightHeight);
}

int BTS::getLevels() {
    return CountLevels(root);
}

// =================== Balance ===================
bool BTS::isBalanced(Node* node) {
    if (!node) return true;

    int lh = CountLevels(node->left);
    int rh = CountLevels(node->right);

    if (abs(lh - rh) > 1) return false;

    return isBalanced(node->left) && isBalanced(node->right);
}

bool BTS::checkBalanced() {
    return isBalanced(root);
}

void BTS::storeInOrder(Node* node, vector<Employee>& arr) {
    if (!node) return;
    storeInOrder(node->left, arr);
    arr.push_back(node->data);
    storeInOrder(node->right, arr);
}

BTS::Node* BTS::buildBalancedBST(vector<Employee>& arr, int start, int end) {
    if (start > end) return nullptr;

    int mid = (start + end) / 2;
    Node* node = new Node(arr[mid]);

    node->left  = buildBalancedBST(arr, start, mid - 1);
    node->right = buildBalancedBST(arr, mid + 1, end);

    return node;
}

void BTS::rebalance() {
    vector<Employee> nodes;
    storeInOrder(root, nodes);

    traverseTreeAndDeleteNodes(root);

    root = buildBalancedBST(nodes, 0, nodes.size() - 1);
    size = nodes.size();
}

// =================== Destructor ===================
void BTS::traverseTreeAndDeleteNodes(Node* root) {
    if (!root) return;
    traverseTreeAndDeleteNodes(root->left);
    traverseTreeAndDeleteNodes(root->right);
    delete root;
}

BTS::~BTS() {
    traverseTreeAndDeleteNodes(root);
    root = nullptr;
    size = 0;
}
