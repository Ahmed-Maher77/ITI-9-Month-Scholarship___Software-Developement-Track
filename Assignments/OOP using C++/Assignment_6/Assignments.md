# Object-Oriented Programming - Lab Assignments

This repository contains solutions for Object-Oriented Programming lab assignments focusing on inheritance, polymorphism, and abstract classes in C++.

---

## 📋 Table of Contents

-   [Assignment 1: Public Inheritance](#assignment-1-public-inheritance)
-   [Assignment 2: Protected Inheritance](#assignment-2-protected-inheritance)
-   [Assignment 3: Abstract Classes & 3D Shapes](#assignment-3-abstract-classes--3d-shapes)
-   [Assignment 4: Dynamic Objects & Sorting](#assignment-4-dynamic-objects--sorting)

---

## Assignment 1: Public Inheritance

**File:** `solutions/task_1.cpp`

### Objective

Design and implement geometric shapes using **public inheritance** to demonstrate the relationship between base and derived classes.

### Requirements

-   Create a `GeoShape` base class with dimensions and area calculation
-   Implement derived classes: `Rect`, `Circle`, and `Triangle`
-   Use **public inheritance** to inherit from `GeoShape`
-   Override the `calcArea()` method in derived classes where necessary

### Key Concepts Demonstrated

-   Public inheritance (`class Derived : public Base`)
-   Protected inheritance (`class Derived : protected Base`) - demonstrated with `Square` inheriting from `Triangle`
-   Method overriding
-   Access to base class members through inheritance
-   Constructor initialization lists
-   Assignment operator overloading

### Classes Implemented

-   `GeoShape` - Base class with `dim1`, `dim2`, and default `calcArea()`
-   `Rect` - Rectangle inheriting from `GeoShape`
-   `Circle` - Circle with radius, overrides `calcArea()` using π
-   `Triangle` - Triangle with base and height, overrides `calcArea()`
-   `Square` - Square inheriting from `Triangle` using **protected inheritance**

### Features

-   Assignment operator (`operator=`) overloaded in all shape classes
-   Self-assignment protection in assignment operators
-   Proper base class assignment handling in derived classes

---

## Assignment 2: Protected Inheritance

**File:** `solutions/task_2.cpp`

### Objective

Redesign the geometric shapes using **protected inheritance** and understand the differences in access control.

### Requirements

-   Modify the inheritance type from public to **protected inheritance**
-   Adjust the design to accommodate protected inheritance
-   Ensure proper encapsulation and access control

### Key Concepts Demonstrated

-   Protected inheritance (`class Derived : protected Base`)
-   Access control changes with protected inheritance
-   Public interface design for derived classes
-   Encapsulation principles
-   Assignment operator overloading

### Design Changes

-   Base class members moved to `protected` section
-   Derived classes use `getArea()` as public interface
-   Base class methods become protected in derived classes
-   Demonstrates when protected inheritance is appropriate
-   `Square` class demonstrates protected inheritance from `Triangle`

### Features

-   Assignment operator (`operator=`) overloaded in all shape classes
-   Self-assignment protection in assignment operators
-   Proper base class assignment handling in derived classes

---

## Assignment 3: Abstract Classes & 3D Shapes

**File:** `solutions/task_3.cpp`

### Objective

Transform `GeoShape` into an **abstract class** and extend the design to support 3D shapes.

### Requirements

-   Convert `GeoShape` to an abstract class
-   Add `Rhombus` as a 2D shape using public inheritance
-   Create `GeoShape3D` abstract class for 3D shapes
-   Implement `Cube` class inheriting from `GeoShape3D`
-   Create a standalone function to compare areas of any two 2D shapes

### Key Concepts Demonstrated

-   Abstract classes and pure virtual functions
-   Virtual function overriding with `const` qualifiers
-   Multiple inheritance hierarchies (2D and 3D)
-   Protected inheritance (`class Square : protected Triangle`) - demonstrates inheritance from a derived class
-   Polymorphism through base class pointers/references
-   Standalone functions working with polymorphic objects
-   Assignment operator overloading

### Classes Implemented

#### 2D Shapes (inherit from `GeoShape`)

-   `Rect` - Rectangle
-   `Circle` - Circle
-   `Triangle` - Triangle
-   `Rhombus` - Rhombus (new)
-   `Square` - Square inheriting from `Triangle` using **protected inheritance**

#### 3D Shapes (inherit from `GeoShape3D`)

-   `Cube` - Cube with area, volume, and perimeter calculations

### Features

-   `compareArea()` function comparing any two `GeoShape` objects
-   Virtual functions marked as `const` for const-correctness
-   Proper access control with protected members
-   Assignment operator (`operator=`) overloaded in all shape classes (2D and 3D)
-   Self-assignment protection in assignment operators
-   Proper base class assignment handling in derived classes
-   Perimeter calculation for 3D shapes (`calcPerimeter()`) - calculates perimeter of one face

---

## Assignment 4: Dynamic Objects & Sorting

**File:** `solutions/task_4.cpp`

### Objective

Work with dynamically allocated objects, base class pointers, and implement sorting functionality for geometric shapes.

### Requirements

-   Create objects dynamically using `new`
-   Use base class pointers to manage derived class objects
-   Calculate areas and volumes for all shapes
-   Implement sorting algorithms to sort shapes by area (ascending and descending)
-   Properly manage memory with `delete`

### Key Concepts Demonstrated

-   Dynamic memory allocation (`new`/`delete`)
-   Base class pointers pointing to derived class objects
-   Polymorphism through virtual functions
-   STL containers (`vector`) with pointers
-   STL algorithms (`sort`) with custom comparators
-   Virtual destructors for proper cleanup
-   Assignment operator overloading

### Implementation Details

-   Uses `vector<GeoShape*>` to store polymorphic objects
-   Custom comparison functions: `compareAreaASC()` and `compareAreaDESC()`
-   Demonstrates sorting 2D shapes by area
-   Includes 3D shape (Cube) with volume and perimeter calculations
-   Proper memory cleanup to prevent leaks
-   Assignment operator (`operator=`) overloaded in all shape classes (2D and 3D)
-   Self-assignment protection in assignment operators
-   Proper base class assignment handling in derived classes
-   `Square` class demonstrates protected inheritance (cannot be stored in `vector<GeoShape*>` due to protected inheritance)
-   Perimeter calculation for 3D shapes (`calcPerimeter()`) - calculates perimeter of one face

### Output

-   Displays all shape areas
-   Shows shapes sorted in ascending order
-   Shows shapes sorted in descending order
-   Displays cube area, volume, and perimeter

---

## 🛠️ Compilation & Execution

All solutions are written in C++ and can be compiled using `g++`:

```bash
# Compile a specific task
g++ solutions/task_X.cpp -o task_X.exe

# Run the executable
./task_X.exe
```

Or on Windows:

```bash
g++ solutions/task_X.cpp -o task_X.exe && task_X.exe
```

---

## 📚 Learning Outcomes

Through these assignments, students learn:

1. **Inheritance Types**: Public, protected, and when to use each
2. **Polymorphism**: Virtual functions and runtime binding
3. **Abstract Classes**: Pure virtual functions and interface design
4. **Memory Management**: Dynamic allocation and proper cleanup
5. **STL Usage**: Containers and algorithms with custom comparators
6. **Object-Oriented Design**: Proper class hierarchies and encapsulation
7. **Operator Overloading**: Assignment operator implementation with self-assignment protection
8. **Multi-level Inheritance**: `Square` inheriting from `Triangle` demonstrates inheritance from derived classes

---

## 📝 Notes

-   All code follows C++ best practices
-   Virtual destructors are included where necessary
-   Const-correctness is maintained throughout
-   Memory management is properly handled
-   Code is well-commented and structured
-   Assignment operators are implemented with self-assignment protection
-   All shape classes support assignment operations for object copying

---

## 👤 Author

**Ahmed Maher**  
ITI 9 Months Program - Web & UI Track  
Programming Fundamentals using C++ - OOP Lab #11

---

## 📄 License

This repository is for educational purposes only.
