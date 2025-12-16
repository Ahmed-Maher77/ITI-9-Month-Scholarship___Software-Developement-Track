# Binary Search Tree Assignment  
This repository contains an implementation of a **Binary Search Tree (BST)** in C++ using a custom `Employee` struct as the stored data type.  
The assignment covers key BST operations, memory management, balancing, and traversal techniques.

---

## 📌 Assignment Requirements

### 1. **Employee Node Structure**
Each node contains:
- `id` (int)
- `name` (string)
- `age` (float)
- `left` child pointer  
- `right` child pointer  

---

## 📌 Tasks Implemented

### ⭐ **1. Insert (Recursive & Iterative)**
- Insert an employee into the BST using recursion.
- Prevent duplicate IDs.
- Provide an iterative insertion alternative.
- Support **self-balancing insertion** using:
  - `insertEmployeeBalanced()`
  - checks balance → auto-rebuilds tree.

---

### ⭐ **2. Delete (All Cases)**
Implemented delete cases:
- Delete leaf node
- Delete node with one child
- Delete node with two children (in-order successor replacement)
- Balanced delete using:
  - `deleteNodeBalanced()`

---

### ⭐ **3. Search**
- Search for an employee by `id`.
- Used in multiple operations (insert/delete/contains).

---

### ⭐ **4. Traversal**
Implemented:
- **Inorder traversal** (sorted output)

---

### ⭐ **5. Counting Functions**
- Count total number of nodes
- Count tree height/levels

---

### ⭐ **6. Balance Checking**
- Check if the BST is height-balanced
- Full rebalance using sorted inorder reconstruction

---

### ⭐ **7. Deep Copy Constructor**
Tree cloning implemented via:
- `cloneNodes()`  
- Allows safe BST copying.

---

### ⭐ **8. Destructor**
Releases all allocated nodes to prevent memory leaks.

---

## 📂 Project Structure

```bash
📁 BST-Assignment/
├── Assignments.md
├── solutions/
│ ├── main.cpp
│ ├── BTS.cpp
│ ├── BTS.h
│ └── examples/
└── README.md
```