# OOP Lab Assignments - C++

This repository contains solutions for Object-Oriented Programming lab assignments covering inheritance, polymorphism, abstract classes, and dynamic memory management in C++.

## 📁 Repository Structure

```
.
├── README.md              # This file
├── Assignments.md         # Detailed assignment descriptions
├── solutions/             # All solution files
│   ├── task_1.cpp        # Public Inheritance
│   ├── task_2.cpp        # Protected Inheritance
│   ├── task_3.cpp        # Abstract Classes & 3D Shapes
│   └── task_4.cpp        # Dynamic Objects & Sorting
└── .gitignore            # Git ignore rules
```

## 🚀 Quick Start

### Prerequisites

-   C++ compiler (g++, clang++, or MSVC)
-   C++11 or later standard support

### Compilation

Compile any solution file:

```bash
# Linux/Mac
g++ solutions/task_X.cpp -o task_X
./task_X

# Windows
g++ solutions/task_X.cpp -o task_X.exe
task_X.exe
```

## 📚 Assignments Overview

| Assignment | Topic                        | File                   |
| ---------- | ---------------------------- | ---------------------- |
| **Task 1** | Public Inheritance           | `solutions/task_1.cpp` |
| **Task 2** | Protected Inheritance        | `solutions/task_2.cpp` |
| **Task 3** | Abstract Classes & 3D Shapes | `solutions/task_3.cpp` |
| **Task 4** | Dynamic Objects & Sorting    | `solutions/task_4.cpp` |

For detailed information about each assignment, see [Assignments.md](./Assignments.md).

## 🎯 Topics Covered

-   ✅ Public and Protected Inheritance
-   ✅ Virtual Functions and Polymorphism
-   ✅ Abstract Classes and Pure Virtual Functions
-   ✅ Dynamic Memory Management
-   ✅ STL Containers and Algorithms
-   ✅ Const Correctness
-   ✅ Virtual Destructors

## 📖 Code Examples

### Example: Public Inheritance

```cpp
class GeoShape {
    // Base class implementation
};

class Circle : public GeoShape {
    // Derived class with public inheritance
};
```

### Example: Abstract Class

```cpp
class GeoShape {
public:
    virtual double calcArea() const = 0;  // Pure virtual
};
```

### Example: Dynamic Objects

```cpp
vector<GeoShape*> shapes;
shapes.push_back(new Circle(5));
// ... use shapes ...
for (auto s : shapes) delete s;  // Cleanup
```

## 🛠️ Development

### Building All Solutions

```bash
# Compile all tasks
for file in solutions/*.cpp; do
    g++ "$file" -o "${file%.cpp}.exe"
done
```

## 📝 Notes

-   All code follows C++ best practices
-   Virtual destructors included where necessary
-   Memory properly managed (no leaks)
-   Const-correctness maintained
-   Well-commented and structured code

## 📄 License

This repository is for educational purposes only.

## 👤 Author

**Ahmed Maher**  
ITI 9 Months Program - Web & UI Track  
Programming Fundamentals using C++ - OOP Lab #11

---

⭐ If you find this repository helpful, please consider giving it a star!
