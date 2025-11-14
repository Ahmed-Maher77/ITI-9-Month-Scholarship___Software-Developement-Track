# 🎯 C++ OOP Assignments

This repository contains solutions to a series of C++ Object-Oriented Programming (OOP) assignments, including operator overloading, static members, constructors, and advanced class design.

---

## 📘 Assignment 1 – Complex Class
**Goal:**  
Implement a `Complex` class with:
- All constructors (default, parameterized)
- Operator overloading for `+`, `-`, `*`, `/`
- Increment/decrement operators
- Relational operators
- Type casting to `float`
- Input/output stream overloading
- Static counter and destructor messages

**Key Concepts:** Operator Overloading, Type Casting, Static Members, Encapsulation.

📄 File: [`Assignment1_Complex.cpp`](solutions/Assignment1_Complex.cpp)

---

## 📘 Assignment 2 – Stack Implementation
**Goal:**  
Implement a dynamic integer `Stack` class with:
- Deleted default constructor
- Parameterized, copy, and move constructors
- Copy and move assignment operators
- Operator overloading for `[]`
- Push/pop operations with chaining
- Static counter for objects

**Key Concepts:** Constructors, Rule of Five, Dynamic Memory, Static Members, Method Chaining.

📄 File: [`Assignment2_Stack.cpp`](solutions/Assignment2_Stack.cpp)

---

## 📘 Assignment 3 – BankAccount Class
**Goal:**  
Implement a `BankAccount` class with:
- Full constructor set (default, parameterized, move)
- Disabled copy/assignment
- Deposit and withdraw methods
- Operator overloading for `<<` and `>>`
- Static counters for tracking total accounts

**Key Concepts:** Static Members, Rule of Three/Five, Move Semantics, Operator Overloading.

📄 File: [`Assignment3_BankAccount.cpp`](solutions/Assignment3_BankAccount.cpp)

---

## 🧠 Notes
Each solution:
- Follows **RAII principles** (proper resource management)
- Prints informative messages for constructor/destructor calls
- Demonstrates **modern C++ (C++11/17)** best practices
- Includes test cases in `main()` for demonstration
