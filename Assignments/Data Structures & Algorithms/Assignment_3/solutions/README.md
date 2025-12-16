# Solutions — Binary Search Tree Implementation

This folder contains the complete C++ implementation of the BST assignment.

## Files
### ✔ BTS.h
Header file containing:
- `Employee` struct
- `BTS` class definition
- Node struct
- Public API of the tree

### ✔ BTS.cpp
Implementation of:
- Insertion (recursive / iterative / balanced)
- Deletion (leaf, one child, two children)
- Search
- Traversal
- Balance checking
- Rebalancing
- Copy constructor
- Destructor

### ✔ main.cpp
Executable example containing:
- Balanced insertions
- Sample deletions
- Traversal output
- Balance validation

---

## How to Compile

```sh
g++ main.cpp BTS.cpp -o bst_app
./bst_app
```