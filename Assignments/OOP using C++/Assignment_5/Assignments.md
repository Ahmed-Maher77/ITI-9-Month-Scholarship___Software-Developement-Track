# 🎓 C++ OOP Assignments — ITI 9-Month Program

This repository contains three C++ programming assignments covering essential Object-Oriented Programming concepts such as **templates**, **operator overloading**, **copy/move semantics**, and **inheritance**.

Each assignment includes a fully functional C++ implementation and output demonstration.

---

## 📘 Assignment 1 — Stack Class Using Templates

**Topics Covered:**

- Class Templates  
- Dynamic Memory Management  
- Constructor Overloading  
- Copy Constructor & Copy Assignment  
- Move Constructor & Move Assignment  
- Stack Operations (push, pop, top)  
- Support for user-defined types  

**Description:**  
You are required to implement a generic `Stack<T>` class that works with any data type including user-defined classes like `Complex`.

✔ Supports `int`, `float`, `char`, and `Complex`  
✔ Implements Rule of Five  
✔ Safe push/pop operations with overflow/underflow checks  

📁 **File:** `solutions/Assignment_1.cpp`

---

## 📘 Assignment 2 — Generic Sum Function (Templates)

**Topics Covered:**

- Function Templates  
- Operator Overloading  
- Working with STL `complex<T>`  

**Description:**  
Implement a generic function `sumValues()` that returns the sum of two values of any type supporting operator `+`.

Works with:

- `int`
- `float`
- `double`
- `complex<double>`

📁 **File:** `solutions/Assignment_2.cpp`

---

## 📘 Assignment 3 — Inheritance (Base & Derived Classes)

**Topics Covered:**

- Single Inheritance  
- Protected Members  
- Constructor Chaining  
- Method Extension  
- Access Modifiers  

**Description:**  
Implement two classes — `Base` and `Derived` — demonstrating:

- protected members  
- private member restriction  
- constructor inheritance  
- three ways to extend a base method  

Methods in the derived class:

- `calcSum1()` → direct access to protected attributes  
- `calcSum2()` → using getters  
- `calcSum3()` → using `Base::calcSum()`  

📁 **File:** `solutions/Assignment_3.cpp`

---

## 📂 Repository Structure

📦 cpp-oop-assignments/
│
├── 📄 Assignments.md
│
└── 📁 solutions/
├── Assignment_1.cpp
├── Assignment_2.cpp
└── Assignment_3.cpp


---

## 🧑‍💻 Author

**Ahmed Maher Algohary**  
Frontend Developer • ITI 9-Month Trainee  
Passionate about clean code, OOP, and problem solving.