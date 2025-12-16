#include "BTS.h"

int main() {
    BTS tree;

    tree.insertEmployeeBalanced(50, "Ahmed", 25);
    tree.insertEmployeeBalanced(30, "Omar", 22);
    tree.insertEmployeeBalanced(70, "Sara", 30);
    tree.insertEmployeeBalanced(20, "Reem", 28);
    tree.insertEmployeeBalanced(60, "Ali", 27);
    tree.insertEmployeeBalanced(80, "Laila", 35);

    cout << "Inorder Traversal:\n";
    tree.printInorder();

    cout << "Contains 60? " << (tree.contains(60) ? "Yes" : "No") << "\n";
    cout << "Size: " << tree.getSize() << "\n";
    cout << "Levels: " << tree.getLevels() << "\n";
    cout << "Balanced? " << (tree.checkBalanced() ? "Yes" : "No") << "\n\n";

    tree.deleteNodeBalanced(20);
    cout << "After deleting 20:\n";
    tree.printInorder();

    tree.deleteNodeBalanced(30);
    cout << "After deleting 30:\n";
    tree.printInorder();

    tree.deleteNodeBalanced(50);
    cout << "After deleting 50:\n";
    tree.printInorder();

    cout << "Levels: " << tree.getLevels() << "\n";
    cout << "Balanced? " << (tree.checkBalanced() ? "Yes" : "No") << "\n";

    return 0;
}
