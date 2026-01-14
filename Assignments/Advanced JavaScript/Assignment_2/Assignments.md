# Advanced JavaScript - Lab 2

## Overview

This lab focuses on implementing custom objects with encapsulation, private members, and interactive user interfaces without using ES6 classes or inheritance.

---

## 📋 Requirements

### Task 1: Numerical Sequence Object

Create a custom object that manages a list of numerical sequences with the following specifications:

#### Constructor Parameters

-   `start` - Starting value of the sequence
-   `end` - Ending value of the sequence
-   `step` - Increment step between values

#### Implementation Requirements

-   The list must be **private**
-   The list should be filled using a **private method**
-   Implement getter/setter methods for the list if needed

#### Functionality

The sequence object must support the following operations:

-   **Append**: Add a new value to the end of the sequence
-   **Prepend**: Add a new value to the beginning of the sequence
-   **Pop**: Remove and return the last value from the sequence
-   **Dequeue**: Remove and return the first value from the sequence

#### Validation Rules

✅ **Sequential Value Check**

-   Throw an exception if the value being added doesn't follow the sequence pattern

✅ **Duplicate Prevention**

-   Throw an exception if attempting to add a duplicate value

#### Additional Properties

You may add any additional properties needed to support the implementation.

---

### Task 2: Box and Book Objects

Create a box object that contains and manages book objects.

#### Book Object Properties

-   `title` - Book title
-   `numofChapters` - Number of chapters
-   `author` - Book author
-   `numofPages` - Number of pages
-   `publisher` - Publisher name
-   `numofCopies` - Number of copies

#### Box Object Properties

-   `height` - Box height
-   `width` - Box width
-   `length` - Box length
-   `numOfBooks` - Count of books in the box
-   `volume` - Box volume
-   `material` - Box material
-   `content` - Array containing book objects

#### Box Functionality

The box object must support:

-   **Count Books**: Get the total number of books inside the box
-   **Add Book**: Create a book object and add it to the box's content
-   **Delete Book**: Remove a book from the box by its title

#### Helper Methods

Define any additional functions needed for both box and book objects.

---

## 🚫 Constraints

-   ❌ **No ES6 Classes** - Use constructor functions only
-   ❌ **No Inheritance** - Objects must be standalone
-   ❌ **No Global Variables** - Maintain proper scope
-   ❌ **No Class Methods/Properties** - Use instance methods only

---

## 🎨 Interface Requirements

Create your own user interface for both tasks. The interface should:

-   Allow users to interact with the sequence and box objects
-   Display results clearly
-   Handle and display errors appropriately
-   Provide a clean and intuitive user experience

---

## 📁 Project Structure

```
Lab/
├── Task-1/
│   ├── index.html
│   ├── app.js
│
└── Task-2/
    ├── index.html
    ├── script.js
    └── styles.css
```

---

## 🎯 Learning Objectives

-   Understanding object encapsulation and private members
-   Implementing constructor functions
-   Validating data and throwing exceptions
-   Creating interactive user interfaces
-   Managing object relationships without inheritance

---

## 📝 Notes

-   Focus on clean, readable code
-   Implement proper error handling with descriptive messages
-   Test all edge cases (empty sequences, invalid inputs, etc.)
-   Ensure the UI is responsive to user actions

---

**Good luck! 🚀**
