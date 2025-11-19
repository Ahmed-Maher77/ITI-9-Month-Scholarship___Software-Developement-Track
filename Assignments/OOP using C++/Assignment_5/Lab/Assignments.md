# Assignment 5 · OOP Using C++

Professional overview for the lab submission that will live inside the main course repository. The deliverable focuses on practicing inheritance, polymorphism, and runtime behavior across several geometry-focused exercises.

## Contents

-   `Assignments.md` – scope, build hints, and task inventory (this file)
-   `solutions/` – individual `task_#.cpp` programs covering the prompts below

## Task Breakdown

1. **Task 1 – Public Inheritance Refresh**  
   Rebuilds the core `GeoShape` hierarchy with rectangle, circle, and triangle deriving publicly. Demonstrates basic data encapsulation, method overriding, and polymorphic area calculations.

2. **Task 2 – Protected Inheritance Variant**  
   Revisits the same shapes but exposes dimension setters/getters through `protected` access. Highlights how the public interface of each derived shape must adapt when the base is inherited as `protected`.

3. **Task 3 – Abstract 2D/3D Shapes**  
   Evolves `GeoShape` into an abstract class, adds `Rhombus`, introduces a separate `GeoShape3D` base, and implements a `Cube`. Includes a free function that compares areas between any two 2D shapes.

4. **Task 4 – Dynamic Allocation & Sorting**  
   Creates shape instances dynamically, stores them in STL containers, and sorts them ascending/descending by area. Extends the 3D portion by reporting cube area and volume.

## How to Build & Run

Each task is a standalone console program. From the `Lab` directory:

```bash
g++ solutions/task_1.cpp -o task1 && ./task1
g++ solutions/task_2.cpp -o task2 && ./task2
g++ solutions/task_3.cpp -o task3 && ./task3
g++ solutions/task_4.cpp -o task4 && ./task4
```

Use any C++17-compatible toolchain (GCC, Clang, or MSVC) available in your environment. Clean up executables before committing if your `.gitignore` does not already cover them.
